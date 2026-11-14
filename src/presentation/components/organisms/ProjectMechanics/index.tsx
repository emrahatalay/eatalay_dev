import { useTranslations } from "next-intl";
import type { Mechanic } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { PhoneFrame } from "@/presentation/components/molecules/PhoneFrame";
import styles from "./ProjectMechanics.module.css";

/** The signature mechanics, each with its screenshot and the class behind it. */
export function ProjectMechanics({ mechanics }: { readonly mechanics: readonly Mechanic[] }) {
  const t = useTranslations("Project");

  return (
    <section className={styles.mechanics} aria-labelledby="mechanics-title">
      <h2 id="mechanics-title" className={styles.eyebrowWrap}>
        <Chip>{t("mechanicsEyebrow")}</Chip>
      </h2>

      <div className={styles.list}>
        {mechanics.map((m, i) => (
          <article key={m.codeName} className={styles.card} aria-labelledby={`mechanic-${i}`}>
            <div className={styles.text}>
              <p className={styles.tag}>
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                {m.tag}
              </p>
              <h3 id={`mechanic-${i}`} className={styles.title}>
                {m.title}
              </h3>
              <p className={styles.body}>{m.text}</p>
              <ul className={styles.bullets}>
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <code className={styles.code}>{m.codeName}.cs</code>
            </div>
            <div className={styles.visual}>
              <PhoneFrame image={m.screenshot.image} sizes="(max-width: 640px) 60vw, 260px" className={styles.phone} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
