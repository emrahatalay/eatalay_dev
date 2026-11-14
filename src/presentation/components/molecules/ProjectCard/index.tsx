import type { ImageAsset, ProjectPalette, ProjectStatus } from "@/core/domain/entities";
import { SerifAccent } from "@/presentation/components/atoms/SerifAccent";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import { paletteStyle } from "@/presentation/theme/project-palette";
import styles from "./ProjectCard.module.css";

/** Everything a card shows, already translated and formatted (safe to pass to client components). */
export interface ProjectCardData {
  readonly slug: string;
  readonly href: string;
  readonly name: string;
  readonly accent: string;
  readonly text: string;
  readonly ctaLabel: string;
  readonly badges: readonly string[];
  readonly kindLabel: string;
  readonly status: ProjectStatus;
  readonly statusLabel: string;
  readonly dateLabel: string;
  readonly palette: ProjectPalette;
  /** Front phone first. */
  readonly phones: readonly [ImageAsset, ImageAsset];
}

export interface ProjectCardProps {
  readonly card: ProjectCardData;
  readonly headingLevel?: "h2" | "h3";
}

/** A project tile in the product's own colours: two phones on top, the pitch below. The whole card links to the case study. */
export function ProjectCard({ card, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const [front, back] = card.phones;
  const titleId = `card-${card.slug}`;

  return (
    <article className={styles.card} style={paletteStyle(card.palette)} aria-labelledby={titleId}>
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.glow} />
        <PhoneFrame image={{ ...back, alt: "" }} sizes="150px" className={styles.back} />
        <PhoneFrame image={{ ...front, alt: "" }} sizes="170px" className={styles.front} />
      </div>

      <div className={styles.meta}>
        <span className={styles.pill}>{card.kindLabel}</span>
        <span className={styles.pill}>
          <span className={card.status === "live" ? styles.live : styles.building} aria-hidden="true" />
          {card.statusLabel}
        </span>
        <span className={styles.date}>{card.dateLabel}</span>
      </div>

      <div className={styles.body}>
        <Heading id={titleId} className={styles.title}>
          <a href={card.href} className={styles.link}>
            <span className={styles.name}>{card.name}</span>
            <span className={styles.accent}>
              <SerifAccent>{card.accent}</SerifAccent>
            </span>
          </a>
        </Heading>
        <p className={styles.text}>{card.text}</p>
        <ul className={styles.badges}>
          {card.badges.map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>
        <span className={styles.cta} aria-hidden="true">
          {card.ctaLabel} <span className={styles.arrow}>→</span>
        </span>
      </div>
    </article>
  );
}
