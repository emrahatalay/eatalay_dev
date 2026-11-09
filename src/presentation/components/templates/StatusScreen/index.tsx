import type { ReactNode } from "react";
import styles from "./StatusScreen.module.css";

export interface StatusScreenProps {
  readonly code: string;
  readonly title: string;
  readonly text: string;
  readonly children?: ReactNode;
}

/** Full-height dark card for 404 / error states. */
export function StatusScreen({ code, title, text, children }: StatusScreenProps) {
  return (
    <main className={styles.screen}>
      <div className={styles.card}>
        <p className={styles.code} aria-hidden="true">
          {code}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
        {children}
      </div>
    </main>
  );
}
