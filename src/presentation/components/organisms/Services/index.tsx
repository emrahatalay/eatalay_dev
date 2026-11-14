import { useTranslations } from "next-intl";
import type { Service } from "@/core/domain/entities";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { ServiceCard } from "../ServiceCard";
import styles from "./Services.module.css";

/** Home-page stack of what I offer, one sticky card per service. */
export function Services({ services }: { readonly services: readonly Service[] }) {
  const t = useTranslations("Services");

  return (
    <section className={styles.services} id="services" aria-labelledby="services-title">
      <DisplayHeading id="services-title" className={styles.ghost}>
        {t("title")}
      </DisplayHeading>
      <div className={styles.stack}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
