import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "@/core/domain/locale";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // Turkish lives at "/", English at "/en": no redirect hop on the main URL.
  localePrefix: "as-needed",
  // No Accept-Language redirects: every URL always serves the same language,
  // which is what search engines expect. Visitors switch with the TR/EN control.
  localeDetection: false,
});
