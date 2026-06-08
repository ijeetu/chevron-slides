"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Globe2,
  Map,
  Megaphone,
  Presentation,
  Rocket,
  Shield,
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

type FoundingFather = {
  name: string;
  imageSrc: string;
  accentClass: string;
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
    text: "True sovereignty in the digital age is about moving faster, smarter, and more efficiently.",
    icon: Shield,
  },
  {
    text: "We don't need more expert opinions, committees, or permission.",
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
    text: "We have the America First blueprint. Let's begin.",
    icon: Rocket,
    prefix: "We have the America First blueprint.",
    emphasis: "Let's begin.",
  },
];

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
      <div className="relative overflow-hidden rounded-[calc(2.4rem-1px)] bg-[#f7f2e9] px-5 py-6 sm:px-7 sm:py-8 lg:px-8">
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
              <div className="relative h-[18rem] sm:h-[21rem] xl:h-[24rem]">
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

          <div className="relative overflow-hidden rounded-[2rem] border border-[#d7bc7d]/55 bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(247,241,227,0.93)_56%,rgba(234,241,255,0.94)_100%)] px-6 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_24px_60px_rgba(17,22,28,0.12)] sm:px-8 md:px-10 md:py-10 xl:order-2">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-20 bg-gradient-to-r from-transparent via-white/85 to-transparent blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-7 h-16 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0))] blur-xl" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              <p className="max-w-3xl font-display text-[1.9rem] leading-[1.18] text-ink sm:text-[2.35rem] md:text-[2.8rem]">
                {statement.prefix}
              </p>

              <div className="mt-5 rounded-[1.6rem] border border-[#c5293d]/14 bg-[linear-gradient(145deg,rgba(198,41,61,0.08),rgba(23,63,142,0.06))] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <span className="font-display text-[2.5rem] leading-none text-[#173f8e] sm:text-[3rem] md:text-[3.55rem]">
                  {statement.emphasis}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
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

        <section className="pb-12">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-6">
              <article className="relative overflow-hidden rounded-[2rem] border border-[#d9c29a]/65 bg-[linear-gradient(145deg,rgba(255,255,255,0.97),rgba(245,238,223,0.92))] px-8 py-8 shadow-[0_24px_60px_rgba(59,88,129,0.12)] sm:px-10">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#8b2132]/35 to-transparent" />
                <p className="text-center font-display text-[1.85rem] leading-[1.12] text-ink sm:text-[2.3rem]">
                  Out of all the podcasts your team and you have conducted, does the
                  future look brighter?
                </p>
              </article>

              <article className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white/90 px-6 py-6 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/35 to-transparent" />
                <p className="text-center font-display text-[1.35rem] leading-relaxed text-ink md:text-[1.55rem] md:leading-[1.8]">
                  Is validating a glimpse of the fraud enough?
                </p>
              </article>

              <article className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white/90 px-6 py-6 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/35 to-transparent" />
                <p className="text-center font-display text-[1.35rem] leading-relaxed text-ink md:text-[1.55rem] md:leading-[1.8]">
                  How important is accountability for the future of our republic?
                </p>
              </article>
            </div>

            <div className="space-y-6">
              <article className="overflow-hidden rounded-[2rem] border border-line bg-white/92 shadow-[0_24px_60px_rgba(59,88,129,0.12)]">
                <div className="relative h-[22rem] sm:h-[28rem]">
                  <Image
                    src="/child-trafficking-pink.webp"
                    alt="Portrait of a young girl"
                    fill
                    sizes="(min-width: 1280px) 48vw, 92vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.08),rgba(8,17,34,0.22)_46%,rgba(5,10,20,0.78)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 px-6 pb-7 pt-16 text-center sm:px-8 sm:pb-9">
                    <p className="font-display text-[2.3rem] leading-[1.15] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] sm:text-[3.1rem]">
                      Are the children protected?
                    </p>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-[2rem] border border-line bg-white/92 shadow-[0_24px_60px_rgba(59,88,129,0.12)]">
                <div className="relative h-[22rem] sm:h-[28rem]">
                  <Image
                    src="/maga.png"
                    alt="Creative showing the division between MAGA and the Democratic Party"
                    fill
                    sizes="(min-width: 1280px) 48vw, 92vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.1),rgba(8,17,34,0.18)_38%,rgba(5,10,20,0.72)_100%)]" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <header className="pb-8 text-center">
          <div className="mx-auto max-w-6xl space-y-3">
            <div className="flex items-center justify-center gap-3 text-[#4d73c6]">
              <span className="h-px w-16 bg-[linear-gradient(90deg,rgba(77,115,198,0),rgba(77,115,198,0.55))]" />
              <span className="h-px w-16 bg-[linear-gradient(90deg,rgba(77,115,198,0.55),rgba(77,115,198,0))]" />
            </div>
            <h1 className="font-display text-[2rem] font-bold leading-[0.9] text-ink sm:text-[2.9rem] lg:text-[3.8rem] [text-shadow:0.006em_0_0_currentColor,-0.006em_0_0_currentColor]">
              Discussing the Past is Not Enough
            </h1>
          </div>
        </header>

        <div className="space-y-6">
          {manifestoStatements.map((statement, index) => {
            if (index === manifestoStatements.length - 1) {
              return <FoundersCtaCard key={statement.text} statement={statement} />;
            }

            return (
              <div key={statement.text} className="space-y-6">
                <article
                  className={`relative overflow-hidden rounded-2xl border px-6 py-5 shadow-sm md:px-8 md:py-6 ${
                    "border-line bg-white/90"
                  }`}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/35 to-transparent"
                  />
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-center font-display text-[1.35rem] leading-relaxed text-ink md:text-[1.55rem] md:leading-[1.8]">
                      {statement.text}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
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
        <h1 className="font-display text-6xl leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
          Agenda
        </h1>
      </header>

      <div className="mt-10 flex justify-center">
        <p className="max-w-2xl text-center text-base leading-7 text-graphite sm:text-lg">
          Agenda content will be added here later.
        </p>
      </div>
    </section>
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
            <section className="flex min-h-full flex-col justify-center py-8">
              <header className="mx-auto max-w-3xl text-center">
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
            </section>
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
