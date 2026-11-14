import { useTranslations } from "next-intl";
import type { Project } from "@/core/domain/entities";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { SerifAccent } from "@/presentation/components/atoms/SerifAccent";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import styles from "./FeaturedProject.module.css";

export interface FeaturedProjectProps {
  readonly project: Project;
  readonly href: string;
}

/** Home-page banner that sends visitors to a project's case study. */
export function FeaturedProject({ project, href }: FeaturedProjectProps) {
  const t = useTranslations("FeaturedProject");
  const { teaser, hero, repository } = project;

  return (
    <section className={styles.featured} id="featured" aria-labelledby="featured-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {teaser.kicker}
        </p>
        <DisplayHeading id="featured-title" className={styles.title}>
          <a href={href} className={styles.titleLink}>
            <span className={styles.name}>{hero.title}</span>{" "}
            <span className={styles.accent}>
              <SerifAccent>{hero.accent}</SerifAccent>
            </span>
          </a>
        </DisplayHeading>
        <p className={styles.slogan}>“{hero.slogan}”</p>
        <p className={styles.text}>{teaser.text}</p>
        <div className={styles.actions}>
          <ButtonLink href={href}>{teaser.ctaLabel}</ButtonLink>
          <ButtonLink href={repository.url} variant="light" target="_blank" rel="noopener noreferrer">
            {t("source")}
          </ButtonLink>
        </div>
      </div>

      <a href={href} className={styles.phones} tabIndex={-1} aria-hidden="true">
        {teaser.phones.map((phone, i) => (
          <PhoneFrame
            key={phone.image.src}
            image={phone.image}
            sizes="(max-width: 640px) 34vw, 210px"
            className={styles[`phone${i}`]}
          />
        ))}
      </a>
    </section>
  );
}
