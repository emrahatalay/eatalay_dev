import styles from "./LiveBadge.module.css";

/** Frosted pill with a pulsing "live" dot. */
export function LiveBadge({ children }: { readonly children: string }) {
  return (
    <span className={styles.badge}>
      <i className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
