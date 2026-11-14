import { useTranslations } from "next-intl";
import type { ProjectRoadmap as Roadmap } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import styles from "./ProjectRoadmap.module.css";

export function ProjectRoadmap({ roadmap }: { readonly roadmap: Roadmap }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.roadmap} id="roadmap" aria-labelledby="roadmap-title">
      <h2 id="roadmap-title" className={styles.eyebrowWrap}>
        <Chip>{t("roadmapEyebrow")}</Chip>
      </h2>

      <div className={styles.columns}>
        <div className={`${styles.column} ${styles.done}`}>
          <h3 className={styles.title}>{t("done")}</h3>
          <ul className={styles.list}>
            {roadmap.done.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.column} ${styles.next}`}>
          <h3 className={styles.title}>{t("next")}</h3>
          <ul className={styles.list}>
            {roadmap.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className={styles.note}>{roadmap.note}</p>
    </section>
  );
}
