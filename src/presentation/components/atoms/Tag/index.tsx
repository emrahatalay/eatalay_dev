import styles from "./Tag.module.css";

export function Tag({ children }: { readonly children: string }) {
  return <li className={styles.tag}>{children}</li>;
}
