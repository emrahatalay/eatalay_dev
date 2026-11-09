import type { ContactContent } from "@/core/domain/entities";
import { ButtonLink } from "@/presentation/components/atoms/ButtonLink";
import styles from "./BookingCard.module.css";

export interface BookingCardProps {
  readonly id?: string;
  readonly content: ContactContent;
  readonly email: string;
  readonly initials: string;
}

export function BookingCard({ id, content, email, initials }: BookingCardProps) {
  return (
    <div id={id} className={`${styles.card} reveal`}>
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
      <h3 className={styles.title}>{content.title}</h3>
      <p className={styles.text}>{content.text}</p>
      <ButtonLink href={`mailto:${email}`} className={styles.cta}>
        {content.ctaLabel}
      </ButtonLink>
    </div>
  );
}
