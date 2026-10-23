import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { registerHooks } from "node:module";
import test from "node:test";
import { accelerationSlideIds, accelerationSlides } from "./acceleration-chapter.ts";
import { guestSlideIds as configuredGuestSlideIds, guestSlides } from "./guest-chapter.ts";
import { guestChapterNarration, guestChapterTransition } from "./guest-chapter-narration.ts";
import { guestSeriesIds as configuredGuestSeriesIds, guestSeries } from "./guest-series.ts";
import { guestSeriesSourceDocument, guestSeriesSourceOverview, guestSeriesSourceSlides } from "./guest-series-source.ts";
import { whatIfSlide } from "./what-if-slide.ts";
import { namedHashMatchesSlide, pageFromHash, slideIndex, standaloneSlideDestination, viralFusionDeck } from "./viral-fusion-deck.ts";

// Next resolves this extensionless relative import through its bundler. Resolve
// the same single edge for Node's native TypeScript test runner, then remove the
// hook so the suite does not alter resolution for unrelated modules.
const mediaModuleUrl = new URL("./guest-series-media.ts", import.meta.url).href;
const mediaResolution = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL === mediaModuleUrl && specifier === "./guest-chapter") {
      return nextResolve("./guest-chapter.ts", context);
    }
    return nextResolve(specifier, context);
  },
});
const { guestSeriesMedia } = await import("./guest-series-media.ts");
mediaResolution.deregister();

// Preserve the earlier deck except the two legacy slides the user approved
// keeping on the standalone Strategy Map page to match the locked master.
const existingSlideIds = [
  "anniversary", "doge", "children", "protect-children", "accountability", "flag",
  "all-a-lie", "hope", "change", "public-demand", "america-first", "promise", "agenda",
  "problems", "beneath-noise", "competition", "long-game", "technological-power",
  "networks", "global-incentives", "what-we-learned", "five-pillars", "inspiration",
  "founder", "operating-system", "viral-fusion", "mission-vision", "solving", "republic",
  "civic-os", "physical-infrastructure", "strategic-alliance", "blueprint",
  "execution-priorities", "podcast-strategy", "mo-gawdat", "strategy-map", "black-swan",
  "sustainability", "legislation", "musk-alliance", "technology-alliance", "global-frameworks",
  "playbook", "project-2026", "purpose", "call-to-action",
];

const legacyGuestSlideIds = [
  "mo-gawdat", "samsung", "charles-adkins", "palmer-luckey", "ford", "lynsi-snyder",
  "chevron", "x-energy", "patrick-soon-shiong", "brandon-cuevas", "chad-bianco",
  "steve-davis", "hedera-founders", "michele-chan",
];

const guestSeriesIds = [
  "mo-gawdat", "samsung", "charles-adkins", "palmer-luckey", "ford", "lynsi-snyder",
  "chevron", "x-energy", "patrick-soon-shiong", "brandon-cuevas", "chad-bianco",
  "spencer-pratt", "steve-davis", "hedera-founders", "michele-chan",
];

const blueprintToWhySlideIds = [
  "blueprint-in-motion", "missing-variable", "acceleration-layer", "why-musk", "why-viral-fusion",
];

const followOnSlideIds = ["two-flywheels", "accumulated-execution", "california-proof"];

test("existing slides retain their relative order with only the approved standalone moves", () => {
  const originalIds = new Set(existingSlideIds);
  const retainedIds = viralFusionDeck.filter((slide) => originalIds.has(slide.id)).map((slide) => slide.id);
  const movedToStandalone = new Set(["execution-priorities", "strategy-map"]);

  assert.deepEqual(retainedIds, existingSlideIds.filter((id) => !movedToStandalone.has(id)));
  assert.deepEqual(existingSlideIds.filter((id) => !retainedIds.includes(id)), [...movedToStandalone]);
  assert.equal(viralFusionDeck.length, 68);
  assert.equal(new Set(viralFusionDeck.map((slide) => slide.id)).size, viralFusionDeck.length);
});

test("What If follows Blueprint and the revised guests occupy slides 36 through 50", () => {
  const chapterStart = slideIndex("podcast-strategy") + 1;
  const chapterEnd = slideIndex("blueprint-in-motion");

  assert.deepEqual(viralFusionDeck.slice(32, 35).map((slide) => slide.id), ["blueprint", "what-if", "podcast-strategy"]);
  assert.equal(chapterStart, 35);
  assert.deepEqual(viralFusionDeck.slice(chapterStart, chapterEnd).map((slide) => slide.id), guestSeriesIds);
  assert.equal(chapterEnd, 50);
  assert.deepEqual(viralFusionDeck.slice(45, 51).map((slide) => slide.id), [
    "chad-bianco", "spencer-pratt", "steve-davis", "hedera-founders", "michele-chan", "blueprint-in-motion",
  ]);
});

