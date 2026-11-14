import type { LocaleDictionary } from "./types";
import hatimApp from "./projects/hatim-app/en";
import { SHOTS as hatimShots } from "./projects/hatim-app/shared";
import outOfOffice from "./projects/out-of-office/en";
import { SHOTS as gameShots } from "./projects/out-of-office/shared";
import { EMAIL, KNOWS_ABOUT, SOCIALS } from "./shared";

const en: LocaleDictionary = {
  profile: {
    name: "Emrah Atalay",
    brand: "eatalay",
    jobTitle: "AI-driven mobile app, game and software developer",
    email: EMAIL,
    location: { city: "Bitlis", countryCode: "TR", label: "Bitlis, TR · remote" },
    socials: SOCIALS,
    knowsAbout: KNOWS_ABOUT,
  },

  page: {
    hero: {
      eyebrow: "AI-assisted product development",
      titleLead: "Built at AI speed,",
      titleAccent: "held to human standards.",
      lead: "I'm Emrah Atalay. I run a team of AI agents: code gets written, tested and reviewed, and every line passes human approval before it ships. Mobile apps, games and automation, from idea to launch.",
      proof: [
        { value: "10+ yrs", label: "in production" },
        { value: "End to end", label: "idea to launch, one owner" },
        { value: "100%", label: "human-approved code" },
      ],
    },
    about: {
      headline: [
        { text: "Agents build,", tone: "accent" },
        { text: "a human makes the call. Speed from AI, accountability from me." },
      ],
      summary:
        "I combine more than ten years of production experience with a team of AI agents. Research, code, tests and docs move in parallel; architecture, product taste and the release call stay with me.",
      log: {
        title: "Delivery log",
        agent: "Agent",
        human: "Emrah",
        entries: [
          { by: "agent", text: "Share screen written", tag: "code" },
          { by: "agent", text: "24 tests added, all passing", tag: "test" },
          { by: "agent", text: "Accessibility review done", tag: "review" },
          { by: "human", text: "Changes approved", tag: "approval" },
          { by: "agent", text: "iOS and Android built", tag: "build" },
          { by: "agent", text: "Release notes drafted", tag: "docs" },
          { by: "human", text: "Version 1.4 shipped", tag: "release" },
        ],
      },
      experience: {
        value: "10+ yrs",
        label: "Of shipping software in production.",
        screens: [
          { ...hatimShots.en.today, alt: "Hatim App Today screen" },
          { ...gameShots.en.drone, alt: "Out of Office gameplay" },
          { ...hatimShots.en.reader, alt: "Hatim App Quran reader" },
        ],
      },
      disciplines: {
        items: [
          { label: "Mobile", visual: { kind: "screen", image: { ...hatimShots.en.khatm, alt: "" } } },
          { label: "Games", visual: { kind: "screen", image: { ...gameShots.en.menu, alt: "" } } },
          { label: "Design", visual: { kind: "design" } },
          { label: "Automation", visual: { kind: "flow" } },
        ],
        label: "4 disciplines · mobile, games, design, automation",
      },
      workflow: { value: "AI", label: "Parallel work with an agent team, quality through human review." },
      quote:
        "The agent team works in parallel: research, tests, refactoring and docs move at the same time. Every line passes human review.",
    },
    testimonials: {
      headline: [{ text: "What the teams I work with say.", tone: "accent" }],
    },
    faq: {
      headline: [
        { text: "Your questions,", tone: "accent" },
        { text: "clear answers. What to know before we start." },
      ],
    },
    contact: {
      title: "Book a 15-minute call",
      text: "Have questions? Let's have a short intro call before the project starts.",
      ctaLabel: "Free intro call",
    },
    footerBlurb:
      "A one-person studio building mobile apps, mobile games, interface design and automations with AI.",
    seo: {
      title: "Emrah Atalay — AI-Driven Mobile App, Game & Software Developer",
      description:
        "Independent developer building mobile apps, mobile games, interface design and automations with AI agents. End-to-end product development with Expo, React Native, Next.js and Unity, from idea to launch.",
      keywords: [
        "Emrah Atalay",
        "mobile app developer",
        "mobile game developer",
        "AI automation",
        "Unity developer",
        "React Native developer",
        "Expo app development",
        "Flutter developer",
        "Swift Kotlin developer",
        "Next.js TypeScript developer",
        "Unity C# game development",
        "mobile app design",
        "iOS Android apps",
        "freelance software developer",
        "LLM agents",
        "n8n automation",
        "Python automation",
      ],
    },
  },

  services: [
    {
      id: "mobile-app",
      shortTitle: "Mobile apps",
      title: { lead: "Mobile", accent: "Apps" },
      description:
        "iOS and Android apps that feel native, built with Expo and React Native; Swift, Kotlin or Flutter when needed. A Next.js web version from the same core.",
      tags: ["Expo · React Native", "Next.js · TypeScript", "Flutter", "Swift · Kotlin", "Store release"],
      visual: {
        kind: "ship",
        screen: { ...hatimShots.en.today, alt: "The Today screen of Hatim App" },
        command: "eas build --platform all",
        steps: [
          { mark: "done", text: "iOS build · 42" },
          { mark: "done", text: "Android build · 42" },
          { mark: "sent", text: "Sent to Google Play closed testing" },
          { mark: "sent", text: "Web: hatim.app updated" },
        ],
        badge: "One core · web, iOS, Android",
      },
      showcase: { projectSlug: "hatim-app", label: "Case study: Hatim App" },
    },
    {
      id: "mobile-game",
      shortTitle: "Mobile games",
      title: { lead: "Mobile", accent: "Games" },
      description:
        "From rapid Unity prototype to launch: core loop, economy balancing, ads and in-app purchases.",
      tags: ["Prototype", "Unity · C#", "Economy", "Ads", "Purchases"],
      visual: {
        kind: "game",
        screen: { ...gameShots.en.drone, alt: "A gameplay screen from Out of Office" },
        component: "PlayerRunner",
        fields: [
          { label: "Speed", value: "12" },
          { label: "Lanes", value: "3" },
          { label: "Overtime", value: "×2" },
          { label: "Continue", value: "Keycard" },
        ],
        metric: { label: "Job buy-back cost", value: "×1.5" },
        badge: "Unity · prototype to launch",
      },
      showcase: { projectSlug: "out-of-office", label: "Case study: Out of Office" },
    },
    {
      id: "product-design",
      shortTitle: "App design",
      title: { lead: "App", accent: "Design" },
      description:
        "Interface and flow design for AI-assisted products, delivered together with a component library. Hatim App's calm, large-target interface came out of this process.",
      tags: ["Research", "Wireframes", "AI product", "Experience", "Testing"],
      visual: {
        kind: "design",
        screen: { ...hatimShots.en.group, alt: "A Hatim App screen selected on a design canvas" },
        wireframe: "Wireframe",
        size: "390 × 844",
        component: "Button / Primary",
        cursor: "Emrah",
      },
      showcase: { projectSlug: "hatim-app", label: "Case study: Hatim App" },
    },
    {
      id: "ai-automation",
      shortTitle: "AI automation",
      title: { lead: "AI", accent: "Automation" },
      description:
        "I automate repetitive workflows with AI agents and integrations, so your team can focus on decisions.",
      tags: ["LLM agents", "n8n", "Python", "Integrations"],
      visual: {
        kind: "flow",
        runs: "Runs on every new lead",
        trigger: "New lead",
        agent: { name: "AI agent", task: "classify · reply" },
        outputs: ["CRM", "Slack", "Email"],
      },
    },
  ],

  faqs: [
    {
      id: "projects",
      question: "What kind of projects do you take on?",
      answer:
        "Mobile apps (with a Next.js web version when needed), mobile games, interface design and AI automations. I'm most effective with product teams and startups that have a clear problem and want to ship fast.",
    },
    {
      id: "mvp",
      question: "How long does an MVP take?",
      answer:
        "It depends on scope; a typical mobile MVP timeline is six weeks: framing, prototype, build, launch.",
    },
    {
      id: "ai",
      question: "How exactly do you use AI?",
      answer:
        "Agents run research, testing, refactoring and documentation in parallel. Architecture, security, code review and the final call stay with me.",
    },
    {
      id: "ownership",
      question: "Who owns the code and accounts?",
      answer:
        "You do, entirely. Source code, store accounts and infrastructure are set up in your name and handed over with documentation.",
    },
    {
      id: "support",
      question: "Do you offer support after launch?",
      answer: "Yes. There are monthly maintenance options for analytics, bug fixes and new releases.",
    },
  ],

  // Only real, approved client quotes go here. The section stays hidden while empty.
  testimonials: [],

  // Listed newest first (by publishedAt) on the portfolio page; the home page previews the newest.
  projects: [outOfOffice, hatimApp],
};

export default en;
