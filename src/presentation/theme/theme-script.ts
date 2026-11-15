import { siteConfig } from "@/shared/config/site";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const { light, dark } = siteConfig.themeColor;

/**
 * Runs before first paint (inlined in <head>) so a saved choice never flashes.
 * With no saved choice, nothing is set and CSS follows prefers-color-scheme,
 * including live OS theme changes.
 *
 * It also keeps the theme-color metas (browser bar, an installed app's status
 * and navigation bars) on the active theme's page colour. Without a pick they
 * keep their media queries and follow the OS. Once data-theme is set, here or
 * by the toggle, every theme-color meta gets that theme's colour, including
 * metas Next.js adds or re-renders after load, which an observer catches.
 */
export const themeInitScript = `try{var d=document,r=d.documentElement,t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")r.dataset.theme=t;var s=function(){var p=r.dataset.theme;if(p!=="light"&&p!=="dark")return;var c=p==="dark"?"${dark}":"${light}";d.querySelectorAll('meta[name="theme-color"]').forEach(function(m){if(m.content!==c)m.content=c})},o=new MutationObserver(s);s();o.observe(r,{attributes:true,attributeFilter:["data-theme"]});o.observe(d.head,{childList:true,subtree:true})}catch(e){}`;
