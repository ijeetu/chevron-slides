/** Source transcription and visual rehearsal timings from the supplied editor template. */
export type FollowonSlideId = "two-flywheels" | "accumulated-execution" | "california-proof";

export type FollowonSpeakerCue = {
  speaker: "NARRATOR" | "GEORGE";
  performance: string;
  text: string;
  startMs: number;
  endMs: number;
};

export type FollowonStage = {
  id: string;
  startMs: number;
  endMs: number;
  label: string;
  description: string;
};

export type FollowonSlide = {
  id: FollowonSlideId;
  title: string;
  subtitle: string;
  footer: string;
  durationMs: number;
  targetDurationMs: { min: number; max: number };
  sourceDocument: string;
  timingSource: "estimated";
  timingNote: string;
  wordCount: number;
  speakerCues: FollowonSpeakerCue[];
  stages: FollowonStage[];
};

export const followonSlideIds: FollowonSlideId[] = ["two-flywheels", "accumulated-execution", "california-proof"];

export function isFollowonSlideId(id: string): id is FollowonSlideId {
  return followonSlideIds.includes(id as FollowonSlideId);
}

export const technologyCapabilities = ["AI", "CONNECTIVITY", "ENERGY", "MOBILITY", "INFRASTRUCTURE", "MANUFACTURING", "FRONTIER"] as const;
export const civicCapabilities = ["UNDERSTANDING", "PARTICIPATION", "LEGISLATION", "OUTCOMES", "TRUST", "ECOSYSTEM", "NEW CAPABILITY"] as const;
export const moatCapabilities = ["PROVEN OUTCOMES", "CITIZENS", "MEDIA", "LEGISLATION", "PHYSICAL RAILS", "INDUSTRY", "TRUST", "CREATORS", "COMMERCE", "RELATIONSHIPS"] as const;

