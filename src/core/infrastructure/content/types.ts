import type {
  FaqItem,
  PageContent,
  Profile,
  Project,
  Service,
  Technology,
  Testimonial,
} from "../../domain/entities";

/** Shape of one locale's static content file. */
export interface LocaleDictionary {
  readonly profile: Profile;
  readonly page: PageContent;
  readonly services: readonly Service[];
  readonly technologies: readonly Technology[];
  readonly faqs: readonly FaqItem[];
  readonly testimonials: readonly Testimonial[];
  readonly projects: readonly Project[];
}
