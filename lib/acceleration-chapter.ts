/**
 * Source copy and editorial builds for the chapter after the podcast guests.
 * All speech is transcribed from the supplied Word documents. Cue timings are
 * presentation estimates, not an audio track; performance notes stay separate
 * from spoken text. Editorial directions are metadata for the slide renderer.
 */
export type AccelerationSlideId =
  | "blueprint-in-motion"
  | "missing-variable"
  | "acceleration-layer"
  | "why-musk"
  | "why-viral-fusion";

export type AccelerationSpeakerCue = {
  speaker: "NARRATOR" | "GEORGE";
  text: string;
  performance?: string;
  startMs: number;
  endMs: number;
};

export type AccelerationNode = {
  id: string;
  label: string;
  subtitle: string;
};

export type AccelerationStage = {
  id: string;
  startMs: number;
  endMs: number;
  label: string;
  description: string;
  activeNodeIds?: string[];
  focusNodeIds?: string[];
};

export type AccelerationSlide = {
  id: AccelerationSlideId;
  title: string;
  subtitle: string;
  footer: string;
  visual: "civic-flywheel" | "velocity" | "chapter-title" | "technology-flywheel";
  centerLabel: string;
  nodes: AccelerationNode[];
  outerLabels: string[];
  domainLabels?: string[];
  boundaryLabels?: string[];
  comparisonLabels?: string[];
  finalHold?: string;
  speakerCues: AccelerationSpeakerCue[];
  stages: AccelerationStage[];
  durationMs: number;
  targetDurationMs: { min: number; max: number };
  timingSource: "estimated" | "editorial";
  timingNote: string;
  sourceDocument: string;
  wordCount: number;
};

export const accelerationSlideIds: AccelerationSlideId[] = [
  "blueprint-in-motion",
  "missing-variable",
  "acceleration-layer",
  "why-musk",
  "why-viral-fusion",
];

export function isAccelerationSlideId(id: string): id is AccelerationSlideId {
  return accelerationSlideIds.includes(id as AccelerationSlideId);
}

