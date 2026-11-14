import type { CSSProperties, ReactNode } from "react";
import { MotionGate } from "@/presentation/components/atoms/MotionGate";
import { AmbientBackdrop } from "@/presentation/components/organisms/AmbientBackdrop";
import styles from "./PageShell.module.css";

/** Page background (an ambient AI-work scene in the side gutters) with the centred "sheet" (max width 1392px). */
export interface PageShellProps {
  readonly children: ReactNode;
  readonly skipLabel: string;
  /** Extra custom properties for the whole page, e.g. a project's palette. */
  readonly style?: CSSProperties;
}

export function PageShell({ children, skipLabel, style }: PageShellProps) {
  return (
    <div className={styles.page} style={style}>
      <a href="#main" className={styles.skip}>
        {skipLabel}
      </a>
      <AmbientBackdrop />
      <div className={styles.sheet}>{children}</div>
      <MotionGate />
    </div>
  );
}
