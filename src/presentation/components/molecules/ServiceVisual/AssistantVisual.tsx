import Image from "next/image";
import type { AssistantVisual as AssistantVisualData } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./ServiceVisual.module.css";

export function AssistantVisual({ visual }: { readonly visual: AssistantVisualData }) {
  return (
    <div className={cx(styles.frame, styles.assistant)}>
      <span className={styles.watermark} aria-hidden="true">
        {visual.watermark}
      </span>
      <div className={styles.handPhone} data-zoom="">
        <Image
          src={visual.image}
          alt={visual.image.alt}
          fill
          sizes="(max-width: 900px) 70vw, 380px"
          quality={70}
          placeholder={visual.image.blurDataURL ? "blur" : "empty"}
        />
        <div className={styles.screen} aria-hidden="true">
          <b>{visual.prompt}</b>
          <i />
          <i />
          <i />
        </div>
      </div>
      <p className={styles.caption}>
        {visual.caption.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