test("What If retains the source questions, complete speech, and silent reveal", () => {
  assert.equal(whatIfSlide.id, "what-if");
  assert.deepEqual(whatIfSlide.questions, [
    "WHAT IF MEANINGFUL CHANGE COULD BEGIN WITH A CONVERSATION?",
    "WHAT IF THE LAWS PEOPLE HAVE WANTED — BUT NEVER HAD THE MACHINERY TO BUILD — COULD BEGIN HERE?",
    "WHAT IF THE PEOPLE, TECHNOLOGY, CAPITAL AND INFRASTRUCTURE REQUIRED TO BUILD THEM COULD BE BROUGHT INTO THE SAME ROOM?",
  ]);
  assert.equal(whatIfSlide.finalStatement, "THE PODCAST BECOMES THE STRATEGY");
  assert.deepEqual(whatIfSlide.speakerCues.map((cue) => cue.speaker), ["GEORGE", "NARRATOR", "GEORGE"]);
  // Independently extracted from the supplied What If DOCX voiceover section.
  const speech = whatIfSlide.speakerCues.map((cue) => `${cue.speaker}:${cue.text}`).join("").replace(/\s+/g, "");
  assert.equal(createHash("sha256").update(speech).digest("hex"), "e57e71f4d449dc3b9b6a6d0a1d4e6e707bf1cdb23b2559fa0d8a929030a6491f");

  let previousEnd = 0;
  for (const stage of whatIfSlide.stages) {
    assert.equal(stage.startMs, previousEnd, `${stage.id} leaves a gap or overlaps`);
    assert.ok(stage.endMs > stage.startMs, `${stage.id} has no duration`);
    assert.ok(stage.visibleQuestions >= 0 && stage.visibleQuestions <= 3);
    previousEnd = stage.endMs;
  }
  assert.equal(previousEnd, whatIfSlide.durationMs);
  assert.equal(whatIfSlide.stages[0].id, "opening");
  assert.equal(whatIfSlide.stages[0].visibleQuestions, 0);
  const blackout = whatIfSlide.stages.at(-2);
  assert.equal(blackout.id, "blackout");
  assert.ok(blackout.endMs - blackout.startMs >= 500 && blackout.endMs - blackout.startMs <= 1000);
  assert.equal(whatIfSlide.stages.at(-1).id, "silent-title");
  assert.equal(whatIfSlide.stages.at(-1).visibleQuestions, 0);
});

test("the second Blueprint and Why chapter follows Michele directly and retains the original Blueprint", () => {
  const chapterStart = slideIndex("michele-chan") + 1;
  const chapterEnd = slideIndex("two-flywheels");

  assert.deepEqual(viralFusionDeck.slice(chapterStart, chapterEnd).map((slide) => slide.id), blueprintToWhySlideIds);
  assert.equal(slideIndex("blueprint"), 32);
  assert.equal(viralFusionDeck[slideIndex("blueprint")].title, "The Blueprint");
  assert.ok(slideIndex("blueprint") < slideIndex("podcast-strategy"));
  assert.equal(chapterStart, 50);

  for (const id of blueprintToWhySlideIds) {
    const hash = `#slide-${id}`;
    assert.equal(pageFromHash(hash), slideIndex(id));
    assert.equal(namedHashMatchesSlide(hash, id), true);
  }
});

test("the two flywheels, moat, and California proof follow Why Viral Fusion before the existing California chapter", () => {
  const chapterStart = slideIndex("why-viral-fusion") + 1;
  const chapterEnd = slideIndex("black-swan");

  assert.deepEqual(viralFusionDeck.slice(chapterStart, chapterEnd).map((slide) => slide.id), followOnSlideIds);
  assert.equal(chapterStart, 55);
  assert.equal(chapterEnd, 58);

  for (const id of followOnSlideIds) {
    const hash = `#slide-${id}`;
    assert.equal(pageFromHash(hash), slideIndex(id));
    assert.equal(namedHashMatchesSlide(hash, id), true);
  }
});

