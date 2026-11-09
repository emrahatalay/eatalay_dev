import { useTranslations } from "next-intl";
import type { Service } from "@/core/domain/entities";
import { DisplayHeading } from "@/presentation/components/atoms/DisplayHeading";
import { ServiceCard } from "../ServiceCard";
import styles from "./Work.module.css";

export function Work({ services }: { readonly services: readonly Service[] }) {
  const t = useTranslations("Work");

  return (
    <section className={styles.work} id="work" aria-labelledby="work-title">
      <DisplayHeading id="work-title" className={styles.ghost}>
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
