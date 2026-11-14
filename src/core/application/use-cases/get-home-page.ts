import type {
  FaqItem,
  PageContent,
  Profile,
  Project,
  Service,
  Technology,
  Testimonial,
} from "../../domain/entities";
import type { Locale } from "../../domain/locale";
import type {
  FaqRepository,
  PageContentRepository,
  ProfileRepository,
  ProjectRepository,
  ServiceRepository,
  TestimonialRepository,
} from "../../domain/repositories";

/** Everything the home page needs, assembled in one read model. */
export interface HomePage {
  readonly locale: Locale;
  readonly profile: Profile;
  readonly content: PageContent;
  readonly services: readonly Service[];
  readonly technologies: readonly Technology[];
  readonly faqs: readonly FaqItem[];
  readonly testimonials: readonly Testimonial[];
  /** Project promoted on the home page, if any. */
  readonly featuredProject: Project | null;
}

export interface GetHomePageDeps {
  readonly profiles: ProfileRepository;
  readonly pages: PageContentRepository;
  readonly services: ServiceRepository;
  readonly faqs: FaqRepository;
  readonly testimonials: TestimonialRepository;
  readonly projects: ProjectRepository;
}

/** Single responsibility: compose the home page read model for a locale. */
export class GetHomePage {
  constructor(private readonly deps: GetHomePageDeps) {}

  async execute(locale: Locale): Promise<HomePage> {
    const { profiles, pages, services, faqs, testimonials, projects } = this.deps;

    const [profile, content, serviceList, technologies, faqList, testimonialList, projectList] =
      await Promise.all([
        profiles.getProfile(locale),
        pages.getPageContent(locale),
        services.getServices(locale),
        services.getTechnologies(locale),
        faqs.getFaqs(locale),
        testimonials.getTestimonials(locale),
        projects.getProjects(locale),
      ]);

    return {
      locale,
      profile,
      content,
      services: serviceList,
      technologies,
      faqs: faqList,
      testimonials: testimonialList,
      featuredProject: projectList[0] ?? null,
    };
  }
}
