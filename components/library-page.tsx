"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Map,
  NotebookText,
  Pause,
  Play,
  Presentation,
  TrendingUp,
  Volume2,
  X,
} from "lucide-react";

type Deck = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  iconTone: string;
  placementClass?: string;
};

type ManifestoStatement = {
  text: string;
};

type FoundingFather = {
  name: string;
  imageSrc: string;
  accentClass: string;
};

type PromiseItem = {
  title: string;
};

const deckPages: Deck[][] = [
  [
    {
      title: "Problems",
      description: "Opportunity for the TAM Narrative",
      href: "/tam",
      icon: BarChart3,
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(241,236,225,0.88))] hover:border-[#c9bb9a]/85 hover:shadow-[0_24px_55px_rgba(108,89,52,0.14)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(245,239,227,0.98),rgba(230,216,187,0.94))] text-[#6c5835] border-[#cbbd9f]/50",
    },
    {
      title: "Core Presentation",
      description: "Vision Video and Strategic Initiatives",
      href: "/presentation",
      icon: Presentation,
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(228,235,244,0.9))] hover:border-[#94aac2]/85 hover:shadow-[0_24px_60px_rgba(59,88,129,0.16)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(233,240,247,0.98),rgba(189,205,223,0.94))] text-[#37567b] border-[#98aec4]/50",
    },
    {
      title: "Global Opportunities",
      description: "TAM (Total Available Market)",
      href: "/presentation/global-opportunities",
      icon: Globe2,
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(221,238,233,0.96))] hover:border-[#6fa391]/85 hover:shadow-[0_24px_60px_rgba(42,109,88,0.18)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(236,248,244,0.98),rgba(162,208,191,0.96))] text-[#24584b] border-[#7fb19e]/55",
    },
  ],
  [
    {
      title: "Strategy Map",
      description: "Strategic Alliance and Partnership Landscape",
      href: "/strategymap",
      icon: Map,
      placementClass: "xl:col-start-2 xl:col-span-2",
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(231,238,235,0.9))] hover:border-[#a8b9b3]/85 hover:shadow-[0_24px_55px_rgba(66,97,89,0.14)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(233,241,238,0.98),rgba(194,211,205,0.94))] text-[#476961] border-[#adc0b8]/50",
    },
    {
      title: "Driven to win",
      description: "Purpose fuels performance",
      href: "/presentation/tam",
      icon: TrendingUp,
      placementClass: "xl:col-start-4 xl:col-span-2",
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.97),rgba(248,228,218,0.95))] hover:border-[#d18a66]/85 hover:shadow-[0_24px_60px_rgba(154,88,44,0.18)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(252,240,234,0.98),rgba(238,182,145,0.95))] text-[#8f4c24] border-[#db9a73]/55",
    },
  ],
];

const deckPageHashes: Record<string, number> = {
  "#problems": 12,
  "#decks": 12,
  "#presentation": 12,
  "#global-opportunities": 12,
  "#strategymap": 16,
  "#driven-to-win": 16,
};

