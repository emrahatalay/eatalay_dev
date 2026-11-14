import type { MetadataRoute } from "next";
import { loadHomePage, loadSiteMetadata } from "@/core/di/container";
import { DEFAULT_LOCALE } from "@/core/domain/locale";
import { siteConfig } from "@/shared/config/site";

/**
 * Install metadata. Name and description follow the hero's message, the
 * colours follow the site: the header and hero are dark in both themes, so the
 * app bar and splash screen are too, with the orange mark on top.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const [{ profile }, { content }] = await Promise.all([
    loadSiteMetadata(DEFAULT_LOCALE),
    loadHomePage(DEFAULT_LOCALE),
  ]);
  const { hero } = content;

  return {
    id: "/",
    name: `${profile.brand} — ${hero.titleLead} ${hero.titleAccent}`.replace(/\.$/, ""),
    short_name: profile.brand,
    description: hero.lead,
    lang: DEFAULT_LOCALE,
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.brand.night,
    theme_color: siteConfig.brand.night,
    categories: ["business", "productivity", "developer"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
