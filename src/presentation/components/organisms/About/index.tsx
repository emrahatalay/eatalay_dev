import Image from "next/image";
import { useTranslations } from "next-intl";
import type { AboutContent, DisciplineVisual, Profile } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { HighlightCard } from "@/presentation/components/molecules/HighlightCard";
import { DeliveryLog } from "@/presentation/components/molecules/DeliveryLog";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./About.module.css";

/** The agent team from the quote, as a little run log. Progress is a share of 1. */
const AGENTS: readonly { readonly name: string; readonly progress: number }[] = [
  { name: "research", progress: 1 },
  { name: "tests", progress: 0.72 },
  { name: "refactor", progress: 0.45 },
  { name: "docs", progress: 0.88 },
];

function DisciplineTile({ visual }: { readonly visual: DisciplineVisual }) {
  switch (visual.kind) {
    case "screen":
      return (
        <Image src={visual.image} alt="" fill sizes="64px" quality={70} className={styles.tileImage} />
      );
    case "web":
      return (
        <svg className={styles.webGlyph} viewBox="0 0 64 64" fill="none">
          <rect x="10" y="14" width="44" height="36" rx="6" />
          <path d="M10 24h44" />
          <path d="M27 32l-5 5 5 5M37 32l5 5-5 5" className={styles.webHot} />
        </svg>
      );
    case "flow":
      return (
        <svg className={styles.flowGlyph} viewBox="0 0 64 64" fill="none">
          <path d="M16 20h14a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6h6" />
          <path d="M16 44h14" />
          <circle cx="14" cy="20" r="5" />
          <circle cx="14" cy="44" r="5" />
          <circle cx="50" cy="44" r="6" className={styles.flowHot} />
        </svg>
      );
  }
}

export interface AboutProps {
  readonly content: AboutContent;
  readonly profile: Profile;
}

export function About({ content, profile }: AboutProps) {
  const t = useTranslations("About");

  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.intro}>
        <div className={styles.introCopy}>
          <Chip>{t("eyebrow")}</Chip>
          <RichHeadline id="about-title" text={content.headline} className={styles.headline} />
          <p className={`${styles.summary} reveal`}>{content.summary}</p>
        </div>
        <DeliveryLog log={content.log} avatar={profile.avatar} />
      </div>

      <div className={styles.stats}>
        <HighlightCard tone="soft" className={styles.tall}>
          <div className={styles.metric}>
            <span className={styles.spark} aria-hidden="true">
              ✦
            </span>
            <strong className={styles.big}>{content.experience.value}</strong>
          </div>
          <p className={styles.note}>{content.experience.label}</p>
          <div className={styles.screens}>
            {content.experience.screens.map((image, i) => (
              <PhoneFrame key={image.src} image={image} sizes="130px" className={styles[`screen${i}`]} />
            ))}
          </div>
        </HighlightCard>

        <div className={styles.column}>
          <HighlightCard tone="night" className={styles.disciplines}>
            <ul className={styles.tiles}>
              {content.disciplines.items.map((d) => (
                <li key={d.label}>
                  <span className={styles.tile} aria-hidden="true">
                    <DisciplineTile visual={d.visual} />
                  </span>
                  <span className={styles.tileLabel}>{d.label}</span>
                </li>
              ))}
            </ul>
            <span className={styles.caption}>{content.disciplines.label}</span>
          </HighlightCard>
          <HighlightCard tone="warm" className={styles.workflow}>
            <strong className={styles.hot}>{content.workflow.value}</strong>
            <span className={styles.note}>{content.workflow.label}</span>
          </HighlightCard>
        </div>

        <HighlightCard tone="photo" className={styles.quoteCard}>
          <div className={styles.agents} aria-hidden="true" data-motion="">
            <span className={styles.agentsTitle}>agents · running</span>
            {AGENTS.map((agent, i) => (
              <span key={agent.name} className={styles.agent}>
                <span className={agent.progress >= 1 ? styles.done : styles.busy} />
                <code>{agent.name}</code>
                <span className={styles.bar}>
                  <i
                    style={{
                      ["--p" as string]: agent.progress,
                      animationDelay: `${i * -1.3}s`,
                    }}
                  />
                </span>
              </span>
            ))}
          </div>
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
