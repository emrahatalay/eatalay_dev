import Image from "next/image";
import type { PhotoVisual as PhotoVisualData } from "@/core/domain/entities";
import { LiveBadge } from "@/presentation/components/atoms/LiveBadge";
import { VISUAL_SIZES } from "./sizes";
import styles from "./ServiceVisual.module.css";

export function PhotoVisual({ visual }: { readonly visual: PhotoVisualData }) {
  return (
    <div className={styles.frame}>
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
      <span className={styles.badge}>
        <LiveBadge>{visual.badge}</LiveBadge>
      </span>
    </div>
  );
}
