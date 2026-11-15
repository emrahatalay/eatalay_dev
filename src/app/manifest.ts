import type { MetadataRoute } from "next";
import { loadHomePage, loadSiteMetadata } from "@/core/di/container";
import { DEFAULT_LOCALE } from "@/core/domain/locale";
import { siteConfig } from "@/shared/config/site";

/**
 * Install metadata. Name and description follow the hero's message. The
 * splash and bar colours are the light page colour (the default theme); once
 * the app is open, the page's theme-color metas take over and follow the
 * active theme, so the status and navigation bars never stay dark on a light page.
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
    background_color: siteConfig.themeColor.light,
    theme_color: siteConfig.themeColor.light,
    categories: ["business", "productivity", "developer"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
