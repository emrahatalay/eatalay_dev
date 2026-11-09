import type { ReactNode } from "react";
import { cx } from "@/shared/lib/cx";
import styles from "./Chip.module.css";

export interface ChipProps {
  readonly children: ReactNode;
  readonly tone?: "light" | "dark";
  readonly className?: string;
}

/** Small gradient-bordered label used as a section eyebrow. */
export function Chip({ children, tone = "light", className }: ChipProps) {
  return <span className={cx(styles.chip, styles[tone], "reveal", className)}>{children}</span>;
}
