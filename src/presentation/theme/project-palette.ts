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
    ...(palette.gradients && { "--g-hot": palette.gradients.text, "--g-btn": palette.gradients.button }),
  } as CSSProperties;
}