export const followonSlides: Record<FollowonSlideId, FollowonSlide> = {
  "two-flywheels": {
    "id": "two-flywheels",
    "title": "TWO FLYWHEELS",
    "subtitle": "TECHNOLOGICAL VELOCITY + CIVIC VELOCITY",
    "footer": "TECHNOLOGY EXPANDS WHAT IS POSSIBLE. CITIZEN AGENCY HELPS DETERMINE WHAT BECOMES POSSIBLE NEXT.",
    "durationMs": 105000,
    "targetDurationMs": {
      "min": 95000,
      "max": 115000
    },
    "sourceDocument": "VF Three Slides After Why Viral Fusion.docx",
    "timingSource": "estimated",
    "timingNote": "Visual rehearsal based on the source editorial cues. No recorded voiceover was supplied.",
    "wordCount": 260,
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "performance": "Cinematic, controlled",
        "text": "Now put the two architectures beside one another. On one side — a technology ecosystem built to move extraordinary capability faster. Artificial intelligence. Connectivity. Energy. Mobility. Infrastructure. Manufacturing. And access to the frontier beyond Earth. On the other — a civic architecture designed around a different form of velocity. Understanding. Participation. Lawful action. Measurable outcomes. Trust. And an ecosystem capable of turning successful outcomes into greater capability. Two different flywheels. Two different functions.",
        "startMs": 0,
        "endMs": 28975
      },
      {
        "speaker": "GEORGE",
        "performance": "Strategic, deliberate",
        "text": "Elon's companies don't need Viral Fusion to invent technology. And Viral Fusion should never need Elon Musk to tell citizens what to believe. That isn't the opportunity. The opportunity is what happens when technological capability meets a better mechanism for society to understand it — challenge it — evaluate it — and, where the public supports it, create a lawful pathway for it to move. One flywheel accelerates what humanity can build. The other accelerates our ability to decide what deserves to scale.",
        "startMs": 28975,
        "endMs": 61920
      },
      {
        "speaker": "NARRATOR",
        "performance": "Restrained; reassuring",
        "text": "And importantly — neither system has to control the other. Technology remains accountable to law. Civic authority remains with citizens and lawful institutions. Independent infrastructure protects continuity. And competition determines which technologies actually perform. The objective is not concentrated control. It is coordinated acceleration without surrendering citizen sovereignty.",
        "startMs": 61920,
        "endMs": 80972
      },
      {
        "speaker": "GEORGE",
        "performance": "Building into transition",
        "text": "Because when technological velocity and civic velocity begin working together, the result is not simply a faster company. It could be a faster path from problem — to solution — to proof — to deployment. And that raises the next question. If these systems begin reinforcing one another — what makes the architecture difficult to reproduce?",
        "startMs": 80972,
        "endMs": 103200
      }
    ],
    "stages": [
      {
        "id": "technology",
        "startMs": 0,
        "endMs": 15000,
        "label": "Technological velocity",
        "description": "Activate technology capabilities in sequence."
      },
      {
        "id": "civic",
        "startMs": 15000,
        "endMs": 30000,
        "label": "Civic velocity",
        "description": "Activate civic capabilities independently."
      },
      {
        "id": "hold",
        "startMs": 30000,
        "endMs": 42000,
        "label": "Two independent systems",
        "description": "Keep both centers separate; hold before connecting."
      },
      {
        "id": "exchange",
        "startMs": 42000,
        "endMs": 66000,
        "label": "Exchanging value",
        "description": "Connect corresponding functions without merging authority."
      },
      {
        "id": "sovereignty",
        "startMs": 66000,
        "endMs": 82000,
        "label": "Citizen sovereignty",
        "description": "Independent infrastructure, citizens, law and competition retain authority."
      },
      {
        "id": "pathway",
        "startMs": 82000,
        "endMs": 99000,
        "label": "From problem to deployment",
        "description": "Reveal problem, solution, proof and deployment in sequence."
      },
      {
        "id": "architecture",
        "startMs": 99000,
        "endMs": 105000,
        "label": "Reinforcing architecture",
        "description": "Dim individual nodes and hold the connective architecture."
      }
    ]
  },
  "accumulated-execution": {
    "id": "accumulated-execution",
    "title": "THE MOAT",
    "subtitle": "ACCUMULATED EXECUTION",
    "footer": "A COMPETITOR CAN COPY A FEATURE. IT IS MUCH HARDER TO COPY A FLYWHEEL.",
    "durationMs": 90000,
    "targetDurationMs": {
      "min": 80000,
      "max": 100000
    },
    "sourceDocument": "VF Three Slides After Why Viral Fusion.docx",
    "timingSource": "estimated",
    "timingNote": "Visual rehearsal based on the source editorial cues. No recorded voiceover was supplied.",
    "wordCount": 225,
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "performance": "Analytical; quieter",
        "text": "Software can be copied. Features can be copied. Interfaces can be copied. Even business models can eventually be copied. So if Viral Fusion's advantage depends entirely on code — it does not have much of an advantage.",
        "startMs": 0,
        "endMs": 14504
      },
      {
        "speaker": "GEORGE",
        "performance": "Executive, precise",
        "text": "The potential moat is everything that accumulates around the software. Citizens who understand how to use it. Creators who know how to explain it. Physical locations capable of supporting it. Industry relationships. Technical partners. Legislative experience. Public trust. Commercial infrastructure. And most importantly — proven outcomes. Every successful action creates evidence. Every piece of evidence creates credibility. Every credible outcome makes the next conversation easier. Every new relationship expands the ecosystem. And every expansion creates capabilities a new competitor would have to rebuild from scratch.",
        "startMs": 14504,
        "endMs": 47824
      },
      {
        "speaker": "NARRATOR",
        "performance": "Measured",
        "text": "That changes the nature of competition. A new platform can copy a petition feature. It cannot instantly copy the public relationships, media ecosystem, legislative history, physical footprint, institutional knowledge, commercial partners, and years of measurable civic outcomes that have accumulated around it.",
        "startMs": 47824,
        "endMs": 64288
      },
      {
        "speaker": "GEORGE",
        "performance": "Firm close",
        "text": "That is why the moat is not built once. It compounds. And the same principle applies geographically. A successful launch in one state does not merely create another market. It creates knowledge, proof, content, relationships, technology, and a playbook that make the next launch more valuable than the first. So we do not begin everywhere. We earn the right to expand.",
        "startMs": 64288,
        "endMs": 88200
      }
    ],
    "stages": [
      {
        "id": "software",
        "startMs": 0,
        "endMs": 12000,
        "label": "The moat is not the software",
        "description": "Open with the central statement only."
      },
      {
        "id": "accumulate",
        "startMs": 12000,
        "endMs": 50000,
        "label": "Accumulated execution",
        "description": "Bring reinforcing capabilities inward; emphasize proven outcomes most strongly."
      },
      {
        "id": "feature",
        "startMs": 50000,
        "endMs": 54000,
        "label": "A feature can be copied",
        "description": "Briefly isolate a single software tile."
      },
      {
        "id": "ecosystem",
        "startMs": 54000,
        "endMs": 68000,
        "label": "An ecosystem takes execution",
        "description": "Reveal all reinforcing layers again."
      },
      {
        "id": "compound",
        "startMs": 68000,
        "endMs": 86500,
        "label": "It compounds",
        "description": "Expand the layers subtly to express accumulated history."
      },
      {
        "id": "expand",
        "startMs": 86500,
        "endMs": 90000,
        "label": "We earn the right to expand",
        "description": "Clear to the final statement and hold before California."
      }
    ]
  },
  "california-proof": {
    "id": "california-proof",
    "title": "CALIFORNIA",
    "subtitle": "PROVE IT HERE.",
    "footer": "NOT NATIONAL ON DAY ONE. NATIONAL BY EARNING DEMAND.",
    "durationMs": 95000,
    "targetDurationMs": {
      "min": 85000,
      "max": 105000
    },
    "sourceDocument": "VF Three Slides After Why Viral Fusion.docx",
    "timingSource": "estimated",
    "timingNote": "Visual rehearsal based on the source editorial cues. No recorded voiceover was supplied.",
    "wordCount": 239,
    "speakerCues": [
      {
        "speaker": "NARRATOR",
        "performance": "Grounded; execution-focused",
        "text": "And that is why Viral Fusion does not begin by trying to launch everywhere. It begins in California. Not because California is easy — but because it gives us a demanding environment in which to test whether the architecture works across technology, media, industry, public policy, infrastructure, and citizen participation.",
        "startMs": 0,
        "endMs": 19498
      },
      {
        "speaker": "GEORGE",
        "performance": "Controlled momentum",
        "text": "California is not the finish line. It is the proving ground. We launch the ecosystem. We activate the media rails. We introduce the first physical products. We bring creators into the economic model. We begin onboarding physical locations. We launch the software. And then — we put the architecture under pressure. Real issues. Real legislation. Real signatures. Real voters. Real outcomes.",
        "startMs": 19498,
        "endMs": 43285
      },
      {
        "speaker": "NARRATOR",
        "performance": "Measured",
        "text": "Because the first objective is not national scale. It is proof. Can Viral Fusion create public understanding? Organize lawful participation? Help qualify meaningful measures? Help citizens evaluate competing arguments? And produce outcomes people can actually measure? If it can — California becomes more than the first market. It becomes the evidence.",
        "startMs": 43285,
        "endMs": 63173
      },
      {
        "speaker": "GEORGE",
        "performance": "Strong, restrained",
        "text": "And evidence creates demand. Another state sees what happened. Another group of citizens asks for access. Another creator network forms. Another physical network becomes possible. Another legislative opportunity enters the architecture. And the flywheel turns again — but faster, because the second launch begins with everything the first one taught us. That is how we scale. Not by opening every door at once. By proving enough value that people begin asking us to open the next one.",
        "startMs": 63173,
        "endMs": 93200
      }
    ],
    "stages": [
      {
        "id": "nation",
        "startMs": 0,
        "endMs": 8000,
        "label": "A demanding proving ground",
        "description": "Begin with a faint national outline."
      },
      {
        "id": "california",
        "startMs": 8000,
        "endMs": 17000,
        "label": "Phase One — California",
        "description": "Illuminate California and reduce national detail."
      },
      {
        "id": "activate",
        "startMs": 17000,
        "endMs": 43000,
        "label": "Launch the ecosystem",
        "description": "Activate media, product, creators, physical rails, software and legislative action without revealing launch products."
      },
      {
        "id": "pressure",
        "startMs": 43000,
        "endMs": 60000,
        "label": "Real outcomes",
        "description": "Reveal real issues, legislation, signatures, voters and outcomes in sequence."
      },
      {
        "id": "proof",
        "startMs": 60000,
        "endMs": 76000,
        "label": "California becomes the evidence",
        "description": "Turn the launch core into a proven node."
      },
      {
        "id": "demand",
        "startMs": 76000,
        "endMs": 93000,
        "label": "Evidence creates demand",
        "description": "Reveal dim unnamed nodes; do not name a second state."
      },
      {
        "id": "next",
        "startMs": 93000,
        "endMs": 95000,
        "label": "Earn the next opening",
        "description": "Pulse one unnamed node once and hold anticipation."
      }
    ]
  }
};
