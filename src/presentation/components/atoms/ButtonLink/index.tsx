import type { AnchorHTMLAttributes } from "react";
import { cx } from "@/shared/lib/cx";
import styles from "./ButtonLink.module.css";

export type ButtonVariant = "gradient" | "light";

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly variant?: ButtonVariant;
  readonly withArrow?: boolean;
}

/** Call-to-action rendered as a link (every CTA on this site navigates). */
export function ButtonLink({
  variant = "gradient",
  withArrow = true,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={cx(styles.button, styles[variant], className)} {...rest}>
      {children}
      {withArrow && (
        <span className={styles.arrow} aria-hidden="true">
          ›
        </span>
      )}
    </a>
  );
}