test("editorial timelines cover each slide continuously and keep narration within its duration", () => {
  assert.deepEqual(accelerationSlideIds, blueprintToWhySlideIds);

  for (const id of accelerationSlideIds) {
    const slide = accelerationSlides[id];
    const nodeIds = new Set(slide.nodes.map((node) => node.id));
    let previousEnd = 0;

    assert.ok(slide.durationMs > 0, `${id} needs a positive duration`);
    assert.ok(slide.stages.length > 0, `${id} needs an opening stage`);
    for (const stage of slide.stages) {
      assert.equal(stage.startMs, previousEnd, `${id}/${stage.id} leaves a gap or overlaps`);
      assert.ok(stage.endMs > stage.startMs, `${id}/${stage.id} has no duration`);
      assert.ok(stage.endMs <= slide.durationMs, `${id}/${stage.id} exceeds the slide duration`);
      for (const nodeId of [...stage.activeNodeIds ?? [], ...stage.focusNodeIds ?? []]) {
        assert.ok(nodeIds.has(nodeId), `${id}/${stage.id} refers to unknown node ${nodeId}`);
      }
      previousEnd = stage.endMs;
    }
    assert.equal(previousEnd, slide.durationMs, `${id} does not hold through its final frame`);

    let previousCueEnd = 0;
    for (const cue of slide.speakerCues) {
      assert.ok(cue.text.trim().length > 0, `${id} contains an empty speech cue`);
      assert.ok(cue.startMs >= previousCueEnd, `${id} has overlapping speech cues`);
      assert.ok(cue.endMs > cue.startMs && cue.endMs <= slide.durationMs, `${id} has speech outside its timeline`);
      previousCueEnd = cue.endMs;
    }
  }
});

test("the flywheels build one capability at a time and retain each revealed capability", () => {
  for (const id of ["blueprint-in-motion", "why-musk", "why-viral-fusion"]) {
    const slide = accelerationSlides[id];
    const revealed = new Set();
    const revealOrder = [];

    assert.deepEqual(slide.stages[0].activeNodeIds, [], `${id} should open before the capability build`);
    for (const stage of slide.stages) {
      const activeIds = stage.activeNodeIds ?? [];
      for (const nodeId of revealed) {
        assert.ok(activeIds.includes(nodeId), `${id}/${stage.id} loses a revealed capability`);
      }
      const additions = activeIds.filter((nodeId) => !revealed.has(nodeId));
      assert.ok(additions.length <= 1, `${id}/${stage.id} reveals multiple capabilities at once`);
      for (const nodeId of additions) {
        revealed.add(nodeId);
        revealOrder.push(nodeId);
      }
    }
    assert.deepEqual(revealOrder, slide.nodes.map((node) => node.id), `${id} does not complete the clockwise build`);
  }

  const title = accelerationSlides["acceleration-layer"];
  assert.equal(title.speakerCues.length, 0, "the chapter reveal must remain silent");
  assert.equal(title.stages[0].id, "black");
  assert.ok(title.stages[0].endMs >= 1000 && title.stages[0].endMs <= 2000);
  const muskBlack = accelerationSlides["why-musk"].stages.at(-1);
  assert.equal(muskBlack.id, "black");
  assert.ok(muskBlack.endMs - muskBlack.startMs >= 500 && muskBlack.endMs - muskBlack.startMs <= 1000);
});

test("the supplied Word documents' complete spoken scripts and speaker sequence are retained", () => {
  // Independently extracted from the source DOCX voiceover sections, excluding
  // speaker/performance directions and whitespace. Words and punctuation remain
  // exact, so line wrapping may change without silently dropping approved speech.
  const approvedScripts = {
    "blueprint-in-motion": { cues: 5, hash: "754912da146416b124e968984d472c82ca7dfac41a169071344f9bf36c3901a5" },
    "missing-variable": { cues: 6, hash: "0d82aa0f8183481377de6d8497a0ece2e7c97908b3a1ca7221c92cb5671486cc" },
    "why-musk": { cues: 5, hash: "bd58cbb0d6c8abce8e7041085d2b9852f0eee2e1db7abebc06250338c3663405" },
    "why-viral-fusion": { cues: 6, hash: "13bb012570d5605133fabb23a33d5fdbd1bea2df1e8954940649c83053b2adce" },
  };
  for (const [id, approved] of Object.entries(approvedScripts)) {
    const cues = accelerationSlides[id].speakerCues;
    assert.equal(cues.length, approved.cues, `${id} is missing a speech section`);
    assert.deepEqual(cues.map((cue) => cue.speaker), Array.from({ length: approved.cues }, (_, index) => index % 2 === 0 ? "NARRATOR" : "GEORGE"));
    const spokenText = cues.map((cue) => cue.text).join("").replace(/\s+/g, "");
    assert.equal(createHash("sha256").update(spokenText).digest("hex"), approved.hash, `${id} differs from its source voiceover`);
  }
});

