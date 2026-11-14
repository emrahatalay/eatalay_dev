import type { DesignVisual as DesignVisualData } from "@/core/domain/entities";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

/**
 * A design canvas: the wireframe on the left, the shipped screen selected
 * on the right, with design tokens, a component chip and a live cursor.
 */
export function DesignVisual({ visual }: { readonly visual: DesignVisualData }) {
  return (
    <div className={cx(styles.frame, styles.design)}>
      <div className={styles.tokens} aria-hidden="true">
        <span className={styles.swatches}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.specimen}>Aa</span>
      </div>

      <div className={styles.wire} aria-hidden="true">
        <span className={styles.frameLabel}>{visual.wireframe}</span>
        <i className={styles.wireBar} />
        <i className={styles.wireHero} />
        <i />
        <i />
        <i className={styles.wireShort} />
        <i className={styles.wireButton} />
      </div>

      <div className={styles.selected} data-zoom="">
        <span className={styles.sizeLabel} aria-hidden="true">
          {visual.size}
        </span>
        <PhoneFrame image={visual.screen} sizes="(max-width: 640px) 120px, 170px" className={styles.hifi} />
        <span className={styles.handles} aria-hidden="true">
          <i />
          <i />
        </span>
        <span className={styles.cursor} aria-hidden="true">
          <svg viewBox="0 0 16 18">
            <path d="M1 1l13 6.5-5.6 1.7L6 15z" />
          </svg>
          <b>{visual.cursor}</b>
        </span>
      </div>

      <span className={styles.component} aria-hidden="true">
        <i />
        {visual.component}
      </span>
    </div>
  );
}
