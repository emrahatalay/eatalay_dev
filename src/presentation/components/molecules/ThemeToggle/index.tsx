"use client";

import { MoonIcon, SunIcon } from "@/presentation/components/atoms/Icon";
import { THEME_STORAGE_KEY, type Theme } from "@/presentation/theme/theme-script";
import styles from "./ThemeToggle.module.css";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Flips the theme by setting data-theme on <html>. Icons swap through CSS,
 * so server and client render identical markup (no hydration mismatch).
 */
export function ThemeToggle({ label }: { readonly label: string }) {
  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
  }

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={label} title={label}>
      <MoonIcon className={styles.moon} />
      <SunIcon className={styles.sun} />
    </button>
  );
}
