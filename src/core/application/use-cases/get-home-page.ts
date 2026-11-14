import type {
  FaqItem,
  PageContent,
  Profile,
  Project,
  Service,
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
import { byNewest } from "./get-portfolio-page";

/** Everything the home page needs, assembled in one read model. */
export interface HomePage {
  readonly locale: Locale;
  readonly profile: Profile;
  readonly content: PageContent;
  readonly services: readonly Service[];
  readonly faqs: readonly FaqItem[];
  readonly testimonials: readonly Testimonial[];
  /** Every project, newest first. The home page previews the first few and links to the portfolio. */
  readonly projects: readonly Project[];
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

    const [profile, content, serviceList, faqList, testimonialList, projectList] =
      await Promise.all([
        profiles.getProfile(locale),
        pages.getPageContent(locale),
        services.getServices(locale),
        faqs.getFaqs(locale),
        testimonials.getTestimonials(locale),
        projects.getProjects(locale),
      ]);

    return {
      locale,
      profile,
      content,
      services: serviceList,
      faqs: faqList,
      testimonials: testimonialList,
      projects: byNewest(projectList),
    };
  }
}
