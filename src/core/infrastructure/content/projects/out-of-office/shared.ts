import type { ProjectPalette, ProjectSchema } from "../../../../domain/entities";
import automatedRobot from "@/assets/images/out-of-office/automated-robot.webp";
import cookieWall from "@/assets/images/out-of-office/cookie-wall.webp";
import enCollection from "@/assets/images/out-of-office/en-collection.webp";
import enDrone from "@/assets/images/out-of-office/en-drone.webp";
import enGameOver from "@/assets/images/out-of-office/en-gameover.webp";
import enMenu from "@/assets/images/out-of-office/en-menu.webp";
import enPause from "@/assets/images/out-of-office/en-pause.webp";
import enRevive from "@/assets/images/out-of-office/en-revive.webp";
import enSettings from "@/assets/images/out-of-office/en-settings.webp";
import enStore from "@/assets/images/out-of-office/en-store.webp";
import stumble from "@/assets/images/out-of-office/stumble.webp";
import trCollection from "@/assets/images/out-of-office/tr-collection.webp";
import trDrone from "@/assets/images/out-of-office/tr-drone.webp";
import trGameOver from "@/assets/images/out-of-office/tr-gameover.webp";
import trMagnet from "@/assets/images/out-of-office/tr-magnet.webp";
import trMenuDesigner from "@/assets/images/out-of-office/tr-menu-designer.webp";
import trMenu from "@/assets/images/out-of-office/tr-menu.webp";
import trRevive from "@/assets/images/out-of-office/tr-revive.webp";
import trRun from "@/assets/images/out-of-office/tr-run.webp";
import trSettings from "@/assets/images/out-of-office/tr-settings.webp";
import trStore from "@/assets/images/out-of-office/tr-store.webp";

/** In-game screenshots (1080x2400 phone captures from the Unity editor, downscaled). */
export const SHOTS = {
  automatedRobot,
  cookieWall,
  stumble,
  tr: {
    menu: trMenu,
    menuDesigner: trMenuDesigner,
    run: trRun,
    drone: trDrone,
    magnet: trMagnet,
    collection: trCollection,
    store: trStore,
    settings: trSettings,
    revive: trRevive,
    gameOver: trGameOver,
  },
  en: {
    menu: enMenu,
    drone: enDrone,
    collection: enCollection,
    store: enStore,
    settings: enSettings,
    revive: enRevive,
    gameOver: enGameOver,
    pause: enPause,
  },
} as const;

export const SLUG = "out-of-office";

/** Portfolio listing facts, the same in every language. */
export const LISTING = { kind: "game", status: "in-development", publishedAt: "2026-11" } as const;

export const REPOSITORY_URL = "https://github.com/emrahatalay/Out-of-Office";

/** Real class from the game, shown unchanged as the "one new class" example. */
export const MAGNET_EFFECT_SOURCE = `[CreateAssetMenu(menuName = "Out of Office/Effects/Magnet")]
public sealed class MagnetEffect : EffectDefinition
{
    [Min(0f)] public float radius = 7f;

    public override void Apply(EffectContext context)
    {
        context.Player.MagnetRadius = radius;
    }

    public override void Remove(EffectContext context)
    {
        context.Player.MagnetRadius = 0f;
    }
}`;

export const STACK = [
  "Unity 6 (6000.6)",
  "C#",
  "URP 17",
  "UI Toolkit",
  "Input System",
  "Unity Localization",
  "VContainer",
  "Addressables",
  "IL2CPP · ARM64",
  "HLSL",
  "Meshy",
  "Blender",
  "Python",
] as const;

/** The site's own neon palette; the page was designed around it. */
export const PALETTE: ProjectPalette = {
  hot: "#ff4d5f",
  warm: "#ff8a3d",
  gold: "#ffc83d",
  cool: "#4ee3ff",
  deep: "#a3192b",
  magenta: "#d63649",
  soft: "#ffd2d7",
  night: "#111013",
  nightSoft: "#1f1c22",
  done: "#22c55e",
};

export const SCHEMA: ProjectSchema = {
  type: "VideoGame",
  category: "GameApplication",
  genre: ["Endless runner", "Arcade"],
  platforms: ["Android", "iOS"],
  free: true,
  language: "C#",
  runtime: "Unity 6",
};
