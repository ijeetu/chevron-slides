/** Source copy and visual rehearsal cues from the supplied What If? Word document. */
export type WhatIfStageId =
  | "opening"
  | "question-one"
  | "question-two"
  | "question-three"
  | "reality-check"
  | "convene"
  | "expose"
  | "challenge"
  | "connect"
  | "execution-engine"
  | "blackout"
  | "silent-title";

export type WhatIfStage = {
  id: WhatIfStageId;
  startMs: number;
  endMs: number;
  label: string;
  description: string;
  visibleQuestions: number;
};

export type WhatIfSpeakerCue = {
  speaker: "GEORGE" | "NARRATOR";
  performance: string;
  text: string;
};

export type WhatIfSlideData = {
  id: "what-if";
  title: string;
  subtitle: string;
  questions: readonly string[];
  finalStatement: string;
  footer: string;
  sourceDocument: string;
  targetDurationMs: { min: number; max: number };
  durationMs: number;
  timingNote: string;
  speakerCues: readonly WhatIfSpeakerCue[];
  stages: readonly WhatIfStage[];
};

export const whatIfSlide: WhatIfSlideData = {
  id: "what-if",
  title: "WHAT IF?",
  subtitle: "CAN A PODCAST BECOME AN EXECUTION ENGINE?",
  questions: [
    "WHAT IF MEANINGFUL CHANGE COULD BEGIN WITH A CONVERSATION?",
    "WHAT IF THE LAWS PEOPLE HAVE WANTED — BUT NEVER HAD THE MACHINERY TO BUILD — COULD BEGIN HERE?",
    "WHAT IF THE PEOPLE, TECHNOLOGY, CAPITAL AND INFRASTRUCTURE REQUIRED TO BUILD THEM COULD BE BROUGHT INTO THE SAME ROOM?",
  ],
  finalStatement: "THE PODCAST BECOMES THE STRATEGY",
  footer: "ONE CONVERSATION → THE NEXT CAPABILITY → ACTION",
  sourceDocument: "VF What If Podcast Execution Engine.docx",
  targetDurationMs: { min: 60000, max: 80000 },
  durationMs: 83750,
  timingNote: "Visual rehearsal of the supplied editorial timing: approximately 80 seconds, followed by a 0.75-second cut to black and a three-second silent title hold. No recorded voiceover was supplied. The title reveal has no voiceover.",
  speakerCues: [
    {
      speaker: "GEORGE",
      performance: "Quiet, personal. Let the question feel bigger than the medium.",
      text: `What if meaningful change doesn't begin inside government?
What if it begins here—
with a conversation?
What if the laws people have wanted—
but never had the machinery to build—
could begin with the right people in one room?
What if the technologies capable of improving people's lives—
could be challenged—
understood—
and given a lawful pathway forward?
What if one conversation could unlock the next person—
the next capability—
the next commitment?`,
    },
    {
      speaker: "NARRATOR",
      performance: "Measured. Ground the ambition in reality.",
      text: `A podcast cannot pass a law.
It cannot cast a citizen's vote.
And it should never replace the institutions responsible for either.
But it can do something extraordinarily powerful.
It can convene.
Expose.
Challenge.
Connect.
And create commitments that did not exist before the microphones turned on.`,
    },
    {
      speaker: "GEORGE",
      performance: "Build. This is the thesis.",
      text: `So this is the experiment.
Not:
"Can we make a successful podcast?"
But:
"Can a podcast become an execution engine?"
Can every conversation leave something behind—
knowledge—
relationships—
technology—
capital—
legislation—
infrastructure—
or a commitment to take the next step?
And if it can—
how far can one conversation compound into the next?`,
    },
  ],
  stages: [
    { id: "opening", startMs: 0, endMs: 5000, label: "What if?", description: "Near-black. Show only WHAT IF?", visibleQuestions: 0 },
    { id: "question-one", startMs: 5000, endMs: 18000, label: "A conversation", description: "Reveal the first question with minimal motion.", visibleQuestions: 1 },
    { id: "question-two", startMs: 18000, endMs: 33000, label: "The machinery to build", description: "Reveal question two and extend a faint connecting line.", visibleQuestions: 2 },
    { id: "question-three", startMs: 33000, endMs: 46000, label: "The same room", description: "Reveal question three as the faint rings converge.", visibleQuestions: 3 },
    { id: "reality-check", startMs: 46000, endMs: 58000, label: "Reality check", description: "Dim the questions while the narrator grounds the ambition. Add no new visual claims.", visibleQuestions: 3 },
    { id: "convene", startMs: 58000, endMs: 61000, label: "Convene", description: "Pulse CONVENE once.", visibleQuestions: 3 },
    { id: "expose", startMs: 61000, endMs: 64000, label: "Expose", description: "Pulse EXPOSE once.", visibleQuestions: 3 },
    { id: "challenge", startMs: 64000, endMs: 67000, label: "Challenge", description: "Pulse CHALLENGE once.", visibleQuestions: 3 },
    { id: "connect", startMs: 67000, endMs: 70000, label: "Connect", description: "Pulse CONNECT once.", visibleQuestions: 3 },
    { id: "execution-engine", startMs: 70000, endMs: 80000, label: "An execution engine", description: "Bring the thesis question into full prominence.", visibleQuestions: 3 },
    { id: "blackout", startMs: 80000, endMs: 80750, label: "Blackout", description: "Cut to black for 0.75 seconds.", visibleQuestions: 0 },
    { id: "silent-title", startMs: 80750, endMs: 83750, label: "The podcast becomes the strategy", description: "Reveal the title in silence, hold, then continue to the strategy map.", visibleQuestions: 0 },
  ],
};
