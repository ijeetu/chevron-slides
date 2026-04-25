import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BarChart3, Map, Presentation } from "lucide-react";

type Deck = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  iconTone: string;
};

const decks: Deck[] = [
  {
    title: "Problems & Opportunities",
    description: "Problem framing and opportunity sizing for the TAM narrative.",
    href: "/tam",
    icon: BarChart3,
    tone:
      "bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(241,236,225,0.88))] hover:border-[#c9bb9a]/85 hover:shadow-[0_24px_55px_rgba(108,89,52,0.14)]",
    iconTone:
      "bg-[linear-gradient(145deg,rgba(245,239,227,0.98),rgba(230,216,187,0.94))] text-[#6c5835] border-[#cbbd9f]/50",
  },
  {
    title: "Core Presentation",
    description: "Main deck covering the core strategic initiatives and market analysis.",
    href: "/presentation",
    icon: Presentation,
    tone:
      "bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(228,235,244,0.9))] hover:border-[#94aac2]/85 hover:shadow-[0_24px_60px_rgba(59,88,129,0.16)]",
    iconTone:
      "bg-[linear-gradient(145deg,rgba(233,240,247,0.98),rgba(189,205,223,0.94))] text-[#37567b] border-[#98aec4]/50",
  },
  {
    title: "Strategy Map",
    description: "Visual map of the strategic alliances and partnerships.",
    href: "/strategymap",
    icon: Map,
    tone:
      "bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(231,238,235,0.9))] hover:border-[#a8b9b3]/85 hover:shadow-[0_24px_55px_rgba(66,97,89,0.14)]",
    iconTone:
      "bg-[linear-gradient(145deg,rgba(233,241,238,0.98),rgba(194,211,205,0.94))] text-[#476961] border-[#adc0b8]/50",
  },
];

function DeckCard({ deck }: { deck: Deck }) {
  const Icon = deck.icon;

  return (
    <Link
      href={deck.href}
      className={`group relative flex min-h-[19rem] flex-col overflow-hidden rounded-[1.9rem] border border-white/75 p-7 transition-all duration-300 ease-out hover:-translate-y-1 ${deck.tone}`}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-20 bg-gradient-to-r from-white/60 via-white/20 to-transparent blur-2xl" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-[1.75rem] leading-[0.95] text-ink">
              {deck.title}
            </h2>
          </div>

          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_10px_24px_rgba(17,22,28,0.07)] ${deck.iconTone}`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.9} />
          </div>
        </div>

        <p className="mt-6 max-w-sm text-[0.94rem] leading-7 text-graphite">
          {deck.description}
        </p>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between rounded-[1.25rem] border border-white/70 bg-white/55 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm transition-all duration-300 group-hover:bg-white/72">
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-graphite">
              Open deck
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function LibraryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(149,174,201,0.24),transparent_66%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[10rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(208,196,169,0.18),transparent_66%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-6xl leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
            Viral Fusion
          </h1>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {decks.map((deck) => (
            <DeckCard key={deck.href} deck={deck} />
          ))}
        </section>
      </main>
    </div>
  );
}
