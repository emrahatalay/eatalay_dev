import { useTranslations } from "next-intl";
import type { ContactContent, FaqItem as FaqEntity, SectionIntro } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { BookingCard } from "@/presentation/components/molecules/BookingCard";
import { FaqItem } from "@/presentation/components/molecules/FaqItem";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import styles from "./Faq.module.css";

export interface FaqProps {
  readonly intro: SectionIntro;
  readonly items: readonly FaqEntity[];
  readonly contact: ContactContent;
  readonly email: string;
  readonly initials: string;
}

export function Faq({ intro, items, contact, email, initials }: FaqProps) {
  const t = useTranslations("Faq");

  return (
    <section className={styles.faq} id="faq" aria-labelledby="faq-title">
      <Chip tone="dark">{t("eyebrow")}</Chip>
      <RichHeadline id="faq-title" text={intro.headline} onDark className={styles.headline} />
      <div className={styles.grid}>
        <BookingCard id="contact" content={contact} email={email} initials={initials} />
        <div className={styles.accordion}>
          {items.map((item, i) => (
            <FaqItem key={item.id} item={item} open={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
