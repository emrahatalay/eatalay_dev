import type { PageContent, Profile, Project, Service } from "../../domain/entities";
import type { Locale } from "../../domain/locale";
import type {
  PageContentRepository,
  ProfileRepository,
  ProjectRepository,
  ServiceRepository,
} from "../../domain/repositories";

/** Everything a project case-study page needs, including the shared site chrome. */
export interface ProjectPage {
  readonly locale: Locale;
  readonly profile: Profile;
  readonly content: PageContent;
  readonly services: readonly Service[];
  readonly project: Project;
}

export interface GetProjectPageDeps {
  readonly profiles: ProfileRepository;
  readonly pages: PageContentRepository;
  readonly services: ServiceRepository;
  readonly projects: ProjectRepository;
}

/** Single responsibility: compose one project page. Returns null for an unknown slug. */
export class GetProjectPage {
  constructor(private readonly deps: GetProjectPageDeps) {}

  async execute(locale: Locale, slug: string): Promise<ProjectPage | null> {
    const { profiles, pages, services, projects } = this.deps;

    const [profile, content, serviceList, projectList] = await Promise.all([
      profiles.getProfile(locale),
      pages.getPageContent(locale),
      services.getServices(locale),
      projects.getProjects(locale),
    ]);

    const project = projectList.find((p) => p.slug === slug);
    if (!project) return null;

    return { locale, profile, content, services: serviceList, project };
  }
}

/** Slugs of every project, for static generation and the sitemap. */
export class ListProjectSlugs {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(locale: Locale): Promise<readonly string[]> {
    return (await this.projects.getProjects(locale)).map((p) => p.slug);
  }
}
