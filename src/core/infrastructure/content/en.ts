import type { LocaleDictionary } from "./types";
import hatimApp from "./projects/hatim-app/en";
import { SHOTS as hatimShots } from "./projects/hatim-app/shared";
import outOfOffice from "./projects/out-of-office/en";
import { SHOTS as gameShots } from "./projects/out-of-office/shared";
import { AVATAR, EMAIL, KNOWS_ABOUT, PHOTO, SOCIALS } from "./shared";

const en: LocaleDictionary = {
  profile: {
    name: "Emrah Atalay",
    brand: "eatalay",
    jobTitle: "AI-driven web, mobile app, game and software developer",
    email: EMAIL,
    location: { city: "Bitlis", countryCode: "TR", label: "Bitlis, TR · remote" },
    socials: SOCIALS,
    knowsAbout: KNOWS_ABOUT,
    photo: { ...PHOTO, alt: "Portrait of Emrah Atalay" },
    avatar: { ...AVATAR, alt: "Portrait of Emrah Atalay" },
  },

  page: {
    hero: {
      eyebrow: "AI-assisted product development",
      titleLead: "Built at AI speed,",
      titleAccent: "held to human standards.",
      lead: "I run a team of AI agents: code gets written, tested and reviewed, and every line passes human approval before it ships. Web and mobile apps, games and automation, from idea to launch.",
      intro: { role: "Independent developer, building software for 10+ years.", status: "Open to new projects" },
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
          { label: "Web", visual: { kind: "web" } },
          { label: "Mobile", visual: { kind: "screen", image: { ...hatimShots.en.khatm, alt: "" } } },
          { label: "Games", visual: { kind: "screen", image: { ...gameShots.en.menu, alt: "" } } },
          { label: "Automation", visual: { kind: "flow" } },
        ],
        label: "4 disciplines · web, mobile, games, automation · one shared process",
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
      steps: [
        "I listen to your idea and goal",
        "We pin down the scope and first steps together",
        "If it's a fit, I come back with a roadmap and a quote",
      ],
      inbox: {
        title: "inbox",
        received: "New message received",
        summarized: "Agent summarized and triaged it",
        replying: "Emrah is replying",
      },
    },
    process: {
      id: "shared-process",
      shortTitle: "Shared process",
      title: { lead: "Shared", accent: "Process" },
      description:
        "Whichever of the four you need, the same groundwork runs underneath. Research and architecture come before a line of code; interface design and tests run while it's built; a human review and a looked-after release close it out.",
      tags: ["Research", "Interface design", "Architecture", "Testing", "Code review", "Release & care"],
      visual: {
        kind: "process",
        scope: "Every project · all four disciplines",
        appliesTo: ["Web", "Mobile", "Games", "Automation"],
        steps: [
          { label: "Research", detail: "Problem, users, competitors", icon: "research" },
          { label: "Interface design", detail: "Flows, wireframes, components", icon: "design" },
          { label: "Architecture", detail: "Data model, layers, integrations", icon: "architecture" },
          { label: "Build & test", detail: "Agents code, tests run", icon: "build" },
          { label: "Human review", detail: "Every change approved", icon: "review" },
          { label: "Release & care", detail: "Launch, analytics, updates", icon: "release" },
        ],
      },
    },
    footerBlurb:
      "A one-person studio building websites, mobile apps, mobile games and automations with AI, designed end to end.",
    seo: {
      title: "Emrah Atalay — AI-Driven Web, Mobile App & Game Developer",
      description:
        "Independent developer building websites, web and mobile apps, mobile games and automations with AI agents, with interface and flow design built into every project. End-to-end product development with Next.js, Expo, React Native and Unity, from idea to launch.",
      keywords: [
        "Emrah Atalay",
        "web developer",
        "website development",
        "web app development",
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
      id: "web-development",
      shortTitle: "Web development",
      title: { lead: "Web", accent: "Development" },
      description:
        "Websites and web apps that load fast, are easy to find in search and simple to run: landing pages, admin panels and online stores. This site is one of them.",
      tags: ["Websites", "Web apps", "Admin panels", "SEO", "Next.js · TypeScript"],
      visual: {
        kind: "web",
        url: "eatalay.dev",
        headline: "Built at AI speed,",
        checks: ["Every page prerendered", "Sitemap and structured data", "Turkish and English", "Light and dark theme"],
        badge: "Live · this site",
      },
      showcase: { projectSlug: "hatim-app", label: "Case study: Hatim App" },
    },
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
        "Websites and web apps, mobile apps, mobile games and AI automations, with interface and flow design part of every project. I'm most effective with product teams and startups that have a clear problem and want to ship fast.",
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