export const accelerationSlides: Record<AccelerationSlideId, AccelerationSlide> = {
  "blueprint-in-motion": {
    "id": "blueprint-in-motion",
    "title": "THE BLUEPRINT, NOW IN MOTION",
    "subtitle": "THE FLYWHEEL IS FORMING",
    "footer": "ONE ARCHITECTURE. MULTIPLE ENGINES OF VALUE.",
    "visual": "civic-flywheel",
    "centerLabel": "VIRAL FUSION",
    "nodes": [
      {
        "id": "understanding",
        "label": "PUBLIC UNDERSTANDING",
        "subtitle": "Media • AI • Research"
      },
      {
        "id": "participation",
        "label": "CITIZEN PARTICIPATION",
        "subtitle": "Voice • Verification • Organization"
      },
      {
        "id": "action",
        "label": "LAWFUL ACTION",
        "subtitle": "Legislation • Initiatives • Reform"
      },
      {
        "id": "outcomes",
        "label": "MEASURABLE OUTCOMES",
        "subtitle": "Performance • Accountability • Evidence"
      },
      {
        "id": "ecosystem",
        "label": "ECOSYSTEM VALUE",
        "subtitle": "Industry • Technology • Capital • Expertise"
      },
      {
        "id": "capability",
        "label": "MORE CAPABILITY",
        "subtitle": "New Products • New Verticals • New Solutions"
      }
    ],
    "outerLabels": [
      "ACTIONS",
      "VERTICALS",
      "ECOSYSTEM",
      "VELOCITY"
    ],
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "text": "\nEarlier, we showed you the Blueprint.\nActions.\nVerticals.\nEcosystem.\nVelocity.\nBut after everything we have examined since then—\nsomething else becomes visible.\nThese are not separate pieces.\nThey can become a flywheel.",
        "performance": "Deep, controlled; revelation rather than recap",
        "startMs": 0,
        "endMs": 13714
      },
      {
        "speaker": "GEORGE",
        "text": "\nPublic understanding creates participation.\nParticipation creates verified demand.\nVerified demand creates lawful action.\nAction creates measurable outcomes.\nOutcomes create credibility.\nCredibility creates trust.\nTrust brings more people into the system.\nAnd greater participation attracts:\nindustry—\ntechnology—\ncapital—\nexperts—\nand new opportunities.\nThose participants create more solutions.\nMore products.\nMore legislation.\nMore information.\nMore value.\nAnd the cycle begins again—\nstronger than before.",
        "performance": "Measured, increasingly consequential",
        "startMs": 13714,
        "endMs": 40285
      },
      {
        "speaker": "NARRATOR",
        "text": "\nThat matters because the most durable systems are rarely built around one product.\nThey are built around reinforcing capabilities.\nEvery layer makes the next layer more valuable.\nAnd every new participant can strengthen the whole.",
        "startMs": 42085,
        "endMs": 57085
      },
      {
        "speaker": "GEORGE",
        "text": "\nThat is the potential moat.\nNot one app.\nNot one piece of technology.\nNot one media company.\nNot one political campaign.\nThe integration.\nCitizen participation.\nMedia.\nAI.\nPhysical infrastructure.\nLegislation.\nTrust.\nIndustry.\nCommercial systems.\nAnd a growing ecosystem capable of connecting all of them.\nA competitor can copy a feature.\nIt is much harder to copy a flywheel.",
        "startMs": 57085,
        "endMs": 81942
      },
      {
        "speaker": "NARRATOR",
        "text": "\nAnd that is what the preceding conversations were designed to do.\nNot simply collect interviews.\nAdd capabilities.\nOne conversation strengthens AI and humanity.\nAnother adds physical infrastructure.\nAnother adds resilience.\nAnother adds transportation.\nEnergy.\nHealthcare.\nPublic safety.\nTrust.\nMedia.\nEvery participant brings something the architecture did not have before.\nEvery relationship can create another relationship.\nEvery solution can create another vertical.\nEvery successful outcome can create another reason for citizens and industry to participate.\nThat is how an ecosystem compounds.",
        "startMs": 81942,
        "endMs": 116228
      }
    ],
    "stages": [
      {
        "id": "assembly",
        "startMs": 0,
        "label": "The Blueprint",
        "description": "Start dark with the title and a faint flywheel at 10–15% opacity. Reveal the four outer Blueprint terms with the opening narration.",
        "activeNodeIds": [],
        "endMs": 7714
      },
      {
        "id": "core",
        "startMs": 7714,
        "label": "The system becomes visible",
        "description": "Illuminate the VIRAL FUSION center core.",
        "activeNodeIds": [],
        "endMs": 11571
      },
      {
        "id": "understanding",
        "startMs": 11571,
        "label": "Public understanding",
        "description": "Activate PUBLIC UNDERSTANDING and begin the clockwise build.",
        "activeNodeIds": [
          "understanding"
        ],
        "endMs": 13714
      },
      {
        "id": "participation",
        "startMs": 13714,
        "label": "Participation",
        "description": "Illuminate the next node and travel the connecting arrow toward it.",
        "activeNodeIds": [
          "understanding",
          "participation"
        ],
        "endMs": 17143
      },
      {
        "id": "lawful-action",
        "startMs": 17143,
        "label": "Lawful action",
        "description": "Advance the causal connection into lawful action.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action"
        ],
        "endMs": 19285
      },
      {
        "id": "outcomes",
        "startMs": 19285,
        "label": "Measurable outcomes",
        "description": "Continue the clockwise system build.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes"
        ],
        "endMs": 26571
      },
      {
        "id": "ecosystem-value",
        "startMs": 26571,
        "label": "Ecosystem value",
        "description": "Show participation attracting industry, technology, capital, expertise, and opportunity.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem"
        ],
        "endMs": 31285
      },
      {
        "id": "more-capability",
        "startMs": 31285,
        "label": "More capability",
        "description": "Complete the six capabilities before returning to public understanding.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 38999
      },
      {
        "id": "complete-loop",
        "startMs": 38999,
        "label": "The flywheel is forming",
        "description": "Complete and illuminate the loop together for the first time; editorial hold of 1.5–2 seconds.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 42085
      },
      {
        "id": "reinforcing-capabilities",
        "startMs": 42085,
        "label": "Reinforcing capabilities",
        "description": "Dim the six outer nodes slightly while keeping VIRAL FUSION bright.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 57085
      },
      {
        "id": "moat",
        "startMs": 57085,
        "label": "The integration",
        "description": "Strengthen the connecting ring or pull nodes inward by 3–5%; pulse existing capabilities as they are named.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 75942
      },
      {
        "id": "feature",
        "startMs": 75942,
        "label": "One feature",
        "description": "Briefly isolate a single node.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 78513,
        "focusNodeIds": [
          "understanding"
        ]
      },
      {
        "id": "connected-system",
        "startMs": 78513,
        "label": "A connected system",
        "description": "Return the entire connected system to full illumination.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 81942
      },
      {
        "id": "capability-feeds",
        "startMs": 81942,
        "label": "Every conversation adds capability",
        "description": "Feed restrained light pulses into the system from outside its perimeter. Keep guest names off this slide.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 113657
      },
      {
        "id": "velocity-handoff",
        "startMs": 113657,
        "label": "The hand-off to velocity",
        "description": "Hold the completed flywheel. Dim ACTIONS, VERTICALS, and ECOSYSTEM; leave VELOCITY brighter.",
        "activeNodeIds": [
          "understanding",
          "participation",
          "action",
          "outcomes",
          "ecosystem",
          "capability"
        ],
        "endMs": 119000
      }
    ],
    "durationMs": 119000,
    "targetDurationMs": {
      "min": 119000,
      "max": 119000
    },
    "timingSource": "estimated",
    "timingNote": "Speech cue times are estimated at 140 words per minute. Visual milestones follow source phrase triggers; allow a 1.5–2 second full-loop hold.",
    "sourceDocument": "VF_Blueprint_to_Why_Musk_Editor_Template.docx",
    "wordCount": 267
  },
  "missing-variable": {
    "id": "missing-variable",
    "title": "THE MISSING VARIABLE",
    "subtitle": "VELOCITY",
    "footer": "THE FORCE MULTIPLIER",
    "visual": "velocity",
    "centerLabel": "VELOCITY",
    "nodes": [
      {
        "id": "actions",
        "label": "ACTIONS",
        "subtitle": "✓"
      },
      {
        "id": "verticals",
        "label": "VERTICALS",
        "subtitle": "✓"
      },
      {
        "id": "ecosystem",
        "label": "ECOSYSTEM",
        "subtitle": "✓"
      },
      {
        "id": "velocity",
        "label": "VELOCITY",
        "subtitle": "?"
      }
    ],
    "outerLabels": [],
    "domainLabels": [
      "ARTIFICIAL INTELLIGENCE",
      "GLOBAL COMMUNICATIONS",
      "ENERGY",
      "TRANSPORTATION",
      "MANUFACTURING",
      "PHYSICAL INFRASTRUCTURE",
      "HUMAN-MACHINE INTERFACES",
      "THE FRONTIER BEYOND EARTH"
    ],
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "text": "\nThe Blueprint began with four components.\nActions.\nVerticals.\nEcosystem.\nVelocity.\nWe now know how the first three can begin coming together.",
        "performance": "Minimal, deliberate",
        "startMs": 0,
        "endMs": 9000
      },
      {
        "speaker": "GEORGE",
        "text": "\nActions—\ngive citizens a way to move from voice to consequence.\nVerticals—\ncreate new places for the architecture to produce value.\nThe ecosystem—\nbrings together the people, technology, capital, institutions, and expertise capable of moving each piece.\nBut the fourth component changes the scale of everything that came before it.",
        "performance": "Controlled",
        "startMs": 9000,
        "endMs": 30429
      },
      {
        "speaker": "NARRATOR",
        "text": "\nVelocity.",
        "performance": "Pause",
        "startMs": 30429,
        "endMs": 30858
      },
      {
        "speaker": "GEORGE",
        "text": "\nBecause velocity compounds.\nThe faster a system learns—\nthe faster it improves.\nThe faster it improves—\nthe more value it creates.\nThe more value it creates—\nthe more people and partners it attracts.\nAnd the stronger the flywheel becomes.\nSo after everything we have assembled—\none question remains.\nHow fast can this move?",
        "startMs": 30858,
        "endMs": 53572
      },
      {
        "speaker": "NARRATOR",
        "text": "\nAnd that leads us to an entirely different kind of ecosystem.\nOne already operating across:\nartificial intelligence—\nglobal communications—\nenergy—\ntransportation—\nmanufacturing—\nphysical infrastructure—\nhuman-machine interfaces—\nand the frontier beyond Earth itself.",
        "performance": "Widening",
        "startMs": 53572,
        "endMs": 67715
      },
      {
        "speaker": "GEORGE",
        "text": "\nIf Viral Fusion is building a civic and economic flywheel—\nwhat happens when it connects to one of the most powerful technology flywheels ever assembled?",
        "performance": "Quiet, deliberate",
        "startMs": 67715,
        "endMs": 78429
      }
    ],
    "stages": [
      {
        "id": "components",
        "startMs": 0,
        "label": "Four components",
        "description": "Show all four Blueprint components, subdued; confirm the first three as they are named. Leave VELOCITY unconfirmed.",
        "activeNodeIds": [],
        "endMs": 2571
      },
      {
        "id": "actions-confirmed",
        "startMs": 2571,
        "label": "Actions",
        "description": "Confirm ACTIONS with a subtle pulse/check.",
        "activeNodeIds": [
          "actions"
        ],
        "endMs": 3000
      },
      {
        "id": "verticals-confirmed",
        "startMs": 3000,
        "label": "Verticals",
        "description": "Confirm VERTICALS.",
        "activeNodeIds": [
          "actions",
          "verticals"
        ],
        "endMs": 3429
      },
      {
        "id": "ecosystem-confirmed",
        "startMs": 3429,
        "label": "Ecosystem",
        "description": "Confirm ECOSYSTEM. Keep the question mark on VELOCITY.",
        "activeNodeIds": [
          "actions",
          "verticals",
          "ecosystem"
        ],
        "endMs": 24857
      },
      {
        "id": "fourth-component",
        "startMs": 24857,
        "label": "The missing variable",
        "description": "Dim the first three components and enlarge VELOCITY slightly.",
        "activeNodeIds": [
          "actions",
          "verticals",
          "ecosystem",
          "velocity"
        ],
        "endMs": 30429,
        "focusNodeIds": [
          "velocity"
        ]
      },
      {
        "id": "force-multiplier",
        "startMs": 30429,
        "label": "The force multiplier",
        "description": "Move VELOCITY to the center and reveal THE FORCE MULTIPLIER.",
        "activeNodeIds": [
          "actions",
          "verticals",
          "ecosystem",
          "velocity"
        ],
        "endMs": 30858,
        "focusNodeIds": [
          "velocity"
        ]
      },
      {
        "id": "velocity-compounds",
        "startMs": 30858,
        "label": "Velocity compounds",
        "description": "Use a restrained pulse or expanding ring behind VELOCITY.",
        "activeNodeIds": [
          "actions",
          "verticals",
          "ecosystem",
          "velocity"
        ],
        "endMs": 53572,
        "focusNodeIds": [
          "velocity"
        ]
      },
      {
        "id": "technology-domains",
        "startMs": 53572,
        "label": "A different ecosystem",
        "description": "Reveal abstract technology keywords; no company logos yet.",
        "activeNodeIds": [
          "actions",
          "verticals",
          "ecosystem",
          "velocity"
        ],
        "endMs": 67715,
        "focusNodeIds": [
          "velocity"
        ]
      },
      {
        "id": "final-question",
        "startMs": 67715,
        "label": "How fast can this move?",
        "description": "Cut motion for the final question. Hold a clean beat before black.",
        "activeNodeIds": [
          "actions",
          "verticals",
          "ecosystem",
          "velocity"
        ],
        "endMs": 81000,
        "focusNodeIds": [
          "velocity"
        ]
      }
    ],
    "durationMs": 81000,
    "targetDurationMs": {
      "min": 81000,
      "max": 81000
    },
    "timingSource": "estimated",
    "timingNote": "Speech cue times are estimated at 140 words per minute; the final clean beat precedes the silent chapter reveal.",
    "sourceDocument": "VF_Blueprint_to_Why_Musk_Editor_Template.docx",
    "wordCount": 183
  },
  "acceleration-layer": {
    "id": "acceleration-layer",
    "title": "THE ACCELERATION LAYER",
    "subtitle": "WHY MUSK?",
    "footer": "",
    "visual": "chapter-title",
    "centerLabel": "",
    "nodes": [],
    "outerLabels": [],
    "speakerCues": [],
    "stages": [
      {
        "id": "black",
        "startMs": 0,
        "label": "Silence",
        "description": "Cut to black after Slide B and hold for approximately 1–2 seconds.",
        "endMs": 1500,
        "activeNodeIds": []
      },
      {
        "id": "chapter-title",
        "startMs": 1500,
        "label": "The acceleration layer",
        "description": "Reveal THE ACCELERATION LAYER first.",
        "endMs": 3000,
        "activeNodeIds": []
      },
      {
        "id": "why-musk-title",
        "startMs": 3000,
        "label": "Why Musk?",
        "description": "Reveal WHY MUSK? underneath after a short beat. Hold for the new chapter to register.",
        "endMs": 6500,
        "activeNodeIds": []
      }
    ],
    "durationMs": 6500,
    "targetDurationMs": {
      "min": 5000,
      "max": 7500
    },
    "timingSource": "editorial",
    "timingNote": "No additional voiceover. The opening 1.5-second black hold follows the supplied 1–2 second instruction; subsequent reveal/hold lengths are presentation estimates.",
    "sourceDocument": "VF_Blueprint_to_Why_Musk_Editor_Template.docx",
    "wordCount": 0
  },
  "why-musk": {
    "id": "why-musk",
    "title": "WHY MUSK?",
    "subtitle": "THE TECHNOLOGY FLYWHEEL",
    "footer": "HE COMPRESSES THE DISTANCE BETWEEN WHAT IS POSSIBLE — AND WHAT CAN ACTUALLY BE BUILT.",
    "visual": "technology-flywheel",
    "centerLabel": "MUSK ECOSYSTEM",
    "nodes": [
      {
        "id": "x",
        "label": "X",
        "subtitle": "Distribution"
      },
      {
        "id": "xai",
        "label": "xAI",
        "subtitle": "Intelligence"
      },
      {
        "id": "tesla",
        "label": "Tesla",
        "subtitle": "Mobility • Energy • Robotics"
      },
      {
        "id": "boring",
        "label": "The Boring Company",
        "subtitle": "Physical Infrastructure"
      },
      {
        "id": "spacex",
        "label": "SpaceX / Starlink",
        "subtitle": "Connectivity • Frontier"
      },
      {
        "id": "neuralink",
        "label": "Neuralink",
        "subtitle": "Human Potential"
      }
    ],
    "outerLabels": [
      "SOCIETY"
    ],
    "boundaryLabels": [
      "LAW",
      "REGULATION",
      "INFRASTRUCTURE",
      "PUBLIC UNDERSTANDING",
      "INSTITUTIONS"
    ],
    "comparisonLabels": [
      "TECHNOLOGICAL VELOCITY",
      "SOCIETY"
    ],
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "text": "There is a reason the missing variable leads here.\n\nElon Musk has not built one company.\n\nHe has assembled capabilities that increasingly reinforce one another.\n\nDistribution.\nIntelligence.\nConnectivity.\nEnergy.\nMobility.\nRobotics.\nPhysical infrastructure.\nManufacturing.\nAnd access to the frontier beyond Earth itself.",
        "performance": "Measured; reveal the ecosystem, not the celebrity",
        "startMs": 0,
        "endMs": 28000
      },
      {
        "speaker": "GEORGE",
        "text": "That is what makes this conversation different.\n\nElon has spent decades compressing the distance between what humanity imagines—\nand what engineers can actually build.\n\nBut every transformative technology eventually reaches another system.\n\nSociety.\n\nLaws.\nRegulation.\nPublic understanding.\nInfrastructure.\nInstitutions.\nAnd ultimately—\nthe people expected to live with the consequences.",
        "performance": "Controlled; pivot from capability to constraint",
        "startMs": 28000,
        "endMs": 58000
      },
      {
        "speaker": "NARRATOR",
        "text": "Technology can move at extraordinary speed.\n\nPublic systems usually do not.\n\nAnd that gap may become one of the defining problems of the next technological era.",
        "performance": "Minimal, consequential",
        "startMs": 58000,
        "endMs": 72000
      },
      {
        "speaker": "GEORGE",
        "text": "So the question is not simply:\n\nWhat else can Elon build?\n\nThe question is:\n\nWhat kind of architecture helps society understand, challenge, adopt, and responsibly scale the best technologies faster—without surrendering the citizen’s authority over the future being built around them?",
        "performance": "Slow into the question",
        "startMs": 72000,
        "endMs": 88000
      },
      {
        "speaker": "NARRATOR",
        "text": "That is where Viral Fusion enters.",
        "performance": "Hard button; 1-second pause afterward",
        "startMs": 88000,
        "endMs": 89000
      }
    ],
    "stages": [
      {
        "id": "dormant",
        "startMs": 0,
        "label": "The technology flywheel",
        "description": "Hold the title and subtitle. Keep the ecosystem faint, almost dormant.",
        "endMs": 6000,
        "activeNodeIds": []
      },
      {
        "id": "activate-x",
        "startMs": 6000,
        "endMs": 9667,
        "label": "X — Distribution",
        "description": "Activate X and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "x"
        ]
      },
      {
        "id": "activate-xai",
        "startMs": 9667,
        "endMs": 13333,
        "label": "xAI — Intelligence",
        "description": "Activate xAI and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "x",
          "xai"
        ]
      },
      {
        "id": "activate-tesla",
        "startMs": 13333,
        "endMs": 17000,
        "label": "Tesla — Mobility • Energy • Robotics",
        "description": "Activate Tesla and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "x",
          "xai",
          "tesla"
        ]
      },
      {
        "id": "activate-boring",
        "startMs": 17000,
        "endMs": 20667,
        "label": "The Boring Company — Physical Infrastructure",
        "description": "Activate The Boring Company and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring"
        ]
      },
      {
        "id": "activate-spacex",
        "startMs": 20667,
        "endMs": 24333,
        "label": "SpaceX / Starlink — Connectivity • Frontier",
        "description": "Activate SpaceX / Starlink and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex"
        ]
      },
      {
        "id": "activate-neuralink",
        "startMs": 24333,
        "endMs": 28000,
        "label": "Neuralink — Human Potential",
        "description": "Activate Neuralink and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      },
      {
        "id": "connections",
        "startMs": 28000,
        "label": "One technology system",
        "description": "Illuminate connecting lines so the capabilities become one system.",
        "endMs": 40000,
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      },
      {
        "id": "societal-boundary",
        "startMs": 40000,
        "label": "Technology reaches society",
        "description": "Dim the company nodes slightly and introduce SOCIETY with the faint boundary words.",
        "endMs": 58000,
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      },
      {
        "id": "velocity-gap",
        "startMs": 58000,
        "label": "Two different speeds",
        "description": "Keep energy inside the technology flywheel while the outer societal boundary remains slower or static.",
        "endMs": 72000,
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      },
      {
        "id": "unresolved-gap",
        "startMs": 72000,
        "label": "The unresolved gap",
        "description": "Progressively simplify the visual to TECHNOLOGICAL VELOCITY and SOCIETY. Keep the full ecosystem visible before stripping back.",
        "endMs": 88000,
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      },
      {
        "id": "viral-fusion-enters",
        "startMs": 88000,
        "label": "That is where Viral Fusion enters.",
        "description": "Deliver the final narrator line, followed by a clean black cut.",
        "endMs": 89000,
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      },
      {
        "id": "black",
        "startMs": 89000,
        "label": "Silence",
        "description": "Hold black for 0.5–1.0 second before Why Viral Fusion.",
        "endMs": 90000,
        "activeNodeIds": [
          "x",
          "xai",
          "tesla",
          "boring",
          "spacex",
          "neuralink"
        ]
      }
    ],
    "durationMs": 90000,
    "targetDurationMs": {
      "min": 70000,
      "max": 90000
    },
    "timingSource": "editorial",
    "timingNote": "Visual windows preserve the supplied 0:00–1:12 build. Final-question and voiceover cue boundaries are estimates within the 70–90 second target. No prerecorded narration was supplied.",
    "sourceDocument": "Why_Musk_Why_Viral_Fusion.docx",
    "wordCount": 165
  },
  "why-viral-fusion": {
    "id": "why-viral-fusion",
    "title": "WHY VIRAL FUSION?",
    "subtitle": "THE MISSING CIVIC FLYWHEEL",
    "footer": "MUSK: TECHNOLOGICAL VELOCITY  +  VIRAL FUSION: CIVIC VELOCITY",
    "visual": "civic-flywheel",
    "centerLabel": "VIRAL FUSION",
    "nodes": [
      {
        "id": "citizens",
        "label": "Citizens",
        "subtitle": "Agency"
      },
      {
        "id": "media",
        "label": "Media",
        "subtitle": "Understanding"
      },
      {
        "id": "ai",
        "label": "AI",
        "subtitle": "Intelligence"
      },
      {
        "id": "legislation",
        "label": "Legislation",
        "subtitle": "Lawful Action"
      },
      {
        "id": "industry",
        "label": "Industry",
        "subtitle": "Capability"
      },
      {
        "id": "trust",
        "label": "Trust",
        "subtitle": "Verification"
      },
      {
        "id": "physical-rails",
        "label": "Physical Rails",
        "subtitle": "Distribution"
      },
      {
        "id": "commerce",
        "label": "Commerce",
        "subtitle": "Sustainability"
      }
    ],
    "outerLabels": [],
    "comparisonLabels": [
      "MUSK = TECHNOLOGICAL VELOCITY",
      "VIRAL FUSION = CIVIC VELOCITY"
    ],
    "finalHold": "TECHNOLOGICAL VELOCITY  +  CIVIC VELOCITY",
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "text": "Musk’s ecosystem can accelerate technology.\n\nViral Fusion is designed around a different problem.\n\nHow does society responsibly accelerate with it?",
        "performance": "Quiet confidence",
        "startMs": 0,
        "endMs": 10000
      },
      {
        "speaker": "GEORGE",
        "text": "Viral Fusion does not build the rocket.\n\nWe do not build the reactor.\n\nWe do not build the tunnel.\n\nAnd we do not decide which technology deserves to win.\n\nWe build the architecture through which citizens can understand the opportunity—\nexperts can challenge it—\nindustry can demonstrate its value—\npolicy can be modernized—\nand the public gains a lawful mechanism to participate in what happens next.",
        "performance": "Clear distinction; no rush",
        "startMs": 10000,
        "endMs": 36000
      },
      {
        "speaker": "NARRATOR",
        "text": "Citizen agency.\nPublic understanding.\nArtificial intelligence.\nLegislative pathways.\nIndependent verification.\nPhysical distribution.\nIndustry capability.\nCommercial sustainability.\n\nSeparate capabilities become reinforcing capabilities.",
        "performance": "Build the flywheel node by node",
        "startMs": 36000,
        "endMs": 58000
      },
      {
        "speaker": "GEORGE",
        "text": "And that is the opportunity.\n\nNot to build a political system around Elon Musk.\n\nNot to give one company control over the public square.\n\nThe opposite.\n\nConnect extraordinary technological velocity to a civic architecture that keeps the citizen at the center.\n\nLet the technology compete.\nLet the evidence be challenged.\nLet the public understand the tradeoffs.\nAnd where the people choose to move—\ncreate a lawful pathway capable of moving with them.",
        "performance": "Strong; sovereignty is the safeguard",
        "startMs": 58000,
        "endMs": 87000
      },
      {
        "speaker": "NARRATOR",
        "text": "One flywheel expands what humanity can build.\n\nThe other expands society’s ability to understand, authorize, and benefit from what gets built.",
        "performance": "Cinematic",
        "startMs": 87000,
        "endMs": 97000
      },
      {
        "speaker": "GEORGE",
        "text": "Technological velocity.\n\nCivic velocity.\n\nThe question is what becomes possible when they begin reinforcing one another.",
        "performance": "Final, restrained",
        "startMs": 97000,
        "endMs": 103000
      }
    ],
    "stages": [
      {
        "id": "core",
        "startMs": 0,
        "label": "The missing civic flywheel",
        "description": "Reveal the title and subtitle with only the VIRAL FUSION center visible.",
        "endMs": 10000,
        "activeNodeIds": []
      },
      {
        "id": "architecture",
        "startMs": 10000,
        "label": "A different architecture",
        "description": "Keep the screen restrained as George defines the architecture and its boundaries.",
        "endMs": 36000,
        "activeNodeIds": []
      },
      {
        "id": "activate-citizens",
        "startMs": 36000,
        "endMs": 38750,
        "label": "Citizens — Agency",
        "description": "Activate Citizens and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens"
        ]
      },
      {
        "id": "activate-media",
        "startMs": 38750,
        "endMs": 41500,
        "label": "Media — Understanding",
        "description": "Activate Media and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media"
        ]
      },
      {
        "id": "activate-ai",
        "startMs": 41500,
        "endMs": 44250,
        "label": "AI — Intelligence",
        "description": "Activate AI and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media",
          "ai"
        ]
      },
      {
        "id": "activate-legislation",
        "startMs": 44250,
        "endMs": 47000,
        "label": "Legislation — Lawful Action",
        "description": "Activate Legislation and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation"
        ]
      },
      {
        "id": "activate-industry",
        "startMs": 47000,
        "endMs": 49750,
        "label": "Industry — Capability",
        "description": "Activate Industry and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry"
        ]
      },
      {
        "id": "activate-trust",
        "startMs": 49750,
        "endMs": 52500,
        "label": "Trust — Verification",
        "description": "Activate Trust and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust"
        ]
      },
      {
        "id": "activate-physical-rails",
        "startMs": 52500,
        "endMs": 55250,
        "label": "Physical Rails — Distribution",
        "description": "Activate Physical Rails and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails"
        ]
      },
      {
        "id": "activate-commerce",
        "startMs": 55250,
        "endMs": 58000,
        "label": "Commerce — Sustainability",
        "description": "Activate Commerce and its incoming clockwise connection; keep earlier capabilities illuminated.",
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails",
          "commerce"
        ]
      },
      {
        "id": "connections",
        "startMs": 58000,
        "label": "Reinforcing capabilities",
        "description": "Illuminate all connections for the first time and give the full flywheel one subtle pulse.",
        "endMs": 75000,
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails",
          "commerce"
        ]
      },
      {
        "id": "citizen-sovereignty",
        "startMs": 75000,
        "label": "Citizens remain at the center",
        "description": "Keep Citizens / Agency brighter than every other node; add no new objects.",
        "endMs": 92000,
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails",
          "commerce"
        ],
        "focusNodeIds": [
          "citizens"
        ]
      },
      {
        "id": "comparison",
        "startMs": 92000,
        "label": "Technological velocity + civic velocity",
        "description": "Reveal the lower comparison band or split frame without merging ownership or logos.",
        "endMs": 102000,
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails",
          "commerce"
        ]
      },
      {
        "id": "reinforcement",
        "startMs": 102000,
        "label": "What becomes possible?",
        "description": "Bring the two velocity terms toward the center with connecting light. Keep both systems independent.",
        "endMs": 103000,
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails",
          "commerce"
        ]
      },
      {
        "id": "final-hold",
        "startMs": 103000,
        "label": "Two flywheels",
        "description": "Hold TECHNOLOGICAL VELOCITY + CIVIC VELOCITY for two seconds.",
        "endMs": 105000,
        "activeNodeIds": [
          "citizens",
          "media",
          "ai",
          "legislation",
          "industry",
          "trust",
          "physical-rails",
          "commerce"
        ]
      }
    ],
    "durationMs": 105000,
    "targetDurationMs": {
      "min": 85000,
      "max": 105000
    },
    "timingSource": "editorial",
    "timingNote": "Supplied visual windows through 1:42 are retained. Speech cue boundaries and the final reinforcement/2-second hold are estimates fitted to the 85–105 second target. No prerecorded narration was supplied.",
    "sourceDocument": "Why_Musk_Why_Viral_Fusion.docx",
    "wordCount": 216
  }
};
