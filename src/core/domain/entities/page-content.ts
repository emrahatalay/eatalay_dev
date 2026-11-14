import type { ImageAsset, RichText } from "./common";

export interface HeroContent {
  readonly greeting: string;
  readonly titleLead: string;
  readonly titleTail: string;
}

export interface Metric {
  readonly value: string;
  readonly label: string;
}

/** How a discipline is pictured: a real screen from shipped work, or a drawn code / flow glyph. */
export type DisciplineVisual =
  | { readonly kind: "screen"; readonly image: ImageAsset }
  | { readonly kind: "code" }
  | { readonly kind: "flow" };

export interface Discipline {
  readonly label: string;
  readonly visual: DisciplineVisual;
}

export interface AboutContent {
  readonly headline: RichText;
  readonly summary: string;
  /** Years of experience, with screens from shipped products (front first). */
  readonly experience: Metric & { readonly screens: readonly [ImageAsset, ImageAsset, ImageAsset] };
  readonly disciplines: { readonly items: readonly Discipline[]; readonly label: string };
  readonly workflow: Metric;
  readonly quote: string;
}

export interface SectionIntro {
  readonly headline: RichText;
}

export interface ContactContent {
  readonly title: string;
  readonly text: string;
  readonly ctaLabel: string;
}

export interface SeoContent {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
}

export interface PageContent {
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly testimonials: SectionIntro;
  readonly faq: SectionIntro;
  readonly contact: ContactContent;
  readonly footerBlurb: string;
  readonly seo: SeoContent;
}
