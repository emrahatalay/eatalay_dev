import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ContactContent, Profile } from "@/core/domain/entities";
import { Avatar } from "@/presentation/components/atoms/Avatar";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import { Chip } from "@/presentation/components/atoms/Chip";
import { AgentCursor } from "@/presentation/components/molecules/AgentCursor";
import { SocialLinks } from "@/presentation/components/molecules/SocialLinks";
import styles from "./Contact.module.css";

export interface ContactProps {
  readonly content: ContactContent;
  readonly profile: Profile;
}

/**
 * The call to action, on its own: a large portrait with a live inbox log over
 * it (a message comes in, an agent sorts it, a person answers), and what the
 * intro call covers, ticked off by an agent's cursor.
 */
export function Contact({ content, profile }: ContactProps) {
  const t = useTranslations("Contact");
  const { inbox } = content;

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <figure className={styles.portrait}>
        <Image
          src={profile.photo}
          alt={profile.photo.alt}
          sizes="(max-width: 900px) 92vw, 460px"
          quality={85}
          placeholder="blur"
          className={styles.photo}
        />
        <span className={styles.glow} aria-hidden="true" />

        <figcaption className={styles.overlay}>
          <span className={styles.caption}>
            <b>{profile.name}</b>
            <span>{profile.location.label}</span>
          </span>

          <span className={styles.inbox} aria-hidden="true" data-motion="">
            <span className={styles.inboxHead}>
              <b>{inbox.title}</b>
              <span className={styles.live} />
            </span>
            <span className={styles.row}>
              <i className={styles.mark}>✉</i>
              {inbox.received}
            </span>
            <span className={styles.row}>
              <i className={styles.mark}>✦</i>
              {inbox.summarized}
            </span>
            <span className={`${styles.row} ${styles.human}`}>
              <Avatar image={profile.avatar} size={20} decorative />
              {inbox.replying}
              <span className={styles.typing}>
                <i />
                <i />
                <i />
              </span>
            </span>
          </span>
        </figcaption>
      </figure>

      <div className={styles.body}>
        <Chip tone="dark">{t("eyebrow")}</Chip>
        <h2 id="contact-title" className={styles.title}>
          {content.title}
        </h2>
        <p className={styles.text}>{content.text}</p>

        <div className={styles.steps}>
          <span className={styles.stepsLabel}>{t("stepsLabel")}</span>
          <ol>
            {content.steps.map((step, i) => (
              <li key={step} data-agent-target="">
                <span className={styles.check} aria-hidden="true">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <AgentCursor label={t("cursor")} every={2400} />
        </div>

        <div className={styles.actions}>
          <ButtonLink href={`mailto:${profile.email}`}>{content.ctaLabel}</ButtonLink>
          <span className={styles.email}>
            <small>{t("orEmail")}</small>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </span>
        </div>

        <div className={styles.socials}>
          <SocialLinks links={profile.socials} />
        </div>
      </div>
    </section>
  );
}
