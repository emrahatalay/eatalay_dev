import type { CSSProperties } from "react";
import type { ProjectPalette } from "@/core/domain/entities";

/** Exposes a project's brand colours as the --p-* custom properties the project sections read. */
export function paletteStyle(palette: ProjectPalette): CSSProperties {
  return {
    "--p-hot": palette.hot,
    "--p-warm": palette.warm,
    "--p-gold": palette.gold,
    "--p-cool": palette.cool,
    "--p-deep": palette.deep,
    "--p-magenta": palette.magenta,
    "--p-soft": palette.soft,
    "--p-night": palette.night,
    "--p-night-soft": palette.nightSoft,
    "--p-done": palette.done,
    // Block surfaces: the soft brand tint over the light panel, or the brand's own dark
    // (--p-dark-mix is 0% in light, 100% in dark, set by the theme tokens).
    "--p-block": "color-mix(in srgb, var(--p-night) var(--p-dark-mix), color-mix(in srgb, var(--p-soft) 28%, var(--night)))",
    // Brand text on those blocks, deepened toward the ink in light so neon hues stay readable.
    "--p-cool-ink": "color-mix(in srgb, var(--p-cool) var(--p-ink-mix), var(--on-night))",
    "--p-gold-ink": "color-mix(in srgb, var(--p-gold) var(--p-ink-mix), var(--on-night))",
    "--p-soft-ink": "color-mix(in srgb, var(--p-soft) var(--p-ink-mix), var(--on-night))",
    "--p-block-2":
      "color-mix(in srgb, var(--p-night-soft) var(--p-dark-mix), color-mix(in srgb, var(--p-soft) 45%, var(--night-2)))",
    ...(palette.gradients && { "--g-hot": palette.gradients.text, "--g-btn": palette.gradients.button }),
  } as CSSProperties;
}
