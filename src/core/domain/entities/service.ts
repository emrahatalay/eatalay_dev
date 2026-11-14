import type { ImageAsset } from "./common";

/** Shipping a mobile app: a build log beside the released screen. */
export interface ShipVisual {
  readonly kind: "ship";
  readonly screen: ImageAsset;
  readonly command: string;
  readonly steps: readonly { readonly mark: "done" | "sent"; readonly text: string }[];
  readonly badge: string;
}

/** A game in the making: gameplay beside the tuning values behind it. */
export interface GameVisual {
  readonly kind: "game";
  readonly screen: ImageAsset;
  /** Name of the script component shown in the inspector. */
  readonly component: string;
  readonly fields: readonly { readonly label: string; readonly value: string }[];
  readonly metric: { readonly label: string; readonly value: string };
  readonly badge: string;
}

/** An automation graph: one trigger, an AI agent, and the tools it hands work to. */
export interface FlowVisual {
  readonly kind: "flow";
  readonly runs: string;
  readonly trigger: string;
  readonly agent: { readonly name: string; readonly task: string };
  readonly outputs: readonly [string, string, string];
}

/** A website loading in a browser, beside the checks it passed before going live. */
export interface WebVisual {
  readonly kind: "web";
  /** Address shown in the browser bar, without the protocol. */
  readonly url: string;
  /** Headline drawn on the mock page. */
  readonly headline: string;
  readonly checks: readonly string[];
  readonly badge: string;
}

export type ProcessStepIcon = "research" | "design" | "architecture" | "build" | "review" | "release";

/** The steps every project goes through, whatever the discipline, lit one after another. */
export interface ProcessVisual {
  readonly kind: "process";
  /** Line above the steps, e.g. "Every project · all four disciplines". */
  readonly scope: string;
  /** The disciplines the process applies to, shown as small chips. */
  readonly appliesTo: readonly string[];
  readonly steps: readonly {
    readonly label: string;
    readonly detail: string;
    readonly icon: ProcessStepIcon;
  }[];
}

/** Discriminated union: add a new visual by adding a member here and a renderer in the UI registry. */
export type ServiceVisual = WebVisual | ShipVisual | GameVisual | FlowVisual | ProcessVisual;

export interface Service {
  readonly id: string;
  /** Short label used in navigation lists, e.g. "Mobile app". */
  readonly shortTitle: string;
  readonly title: { readonly lead: string; readonly accent: string };
  readonly description: string;
  readonly tags: readonly string[];
  readonly visual: ServiceVisual;
  /** A case study that shows this service in practice. */
  readonly showcase?: { readonly projectSlug: string; readonly label: string };
}

/**
 * The work all services share (research, design, architecture...). It is shown
 * with the same card as a service but kept out of the services list, so it never
 * counts as a discipline in navigation, the footer or the share image.
 */
export type SharedProcess = Service & { readonly visual: ProcessVisual };
