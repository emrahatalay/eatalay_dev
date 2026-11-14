import automatedRobot from "@/assets/images/out-of-office/automated-robot.jpg";
import cookieWall from "@/assets/images/out-of-office/cookie-wall.jpg";
import enCollection from "@/assets/images/out-of-office/en-collection.jpg";
import enDrone from "@/assets/images/out-of-office/en-drone.jpg";
import enGameOver from "@/assets/images/out-of-office/en-gameover.jpg";
import enMenu from "@/assets/images/out-of-office/en-menu.jpg";
import enPause from "@/assets/images/out-of-office/en-pause.jpg";
import enRevive from "@/assets/images/out-of-office/en-revive.jpg";
import enSettings from "@/assets/images/out-of-office/en-settings.jpg";
import enStore from "@/assets/images/out-of-office/en-store.jpg";
import stumble from "@/assets/images/out-of-office/stumble.jpg";
import trCollection from "@/assets/images/out-of-office/tr-collection.jpg";
import trDrone from "@/assets/images/out-of-office/tr-drone.jpg";
import trGameOver from "@/assets/images/out-of-office/tr-gameover.jpg";
import trMagnet from "@/assets/images/out-of-office/tr-magnet.jpg";
import trMenuDesigner from "@/assets/images/out-of-office/tr-menu-designer.jpg";
import trMenu from "@/assets/images/out-of-office/tr-menu.jpg";
import trRevive from "@/assets/images/out-of-office/tr-revive.jpg";
import trRun from "@/assets/images/out-of-office/tr-run.jpg";
import trSettings from "@/assets/images/out-of-office/tr-settings.jpg";
import trStore from "@/assets/images/out-of-office/tr-store.jpg";

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
