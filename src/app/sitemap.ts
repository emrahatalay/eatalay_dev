import type { MetadataRoute } from "next";
import { loadProjectSlugs } from "@/core/di/container";
import { LOCALES } from "@/core/domain/locale";
import { absoluteUrl, languageAlternates, localePath, projectPath } from "@/shared/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: languageAlternates() },
  }));

  const slugs = await loadProjectSlugs(LOCALES[0]);
  const projects: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(projectPath(locale, slug)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: languageAlternates((l) => projectPath(l, slug)) },
    })),
  );

  return [...home, ...projects];
}
