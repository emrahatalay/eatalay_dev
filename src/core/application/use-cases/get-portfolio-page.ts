import type { PageContent, Profile, Project, Service } from "../../domain/entities";
import type { Locale } from "../../domain/locale";
import type {
  PageContentRepository,
  ProfileRepository,
  ProjectRepository,
  ServiceRepository,
} from "../../domain/repositories";

/** Newest first; projects from the same month keep the order they are listed in. */
export function byNewest(projects: readonly Project[]): readonly Project[] {
  return [...projects].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Everything the portfolio page needs, including the shared site chrome. */
export interface PortfolioPage {
  readonly locale: Locale;
  readonly profile: Profile;
  readonly content: PageContent;
  readonly services: readonly Service[];
  /** Every project, newest first. */
  readonly projects: readonly Project[];
}

export interface GetPortfolioPageDeps {
  readonly profiles: ProfileRepository;
  readonly pages: PageContentRepository;
  readonly services: ServiceRepository;
  readonly projects: ProjectRepository;
}

/** Single responsibility: compose the portfolio listing for a locale. */
export class GetPortfolioPage {
  constructor(private readonly deps: GetPortfolioPageDeps) {}

  async execute(locale: Locale): Promise<PortfolioPage> {
    const { profiles, pages, services, projects } = this.deps;

    const [profile, content, serviceList, projectList] = await Promise.all([
      profiles.getProfile(locale),
      pages.getPageContent(locale),
      services.getServices(locale),
      projects.getProjects(locale),
    ]);

    return { locale, profile, content, services: serviceList, projects: byNewest(projectList) };
  }
}