function getPageFromHash(hash: string, totalPages: number) {
  const mappedPage = deckPageHashes[hash];

  if (typeof mappedPage === "number") {
    return Math.max(0, Math.min(mappedPage, totalPages - 1));
  }

  const match = hash.match(/^#page-(\d+)$/);

  if (!match) {
    return null;
  }

  return Math.max(0, Math.min(Number(match[1]) - 1, totalPages - 1));
}

function namedHashMatchesPage(hash: string, page: number) {
  return deckPageHashes[hash] === page;
}

const manifestoStatements: ManifestoStatement[] = [
  {
    text: "While others talk about America First, we built the code, mapped the strategy, and created a blueprint that can be replicated globally.",
  },
];

function ManifestoStatementText() {
  return (
    <>
      While others talk about America First, we built the code, mapped the strategy,
      and created a blueprint that can be replicated globally.
    </>
  );
}

const foundingFathers: FoundingFather[] = [
  {
    name: "George Washington",
    imageSrc: "/founding-fathers/george-washington.jpg",
    accentClass: "from-[#123a82]/92 via-[#244f9b]/78 to-[#c9d8ff]/18",
  },
  {
    name: "Thomas Jefferson",
    imageSrc: "/founding-fathers/thomas-jefferson.jpg",
    accentClass: "from-[#7e1425]/92 via-[#b92c42]/76 to-[#ffd0d6]/18",
  },
];

const openingQuestions = [
  "\"It's challenging to feel hopeful about the future.\"",
  "\"The Goal Isn't to Catch Fraud Faster. The Goal Is to Make Fraud Physically Impossible.\"",
  "A Republic Without Absolute Accountability Is Already in Decay.",
] as const;

const promiseItems: PromiseItem[] = [
  {
    title: "Defend Sovereignty",
  },
  {
    title: "Enforce Accountability",
  },
  {
    title: "Secure the Future",
  },
];

const promiseNotes = [
  "You have interviewed countless people on this show and uncovered massive problems. I know your audience is looking for a genuine spark of hope.",
  "I want your viewers, your guests, and your supporters to know one thing: Right now, there are people building real solutions. People who care deeply about humanity, about our sovereignty, and about the future of our families.",
  "If your community stands with the efforts we are launching today, we will achieve what no previous representatives ever could:",
  "We will Defend Sovereignty by passing historic legislation.",
  "We will Enforce Accountability and hold those responsible for their crimes.",
  "And we will Secure the Future to protect our children.",
  "Today, I am going to lay out exactly what is possible when you hand the right tools to the few who are willing to fight.",
  "My promise to you-and to everyone watching-is that together, we will change the world.",
] as const;

const agendaItems = [
  "Problems & Opportunities",
  "Viral Fusion Vision Intro",
  "Deck",
  "Future Outlook",
  "X-POLL",
  "Global Opportunities",
  "Strategy Map",
  "Driven to Win",
] as const;

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function DeckCard({ deck }: { deck: Deck }) {
  const Icon = deck.icon;

  return (
    <Link
      href={deck.href}
      className={`group relative flex min-h-[17.25rem] flex-col overflow-hidden rounded-[1.9rem] border border-white/75 p-6 transition-all duration-300 ease-out hover:-translate-y-1 xl:col-span-2 ${deck.placementClass ?? ""} ${deck.tone}`}
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

        <p className="mt-5 max-w-sm text-[0.92rem] leading-6 text-graphite">
          {deck.description}
        </p>

        <div className="mt-auto w-full pt-6">
          <div className="flex items-center justify-between rounded-[1.25rem] border border-white/70 bg-white/55 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm transition-all duration-300 group-hover:bg-white/72">
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-graphite">
              OPEN DECK
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

function FoundersCtaCard({ statement }: { statement: ManifestoStatement }) {
  return (
    <article className="relative overflow-hidden rounded-[2.4rem] border border-[#ebd7a8]/70 bg-[linear-gradient(145deg,#efe2b9,#b68d3d)] p-[1px] shadow-[0_28px_80px_rgba(19,38,74,0.28)]">
      <div className="relative overflow-hidden rounded-[calc(2.4rem-1px)] bg-[#f7f2e9] px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
        <Image
          src="/american-flag-ai-generated_268835-11226.avif"
          alt="American flag background"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,44,0.42),rgba(7,20,44,0.12)_24%,rgba(246,241,232,0.66)_38%,rgba(248,244,236,0.84)_50%,rgba(246,241,232,0.66)_62%,rgba(9,24,48,0.12)_76%,rgba(9,24,48,0.4))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.28),transparent_16%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.16),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_28%,rgba(8,15,29,0.18)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.12)_46%,rgba(255,255,255,0)_60%,rgba(9,17,32,0.18)_100%)] mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(120%_75%_at_50%_-10%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(120%_95%_at_50%_110%,rgba(7,14,27,0.16),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-[29%] hidden w-px bg-white/18 xl:block" />
        <div className="pointer-events-none absolute inset-y-0 right-[29%] hidden w-px bg-[#173f8e]/10 xl:block" />

        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,17rem)_1fr_minmax(0,17rem)] xl:items-center">
          {foundingFathers.map((father, index) => (
            <aside
              key={father.name}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-white/18 bg-[rgba(7,19,42,0.16)] shadow-[0_20px_44px_rgba(7,19,42,0.2)] ${
                index === 0 ? "xl:order-1" : "xl:order-3"
              }`}
            >
              <div className="relative h-[16rem] sm:h-[18rem] xl:h-[20rem]">
                <Image
                  src={father.imageSrc}
                  alt={father.name}
                  fill
                  sizes="(min-width: 1280px) 17rem, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.06),rgba(8,17,34,0.38)_46%,rgba(5,10,20,0.88)_100%)]`}
                />
                <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${father.accentClass}`} />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-10 text-center text-white">
                  <p className="font-display text-[1.55rem] leading-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]">
                    {father.name}
                  </p>
                </div>
              </div>
            </aside>
          ))}

          <div className="relative overflow-hidden rounded-[2rem] border border-[#d7bc7d]/55 bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(247,241,227,0.93)_56%,rgba(234,241,255,0.94)_100%)] px-6 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_24px_60px_rgba(17,22,28,0.12)] sm:px-8 md:px-10 md:py-8 xl:order-2">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-20 bg-gradient-to-r from-transparent via-white/85 to-transparent blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-7 h-16 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0))] blur-xl" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              <p className="max-w-3xl font-display text-[1.9rem] leading-[1.12] text-ink sm:text-[2.25rem] md:text-[2.7rem]">
                <ManifestoStatementText />
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function QuestionSlide({
  question,
}: {
  question: ReactNode;
}) {
  return (
    <section className="relative flex min-h-full flex-col items-center justify-center px-[5%] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <article className="relative overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.96),rgba(20,35,48,0.98)_48%,rgba(14,27,39,0.98))] px-8 py-10 shadow-[0_34px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-12 sm:py-12">
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff]/85 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(1,199,243,0.17),transparent_42%),linear-gradient(115deg,rgba(255,255,255,0.045),transparent_28%,transparent_72%,rgba(1,199,243,0.04))]" />
          <div className="pointer-events-none absolute -left-px top-10 h-16 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/50 to-transparent" />
          <div className="pointer-events-none absolute -right-px bottom-10 h-16 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />
          <p className="relative text-center font-display text-[2rem] leading-[1.12] text-[#b9f2ff] sm:text-[2.65rem]">
            {question}
          </p>
        </article>
      </div>
    </section>
  );
}

function YearIntroSlide() {
  return (
    <section className="relative flex min-h-full flex-col items-center justify-center px-[5%] py-10">
      <div
        className="pointer-events-none absolute left-[-8.35rem] top-1/2 hidden w-32 -translate-y-1/2 flex-col items-center xl:flex"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-8 h-[calc(100%-6rem)] w-[4px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(122,154,219,0.08),#6b93e1_16%,#456dc2_84%,rgba(122,154,219,0.08))]" />
        <div className="relative z-10 flex h-[7.6rem] w-[7.6rem] items-center justify-center">
          <div className="absolute -inset-[5px] rounded-full border border-[#2a54a4]/18" />
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(155deg,#6f98e8_0%,#3f6fc8_55%,#2a54a4_100%)] shadow-[0_16px_38px_rgba(47,92,174,0.22)]" />
          <div className="absolute inset-[4px] rounded-full border border-white/18 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.28),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]" />
          <div className="relative flex h-[6rem] w-[6rem] items-center justify-center rounded-full border border-[#24488f]/55 bg-[radial-gradient(circle_at_50%_28%,#95b7f3_0%,#6f96e6_36%,#4472cb_72%,#345db1_100%)] px-3 text-center">
            <p className="whitespace-pre-line text-[0.82rem] font-semibold uppercase leading-[1.06] tracking-[0.03em] text-[#08111c]">
              LET&apos;S
              <br />
              BEGIN
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <article className="relative overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.96),rgba(20,35,48,0.98)_48%,rgba(14,27,39,0.98))] px-8 py-16 shadow-[0_34px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-12 sm:py-20">
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff]/85 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(1,199,243,0.17),transparent_42%),linear-gradient(115deg,rgba(255,255,255,0.045),transparent_28%,transparent_72%,rgba(1,199,243,0.04))]" />
          <div className="pointer-events-none absolute -left-px top-10 h-16 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/50 to-transparent" />
          <div className="pointer-events-none absolute -right-px bottom-10 h-16 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="font-display text-[5.5rem] font-black leading-none tracking-[0.06em] text-[#f4f2ec] sm:text-[7rem] lg:text-[8.5rem]">
              2026
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function DogeQuestionSlide() {
  return (
    <section className="relative flex min-h-full flex-col items-center justify-center px-[5%] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <article className="relative overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.96),rgba(20,35,48,0.98)_48%,rgba(14,27,39,0.98))] px-8 py-10 shadow-[0_34px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-12 sm:py-12">
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff]/85 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(1,199,243,0.17),transparent_42%),linear-gradient(115deg,rgba(255,255,255,0.045),transparent_28%,transparent_72%,rgba(1,199,243,0.04))]" />
          <div className="pointer-events-none absolute -left-px top-10 h-16 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/50 to-transparent" />
          <div className="pointer-events-none absolute -right-px bottom-10 h-16 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="font-display text-[5.5rem] font-black leading-none tracking-[0.04em] text-[#f4f2ec] sm:text-[7rem]">
              DOGE
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function FullScreenFlagSlide({ src }: { src: string }) {
  return (
    <section className="fixed inset-0 z-0 bg-black">
      <video
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
      />
    </section>
  );
}

function BlackSwanSlide() {
  return (
    <section className="flex min-h-full items-center justify-center py-0">
      <Image
        src="/swanblack.webp"
        alt="Black Swan"
        width={1586}
        height={992}
        sizes="96vw"
        className="mx-auto max-h-[78vh] w-auto max-w-[94vw] rounded-[2rem] border border-white/30 object-contain shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
      />
    </section>
  );
}

function GirlPage() {
  return (
    <section className="flex min-h-full flex-col items-center py-8">
      <article className="flex min-h-0 w-full max-w-7xl flex-1 overflow-hidden rounded-[2rem] border-[5px] border-[#01c7f3] bg-white/92 shadow-[0_0_0_2px_rgba(185,242,255,0.34),0_28px_80px_rgba(1,84,142,0.32)]">
        <div className="relative w-full">
          <Image
            src="/girlchild.webp"
            alt="Portrait of a young girl"
            fill
            sizes="(min-width: 1280px) 80vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.08),rgba(8,17,34,0.22)_46%,rgba(5,10,20,0.78)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-7 pt-16 text-center sm:px-8 sm:pb-9">
            <p className="font-display text-[2.3rem] leading-[1.15] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] sm:text-[3.1rem]">
              Good intentions do not stop predators.
              <br />
              Only uncompromising laws will.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function MagaPage() {
  return (
    <section className="flex min-h-full flex-col items-center py-8">
      <article className="flex min-h-0 w-full max-w-7xl flex-1 overflow-hidden rounded-[2rem] border-[5px] border-[#01c7f3] bg-white/92 shadow-[0_0_0_2px_rgba(185,242,255,0.34),0_28px_80px_rgba(1,84,142,0.32)]">
        <div className="relative w-full">
          <Image
            src="/maga.png"
            alt="Creative showing the division between MAGA and the Democratic Party"
            fill
            sizes="(min-width: 1280px) 80vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.1),rgba(8,17,34,0.18)_38%,rgba(5,10,20,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-7 pt-16 text-center sm:px-8 sm:pb-9">
            <p className="font-display text-[2.3rem] leading-[1.15] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] sm:text-[3.1rem]">
              The people demand something better.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function ManifestoStatementsPage() {
  return (
    <QuestionSlide question={<ManifestoStatementText />} />
  );
}

function PromisePage() {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <section className="flex min-h-full flex-col justify-center py-6">
      <header className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-6xl font-semibold leading-[0.92] text-[#f4f2ec] sm:text-7xl lg:text-[5.6rem]">
          The Promise
        </h1>
        <div className="mx-auto mt-6 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
      </header>

      <article className="relative mx-auto mt-8 w-full max-w-7xl overflow-hidden rounded-[2.35rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.96),rgba(20,35,48,0.98)_46%,rgba(14,27,39,0.98))] shadow-[0_38px_100px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(143,168,189,0.14),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(1,199,243,0.11),transparent_30%),linear-gradient(115deg,rgba(255,255,255,0.04),transparent_28%,transparent_72%,rgba(1,199,243,0.035))]" />
        <div className="pointer-events-none absolute inset-x-20 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.88),transparent)]" />
        <div className="pointer-events-none absolute inset-x-28 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,168,189,0.32),transparent)]" />
        <div className="pointer-events-none absolute -left-px top-16 h-24 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/42 to-transparent" />
        <div className="pointer-events-none absolute -right-px bottom-16 h-24 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />

        <div className="relative grid md:grid-cols-3">
          {promiseItems.map((item, index) => {
            return (
              <section
                key={item.title}
                className={`relative flex min-h-[14.5rem] flex-col justify-between px-6 py-6 sm:px-8 sm:py-7 lg:px-10 ${
                  index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
                }`}
              >
                <div className="flex items-start justify-end">
                  <span className="font-display text-4xl leading-none text-[#8fa8bd]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-6 max-w-sm">
                  <h2 className="font-display text-[2.2rem] font-semibold leading-[0.98] text-[#f4f2ec] sm:text-[2.55rem] lg:text-[2.85rem]">
                    {item.title}
                  </h2>
                </div>
              </section>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={showNotes ? "Hide Promise notes" : "Show Promise notes"}
          title={showNotes ? "Hide notes" : "Show notes"}
          onClick={() => setShowNotes((value) => !value)}
          className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#01c7f3]/60 bg-[#0f1d2a]/88 text-[#b9f2ff] shadow-[0_14px_34px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-0.5 hover:border-[#01c7f3]"
        >
          {showNotes ? <X size={18} strokeWidth={2.2} /> : <NotebookText size={18} strokeWidth={2.1} />}
        </button>

        {showNotes ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b12]/64 px-5 py-8 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Promise notes"
          >
            <div className="relative max-h-[82vh] w-full max-w-4xl overflow-hidden rounded-[1.4rem] border border-[#01c7f3]/55 bg-[#0d1823] shadow-[0_34px_100px_rgba(0,0,0,0.48)]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8ecfe1]">
                    Updated Script
                  </p>
                  <p className="mt-1 text-sm text-[#d8edf6]/72">
                    George speaks to the host and camera
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close Promise notes"
                  onClick={() => setShowNotes(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#d8edf6] transition-colors hover:border-[#01c7f3]/60 hover:text-[#b9f2ff]"
                >
                  <X size={17} strokeWidth={2.2} />
                </button>
              </div>
              <div className="max-h-[calc(82vh-4.5rem)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <div className="space-y-4">
                  {promiseNotes.map((note) => (
                    <p
                      key={note}
                      className="text-[1rem] leading-7 text-[#d8edf6] sm:text-[1.12rem] sm:leading-8"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}

function PlaceholderCtaPage() {
  return (
    <section className="flex min-h-full items-center justify-center py-8">
      <article className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(230,236,243,0.9))] px-8 py-12 text-center shadow-[0_24px_60px_rgba(59,88,129,0.14)] sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 bg-gradient-to-r from-transparent via-white/65 to-transparent blur-2xl" />
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-graphite">
          CTA
        </p>
        <h2 className="mt-5 font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
          Call to action
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-graphite sm:text-lg">
          We will add content here later.
        </p>
      </article>
    </section>
  );
}

function AgendaPage() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center py-8 text-center">
      <header className="mx-auto max-w-3xl">
        <h1 className="font-display text-6xl font-semibold leading-[0.92] text-[#f4f2ec] sm:text-7xl lg:text-[5.6rem]">
          Agenda
        </h1>
        <div className="mx-auto mt-6 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
      </header>

      <div className="relative mt-10 w-full max-w-4xl overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.94),rgba(20,35,48,0.97)_50%,rgba(14,27,39,0.97))] px-7 py-8 text-left shadow-[0_34px_90px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(1,199,243,0.15),transparent_45%),linear-gradient(115deg,rgba(255,255,255,0.04),transparent_30%,transparent_70%,rgba(1,199,243,0.035))]" />
        <div className="pointer-events-none absolute inset-x-20 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.82),transparent)]" />
        <div className="pointer-events-none absolute -left-px top-8 h-16 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/42 to-transparent" />
        <div className="pointer-events-none absolute -right-px bottom-8 h-16 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.26em] text-[#8ecfe1]">
            TAM
          </p>
          <ol className="mt-6 space-y-3">
            {agendaItems.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
              >
                <span className="text-right text-[0.74rem] font-semibold text-[#6f8798]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl leading-none text-[#f4f2ec] sm:text-[1.85rem]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionTitleSlide({
  title,
  voiceoverSrc,
}: {
  title: string;
  voiceoverSrc?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleVoiceover = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seekVoiceover = (value: string) => {
    const audio = audioRef.current;
    const nextTime = Number(value);

    if (!audio || !Number.isFinite(nextTime)) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <section className="flex min-h-full flex-col justify-center py-6">
      <header className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-6xl font-semibold leading-[0.92] text-[#f4f2ec] sm:text-7xl lg:text-[5.6rem]">
          {title}
        </h1>
        <div className="mx-auto mt-6 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />

        {voiceoverSrc ? (
          <div className="mx-auto mt-9 w-full max-w-xl">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-[#01c7f3]/45 bg-[linear-gradient(145deg,rgba(15,29,42,0.92),rgba(10,20,31,0.96))] p-4 text-left shadow-[0_18px_48px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm sm:p-5">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.9),transparent)]" />
              <div className="relative flex items-center gap-4">
                <button
                  type="button"
                  aria-label={isPlaying ? "Pause manifesto preview" : "Play manifesto preview"}
                  onClick={toggleVoiceover}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#01c7f3]/65 bg-[#15283a] text-[#b9f2ff] shadow-[0_14px_34px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-0.5 hover:border-[#01c7f3] hover:bg-[#1a3349]"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" strokeWidth={2.4} />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5" strokeWidth={2.4} />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8ecfe1]">
                        Manifesto Preview
                      </p>
                      <p className="mt-1 truncate font-display text-[1.35rem] leading-none text-[#f4f2ec]">
                        Project 2026
                      </p>
                    </div>
                    <Volume2 className="hidden h-5 w-5 shrink-0 text-[#8fa8bd] sm:block" strokeWidth={2.1} />
                  </div>

                  <div className="mt-4">
                    <input
                      type="range"
                      aria-label="Manifesto preview progress"
                      min="0"
                      max={duration || 0}
                      step="0.1"
                      value={Math.min(currentTime, duration || currentTime)}
                      onChange={(event) => seekVoiceover(event.target.value)}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#274257] accent-[#01c7f3]"
                    />
                    <div className="mt-2 flex items-center justify-between font-mono text-[0.72rem] text-[#8fa8bd]">
                      <span>{formatAudioTime(currentTime)}</span>
                      <span>{formatAudioTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={voiceoverSrc}
              preload="metadata"
              onDurationChange={(event) => setDuration(event.currentTarget.duration)}
              onEnded={() => {
                setIsPlaying(false);
                setCurrentTime(0);
              }}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            />
          </div>
        ) : null}
      </header>
    </section>
  );
}

export function LibraryPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasResolvedInitialHash, setHasResolvedInitialHash] = useState(false);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const totalPages = deckPages.length + 17;
  const isCameraOpeningSlide =
    currentPage <= 6 ||
    (currentPage >= 9 && currentPage <= 11) ||
    (currentPage >= 13 && currentPage <= 15) ||
    currentPage === 17;

  useEffect(() => {
    const applyHashPage = () => {
      const page = getPageFromHash(window.location.hash, totalPages);

      if (typeof page === "number") {
        setCurrentPage(page);
      }

      setHasResolvedInitialHash(true);
    };

    applyHashPage();
    window.addEventListener("hashchange", applyHashPage);
    return () => window.removeEventListener("hashchange", applyHashPage);
  }, [totalPages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        setCurrentPage((page) => Math.min(page + 1, totalPages - 1));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setCurrentPage((page) => Math.max(page - 1, 0));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [totalPages]);

  useEffect(() => {
    pageContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    if (!hasResolvedInitialHash) {
      return;
    }

    const nextHash = `#page-${currentPage + 1}`;

    if (namedHashMatchesPage(window.location.hash, currentPage)) {
      return;
    }

    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [currentPage, hasResolvedInitialHash]);

  useEffect(() => {
    document.documentElement.dataset.resourcesTone = isCameraOpeningSlide
      ? "dark"
      : "light";

    return () => {
      delete document.documentElement.dataset.resourcesTone;
    };
  }, [isCameraOpeningSlide]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isCameraOpeningSlide
          ? "bg-[radial-gradient(circle_at_50%_-10%,rgba(49,76,99,0.58),transparent_42%),linear-gradient(145deg,#101b26_0%,#142330_48%,#0e1822_100%)]"
          : "bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 [background-position:center_center] [background-size:28px_28px] ${
          isCameraOpeningSlide
            ? "opacity-20 [background-image:linear-gradient(rgba(184,203,218,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,203,218,0.08)_1px,transparent_1px)]"
            : "opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 ${
          isCameraOpeningSlide
            ? "bg-[linear-gradient(180deg,rgba(143,168,189,0.08),transparent)]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 ${
          isCameraOpeningSlide
            ? "bg-[linear-gradient(0deg,rgba(0,0,0,0.16),transparent)]"
            : "bg-[linear-gradient(0deg,rgba(92,108,123,0.08),transparent)]"
        }`}
      />

      <main className="relative z-10 mx-auto flex h-[100dvh] w-[90%] max-w-none flex-col px-6 py-10 sm:px-10 lg:px-14">
        <div
          ref={pageContainerRef}
          className="presentation-scroll min-h-0 flex-1 overflow-y-auto pb-24 pt-24 pr-1 md:pb-28 md:pt-28 md:pr-2"
        >
          {currentPage === 0 ? (
            <YearIntroSlide />
          ) : currentPage === 1 ? (
            <QuestionSlide question={openingQuestions[0]} />
          ) : currentPage === 2 ? (
            <DogeQuestionSlide />
          ) : currentPage <= 4 ? (
            <QuestionSlide question={openingQuestions[currentPage - 2]} />
          ) : currentPage === 5 ? (
            <FullScreenFlagSlide src="/flag1.webm" />
          ) : currentPage === 6 ? (
            <SectionTitleSlide title="The Children" />
          ) : currentPage === 7 ? (
            <GirlPage />
          ) : currentPage === 8 ? (
            <MagaPage />
          ) : currentPage === 9 ? (
            <ManifestoStatementsPage />
          ) : currentPage === 10 ? (
            <PromisePage />
          ) : currentPage === 11 ? (
            <AgendaPage />
          ) : currentPage === 12 ? (
            <section className="flex min-h-full flex-col justify-center py-8">
              <header className="mx-auto max-w-3xl text-center">
                <h1 className="font-display text-6xl font-semibold leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
                  Viral Fusion
                </h1>
              </header>
              <section
                key={currentPage}
                className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6"
              >
                {deckPages[0].map((deck) => (
                  <DeckCard key={deck.href} deck={deck} />
                ))}
              </section>
            </section>
          ) : currentPage === 13 ? (
            <SectionTitleSlide title="Solution" />
          ) : currentPage === 14 ? (
            <SectionTitleSlide title="Project 2026" voiceoverSrc="/project-2026-nrusa.mp3" />
          ) : currentPage === 15 ? (
            <BlackSwanSlide />
          ) : currentPage === 16 ? (
            <section className="flex min-h-full flex-col justify-center py-8">
              <header className="mx-auto max-w-3xl text-center">
                <h1 className="font-display text-6xl font-semibold leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
                  Viral Fusion
                </h1>
              </header>
              <section
                key={currentPage}
                className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6"
              >
                {deckPages[1].map((deck) => (
                  <DeckCard key={deck.href} deck={deck} />
                ))}
              </section>
            </section>
          ) : currentPage === 17 ? (
            <FullScreenFlagSlide src="/flag2.webm" />
          ) : (
            <PlaceholderCtaPage />
          )}
        </div>
      </main>

      <div
        className={`fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full px-2 py-1.5 shadow-deck md:bottom-8 md:right-8 ${
          isCameraOpeningSlide
            ? "border border-white/10 bg-[#172534]/92"
            : "border border-line bg-white/92"
        }`}
      >
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
          disabled={currentPage === 0}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 ${
            isCameraOpeningSlide
              ? "border-white/10 bg-white/5 text-[#f4f2ec] hover:border-[#01c7f3]/65"
              : "border-line bg-white text-ink hover:border-accent"
          }`}
        >
          <ChevronLeft size={17} strokeWidth={2.1} />
        </button>
        <div className="flex items-center gap-1.5 px-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={`library-page-${index + 1}`}
              type="button"
              aria-label={`Go to page ${index + 1}`}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all ${
                currentPage === index
                  ? `w-6 ${isCameraOpeningSlide ? "bg-[#01c7f3]" : "bg-[#4d73c6]"}`
                  : `w-2 ${isCameraOpeningSlide ? "bg-[#60788c]" : "bg-[#9fb2d4]"}`
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 ${
            isCameraOpeningSlide
              ? "border-white/10 bg-white/5 text-[#f4f2ec] hover:border-[#01c7f3]/65"
              : "border-line bg-white text-ink hover:border-accent"
          }`}
        >
          <ChevronRight size={17} strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}
