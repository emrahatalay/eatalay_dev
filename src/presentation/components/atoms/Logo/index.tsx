import { useId } from "react";
import { cx } from "@/shared/lib/cx";
import styles from "./Logo.module.css";

export interface LogoProps {
  readonly text: string;
  readonly href?: string;
  /** "dark" sits on the dark hero and header, "light" on the page surface (footer). */
  readonly tone?: "dark" | "light";
  readonly label?: string;
}

/**
 * The mark: a prompt (❯ and a cursor) with the AI sparkle used across the site,
 * on an orange app-icon tile. Work goes in as a prompt, agents build, it ships.
 */
export function LogoMark({ className }: { readonly className?: string }) {
  const gradient = useId();

  return (
    <svg className={cx(styles.mark, className)} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a3d" />
          <stop offset="1" stopColor="#e04e14" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradient})`} />
      <path className={styles.chevron} d="M8.5 10.5 15 16l-6.5 5.5" />
      <path className={styles.cursor} d="M17.5 22h5.5" />
      <path
        className={styles.spark}
        d="M23 5.2l1.15 3.65L27.8 10l-3.65 1.15L23 14.8l-1.15-3.65L18.2 10l3.65-1.15z"
      />
    </svg>
  );
}

export function Logo({ text, href = "#top", tone = "dark", label }: LogoProps) {
  return (
    <a href={href} className={cx(styles.logo, styles[tone])} aria-label={label ?? text}>
      <LogoMark />
      <span className={styles.word}>{text}</span>
    </a>
  );
}
