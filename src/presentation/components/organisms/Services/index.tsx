import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import type { Service, SharedProcess } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { type CardAgent, ServiceCard } from "../ServiceCard";
import styles from "./Services.module.css";

/** The agent team; each card gets two of them, so the whole section feels like a shared workspace. */
const CODE: CardAgent = { label: "code-agent", color: "#f05a1a", every: 2600 };
const TEST: CardAgent = { label: "test-agent", color: "#16a34a", every: 3100 };
const DESIGN: CardAgent = { label: "design-agent", color: "#8b5cf6", every: 2900 };
const REVIEW: CardAgent = { label: "review-agent", color: "#0284c7", every: 3400 };
const TEAMS: readonly (readonly CardAgent[])[] = [
  [DESIGN, CODE],
  [CODE, TEST],
  [DESIGN, TEST],
  [CODE, REVIEW],
];
const ROSTER = [CODE, TEST, DESIGN, REVIEW] as const;

/** Home-page stack of what I offer, one card per service, closed by the process they all share. */
export function Services({
  services,
  process,
}: {
  readonly services: readonly Service[];
  readonly process: SharedProcess;
}) {
  const t = useTranslations("Services");

  return (
    <section className={styles.services} id="services" aria-labelledby="services-title">
      <div className={styles.head}>
        <Chip tone="dark">{t("eyebrow")}</Chip>
        <DisplayHeading id="services-title" className={styles.title}>
          {t("title")}
        </DisplayHeading>
        <p className={styles.lead}>{t("lead")}</p>
        {/* Who is in the workspace right now, like a shared design file. */}
        <div className={styles.presence} aria-hidden="true">
          <ul>
            {ROSTER.map((agent) => (
              <li key={agent.label} style={{ "--agent": agent.color } as CSSProperties}>
                {agent.label}
              </li>
            ))}
          </ul>
          <span>
            <i />
            {t("agentsLive", { count: ROSTER.length })}
          </span>
        </div>
      </div>
      <div className={styles.stack}>
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} agents={TEAMS[i % TEAMS.length]} />
        ))}
        <ServiceCard service={process} agents={[REVIEW, TEST]} />
      </div>
    </section>
  );
}
