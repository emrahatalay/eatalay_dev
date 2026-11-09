import type { RichText, TextTone } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./RichHeadline.module.css";

export interface RichHeadlineProps {
  readonly text: RichText;
  readonly as?: "h2" | "p";
  readonly id?: string;
  readonly onDark?: boolean;
  readonly className?: string;
}

const toneClass: Record<TextTone, string | undefined> = {
  default: undefined,
  accent: styles.accent,
  muted: styles.muted,
};

/**
 * Large statement headline. Each word is its own span so it can "light up"
 * as it scrolls into view (pure CSS, no JavaScript).
 */
export function RichHeadline({ text, as: Tag = "h2", id, onDark, className }: RichHeadlineProps) {
  return (
    <Tag id={id} className={cx(styles.headline, onDark && styles.onDark, className)}>
      {text.map((segment, si) =>
        segment.text.split(" ").map((word, wi) => (
          <span key={`${si}-${wi}`} className={cx(styles.word, toneClass[segment.tone ?? "default"])}>
            {word}{" "}
          </span>
        )),
      )}
    </Tag>
  );
}
