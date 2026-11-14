import { cache } from "react";
import { GetHomePage } from "../application/use-cases/get-home-page";
import { GetPortfolioPage } from "../application/use-cases/get-portfolio-page";
import { GetProjectPage, ListProjectSlugs } from "../application/use-cases/get-project-page";
import { GetSiteMetadata } from "../application/use-cases/get-site-metadata";
import type { Locale } from "../domain/locale";
import { StaticContentRepository } from "../infrastructure/repositories/static-content-repository";

/*
 * Composition root: the only place that knows which concrete adapters
 * back the ports. The UI imports these functions and nothing else from core.
 */
const contentRepository = new StaticContentRepository({
  tr: () => import("../infrastructure/content/tr").then((m) => m.default),
  en: () => import("../infrastructure/content/en").then((m) => m.default),
});

const getHomePage = new GetHomePage({
  profiles: contentRepository,
  pages: contentRepository,
  services: contentRepository,
  faqs: contentRepository,
  testimonials: contentRepository,
  projects: contentRepository,
});

const getProjectPage = new GetProjectPage({
  profiles: contentRepository,
  pages: contentRepository,
  services: contentRepository,
  projects: contentRepository,
});

const getPortfolioPage = new GetPortfolioPage({
  profiles: contentRepository,
  pages: contentRepository,
  services: contentRepository,
  projects: contentRepository,
});

const listProjectSlugs = new ListProjectSlugs(contentRepository);

const getSiteMetadata = new GetSiteMetadata({
  profiles: contentRepository,
  pages: contentRepository,
  faqs: contentRepository,
});

/** Request-scoped memoisation so metadata and page rendering share one read. */
export const loadHomePage = cache((locale: Locale) => getHomePage.execute(locale));
export const loadSiteMetadata = cache((locale: Locale) => getSiteMetadata.execute(locale));
export const loadPortfolioPage = cache((locale: Locale) => getPortfolioPage.execute(locale));
export const loadProjectPage = cache((locale: Locale, slug: string) => getProjectPage.execute(locale, slug));
export const loadProjectSlugs = cache((locale: Locale) => listProjectSlugs.execute(locale));