test("every legacy guest retains the earlier master's four on-screen areas and matching record", () => {
  assert.deepEqual(configuredGuestSlideIds, legacyGuestSlideIds);
  assert.deepEqual(Object.keys(guestSlides).sort(), [...legacyGuestSlideIds].sort());

  for (const id of legacyGuestSlideIds) {
    const slide = guestSlides[id];
    assert.equal(slide.id, id);
    for (const field of ["name", "organization", "problem", "opportunity", "ask"]) {
      assert.ok(slide[field].trim().length > 0, `${id} is missing ${field}`);
    }
    assert.ok(slide.values.length > 0, `${id} is missing the value area`);
    assert.ok(slide.values.every((value) => value.trim().length > 0), `${id} contains an empty value`);
  }
});

test("all fourteen guests retain the locked master's exact on-screen copy", () => {
  // Independently extracted from THE PROBLEM / OPPORTUNITY / VALUE / ASK in
  // Viral_Fusion_Shawn_Ryan_Slides_36-49_Locked_Editor_Master.docx. Whitespace
  // and value-list wrapping may vary; approved wording and punctuation may not.
  const approvedScreenHashes = {
    "mo-gawdat": "3e3df0b71d5a69785df362efa5d8688c13e549957b81e111ff0088a58f5876cb",
    samsung: "c7ce962ecc88ce376c970962a049ea6b284e25492d1dd5a6237ddcdb38d75299",
    "charles-adkins": "0beccb8142575294c659238792fcde3832300aeb9d3002143e3c61d1be45ad63",
    "palmer-luckey": "e32cae3170fc608f84bc2ed50cdb816b6735179cdd52332b2418bd1734b3ba3e",
    ford: "d337214606598a44460a2deb1a45d64ed82ddad0adc442205f10602f71b2b52e",
    "lynsi-snyder": "eebd087113896977a775f16f4bb8f46658ce00e2f308bfd8b0fd83967e84f580",
    chevron: "dbafa321166bfe56437f89cb650ee47c02f05f0daa5a793ff0fcef3edfa30518",
    "x-energy": "da84797d36171ac78be99f13c84d647edb18e420bee5df82ca5471fa10c88672",
    "patrick-soon-shiong": "4a140b1899b55477bc8c8f8f5754b3ba446b2afaaf8276279e815c6f9652ecd7",
    "brandon-cuevas": "2c3484962621ac23bf1f25b52bee9032d86c59599c87e9f674aacaddd29b7fa3",
    "chad-bianco": "5a0b3aae399c71b8dce0e1f3884e1ed45176b66867c2a798150a9bb756536306",
    "steve-davis": "163e1d369e3f1988dc31b0d3f4d1798399392cbb501665b1c970d65e131d7bb5",
    "hedera-founders": "408d74c007864e02679c1d9737fe557968074d793b737440b0b73adeb95b26c5",
    "michele-chan": "52072499767be9bea765714ee7fcdd5f526705c74d4ba12274d4fcc2e111c7a4",
  };

  for (const [id, approvedHash] of Object.entries(approvedScreenHashes)) {
    const slide = guestSlides[id];
    const screenText = [slide.problem, slide.opportunity, ...slide.values, slide.ask].join("").replace(/\s+/g, "");
    assert.equal(createHash("sha256").update(screenText).digest("hex"), approvedHash, `${id} differs from the locked on-screen copy`);
  }
});

