import { useLocale } from "next-intl";
import type { Service } from "@/core/domain/entities";
import { isLocale, DEFAULT_LOCALE } from "@/core/domain/locale";
import { SerifAccent } from "@/presentation/components/atoms/SerifAccent";
import { Tag } from "@/presentation/components/atoms/Tag";
import { ServiceVisual } from "@/presentation/components/molecules/ServiceVisual";
import { projectPath } from "@/shared/config/site";
import styles from "./ServiceCard.module.css";

/** One sticky card in the services stack. */
export function ServiceCard({ service }: { readonly service: Service }) {
  const titleId = `service-${service.id}`;
  const rawLocale = useLocale();
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.text}>
        <h3 id={titleId} className={styles.title}>
          {service.title.lead} <SerifAccent>{service.title.accent}</SerifAccent>
        </h3>
        <p className={styles.description}>{service.description}</p>
        {service.showcase && (
          <a href={projectPath(locale, service.showcase.projectSlug)} className={styles.showcase}>
            {service.showcase.label}
            <span aria-hidden="true">→</span>
          </a>
        )}
        <ul className={styles.tags}>
          {service.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>
      </div>
      <div className={styles.visual}>
        <ServiceVisual visual={service.visual} />
      </div>
    </article>
  );
}
