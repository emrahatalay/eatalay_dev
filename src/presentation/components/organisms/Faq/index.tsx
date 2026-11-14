import { useTranslations } from "next-intl";
import type { FaqItem as FaqEntity, SectionIntro } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { AgentCursor } from "@/presentation/components/molecules/AgentCursor";
import { FaqItem } from "@/presentation/components/molecules/FaqItem";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./Faq.module.css";

export interface FaqProps {
  readonly intro: SectionIntro;
  readonly items: readonly FaqEntity[];
}

/**
 * Questions as a quiet numbered list. An agent's cursor moves down the list,
 * resting on one question at a time, in the same language as the hero scene.
 */
export function Faq({ intro, items }: FaqProps) {
  const t = useTranslations("Faq");

  return (
    <section className={styles.faq} id="faq" aria-labelledby="faq-title">
      <div className={styles.side}>
        <Chip tone="dark">{t("eyebrow")}</Chip>
        <RichHeadline id="faq-title" text={intro.headline} onDark className={styles.headline} />

        <div className={styles.agent} aria-hidden="true" data-motion="">
          <span className={styles.agentHead}>
            <i className={styles.spark}>✦</i>
            <b>{t("agentName")}</b>
            <span className={styles.live} />
          </span>
          <span className={styles.agentStatus}>{t("agentStatus")}</span>
          <span className={styles.scan}>
            <i />
          </span>
          <small>{t("agentCount", { count: items.length })}</small>
        </div>
      </div>

      <div className={styles.list}>
        {items.map((item, i) => (
          <FaqItem key={item.id} item={item} index={i} open={i === 0} />
        ))}
        <AgentCursor label={t("agentName")} />
      </div>
    </section>
  );
}