test("the locked guest scripts retain their complete speech and speaker order", () => {
  // Approved after auditing every source XML voiceover paragraph against the
  // speech and editor notes. Archival clip quotes, source labels and the
  // interstitial 'Slide 40' are editorial material rather than spoken copy.
  const approvedSpeechHashes = {
    "mo-gawdat": "66817cd91b321841e48af001fb881b967e04a7183284dc32050d6bfff375600c",
    samsung: "cee2daa63901eb737ae4f4e2dc706ac3fb9b43a7f10171c16edacb10af39f4be",
    "charles-adkins": "c46645eacdda7e555c4fca824a1596f5c753acd44e8badda561a5da908bcfbea",
    "palmer-luckey": "13473fc2ffb14fc7f0e1b42d3f73c5424cd08c752197bd235bf14a56cc36daf0",
    ford: "c7eb31b9604f568aa7c8ae3099f50a74d5546e9ff7035f1009524d9108a574e8",
    "lynsi-snyder": "60b6592e45c602e0659768e6466b215ebc0653df3073a00046306e06a33117b7",
    chevron: "bbf38429e911f43729b97d8bab3244da4b84f9a8f382ec2aeaa80b0ba0162084",
    "x-energy": "f5363bf531d4f8de176ec3160f1560b10a70cea5aba05fb231ccd5a833c095cd",
    "patrick-soon-shiong": "a6372333c018ec6cb3aae17946ee2c339cde982d9d1edab38d525524a9dce848",
    "brandon-cuevas": "f08b502c8f053815e6170dbade45be81e8be8ddcae4153b490c38501196327db",
    "chad-bianco": "289800f7b1a9a9cd99caa93b11e309d0773c4bb0870bcac9704bea032fb9ad3c",
    "steve-davis": "75fb1b8d33a15530602bcd749c4ebab933d6aea372adf1203e95e52e74a94b40",
    "hedera-founders": "47c68e011ec139945637241446e7c75f2c00a7035448b0b3fdd78294b2f825eb",
    "michele-chan": "0746b4e219536a45c459bb61f6dc11959447ce8618541186a70fb59a3540a59a",
  };

  assert.deepEqual(Object.keys(guestChapterNarration), legacyGuestSlideIds);
  legacyGuestSlideIds.forEach((id, index) => {
    const record = guestChapterNarration[id];
    assert.equal(record.sourceSlide, index + 36);
    assert.equal(record.sourceDocument, "Viral_Fusion_Shawn_Ryan_Slides_36-49_Locked_Editor_Master.docx");
    assert.ok(record.speakerCues.every((cue) => cue.text.trim().length > 0), `${id} has an empty speech cue`);
    const speech = record.speakerCues.map((cue) => `${cue.speaker}:${cue.text}`).join("").replace(/\s+/g, "");
    assert.equal(createHash("sha256").update(speech).digest("hex"), approvedSpeechHashes[id], `${id} differs from its audited source speech`);
    const displayedNarration = record.speakerCues.map((cue) => `[${cue.speaker}]${cue.performance ? ` (${cue.performance})` : ""}\n${cue.text}`).join("\n\n");
    assert.equal(record.narration, displayedNarration, `${id} displays different speech from its speaker cues`);
  });
  assert.equal(createHash("sha256").update(guestChapterTransition.replace(/\s+/g, "")).digest("hex"), "f8a0284b7d774eb2075027730a103318ccd9ee9b8784ed85316081f477a67577");
});

test("guest source media uses deliberate HTTPS playback without automatic audio", () => {
  for (const slide of Object.values(guestSlides)) {
    for (const media of slide.media) {
      assert.ok(media.label.trim().length > 0, `${slide.id} has unlabeled media`);
      assert.equal(new URL(media.url).protocol, "https:");
      if (media.embedUrl) {
        const embed = new URL(media.embedUrl);
        assert.equal(media.kind, "video");
        assert.equal(embed.protocol, "https:");
        assert.notEqual(embed.searchParams.get("autoplay"), "1");
      }
    }
  }
});

