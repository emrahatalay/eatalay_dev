import Image from "next/image";
import { useTranslations } from "next-intl";
import heroRings from "@/assets/images/hero-rings.jpg";
import type { HeroContent, Technology } from "@/core/domain/entities";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { LongArrowIcon } from "@/presentation/components/atoms/Icon";
import { TechMarquee } from "@/presentation/components/molecules/TechMarquee";
import type { ReactNode } from "react";
import styles from "./Hero.module.css";

export interface HeroProps {
  readonly content: HeroContent;
  readonly technologies: readonly Technology[];
  readonly header: ReactNode;
}

export function Hero({ content, technologies, header }: HeroProps) {
  const t = useTranslations("Hero");

  return (
    <header className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.streak} aria-hidden="true" />
      <div className={styles.art} aria-hidden="true">
        <Image
          src={heroRings}
          alt=""
          fill
          preload
          fetchPriority="high"
          quality={75}
          sizes="(max-width: 640px) 720px, 980px"
          className={styles.artImage}
        />
      </div>

      {header}

      <div className={styles.copy}>
        <p className={styles.greeting}>{content.greeting}</p>
        <DisplayHeading as="h1" className={styles.title}>
          <span className={styles.line}>
            <span className={styles.lead}>{content.titleLead}</span>
          </span>
          <span className={styles.line}>
            <span className={styles.tail}>
              <span className={styles.arrow} aria-hidden="true">
                <LongArrowIcon />
              </span>
              {content.titleTail}
            </span>
          </span>
        </DisplayHeading>
      </div>

      <TechMarquee items={technologies} label={t("technologies")} />
    </header>
  );
}
