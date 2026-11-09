import type { FaqItem as FaqEntity } from "@/core/domain/entities";
import styles from "./FaqItem.module.css";

/** Native <details> accordion: accessible and works without JavaScript. */
export function FaqItem({ item, open }: { readonly item: FaqEntity; readonly open?: boolean }) {
  return (
    <details className={`${styles.item} reveal`} open={open}>
      <summary className={styles.question}>{item.question}</summary>
      <p className={styles.answer}>{item.answer}</p>
    </details>
  );
}
