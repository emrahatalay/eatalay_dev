import type { ShipVisual as ShipVisualData } from "@/core/domain/entities";
import { LiveBadge } from "@/presentation/components/atoms/LiveBadge";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

/** A build log from one codebase to both stores, beside the screen it shipped. */
export function ShipVisual({ visual }: { readonly visual: ShipVisualData }) {
  return (
    <div className={cx(styles.frame, styles.ship)}>
      <div className={styles.panel} aria-hidden="true">
        <span className={styles.panelBar}>
          <i />
          <i />
          <i />
        </span>
        <div className={styles.log}>
          <span className={styles.cmd}>{visual.command}</span>
          {visual.steps.map((step, i) => (
            <span key={step.text} className={styles.step}>
              <b className={step.mark === "done" ? styles.done : styles.sent}>{step.mark === "done" ? "✓" : "↑"}</b>
              {step.text}
              {i === visual.steps.length - 1 && <i className={styles.logCaret} />}
            </span>
          ))}
          <span className={styles.progress}>
            <i />
          </span>
        </div>
      </div>

      <div className={styles.device} data-zoom="">
        <PhoneFrame image={visual.screen} sizes="(max-width: 640px) 120px, 170px" className={styles.deviceFrame} />
      </div>

      <span className={styles.badge}>
        <LiveBadge>{visual.badge}</LiveBadge>
      </span>
    </div>
  );
}
