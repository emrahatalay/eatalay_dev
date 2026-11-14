import type { CSSProperties } from "react";
import type { WebVisual as WebVisualData } from "@/core/domain/entities";
import { LiveBadge } from "@/presentation/components/atoms/LiveBadge";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

/**
 * A page loading in a browser on a loop: the sections settle in from the top,
 * then the pre-launch checks tick off one by one beside it.
 */
export function WebVisual({ visual }: { readonly visual: WebVisualData }) {
  return (
    <div className={cx(styles.frame, styles.web)} data-motion="">
      <div className={styles.browser} aria-hidden="true">
        <span className={styles.browserBar}>
          <span className={styles.browserDots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.address}>
            <svg viewBox="0 0 16 16">
              <path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2" />
              <rect x="3" y="7" width="10" height="7" rx="2" />
            </svg>
            {visual.url}
          </span>
        </span>

        <div className={styles.page}>
          <span className={cx(styles.pageNav, styles.load)} style={{ "--i": 0 } as CSSProperties}>
            <b />
            <i />
            <i />
            <i />
            <em />
          </span>
          <span className={cx(styles.pageTitle, styles.load)} style={{ "--i": 1 } as CSSProperties}>
            {visual.headline}
          </span>
          <span className={cx(styles.pageLine, styles.load)} style={{ "--i": 2 } as CSSProperties} />
          <span className={cx(styles.pageLine, styles.pageLineShort, styles.load)} style={{ "--i": 2 } as CSSProperties} />
          <span className={cx(styles.pageCta, styles.load)} style={{ "--i": 3 } as CSSProperties} />
          <span className={cx(styles.pageCards, styles.load)} style={{ "--i": 4 } as CSSProperties}>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>

      <ul className={cx(styles.panel, styles.checks)} aria-hidden="true">
        {visual.checks.map((check, i) => (
          <li key={check} className={styles.check} style={{ "--i": i } as CSSProperties}>
            <b>✓</b>
            {check}
          </li>
        ))}
      </ul>

      <span className={styles.badge}>
        <LiveBadge>{visual.badge}</LiveBadge>
      </span>
    </div>
  );
}
