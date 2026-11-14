import type { ReactNode } from "react";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import styles from "./PortfolioHero.module.css";

export interface PortfolioHeroProps {
  readonly header: ReactNode;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly total: number;
  /** e.g. "2 projects". */
  readonly countLabel: string;
}

/** Dark poster on top of the portfolio page: the title in outline type and the project count. */
export function PortfolioHero({ header, eyebrow, title, intro, total, countLabel }: PortfolioHeroProps) {
  return (
    <header className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {header}

      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {eyebrow}
        </p>
        <DisplayHeading as="h1" className={styles.title}>
          {title}
          <span className={styles.count} aria-hidden="true">
            ({String(total).padStart(2, "0")})
          </span>
        </DisplayHeading>
        <div className={styles.foot}>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.total}>{countLabel}</p>
        </div>
      </div>
    </header>
  );
}
