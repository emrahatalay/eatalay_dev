import type { Project } from "../../../../domain/entities";
import { LISTING, MAGNET_EFFECT_SOURCE, PALETTE, REPOSITORY_URL, SCHEMA, SHOTS, SLUG, STACK } from "./shared";

const outOfOfficeEn: Project = {
  slug: SLUG,
  name: "Out of Office",
  ...LISTING,
  badges: ["Unity 6", "C#", "Android · iOS", "English · Türkçe"],
  link: { kind: "source", label: "Source on GitHub", short: "GitHub", url: REPOSITORY_URL },
  labels: {
    nav: "Game",
    galleryTitle: "Straight from the game",
    galleryHint: "All captured in-game on a 20:9 portrait phone screen. Scroll to browse.",
    mechanicsEyebrow: "Three mechanics that set it apart",
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
      "You are the company's last human employee. HR-9000, the HR robot, is on your heels with a termination form. Run three lanes across five worlds, dodge, grab coins. But watch out: the game is watching you, and it learns.",
    phones: [
      { image: { ...SHOTS.automatedRobot, alt: "Out of Office gameplay: the Intern runs while an automated Developer robot charges down the road" }, caption: "Run" },
      { image: { ...SHOTS.en.driverPod, alt: "The Driver rides an autonomous pod into Autonomous City at sunset, under the NEW AREA banner" }, caption: "Autonomous City" },
    ],
  },

  facts: [
    { value: "5", label: "Worlds, crossed by distance in a single run" },
    { value: "4", label: "Professions, three with their own ability" },
    { value: "10", label: "Power-ups, from CAPTCHA to Pull the Plug" },
    { value: "13K+", label: "Lines of C#, 7 assemblies, one-way dependencies" },
  ],

  story: {
    headline: [
      { text: "It's 2031.", tone: "accent" },
      { text: "AI has taken every job." },
      { text: "All but one.", tone: "muted" },
    ],
    paragraphs: [
      "You are the last human working in a giant corporate plaza. HR-9000 wants one thing: your signature on the exit form. Sign it and you get \"optimized\".",
      "Your goal is the legendary Analog Village, where there is no signal. You leave the Plaza and cross Autonomous City, the Logistics Depot and the Data Center to get there. On the way, server racks, forklift robots, self-driving buses and \"Accept cookies\" walls try to stop you.",
      "The humour pokes fun at corporate life and AI buzzwords: the shield is called Seniority Shield, the magnet is a Salary Magnet, and what stops the robot is a CAPTCHA box. Nobody is the target; office culture and tech fads are.",
    ],
    punchline: { text: "YOU'VE BEEN OPTIMIZED", caption: "What the screen says when you get caught." },
    screenshot: { image: { ...SHOTS.en.gameOver, alt: "Game over screen: YOU'VE BEEN OPTIMIZED, HR-9000 CAUGHT YOU, Developer HAS BEEN AUTOMATED" }, caption: "Game over" },
  },

  gallery: [
    { image: { ...SHOTS.en.menu, alt: "Main menu with the Developer, the profession picker and the PLAY button" }, caption: "Pick a profession, hit PLAY." },
    { image: { ...SHOTS.en.driverPod, alt: "The Driver in an autonomous pod entering Autonomous City at sunset" }, caption: "1200 m: Autonomous City. The Driver's Drive ability in action." },
    { image: { ...SHOTS.en.logistics, alt: "Logistics Depot: morning haze, hangars, a crate wall and a crane gate" }, caption: "2600 m: the Logistics Depot in the morning haze." },
    { image: { ...SHOTS.en.dataCenter, alt: "Data Center: cool light, cooling towers and disk stacks" }, caption: "4200 m: disk stacks in the Data Center." },
    { image: { ...SHOTS.en.town, alt: "Analog Village: golden hour, gas lamps, hay bales and a windmill" }, caption: "6000 m: Analog Village, where there is no signal." },
    { image: { ...SHOTS.en.drone, alt: "The player carried through the air by the Cargo Drone power-up" }, caption: "Cargo Drone: fly over everything." },
    { image: { ...SHOTS.cookieWall, alt: "A cookie wall obstacle with HR-9000 right next to the player" }, caption: "Slide under the Cookie Wall. HR-9000 is right behind you." },
    { image: { ...SHOTS.stumble, alt: "The Designer stumbles after hitting an obstacle" }, caption: "First hit: you stumble and HR-9000 closes in." },
    { image: { ...SHOTS.en.missions, alt: "Daily missions: Jump 20/20 and Run meters done with CLAIM buttons, Slide 9/15" }, caption: "Three new missions every day. Claim the reward." },
    { image: { ...SHOTS.en.collection, alt: "Collection screen: the Designer is automated and locked" }, caption: "Get caught and your profession gets automated." },
    { image: { ...SHOTS.en.store, alt: "Store with chair and keycard bundles priced in coins" }, caption: "The store only takes in-game coins." },
    { image: { ...SHOTS.en.revive, alt: "Continue offer: scan your keycard and keep running" }, caption: "Scan your keycard to keep running." },
    { image: { ...SHOTS.en.pause, alt: "Pause screen with Resume and Main menu buttons" }, caption: "Take a break. HR-9000 won't." },
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
        "The Developer's robot charges at you, the Designer's sweeps between lanes, the Driver's speeds straight at you.",
        "Buy the job back with coins: it starts at 100 and grows 1.5x with every automation.",
        "The Intern never gets automated; if your pick is locked, the Intern runs instead.",
      ],
      codeName: "Workforce.cs",
      screenshot: { image: { ...SHOTS.automatedRobot, alt: "The automated Developer's blue robot charging at the Intern" }, caption: "Your old job, coming at you" },
    },
    {
      tag: "Five worlds, one run",
      title: "The world changes as you run",
      text: "No loading screens. The further you go, the more the world changes: from the Plaza to Autonomous City, the Logistics Depot, the Data Center and Analog Village, all in the same run. Sky, fog, road and obstacles shift along the way.",
      bullets: [
        "Borders sit at 1200, 2600, 4200 and 6000 metres. A banner announces each new area.",
        "Weather and light blend over a few seconds; the road, the roadside and the obstacle pool follow the world.",
        "Every world brings three obstacles of its own: 12 new ones, from buses to tractors. A new world is just a new asset.",
      ],
      codeName: "WorldTimeline.cs",
      screenshot: { image: { ...SHOTS.en.town, alt: "Entering Analog Village under the NEW AREA banner, with gas lamps and hay bales" }, caption: "Last stop: Analog Village" },
    },
  ],

  roster: [
    {
      id: "professions",
      title: "Professions",
      items: [
        { name: "Developer", detail: "Debug: deletes every obstacle in the next 45 metres.", hint: "18 s cooldown" },
        { name: "Designer", detail: "Redraw: pass through obstacles for 3 seconds.", hint: "22 s cooldown" },
        { name: "Driver", detail: "Drive: ride an open-top autonomous pod for 6 seconds; it forgives one crash.", hint: "25 s cooldown" },
        { name: "Intern", detail: "No ability, but never gets automated. Always playable.", hint: "Last resort" },
      ],
    },
    {
      id: "worlds",
      title: "Worlds",
      items: [
        { name: "Plaza", detail: "Daylight and candy-coloured towers. Server racks, cookie walls, robot vacuums, drones and taxis.", hint: "0 m" },
        { name: "Autonomous City", detail: "Sunset and neon. Self-driving bus, checkpoint barrier, traffic cone robot.", hint: "1200 m" },
        { name: "Logistics Depot", detail: "Morning haze and hangars. Forklift robot, crate wall, crane gate.", hint: "2600 m" },
        { name: "Data Center", detail: "Cool artificial light. Backup robot, disk stack, cable gate.", hint: "4200 m" },
        { name: "Analog Village", detail: "Golden hour, no signal. Old tractor, hay bales, village gate.", hint: "6000 m" },
      ],
    },
    {
      id: "obstacles",
      title: "Plaza obstacles",
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
        { name: "Prompt Injection", detail: "Grabs every coin in the next 30 metres, whatever the lane.", hint: "8 s" },
        { name: "Pull the Plug", detail: "HR-9000 and every robot freeze and can't hurt you.", hint: "5 s" },
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
      { title: "Systems don't know each other", text: "57 typed signals, all readonly structs. The UI sends requests, gameplay decides and announces the result as an event." },
      { title: "One owner for game state", text: "Only GameFlow changes the state (StateMachine<GameState>). Invalid requests are quietly ignored." },
      { title: "Content is data", text: "Professions, obstacles, power-ups, accessories, worlds, missions and store items are ScriptableObjects. New content means a new asset." },
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
      "5 worlds crossed by distance in one run: Autonomous City, Logistics Depot, Data Center, Analog Village",
      "4 professions (new: the Driver), 17 obstacles, 10 power-ups, job automation",
      "Daily missions and a first-run tutorial that slows time and points the way",
      "Office chair, mystery packages, keycard continues, store",
      "Real 3D models and animations, the curved world",
      "Sound effects, a Settings tab, English and Turkish UI",
    ],
    next: [
      "Music",
      "The final twist: an even newer model comes for HR-9000's job",
      "Daily login rewards, achievements and leaderboards",
      "More professions",
      "iOS build and store release",
    ],
    note: "An Android test build has been installed and played on a real device (Android 16). The game is not in the stores yet.",
  },

  cta: {
    title: "Got a game in mind?",
    text: "I build mobile games with Unity, from prototype to store release. Let's talk about your idea in 15 minutes.",
  },

  teaser: {
    kicker: "Featured game",
    text: "It's 2031, AI has taken every job, and you are the last human employee running from the HR robot. A mobile endless runner I'm building with Unity 6 and a team of AI agents.",
    ctaLabel: "See the game",
    phones: [
      { image: { ...SHOTS.en.menu, alt: "Out of Office main menu" }, caption: "Main menu" },
      { image: { ...SHOTS.en.driverPod, alt: "The Driver's pod in Autonomous City" }, caption: "Autonomous City" },
      { image: { ...SHOTS.en.gameOver, alt: "YOU'VE BEEN OPTIMIZED game over screen" }, caption: "Game over" },
    ],
  },

  seo: {
    title: "Out of Office: a mobile endless runner built with Unity 6",
    description:
      "AI took your job. You're next. A mobile endless runner about the last human employee running from an HR robot: five worlds, adaptive obstacles, job automation, daily missions, a layered C# architecture and open source code.",
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
