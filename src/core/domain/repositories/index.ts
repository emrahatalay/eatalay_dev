import type { Locale } from "../locale";
import type {
  FaqItem,
  PageContent,
  Profile,
  Project,
  Service,
  Technology,
  Testimonial,
} from "../entities";

/*
 * Ports (Dependency Inversion): the application layer depends on these
 * abstractions, never on where the data actually comes from. Each port is
 * small and focused (Interface Segregation) so a use case only asks for
 * what it needs and any source (static files, CMS, API) can implement it.
 */

export interface ProfileRepository {
  getProfile(locale: Locale): Promise<Profile>;
}

export interface PageContentRepository {
  getPageContent(locale: Locale): Promise<PageContent>;
}

export interface ServiceRepository {
  getServices(locale: Locale): Promise<readonly Service[]>;
  getTechnologies(locale: Locale): Promise<readonly Technology[]>;
}

export interface FaqRepository {
  getFaqs(locale: Locale): Promise<readonly FaqItem[]>;
}

export interface TestimonialRepository {
  getTestimonials(locale: Locale): Promise<readonly Testimonial[]>;
}

export interface ProjectRepository {
  getProjects(locale: Locale): Promise<readonly Project[]>;
}
