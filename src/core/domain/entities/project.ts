import type { ImageAsset, RichText } from "./common";
import type { Metric, SeoContent } from "./page-content";

/** A screenshot taken on a phone, shown inside a phone frame. */
export interface Screenshot {
  readonly image: ImageAsset;
  readonly caption: string;
}

export interface ProjectLink {
  readonly label: string;
  readonly url: string;
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

/** One gameplay mechanic that sets the game apart, with its proof on screen. */
export interface Mechanic {
  readonly tag: string;
  readonly title: string;
  readonly text: string;
  readonly bullets: readonly string[];
  /** Name of the class that implements it, shown as code. */
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

/** A case-study page for one product. */
export interface Project {
  readonly slug: string;
  readonly name: string;
  /** Labels such as "Unity 6", "Android · iOS". */
  readonly badges: readonly string[];
  readonly repository: ProjectLink;
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
