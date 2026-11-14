import { useTranslations } from "next-intl";
import type { Screenshot } from "@/core/domain/entities";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import styles from "./ProjectGallery.module.css";

/** Horizontally scrolling strip of phone screenshots (CSS scroll snap, no JavaScript). */
export function ProjectGallery({ shots }: { readonly shots: readonly Screenshot[] }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.gallery} id="screens" aria-labelledby="screens-title">
      <div className={styles.head}>
        <p className={styles.eyebrow}>{t("galleryEyebrow")}</p>
        <DisplayHeading id="screens-title" className={styles.title}>
          {t("galleryTitle")}
        </DisplayHeading>
        <p className={styles.hint}>{t("galleryHint")}</p>
      </div>

      {/* Focusable so keyboard users can scroll it with the arrow keys. */}
      <ul className={styles.strip} tabIndex={0} aria-label={t("galleryLabel")}>
        {shots.map((shot, i) => (
          <li key={shot.image.src} className={styles.item}>
            <figure className={styles.figure}>
              <PhoneFrame image={shot.image} sizes="(max-width: 640px) 62vw, 270px" className={styles.phone} />
              <figcaption className={styles.caption}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
