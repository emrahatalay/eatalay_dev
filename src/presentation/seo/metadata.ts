import type { Metadata } from "next";
import type { SiteMetadata } from "@/core/application/use-cases/get-site-metadata";
import type { Profile, Project } from "@/core/domain/entities";
import { LOCALES, type Locale } from "@/core/domain/locale";
import { absoluteUrl, languageAlternates, localePath, projectPath, siteConfig } from "@/shared/config/site";

/** Maps the SEO read model to Next's Metadata object. Pure function. */
export function buildMetadata({ locale, seo, profile }: SiteMetadata): Metadata {
  const url = absoluteUrl(localePath(locale));

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: seo.title, template: `%s · ${profile.name}` },
    description: seo.description,
    keywords: [...seo.keywords],
    applicationName: siteConfig.name,
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    publisher: profile.name,
    category: "technology",
    alternates: { canonical: url, languages: languageAlternates() },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      locale: siteConfig.ogLocale[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => siteConfig.ogLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export interface ProjectMetadataInput {
  readonly locale: Locale;
  readonly project: Project;
  readonly profile: Profile;
}

/** Metadata for a project case study. The share image comes from the route's opengraph-image. */
export function buildProjectMetadata({ locale, project, profile }: ProjectMetadataInput): Metadata {
  const url = absoluteUrl(projectPath(locale, project.slug));
  const { seo } = project;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { absolute: seo.title },
    description: seo.description,
    keywords: [...seo.keywords],
    applicationName: siteConfig.name,
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    publisher: profile.name,
    category: "games",
    alternates: { canonical: url, languages: languageAlternates((l) => projectPath(l, project.slug)) },
    openGraph: {
      type: "article",
      url,
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      locale: siteConfig.ogLocale[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => siteConfig.ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    formatDetection: { telephone: false, address: false, email: false },
  };
}
