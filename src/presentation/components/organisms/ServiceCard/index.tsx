import { useLocale } from "next-intl";
import type { Service } from "@/core/domain/entities";
import { isLocale, DEFAULT_LOCALE } from "@/core/domain/locale";
import { SerifAccent } from "@/presentation/components/atoms/SerifAccent";
import { Tag } from "@/presentation/components/atoms/Tag";
import { AgentCursor } from "@/presentation/components/molecules/AgentCursor";
import { ServiceVisual } from "@/presentation/components/molecules/ServiceVisual";
import { projectPath } from "@/shared/config/site";
import styles from "./ServiceCard.module.css";

/** An AI agent at work on a card: its tag and colour. */
export interface CardAgent {
  readonly label: string;
  readonly color: string;
  readonly every: number;
}

/** One card in the services stack, with the agents that work on it moving across its parts. */
export function ServiceCard({
  service,
  agents = [],
}: {
  readonly service: Service;
  readonly agents?: readonly CardAgent[];
}) {
  const titleId = `service-${service.id}`;
  const rawLocale = useLocale();
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.text}>
        <h3 id={titleId} className={styles.title} data-agent-target="">
          {service.title.lead} <SerifAccent>{service.title.accent}</SerifAccent>
        </h3>
        <p className={styles.description} data-agent-target="">{service.description}</p>
        {service.showcase && (
          <a href={projectPath(locale, service.showcase.projectSlug)} className={styles.showcase} data-agent-target="">
            {service.showcase.label}
            <span aria-hidden="true">→</span>
          </a>
        )}
        <ul className={styles.tags} data-agent-target="">
          {service.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>
      </div>
      <div className={styles.visual} data-agent-target="">
        <ServiceVisual visual={service.visual} />
      </div>
      {agents.map((agent) => (
        <AgentCursor key={agent.label} label={agent.label} color={agent.color} every={agent.every} random />
      ))}
    </article>
  );
}
