"use client";

import { memo, type ReactNode, useRef, useState } from "react";
import { useVisibleInterval } from "@/presentation/hooks/useVisibleInterval";
import { cx } from "@/shared/lib/cx";
import styles from "./CodeField.module.css";

/*
 * Decorative live "editor" for the footer: three panes, one for each thing I
 * build (an AI agent pipeline, a Unity game, a mobile app). Each pane holds the
 * file it shows, then writes the next one line by line. Pure text.
 */
interface CodeFile {
  readonly name: string;
  readonly lines: readonly string[];
}

const PANES: readonly (readonly CodeFile[])[] = [
  [
    {
      name: "ship.ts",
      lines: [
        "// one idea, a team of agents, a human in charge",
        "const team = await agents.spawn([",
        '  "research", "tests", "refactor", "docs",',
        "]);",
        "const plan = await team.plan(idea);",
        "for (const task of plan.tasks) {",
        '  await team.run(task, { review: "human" });',
        "}",
        "await release({ ios: true, android: true });",
      ],
    },
    {
      name: "review.ts",
      lines: [
        "// agents draft, a human decides",
        "const draft = await agents.build(task);",
        "const report = await evaluate(draft, {",
        "  tests: true, accessibility: true,",
        "});",
        "if (report.passed) {",
        '  await requestReview(draft, "emrah");',
        "}",
        'await merge(draft, { approvedBy: "human" });',
      ],
    },
  ],
  [
    {
      name: "PlayerRunner.cs",
      lines: [
        "public sealed class PlayerRunner : MonoBehaviour",
        "{",
        "    [Min(0f)] public float speed = 12f;",
        "",
        "    void Update()",
        "    {",
        "        lane.MoveTowards(target, speed * Time.deltaTime);",
        "        if (hr9000.Catches(this)) GameOver();",
        "    }",
        "}",
      ],
    },
    {
      name: "LevelDirector.cs",
      lines: [
        "public sealed class LevelDirector : MonoBehaviour",
        "{",
        "    [SerializeField] AnimationCurve difficulty;",
        "",
        "    void SpawnWave(int wave)",
        "    {",
        "        var pace = difficulty.Evaluate(wave / 20f);",
        "        spawner.Run(obstacles, pace);",
        "    }",
        "}",
      ],
    },
  ],
  [
    {
      name: "TodayScreen.tsx",
      lines: [
        "export function TodayScreen() {",
        "  const { khatm, mark } = useKhatm(groupId);",
        "",
        "  return (",
        '    <Screen title="Bugün">',
        "      <JuzGrid juz={khatm.juz} onPress={mark} />",
        "      <ReadButton href={`/read/${khatm.next}`} />",
        "    </Screen>",
        "  );",
        "}",
      ],
    },
    {
      name: "useKhatm.ts",
      lines: [
        "export function useKhatm(groupId: string) {",
        "  const khatm = useLiveQuery(groupKhatm(groupId));",
        "",
        "  const mark = (juz: number) =>",
        '    sync.queue({ type: "read", juz, groupId });',
        "",
        "  return { khatm, mark };",
        "}",
      ],
    },
  ],
];

/* 50 characters a second, in steps of three: smooth enough to read as typing,
   and a third fewer renders than one step every 40ms. */
const TICK_MS = 60;
const CHARS_PER_TICK = 3;
/* Pauses, in ticks. */
const LINE_END = 2;
const FILE_DONE = 53;
const NEW_FILE = 5;

/** Where a pane is: the file, the line being written and how much of it. */
interface Pane {
  readonly file: number;
  readonly line: number;
  readonly col: number;
  readonly wait: number;
}

/* Server render and first paint: every pane shows its first file complete,
   then each starts writing its next file a little after the one before. */
const INITIAL: readonly Pane[] = PANES.map((files, i) => ({
  file: 0,
  line: files[0]!.lines.length,
  col: 0,
  wait: 20 + i * 17,
}));

function step(pane: Pane, files: readonly CodeFile[]): Pane {
  if (pane.wait > 0) return { ...pane, wait: pane.wait - 1 };

  const lines = files[pane.file]!.lines;
  if (pane.line >= lines.length) return { file: (pane.file + 1) % files.length, line: 0, col: 0, wait: NEW_FILE };

  const text = lines[pane.line]!;
  if (pane.col < text.length) {
    const col = Math.min(text.length, pane.col + CHARS_PER_TICK);
    return { ...pane, col, wait: col === text.length ? LINE_END : 0 };
  }

  const line = pane.line + 1;
  return { ...pane, line, col: 0, wait: line >= lines.length ? FILE_DONE : 0 };
}

const TOKEN =
  /(\/\/.*$|"[^"]*"|@\w+|\b(?:const|await|for|of|public|sealed|class|void|if|return|export|function|true|false|float|int|var|string|number)\b)/g;

/** Splits a line into plain text, keywords, strings and comments. */
function highlight(line: string): ReactNode[] {
  return line.split(TOKEN).map((part, i) => {
    if (i % 2 === 0) return part;
    const kind = part.startsWith("//") ? styles.comment : part.startsWith('"') ? styles.string : styles.keyword;
    return (
      <span key={i} className={kind}>
        {part}
      </span>
    );
  });
}

/**
 * One line of a pane. Memoised: on each tick only the line being typed changes,
 * so the finished lines above it are not highlighted and diffed again.
 */
const CodeLine = memo(function CodeLine({
  text,
  active,
  caret,
}: {
  readonly text: string;
  readonly active: boolean;
  readonly caret: boolean;
}) {
  return (
    <span className={cx(styles.line, active && styles.active)}>
      {text ? highlight(text) : " "}
      {caret && <i className={cx(styles.caret, active && styles.typing)} />}
    </span>
  );
});

export function CodeField({ className }: { readonly className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [panes, setPanes] = useState(INITIAL);

  useVisibleInterval(root, TICK_MS, () => setPanes((all) => all.map((p, i) => step(p, PANES[i]!))));

  return (
    <div ref={root} className={className} aria-hidden="true">
      <div className={styles.field}>
        {panes.map((pane, f) => {
          const file = PANES[f]![pane.file]!;
          const done = pane.line >= file.lines.length;
          const shown = file.lines.slice(0, done ? file.lines.length : pane.line + 1);

          return (
            <div key={f} className={styles.file}>
              <span className={styles.tab}>
                <span className={cx(styles.dot, !done && styles.dirty)} />
                {file.name}
              </span>
              <pre className={styles.code}>
                {shown.map((line, i) => {
                  const active = !done && i === pane.line;
                  // At rest only the first pane keeps a blinking caret, like a focused editor.
                  const resting = done && f === 0 && i === shown.length - 1;
                  return (
                    <CodeLine
                      key={`${pane.file}-${i}`}
                      text={active ? line.slice(0, pane.col) : line}
                      active={active}
                      caret={active || resting}
                    />
                  );
                })}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
