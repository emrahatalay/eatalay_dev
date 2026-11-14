import type { SiteMetadata } from "@/core/application/use-cases/get-site-metadata";
import type { ProjectPage } from "@/core/application/use-cases/get-project-page";
import { absoluteUrl, localePath, projectPath, siteConfig } from "@/shared/config/site";

/** schema.org graph: who the site is about, the site itself, and the FAQ. */
export function buildStructuredData({ locale, seo, profile, faqs }: SiteMetadata) {
  const pageUrl = absoluteUrl(localePath(locale));
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: siteConfig.url,
        email: `mailto:${profile.email}`,
        jobTitle: profile.jobTitle,
        knowsAbout: profile.knowsAbout,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.city,
          addressCountry: profile.location.countryCode,
        },
        sameAs: profile.socials.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: locale,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: locale,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/** Serialises JSON-LD safely for inlining in a <script> tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** schema.org graph for a project page: the game, its source code and a breadcrumb. */
export function buildProjectStructuredData(page: ProjectPage, projectsLabel: string) {
  const { locale, project, profile } = page;
  const pageUrl = absoluteUrl(projectPath(locale, project.slug));
  const homeUrl = absoluteUrl(localePath(locale));
  const personId = `${siteConfig.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoGame",
        "@id": `${pageUrl}#game`,
        name: project.name,
        alternateName: project.hero.accent,
        url: pageUrl,
        description: project.seo.description,
        inLanguage: locale,
        genre: ["Endless runner", "Arcade"],
        gamePlatform: ["Android", "iOS"],
        applicationCategory: "Game",
        operatingSystem: "Android, iOS",
        image: project.gallery.map((s) => absoluteUrl(s.image.src)),
        author: { "@id": personId, "@type": "Person", name: profile.name, url: siteConfig.url },
        sameAs: [project.repository.url],
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${pageUrl}#source`,
        name: project.name,
        codeRepository: project.repository.url,
        programmingLanguage: "C#",
        runtimePlatform: "Unity 6",
        author: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.name, item: homeUrl },
          { "@type": "ListItem", position: 2, name: projectsLabel, item: `${homeUrl}#work` },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
    ],
  };
}
