import Image from "next/image";
import type { FlowVisual as FlowVisualData } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import { VISUAL_SIZES } from "./sizes";
import styles from "./ServiceVisual.module.css";

export function FlowVisual({ visual }: { readonly visual: FlowVisualData }) {
  return (
    <div className={cx(styles.frame, styles.flow)}>
      <Image
        src={visual.image}
        alt={visual.image.alt}
        fill
        sizes={VISUAL_SIZES}
        quality={70}
        placeholder={visual.image.blurDataURL ? "blur" : "empty"}
        className={styles.cover}
        data-zoom=""
      />
      <span className={styles.eyebrow} aria-hidden="true">
        {visual.eyebrow}
      </span>
      <span className={styles.word} aria-hidden="true">
        {visual.word}
      </span>
      <ol className={styles.steps}>
        {visual.steps.map((step, i) => (
          <li key={step} className={i === visual.agentStep ? styles.agent : undefined}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
