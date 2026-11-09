import type { RichText } from "./common";

export interface HeroContent {
  readonly greeting: string;
  readonly titleLead: string;
  readonly titleTail: string;
}

export interface Metric {
  readonly value: string;
  readonly label: string;
}

export interface AboutContent {
  readonly headline: RichText;
  readonly summary: string;
  readonly experience: Metric;
  readonly disciplines: { readonly initials: readonly string[]; readonly label: string };
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
