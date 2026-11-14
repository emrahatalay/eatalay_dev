import type { ImageAsset, RichText } from "./common";

export interface HeroContent {
  /** Short line above the title naming what the studio does. */
  readonly eyebrow: string;
  readonly titleLead: string;
  /** Second title line, set in the accent colour. */
  readonly titleAccent: string;
  readonly lead: string;
  /** Short proof points under the calls to action. */
  readonly proof: readonly Metric[];
}

export interface Metric {
  readonly value: string;
  readonly label: string;
}

/** How a discipline is pictured: a real screen from shipped work, or a drawn design / flow glyph. */
export type DisciplineVisual =
  | { readonly kind: "screen"; readonly image: ImageAsset }
  | { readonly kind: "design" }
  | { readonly kind: "flow" };

export interface Discipline {
  readonly label: string;
  readonly visual: DisciplineVisual;
}

/** One line in the delivery log: work an agent finished, or a call a person made. */
export interface LogEntry {
  readonly by: "agent" | "human";
  readonly text: string;
  readonly tag: string;
}

export interface AboutContent {
  readonly headline: RichText;
  readonly summary: string;
  /** A live-looking log of agents shipping work and a person signing it off. */
  readonly log: { readonly title: string; readonly agent: string; readonly human: string; readonly entries: readonly LogEntry[] };
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
