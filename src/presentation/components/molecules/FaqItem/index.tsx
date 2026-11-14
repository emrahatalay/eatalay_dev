import type { FaqItem as FaqEntity } from "@/core/domain/entities";
import styles from "./FaqItem.module.css";

export interface FaqItemProps {
  readonly item: FaqEntity;
  /** Position in the list, shown as 01, 02... */
  readonly index: number;
  readonly open?: boolean;
}

/** Native <details> accordion: accessible and works without JavaScript. */
export function FaqItem({ item, index, open }: FaqItemProps) {
  return (
    <details className={`${styles.item} reveal`} open={open}>
      <summary className={styles.question} data-agent-target="">
        <span className={styles.number} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.text}>{item.question}</span>
        <span className={styles.toggle} aria-hidden="true" />
      </summary>
      <p className={styles.answer}>{item.answer}</p>
    </details>
  );
}
