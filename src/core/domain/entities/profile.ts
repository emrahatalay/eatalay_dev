import type { ImageAsset } from "./common";

export type SocialNetwork = "github" | "linkedin" | "instagram";

export interface SocialLink {
  readonly network: SocialNetwork;
  readonly label: string;
  readonly url: string;
}

export interface Location {
  readonly city: string;
  readonly countryCode: string;
  /** Human readable label, e.g. "Bitlis, TR · remote". */
  readonly label: string;
}

export interface Profile {
  readonly name: string;
  readonly brand: string;
  readonly jobTitle: string;
  readonly email: string;
  readonly location: Location;
  readonly socials: readonly SocialLink[];
  readonly knowsAbout: readonly string[];
  /** Head-and-shoulders portrait, for large placements such as the about grid. */
  readonly photo: ImageAsset;
  /** The same portrait cropped to the face, for small round avatars. */
  readonly avatar: ImageAsset;
}
