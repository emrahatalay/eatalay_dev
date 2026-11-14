import { useTranslations } from "next-intl";
import type { Profile, Service } from "@/core/domain/entities";
import { Logo } from "@/presentation/components/atoms/Logo";
import { CodeField } from "@/presentation/components/molecules/CodeField";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { SocialLinks } from "@/presentation/components/molecules/SocialLinks";
import { TypedCommand } from "@/presentation/components/molecules/TypedCommand";
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
  const github = profile.socials.find((s) => s.network === "github");

  return (
    <footer className={styles.footer}>
      <Logo text={profile.brand} href={logoHref} tone="light" />

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

      {/* Dark editor panel along the bottom edge: the panes write code, the prompt
          runs one workflow step after another, and a status bar closes the page. */}
      <div className={styles.terminal}>
        <CodeField className={styles.field} />

        <p className={styles.signature} aria-hidden="true">
          <span className={styles.path}>~/{profile.brand}</span>
          <span className={styles.prompt}>❯</span>
          <TypedCommand className={styles.command} cursorClassName={styles.cursor} />
        </p>

        <div className={styles.status}>
          <span className={styles.chip}>
            <span className={styles.liveDot} />
            {t("live")}
          </span>
          <p className={styles.legal}>
            <span className={styles.copy}>©</span> {year}{" "}
            {github ? (
              <a href={github.url} target="_blank" rel="noopener noreferrer" className={styles.owner}>
                {profile.name}
              </a>
            ) : (
              <strong className={styles.owner}>{profile.name}</strong>
            )}
            <span className={styles.sep} aria-hidden="true" />
            {t("rights")}
          </p>
          <span className={`${styles.chip} ${styles.crafted}`}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 1.5l1.4 4.1 4.1 1.4-4.1 1.4L8 12.5l-1.4-4.1L2.5 7l4.1-1.4z" />
            </svg>
            {t("crafted")}
          </span>
        </div>
      </div>
    </footer>
  );
}
