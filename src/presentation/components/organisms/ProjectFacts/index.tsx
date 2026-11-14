import { useTranslations } from "next-intl";
import type { Metric } from "@/core/domain/entities";
import styles from "./ProjectFacts.module.css";

/** Four headline numbers under the hero. */
export function ProjectFacts({ facts }: { readonly facts: readonly Metric[] }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.facts} aria-label={t("facts")}>
      <ul className={styles.list}>
        {facts.map((fact) => (
          <li key={fact.label} className={`${styles.item} reveal`}>
            <strong className={styles.value}>{fact.value}</strong>
            <span className={styles.label}>{fact.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
