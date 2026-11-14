import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { HeroContent, ImageAsset } from "@/core/domain/entities";
import { Avatar } from "@/presentation/components/atoms/Avatar";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { AgentScene, type AgentSceneLabels } from "@/presentation/components/molecules/AgentScene";
import styles from "./Hero.module.css";

export interface HeroProps {
  readonly content: HeroContent;
  readonly header: ReactNode;
  readonly contactHref: string;
  readonly portfolioHref: string;
  /** The person behind the work: shown in the byline and in the workflow scene. */
  readonly avatar: ImageAsset;
  readonly name: string;
}

const SCENE_KEYS = [
  "operator",
  "operatorRole",
  "prompt",
  "approve",
  "approved",
  "coder",
  "tester",
  "reviewer",
  "deploy",
  "idle",
  "writing",
  "testing",
  "reviewing",
  "waiting",
  "shipping",
  "done",
  "passed",
  "live",
] as const satisfies readonly (keyof AgentSceneLabels)[];

/**
 * Split hero: the pitch on the left, the AI workflow it describes on the right
 * (agents write, test and review; a person approves; it ships).
 */
export function Hero({ content, header, contactHref, portfolioHref, avatar, name }: HeroProps) {
  const t = useTranslations("Hero");
  const labels = Object.fromEntries(SCENE_KEYS.map((key) => [key, t(`scene.${key}`)])) as Record<
    (typeof SCENE_KEYS)[number],
    string
  >;

  return (
    <header className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <AgentScene labels={labels} avatar={avatar} />

      {header}

      <div className={styles.copy}>
        {/* Who is behind it, before what it is: a face, a name, one line. */}
        <div className={styles.byline}>
          <span className={styles.photo}>
            <Avatar image={avatar} size={64} />
          </span>
          <span className={styles.who}>
            <span className={styles.nameRow}>
              <b>{name}</b>
              <span className={styles.status}>
                <span className={styles.dot} aria-hidden="true" />
                {content.intro.status}
              </span>
            </span>
            <span className={styles.role}>{content.intro.role}</span>
          </span>
        </div>

        <DisplayHeading as="h1" className={styles.title}>
          <span className={styles.line}>{content.titleLead}</span>{" "}
          <span className={styles.accent}>{content.titleAccent}</span>
        </DisplayHeading>

        <p className={styles.lead}>{content.lead}</p>

        <div className={styles.actions}>
          <ButtonLink href={contactHref}>{t("primaryCta")}</ButtonLink>
          <ButtonLink href={portfolioHref} variant="ghost" withArrow={false}>
            {t("secondaryCta")}
          </ButtonLink>
        </div>

        <dl className={styles.proof} aria-label={t("proofLabel")}>
          {content.proof.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
