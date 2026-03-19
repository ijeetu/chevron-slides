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
      <div className="pointer-events-none absolute inset-x-[5vw] top-[12vh] h-px bg-ink/8" />
      <div className="pointer-events-none absolute inset-x-[5vw] bottom-[12vh] h-px bg-ink/8" />
      <div className="pointer-events-none absolute bottom-0 left-[6vw] top-0 w-px bg-ink/6" />
      <div className="pointer-events-none absolute bottom-0 right-[6vw] top-0 w-px bg-ink/6" />
      {accent}
      <div className="relative z-10 min-h-screen px-6 py-8 md:px-12 md:py-10">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1380px] items-center">
          {children}
        </div>
      </div>
    </section>
  );
}

function CornerPatch({
  className,
  backgroundImage,
  backgroundSize,
  maskImage,
}: {
  className: string;
  backgroundImage: string;
  backgroundSize: string;
  maskImage: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        backgroundImage,
        backgroundSize,
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
      ? "linear-gradient(rgba(17,22,28,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.06) 1px, transparent 1px), radial-gradient(circle at top left, rgba(140,159,176,0.16), transparent 70%)"
      : variant === 1
        ? "linear-gradient(rgba(140,159,176,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.08) 1px, transparent 1px), linear-gradient(135deg, rgba(17,22,28,0.05), transparent 60%)"
        : variant === 2
          ? "linear-gradient(rgba(17,22,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.05) 1px, transparent 1px), radial-gradient(circle at top left, rgba(17,22,28,0.05), transparent 74%)"
          : "linear-gradient(rgba(140,159,176,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.09) 1px, transparent 1px), linear-gradient(160deg, rgba(140,159,176,0.13), transparent 66%)";
  const rightPattern =
    variant === 0
      ? "linear-gradient(rgba(17,22,28,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(140,159,176,0.14), rgba(140,159,176,0.02))"
      : variant === 1
        ? "linear-gradient(rgba(140,159,176,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.1) 1px, transparent 1px), radial-gradient(circle at top right, rgba(140,159,176,0.16), transparent 70%)"
        : variant === 2
          ? "linear-gradient(rgba(17,22,28,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(17,22,28,0.05), transparent 68%)"
          : "linear-gradient(rgba(140,159,176,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.08) 1px, transparent 1px), radial-gradient(circle at top right, rgba(17,22,28,0.06), transparent 72%)";
  const bottomPattern =
    variant === 0
      ? "linear-gradient(rgba(17,22,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.05) 1px, transparent 1px), radial-gradient(circle at bottom right, rgba(140,159,176,0.12), transparent 70%)"
      : variant === 1
        ? "linear-gradient(rgba(140,159,176,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.08) 1px, transparent 1px), linear-gradient(180deg, transparent, rgba(140,159,176,0.12))"
        : variant === 2
          ? "linear-gradient(rgba(17,22,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,22,28,0.05) 1px, transparent 1px), radial-gradient(circle at bottom left, rgba(17,22,28,0.05), transparent 72%)"
          : "linear-gradient(rgba(140,159,176,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(140,159,176,0.09) 1px, transparent 1px), linear-gradient(180deg, transparent, rgba(17,22,28,0.05))";
  const thirdCornerIsLeft = variant >= 2;

  return (
    <div className="pointer-events-none absolute inset-0">
      <CornerPatch
        className={`${cover ? "left-[4.5vw] top-[10vh] h-[22vh] w-[12vw]" : "left-[4.5vw] top-[10vh] h-[18vh] w-[10vw]"} hidden md:block`}
        backgroundImage={topLeftPattern}
        backgroundSize="28px 28px, 28px 28px, 100% 100%"
        maskImage="radial-gradient(circle at top left, rgba(0,0,0,1) 18%, rgba(0,0,0,0.68) 58%, transparent 100%)"
      />
      <CornerPatch
        className={`${cover ? "right-[4.5vw] top-[10vh] h-[28vh] w-[16vw]" : "right-[4.5vw] top-[10vh] h-[22vh] w-[13vw]"} hidden md:block`}
        backgroundImage={rightPattern}
        backgroundSize="30px 30px, 30px 30px, 100% 100%"
        maskImage="radial-gradient(circle at top right, rgba(0,0,0,1) 20%, rgba(0,0,0,0.72) 56%, transparent 100%)"
      />
      <CornerPatch
        className={`${thirdCornerIsLeft ? "left-[4.5vw]" : "right-[4.5vw]"} bottom-[10vh] h-[20vh] w-[12vw] hidden md:block`}
        backgroundImage={bottomPattern}
        backgroundSize="26px 26px, 26px 26px, 100% 100%"
        maskImage={
          thirdCornerIsLeft
            ? "radial-gradient(circle at bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0.72) 58%, transparent 100%)"
            : "radial-gradient(circle at bottom right, rgba(0,0,0,1) 20%, rgba(0,0,0,0.72) 58%, transparent 100%)"
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
    </main>
  );
}
