import type { Project } from "../../../../domain/entities";
import { LISTING, MEMBER_ACTION_SOURCE, PALETTE, SCHEMA, SHOTS, SLUG, STACK, WEBSITE_URL } from "./shared";

const hatimAppEn: Project = {
  slug: SLUG,
  name: "Hatim App",
  ...LISTING,
  badges: ["Next.js · Expo", "TypeScript", "Web · Android · iOS", "English · Türkçe"],
  link: { kind: "website", label: "Open hatim.app", short: "hatim.app", url: WEBSITE_URL },
  labels: {
    nav: "App",
    galleryTitle: "Straight from the app",
    galleryHint: "All captured inside the app on an iPhone 18 Pro screen. Scroll to browse.",
    mechanicsEyebrow: "Two things that set it apart",
    rosterTitle: "What's inside, and what it's for",
  },
  palette: PALETTE,
  schema: SCHEMA,

  hero: {
    eyebrow: "Web + mobile app · Free · Live",
    title: "Hatim App",
    accent: "hatim.app",
    slogan: "Let's complete the Quran together.",
    summary:
      "Start a khatm group with your family, your friends or your mosque community. Everyone takes a juz and marks it once read; when the ring fills, the khatm is complete. Read the Quran like a book, listen to Alafasy, pick up where you left off.",
    phones: [
      { image: { ...SHOTS.en.khatm, alt: "Hatim App group khatm screen: the state of all 30 juz and a progress ring" }, caption: "Group khatm" },
      { image: { ...SHOTS.en.reader, alt: "Hatim App Quran reader: ayahs laid out like a mushaf page" }, caption: "Quran reader" },
    ],
  },

  facts: [
    { value: "3", label: "Platforms on one core: web, iOS and Android" },
    { value: "52", label: "Use cases; a rule is written once, used by all three" },
    { value: "272", label: "Automated tests, including race tests on real Postgres" },
    { value: "29K+", label: "Lines of TypeScript in a single monorepo" },
  ],

  story: {
    headline: [
      { text: "One khatm,", tone: "accent" },
      { text: "thirty juz, one screen." },
      { text: "No more hand-kept lists.", tone: "muted" },
    ],
    paragraphs: [
      "A group khatm is an old and beautiful tradition: in a family, a mosque or a WhatsApp group, the 30 juz of the Quran are shared out. But the list of who took which juz, and who finished, is kept by hand and gets lost between messages.",
      "Hatim App puts it on a single screen. An admin opens a khatm, everyone taps a free juz to take it and taps \"Read\" when done. When someone takes a juz, every member's screen refreshes on its own; when the ring fills, the khatm is complete.",
      "The goal is that a 60-year-old can use it without help: big buttons, plain language, and no account needed just to read. The visual language follows religious sensitivities too: only the 8-pointed star and geometric patterns, no figures of living beings, no rising-to-the-sky effects.",
    ],
    punchline: { text: "Allah kabul etsin", caption: "\"May Allah accept it\": the line on screen when the ring fills and the khatm is complete." },
    screenshot: { image: { ...SHOTS.en.group, alt: "Group screen: open and finished khatms, members and an invite link" }, caption: "Every khatm of the group, at a glance" },
  },

  gallery: [
    { image: { ...SHOTS.en.today, alt: "Today screen: where you left off and your open khatms" }, caption: "Today: where you left off and what's next." },
    { image: { ...SHOTS.en.khatm, alt: "Group khatm: who holds each of the 30 juz and a progress ring" }, caption: "Thirty juz on one screen: who took it, who finished." },
    { image: { ...SHOTS.tr.fold, alt: "Quran reader turning a page that folds like a real book" }, caption: "The page folds from where your finger holds it." },
    { image: { ...SHOTS.en.translation, alt: "Translation panel of the page with play and bookmark per ayah" }, caption: "Translation, recitation and bookmarks per ayah." },
    { image: { ...SHOTS.en.group, alt: "Group screen: open and finished khatms, members and an invite link" }, caption: "A group: open khatms, members, WhatsApp invite." },
    { image: { ...SHOTS.en.admin, alt: "Join requests in a public group with Approve buttons" }, caption: "Admins approve join requests with one tap." },
    { image: { ...SHOTS.en.dhikr, alt: "10,000 Salawat count khatm: choose how many you will take" }, caption: "Count khatms: choose how many you'll take." },
    { image: { ...SHOTS.en.surahs, alt: "Surah list with search" }, caption: "114 surahs, offline." },
    { image: { ...SHOTS.en.dark, alt: "Quran reader in dark theme" }, caption: "Read at night in the dark theme." },
  ],

  mechanics: [
    {
      tag: "A reader like a book",
      title: "The page folds from where your finger holds it",
      text: "Ayahs follow the page layout of the Medina mushaf and the page turns right to left like a real book. The fold geometry and the type size that fits a page live in a shared package; web and mobile run the same engine.",
      bullets: [
        "A real page-turn recording follows the leaf: hold the page halfway and the sound pauses, let go and it fades.",
        "Nine type sizes; at large sizes the page scrolls within itself and the translation grows too.",
        "During recitation the ayah being read always stays visible above the player.",
      ],
      codeName: "@hatim/book",
      screenshot: { image: { ...SHOTS.tr.fold, alt: "A Quran page folding like a book" }, caption: "Page turn" },
    },
    {
      tag: "Group khatm",
      title: "Updates live, survives a double tap",
      text: "When someone takes or reads a juz, every member's screen refreshes on its own. Even if two people tap the same juz at the same moment, it ends up with a single owner; pressing the same button twice breaks nothing.",
      bullets: [
        "The rule is a pure function in the core: if the same action arrives twice, the state doesn't change.",
        "Row locks and conditional updates on the server; an Idempotency-Key on new records.",
        "Count khatms: a target number for a surah, Ayat al-Kursi or a dhikr, with a share per member.",
      ],
      codeName: "MarkJuzRead.ts",
      screenshot: { image: { ...SHOTS.en.khatm, alt: "Group khatm screen" }, caption: "Group khatm" },
    },
  ],

  roster: [
    {
      id: "khatms",
      title: "Khatm types",
      items: [
        { name: "Quran khatm", detail: "30 juz shared across the group; the khatm is done when the ring fills.", hint: "30 juz" },
        { name: "Surah khatm", detail: "A target count for one surah, with a share per member.", hint: "Count" },
        { name: "Ayat al-Kursi", detail: "A set number of recitations as a group.", hint: "Count" },
        { name: "Dhikr", detail: "Salawat, istighfar, tasbih, hamd, takbir and tahlil.", hint: "Counter" },
      ],
    },
    {
      id: "reading",
      title: "Reading",
      items: [
        { name: "Translation", detail: "Sahih International in English, Diyanet in Turkish; per ayah or next to the page on desktop.", hint: "EN · TR" },
        { name: "Alafasy recitation", detail: "Plays ayah by ayah and keeps going with the screen locked.", hint: "Audio" },
        { name: "Offline reading", detail: "The Quran text and translations ship inside the app.", hint: "Offline" },
        { name: "Where you left off", detail: "The ayah you read is saved on its own and follows you across devices.", hint: "Automatic" },
        { name: "Bookmarks", detail: "Mark an ayah, come back any time." },
      ],
    },
    {
      id: "community",
      title: "Community",
      items: [
        { name: "Public and private groups", detail: "Anyone can find a public group; private ones are joined by request.", hint: "Approved" },
        { name: "WhatsApp invite", detail: "Tapping the link follows the group; no codes to type." },
        { name: "Notifications", detail: "New khatm, juz read, khatm completed.", hint: "Push" },
        { name: "Daily reminder", detail: "A reading reminder at the time you choose.", hint: "Scheduled" },
        { name: "Read without an account", detail: "No sign-in to read; joining a group takes one step by email." },
      ],
    },
  ],

  architecture: {
    headline: [
      { text: "Three apps,", tone: "accent" },
      { text: "one rule book.", tone: "default" },
    ],
    intro:
      "The website, the iOS/Android app and the server share the same core. A business rule is written once; neither the UI nor the server rewrites it. Dependencies only point inward, and ESLint guards the boundaries.",
    layers: [
      { name: "@hatim/core", role: "Pure business rules and ports: khatm, juz, shares, groups, notifications. No React, no DOM.", dependsOn: [] },
      { name: "@hatim/book", role: "The book engine: page-fold geometry, typesetting, page-turn sound.", dependsOn: [] },
      { name: "@hatim/data", role: "Port implementations: API client, mock data, on-device settings and bookmarks.", dependsOn: ["core"] },
      { name: "api", role: "Bun + Hono + PostgreSQL. An endpoint only validates and calls a use case.", dependsOn: ["core"] },
      { name: "web", role: "Next.js 16 site and PWA with offline reading.", dependsOn: ["core", "data", "book"] },
      { name: "mobile", role: "Expo + React Native for iOS and Android.", dependsOn: ["core", "data", "book"] },
    ],
    principles: [
      { title: "A rule is written once", text: "Business rules are never rewritten in the UI or an API handler; they go into @hatim/core and all three sides use them from there." },
      { title: "Dependencies point inward", text: "domain → application → infrastructure → di → presentation. The UI can't reach a repository directly." },
      { title: "Double-tap safe", text: "Database constraints, row locks and an Idempotency-Key. If the same request arrives twice, nothing changes." },
      { title: "The core produces no text", text: "Errors come back as codes and the UI translates them from a dictionary. One Turkish and English dictionary, shared by web and mobile." },
      { title: "Same name, same job", text: "Atomic Design: Button, Sheet and KhatmScreen do the same job under the same name on web and mobile." },
      { title: "Works offline", text: "The Quran text and translations are bundled; on the web a service worker keeps the pages you've visited." },
    ],
    sample: {
      filename: "packages/core/src/application/use-cases/khatm/index.ts",
      caption:
        "The shared flow behind take, release, read and share actions. The rule is a pure function; if the state didn't change, nothing is written and no notification goes out.",
      code: MEMBER_ACTION_SOURCE,
    },
    stack: STACK,
  },

  workflow: {
    headline: [
      { text: "Built with AI agents,", tone: "accent" },
      { text: "under human review." },
    ],
    intro:
      "Hatim App is another example of my production setup, where I run AI agents like a team. Architecture, religious and visual rules, and the final call stay with me; repetitive work goes to the agents.",
    steps: [
      { title: "Every package has its own memory", text: "A CLAUDE.md at the root and in every subproject: architecture, code rules, religious and visual rules. An agent reads the relevant doc instead of rescanning the project." },
      { title: "Not done until it's seen on screen", text: "Web is verified in a preview and mobile in the iOS Simulator with screenshots; Android notifications were tested on a real device." },
      { title: "One-push release", text: "A push to main runs tests, the build, the server deploy, a health check and a rollback on failure. Mobile ships with EAS builds and in-app updates." },
      { title: "A video engine for Instagram", text: "The Hatim Reels series is rendered by its own engine: Alafasy recitation, the ayah text and a khatm progress bar at the end." },
    ],
  },

  roadmap: {
    done: [
      "hatim.app is live: site, API, email code and Google sign-in",
      "A Quran reader like a book, translations, Alafasy recitation",
      "Group khatm: live updates, public and private groups, invites",
      "Count khatms: surah, Ayat al-Kursi and dhikr",
      "Notifications: FCM, Web Push and a daily reminder",
      "Android app in Google Play closed testing",
    ],
    next: [
      "Public release on Google Play",
      "App Store and iOS notifications",
      "Sign in with Apple",
      "Turkish mushaf page layout",
      "Learning to read the Quran",
    ],
    note: "The web version is live and free at hatim.app. The Android app is in closed testing on Google Play and the iOS version is not in the store yet. The source code lives in a private repository.",
  },

  cta: {
    title: "Got an app in mind?",
    text: "I build web, iOS and Android from a single codebase, from the idea all the way to the stores. Let's talk about your idea in 15 minutes.",
  },

  teaser: {
    kicker: "Featured project",
    text: "A free app for completing the Quran together with family and friends. Web, iOS and Android from one core; the web version is live at hatim.app.",
    ctaLabel: "Explore the app",
    phones: [
      { image: { ...SHOTS.en.today, alt: "Today screen" }, caption: "Today" },
      { image: { ...SHOTS.en.khatm, alt: "Group khatm screen" }, caption: "Group khatm" },
      { image: { ...SHOTS.en.reader, alt: "Quran reader" }, caption: "Reader" },
    ],
  },

  seo: {
    title: "Hatim App: complete the Quran together (web, iOS, Android)",
    description:
      "Group khatm with family and friends: all 30 juz on one screen, live updates, a Quran reader that turns like a book, translations and Alafasy recitation. Three platforms from one core with Next.js, Expo and Clean Architecture.",
    keywords: [
      "Hatim App",
      "khatm app",
      "group khatm",
      "Quran khatm app",
      "juz sharing",
      "Next.js Expo monorepo",
      "React Native app development",
      "Clean Architecture TypeScript",
    ],
  },
};

export default hatimAppEn;
