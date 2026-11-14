import { useTranslations } from "next-intl";
import type { ProjectCta as Cta, ProjectLink } from "@/core/domain/entities";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import styles from "./ProjectCta.module.css";

export interface ProjectCtaProps {
  readonly cta: Cta;
  readonly contactHref: string;
  readonly link: ProjectLink;
}

/** Closing call to action: book a call or open the project. */
export function ProjectCta({ cta, contactHref, link }: ProjectCtaProps) {
  const t = useTranslations("Project");

  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.eyebrow}>{t("ctaEyebrow")}</p>
      <h2 id="cta-title" className={styles.title}>
        {cta.title}
      </h2>
      <p className={styles.text}>{cta.text}</p>
      <div className={styles.actions}>
        <ButtonLink href={contactHref} variant="light">
          {t("ctaPrimary")}
        </ButtonLink>
        <ButtonLink href={link.url} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
          {link.label}
        </ButtonLink>
      </div>
    </section>
  );
}
