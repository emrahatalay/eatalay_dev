import { useTranslations } from "next-intl";
import type { Locale } from "@/core/domain/locale";
import { LOCALES } from "@/core/domain/locale";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { Logo } from "@/presentation/components/atoms/Logo";
import { LocaleSwitcher } from "@/presentation/components/molecules/LocaleSwitcher";
import { MobileMenu } from "@/presentation/components/molecules/MobileMenu";
import { NavLinks, type NavItem } from "@/presentation/components/molecules/NavLinks";
import { ThemeToggle } from "@/presentation/components/molecules/ThemeToggle";
import { localePath } from "@/shared/config/site";
import styles from "./SiteHeader.module.css";

export interface SiteHeaderProps {
  readonly brand: string;
  readonly locale: Locale;
  readonly items: readonly NavItem[];
  readonly cta: NavItem;
}

export function SiteHeader({ brand, locale, items, cta }: SiteHeaderProps) {
  const t = useTranslations();

  const localeOptions = LOCALES.map((l) => ({
    locale: l,
    href: localePath(l),
    name: t(`Locale.${l}`),
  }));

  return (
    <div className={styles.bar}>
      <Logo text={brand} label={t("Nav.home")} />

      <nav aria-label={t("Nav.label")} className={styles.primary}>
        <NavLinks items={items} />
      </nav>

      <div className={styles.actions}>
        <LocaleSwitcher current={locale} options={localeOptions} label={t("Locale.label")} />
        <ThemeToggle label={t("Theme.toggle")} />
        <ButtonLink href={cta.href} variant="light" className={styles.cta}>
          {cta.label}
        </ButtonLink>
        <span className={styles.menu}>
          <MobileMenu
            items={items}
            cta={cta}
            navLabel={t("Nav.label")}
            openLabel={t("Nav.openMenu")}
            closeLabel={t("Nav.closeMenu")}
          />
        </span>
      </div>
    </div>
  );
}
