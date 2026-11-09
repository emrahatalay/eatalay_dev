import type { Locale } from "@/core/domain/locale";
import styles from "./LocaleSwitcher.module.css";

export interface LocaleOption {
  readonly locale: Locale;
  readonly href: string;
  readonly name: string;
}

export interface LocaleSwitcherProps {
  readonly current: Locale;
  readonly options: readonly LocaleOption[];
  readonly label: string;
}

/** Plain links (crawlable, no JavaScript) to each language version. */
export function LocaleSwitcher({ current, options, label }: LocaleSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className={styles.switcher}>
        {options.map((o) => (
          <li key={o.locale}>
            <a
              href={o.href}
              hrefLang={o.locale}
              lang={o.locale}
              title={o.name}
              aria-current={o.locale === current ? "page" : undefined}
            >
              {o.locale.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
