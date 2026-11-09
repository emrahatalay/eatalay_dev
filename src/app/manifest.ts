import type { MetadataRoute } from "next";
import { loadSiteMetadata } from "@/core/di/container";
import { DEFAULT_LOCALE } from "@/core/domain/locale";
import { siteConfig } from "@/shared/config/site";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { seo, profile } = await loadSiteMetadata(DEFAULT_LOCALE);

  return {
    name: seo.title,
    short_name: profile.brand,
    description: seo.description,
    lang: DEFAULT_LOCALE,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor.light,
    theme_color: "#7b5cff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
