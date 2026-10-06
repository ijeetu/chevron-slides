import assert from "node:assert/strict";
import test from "node:test";
import { namedHashMatchesSlide, pageFromHash, slideIndex, viralFusionDeck } from "./viral-fusion-deck.ts";

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
  assert.equal(new Set(viralFusionDeck.map((slide) => slide.id)).size, viralFusionDeck.length);
});

test("bookmarks follow slide identity after inserting and moving chapters", () => {
  assert.equal(pageFromHash("#problems"), slideIndex("problems"));
  assert.equal(pageFromHash("#strategymap"), slideIndex("strategy-map"));
  assert.equal(pageFromHash("#presentation"), slideIndex("operating-system"));
  for (const slide of viralFusionDeck) {
    assert.equal(pageFromHash(`#slide-${slide.id}`), slideIndex(slide.id));
    assert.equal(namedHashMatchesSlide(`#slide-${slide.id}`, slide.id), true);
  }
});

test("numeric navigation clamps invalid boundaries and ignores unrelated hashes", () => {
  assert.equal(pageFromHash("#page-0"), 0);
  assert.equal(pageFromHash("#page-999"), viralFusionDeck.length - 1);
  assert.equal(pageFromHash("#page-34"), slideIndex("execution-priorities"));
  assert.equal(pageFromHash("#unrelated"), null);
  assert.equal(pageFromHash("#page-nope"), null);
});
