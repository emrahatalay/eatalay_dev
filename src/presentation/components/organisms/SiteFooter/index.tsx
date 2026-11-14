import { useTranslations } from "next-intl";
import type { Profile, Service } from "@/core/domain/entities";
import { Logo } from "@/presentation/components/atoms/Logo";
import { CodeField } from "@/presentation/components/molecules/CodeField";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { SocialLinks } from "@/presentation/components/molecules/SocialLinks";
import styles from "./SiteFooter.module.css";

export interface SiteFooterProps {
  readonly profile: Profile;
  readonly blurb: string;
  readonly links: readonly NavItem[];
  readonly services: readonly Service[];
  /** Link to the services section; in-page by default. */
  readonly servicesHref?: string;
  readonly logoHref?: string;
}

export function SiteFooter({ profile, blurb, links, services, servicesHref = "#services", logoHref }: SiteFooterProps) {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Logo text={profile.brand} href={logoHref} variant="footer" />

      <div className={styles.columns}>
        <div className={styles.intro}>
          <p className={styles.blurb}>{blurb}</p>
          <h2 className={styles.heading}>{t("follow")}</h2>
          <SocialLinks links={profile.socials} />
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={styles.heading}>
            {t("quickLinks")}
          </h2>
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>{t("services")}</h2>
          <ul className={styles.list}>
            {services.map((s) => (
              <li key={s.id}>
                <a href={servicesHref}>{s.shortTitle}</a>
              </li>
            ))}
          </ul>
        </div>

        <address className={styles.contact}>
          <h2 className={styles.heading}>{t("email")}</h2>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <h2 className={styles.heading}>{t("location")}</h2>
          <span>{profile.location.label}</span>
        </address>
      </div>

      {/* Dark editor panel along the bottom edge, signed with a one-line terminal command
          that types itself in as the footer scrolls into view. */}
      <div className={styles.terminal}>
        <CodeField className={styles.field} />

        <p className={styles.signature} aria-hidden="true">
          <span className={styles.path}>~/{profile.brand}</span>
          <span className={styles.prompt}>❯</span>
          <span className={styles.command}>ship --next</span>
          <span className={styles.cursor} />
        </p>

        <p className={styles.legal}>
          © {year} {profile.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
