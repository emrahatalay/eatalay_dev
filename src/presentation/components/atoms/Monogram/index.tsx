import type { TechnologyHue } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./Monogram.module.css";

export interface MonogramProps {
  readonly text: string;
  readonly hue: TechnologyHue;
  readonly shape?: "square" | "circle";
}

/** Gradient mark with one or two letters (technology logos, avatars). */
export function Monogram({ text, hue, shape = "square" }: MonogramProps) {
  return (
    <i className={cx(styles.mark, styles[shape], styles[hue])} aria-hidden="true">
      {text}
    </i>
  );
}