test("the revised production master retains all 15 sections and every original paragraph", () => {
  assert.equal(guestSeriesSourceDocument, "Viral_Fusion_Podcast_Series_Final_and_Technology_Architecture/Guest_Series_Jeetu.docx");
  assert.deepEqual(guestSeriesSourceSlides.map((slide) => slide.id), guestSeriesIds);
  assert.deepEqual(guestSeriesSourceSlides.map((slide) => slide.sourceSlide), Array.from({ length: 15 }, (_, index) => index + 36));
  assert.equal(guestSeriesSourceOverview.length, 18);

  // Independently extracted from word/document.xml, including empty paragraphs,
  // all speaker text, silent editor cues and the technical reference sections.
  const approvedParagraphs = {
    "mo-gawdat": [124, "987e3b5a59b928579d7fb4d7584cce1ecf986ca02894849c1c2b14c9a56a3132"],
    samsung: [96, "1865497ed2fa943e958ad4665e3290bc75029615bb6523c63b648cc42da4c498"],
    "charles-adkins": [385, "cfb6ab2c613685d70604560acbb8968f2e4ab404359d0993aec83a97695e7252"],
    "palmer-luckey": [154, "19723cfa42616192af8ecaee1763dd0ad72afbba6aeebe4804d7ccb51a005cfe"],
    ford: [145, "b065dd4bd930f28d680e6979244e830997dc620fbfd3b5227acbffd3d696e977"],
    "lynsi-snyder": [104, "fdbe80532dabf1f367c9b6f6f5cfdebe8aa1c1b39d922e04934788a5312f6eab"],
    chevron: [125, "3ccf504fe946af7ac30f6f442903893cbcaddcff0a0ca09bae485a6e254ded14"],
    "x-energy": [176, "03801ae9d7be4ea85964dacc1a4808c9b65785111fb06d39261e1dd97ab0af2c"],
    "patrick-soon-shiong": [239, "1bb051c26e088c5f8c6736762ef7f75254403e63a9e736657e5b23ead558e278"],
    "brandon-cuevas": [211, "c5ff41b4098fe201bdf03e5893251d3d05d344e8f6864658d49cd03c98e8c281"],
    "chad-bianco": [135, "dbd1f803a2198e38e232ce251cfc05dd271290d71f324f3b184e0a5c6191ff6f"],
    "spencer-pratt": [65, "519fcb0da79010d7af6a6e8953e397f8d47562c6d563751e27b35689ba9f7da1"],
    "steve-davis": [244, "e0761270f0de37b4cded3f0bf49698da4134569379694f7afcdb99141d42f178"],
    "hedera-founders": [313, "80bfbf704c27312bf73d2611e76c1207c9721eb9391023fef964e269e9c395d2"],
    "michele-chan": [276, "1f34686de7581c5979c06eb194c99d019b1e84106aed322cfcbded12495744e2"],
  };
  for (const slide of guestSeriesSourceSlides) {
    const [count, hash] = approvedParagraphs[slide.id];
    assert.equal(slide.sourceDocument, guestSeriesSourceDocument);
    assert.equal(slide.paragraphs.length, count, `${slide.id} lost source paragraphs`);
    assert.equal(createHash("sha256").update(slide.paragraphs.map((paragraph) => paragraph.text).join("\u001e")).digest("hex"), hash, `${slide.id} differs from the supplied production master`);
    assert.match(slide.paragraphs[0].text, new RegExp(`^SLIDE ${slide.sourceSlide} — `));
  }

  const allParagraphs = [...guestSeriesSourceOverview, ...guestSeriesSourceSlides.flatMap((slide) => slide.paragraphs)];
  assert.equal(allParagraphs.length, 2810);
  assert.deepEqual(allParagraphs.map((paragraph) => paragraph.sourceParagraph), Array.from({ length: 2810 }, (_, index) => index + 1));
  assert.equal(createHash("sha256").update(allParagraphs.map((paragraph) => paragraph.text).join("\u001e")).digest("hex"), "a1e4dbc7bee506a11ed50759cac156f4350517765f84e54871ca409fe6fbf544");
});

test("all revised guests have complete, usable scenes and valid footage references", () => {
  assert.deepEqual(configuredGuestSeriesIds, guestSeriesIds);
  assert.deepEqual(Object.keys(guestSeries), guestSeriesIds);
  assert.deepEqual(Object.keys(guestSeriesMedia).sort(), [...guestSeriesIds].sort());

  guestSeriesIds.forEach((id, index) => {
    const slide = guestSeries[id];
    assert.equal(slide.id, id);
    assert.equal(slide.number, index + 36);
    for (const field of ["name", "organization", "layer", "invitation"]) {
      assert.ok(slide[field].trim().length > 0, `${id} is missing ${field}`);
    }
    assert.ok(slide.scenes.length >= 3, `${id} needs a complete creative sequence`);
    for (const [sceneIndex, scene] of slide.scenes.entries()) {
      for (const field of ["label", "title", "body"]) {
        assert.ok(scene[field].trim().length > 0, `${id}/${sceneIndex} is missing ${field}`);
      }
      if (scene.words) assert.ok(scene.words.every((word) => word.trim().length > 0));
      if (scene.seconds !== undefined) assert.ok(Number.isFinite(scene.seconds) && scene.seconds > 0);
      if (scene.clip !== undefined) {
        assert.ok(Number.isInteger(scene.clip) && scene.clip >= 0 && scene.clip < guestSeriesMedia[id].length, `${id}/${sceneIndex} refers to missing footage`);
      }
    }
  });
});

