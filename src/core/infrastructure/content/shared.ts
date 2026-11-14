import type { SocialLink } from "../../domain/entities";

/** Locale-independent facts shared by every dictionary. */
export const EMAIL = "info@eatalay.dev";

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

