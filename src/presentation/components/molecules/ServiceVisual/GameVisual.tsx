import type { GameVisual as GameVisualData } from "@/core/domain/entities";
import { LiveBadge } from "@/presentation/components/atoms/LiveBadge";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

/** Gameplay on the phone, the tuning behind it in a Unity-style inspector, and how players stick. */
export function GameVisual({ visual }: { readonly visual: GameVisualData }) {
  return (
    <div className={cx(styles.frame, styles.game)}>
      <div className={styles.device} data-zoom="">
        <PhoneFrame image={visual.screen} sizes="(max-width: 640px) 120px, 170px" className={styles.deviceFrame} />
        <span className={styles.coin} aria-hidden="true">
          +10
        </span>
      </div>

      <div className={styles.panel} aria-hidden="true">
        <span className={styles.inspectorHead}>
          <i />
          {visual.component}
        </span>
        <dl className={styles.fields}>
          {visual.fields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.metric} aria-hidden="true">
        <span>
          <small>{visual.metric.label}</small>
          <b>{visual.metric.value}</b>
        </span>
        <svg viewBox="0 0 80 28">
          <polyline points="2,24 13,21 24,22 35,15 46,16 57,9 68,10 78,4" pathLength={100} />
        </svg>
      </div>

      <span className={styles.badge}>
        <LiveBadge>{visual.badge}</LiveBadge>
      </span>
    </div>
  );
}
