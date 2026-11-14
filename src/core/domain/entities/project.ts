import type { ImageAsset, RichText } from "./common";
import type { Metric, SeoContent } from "./page-content";

/** A screenshot taken on a phone, shown inside a phone frame. */
export interface Screenshot {
  readonly image: ImageAsset;
  readonly caption: string;
}

/** The one outward link a project page promotes: its public source code or the live product. */
export interface ProjectLink {
  readonly kind: "source" | "website";
  /** Full button label, e.g. "Source on GitHub". */
  readonly label: string;
  /** Compact label for small buttons, e.g. "GitHub". */
  readonly short: string;
  readonly url: string;
}

/** Copy that changes with the kind of product (a game reads differently from an app). */
export interface ProjectLabels {
  /** First item of the page nav, e.g. "Game" or "App". */
  readonly nav: string;
  readonly galleryTitle: string;
  readonly galleryHint: string;
  readonly mechanicsEyebrow: string;
  readonly rosterTitle: string;
}

/**
 * Brand colours of the product as hex values. The page keeps the site's layout and type,
 * and takes its glow, gradients and highlights from these.
 */
export interface ProjectPalette {
  /** Main highlight: gradient start, punchline, glow. */
  readonly hot: string;
  readonly warm: string;
  /** Light highlight: gradient end, status dot. */
  readonly gold: string;
  /** Secondary accent on dark surfaces. */
  readonly cool: string;
  readonly deep: string;
  readonly magenta: string;
  /** Soft text accent on dark surfaces. */
  readonly soft: string;
  readonly night: string;
  readonly nightSoft: string;
  /** Finished items, e.g. roadmap checks. */
  readonly done: string;
  /**
   * Optional replacements for the site-wide accent gradients (headline accent,
   * buttons, chip borders). Leave out to keep the site's own gradients.
   */
  readonly gradients?: { readonly text: string; readonly button: string };
}

/** What schema.org should say the product is. */
export interface ProjectSchema {
  readonly type: "VideoGame" | "MobileApplication";
  readonly category: string;
  readonly genre?: readonly string[];
  readonly platforms: readonly string[];
  readonly free: boolean;
  /** Language and runtime of the source, when the source is public. */
  readonly language?: string;
  readonly runtime?: string;
}

/** A short titled paragraph: a principle, a step, a feature. */
export interface Point {
  readonly title: string;
  readonly text: string;
}

export interface ProjectHero {
  readonly eyebrow: string;
  /** Name in the page's language, set in display type. */
  readonly title: string;
  /** Name in the other language, set as a serif accent. */
  readonly accent: string;
  readonly slogan: string;
  readonly summary: string;
  /** Front phone first. */
  readonly phones: readonly [Screenshot, Screenshot];
}

export interface ProjectStory {
  readonly headline: RichText;
  readonly paragraphs: readonly string[];
  /** The line the player sees when they lose, e.g. "YOU'VE BEEN OPTIMIZED". */
  readonly punchline: { readonly text: string; readonly caption: string };
  readonly screenshot: Screenshot;
}

/** One mechanic that sets the project apart, with its proof on screen. */
export interface Mechanic {
  readonly tag: string;
  readonly title: string;
  readonly text: string;
  readonly bullets: readonly string[];
  /** File or package that implements it, shown as code (e.g. `Workforce.cs`). */
  readonly codeName: string;
  readonly screenshot: Screenshot;
}

/** An entry in a content list: a profession, an obstacle, a power-up. */
export interface RosterItem {
  readonly name: string;
  readonly detail: string;
  /** Short hint chip, e.g. "Jump" or "6 s". */
  readonly hint?: string;
}

export interface RosterGroup {
  readonly id: string;
  readonly title: string;
  readonly items: readonly RosterItem[];
}

export interface ArchitectureLayer {
  readonly name: string;
  readonly role: string;
  readonly dependsOn: readonly string[];
}

export interface CodeSample {
  readonly filename: string;
  readonly caption: string;
  readonly code: string;
}

export interface ProjectArchitecture {
  readonly headline: RichText;
  readonly intro: string;
  readonly layers: readonly ArchitectureLayer[];
  readonly principles: readonly Point[];
  readonly sample: CodeSample;
  readonly stack: readonly string[];
}

export interface ProjectWorkflow {
  readonly headline: RichText;
  readonly intro: string;
  readonly steps: readonly Point[];
}

export interface ProjectRoadmap {
  readonly done: readonly string[];
  readonly next: readonly string[];
  /** Honest note on what has and has not been verified. */
  readonly note: string;
}

export interface ProjectCta {
  readonly title: string;
  readonly text: string;
}

/** Teaser shown on the home page. */
export interface ProjectTeaser {
  readonly kicker: string;
  readonly text: string;
  readonly ctaLabel: string;
  readonly phones: readonly [Screenshot, Screenshot, Screenshot];
}

/** What kind of product a project is; drives the portfolio filter. */
export type ProjectKind = "game" | "app" | "web" | "automation";

/** Where the product stands today. */
export type ProjectStatus = "live" | "in-development";

/** A case-study page for one product. */
export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly kind: ProjectKind;
  readonly status: ProjectStatus;
  /** Month the project joined the portfolio, as "YYYY-MM". The portfolio lists newest first. */
  readonly publishedAt: string;
  /** Labels such as "Unity 6", "Android · iOS". */
  readonly badges: readonly string[];
  readonly link: ProjectLink;
  readonly labels: ProjectLabels;
  readonly palette: ProjectPalette;
  readonly schema: ProjectSchema;
  readonly hero: ProjectHero;
  readonly facts: readonly Metric[];
  readonly story: ProjectStory;
  readonly gallery: readonly Screenshot[];
  readonly mechanics: readonly Mechanic[];
  readonly roster: readonly RosterGroup[];
  readonly architecture: ProjectArchitecture;
  readonly workflow: ProjectWorkflow;
  readonly roadmap: ProjectRoadmap;
  readonly cta: ProjectCta;
  readonly teaser: ProjectTeaser;
  readonly seo: SeoContent;
}
