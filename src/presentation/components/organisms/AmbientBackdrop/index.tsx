import type { CSSProperties, ReactNode } from "react";
import styles from "./AmbientBackdrop.module.css";

/* Decorative only: what the side gutters of wide screens show behind the sheet.
   The left rail is the work being built, the right rail the agents running it.
   Pure CSS animation (transform and opacity), no client JS. */

const CODE = [
  "// brief → plan → agents → review → ship",
  "const brief = await intake(client.idea);",
  "const plan = await planner.draft(brief, {",
  "  scope: \"mvp\",",
  "  weeks: 3,",
  "});",
  "",
  "const team = spawn([\"ui\", \"logic\", \"tests\", \"docs\"]);",
  "",
  "for (const task of plan.tasks) {",
  "  const draft = await team.next().build(task);",
  "  const report = await evaluate(draft);",
  "  if (report.score < 0.9) {",
  "    await draft.revise(report.notes);",
  "  }",
  "  await review(draft, { human: true });",
  "}",
  "",
  "// every change is tested before it lands",
  "await tests.run({ coverage: 0.92 });",
  "await accessibility.audit(app);",
  "",
  "const release = await ship(app, {",
  "  channels: [\"store\", \"web\"],",
  "  notes: plan.changelog(),",
  "});",
  "",
  "// feedback flows straight into the next brief",
  "watch(release).on(\"feedback\", (item) => {",
  "  backlog.add(triage(item));",
  "});",
  "",
  "export const status = release.live",
  "  ? \"shipped\"",
  "  : \"in review\";",
  "",
];

const LOG: ReadonlyArray<readonly [glyph: string, who: string, what: string]> = [
  ["▸", "agent:ui", "drafted 3 screens"],
  ["✓", "tests", "128 passed · 0 failed"],
  ["▸", "agent:logic", "offline sync refactor"],
  ["◆", "review", "human approved #214"],
  ["✓", "lint", "clean"],
  ["▸", "agent:docs", "changelog updated"],
  ["✓", "build", "ios · android · web"],
  ["◆", "eval", "accessibility 98/100"],
  ["↑", "ship", "release 2.4.0"],
  ["▸", "agent:tests", "+14 edge cases"],
  ["✓", "perf", "cold start 410ms"],
  ["◆", "review", "copy tone checked"],
  ["▸", "agent:ui", "dark mode polish"],
  ["✓", "e2e", "checkout flow green"],
];

const STAGES: ReadonlyArray<readonly [name: string, note: string]> = [
  ["brief", "client idea"],
  ["plan", "6 tasks"],
  ["agents", "×4 parallel"],
  ["tests", "128 ✓"],
  ["review", "human"],
  ["ship", "→ live"],
];

const AGENTS = ["ui", "logic", "tests", "docs"];
const TOKENS = [92, 74, 86, 58, 80];
const DIFF: ReadonlyArray<readonly [kind: "meta" | "del" | "add" | "ok", text: string]> = [
  ["meta", "@@ sync.ts"],
  ["del", "- retry(3)"],
  ["add", "+ retry({ backoff: \"exp\" })"],
  ["add", "+ queue.persist()"],
  ["ok", "✓ reviewed by a human"],
];

const KEYWORDS = new Set(["const", "await", "for", "of", "if", "export", "return", "new", "async"]);
const TOKEN = /(\/\/.*$)|("[^"]*")|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)(?=\s*\()|(\b[A-Za-z_]\w*\b)/g;

/** Tiny highlighter: comments, strings, numbers, calls and keywords. */
function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(line.slice(last, at));
    const [text, comment, str, num, call, word] = m;
    const cls = comment
      ? styles.cm
      : str
        ? styles.str
        : num
          ? styles.num
          : call
            ? styles.fn
            : word && KEYWORDS.has(word)
              ? styles.kw
              : undefined;
    out.push(cls ? <span key={at} className={cls}>{text}</span> : text);
    last = at + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Content repeated so each half of a looping track is taller than any screen. */
function Track({ className, children }: { readonly className: string; readonly children: ReactNode }) {
  return (
    <div className={className}>
      <div className={styles.track}>
        {children}
        {children}
      </div>
    </div>
  );
}

export function AmbientBackdrop() {
  const code = [...CODE, ...CODE].map((line, i) => (
    <div key={i} className={styles.line}>
      {line ? highlight(line) : " "}
    </div>
  ));
  const log = [...LOG, ...LOG, ...LOG].map(([glyph, who, what], i) => (
    <div key={i} className={styles.entry}>
      <span className={styles.glyph}>{glyph}</span>
      <span className={styles.who}>{who}</span>
      <span>{what}</span>
    </div>
  ));

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.glow} />

      {/* Left: the work being built. */}
      <div className={`${styles.rail} ${styles.left}`}>
        <Track className={styles.code}>{code}</Track>

        <div className={`${styles.panel} ${styles.top}`}>
          <div className={styles.head}>
            <span>prompt</span>
            <span className={styles.live} />
          </div>
          <p className={styles.prompt}>
            <span className={styles.caret}>❯</span>
            <span className={styles.typed}>build an offline-first habit app</span>
          </p>
        </div>

        <div className={`${styles.panel} ${styles.middle}`}>
          <div className={styles.head}>
            <span>pipeline</span>
            <span>live</span>
          </div>
          <div className={styles.stages}>
            <span className={styles.spine}>
              <span className={styles.pulse} />
            </span>
            <ol>
              {STAGES.map(([name, note], i) => (
                <li key={name} style={vars({ "--i": i })}>
                  <span className={styles.node} />
                  <span className={styles.stage}>{name}</span>
                  <span className={styles.note}>{note}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={`${styles.panel} ${styles.bottom}`}>
          <div className={styles.head}>
            <span>diff</span>
            <span>+2 −1</span>
          </div>
          <div className={styles.diff}>
            {DIFF.map(([kind, text], i) => (
              <div key={i} className={styles[kind]} style={vars({ "--i": i })}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: the agents running it. */}
      <div className={`${styles.rail} ${styles.right}`}>
        <Track className={styles.log}>{log}</Track>

        <div className={`${styles.panel} ${styles.top}`}>
          <div className={styles.head}>
            <span>model · drafting</span>
            <span className={styles.live} />
          </div>
          <div className={styles.tokens}>
            {TOKENS.map((w, i) => (
              <span key={i} style={vars({ "--i": i, "--w": `${w}%` })} />
            ))}
          </div>
        </div>

        <div className={`${styles.panel} ${styles.middle}`}>
          <div className={styles.head}>
            <span>agents</span>
            <span>parallel</span>
          </div>
          <ul className={styles.agents}>
            {AGENTS.map((name, i) => (
              <li key={name} style={vars({ "--i": i })}>
                <span className={styles.agent}>{name}</span>
                <span className={styles.bar}>
                  <span />
                </span>
                <span className={styles.tick}>✓</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.panel} ${styles.bottom}`}>
          <div className={styles.head}>
            <span>tests</span>
            <span>128 ✓</span>
          </div>
          <div className={styles.matrix}>
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} style={vars({ "--d": (i % 10) + Math.floor(i / 10) })} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
