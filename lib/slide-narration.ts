import { accelerationSlides } from "./acceleration-chapter";
import { followonSlides } from "./followon-chapter";
import { guestSeriesSourceSlides } from "./guest-series-source";
import { openingSourceSlides } from "./opening-chapter-source";
import type { ViralFusionSlideId } from "./viral-fusion-deck";
import { whatIfSlide } from "./what-if-slide";

function cueText(cues: readonly { text: string }[]) {
  return cues.map((cue) => cue.text.trim()).filter(Boolean).join("\n\n");
}

// The opening import misclassifies some spoken paragraphs as body/editor copy.
// These audited source ranges contain speech only, excluding delivery notes,
// footage cues, on-screen text, and the final production checklist.
function openingSpeech(id: string, ranges: readonly (readonly [number, number])[]) {
  const source = openingSourceSlides.find((slide) => slide.id === id);
  return source?.paragraphs
    .filter((paragraph) => ranges.some(([start, end]) => paragraph.sourceParagraph >= start && paragraph.sourceParagraph <= end))
    .map((paragraph) => paragraph.text.trim())
    .filter(Boolean)
    .join("\n") ?? "";
}

const speakerCue = /^\[(?:NARRATOR|GEORGE)[^\]]*\]/i;
// These descriptions occur immediately after a separate speaker label. They
// guide delivery; they are not words for the synthetic narrator to say.
const deliveryDirection = /^(?:analytical|broader economic focus|building (?:conviction|toward|commercial)|challenging|cinematic|confident|consequential|controlled|conversational|decisive|deliberate|direct|establish the medical milestone|executive|expanding|expansive|explaining|final|focused|grounded|immediately following the clip|introducing|measured|personal|reflective|serious|strategic|technically curious|thoughtful|transitioning|unexpected|visionary|visual|warm)(?:[,. ]|$)/i;

function guestSpeech(id: string) {
  const source = guestSeriesSourceSlides.find((slide) => slide.id === id);
  const speech: string[] = [];
  let followsSpeakerCue = false;

  for (const paragraph of source?.paragraphs ?? []) {
    const text = paragraph.text.trim();
    if (!text) continue;
    if (speakerCue.test(text)) {
      followsSpeakerCue = true;
      continue;
    }
    if (paragraph.kind !== "narrator" && paragraph.kind !== "george") {
      followsSpeakerCue = false;
      continue;
    }
    const isDirection = followsSpeakerCue && deliveryDirection.test(text);
    followsSpeakerCue = false;
    if (!isDirection) speech.push(text);
  }

  return speech.join("\n");
}

/** Spoken source copy for slides without a recorded voiceover. */
export const slideNarration: Partial<Record<ViralFusionSlideId, string>> = {
  "what-if": cueText(whatIfSlide.speakerCues),
  "podcast-strategy": openingSpeech("podcast-strategy", [[1477, 1484], [1501, 1515], [1526, 1533], [1537, 1542], [1555, 1556], [1559, 1562]]),
  "mo-gawdat": guestSpeech("mo-gawdat"),
  samsung: guestSpeech("samsung"),
  "charles-adkins": guestSpeech("charles-adkins"),
  "palmer-luckey": guestSpeech("palmer-luckey"),
  ford: guestSpeech("ford"),
  "lynsi-snyder": guestSpeech("lynsi-snyder"),
  chevron: guestSpeech("chevron"),
  "x-energy": guestSpeech("x-energy"),
  "patrick-soon-shiong": guestSpeech("patrick-soon-shiong"),
  "brandon-cuevas": guestSpeech("brandon-cuevas"),
  "chad-bianco": guestSpeech("chad-bianco"),
  "spencer-pratt": guestSpeech("spencer-pratt"),
  "steve-davis": guestSpeech("steve-davis"),
  "hedera-founders": guestSpeech("hedera-founders"),
  "michele-chan": guestSpeech("michele-chan"),
  "blueprint-in-motion": cueText(accelerationSlides["blueprint-in-motion"].speakerCues),
  "missing-variable": cueText(accelerationSlides["missing-variable"].speakerCues),
  "why-musk": cueText(accelerationSlides["why-musk"].speakerCues),
  "why-viral-fusion": cueText(accelerationSlides["why-viral-fusion"].speakerCues),
  "two-flywheels": cueText(followonSlides["two-flywheels"].speakerCues),
  "accumulated-execution": cueText(followonSlides["accumulated-execution"].speakerCues),
  "california-proof": cueText(followonSlides["california-proof"].speakerCues),
  // These closing slides have no separate spoken script. Use their existing
  // presentation copy, including the titles of the three section dividers.
  sustainability: "Sustainability model.",
  legislation: "Legislative examples.",
  "global-frameworks": "The global framework. Institutions, frameworks, forums, and agreements. Competing geopolitical interests. Documented structures: institutions, published frameworks, and agreements. Interpretations: claims about influence, purpose, and intent.",
  playbook: "Our playbook.",
  purpose: "Far and away the best prize that life has to offer is the chance to work hard at work worth doing. Theodore Roosevelt. Roosevelt believed in work worth doing. For us, there is no greater work than standing up to the tyranny running this country. Stop waiting for change. It is time to deploy the talents God gave us and build the future ourselves. Today, you will see what is possible. Through your platform. Through the power of a podcast. Through our technology, our strategy, and our intellectual property. By connecting the dots and building synergies, we will drive real action—and deliver a level of change the world has never seen.",
  "call-to-action": "From analysis to execution. Prove the model here. Create demand nationally. Earn the right to scale globally.",
};
