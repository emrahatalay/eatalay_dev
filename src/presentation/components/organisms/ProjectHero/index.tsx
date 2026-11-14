import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { Project } from "@/core/domain/entities";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { SerifAccent } from "@/presentation/components/atoms/SerifAccent";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import styles from "./ProjectHero.module.css";

export interface ProjectHeroProps {
  readonly project: Project;
  readonly header: ReactNode;
}

/** Dark poster for a project: name, slogan, two phones. */
export function ProjectHero({ project, header }: ProjectHeroProps) {
  const t = useTranslations("Project");
  const { hero, badges, link, schema } = project;
  const [front, back] = hero.phones;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      {schema.type === "VideoGame" && <div className={styles.road} aria-hidden="true" />}

      {header}

      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.live} aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <DisplayHeading as="h1" className={styles.title}>
            <span className={styles.name}>{hero.title}</span>{" "}
            <span className={styles.accent}>
              <SerifAccent>{hero.accent}</SerifAccent>
            </span>
          </DisplayHeading>
          <p className={styles.slogan}>“{hero.slogan}”</p>
          <p className={styles.summary}>{hero.summary}</p>

          <div className={styles.actions}>
            <ButtonLink href="#screens">{t("screens")}</ButtonLink>
            <ButtonLink href={link.url} variant="light" target="_blank" rel="noopener noreferrer">
              {link.label}
            </ButtonLink>
          </div>

          <ul className={styles.badges}>
            {badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        </div>

        <div className={styles.phones}>
          <PhoneFrame
            image={back.image}
            sizes="(max-width: 640px) 46vw, 250px"
            className={styles.back}
          />
          <PhoneFrame
            image={front.image}
            sizes="(max-width: 640px) 56vw, 300px"
            priority
            className={styles.front}
          />
          <span className={styles.halo} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
