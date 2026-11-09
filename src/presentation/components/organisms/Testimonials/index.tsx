import { useTranslations } from "next-intl";
import type { SectionIntro, Testimonial } from "@/core/domain/entities";
import { Chip } from "@/presentation/components/atoms/Chip";
import { RichHeadline } from "@/presentation/components/molecules/RichHeadline";
import { TestimonialCard } from "@/presentation/components/molecules/TestimonialCard";
import styles from "./Testimonials.module.css";

export interface TestimonialsProps {
  readonly intro: SectionIntro;
  readonly testimonials: readonly Testimonial[];
}

/** Renders nothing until there are real testimonials. */
export function Testimonials({ intro, testimonials }: TestimonialsProps) {
  const t = useTranslations("Testimonials");
  if (testimonials.length === 0) return null;

  return (
    <section className={styles.section} id="testimonials" aria-labelledby="testimonials-title">
      <Chip>{t("eyebrow")}</Chip>
      <RichHeadline id="testimonials-title" text={intro.headline} />
      <div className={styles.grid}>
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>
    </section>
  );
}
