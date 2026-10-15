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
  { id: "what-if", title: "What If? — A Podcast Execution Engine" },
  { id: "podcast-strategy", title: "The Podcast Becomes the Strategy" },
  { id: "mo-gawdat", title: "Mo Gawdat" },
  { id: "samsung", title: "Samsung — Physical AI" },
  { id: "charles-adkins", title: "Charles Adkins — The First Pressure Test" },
  { id: "palmer-luckey", title: "Palmer Luckey / Anduril" },
  { id: "ford", title: "Ford — Connected Vehicles & Consumer Agency" },
  { id: "lynsi-snyder", title: "Lynsi Snyder / In-N-Out" },
  { id: "chevron", title: "Chevron — Energy & Public Policy" },
  { id: "x-energy", title: "X-energy — Advanced Energy Deployment" },
  { id: "patrick-soon-shiong", title: "Dr. Patrick Soon-Shiong" },
  { id: "brandon-cuevas", title: "Brandon Cuevas — Healthcare Economics" },
  { id: "chad-bianco", title: "Sheriff Chad Bianco — Public Safety & Legislative Action" },
  { id: "steve-davis", title: "Steve Davis / The Boring Company" },
  { id: "hedera-founders", title: "Mance Harmon & Dr. Leemon Baird" },
  { id: "michele-chan", title: "Michele B. Chan — The Execution Engine" },
  { id: "blueprint-in-motion", title: "The Blueprint in Motion" },
  { id: "missing-variable", title: "The Missing Variable" },
  { id: "acceleration-layer", title: "The Acceleration Layer" },
  { id: "why-musk", title: "Why Musk" },
  { id: "why-viral-fusion", title: "Why Viral Fusion" },
  { id: "two-flywheels", title: "Two Flywheels" },
  { id: "accumulated-execution", title: "The Moat — Accumulated Execution" },
  { id: "california-proof", title: "California — Prove It Here" },
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
};

// The locked presentation retires these slides from its running order while
// retaining their content on the existing standalone Strategy Map page.
export function standaloneSlideDestination(hash: string) {
  if (hash === "#strategymap" || hash === "#slide-strategy-map") return "/strategymap#map";
  if (hash === "#slide-execution-priorities") return "/strategymap#intro";
  return null;
}

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
