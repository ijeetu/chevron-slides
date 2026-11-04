import type { ViralFusionSlideId } from "./viral-fusion-deck";

// Recording filenames retain the original slide numbers. Stable IDs keep the
// narration attached to its subject when slides are reordered.
export const slideVoiceovers: Partial<Record<ViralFusionSlideId, readonly string[]>> = {
  anniversary: ["/voices/george/slide02.mp3"],
  children: ["/voices/george/slide03.mp3"],
  "protect-children": ["/voices/george/slide04.mp3"],
  agenda: ["/voices/george/slide05.mp3"],
  problems: ["/voices/george/slide06.mp3"],
  "beneath-noise": ["/voices/george/slide07.mp3"],
  competition: ["/voices/george/slide08.mp3"],
  "long-game": ["/voices/george/slide09.mp3"],
  "technological-power": ["/voices/george/slide10.mp3"],
  networks: ["/voices/george/slide11.mp3"],
  "what-we-learned": ["/voices/george/slide13.mp3"],
  "five-pillars": ["/voices/george/slide14.mp3"],
  founder: ["/voices/george/slide24.mp3"],
  solving: ["/voices/george/slide28.mp3"],
  republic: ["/voices/george/slide29.mp3"],
  "civic-os": ["/voices/george/slide30.mp3"],
  "physical-infrastructure": ["/voices/george/slide31.mp3"],
  "strategic-alliance": ["/voices/george/slide32.mp3"],
  blueprint: ["/voices/george/slide33.mp3"],
  "black-swan": ["/voices/blackswan.mp3"],
  "technology-alliance": ["/slide-19-voiceover.mp3"],
  "project-2026": ["/project2026intro.mp3", "/project-2026-nrusa%20copy%202.mp3"],
};
