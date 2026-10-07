import assert from "node:assert/strict";
import test from "node:test";
import { guestSlideIds as configuredGuestSlideIds, guestSlides } from "./guest-chapter.ts";
import { namedHashMatchesSlide, pageFromHash, slideIndex, viralFusionDeck } from "./viral-fusion-deck.ts";

// The 47-slide deck the user approved must remain present and in its original order.
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

const guestSlideIds = [
  "mo-gawdat", "samsung", "charles-adkins", "palmer-luckey", "ford", "lynsi-snyder",
  "chevron", "x-energy", "patrick-soon-shiong", "brandon-cuevas", "hedera-founders",
  "michele-chan", "chad-bianco",
];

test("all 47 existing slides survive the guest chapter in their original relative order", () => {
  const originalIds = new Set(existingSlideIds);
  const retainedIds = viralFusionDeck.filter((slide) => originalIds.has(slide.id)).map((slide) => slide.id);

  assert.deepEqual(retainedIds, existingSlideIds);
  assert.equal(viralFusionDeck.length, 59);
  assert.equal(new Set(viralFusionDeck.map((slide) => slide.id)).size, viralFusionDeck.length);
});

test("the complete guest chapter follows the podcast strategy and leads into Strategy Map", () => {
  const chapterStart = slideIndex("podcast-strategy") + 1;
  const chapterEnd = slideIndex("strategy-map");

  assert.equal(chapterStart, 35);
  assert.deepEqual(viralFusionDeck.slice(chapterStart, chapterEnd).map((slide) => slide.id), guestSlideIds);
  assert.equal(chapterEnd, 48);
  assert.equal(viralFusionDeck[chapterEnd - 1].id, "chad-bianco");
});

test("every guest has the document's four on-screen areas and a matching content record", () => {
  assert.deepEqual(configuredGuestSlideIds, guestSlideIds);
  assert.deepEqual(Object.keys(guestSlides).sort(), [...guestSlideIds].sort());

  for (const id of guestSlideIds) {
    const slide = guestSlides[id];
    assert.equal(slide.id, id);
    for (const field of ["name", "organization", "problem", "opportunity", "ask"]) {
      assert.ok(slide[field].trim().length > 0, `${id} is missing ${field}`);
    }
    assert.ok(slide.values.length > 0, `${id} is missing the value area`);
    assert.ok(slide.values.every((value) => value.trim().length > 0), `${id} contains an empty value`);
  }
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
  assert.equal(slideIndex("execution-priorities"), 33);
  assert.equal(slideIndex("podcast-strategy"), 34);
  assert.equal(slideIndex("mo-gawdat"), 35);
});

test("bookmarks follow slide identity after inserting and moving chapters", () => {
  const aliases = new Map([
    ["#problems", "problems"],
    ["#decks", "problems"],
    ["#strategymap", "strategy-map"],
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

test("numeric navigation clamps invalid boundaries and ignores unrelated hashes", () => {
  assert.equal(pageFromHash("#page-0"), 0);
  assert.equal(pageFromHash("#page-999"), viralFusionDeck.length - 1);
  assert.equal(pageFromHash("#page-34"), slideIndex("execution-priorities"));
  assert.equal(pageFromHash("#page-36"), slideIndex("mo-gawdat"));
  assert.equal(pageFromHash("#page-48"), slideIndex("chad-bianco"));
  assert.equal(pageFromHash("#page-49"), slideIndex("strategy-map"));
  assert.equal(pageFromHash("#page-59"), slideIndex("call-to-action"));
  assert.equal(pageFromHash("#unrelated"), null);
  assert.equal(pageFromHash("#page-nope"), null);
});
