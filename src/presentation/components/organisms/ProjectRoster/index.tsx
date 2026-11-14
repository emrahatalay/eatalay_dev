import { useTranslations } from "next-intl";
import type { RosterGroup } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import styles from "./ProjectRoster.module.css";

/** Professions, obstacles and power-ups, side by side. */
export function ProjectRoster({ groups }: { readonly groups: readonly RosterGroup[] }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.roster} aria-labelledby="roster-title">
      <Chip>{t("rosterEyebrow")}</Chip>
      <h2 id="roster-title" className={styles.heading}>
        {t("rosterTitle")}
      </h2>

      <div className={styles.groups}>
        {groups.map((group) => (
          <div key={group.id} className={styles.group} data-group={group.id}>
            <h3 className={styles.groupTitle}>
              {group.title}
              <span className={styles.count}>{group.items.length}</span>
            </h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item.name} className={styles.item}>
                  <div className={styles.row}>
                    <strong className={styles.name}>{item.name}</strong>
                    {item.hint && <span className={styles.hint}>{item.hint}</span>}
                  </div>
                  <p className={styles.detail}>{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