test("revised trust and water demonstrations retain the production master's central concepts", () => {
  const visuals = (id) => guestSeries[id].scenes.map((scene) => scene.visual).filter(Boolean);
  for (const id of ["charles-adkins", "hedera-founders"]) {
    for (const visual of ["sovereign-core", "trust-layers", "proof-test"]) {
      assert.ok(visuals(id).includes(visual), `${id} is missing ${visual}`);
    }
  }
  for (const visual of ["water-recovery", "desalination", "water-feasibility", "freight"]) {
    assert.ok(visuals("steve-davis").includes(visual), `Steve's infrastructure sequence is missing ${visual}`);
  }
  assert.ok(guestSeries["hedera-founders"].scenes.some((scene) => scene.visual === "proof-test" && /conceptual simulation/i.test(scene.note ?? "")));
  assert.ok(guestSeries["steve-davis"].scenes.some((scene) => scene.visual === "water-recovery" && /exploratory engineering concept/i.test(scene.note ?? "")));
  assert.ok(visuals("michele-chan").includes("water-recovery"), "the immersive finale should reuse the water demonstration");
  assert.ok(visuals("spencer-pratt").includes("participation"));
  assert.ok(guestSeries["charles-adkins"].scenes.some((scene) => scene.feature === "state-precedents"));
  assert.ok(guestSeries["x-energy"].scenes.some((scene) => scene.feature === "xe-100"));
  assert.ok(visuals("ford").includes("parked-interface"));
  assert.ok(visuals("chevron").includes("policy-pathways"));
  assert.ok(visuals("michele-chan").includes("capability-network"));
});

test("revised footage preserves supplied sources, avoids invented playback and adds no narration audio", () => {
  const legacyUrls = new Set(Object.values(guestSlides).flatMap((slide) => slide.media.map((media) => media.url)));
  const suppliedFdaUrl = "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-expanded-indication-nogapendekin-alfa-inbakicept-pmln-bcg-unresponsive-non-muscle";
  const verifiedInitialFdaUrl = "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-nogapendekin-alfa-inbakicept-pmln-bcg-unresponsive-non-muscle-invasive-bladder-cancer";
  for (const id of guestSeriesIds) {
    assert.ok(!Object.keys(guestSeries[id]).some((key) => /audio|voiceover.*src|narration.*src/i.test(key)), `${id} must leave narration audio for later`);
    for (const media of guestSeriesMedia[id]) {
      assert.ok(media.label.trim().length > 0 && media.note?.trim().length > 0, `${id} needs usable editorial source information`);
      assert.ok(legacyUrls.has(media.url) || media.url === suppliedFdaUrl || media.url === verifiedInitialFdaUrl, `${id} introduces an unverified footage URL`);
      const sourceUrl = new URL(media.url);
      assert.equal(sourceUrl.protocol, "https:");
      assert.doesNotMatch(sourceUrl.pathname, /\.(?:mp3|wav|m4a|aac|ogg|flac)$/i, `${id} adds an audio asset`);
      assert.ok(["video", "source"].includes(media.kind));
      if (media.kind === "source") assert.equal(media.embedUrl, undefined, `${id} presents a written/reference source as playable footage`);
      if (media.embedUrl) {
        const embed = new URL(media.embedUrl);
        assert.equal(media.kind, "video");
        assert.equal(embed.protocol, "https:");
        assert.notEqual(embed.searchParams.get("autoplay"), "1");
        if (embed.searchParams.has("end")) {
          assert.ok(Number(embed.searchParams.get("end")) > Number(embed.searchParams.get("start") ?? 0), `${id} has an empty or reversed source window`);
        }
      }
    }
  }
  assert.equal(guestSeriesMedia["spencer-pratt"].length, 0, "Spencer footage still needs an authentic source asset");
  const fda = guestSeriesMedia["patrick-soon-shiong"].find((media) => media.url === suppliedFdaUrl);
  assert.equal(fda?.kind, "source");
});

test("Chad's revised presentation uses the focused cut and scene buttons select the intended excerpts", () => {
  const chadOpening = new URL(guestSeriesMedia["chad-bianco"][0].embedUrl);
  assert.equal(chadOpening.searchParams.get("start"), "223");
  assert.equal(chadOpening.searchParams.get("end"), "260");
  const chadFullSource = guestSeriesMedia["chad-bianco"].find((media) => /full source reference/i.test(media.label));
  assert.equal(chadFullSource?.kind, "source");
  assert.equal(chadFullSource?.embedUrl, undefined);

  const moCitizenScene = guestSeries["mo-gawdat"].scenes.find((scene) => scene.label === "Citizen control");
  assert.match(guestSeriesMedia["mo-gawdat"][moCitizenScene.clip].label, /intervene/i);
  const fordClosingScene = guestSeries.ford.scenes.find((scene) => scene.label === "The partnership");
  assert.match(guestSeriesMedia.ford[fordClosingScene.clip].label, /working together/i);
});

