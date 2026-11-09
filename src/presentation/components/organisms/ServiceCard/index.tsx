import type { Service } from "@/core/domain/entities";
import { SerifAccent } from "@/presentation/components/atoms/SerifAccent";
import { Tag } from "@/presentation/components/atoms/Tag";
import { ServiceVisual } from "@/presentation/components/molecules/ServiceVisual";
import styles from "./ServiceCard.module.css";

/** One sticky card in the portfolio stack. */
export function ServiceCard({ service }: { readonly service: Service }) {
  const titleId = `service-${service.id}`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.text}>
        <h3 id={titleId} className={styles.title}>
          {service.title.lead} <SerifAccent>{service.title.accent}</SerifAccent>
        </h3>
        <p className={styles.description}>{service.description}</p>
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
