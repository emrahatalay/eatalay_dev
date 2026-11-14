import Image from "next/image";
import type { ImageAsset } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./PhoneFrame.module.css";

export interface PhoneFrameProps {
  readonly image: ImageAsset;
  /** `sizes` for next/image: how wide the phone is drawn at each breakpoint. */
  readonly sizes: string;
  readonly priority?: boolean;
  readonly className?: string;
}

/**
 * A tall, thin phone (20:9) around an in-game screenshot. Pure CSS: the
 * body, camera island and side buttons are pseudo-elements, so the image is
 * the only request.
 */
export function PhoneFrame({ image, sizes, priority, className }: PhoneFrameProps) {
  return (
    <div className={cx(styles.phone, className)}>
      <div className={styles.screen}>
        <Image
          src={image}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={75}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          className={styles.image}
        />
      </div>
    </div>
  );
}
