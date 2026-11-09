import type { ImageAsset } from "./common";

export interface PhotoVisual {
  readonly kind: "photo";
  readonly image: ImageAsset;
  readonly badge: string;
}

export interface AssistantVisual {
  readonly kind: "assistant";
  readonly image: ImageAsset;
  readonly watermark: string;
  readonly prompt: string;
  readonly caption: readonly string[];
}

export interface FlowVisual {
  readonly kind: "flow";
  readonly image: ImageAsset;
  readonly eyebrow: string;
  readonly word: string;
  readonly steps: readonly string[];
  /** Index of the step that represents the AI agent. */
  readonly agentStep: number;
}

/** Discriminated union: add a new visual by adding a member here and a renderer in the UI registry. */
export type ServiceVisual = PhotoVisual | AssistantVisual | FlowVisual;

export interface Service {
  readonly id: string;
  /** Short label used in navigation lists, e.g. "Mobile app". */
  readonly shortTitle: string;
  readonly title: { readonly lead: string; readonly accent: string };
  readonly description: string;
  readonly tags: readonly string[];
  readonly visual: ServiceVisual;
}
