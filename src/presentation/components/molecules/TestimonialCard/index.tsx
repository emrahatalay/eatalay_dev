import type { Testimonial } from "@/core/domain/entities";
import styles from "./TestimonialCard.module.css";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({ testimonial }: { readonly testimonial: Testimonial }) {
  return (
    <figure className={styles.card}>
      <span className={styles.mark} aria-hidden="true">
        “
      </span>
      <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
      <figcaption className={styles.who}>
        <i aria-hidden="true">{initials(testimonial.author)}</i>
        <span>
          <b>{testimonial.author}</b>
          <small>{testimonial.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}