test("the investigation introduces the video, retains its recap, and closes before the solution", () => {
  assert.deepEqual(viralFusionDeck.slice(13, 22).map((slide) => slide.id), [
    "problems", "beneath-noise", "competition", "long-game", "technological-power",
    "networks", "global-incentives", "what-we-learned", "five-pillars",
  ]);
  assert.deepEqual(viralFusionDeck.slice(22, 27).map((slide) => slide.id), [
    "inspiration", "founder", "operating-system", "viral-fusion", "mission-vision",
  ]);
});

test("the playbook closes the investigation and the call to action is reachable", () => {
  assert.deepEqual(viralFusionDeck.slice(-5).map((slide) => slide.id), [
    "global-frameworks", "playbook", "project-2026", "purpose", "call-to-action",
  ]);
  assert.equal(slideIndex("what-if"), 33);
  assert.equal(slideIndex("podcast-strategy"), 34);
  assert.equal(slideIndex("mo-gawdat"), 35);
});

test("bookmarks follow slide identity after inserting and moving chapters", () => {
  const aliases = new Map([
    ["#problems", "problems"],
    ["#decks", "problems"],
    ["#presentation", "operating-system"],
    ["#global-opportunities", "operating-system"],
  ]);
  for (const [hash, id] of aliases) {
    assert.equal(pageFromHash(hash), slideIndex(id));
    assert.equal(namedHashMatchesSlide(hash, id), true);
    assert.equal(namedHashMatchesSlide(hash, "anniversary"), false);
  }
  for (const slide of viralFusionDeck) {
    assert.equal(pageFromHash(`#slide-${slide.id}`), slideIndex(slide.id));
    assert.equal(namedHashMatchesSlide(`#slide-${slide.id}`, slide.id), true);
  }
});

test("legacy Strategy Map and execution-priority bookmarks retain their standalone content", () => {
  for (const hash of ["#strategymap", "#slide-strategy-map"]) {
    assert.equal(standaloneSlideDestination(hash), "/strategymap#map");
    assert.equal(pageFromHash(hash), null);
  }
  assert.equal(standaloneSlideDestination("#slide-execution-priorities"), "/strategymap#intro");
  assert.equal(pageFromHash("#slide-execution-priorities"), null);
  for (const slide of viralFusionDeck) {
    assert.equal(standaloneSlideDestination(`#slide-${slide.id}`), null);
  }
  assert.equal(standaloneSlideDestination("#unrelated"), null);
});

test("numeric navigation clamps invalid boundaries and ignores unrelated hashes", () => {
  assert.equal(pageFromHash("#page-0"), 0);
  assert.equal(pageFromHash("#page-999"), viralFusionDeck.length - 1);
  assert.equal(pageFromHash("#page-34"), slideIndex("what-if"));
  assert.equal(pageFromHash("#page-36"), slideIndex("mo-gawdat"));
  assert.equal(pageFromHash("#page-46"), slideIndex("chad-bianco"));
  assert.equal(pageFromHash("#page-47"), slideIndex("spencer-pratt"));
  assert.equal(pageFromHash("#page-48"), slideIndex("steve-davis"));
  assert.equal(pageFromHash("#page-49"), slideIndex("hedera-founders"));
  assert.equal(pageFromHash("#page-50"), slideIndex("michele-chan"));
  assert.equal(pageFromHash("#page-51"), slideIndex("blueprint-in-motion"));
  assert.equal(pageFromHash("#page-55"), slideIndex("why-viral-fusion"));
  assert.equal(pageFromHash("#page-56"), slideIndex("two-flywheels"));
  assert.equal(pageFromHash("#page-57"), slideIndex("accumulated-execution"));
  assert.equal(pageFromHash("#page-58"), slideIndex("california-proof"));
  assert.equal(pageFromHash("#page-59"), slideIndex("black-swan"));
  assert.equal(pageFromHash("#page-68"), slideIndex("call-to-action"));
  assert.equal(pageFromHash("#unrelated"), null);
  assert.equal(pageFromHash("#page-nope"), null);
});
