import type { MetadataRoute } from "next";
import { LOCALES } from "@/core/domain/locale";
import { absoluteUrl, languageAlternates, localePath } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();

  return LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
