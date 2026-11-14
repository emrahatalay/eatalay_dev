import { useTranslations } from "next-intl";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { ProjectCard, type ProjectCardData } from "@/presentation/components/molecules/ProjectCard";
import styles from "./PortfolioPreview.module.css";

export interface PortfolioPreviewProps {
  /** The newest few projects; the rest live on the portfolio page. */
  readonly cards: readonly ProjectCardData[];
  readonly total: number;
  readonly href: string;
}

/**
 * Home-page window onto the portfolio: the newest projects plus a tile into the full list.
 * Its size never changes, however many case studies are added.
 */
export function PortfolioPreview({ cards, total, href }: PortfolioPreviewProps) {
  const t = useTranslations("Portfolio");
  const hidden = total - cards.length;

  return (
    <section className={styles.preview} id="portfolio" aria-labelledby="portfolio-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <DisplayHeading id="portfolio-title" className={styles.title}>
            <a href={href} className={styles.titleLink}>
              {t("title")}
            </a>
            <span className={styles.count} aria-hidden="true">
              ({String(total).padStart(2, "0")})
            </span>
          </DisplayHeading>
        </div>
        <div className={styles.aside}>
          <p className={styles.text}>{t("teaserText")}</p>
          <ButtonLink href={href}>{t("viewAll")}</ButtonLink>
        </div>
      </div>

      <ul className={styles.grid}>
        {cards.map((card) => (
          <li key={card.slug}>
            <ProjectCard card={card} />
          </li>
        ))}
        <li>
          <a href={href} className={styles.more}>
            <span className={styles.moreCount}>{t("count", { count: total })}</span>
            <span className={styles.moreLabel}>
              {hidden > 0 ? t("more", { count: hidden }) : t("browse")}
            </span>
            <span className={styles.moreArrow} aria-hidden="true">
              →
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
