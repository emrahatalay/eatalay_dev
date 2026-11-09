import Image from "next/image";
import { useTranslations } from "next-intl";
import iridescent from "@/assets/images/iridescent.jpg";
import type { AboutContent, TechnologyHue } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { Monogram } from "@/presentation/components/atoms/Monogram";
import { HighlightCard } from "@/presentation/components/molecules/HighlightCard";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./About.module.css";

const AVATAR_HUES: readonly TechnologyHue[] = ["orange", "violet", "green", "sky"];

export function About({ content }: { readonly content: AboutContent }) {
  const t = useTranslations("About");

  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.ribbon} aria-hidden="true">
        <i style={{ left: 40, top: 30, ["--r" as string]: "-38deg" }} />
        <i style={{ left: 100, top: 10, ["--r" as string]: "-24deg" }} />
        <i style={{ left: 160, top: 0, ["--r" as string]: "-10deg" }} />
        <i style={{ left: 220, top: 6, ["--r" as string]: "6deg" }} />
      </div>

      <Chip>{t("eyebrow")}</Chip>
      <RichHeadline id="about-title" text={content.headline} />
      <p className={`${styles.summary} reveal`}>{content.summary}</p>

      <div className={styles.stats}>
        <HighlightCard tone="soft" className={styles.tall}>
          <div className={styles.metric}>
            <span className={styles.spark} aria-hidden="true">
              ✦
            </span>
            <strong className={styles.big}>{content.experience.value}</strong>
          </div>
          <p className={styles.note}>{content.experience.label}</p>
        </HighlightCard>

        <div className={styles.column}>
          <HighlightCard tone="night" className={styles.disciplines}>
            <span className={styles.avatars}>
              {content.disciplines.initials.map((letter, i) => (
                <Monogram key={letter + i} text={letter} hue={AVATAR_HUES[i % AVATAR_HUES.length]} shape="circle" />
              ))}
            </span>
            <span className={styles.caption}>{content.disciplines.label}</span>
          </HighlightCard>
          <HighlightCard tone="warm" className={styles.workflow}>
            <strong className={styles.hot}>{content.workflow.value}</strong>
            <span className={styles.note}>{content.workflow.label}</span>
          </HighlightCard>
        </div>

        <HighlightCard tone="photo" className={styles.quoteCard}>
          <Image
            src={iridescent}
            alt=""
            fill
            sizes="(max-width: 900px) 92vw, 380px"
            quality={60}
            placeholder="blur"
            className={styles.photo}
          />
          <span className={styles.shade} aria-hidden="true" />
          <span className={styles.mark} aria-hidden="true">
            “
          </span>
          <p className={styles.quote}>{content.quote}</p>
        </HighlightCard>
      </div>
    </section>
  );
}
