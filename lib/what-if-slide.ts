/** Approved copy from the October 23 color-coded master, slide 26. */
export type WhatIfStageId = "opening" | "people" | "capabilities" | "opportunity" | "execution-engine" | "blackout" | "silent-title";
export type WhatIfStage = { id: WhatIfStageId; startMs: number; endMs: number; label: string; description: string; visibleQuestions: number };
export type WhatIfSpeakerCue = { speaker: "GEORGE" | "NARRATOR"; performance: string; text: string };
export type WhatIfSlideData = {
  id: "what-if"; title: string; subtitle: string; questions: readonly string[];
  sections: readonly { title: string; text: string }[];
  finalStatement: string; footer: string; sourceDocument: string;
  targetDurationMs: { min: number; max: number }; durationMs: number; timingNote: string;
  speakerCues: readonly WhatIfSpeakerCue[]; stages: readonly WhatIfStage[];
};

export const whatIfSlide: WhatIfSlideData = {
  id: "what-if",
  title: "WHAT IF?",
  subtitle: "CAN A PODCAST BECOME AN EXECUTION ENGINE?",
  questions: [
    "What if meaningful change doesn't begin inside government?",
    "What if it begins here—with a conversation?",
    "What if it could become an execution engine?",
  ],
  sections: [
    { title: "THE PEOPLE BEHIND THE VISION", text: "Extraordinary people. Shared purpose. Collective execution." },
    { title: "COMPLEMENTARY CAPABILITIES", text: "Technology + Manufacturing + Distribution" },
    { title: "THE OPPORTUNITY", text: "New value for businesses, people, and society." },
  ],
  finalStatement: "THE PODCAST BECOMES THE STRATEGY.",
  footer: "Extraordinary people. Shared purpose. Collective execution.",
  sourceDocument: "VF_Presentation_1-33_Master_Color_Coded_for_Jeetu (1).docx",
  targetDurationMs: { min: 105000, max: 135000 },
  durationMs: 122750,
  timingNote: "Visual rehearsal with estimated pacing. The recorded voiceover and new footage have not been supplied. The closing title holds in silence for two seconds; continue to the strategy map when ready.",
  speakerCues: [
    {
      speaker: "GEORGE", performance: "Quiet, personal. Building significance.",
      text: `What if meaningful change doesn't begin inside government?
What if it begins here—with a conversation?
Think about Elon Musk.
Palmer Luckey.
Peter Thiel.
They've helped build companies that transformed industries.
But none of them did it alone.
It took extraordinary people.
Engineers.
Inventors.
Entrepreneurs.
And everyday people who wanted to be part of something they believed in.
People who wanted their work—and their lives—to have purpose.
People who believed in a vision—and helped make it real.`,
    },
    {
      speaker: "NARRATOR", performance: "Measured, consequential. Establishing synergistic value.",
      text: `Technology.
Manufacturing.
Distribution.
Individually, they create value.
Together, they can create something greater than the sum of their parts.
For their businesses.
For the people involved.
And potentially, for society.`,
    },
    {
      speaker: "GEORGE", performance: "Building conviction. Addressing Shawn.",
      text: `That's what I want to explore with you, Shawn.
Not another conversation about what's wrong.
A conversation about what we could build together.
And what becomes possible when exceptional people find a shared purpose.`,
    },
    {
      speaker: "NARRATOR", performance: "Grounded, deliberate.",
      text: `A podcast cannot pass a law.
But it can bring the right people together.
Challenge ideas.
Connect capabilities.
And open the door to real-world action.`,
    },
    {
      speaker: "GEORGE", performance: "Personal, decisive. Final invitation.",
      text: `We have a vision.
A strategy.
And technology we're developing to support it.
But none of it reaches its potential without the right people.
People who want to build.
Who want their work to matter.
And who see an opportunity to contribute to something larger than themselves.
So here's the experiment.
What if this podcast could become more than a conversation?
What if it could become an execution engine?`,
    },
  ],
  stages: [
    { id: "opening", startMs: 0, endMs: 4000, label: "What if?", description: "Nearly black. Reveal only WHAT IF?", visibleQuestions: 0 },
    { id: "people", startMs: 4000, endMs: 39000, label: "The people behind the vision", description: "Shift the emphasis toward extraordinary people and shared purpose.", visibleQuestions: 1 },
    { id: "capabilities", startMs: 39000, endMs: 64000, label: "Complementary capabilities", description: "Bring Technology, Manufacturing, and Distribution together.", visibleQuestions: 2 },
    { id: "opportunity", startMs: 64000, endMs: 107000, label: "New opportunities", description: "New value for businesses, people, and society.", visibleQuestions: 3 },
    { id: "execution-engine", startMs: 107000, endMs: 120000, label: "An execution engine", description: "Reveal the central question.", visibleQuestions: 3 },
    { id: "blackout", startMs: 120000, endMs: 120750, label: "Blackout", description: "Fade briefly to black.", visibleQuestions: 0 },
    { id: "silent-title", startMs: 120750, endMs: 122750, label: "The podcast becomes the strategy", description: "Hold the final title in silence for two seconds.", visibleQuestions: 0 },
  ],
};
