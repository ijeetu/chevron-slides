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
  accent,
}: {
  children: React.ReactNode;
  accent?: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--panel)]">
      <div className="absolute inset-0 bg-grain opacity-70" />
      <div className="pointer-events-none absolute inset-x-[10vw] top-[12vh] h-px bg-ink/8" />
      <div className="pointer-events-none absolute inset-x-[10vw] bottom-[12vh] h-px bg-ink/8" />
      <div className="pointer-events-none absolute bottom-0 left-[10vw] top-0 w-px bg-ink/6" />
      <div className="pointer-events-none absolute bottom-0 right-[10vw] top-0 w-px bg-ink/6" />
      {accent}
      <div className="relative z-10 min-h-screen px-[10%] py-8 md:py-10">
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center">
          {children}
        </div>
      </div>
    </section>
  );
}

function CornerPatch({
  anchor,
  backgroundImage,
  backgroundSize,
  maskImage,
}: {
  anchor: string;
  backgroundImage: string;
  backgroundSize: string;
  maskImage: string;
}) {
  return (
    <div
      className="absolute inset-0 opacity-90"
      style={{
        backgroundImage,
        backgroundSize,
        backgroundPosition: anchor,
        backgroundRepeat: "no-repeat",
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    />
  );
}

function SlideAccent({ number, cover }: { number: number; cover?: boolean }) {
  const variant = number % 4;
  const topLeftPattern =
    variant === 0
      ? "linear-gradient(rgba(17,22,28,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.1) 1px, transparent 1px), radial-gradient(circle at top left, rgba(140,159,176,0.22), transparent 72%)"
      : variant === 1
        ? "linear-gradient(rgba(140,159,176,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.12) 1px, transparent 1px), linear-gradient(135deg, rgba(17,22,28,0.08), transparent 62%)"
        : variant === 2
          ? "linear-gradient(rgba(17,22,28,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.09) 1px, transparent 1px), radial-gradient(circle at top left, rgba(17,22,28,0.08), transparent 76%)"
          : "linear-gradient(rgba(140,159,176,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.13) 1px, transparent 1px), linear-gradient(160deg, rgba(140,159,176,0.18), transparent 68%)";
  const rightPattern =
    variant === 0
      ? "linear-gradient(rgba(17,22,28,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.12) 1px, transparent 1px), linear-gradient(180deg, rgba(140,159,176,0.2), rgba(140,159,176,0.03))"
      : variant === 1
        ? "linear-gradient(rgba(140,159,176,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.14) 1px, transparent 1px), radial-gradient(circle at top right, rgba(140,159,176,0.22), transparent 72%)"
        : variant === 2
          ? "linear-gradient(rgba(17,22,28,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.1) 1px, transparent 1px), linear-gradient(180deg, rgba(17,22,28,0.08), transparent 70%)"
          : "linear-gradient(rgba(140,159,176,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.12) 1px, transparent 1px), radial-gradient(circle at top right, rgba(17,22,28,0.09), transparent 74%)";
  const bottomPattern =
    variant === 0
      ? "linear-gradient(rgba(17,22,28,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.09) 1px, transparent 1px), radial-gradient(circle at bottom right, rgba(140,159,176,0.18), transparent 72%)"
      : variant === 1
        ? "linear-gradient(rgba(140,159,176,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.12) 1px, transparent 1px), linear-gradient(180deg, transparent, rgba(140,159,176,0.18))"
        : variant === 2
          ? "linear-gradient(rgba(17,22,28,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.09) 1px, transparent 1px), radial-gradient(circle at bottom left, rgba(17,22,28,0.08), transparent 74%)"
          : "linear-gradient(rgba(140,159,176,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.13) 1px, transparent 1px), linear-gradient(180deg, transparent, rgba(17,22,28,0.09))";
  const thirdCornerIsLeft = variant >= 2;

  return (
    <div className="pointer-events-none absolute inset-0">
      <CornerPatch
        anchor="left top"
        backgroundImage={topLeftPattern}
        backgroundSize={cover ? "30px 30px, 30px 30px, 30vw 30vw" : "28px 28px, 28px 28px, 24vw 24vw"}
        maskImage="radial-gradient(circle at top left, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.82) 16%, rgba(0,0,0,0.46) 30%, transparent 52%)"
      />
      <CornerPatch
        anchor="right top"
        backgroundImage={rightPattern}
        backgroundSize={cover ? "30px 30px, 30px 30px, 34vw 34vw" : "28px 28px, 28px 28px, 26vw 26vw"}
        maskImage="radial-gradient(circle at top right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.84) 18%, rgba(0,0,0,0.48) 32%, transparent 54%)"
      />
      <CornerPatch
        anchor={thirdCornerIsLeft ? "left bottom" : "right bottom"}
        backgroundImage={bottomPattern}
        backgroundSize="26px 26px, 26px 26px, 22vw 22vw"
        maskImage={
          thirdCornerIsLeft
            ? "radial-gradient(circle at bottom left, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 14%, rgba(0,0,0,0.4) 26%, transparent 46%)"
            : "radial-gradient(circle at bottom right, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 14%, rgba(0,0,0,0.4) 26%, transparent 46%)"
        }
      />
    </div>
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

function BalancedSectionGrid({ sections }: { sections: SlideSection[] }) {
  if (sections.length === 0) return null;

  if (sections.length === 1) {
    return (
      <div className="max-w-3xl">
        <SectionBlock section={sections[0]} large />
      </div>
    );
  }

  if (sections.length === 2) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <SectionBlock key={section.heading ?? section.items.join("-")} section={section} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <SectionBlock section={sections[0]} large />
      </div>
      {sections.slice(1).map((section) => (
        <SectionBlock key={section.heading ?? section.items.join("-")} section={section} />
      ))}
    </div>
  );
}

function CoverSlide({ slide, number }: { slide: Slide; number: number }) {
  return (
    <SlideShell accent={<SlideAccent number={number} cover />}>
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
    <SlideShell accent={<SlideAccent number={number} />}>
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
  return (
    <SlideShell accent={<SlideAccent number={number} />}>
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
    <SlideShell accent={<SlideAccent number={number} />}>
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
