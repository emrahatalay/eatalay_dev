import type { SocialLink, Technology } from "../../domain/entities";

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
  "Next.js",
  "TypeScript",
  "Python",
  "n8n",
  "LLM agents",
] as const;

export function technologies(agentsLabel: string): readonly Technology[] {
  return [
    { name: "Expo", monogram: "E", hue: "graphite" },
    { name: "React Native", monogram: "RN", hue: "sky" },
    { name: "Swift", monogram: "S", hue: "orange" },
    { name: "Kotlin", monogram: "K", hue: "violet" },
    { name: "Flutter", monogram: "F", hue: "indigo" },
    { name: "Unity", monogram: "U", hue: "graphite" },
    { name: "Next.js", monogram: "N", hue: "indigo" },
    { name: "n8n", monogram: "n", hue: "rose" },
    { name: agentsLabel, monogram: "AI", hue: "green" },
  ];
}
