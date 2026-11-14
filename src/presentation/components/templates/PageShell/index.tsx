import type { CSSProperties, ReactNode } from "react";
import styles from "./PageShell.module.css";

/** Glowing page background with the centred white "sheet" (max width 1392px). */
export interface PageShellProps {
  readonly children: ReactNode;
  readonly skipLabel: string;
  /** Extra custom properties for the whole page, e.g. a project's palette. */
  readonly style?: CSSProperties;
}

export function PageShell({ children, skipLabel, style }: PageShellProps) {
  return (
    <div className={styles.page} style={style}>
      <a href="#main" className={styles.skip}>
        {skipLabel}
      </a>
      <div className={styles.sheet}>{children}</div>
    </div>
  );
}
