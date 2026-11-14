import { useTranslations } from "next-intl";
import type { Service, SharedProcess } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { ServiceCard } from "../ServiceCard";
import styles from "./Services.module.css";

/** Home-page stack of what I offer, one sticky card per service, closed by the process they all share. */
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
      </div>
      <div className={styles.stack}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        <ServiceCard service={process} />
      </div>
    </section>
  );
}
