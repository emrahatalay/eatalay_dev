import type { ReactNode } from "react";
import styles from "./PageShell.module.css";

/** Glowing page background with the centred white "sheet" (max width 1392px). */
export function PageShell({ children, skipLabel }: { readonly children: ReactNode; readonly skipLabel: string }) {
  return (
    <div className={styles.page}>
      <a href="#main" className={styles.skip}>
        {skipLabel}
      </a>
      <div className={styles.sheet}>{children}</div>
    </div>
  );
}
