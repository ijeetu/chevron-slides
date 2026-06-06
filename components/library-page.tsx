"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Eye,
  Globe2,
  Map,
  Megaphone,
  Presentation,
  Radio,
  Rocket,
  Shield,
  Target,
  TrendingUp,
  Zap,
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
  icon: LucideIcon;
  prefix?: string;
  emphasis?: string;
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
      title: "Strategy Map",
      description: "Strategic Alliance and Partnership Landscape",
      href: "/strategymap",
      icon: Map,
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(231,238,235,0.9))] hover:border-[#a8b9b3]/85 hover:shadow-[0_24px_55px_rgba(66,97,89,0.14)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(233,241,238,0.98),rgba(194,211,205,0.94))] text-[#476961] border-[#adc0b8]/50",
    },
  ],
  [
    {
      title: "Global Opportunities",
      description: "TAM (Total Available Market)",
      href: "/presentation/global-opportunities",
      icon: Globe2,
      placementClass: "xl:col-start-2 xl:col-span-2",
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(221,238,233,0.96))] hover:border-[#6fa391]/85 hover:shadow-[0_24px_60px_rgba(42,109,88,0.18)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(236,248,244,0.98),rgba(162,208,191,0.96))] text-[#24584b] border-[#7fb19e]/55",
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

const manifestoStatements: ManifestoStatement[] = [
  {
    text: "True sovereignty in the digital age is about moving faster than the competition can think.",
    icon: Shield,
  },
  {
    text: "We don't need more committees, talk, or permission.",
    icon: Megaphone,
  },
  {
    text: "We have the winning strategy, the architecture, and we are executing right now.",
    icon: Cpu,
  },
  {
    text: "The door is open, but it won't stay open for long.",
    icon: Zap,
  },
  {
    text: "Step through it and help us lead. We have the America First blueprint. Let's begin.",
    icon: Rocket,
    prefix: "Step through it and help us lead. We have the America First blueprint.",
    emphasis: "Let's begin.",
  },
];

const deliveryBlueprint = [
  {
    title: "The Slam",
    icon: Radio,
    tone:
      "border-[#4d73c6]/18 bg-[linear-gradient(145deg,rgba(236,243,255,0.96),rgba(220,232,252,0.92))]",
    body:
      'Read the first two lines ("Stop discussing... Start building...") with high energy, then stop talking for two full seconds. Let the screen do the work. Let the audience read it.',
  },
  {
    title: "The Contrast",
    icon: Target,
    tone:
      "border-[#6b7f9e]/18 bg-[linear-gradient(145deg,rgba(242,245,249,0.97),rgba(226,233,241,0.93))]",
    body:
      'Drop your voice to a lower, highly confident tone when you say, "True sovereignty..." This tonal shift changes the energy from a critique into an authoritative strategy.',
  },
  {
    title: "The Call",
    icon: Eye,
    tone:
      "border-[#3e62b8]/24 bg-[linear-gradient(145deg,rgba(229,238,255,0.98),rgba(204,222,250,0.94))]",
    body:
      'Look directly into the main camera lens, not at your slides or the host, when you deliver the final line: "Step through it and help us lead." Treat that camera like it is his eyes.',
  },
];

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

function ManifestoPage() {
  return (
    <section className="relative px-[5%] py-10 xl:pl-28">
      <div className="mx-auto w-full max-w-none">
        <div
          className="pointer-events-none absolute left-[-8.35rem] top-10 hidden w-32 flex-col items-center xl:flex"
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

        <header className="pb-8 text-center">
          <div className="mx-auto max-w-6xl space-y-3">
            <div className="flex items-center justify-center gap-3 text-[#4d73c6]">
              <span className="h-px w-16 bg-[linear-gradient(90deg,rgba(77,115,198,0),rgba(77,115,198,0.55))]" />
              <Shield className="h-5 w-5" strokeWidth={2} />
              <span className="h-px w-16 bg-[linear-gradient(90deg,rgba(77,115,198,0.55),rgba(77,115,198,0))]" />
            </div>
            <h1 className="font-display text-[2rem] leading-[0.9] text-ink sm:text-[2.9rem] lg:text-[3.8rem]">
              STOP DISCUSSING THE PAST.
            </h1>
            <h2 className="font-display text-[2rem] leading-[0.9] text-[#4d73c6] sm:text-[2.9rem] lg:text-[3.8rem]">
              START BUILDING THE FUTURE.
            </h2>
          </div>
        </header>

        <div className="space-y-6">
          {manifestoStatements.map((statement, index) => {
            const Icon = statement.icon;

            return (
            <article
              key={statement.text}
              className={`relative overflow-hidden rounded-2xl border px-6 py-5 shadow-sm md:px-8 md:py-6 ${
                index === manifestoStatements.length - 1
                  ? "border-[#4d73c6]/35 bg-[linear-gradient(160deg,#5d84d2,#3e62b8)] shadow-[0_8px_24px_rgba(77,115,198,0.28)]"
                  : "border-line bg-white/90"
              }`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-[3px] ${
                  index === manifestoStatements.length - 1
                    ? "bg-gradient-to-r from-transparent via-white/45 to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#4d73c6]/35 to-transparent"
                }`}
              />
              <div className="flex flex-col items-center gap-4 text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                    index === manifestoStatements.length - 1
                      ? "border-white/25 bg-white/10 text-white"
                      : "border-[#4d73c6]/20 bg-[linear-gradient(145deg,#eef4ff,#dfe9fb)] text-[#4d73c6]"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <p
                  className={`text-center font-display text-[1.35rem] leading-relaxed md:text-[1.55rem] md:leading-[1.8] ${
                    index === manifestoStatements.length - 1 ? "text-white" : "text-ink"
                  }`}
                >
                  {statement.emphasis ? (
                    <>
                      {statement.prefix}
                      <br />
                      <span className="mt-2 inline-block text-[1.7rem] leading-none md:text-[2.05rem]">
                        {statement.emphasis}
                      </span>
                    </>
                  ) : (
                    statement.text
                  )}
                </p>
              </div>
            </article>
          )})}
        </div>

        <div className="my-10 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(17,22,28,0.14)_20%,rgba(17,22,28,0.14)_80%,transparent)]" />

        <section className="space-y-4">
          <div className="mx-auto w-fit rounded-full bg-[linear-gradient(135deg,#7a9adb,#c4d3f0)] p-[1.5px] shadow-[0_4px_20px_rgba(77,115,198,0.18)]">
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-1.5">
              <Radio className="h-4 w-4 text-[#4d73c6]" strokeWidth={2} />
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.32em] text-graphite">
                Broadcast Delivery Blueprint
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {deliveryBlueprint.map((item) => {
              const Icon = item.icon;

              return (
              <article
                key={item.title}
                className={`relative overflow-hidden rounded-2xl border px-6 py-5 shadow-sm ${item.tone}`}
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/35 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6),transparent_68%)] blur-2xl" />
                <div className="flex items-center justify-center gap-2 text-[#4d73c6]">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  <p className="text-center text-[0.92rem] font-semibold uppercase tracking-[0.22em] text-[#4d73c6]">
                    {item.title}
                  </p>
                </div>
                <p className="mt-4 text-[1rem] leading-8 text-ink md:text-[1.08rem]">
                  {item.body}
                </p>
              </article>
            )})}
          </div>
        </section>
      </div>
    </section>
  );
}

function PlaceholderCtaPage() {
  return (
    <section className="mt-10 flex min-h-[27rem] items-center justify-center">
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
    <>
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-6xl leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
          Agenda
        </h1>
      </header>

      <section className="mt-10 flex min-h-[12rem] items-start justify-center">
        <p className="max-w-2xl text-center text-base leading-7 text-graphite sm:text-lg">
          Agenda content will be added here later.
        </p>
      </section>
    </>
  );
}

export function LibraryPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const totalPages = deckPages.length + 3;

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
  }, [currentPage]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(92,108,123,0.08),transparent)]" />

      <main className="relative z-10 mx-auto flex h-[calc(100vh-5rem)] w-[90%] max-w-none flex-col px-6 py-10 sm:px-10 lg:px-14">
        <div
          ref={pageContainerRef}
          className="presentation-scroll min-h-0 flex-1 overflow-y-auto pb-24 pr-1 md:pb-28 md:pr-2"
        >
          {currentPage === 0 ? (
            <ManifestoPage />
          ) : currentPage === 1 ? (
            <AgendaPage />
          ) : currentPage <= deckPages.length + 1 ? (
            <>
              <header className="mx-auto max-w-3xl pt-8 text-center">
                <h1 className="font-display text-6xl leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
                  Viral Fusion
                </h1>
              </header>
              <section
                key={currentPage}
                className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6"
              >
                {deckPages[currentPage - 2].map((deck) => (
                  <DeckCard key={deck.href} deck={deck} />
                ))}
              </section>
            </>
          ) : (
            <PlaceholderCtaPage />
          )}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-line bg-white/92 px-2 py-1.5 shadow-deck md:bottom-8 md:right-8">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
          disabled={currentPage === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-all hover:-translate-y-0.5 hover:border-accent disabled:cursor-not-allowed disabled:opacity-35"
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
                currentPage === index ? "w-6 bg-[#4d73c6]" : "w-2 bg-[#9fb2d4]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-all hover:-translate-y-0.5 hover:border-accent disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronRight size={17} strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}
