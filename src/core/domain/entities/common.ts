/** Framework-agnostic image description. Next's StaticImageData satisfies it structurally. */
export interface ImageAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly blurDataURL?: string;
  readonly alt: string;
}

/** Visual emphasis of a piece of copy; the presentation layer decides how it looks. */
export type TextTone = "default" | "accent" | "muted";

export interface TextSegment {
  readonly text: string;
  readonly tone?: TextTone;
}

/** Copy made of emphasised segments, e.g. a headline with a highlighted phrase. */
export type RichText = readonly TextSegment[];
