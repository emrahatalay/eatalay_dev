import type { Technology } from "@/core/domain/entities";
import { Monogram } from "@/presentation/components/atoms/Monogram";
import styles from "./TechMarquee.module.css";

function TechList({ items, hidden }: { readonly items: readonly Technology[]; readonly hidden?: boolean }) {
  return (
    <ul className={styles.list} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t.name} className={styles.item}>
          <Monogram text={t.monogram} hue={t.hue} />
          {t.name}
        </li>
      ))}
    </ul>
  );
}

/** Infinite, pausable ticker. The list is rendered twice for a seamless loop. */
export function TechMarquee({ items, label }: { readonly items: readonly Technology[]; readonly label: string }) {
  return (
    <section className={styles.marquee} aria-label={label}>
      <div className={styles.track}>
        <TechList items={items} />
        <TechList items={items} hidden />
      </div>
    </section>
  );
}
