"use client";

import { useEffect, useState } from "react";

import type { Slide, SlideSection } from "@/lib/parse-slides";

type SlideDeckProps = {
  slides: Slide[];
};

function clamp(index: number, total: number) {
  return Math.max(0, Math.min(index, total - 1));
}

function parseHash(total: number) {
  if (typeof window === "undefined") return 0;
  const match = window.location.hash.match(/slide-(\d+)/);
  if (!match) return 0;
  return clamp(Number(match[1]) - 1, total);
}

function SlideShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-y-0 left-[6%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,22,28,0.18),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(92,108,123,0.08),transparent)]" />
      <div className="relative z-10 min-h-screen px-[10%] py-8 md:py-10">
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center">
          {children}
        </div>
      </div>
    </section>
  );
}

function SlideLabel({ label }: { label: string }) {
  return (
    <p className="text-[0.72rem] uppercase tracking-[0.32em] text-mist">{label}</p>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function TitleBlock({
  label,
  title,
  maxWidth = "max-w-4xl",
}: {
  label: string;
  title: string;
  maxWidth?: string;
}) {
  return (
    <div className={maxWidth}>
      <SlideLabel label={label} />
      <h1
        className="mt-5 font-display text-4xl leading-[1.02] text-ink md:text-6xl [text-wrap:balance]"
      >
        {title}
      </h1>
    </div>
  );
}

function SectionBlock({
  section,
  large,
}: {
  section: SlideSection;
  large?: boolean;
}) {
  return (
    <article className="relative overflow-hidden rounded-[1.6rem] border border-line bg-white/90 p-6 shadow-deck">
      <div className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,rgba(140,159,176,0.8),rgba(140,159,176,0.15))]" />
      <div className="pl-3">
        {section.heading ? (
          <p className="mb-5 text-[0.72rem] uppercase tracking-[0.24em] text-graphite">
            {section.heading}
          </p>
        ) : null}
        <div className="space-y-4">
          {section.items.map((item) => (
            <p
              key={item}
              className={
                large
                  ? "text-xl leading-8 text-ink md:text-[1.38rem] md:leading-9 [text-wrap:pretty]"
                  : "text-base leading-7 text-ink md:text-lg [text-wrap:pretty]"
              }
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

function StatementBlock({ statements }: { statements: string[] }) {
  return (
    <article className="rounded-[1.6rem] border border-line bg-white/90 p-6 shadow-deck">
      <div className="space-y-4">
        {statements.map((statement) => (
          <p
            key={statement}
            className="border-l-2 border-accent pl-4 text-lg leading-8 text-ink"
          >
            {statement}
          </p>
        ))}
      </div>
    </article>
  );
}

function StatementItem({
  statement,
  index,
}: {
  statement: string;
  index: number;
}) {
  return (
    <article className="rounded-[1.4rem] border border-line bg-white/90 p-5 shadow-deck">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 text-[0.72rem] font-medium text-graphite">
          {index + 1}
        </div>
        <p className="pt-0.5 text-base leading-7 text-ink md:text-lg [text-wrap:pretty]">
          {statement}
        </p>
      </div>
    </article>
  );
}

function BalancedSectionGrid({ sections }: { sections: SlideSection[] }) {
  if (sections.length === 0) return null;

  return (
    <div className="grid max-w-5xl gap-4">
      {sections.map((section, index) => (
        <SectionBlock key={section.heading ?? section.items.join("-")} section={section} />
      ))}
    </div>
  );
}

function CoverSlide({ slide, number }: { slide: Slide; number: number }) {
  return (
    <SlideShell>
      <div className="grid w-full items-center gap-12 md:grid-cols-[1.12fr_0.88fr] md:gap-20">
        <div className="space-y-10">
          <div className="max-w-5xl">
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.97] text-ink md:text-[5.8rem] [text-wrap:balance]">
              {slide.title}
            </h1>
            {slide.lead ? (
              <p className="mt-6 text-[0.78rem] uppercase tracking-[0.3em] text-graphite">
                {slide.lead}
              </p>
            ) : null}
          </div>

          {slide.statements.length > 0 ? (
            <div className="max-w-xl border-t border-line pt-6">
              {slide.statements.map((statement) => (
                <p key={statement} className="text-lg leading-8 text-ink md:text-2xl">
                  {statement}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden md:block" />
      </div>
    </SlideShell>
  );
}

function TimelineSlide({ slide, number }: { slide: Slide; number: number }) {
  return (
    <SlideShell>
      <div className="grid w-full items-center gap-12 md:grid-cols-[0.88fr_1.12fr] md:gap-20">
        <TitleBlock label={String(number)} title={slide.title} maxWidth="max-w-3xl" />

        <div className="space-y-4">
          {slide.sections.map((section, index) => (
            <article
              key={section.heading ?? index}
              className="grid gap-4 rounded-[1.5rem] border border-line bg-white/90 p-5 shadow-deck md:grid-cols-[128px_1fr]"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-graphite">
                {section.heading}
              </p>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <p key={item} className="text-base leading-7 text-ink md:text-lg">
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function StandardSlide({ slide, number }: { slide: Slide; number: number }) {
  const isStatementOnly = slide.sections.length === 0 && slide.statements.length > 0;
  const maxStatementLength = slide.statements.reduce(
    (max, statement) => Math.max(max, statement.length),
    0,
  );
  const useStatementGrid = isStatementOnly && slide.statements.length >= 4 && maxStatementLength < 170;

  if (isStatementOnly) {
    return (
      <SlideShell>
        <div className="flex w-full flex-col justify-center gap-10">
          <TitleBlock label={String(number)} title={slide.title} maxWidth="max-w-4xl" />
          <div
            className={
              useStatementGrid
                ? "grid max-w-5xl gap-4"
                : "grid max-w-5xl gap-4"
            }
          >
            {slide.statements.map((statement, index) => (
              <StatementItem key={statement} statement={statement} index={index} />
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  return (
    <SlideShell>
      <div className="grid w-full items-center gap-12 md:grid-cols-[0.84fr_1.16fr] md:gap-20">
        <div className="space-y-8 md:pr-4">
          <TitleBlock label={String(number)} title={slide.title} maxWidth="max-w-3xl" />
        </div>

        <div className="space-y-4">
          <BalancedSectionGrid sections={slide.sections} />
          {slide.statements.length > 0 ? <StatementBlock statements={slide.statements} /> : null}
        </div>
      </div>
    </SlideShell>
  );
}

function StatementSlide({ slide, number }: { slide: Slide; number: number }) {
  const statement = slide.statements[0] ?? "Questions";

  return (
    <SlideShell>
      <div className="flex w-full flex-col items-center justify-center text-center">
        <SlideLabel label={String(number)} />
        <h1 className="mt-5 font-display text-5xl leading-none text-ink md:text-8xl">
          {slide.title}
        </h1>
        <p className="mt-8 max-w-2xl text-2xl leading-tight text-ink md:text-4xl">
          {statement}
        </p>
      </div>
    </SlideShell>
  );
}

export function SlideDeck({ slides }: SlideDeckProps) {
  const total = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(parseHash(total));
  }, [total]);

  useEffect(() => {
    const onHashChange = () => setCurrentIndex(parseHash(total));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        setCurrentIndex((index) => clamp(index + 1, total));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setCurrentIndex((index) => clamp(index - 1, total));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setCurrentIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setCurrentIndex(total - 1);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [total]);

  useEffect(() => {
    window.history.replaceState(null, "", `#slide-${currentIndex + 1}`);
  }, [currentIndex]);

  const slide = slides[currentIndex];
  const goPrevious = () => setCurrentIndex((index) => clamp(index - 1, total));
  const goNext = () => setCurrentIndex((index) => clamp(index + 1, total));

  return (
    <main className="min-h-screen">
      {slide.type === "cover" ? (
        <CoverSlide slide={slide} number={currentIndex + 1} />
      ) : slide.type === "timeline" ? (
        <TimelineSlide slide={slide} number={currentIndex + 1} />
      ) : slide.type === "statement" ? (
        <StatementSlide slide={slide} number={currentIndex + 1} />
      ) : (
        <StandardSlide slide={slide} number={currentIndex + 1} />
      )}
      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-2 md:bottom-8 md:right-8">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrevious}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/92 text-xl text-ink shadow-deck transition hover:border-accent hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/92 text-xl text-ink shadow-deck transition hover:border-accent hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentIndex === total - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </main>
  );
}
