import type { ReactNode } from "react";
import styles from "./CodeBlock.module.css";

const KEYWORDS = new Set([
  "public", "private", "protected", "internal", "sealed", "abstract", "override", "virtual", "static",
  "readonly", "class", "struct", "interface", "void", "float", "int", "bool", "string", "new", "return",
  "if", "else", "for", "foreach", "in", "var", "using", "namespace", "true", "false", "null", "in",
]);

// Comments, strings, numbers with an optional "f", then identifiers.
const TOKEN = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?f?\b)|([A-Za-z_]\w*)/g;

/** Tiny server-side C# highlighter: enough colour to read, no client JavaScript. */
function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const [text, comment, str, num, ident] = match;
    const index = match.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    let cls: string | undefined;
    if (comment) cls = styles.comment;
    else if (str) cls = styles.string;
    else if (num) cls = styles.number;
    else if (ident && KEYWORDS.has(ident)) cls = styles.keyword;
    else if (ident && /^[A-Z]/.test(ident)) cls = styles.type;
    out.push(cls ? <span key={index} className={cls}>{text}</span> : text);
    last = index + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export interface CodeBlockProps {
  readonly filename: string;
  readonly code: string;
  readonly caption?: string;
}

/** Editor-style window around a code sample. */
export function CodeBlock({ filename, code, caption }: CodeBlockProps) {
  return (
    <figure className={styles.window}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.filename}>{filename}</span>
      </div>
      <pre className={styles.pre}>
        <code>{highlight(code)}</code>
      </pre>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
