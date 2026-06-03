"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Map,
  Presentation,
  TrendingUp,
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
  const totalPages = deckPages.length + 2;

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(149,174,201,0.24),transparent_66%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[10rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(208,196,169,0.18),transparent_66%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
        {currentPage === 0 ? (
          <AgendaPage />
        ) : currentPage <= deckPages.length ? (
          <>
            <header className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-6xl leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
                Viral Fusion
              </h1>
            </header>
            <section
              key={currentPage}
              className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6"
            >
              {deckPages[currentPage - 1].map((deck) => (
                <DeckCard key={deck.href} deck={deck} />
              ))}
            </section>
          </>
        ) : (
          <PlaceholderCtaPage />
        )}
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
