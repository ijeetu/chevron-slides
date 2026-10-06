// Stable slide identities keep links and navigation aligned when chapters move.
export const viralFusionDeck = [
  { id: "anniversary", title: "1776 — 2026" },
  { id: "doge", title: "DOGE" },
  { id: "children", title: "The Children" },
  { id: "protect-children", title: "Protecting the Children" },
  { id: "accountability", title: "Absolute Accountability" },
  { id: "flag", title: "America" },
  { id: "all-a-lie", title: "It’s All a Lie" },
  { id: "hope", title: "The Future" },
  { id: "change", title: "Change Is Coming" },
  { id: "public-demand", title: "The People Demand Something Better" },
  { id: "america-first", title: "America First Blueprint" },
  { id: "promise", title: "The Promise" },
  { id: "agenda", title: "Our Agenda" },
  { id: "problems", title: "Problems — Insulation & Noise" },
  { id: "beneath-noise", title: "Beneath the Noise" },
  { id: "competition", title: "01 — The Competition for Power" },
  { id: "long-game", title: "02 — The Long Game" },
  { id: "technological-power", title: "02 — Technological Power" },
  { id: "networks", title: "03 — The Power of Networks" },
  { id: "global-incentives", title: "04 — Global Incentives" },
  { id: "what-we-learned", title: "Beneath the Noise — What We Learned" },
  { id: "five-pillars", title: "Five Pillars" },
  { id: "inspiration", title: "Inspiration" },
  { id: "founder", title: "Founder Principle" },
  { id: "operating-system", title: "Operating System" },
  { id: "viral-fusion", title: "Viral Fusion" },
  { id: "mission-vision", title: "Mission & Vision" },
  { id: "solving", title: "The Problems We’re Solving" },
  { id: "republic", title: "A Stronger Republic" },
  { id: "civic-os", title: "Civic Operating System" },
  { id: "physical-infrastructure", title: "Physical Infrastructure" },
  { id: "strategic-alliance", title: "The Strategic Alliance" },
  { id: "blueprint", title: "The Blueprint" },
  { id: "execution-priorities", title: "Three Execution Priorities" },
  { id: "podcast-strategy", title: "The Podcast Becomes the Strategy" },
  { id: "mo-gawdat", title: "Mo Gawdat" },
  { id: "strategy-map", title: "Strategy Map" },
  { id: "black-swan", title: "California Black Swan" },
  { id: "sustainability", title: "Sustainability Model" },
  { id: "legislation", title: "Legislative Examples" },
  { id: "musk-alliance", title: "The Musk Alliance" },
  { id: "technology-alliance", title: "The Technology Alliance" },
  { id: "global-frameworks", title: "Beneath the Noise — Global Frameworks" },
  { id: "playbook", title: "Our Playbook" },
  { id: "project-2026", title: "Project 2026" },
  { id: "purpose", title: "Living With Purpose" },
  { id: "call-to-action", title: "From Analysis to Execution" },
] as const;

export type ViralFusionSlideId = (typeof viralFusionDeck)[number]["id"];

export function slideIndex(id: ViralFusionSlideId) {
  return viralFusionDeck.findIndex((slide) => slide.id === id);
}

const aliases: Record<string, ViralFusionSlideId> = {
  "#problems": "problems",
  "#decks": "problems",
  "#presentation": "operating-system",
  "#global-opportunities": "operating-system",
  "#strategymap": "strategy-map",
};

export function pageFromHash(hash: string) {
  const id = aliases[hash] ?? hash.replace(/^#slide-/, "");
  const stablePage = viralFusionDeck.findIndex((slide) => slide.id === id);
  if (stablePage >= 0) return stablePage;

  const match = hash.match(/^#page-(\d+)$/);
  if (!match) return null;
  return Math.max(0, Math.min(Number(match[1]) - 1, viralFusionDeck.length - 1));
}

export function namedHashMatchesSlide(hash: string, id: ViralFusionSlideId) {
  return aliases[hash] === id || hash === `#slide-${id}`;
}
