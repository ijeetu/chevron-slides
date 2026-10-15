/** Exact ON SCREEN copy and source cues from the locked guest editor master.
 * These are proposed conversations and partnership asks, not endorsements.
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
  | "chad-bianco"
  | "steve-davis";

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
    | "public-safety"
    | "infrastructure";
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
  "chad-bianco",
  "steve-davis",
  "hedera-founders",
  "michele-chan"
];

export const guestSlides: Record<GuestSlideId, GuestSlide> = {
  "mo-gawdat": {
    "id": "mo-gawdat",
    "name": "Mo Gawdat",
    "organization": "AI, humanity & citizen sovereignty",
    "eyebrow": "Define the humanity standard",
    "layer": "Humanity & AI Governance",
    "problem": "AI power is accelerating faster than government and society.",
    "opportunity": "Build an AI-native state that remains accountable to the citizens.",
    "values": [
      "Turn ethical principles into infrastructure, law and measurable outcomes."
    ],
    "ask": "Join the build. Define the humanity standard.",
    "visual": "humanity",
    "diagramLabels": [
      "Citizen rights",
      "Lawful authority",
      "AI guardrails",
      "Measured outcomes"
    ],
    "media": [
      {
        "label": "Opening 1 · AI, institutions & humanity",
        "kind": "video",
        "url": "https://youtu.be/RwlgFC6S-OE?is=FCUkn97rWvr-M8nU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/RwlgFC6S-OE?start=0&end=51",
        "note": "0:00–0:51. Establish the AI / institutional / humanity stakes."
      },
      {
        "label": "Opening 2 · From warning to possibility",
        "kind": "video",
        "url": "https://youtu.be/RwlgFC6S-OE?is=FCUkn97rWvr-M8nU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/RwlgFC6S-OE?start=72&end=84",
        "note": "1:12–~1:24. Land on “I’m very optimistic about the future.” Approximate out point."
      },
      {
        "label": "Clip 3 · What do you and I do?",
        "kind": "video",
        "url": "https://youtu.be/RwlgFC6S-OE?is=5Fr3srMg-xvHvvcr",
        "embedUrl": "https://www.youtube-nocookie.com/embed/RwlgFC6S-OE?start=3874&end=3892",
        "note": "~1:04:34–~1:04:52. Cut directly to George: “We share that philosophy.” Approximate bounds."
      },
      {
        "label": "Clip 4 · Government should serve people",
        "kind": "video",
        "url": "https://youtu.be/X8DPmKmSRLg?is=_Qpo0PoaoCiXw45I",
        "embedUrl": "https://www.youtube-nocookie.com/embed/X8DPmKmSRLg?start=179&end=218",
        "note": "~2:59–~3:38. Mo poses the governance question; George answers with the architecture. Approximate bounds."
      },
      {
        "label": "Clip 5 · Align success with humanity",
        "kind": "video",
        "url": "https://youtu.be/X8DPmKmSRLg?is=_Qpo0PoaoCiXw45I",
        "embedUrl": "https://www.youtube-nocookie.com/embed/X8DPmKmSRLg?start=509&end=526",
        "note": "Optional if pacing allows. ~8:29–~8:46. Entrepreneurial success aligned with humanity. Approximate bounds."
      },
      {
        "label": "Clip 6 · Are you going to intervene?",
        "kind": "video",
        "url": "https://youtu.be/X8DPmKmSRLg?is=_Qpo0PoaoCiXw45I",
        "embedUrl": "https://www.youtube-nocookie.com/embed/X8DPmKmSRLg?start=745&end=758",
        "note": "Strong callback. ~12:25–~12:38. Place immediately before George’s first “We’re doing something.” Approximate bounds."
      }
    ]
  },
  "samsung": {
    "id": "samsung",
    "name": "Samsung",
    "organization": "Yoonie Joung · Samsung Electronics North America",
    "eyebrow": "AI living, beyond the home",
    "layer": "Physical AI & Distribution",
    "problem": "AI Living needs a physical ecosystem beyond the home.",
    "opportunity": "5,000+ locations. ~91,000 intelligent displays. A new civic and commercial AI network. National scale. Global expansion potential.",
    "values": [
      "Revenue.",
      "AI leadership.",
      "Brand relevance.",
      "New applications.",
      "Category ownership."
    ],
    "ask": "Give Samsung the first opportunity to lead the category. George leads the integration.",
    "visual": "physical-ai",
    "diagramLabels": [
      "5,000+ locations",
      "~91,000 displays",
      "AI + media",
      "Civic participation"
    ],
    "media": [
      {
        "label": "Samsung AI Living",
        "kind": "video",
        "url": "https://youtube.com/shorts/leLIb4mxlfE?is=s_aJI5drNuZRMkJl",
        "embedUrl": "https://www.youtube-nocookie.com/embed/leLIb4mxlfE",
        "note": "Place after the AI Living setup. Select the strongest 10–20 seconds showing AI becoming natural, helpful and embedded in daily life. Then continue to the Phase One integration video; no Phase One asset URL was supplied."
      }
    ]
  },
  "charles-adkins": {
    "id": "charles-adkins",
    "name": "Charles Adkins",
    "organization": "Institutional perspective · Enterprise & government",
    "eyebrow": "The first pressure test",
    "layer": "First Pressure Test",
    "problem": "Ambitious civic technology fails when institutions cannot trust the infrastructure beneath it.",
    "opportunity": "Pressure-test the architecture early—and determine whether Hedera is the right trust engine.",
    "values": [
      "Institutional credibility.",
      "Better governance.",
      "Fewer expensive mistakes.",
      "A path toward enterprise adoption."
    ],
    "ask": "Challenge the architecture. Evaluate the trust layer. Help shape what comes next.",
    "visual": "pressure-test",
    "diagramLabels": [
      "Identity + privacy",
      "Governance",
      "Scale + security",
      "Technical direction"
    ],
    "media": [
      {
        "label": "Enterprise adoption & governance",
        "kind": "source",
        "url": "https://hedera.com/blog/charles-adkins-appointed-as-president-of-the-hedera-council/",
        "note": "Clip 1 quote target: enterprise and government adoption enabling new technology for the masses. Clip 2 quote target: Hedera’s governance model matters alongside the protocol. Written source; full quotes and placement retained in editor notes."
      }
    ]
  },
  "palmer-luckey": {
    "id": "palmer-luckey",
    "name": "Palmer Luckey",
    "organization": "Anduril",
    "eyebrow": "Systems that work under pressure",
    "layer": "Security, Resilience & Government Modernization",
    "problem": "Critical infrastructure is vulnerable—and government technology moves too slowly.",
    "opportunity": "Strengthen California’s critical assets and bring world-class systems thinking into state government.",
    "values": [
      "State-scale resilience.",
      "Government modernization.",
      "New applications for Anduril’s technology and expertise."
    ],
    "ask": "Anduril helps strengthen California. Palmer joins the build and helps define what comes next.",
    "visual": "resilience",
    "diagramLabels": [
      "Critical assets",
      "Secure systems",
      "Continuity",
      "Accountable government"
    ],
    "media": []
  },
  "ford": {
    "id": "ford",
    "name": "Ford Motor Company",
    "organization": "Jim Farley · Ford Motor Company",
    "eyebrow": "Move the customer’s voice",
    "layer": "Connected Vehicle & Consumer Agency",
    "problem": "The modern vehicle is becoming a software platform—but the customer risks losing visibility, control, and agency.",
    "opportunity": "Integrate Viral Fusion into Ford's connected-vehicle ecosystem and give Californians a direct civic interface inside the vehicle they already own.",
    "values": [
      "Customer trust.",
      "Brand differentiation.",
      "Policy leadership.",
      "New digital services.",
      "Deeper platform relevance."
    ],
    "ask": "Will Ford open the platform—and help give customers the agency to change the rules they live under?",
    "visual": "vehicle",
    "diagramLabels": [
      "Customer choice",
      "Secure interface",
      "Policy understanding",
      "Civic participation"
    ],
    "media": [
      {
        "label": "Decoder 1 · Customer agency",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=PGiCc48olnk&t=2678s",
        "embedUrl": "https://www.youtube-nocookie.com/embed/PGiCc48olnk?start=2597&end=2633",
        "note": "43:17–43:53. Customer first: avoid disrupting the customer’s digital life or restricting it to monetize access."
      },
      {
        "label": "Decoder 2 · The AI companion",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=PGiCc48olnk&t=2678s",
        "embedUrl": "https://www.youtube-nocookie.com/embed/PGiCc48olnk?start=2658",
        "note": "Primary in ~44:18. Every customer should have an AI assistant in the car, almost like a companion. No precise out point supplied."
      },
      {
        "label": "Decoder 2 · Optional companion extension",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=PGiCc48olnk&t=2678s",
        "embedUrl": "https://www.youtube-nocookie.com/embed/PGiCc48olnk?start=3109&end=3145",
        "note": "Optional ~51:49–52:25. OEM companion-like functionality adding value to people’s lives. Approximate bounds."
      },
      {
        "label": "Decoder 3 · Control of the vehicle",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=PGiCc48olnk&t=2678s",
        "embedUrl": "https://www.youtube-nocookie.com/embed/PGiCc48olnk?start=2781&end=2951",
        "note": "Primary section 46:21 onward, out ~49:11. Aggressively shorten; do not play the entire Apple discussion. Ford retains vehicle authority; Viral Fusion is an opt-in interface."
      },
      {
        "label": "Decoder 4 · Digital experience differentiates",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=PGiCc48olnk&t=2678s",
        "embedUrl": "https://www.youtube-nocookie.com/embed/PGiCc48olnk?start=3036&end=3109",
        "note": "~50:36–51:49. Start late enough to avoid unnecessary setup; digital experience determines vehicle choice. Approximate bounds."
      },
      {
        "label": "Final Ford video · A sustainable American company",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=9wbiBWE-TXY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/9wbiBWE-TXY?start=890&end=897",
        "note": "Opening beat 14:50–14:57. Then jump to skilled trades and partnership cuts below."
      },
      {
        "label": "Final Ford video · Technicians & skilled trades",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=9wbiBWE-TXY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/9wbiBWE-TXY?start=995&end=1030",
        "note": "16:35–17:10. Dealership technician shortage, skilled trades and pathways to success."
      },
      {
        "label": "Final Ford video · America working together",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=9wbiBWE-TXY",
        "embedUrl": "https://www.youtube-nocookie.com/embed/9wbiBWE-TXY?start=1044&end=1089",
        "note": "17:24–18:09. Government, educators and business working together; land on putting money where the mouth is. Follow with George’s closing bridge."
      }
    ]
  },
  "lynsi-snyder": {
    "id": "lynsi-snyder",
    "name": "Lynsi Snyder",
    "organization": "In-N-Out Burger",
    "eyebrow": "California, families & the future of food",
    "layer": "Food, Family & California Community",
    "problem": "Food, farming, family economics, and community life are increasingly shaped by policies most citizens never help design.",
    "opportunity": "Give farmers, ranchers, families, businesses, scientists, and consumers a transparent way to help shape California’s food future.",
    "values": [
      "Consumer choice.",
      "California agriculture.",
      "Family economics.",
      "Community strength.",
      "Brand purpose.",
      "Statewide engagement."
    ],
    "ask": "Help us protect choice, strengthen California communities—and tell us how you want to be involved.",
    "visual": "community",
    "diagramLabels": [
      "Farmers + producers",
      "Families + consumers",
      "Evidence + choice",
      "Stronger communities"
    ],
    "media": [
      {
        "label": "Clip 1 · Why California matters",
        "kind": "source",
        "url": "https://podcasts.apple.com/us/podcast/ep-1219-after-77-years-in-n-out-offices-are-moving/id1359249098?i=1000717991605",
        "note": "51:29–52:12. Land on “Raising a family is not easy here. Doing business is not easy here.”"
      },
      {
        "label": "Clip 2 · Legacy, values & standards",
        "kind": "source",
        "url": "https://podcasts.apple.com/us/podcast/ep-1219-after-77-years-in-n-out-offices-are-moving/id1359249098?i=1000717991605",
        "note": "54:41–55:30. Preserve the company her grandparents built, its values, standards and cornerstones."
      },
      {
        "label": "Clip 3 · Family, trafficking & addiction",
        "kind": "source",
        "url": "https://podcasts.apple.com/us/podcast/ep-1219-after-77-years-in-n-out-offices-are-moving/id1359249098?i=1000717991605",
        "note": "13:17–~13:40. Target 15–20 seconds on Slave 2 Nothing’s addiction and human-trafficking focus."
      },
      {
        "label": "Clip 4 · Customer loyalty — optional",
        "kind": "source",
        "url": "https://www.howleaderslead.com/dailies/446/be-loyal-to-customers-and-theyll-return-that-loyalty",
        "note": "Standalone 1:18 clip on loyalty working both ways; use only if pacing allows."
      }
    ]
  },
  "chevron": {
    "id": "chevron",
    "name": "Chevron",
    "organization": "Andy Walz · Downstream, Midstream & Chemicals",
    "eyebrow": "Energy policy that can endure",
    "layer": "Energy, Reliability & Public Policy",
    "problem": "Energy infrastructure operates for decades. Policy can change in a single legislative cycle.",
    "opportunity": "Bring industry, experts, legislative drafters, consumers, and environmental stakeholders into one transparent process.",
    "values": [
      "Investment certainty.",
      "Reliability.",
      "Affordability.",
      "Better public understanding.",
      "A durable energy framework."
    ],
    "ask": "Help us build the framework. Put the choices before the public. Create the future together.",
    "visual": "energy-policy",
    "diagramLabels": [
      "Operating reality",
      "Competing evidence",
      "Durable framework",
      "Public choice"
    ],
    "media": [
      {
        "label": "Clip 1 · Energy in everyday life",
        "kind": "source",
        "url": "https://www.chevron.com/newsroom/podcast/the-energy-tailgate-podcast",
        "note": "Review 1:54–3:05: 1:54–2:22 what a refinery does; 2:23–3:05 everyday products. Out on the cleanest sentence connecting refining to ordinary life."
      },
      {
        "label": "Clip 2 · When policy changes investment",
        "kind": "source",
        "url": "https://www.kcra.com/article/california-chevron-newsom-oil-supply-proposal/62561077",
        "note": "Find Andy’s quote on California investment, reliable products and affordability. Keep sufficient capital-allocation context; do not isolate it as a threat."
      },
      {
        "label": "Clip 3 · Refinery closures & capacity loss",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=XUUB0_0cj-Y",
        "embedUrl": "https://www.youtube-nocookie.com/embed/XUUB0_0cj-Y?start=173&end=218",
        "note": "2:53–3:38 source window. Select the strongest 15–25 seconds explaining capacity loss and import dependence."
      },
      {
        "label": "Clip 4 · Debate & informed analysis",
        "kind": "source",
        "url": "https://richmond.chevron.com/newsroom/2024/q4/new-california-legislation-misleading-chevron-exec-says",
        "note": "Primarily a written source. Retain as research/source note unless corresponding clean video is available; do not force it into the host cut."
      }
    ]
  },
  "x-energy": {
    "id": "x-energy",
    "name": "X-Energy",
    "organization": "Dr. Kam Ghaffarian",
    "eyebrow": "Imagine. Believe. Execute.",
    "layer": "Advanced Energy Deployment",
    "problem": "Frontier energy technology can be ready long before policy creates a path to deploy it.",
    "opportunity": "Open California to technology-neutral advanced energy competition—and create a proving ground for the energy systems of the AI age.",
    "values": [
      "AI power.",
      "Industrial heat.",
      "Energy security.",
      "California jobs.",
      "Workforce development.",
      "Local investment.",
      "Long-term economic growth."
    ],
    "ask": "Help us build the pathway. Help us build the workforce. Then prove the technology can compete.",
    "visual": "advanced-energy",
    "diagramLabels": [
      "Responsible standards",
      "Dependable power",
      "Local workforce",
      "California investment"
    ],
    "media": [
      {
        "label": "Clip 1 · Imagine. Believe. Execute.",
        "kind": "source",
        "url": "https://www.leadershipmattersshow.com/episodes/kam-ghaffarian",
        "note": "Find the early entrepreneurial-philosophy section: IBX stands for Imagine, Believe, Execute."
      },
      {
        "label": "Clip 2 · AI cannot scale without power",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=RnqkLJEFfyc",
        "embedUrl": "https://www.youtube-nocookie.com/embed/RnqkLJEFfyc",
        "note": "Find the lack-of-power limiting factor for AI and X-energy scaling to meet that need; no precise bounds supplied."
      },
      {
        "label": "Clip 3 · Why Kam started X-energy",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/kamghaffarian_nuclearpower-activity-7308884406037893121-7Dtg",
        "note": "Founding story: electricity and quality of life; clean, safe, secure, affordable. Keep total X-energy source footage around 45–60 seconds."
      },
      {
        "label": "Clip 4 · Jobs, investment & scale — optional",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/kamghaffarian_xenergy-activity-7374460634148646913-YGeY",
        "note": "Optional / extended host cut. UK/Centrica partnership as the jobs, workforce and investment proof point; use only if pacing permits."
      }
    ]
  },
  "patrick-soon-shiong": {
    "id": "patrick-soon-shiong",
    "name": "Dr. Patrick Soon-Shiong",
    "organization": "LAT Media Group · ImmunityBio",
    "eyebrow": "Truth people can trust. Innovation people can reach.",
    "layer": "Health, Media & Public Trust",
    "problem": "Breakthrough medicine can stall before reaching patients—and civic participation fails when people cannot understand or trust the information around them.",
    "opportunity": "Connect medical innovation, trusted public information, civic participation, and mass distribution.",
    "values": [
      "Patient access.",
      "Public understanding.",
      "Media growth.",
      "California loyalty.",
      "National exposure.",
      "Health innovation."
    ],
    "ask": "Help us build the trust and health-innovation layer—and make California the proving ground.",
    "visual": "health-media",
    "diagramLabels": [
      "Trusted information",
      "Medical evidence",
      "Patient access",
      "Public participation"
    ],
    "media": [
      {
        "label": "Clip 1 · Truth + trust",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=OtbRBfnkxRU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/OtbRBfnkxRU?start=2842&end=2870",
        "note": "Must use. 47:22–47:50. Land on “Unless you have truth and trust…”"
      },
      {
        "label": "Clip 2 · Voices of the people",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=OtbRBfnkxRU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/OtbRBfnkxRU?start=2762&end=2797",
        "note": "Must use. 46:02–46:37. Voices across differences and democratizing paper ownership; let “voices of the people” land."
      },
      {
        "label": "Clip 3 · Beyond a newspaper",
        "kind": "source",
        "url": "https://podscripts.co/podcasts/the-tucker-carlson-show/dr-patrick-soon-shiong-youre-being-lied-to-about-cancer-how-its-caused-and-how-to-stop-it",
        "note": "Transcript/reference. Review ~1:39:09–1:44:42; short cut ~1:44:01–1:44:42 on voice, free speech, video, podcasts, studios and long-form conversations."
      },
      {
        "label": "Clip 4 · LAT Media Group as a platform",
        "kind": "video",
        "url": "https://tv.nyse.com/interviews/videos/la-times-media-group-chairman-ceo-dr-patrick-soon-shiong-talks-nyse-ipo",
        "note": "Strongly recommended. Full video 9:15; select 15–25 seconds on platform expansion, public participation / ownership / growth and the public-market structure."
      },
      {
        "label": "Clip 5 · The cancer breakthrough",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=OtbRBfnkxRU",
        "embedUrl": "https://www.youtube-nocookie.com/embed/OtbRBfnkxRU?start=2639&end=2657",
        "note": "Must use. 43:59–44:17. Natural killer cells and the future of fighting cancer; establish the medical-mission pivot."
      },
      {
        "label": "Clip 6 · The access bottleneck",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=rLfHxfvsg1I",
        "embedUrl": "https://www.youtube-nocookie.com/embed/rLfHxfvsg1I?start=3574&end=3665",
        "note": "Must use. ~59:34–1:01:05. ANKTIVA approval, broader indications, randomized trials and access delays. Approximate bounds."
      },
      {
        "label": "Clip 7 · The human consequence",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=tnVMjp9mCA0",
        "embedUrl": "https://www.youtube-nocookie.com/embed/tnVMjp9mCA0?start=1045&end=1270",
        "note": "Must use a 15–30-second patient moment from 17:25–21:10. Other review chapters: 11:00–17:25; 29:36–33:50; 33:50–38:01; 42:00–end."
      },
      {
        "label": "Clip 8 · Clinical-program validation — optional",
        "kind": "video",
        "url": "https://tv.nyse.com/interviews/videos/immunitybio-exec-chair-dr-patrick-soon-shiong-talks-positive-clinical-program",
        "note": "Optional / producer cut. Full video 5:44; select 15–20 seconds on clinical progress, patient response, development strategy and why the program matters."
      }
    ]
  },
  "brandon-cuevas": {
    "id": "brandon-cuevas",
    "name": "Brandon Cuevas",
    "organization": "Healthcare economics · UnitedHealthcare",
    "eyebrow": "Better health. Better economics.",
    "layer": "Healthcare Economics, Access & Accountability",
    "problem": "Healthcare spending keeps rising—while patients, employers, providers, insurers, and taxpayers all feel the strain.",
    "opportunity": "Expose the real cost drivers, align incentives, and build measurable reform.",
    "values": [
      "Lower cost.",
      "Better access.",
      "Less friction.",
      "Employer value.",
      "Sustainable coverage.",
      "Greater transparency."
    ],
    "ask": "Help us expose the economics, align the incentives, and turn what works into legislation.",
    "visual": "health-economics",
    "diagramLabels": [
      "Real cost drivers",
      "Aligned incentives",
      "Healthier people",
      "Measurable reform"
    ],
    "media": []
  },
  "chad-bianco": {
    "id": "chad-bianco",
    "name": "Sheriff Chad Bianco",
    "organization": "Public safety · Riverside County",
    "eyebrow": "Step into the arena",
    "layer": "Public Safety & Legislative Action",
    "problem": "Experienced operators can see where policy is failing—but rarely have the infrastructure to turn that experience into better legislation.",
    "opportunity": "Surround real-world experience with research, legislative counsel, competing experts, public explanation, and citizen participation.",
    "values": [
      "Public safety.",
      "Better law.",
      "Accountability.",
      "Civil-liberty protections.",
      "Evidence-based reform.",
      "Measurable outcomes."
    ],
    "ask": "Do you still want to change California? Step into the arena with us—and help turn real-world experience into better public policy.",
    "visual": "public-safety",
    "diagramLabels": [
      "Real-world experience",
      "Competing expertise",
      "Evidence + safeguards",
      "Lawful action"
    ],
    "media": [
      {
        "label": "Podcast open · Full public-safety statement",
        "kind": "video",
        "url": "https://www.youtube.com/live/S-J4sHqLf1g",
        "embedUrl": "https://www.youtube-nocookie.com/embed/S-J4sHqLf1g?start=0&end=348",
        "note": "Actual podcast opening: play the full 5:48 statement without narration, music or montage; pause before the question."
      },
      {
        "label": "Callback · Accountability into action",
        "kind": "video",
        "url": "https://www.youtube.com/live/S-J4sHqLf1g?t=223",
        "embedUrl": "https://www.youtube-nocookie.com/embed/S-J4sHqLf1g?start=223&end=260",
        "note": "03:43–04:20. Preserve 03:50 onward on accountability for policy consequences; use later as the pivot into building better policy."
      },
      {
        "label": "KQED town hall · Proof of concept",
        "kind": "video",
        "url": "https://video.kqed.org/video/sheriff-chad-bianco-5f3yri/",
        "note": "Use roughly 20–30 seconds around “I think ultimately it’s history. It’s proof of concept.” Then apply that standard to Viral Fusion; no exact timestamp supplied."
      }
    ]
  },
  "steve-davis": {
    "id": "steve-davis",
    "name": "Steve Davis",
    "organization": "The Boring Company",
    "eyebrow": "What better law can physically unlock",
    "layer": "Infrastructure, Permitting & Physical Expansion",
    "problem": "Infrastructure technology can advance faster than the permitting and policy systems required to deploy it.",
    "opportunity": "Use tunneling, repeatable infrastructure standards, and better policy to expand transportation, freight, utilities, and national capacity.",
    "values": [
      "Lower cost.",
      "Faster deployment.",
      "Greater capacity.",
      "Resilience.",
      "New infrastructure markets."
    ],
    "ask": "Help us determine what America could build underground — and whether California could become a proving ground again.",
    "visual": "infrastructure",
    "diagramLabels": [
      "Transportation + freight",
      "Utilities + capacity",
      "Repeatable standards",
      "Performance-based policy"
    ],
    "media": []
  },
  "hedera-founders": {
    "id": "hedera-founders",
    "name": "Mance Harmon + Dr. Leemon Baird",
    "organization": "Hedera · The trust-engine decision",
    "eyebrow": "Trust must be independently verifiable",
    "layer": "Trust Architecture",
    "problem": "Viral Fusion cannot ask citizens or government to trust a digital system they cannot independently verify.",
    "opportunity": "Create a verifiable trust layer beneath civic participation, AI, legislation, and public infrastructure.",
    "values": [
      "Independent verification.",
      "Provenance.",
      "Auditability.",
      "Privacy.",
      "AI accountability.",
      "Government-scale trust."
    ],
    "ask": "Determine whether Hedera should become Viral Fusion’s trust engine—and, if it should, define exactly how we build it.",
    "visual": "trust",
    "diagramLabels": [
      "Private records",
      "Defined events",
      "Integrity + provenance",
      "Independent audit"
    ],
    "media": [
      {
        "label": "Mance on institutional governance",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/hedera-network_at-the-world-economic-forums-annual-meeting-activity-7421588587021770752-bmBt",
        "note": "15–20 seconds after “It needs engineering.” Mance’s governance argument and global Council oversight; this sets up scrutiny, not proof that Hedera has passed."
      },
      {
        "label": "Leemon on AI provenance",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/hedera-network_there-are-multiple-levels-of-controlling-activity-7457798164155367425-pwbG",
        "note": "12–20 seconds after “Where did the information come from—and can we trust it?” Start on provenance; land on “Do I trust the data?”"
      },
      {
        "label": "Human authority & AI guardrails",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/hedera-network_the-smart-contract-knows-the-guardrails-activity-7467575862826139649--cvF",
        "note": "20–30 seconds after the question about what AI is allowed to do. Human approval for consequential actions and predefined boundaries; ideally end on “The smart contract knows the guardrails.” Cap total archival footage around 50–70 seconds."
      }
    ]
  },
  "michele-chan": {
    "id": "michele-chan",
    "name": "Michele B. Chan",
    "organization": "NantStudios",
    "eyebrow": "Make the architecture visible",
    "layer": "Media, Experience & Execution Engine",
    "problem": "The architecture can be brilliant—and still fail if people cannot see it, understand it, or feel its relevance.",
    "opportunity": "Turn Viral Fusion into a world-class visual, media, and live-experience platform.",
    "values": [
      "Public understanding.",
      "Go-to-market execution.",
      "Premium content.",
      "Live experiences.",
      "Global scalability."
    ],
    "ask": "Determine whether Michele and NantStudios should become Viral Fusion’s execution engine—and, if so, build the launch architecture with us.",
    "visual": "production",
    "diagramLabels": [
      "One visual language",
      "Immersive production",
      "Live + virtual launch",
      "Every channel"
    ],
    "media": [
      {
        "label": "Inside the Dynamic Volume System",
        "kind": "video",
        "url": "https://youtu.be/1h1IdIsPoeA",
        "embedUrl": "https://www.youtube-nocookie.com/embed/1h1IdIsPoeA",
        "note": "Primary technology proof. Target 15–25 seconds showing LED volume scale, wall reconfiguration, camera operation, rapid environment changes and immersive stage capability; visuals are the proof."
      },
      {
        "label": "Immersive worlds at NantStudios",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/nantstudios_for-us-its-just-another-day-in-our-bright-activity-7388655712186503168-QjmW",
        "note": "Target 10–15 seconds around Manhattan → Grand Canyon; if available land on “Anywhere, anytime, anyone.” Place after “We can make the architecture visible.”"
      },
      {
        "label": "One room, multiple worlds",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/nantstudios_wake-up-will-the-matrix-has-you-well-activity-7290824790339203072-9lMV",
        "note": "Target 10–20 seconds of BTS/environment changes: multiple Matrix worlds and a camera view proving it is the same volume. Place after the architecture-in-real-time beat."
      },
      {
        "label": "Matrix project · Finished reference",
        "kind": "video",
        "url": "https://www.youtube.com/watch?v=jWYQmPZrkOk",
        "embedUrl": "https://www.youtube-nocookie.com/embed/jWYQmPZrkOk",
        "note": "Full finished clip supplied as reference; prefer the BTS/environment changes for the host edit."
      },
      {
        "label": "Clip 4 · Battlefield 6 live launch — optional",
        "kind": "video",
        "url": "https://www.linkedin.com/posts/nantstudios_battlefield6-virtualproduction-activity-7356783421563527169-MtvW",
        "note": "8–12 seconds maximum; live audience, immersive screens, broadcast and streaming together. First clip to cut if pacing is long."
      }
    ]
  }
};
