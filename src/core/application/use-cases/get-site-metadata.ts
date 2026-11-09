import type { FaqItem, Profile, SeoContent } from "../../domain/entities";
import type { Locale } from "../../domain/locale";
import type {
  FaqRepository,
  PageContentRepository,
  ProfileRepository,
} from "../../domain/repositories";

export interface SiteMetadata {
  readonly locale: Locale;
  readonly seo: SeoContent;
  readonly profile: Profile;
  readonly faqs: readonly FaqItem[];
}

/** Collects what search engines need: meta tags and structured data inputs. */
export class GetSiteMetadata {
  constructor(
    private readonly deps: {
      readonly profiles: ProfileRepository;
      readonly pages: PageContentRepository;
      readonly faqs: FaqRepository;
    },
  ) {}

  async execute(locale: Locale): Promise<SiteMetadata> {
    const [profile, content, faqs] = await Promise.all([
      this.deps.profiles.getProfile(locale),
      this.deps.pages.getPageContent(locale),
      this.deps.faqs.getFaqs(locale),
    ]);

    return { locale, seo: content.seo, profile, faqs };
  }
}
