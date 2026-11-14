import Image from "next/image";
import type { ImageAsset } from "@/core/domain/entities";
import { cx } from "@/shared/lib/cx";
import styles from "./Avatar.module.css";

export interface AvatarProps {
  readonly image: ImageAsset;
  /** Rendered size in CSS pixels; the image is requested at that size. */
  readonly size: number;
  /** Decorative avatars (inside aria-hidden scenes) pass an empty alt. */
  readonly decorative?: boolean;
  readonly className?: string;
}

/** A round portrait, cropped to the face. */
export function Avatar({ image, size, decorative = false, className }: AvatarProps) {
  return (
    <Image
      src={image}
      alt={decorative ? "" : image.alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={80}
      className={cx(styles.avatar, className)}
    />
  );
}
