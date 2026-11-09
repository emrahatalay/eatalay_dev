/** Accent family used to render a technology mark. Concrete colours live in the UI. */
export type TechnologyHue = "orange" | "violet" | "sky" | "graphite" | "indigo" | "rose" | "green";

export interface Technology {
  readonly name: string;
  /** One or two characters shown inside the mark. */
  readonly monogram: string;
  readonly hue: TechnologyHue;
}
