import type { Locale } from "../../domain/locale";
import type {
  FaqRepository,
  PageContentRepository,
  ProfileRepository,
  ProjectRepository,
  ServiceRepository,
  TestimonialRepository,
} from "../../domain/repositories";
import type { LocaleDictionary } from "../content/types";

export type DictionaryLoaders = Readonly<Record<Locale, () => Promise<LocaleDictionary>>>;

/**
 * Adapter that serves content from typed static files bundled with the app.
 * Swapping to a CMS means writing another class that implements the same ports;
 * nothing in the application or UI layers has to change (Open/Closed).
 */
export class StaticContentRepository
  implements
    ProfileRepository,
    PageContentRepository,
    ServiceRepository,
    FaqRepository,
    TestimonialRepository,
    ProjectRepository
{
  constructor(private readonly loaders: DictionaryLoaders) {}

  private load(locale: Locale): Promise<LocaleDictionary> {
    return this.loaders[locale]();
  }

  async getProfile(locale: Locale) {
    return (await this.load(locale)).profile;
  }

  async getPageContent(locale: Locale) {
    return (await this.load(locale)).page;
  }

  async getServices(locale: Locale) {
    return (await this.load(locale)).services;
  }

  async getFaqs(locale: Locale) {
    return (await this.load(locale)).faqs;
  }

  async getTestimonials(locale: Locale) {
    return (await this.load(locale)).testimonials;
  }

  async getProjects(locale: Locale) {
    return (await this.load(locale)).projects;
  }
}
