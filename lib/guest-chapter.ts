/**
 * Presentation copy adapted from the guest chapter's four ON SCREEN areas.
 * These are proposed conversations and partnership asks, not endorsements.
 * Source media is provided for deliberate playback; narration is added later.
 */
export type GuestSlideId =
  | "mo-gawdat"
  | "samsung"
  | "charles-adkins"
  | "palmer-luckey"
  | "ford"
  | "lynsi-snyder"
  | "chevron"
  | "x-energy"
  | "patrick-soon-shiong"
  | "brandon-cuevas"
  | "hedera-founders"
  | "michele-chan"
  | "chad-bianco";

export type GuestMedia = {
  label: string;
  kind: "video" | "source";
  url: string;
  embedUrl?: string;
  note?: string;
};

export type GuestSlide = {
  id: GuestSlideId;
  name: string;
  organization: string;
  eyebrow: string;
  layer: string;
  problem: string;
  opportunity: string;
  values: string[];
  ask: string;
  visual:
    | "humanity"
    | "physical-ai"
    | "pressure-test"
    | "resilience"
    | "vehicle"
    | "community"
    | "energy-policy"
    | "advanced-energy"
    | "health-media"
    | "health-economics"
    | "trust"
    | "production"
    | "public-safety";
  diagramLabels: string[];
  media: GuestMedia[];
};

export const guestSlideIds: GuestSlideId[] = [
  "mo-gawdat",
  "samsung",
  "charles-adkins",
  "palmer-luckey",
  "ford",
  "lynsi-snyder",
  "chevron",
  "x-energy",
  "patrick-soon-shiong",
  "brandon-cuevas",
  "hedera-founders",
  "michele-chan",
  "chad-bianco",
];

