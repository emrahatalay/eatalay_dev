import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/core/domain/locale";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eatalay.dev";

export const siteConfig = {
  url: rawUrl.replace(/\/$/, ""),
  name: "eatalay.dev",
  themeColor: { light: "#E9E5F5", dark: "#07060D" },
  ogLocale: { tr: "tr_TR", en: "en_US" } satisfies Record<Locale, string>,
} as const;

/** Public path of a locale's home page ("as-needed" prefix: default locale has none). */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

/** hreflang map used by metadata and the sitemap. */
export function languageAlternates(): Record<string, string> {
  const entries = LOCALES.map((l) => [l, absoluteUrl(localePath(l))] as const);
  return { ...Object.fromEntries(entries), "x-default": absoluteUrl(localePath(DEFAULT_LOCALE)) };
}
