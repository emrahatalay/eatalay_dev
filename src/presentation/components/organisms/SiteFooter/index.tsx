import Image from "next/image";
import { useTranslations } from "next-intl";
import lavender from "@/assets/images/lavender.jpg";
import type { Profile, Service } from "@/core/domain/entities";
import { Logo } from "@/presentation/components/atoms/Logo";
import type { NavItem } from "@/presentation/components/molecules/NavLinks";
import { SocialLinks } from "@/presentation/components/molecules/SocialLinks";
import styles from "./SiteFooter.module.css";

export interface SiteFooterProps {
  readonly profile: Profile;
  readonly blurb: string;
  readonly links: readonly NavItem[];
  readonly services: readonly Service[];
}

export function SiteFooter({ profile, blurb, links, services }: SiteFooterProps) {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Logo text={profile.brand} variant="footer" />

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
                <a href="#work">{s.shortTitle}</a>
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

      <p className={styles.wordmark} aria-hidden="true">
        {profile.brand
          .toUpperCase()
          .split("")
          .map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
      </p>

      <p className={styles.legal}>
        © {year} {profile.name}. {t("rights")}
      </p>

      <div className={styles.field} aria-hidden="true">
        <Image src={lavender} alt="" fill sizes="100vw" quality={60} placeholder="blur" className={styles.fieldImage} />
      </div>
    </footer>
  );
}
