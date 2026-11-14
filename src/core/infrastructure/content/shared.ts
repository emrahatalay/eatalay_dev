import photo from "@/assets/images/profile/emrah-atalay.webp";
import avatar from "@/assets/images/profile/emrah-atalay-avatar.webp";
import type { ImageAsset, SocialLink } from "../../domain/entities";

/** Locale-independent facts shared by every dictionary. */
export const EMAIL = "info@eatalay.dev";

/** The portrait and its face crop; each dictionary adds its own alt text. */
export const PHOTO: Omit<ImageAsset, "alt"> = photo;
export const AVATAR: Omit<ImageAsset, "alt"> = avatar;

export const SOCIALS: readonly SocialLink[] = [
  { network: "github", label: "GitHub", url: "https://github.com/emrahatalay" },
  { network: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/emrahatalay" },
  { network: "instagram", label: "Instagram", url: "https://instagram.com/emrahatalay13" },
];

export const KNOWS_ABOUT = [
  "React Native",
  "Expo",
  "Swift",
  "Kotlin",
  "Flutter",
  "Unity",
  "C#",
  "Web development",
  "Next.js",
  "TypeScript",
  "Python",
  "n8n",
  "LLM agents",
] as const;

