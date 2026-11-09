import type { ReactNode } from "react";
import { cx } from "@/shared/lib/cx";
import styles from "./HighlightCard.module.css";

export type HighlightTone = "soft" | "night" | "warm" | "photo";

export interface HighlightCardProps {
  readonly tone: HighlightTone;
  readonly children: ReactNode;
  readonly className?: string;
}

/** Rounded stat/feature card with a hover lift. Tone picks the surface. */
export function HighlightCard({ tone, children, className }: HighlightCardProps) {
  return <div className={cx(styles.card, styles[tone], className)}>{children}</div>;
}