export const guestSlides: Record<GuestSlideId, GuestSlide> = {
  "mo-gawdat": {
    id: "mo-gawdat",
    name: "Mo Gawdat",
    organization: "AI, humanity & citizen sovereignty",
    eyebrow: "Define the humanity standard",
    layer: "Humanity & AI governance",
    problem: "AI power is accelerating faster than government and society.",
    opportunity: "Build an AI-native state that remains accountable to the citizens.",
    values: ["Ethical infrastructure", "Clear law", "Measurable outcomes"],
    ask: "Join the build. Define the humanity standard.",
    visual: "humanity",
    diagramLabels: ["Citizen rights", "Lawful authority", "AI guardrails", "Measured outcomes"],
    media: [
      {
        label: "AI and humanity",
        kind: "video",
        url: "https://youtu.be/RwlgFC6S-OE?is=FCUkn97rWvr-M8nU",
        embedUrl: "https://www.youtube-nocookie.com/embed/RwlgFC6S-OE?start=0&end=51",
        note: "Mo's perspective on AI, institutional power, and the future.",
      },
      {
        label: "Governance that serves people",
        kind: "video",
        url: "https://youtu.be/X8DPmKmSRLg?is=_Qpo0PoaoCiXw45I",
        embedUrl: "https://www.youtube-nocookie.com/embed/X8DPmKmSRLg?start=179&end=218",
        note: "The relationship between government, enterprise, and humanity.",
      },
    ],
  },
  samsung: {
    id: "samsung",
    name: "Samsung",
    organization: "Yoonie Joung · Samsung Electronics North America",
    eyebrow: "AI living, beyond the home",
    layer: "Physical AI & distribution",
    problem: "AI Living needs a physical ecosystem beyond the home.",
    opportunity: "Connect 5,000+ locations and ~91,000 displays into a civic and commercial AI network, with national and global potential.",
    values: ["Revenue + new applications", "AI leadership", "Brand relevance", "Category ownership"],
    ask: "Give Samsung the first opportunity to lead the category. George leads the integration.",
    visual: "physical-ai",
    diagramLabels: ["5,000+ locations", "~91,000 displays", "AI + media", "Civic participation"],
    media: [
      {
        label: "Samsung AI Living",
        kind: "video",
        url: "https://youtube.com/shorts/leLIb4mxlfE?is=s_aJI5drNuZRMkJl",
        embedUrl: "https://www.youtube-nocookie.com/embed/leLIb4mxlfE",
        note: "Intelligence integrated into everyday life.",
      },
    ],
  },
  "charles-adkins": {
    id: "charles-adkins",
    name: "Charles Adkins",
    organization: "Institutional perspective · Enterprise & government",
    eyebrow: "The first pressure test",
    layer: "Architecture & institutional trust",
    problem: "Ambitious civic technology fails when institutions cannot trust the infrastructure beneath it.",
    opportunity: "Pressure-test the architecture early and determine whether Hedera is the right trust engine.",
    values: ["Institutional credibility", "Better governance", "Fewer costly mistakes", "Enterprise adoption"],
    ask: "Challenge the architecture. Evaluate the trust layer. Help shape what comes next.",
    visual: "pressure-test",
    diagramLabels: ["Identity + privacy", "Governance", "Scale + security", "Technical direction"],
    media: [
      {
        label: "Enterprise adoption & governance",
        kind: "source",
        url: "https://hedera.com/blog/charles-adkins-appointed-as-president-of-the-hedera-council/",
        note: "A written perspective on institutional adoption and Hedera's governance model.",
      },
    ],
  },
  "palmer-luckey": {
    id: "palmer-luckey",
    name: "Palmer Luckey",
    organization: "Anduril",
    eyebrow: "Systems that work under pressure",
    layer: "Security, resilience & modernization",
    problem: "Critical infrastructure is vulnerable, and government technology moves too slowly.",
    opportunity: "Strengthen California's critical assets and bring world-class systems thinking into state government.",
    values: ["State-scale resilience", "Government modernization", "New Anduril applications"],
    ask: "Help strengthen California through Anduril. Join the build and help define what comes next.",
    visual: "resilience",
    diagramLabels: ["Critical assets", "Secure systems", "Continuity", "Accountable government"],
    media: [],
  },
  ford: {
    id: "ford",
    name: "Ford",
    organization: "Jim Farley · Ford Motor Company",
    eyebrow: "Move the customer’s voice",
    layer: "Connected vehicles & consumer agency",
    problem: "Vehicles are becoming software platforms, while customers risk losing visibility, control, and agency.",
    opportunity: "Integrate Viral Fusion into Ford's connected vehicles and give Californians a civic interface inside the vehicle they already own.",
    values: ["Customer trust", "Brand differentiation", "Policy leadership", "New digital services"],
    ask: "Open the platform and help customers gain the agency to change the rules they live under.",
    visual: "vehicle",
    diagramLabels: ["Customer choice", "Secure interface", "Policy understanding", "Civic participation"],
    media: [
      {
        label: "Jim Farley on customer agency",
        kind: "video",
        url: "https://www.youtube.com/watch?v=PGiCc48olnk&t=2678s",
        embedUrl: "https://www.youtube-nocookie.com/embed/PGiCc48olnk?start=2597&end=2633",
        note: "The Decoder conversation on customer agency, AI companions, and the connected-vehicle experience.",
      },
    ],
  },
  "lynsi-snyder": {
    id: "lynsi-snyder",
    name: "Lynsi Snyder",
    organization: "In-N-Out Burger",
    eyebrow: "California, families & the future of food",
    layer: "Food, family & community",
    problem: "Food, farming, family economics, and community life are shaped by policies most citizens never help design.",
    opportunity: "Give farmers, ranchers, families, businesses, scientists, and consumers a transparent way to shape California's food future.",
    values: ["Consumer choice", "California agriculture", "Family economics", "Community strength"],
    ask: "Help protect choice, strengthen California communities, and tell us how you want to be involved.",
    visual: "community",
    diagramLabels: ["Farmers + producers", "Families + consumers", "Evidence + choice", "Stronger communities"],
    media: [
      {
        label: "Lynsi on California, family & values",
        kind: "source",
        url: "https://podcasts.apple.com/us/podcast/ep-1219-after-77-years-in-n-out-offices-are-moving/id1359249098?i=1000717991605",
        note: "A podcast conversation on doing business, raising families, and preserving In-N-Out's values.",
      },
      {
        label: "Loyalty to customers",
        kind: "source",
        url: "https://www.howleaderslead.com/dailies/446/be-loyal-to-customers-and-theyll-return-that-loyalty",
        note: "A leadership perspective on the relationship between a company and its customers.",
      },
    ],
  },
  chevron: {
    id: "chevron",
    name: "Chevron",
    organization: "Andy Walz · Downstream, Midstream & Chemicals",
    eyebrow: "Energy policy that can endure",
    layer: "Energy, reliability & public policy",
    problem: "Energy infrastructure operates for decades. Policy can change in a single legislative cycle.",
    opportunity: "Bring industry, experts, legislative drafters, consumers, and environmental stakeholders into one transparent process.",
    values: ["Investment certainty", "Reliability + affordability", "Public understanding", "Durable energy framework"],
    ask: "Help build the framework. Put the choices before the public. Create the future together.",
    visual: "energy-policy",
    diagramLabels: ["Operating reality", "Competing evidence", "Durable framework", "Public choice"],
    media: [
      {
        label: "Energy in everyday life",
        kind: "source",
        url: "https://www.chevron.com/newsroom/podcast/the-energy-tailgate-podcast",
        note: "The Energy Tailgate podcast connects refining to the products and systems people rely on.",
      },
      {
        label: "Andy Walz on California's energy supply",
        kind: "video",
        url: "https://www.youtube.com/watch?v=XUUB0_0cj-Y",
        embedUrl: "https://www.youtube-nocookie.com/embed/XUUB0_0cj-Y?start=173&end=218",
        note: "The FOX Business interview on investment, refinery capacity, and reliability.",
      },
      {
        label: "The case for informed analysis",
        kind: "source",
        url: "https://richmond.chevron.com/newsroom/2024/q4/new-california-legislation-misleading-chevron-exec-says",
        note: "A written industry perspective to be examined alongside competing evidence.",
      },
    ],
  },
  "x-energy": {
    id: "x-energy",
    name: "X-energy",
    organization: "Dr. Kam Ghaffarian",
    eyebrow: "Imagine. Believe. Execute.",
    layer: "Advanced energy deployment",
    problem: "Frontier energy technology can be ready long before policy creates a path to deploy it.",
    opportunity: "Open California to technology-neutral advanced energy competition and create a proving ground for the energy systems of the AI age.",
    values: ["AI power + industrial heat", "Energy security", "Jobs + workforce development", "Local investment + growth"],
    ask: "Help build the pathway and workforce. Then prove the technology can compete.",
    visual: "advanced-energy",
    diagramLabels: ["Responsible standards", "Dependable power", "Local workforce", "California investment"],
    media: [
      {
        label: "Nuclear power, AI & the future",
        kind: "video",
        url: "https://www.youtube.com/watch?v=RnqkLJEFfyc",
        embedUrl: "https://www.youtube-nocookie.com/embed/RnqkLJEFfyc",
        note: "Kam's CNBC conversation on the relationship between energy and frontier technology.",
      },
      {
        label: "Kam's builder philosophy",
        kind: "source",
        url: "https://www.leadershipmattersshow.com/episodes/kam-ghaffarian",
        note: "The Leadership Matters conversation on imagining, believing, and executing.",
      },
      {
        label: "Why X-energy was founded",
        kind: "source",
        url: "https://www.linkedin.com/posts/kamghaffarian_nuclearpower-activity-7308884406037893121-7Dtg",
        note: "Kam's founding story connects access to electricity with quality of life.",
      },
    ],
  },
  "patrick-soon-shiong": {
    id: "patrick-soon-shiong",
    name: "Dr. Patrick Soon-Shiong",
    organization: "LAT Media Group · ImmunityBio",
    eyebrow: "Truth people can trust. Innovation people can reach.",
    layer: "Health, media & public trust",
    problem: "Breakthrough medicine can stall before reaching patients. Civic participation fails without information people can understand and trust.",
    opportunity: "Connect medical innovation, trusted public information, civic participation, and mass distribution.",
    values: ["Patient access", "Public understanding", "Media growth + exposure", "California health innovation"],
    ask: "Help build the trust and health-innovation layer, and make California the proving ground.",
    visual: "health-media",
    diagramLabels: ["Trusted information", "Medical evidence", "Patient access", "Public participation"],
    media: [
      {
        label: "Truth, trust & medicine",
        kind: "video",
        url: "https://www.youtube.com/watch?v=OtbRBfnkxRU",
        embedUrl: "https://www.youtube-nocookie.com/embed/OtbRBfnkxRU",
        note: "The Daily Show conversation connecting public trust, media, and healthcare.",
      },
      {
        label: "The patient-access question",
        kind: "video",
        url: "https://www.youtube.com/watch?v=rLfHxfvsg1I",
        embedUrl: "https://www.youtube-nocookie.com/embed/rLfHxfvsg1I",
        note: "The Megyn Kelly conversation on research, regulation, and access to treatment.",
      },
      {
        label: "The human experience of cancer",
        kind: "video",
        url: "https://www.youtube.com/watch?v=tnVMjp9mCA0",
        embedUrl: "https://www.youtube-nocookie.com/embed/tnVMjp9mCA0",
        note: "NewsNation's Killing Cancer: The Power Within.",
      },
    ],
  },
  "brandon-cuevas": {
    id: "brandon-cuevas",
    name: "Brandon Cuevas",
    organization: "Healthcare economics · UnitedHealthcare",
    eyebrow: "Better health. Better economics.",
    layer: "Healthcare access & accountability",
    problem: "Healthcare spending keeps rising while patients, employers, providers, insurers, and taxpayers all feel the strain.",
    opportunity: "Expose the real cost drivers, align incentives, and build measurable reform.",
    values: ["Lower cost + less friction", "Better access", "Employer value", "Sustainable, transparent coverage"],
    ask: "Help expose the economics, align the incentives, and turn what works into legislation.",
    visual: "health-economics",
    diagramLabels: ["Real cost drivers", "Aligned incentives", "Healthier people", "Measurable reform"],
    media: [],
  },
  "hedera-founders": {
    id: "hedera-founders",
    name: "Mance Harmon + Dr. Leemon Baird",
    organization: "Hedera · The trust-engine decision",
    eyebrow: "Trust must be independently verifiable",
    layer: "Trust architecture",
    problem: "Viral Fusion cannot ask citizens or government to trust a digital system they cannot independently verify.",
    opportunity: "Create a verifiable trust layer beneath civic participation, AI, legislation, and public infrastructure.",
    values: ["Independent verification", "Provenance + auditability", "Privacy", "AI accountability"],
    ask: "Determine whether Hedera should become Viral Fusion's trust engine. If so, define exactly how we build it.",
    visual: "trust",
    diagramLabels: ["Private records", "Defined events", "Integrity + provenance", "Independent audit"],
    media: [
      {
        label: "Mance on institutional governance",
        kind: "video",
        url: "https://www.linkedin.com/posts/hedera-network_at-the-world-economic-forums-annual-meeting-activity-7421588587021770752-bmBt",
        note: "The governance argument to pressure-test for public infrastructure.",
      },
      {
        label: "Leemon on AI provenance",
        kind: "video",
        url: "https://www.linkedin.com/posts/hedera-network_there-are-multiple-levels-of-controlling-activity-7457798164155367425-pwbG",
        note: "The question beneath AI accountability: where did the information come from?",
      },
      {
        label: "Human authority & AI guardrails",
        kind: "video",
        url: "https://www.linkedin.com/posts/hedera-network_the-smart-contract-knows-the-guardrails-activity-7467575862826139649--cvF",
        note: "Human approval and predefined boundaries for consequential AI actions.",
      },
    ],
  },
  "michele-chan": {
    id: "michele-chan",
    name: "Michele B. Chan",
    organization: "NantStudios",
    eyebrow: "Make the architecture visible",
    layer: "Media, experience & execution",
    problem: "A brilliant architecture can still fail if people cannot see it, understand it, or feel its relevance.",
    opportunity: "Turn Viral Fusion into a world-class visual, media, and live-experience platform.",
    values: ["Public understanding", "Launch execution", "Premium content + live experiences", "Global scalability"],
    ask: "Determine whether Michele and NantStudios should become Viral Fusion's execution engine. If so, build the launch architecture with us.",
    visual: "production",
    diagramLabels: ["One visual language", "Immersive production", "Live + virtual launch", "Every channel"],
    media: [
      {
        label: "Inside the Dynamic Volume System",
        kind: "video",
        url: "https://youtu.be/1h1IdIsPoeA",
        embedUrl: "https://www.youtube-nocookie.com/embed/1h1IdIsPoeA",
        note: "A tour of NantStudios' reconfigurable virtual-production environment.",
      },
      {
        label: "Immersive worlds at NantStudios",
        kind: "video",
        url: "https://www.linkedin.com/posts/nantstudios_for-us-its-just-another-day-in-our-bright-activity-7388655712186503168-QjmW",
        note: "A Current Affair explores the Melbourne production volume.",
      },
      {
        label: "One room, multiple worlds",
        kind: "video",
        url: "https://www.linkedin.com/posts/nantstudios_wake-up-will-the-matrix-has-you-well-activity-7290824790339203072-9lMV",
        note: "Behind the scenes of NantStudios' Matrix virtual-production project.",
      },
    ],
  },
  "chad-bianco": {
    id: "chad-bianco",
    name: "Chad Bianco",
    organization: "Public safety · Riverside County",
    eyebrow: "Step into the arena",
    layer: "Public safety & legislative action",
    problem: "Experienced operators see where policy fails, but rarely have the infrastructure to turn that experience into better legislation.",
    opportunity: "Surround real-world experience with research, legislative counsel, competing experts, public explanation, and citizen participation.",
    values: ["Public safety", "Better law + accountability", "Civil-liberty protections", "Evidence + measurable outcomes"],
    ask: "Step into the arena with us and help turn real-world experience into better public policy.",
    visual: "public-safety",
    diagramLabels: ["Real-world experience", "Competing expertise", "Evidence + safeguards", "Lawful action"],
    media: [
      {
        label: "The public-safety call to action",
        kind: "video",
        url: "https://www.youtube.com/live/S-J4sHqLf1g?t=223",
        embedUrl: "https://www.youtube-nocookie.com/embed/S-J4sHqLf1g?start=223&end=260",
        note: "The short callback selected in the presentation script.",
      },
      {
        label: "Public-safety statement · 5:48",
        kind: "video",
        url: "https://www.youtube.com/live/S-J4sHqLf1g",
        embedUrl: "https://www.youtube-nocookie.com/embed/S-J4sHqLf1g",
        note: "The full statement is intended to open the eventual podcast conversation.",
      },
      {
        label: "KQED town hall · Proof of concept",
        kind: "video",
        url: "https://video.kqed.org/video/sheriff-chad-bianco-5f3yri/",
        note: "Chad's standard of demonstrated results becomes a test for Viral Fusion itself.",
      },
    ],
  },
};
