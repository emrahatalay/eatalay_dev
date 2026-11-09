import styles from "./SerifAccent.module.css";

/** Italic serif word mixed into display type. */
export function SerifAccent({ children }: { readonly children: string }) {
  return <span className={styles.serif}>{children}</span>;
}
