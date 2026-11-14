import type { Project } from "../../../../domain/entities";
import { MAGNET_EFFECT_SOURCE, PALETTE, REPOSITORY_URL, SCHEMA, SHOTS, SLUG, STACK } from "./shared";

const outOfOfficeEn: Project = {
  slug: SLUG,
  name: "Out of Office",
  badges: ["Unity 6", "C#", "Android · iOS", "English · Türkçe"],
  link: { kind: "source", label: "Source on GitHub", short: "GitHub", url: REPOSITORY_URL },
  labels: {
    nav: "Game",
    galleryTitle: "Straight from the game",
    galleryHint: "All captured in-game on a 20:9 portrait phone screen. Scroll to browse.",
    mechanicsEyebrow: "Two mechanics that set it apart",
    rosterTitle: "Who's who, and what it does",
  },
  palette: PALETTE,
  schema: SCHEMA,

  hero: {
    eyebrow: "Mobile game · Endless runner · In development",
    title: "Out of Office",
    accent: "Son Mesai",
    slogan: "AI took your job. You're next.",
    summary:
      "You are the company's last human employee. HR-9000, the HR robot, is on your heels with a termination form. Run three lanes, dodge, grab coins. But watch out: the game is watching you, and it learns.",
    phones: [
      { image: { ...SHOTS.automatedRobot, alt: "Out of Office gameplay: the Intern runs while an automated Developer robot charges down the road" }, caption: "Run" },
      { image: { ...SHOTS.en.menu, alt: "Out of Office main menu with the Developer and a big PLAY button" }, caption: "Main menu" },
    ],
  },

  facts: [
    { value: "3", label: "Professions, each with its own ability" },
    { value: "8", label: "Power-ups, from CAPTCHA to cargo drone" },
    { value: "7", label: "Layered assemblies, one-way dependencies" },
    { value: "10K+", label: "Lines of C#, built for zero allocations per run" },
  ],

  story: {
    headline: [
      { text: "It's 2031.", tone: "accent" },
      { text: "AI has taken every job." },
      { text: "All but one.", tone: "muted" },
    ],
    paragraphs: [
      "You are the last human working in a giant corporate plaza. HR-9000 wants one thing: your signature on the exit form. Sign it and you get \"optimized\".",
      "Your goal is the legendary Analog Town, where there is no signal. On the way, server racks, robot vacuums, self-driving taxis and \"Accept cookies\" walls try to stop you.",
      "The humour pokes fun at corporate life and AI buzzwords: the shield is called Seniority Shield, the magnet is a Salary Magnet, and what stops the robot is a CAPTCHA box. Nobody is the target; office culture and tech fads are.",
    ],
    punchline: { text: "YOU'VE BEEN OPTIMIZED", caption: "What the screen says when you get caught." },
    screenshot: { image: { ...SHOTS.en.gameOver, alt: "Game over screen: YOU'VE BEEN OPTIMIZED, HR-9000 CAUGHT YOU, Developer HAS BEEN AUTOMATED" }, caption: "Game over" },
  },

  gallery: [
    { image: { ...SHOTS.en.menu, alt: "Main menu with the Developer, the profession picker and the PLAY button" }, caption: "Pick a profession, hit PLAY." },
    { image: { ...SHOTS.en.drone, alt: "The player carried through the air by the Cargo Drone power-up" }, caption: "Cargo Drone: fly over everything." },
    { image: { ...SHOTS.cookieWall, alt: "A cookie wall obstacle with HR-9000 right next to the player" }, caption: "Slide under the Cookie Wall. HR-9000 is right behind you." },
    { image: { ...SHOTS.stumble, alt: "The Designer stumbles after hitting an obstacle" }, caption: "First hit: you stumble and HR-9000 closes in." },
    { image: { ...SHOTS.en.collection, alt: "Collection screen: the Designer is automated and locked" }, caption: "Get caught and your profession gets automated." },
    { image: { ...SHOTS.en.store, alt: "Store with chair and keycard bundles priced in coins" }, caption: "The store only takes in-game coins." },
    { image: { ...SHOTS.en.revive, alt: "Continue offer: scan your keycard and keep running" }, caption: "Scan your keycard to keep running." },
    { image: { ...SHOTS.en.pause, alt: "Pause screen with Resume and Main menu buttons" }, caption: "Take a break. HR-9000 won't." },
    { image: { ...SHOTS.en.settings, alt: "Settings: language, sound, graphics quality and the developer card" }, caption: "Language, sound and graphics quality." },
  ],

  mechanics: [
    {
      tag: "An AI that learns you",
      title: "Obstacles learn your habits",
      text: "The game tracks how long you stay in each lane and steers obstacles toward your favourite ones. You are running against a rival trained on your own data.",
      bullets: [
        "It counts time spent per lane and slowly forgets old data every frame.",
        "The memory carries over between runs; change your habits and it changes too.",
        "At least one lane always stays open in every obstacle pattern. Hard, but always fair.",
      ],
      codeName: "AdaptiveDirector.cs",
      screenshot: { image: { ...SHOTS.stumble, alt: "The Designer stumbles after hitting an obstacle, with more obstacles ahead" }, caption: "The stumble" },
    },
    {
      tag: "Job automation",
      title: "Get caught, and your job becomes a robot",
      text: "Characters are professions. When you get caught, the profession you played gets \"automated\": it locks, and its robot shows up as an obstacle in your next runs.",
      bullets: [
        "The Developer's robot charges at you; the Designer's sweeps between lanes.",
        "Buy the job back with coins: it starts at 100 and grows 1.5x with every automation.",
        "The Intern never gets automated; if your pick is locked, the Intern runs instead.",
      ],
      codeName: "Workforce.cs",
      screenshot: { image: { ...SHOTS.automatedRobot, alt: "The automated Developer's blue robot charging at the Intern" }, caption: "Your old job, coming at you" },
    },
  ],

  roster: [
    {
      id: "professions",
      title: "Professions",
      items: [
        { name: "Developer", detail: "Debug: deletes every obstacle in the next 45 metres.", hint: "18 s cooldown" },
        { name: "Designer", detail: "Redraw: pass through obstacles for 3 seconds.", hint: "22 s cooldown" },
        { name: "Intern", detail: "No ability, but never gets automated. Always playable.", hint: "Last resort" },
      ],
    },
    {
      id: "obstacles",
      title: "Obstacles",
      items: [
        { name: "Server Rack", detail: "A huge cabinet that stays put.", hint: "Change lane" },
        { name: "Cookie Wall", detail: "A wall that says \"Accept cookies\".", hint: "Slide" },
        { name: "Robot Vacuum", detail: "A low obstacle roaming the floor.", hint: "Jump" },
        { name: "Cargo Drone", detail: "Glides between lanes.", hint: "Slide" },
        { name: "Self-driving Taxi", detail: "Comes straight at you.", hint: "Change lane" },
      ],
    },
    {
      id: "power-ups",
      title: "Power-ups",
      items: [
        { name: "CAPTCHA", detail: "HR-9000 gets stuck on an \"I'm not a robot\" box.", hint: "6 s" },
        { name: "Hallucination", detail: "Obstacles turn fake; run right through them.", hint: "5 s" },
        { name: "Seniority Shield", detail: "Forgives one crash.", hint: "12 s" },
        { name: "Cargo Drone", detail: "Lifts you up so you fly over obstacles.", hint: "8 s" },
        { name: "Salary Magnet", detail: "Pulls coins toward you.", hint: "10 s" },
        { name: "Overtime x2", detail: "Doubles your score.", hint: "12 s" },
        { name: "Double Espresso", detail: "Makes you jump higher.", hint: "10 s" },
        { name: "Mystery Package", detail: "Opens after the run: coins, a chair or a keycard.", hint: "Instant" },
      ],
    },
  ],

  architecture: {
    headline: [
      { text: "Built like a product,", tone: "accent" },
      { text: "not like a game jam." },
    ],
    intro:
      "Every folder is its own assembly and dependencies only flow one way. Systems never know about each other; they talk through a typed signal bus. Adding a character, an obstacle or a power-up takes no code.",
    layers: [
      { name: "Core", role: "Pure contracts: signals, the state machine, service interfaces.", dependsOn: [] },
      { name: "Data", role: "ScriptableObject definitions, effects and movement patterns.", dependsOn: ["Core"] },
      { name: "Gameplay", role: "Run, player, chaser, world and effect systems.", dependsOn: ["Core", "Data"] },
      { name: "Infrastructure", role: "Saving, object pooling, input, localization, frame rate.", dependsOn: ["Core"] },
      { name: "UI", role: "UI Toolkit presenters. Knows nothing about gameplay.", dependsOn: ["Core"] },
      { name: "Bootstrap", role: "The only place that knows concrete classes (VContainer).", dependsOn: ["All"] },
    ],
    principles: [
      { title: "Systems don't know each other", text: "49 typed signals, all readonly structs. The UI sends requests, gameplay decides and announces the result as an event." },
      { title: "One owner for game state", text: "Only GameFlow changes the state (StateMachine<GameState>). Invalid requests are quietly ignored." },
      { title: "Content is data", text: "Professions, obstacles, power-ups, accessories, worlds and store items are ScriptableObjects. New content means a new asset." },
      { title: "New behaviour, one new class", text: "Every effect derives from EffectDefinition, every movement from MovementPattern. Existing code stays untouched (open/closed)." },
      { title: "No allocations during a run", text: "Obstacles, coins, road and effects come from pools. No LINQ, new lists or captured lambdas in the frame loop." },
      { title: "A curved-world shader", text: "The road bends left and right and drops away in the distance. It is purely visual: a custom HLSL shader bends vertices while collisions stay in a flat world." },
    ],
    sample: {
      filename: "Data/Effects/MagnetEffect.cs",
      caption: "The whole Salary Magnet. This is how a new effect type is added; a power-up is just an asset that combines effects.",
      code: MAGNET_EFFECT_SOURCE,
    },
    stack: STACK,
  },

  workflow: {
    headline: [
      { text: "Built with AI agents,", tone: "accent" },
      { text: "under human review." },
    ],
    intro:
      "Out of Office is a live example of how I run AI agents like a team. Architecture, taste and the final call are mine; the repetitive work goes to the agents.",
    steps: [
      { title: "A project written for agents", text: "AGENTS.md and the docs/ folder cover the story, the design language, the architecture and the current status. Claude Code and Codex follow the same rules, and every change updates its docs." },
      { title: "The editor is driven from the command line", text: "Compile, enter Play mode, take screenshots and read the console through the Unity CLI. Nothing counts as done until it is seen working. The screenshots on this page were taken the same way." },
      { title: "3D models are generated", text: "Characters and props are generated with Meshy. Blender scripts fix scale, orientation, textures and the glow mask; Unity tools build the materials and prefabs." },
      { title: "Content is built from code", text: "An editor tool regenerates prefabs, definition assets, the localization table and the scene. Sound effects are synthesized in Python." },
    ],
  },

  roadmap: {
    done: [
      "Three-lane running, jumping, sliding and rising difficulty",
      "HR-9000 the chaser and the adaptive obstacle director",
      "3 professions, 5 obstacles, 8 power-ups, job automation",
      "Office chair, mystery packages, keycard continues, store",
      "Real 3D models and animations, the curved world",
      "Daytime scene, sound effects, English and Turkish UI",
    ],
    next: [
      "Music",
      "New worlds: autonomous city, logistics warehouse, data centre, Analog Town",
      "The final twist: an even newer model comes for HR-9000's job",
      "The Driver profession, Prompt Injection and Pull the Plug power-ups",
      "Missions, daily rewards and leaderboards",
      "iOS build and store release",
    ],
    note: "An Android test build has been installed and played on a real device (Android 16). The game is not in the stores yet.",
  },

  cta: {
    title: "Got a game in mind?",
    text: "I build mobile games with Unity, from prototype to store release. Let's talk about your idea in 15 minutes.",
  },

  teaser: {
    kicker: "Featured project",
    text: "It's 2031, AI has taken every job, and you are the last human employee running from the HR robot. A mobile endless runner I'm building with Unity 6 and a team of AI agents.",
    ctaLabel: "See the game",
    phones: [
      { image: { ...SHOTS.en.menu, alt: "Out of Office main menu" }, caption: "Main menu" },
      { image: { ...SHOTS.en.drone, alt: "The player flying with the Cargo Drone" }, caption: "Cargo Drone" },
      { image: { ...SHOTS.en.gameOver, alt: "YOU'VE BEEN OPTIMIZED game over screen" }, caption: "Game over" },
    ],
  },

  seo: {
    title: "Out of Office: a mobile endless runner built with Unity 6",
    description:
      "AI took your job. You're next. A mobile endless runner about the last human employee running from an HR robot: adaptive obstacles, job automation, a layered C# architecture and open source code.",
    keywords: [
      "Out of Office game",
      "Son Mesai",
      "Unity 6 mobile game",
      "endless runner",
      "Unity C# architecture",
      "VContainer",
      "UI Toolkit",
      "AI-assisted game development",
      "Emrah Atalay",
    ],
  },
};

export default outOfOfficeEn;
