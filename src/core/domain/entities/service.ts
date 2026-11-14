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

/** A design canvas: a wireframe beside the finished, selected screen. */
export interface DesignVisual {
  readonly kind: "design";
  readonly screen: ImageAsset;
  readonly wireframe: string;
  /** Frame size shown on the selection, e.g. "390 × 844". */
  readonly size: string;
  readonly component: string;
  /** Name on the collaborator cursor. */
  readonly cursor: string;
}

/** An automation graph: one trigger, an AI agent, and the tools it hands work to. */
export interface FlowVisual {
  readonly kind: "flow";
  readonly runs: string;
  readonly trigger: string;
  readonly agent: { readonly name: string; readonly task: string };
  readonly outputs: readonly [string, string, string];
}

/** Discriminated union: add a new visual by adding a member here and a renderer in the UI registry. */
export type ServiceVisual = ShipVisual | GameVisual | DesignVisual | FlowVisual;

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
