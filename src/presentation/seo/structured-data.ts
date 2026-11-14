import type { SiteMetadata } from "@/core/application/use-cases/get-site-metadata";
import type { PortfolioPage } from "@/core/application/use-cases/get-portfolio-page";
import type { ProjectPage } from "@/core/application/use-cases/get-project-page";
import { absoluteUrl, localePath, portfolioPath, projectPath, siteConfig } from "@/shared/config/site";

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

/** schema.org graph for the portfolio: a collection page listing every case study, and a breadcrumb. */
export function buildPortfolioStructuredData(
  { locale, profile, projects }: PortfolioPage,
  seo: { readonly title: string; readonly description: string; readonly label: string },
) {
  const pageUrl = absoluteUrl(portfolioPath(locale));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        author: { "@id": `${siteConfig.url}/#person` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: project.name,
            url: absoluteUrl(projectPath(locale, project.slug)),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.name, item: absoluteUrl(localePath(locale)) },
          { "@type": "ListItem", position: 2, name: seo.label, item: pageUrl },
        ],
      },
    ],
  };
}

/** Serialises JSON-LD safely for inlining in a <script> tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** schema.org graph for a project page: the product, its source code when public, and a breadcrumb. */
export function buildProjectStructuredData(page: ProjectPage, portfolioLabel: string) {
  const { locale, project, profile } = page;
  const { schema, link } = project;
  const pageUrl = absoluteUrl(projectPath(locale, project.slug));
  const homeUrl = absoluteUrl(localePath(locale));
  const personId = `${siteConfig.url}/#person`;
  const isSource = link.kind === "source";

  const product = {
    "@type": schema.type,
    "@id": `${pageUrl}#product`,
    name: project.name,
    alternateName: project.hero.accent,
    url: isSource ? pageUrl : link.url,
    mainEntityOfPage: pageUrl,
    description: project.seo.description,
    inLanguage: locale,
    ...(schema.genre ? { genre: [...schema.genre] } : {}),
    ...(schema.type === "VideoGame" ? { gamePlatform: [...schema.platforms] } : {}),
    applicationCategory: schema.category,
    operatingSystem: schema.platforms.join(", "),
    ...(schema.free ? { offers: { "@type": "Offer", price: 0, priceCurrency: "USD" } } : {}),
    image: project.gallery.map((s) => absoluteUrl(s.image.src)),
    author: { "@id": personId, "@type": "Person", name: profile.name, url: siteConfig.url },
    sameAs: [link.url],
  };

  const source = isSource
    ? [
        {
          "@type": "SoftwareSourceCode",
          "@id": `${pageUrl}#source`,
          name: project.name,
          codeRepository: link.url,
          ...(schema.language ? { programmingLanguage: schema.language } : {}),
          ...(schema.runtime ? { runtimePlatform: schema.runtime } : {}),
          author: { "@id": personId },
        },
      ]
    : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      product,
      ...source,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.name, item: homeUrl },
          { "@type": "ListItem", position: 2, name: portfolioLabel, item: absoluteUrl(portfolioPath(locale)) },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
    ],
  };
}
