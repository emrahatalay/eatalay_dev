import { cx } from "@/shared/lib/cx";
import styles from "./Logo.module.css";

export interface LogoProps {
  readonly text: string;
  readonly href?: string;
  readonly variant?: "hero" | "footer";
  readonly label?: string;
}

export function Logo({ text, href = "#top", variant = "hero", label }: LogoProps) {
  return (
    <a href={href} className={cx(styles.logo, styles[variant])} aria-label={label}>
      {text}
    </a>
  );
}
