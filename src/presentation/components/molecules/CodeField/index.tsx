import type { ReactNode } from "react";
import styles from "./CodeField.module.css";

/*
 * Decorative "editor" backdrop for the footer: three short files in the three things
 * I build (an AI agent pipeline, a Unity game, a mobile app). Pure text, no image request.
 */
const FILES: readonly { readonly name: string; readonly lines: readonly string[] }[] = [
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
    name: "TodayScreen.tsx",
    lines: [
      "export function TodayScreen() {",
      "  const { khatm, mark } = useKhatm(groupId);",
      "",
      "  return (",
      "    <Screen title=\"Bugün\">",
      "      <JuzGrid juz={khatm.juz} onPress={mark} />",
      "      <ReadButton href={`/read/${khatm.next}`} />",
      "    </Screen>",
      "  );",
      "}",
    ],
  },
];

const TOKEN =
  /(\/\/.*$|"[^"]*"|@\w+|\b(?:const|await|for|of|public|sealed|class|void|if|return|export|function|true|false|float)\b)/g;

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

export function CodeField({ className }: { readonly className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className={styles.field}>
        {FILES.map((file, f) => (
          <div key={file.name} className={styles.file}>
            <span className={styles.tab}>{file.name}</span>
            <pre className={styles.code}>
              {file.lines.map((line, i) => (
                <span key={i} className={styles.line}>
                  {highlight(line)}
                  {f === 0 && i === file.lines.length - 1 && <i className={styles.caret} />}
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
