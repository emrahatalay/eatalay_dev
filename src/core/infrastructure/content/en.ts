import type { LocaleDictionary } from "./types";
import hatimApp from "./projects/hatim-app/en";
import { SHOTS as hatimShots } from "./projects/hatim-app/shared";
import outOfOffice from "./projects/out-of-office/en";
import { SHOTS as gameShots } from "./projects/out-of-office/shared";
import { EMAIL, KNOWS_ABOUT, SOCIALS, technologies } from "./shared";

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
      greeting: "I'm Emrah Atalay",
      titleLead: "AI-driven",
      titleTail: "product builder",
    },
    about: {
      headline: [
        { text: "Automate the idea, ship faster.", tone: "accent" },
        { text: "AI-assisted production for" },
        { text: "measurable growth and operational excellence.", tone: "muted" },
      ],
      summary:
        "I run AI agents like a team and turn ideas into products that are live in the stores. Architecture, taste and the final call stay human.",
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
          { label: "Software", visual: { kind: "code" } },
          { label: "Automation", visual: { kind: "flow" } },
        ],
        label: "4 disciplines · mobile, games, software, automation",
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
      "A one-person studio building mobile apps, mobile games, software and automations with AI.",
    seo: {
      title: "Emrah Atalay — AI-Driven Mobile App, Game & Software Developer",
      description:
        "Independent developer building mobile apps, mobile games, software and automations with AI agents. End-to-end product development, from idea to the app stores.",
      keywords: [
        "Emrah Atalay",
        "mobile app developer",
        "mobile game developer",
        "AI automation",
        "Unity developer",
        "React Native developer",
        "Expo app development",
        "Flutter developer",
        "iOS Android apps",
        "freelance software developer",
        "LLM agents",
        "n8n automation",
      ],
    },
  },

  services: [
    {
      id: "mobile-app",
      shortTitle: "Mobile apps",
      title: { lead: "Mobile", accent: "Apps" },
      description:
        "Fast, maintainable iOS and Android apps that feel native, built with Expo and React Native. From idea validation to the store release.",
      tags: ["Expo · React Native", "Flutter", "Swift · Kotlin", "Research", "Store release"],
      visual: {
        kind: "ship",
        screen: { ...hatimShots.en.today, alt: "The Today screen of the live Hatim App" },
        command: "eas build --platform all",
        steps: [
          { mark: "done", text: "iOS build · 42" },
          { mark: "done", text: "Android build · 42" },
          { mark: "sent", text: "Submitted to App Store" },
          { mark: "sent", text: "Submitted to Google Play" },
        ],
        badge: "App Store · Google Play",
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
          { label: "Coin multiplier", value: "×1.5" },
          { label: "Revive", value: "Rewarded ad" },
        ],
        metric: { label: "Day-1 retention", value: "42%" },
        badge: "Unity · prototype to launch",
      },
      showcase: { projectSlug: "out-of-office", label: "Case study: Out of Office" },
    },
    {
      id: "product-design",
      shortTitle: "App design",
      title: { lead: "App", accent: "Design" },
      description:
        "Interface and flow design for AI-assisted products, delivered together with a component library.",
      tags: ["Research", "Wireframes", "AI product", "Experience", "Testing"],
      visual: {
        kind: "design",
        screen: { ...hatimShots.en.group, alt: "A Hatim App screen selected on a design canvas" },
        wireframe: "Wireframe",
        size: "390 × 844",
        component: "Button / Primary",
        cursor: "Emrah",
      },
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
        runs: "128 jobs automated this week",
        trigger: "New lead",
        agent: { name: "AI agent", task: "classify · reply" },
        outputs: ["CRM", "Slack", "Email"],
      },
    },
  ],

  technologies: technologies("LLM agents"),

  faqs: [
    {
      id: "projects",
      question: "What kind of projects do you take on?",
      answer:
        "Mobile apps, mobile games, web software and AI automations. I'm most effective with product teams and startups that have a clear problem and want to ship fast.",
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
