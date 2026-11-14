import type { ProjectPalette, ProjectSchema } from "../../../../domain/entities";
import enAdmin from "@/assets/images/hatim-app/en-admin.webp";
import enDark from "@/assets/images/hatim-app/en-dark.webp";
import enDhikr from "@/assets/images/hatim-app/en-dhikr.webp";
import enGroup from "@/assets/images/hatim-app/en-group.webp";
import enKhatm from "@/assets/images/hatim-app/en-khatm.webp";
import enReader from "@/assets/images/hatim-app/en-reader.webp";
import enSurahs from "@/assets/images/hatim-app/en-surahs.webp";
import enToday from "@/assets/images/hatim-app/en-today.webp";
import enTranslation from "@/assets/images/hatim-app/en-translation.webp";
import trAdmin from "@/assets/images/hatim-app/tr-admin.webp";
import trDarkFatiha from "@/assets/images/hatim-app/tr-dark-fatiha.webp";
import trDhikr from "@/assets/images/hatim-app/tr-dhikr.webp";
import trFold from "@/assets/images/hatim-app/tr-fold.webp";
import trGroup from "@/assets/images/hatim-app/tr-group.webp";
import trJuz from "@/assets/images/hatim-app/tr-juz.webp";
import trKhatm from "@/assets/images/hatim-app/tr-khatm.webp";
import trReader from "@/assets/images/hatim-app/tr-reader.webp";
import trRecitation from "@/assets/images/hatim-app/tr-recitation.webp";
import trToday from "@/assets/images/hatim-app/tr-today.webp";
import trTranslation from "@/assets/images/hatim-app/tr-translation.webp";

/** In-app screenshots (iPhone 18 Pro simulator, cropped to 9:20 and downscaled). */
export const SHOTS = {
  tr: {
    admin: trAdmin,
    darkFatiha: trDarkFatiha,
    dhikr: trDhikr,
    fold: trFold,
    group: trGroup,
    juz: trJuz,
    khatm: trKhatm,
    reader: trReader,
    recitation: trRecitation,
    today: trToday,
    translation: trTranslation,
  },
  en: {
    admin: enAdmin,
    dark: enDark,
    dhikr: enDhikr,
    group: enGroup,
    khatm: enKhatm,
    reader: enReader,
    surahs: enSurahs,
    today: enToday,
    translation: enTranslation,
  },
} as const;


export const SLUG = "hatim-app";

/** Portfolio listing facts, the same in every language. */
export const LISTING = { kind: "app", status: "live", publishedAt: "2026-11" } as const;

export const WEBSITE_URL = "https://hatim.app";

/** The app's own brand: honey as the only highlight, olive for finished, neutral dark grey. */
export const PALETTE: ProjectPalette = {
  hot: "#c98a2b",
  warm: "#e3a93f",
  gold: "#f4e4c3",
  cool: "#a9b98a",
  deep: "#4e5b3c",
  magenta: "#a66e1c",
  soft: "#f4e4c3",
  night: "#161616",
  nightSoft: "#2a2217",
  done: "#5f6f45",
  gradients: {
    text: "linear-gradient(90deg, #a66e1c, #d99a35)",
    button: "linear-gradient(90deg, #c98a2b, #a66e1c)",
  },
};

export const SCHEMA: ProjectSchema = {
  type: "MobileApplication",
  category: "LifestyleApplication",
  platforms: ["Web", "Android", "iOS"],
  free: true,
};

/** Real code from @hatim/core, unchanged: the shared flow behind take, release, read and share actions. */
export const MEMBER_ACTION_SOURCE = `class MemberAction<A> {
  constructor(
    private readonly ruleFn: MemberRule<A>,
    protected readonly groups: GroupRepository,
    private readonly khatms: KhatmRepository,
    private readonly session: SessionReader,
    private readonly clock: Clock,
  ) {}
  async execute(groupId: string, khatmId: string, arg: A): Promise<Khatm> {
    const user = await signedInUser(this.session);
    // Yönetici de üyelik tablosundadır
    if ((await this.groups.membership(groupId, user.id)) !== "member") throw authRequired("joinGroupFirst");
    const k = await fetchKhatm(this.khatms, groupId, khatmId);
    const updated = this.ruleFn(k, arg, { id: user.id, name: user.name }, this.clock.now());
    if (updated !== k) {
      await this.khatms.save(updated);
      await this.changed(updated, arg, user);
    }
    return updated;
  }
  protected async changed(_k: Khatm, _arg: A, _user: User): Promise<void> {}
}`;

export const STACK = [
  "TypeScript",
  "Bun",
  "Next.js 16",
  "React 19",
  "Expo SDK 58",
  "React Native",
  "Reanimated",
  "Hono",
  "PostgreSQL",
  "Drizzle",
  "Better Auth",
  "Firebase (FCM)",
  "Web Push",
  "Vitest",
  "EAS",
] as const;
