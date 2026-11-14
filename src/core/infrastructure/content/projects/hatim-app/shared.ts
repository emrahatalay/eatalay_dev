import type { ProjectPalette, ProjectSchema } from "../../../../domain/entities";
import enAdmin from "@/assets/images/hatim-app/en-admin.jpg";
import enDark from "@/assets/images/hatim-app/en-dark.jpg";
import enDhikr from "@/assets/images/hatim-app/en-dhikr.jpg";
import enGroup from "@/assets/images/hatim-app/en-group.jpg";
import enKhatm from "@/assets/images/hatim-app/en-khatm.jpg";
import enReader from "@/assets/images/hatim-app/en-reader.jpg";
import enSurahs from "@/assets/images/hatim-app/en-surahs.jpg";
import enToday from "@/assets/images/hatim-app/en-today.jpg";
import enTranslation from "@/assets/images/hatim-app/en-translation.jpg";
import trAdmin from "@/assets/images/hatim-app/tr-admin.jpg";
import trDarkFatiha from "@/assets/images/hatim-app/tr-dark-fatiha.jpg";
import trDhikr from "@/assets/images/hatim-app/tr-dhikr.jpg";
import trFold from "@/assets/images/hatim-app/tr-fold.jpg";
import trGroup from "@/assets/images/hatim-app/tr-group.jpg";
import trJuz from "@/assets/images/hatim-app/tr-juz.jpg";
import trKhatm from "@/assets/images/hatim-app/tr-khatm.jpg";
import trReader from "@/assets/images/hatim-app/tr-reader.jpg";
import trRecitation from "@/assets/images/hatim-app/tr-recitation.jpg";
import trToday from "@/assets/images/hatim-app/tr-today.jpg";
import trTranslation from "@/assets/images/hatim-app/tr-translation.jpg";

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
    button: "linear-gradient(90deg, #c98a2b, #a66e1c 55%, #4e5b3c)",
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
