"use client";

import type { ReactNode } from "react";
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

const urlMatcher = /(https?:\/\/[^\s]+)/g;
const buttonLinkMatcher = /^team video:\s*(https?:\/\/\S+)$/i;

function renderInlineLinks(text: string): ReactNode {
  const buttonMatch = text.match(buttonLinkMatcher);

  if (buttonMatch) {
    return (
      <a
        href={buttonMatch[1]}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full border border-accent bg-white px-5 py-2 text-sm font-medium uppercase tracking-[0.18em] text-graphite shadow-deck transition-colors hover:bg-panel"
      >
        Click Here
      </a>
    );
  }

  const parts = text.split(urlMatcher);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-accent underline-offset-4 transition-colors hover:text-graphite"
        >
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function SlideShell({
  children,
  slideNumber,
}: {
  children: React.ReactNode;
  slideNumber?: number;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-y-0 left-[6%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,22,28,0.18),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(92,108,123,0.08),transparent)]" />
      <div className="relative z-10 min-h-screen px-[10%] py-8 md:py-10">
        {slideNumber ? (
          <div className="absolute right-6 top-8 flex items-center gap-4 text-mist md:right-8 md:top-10">
            <p className="text-[0.76rem] uppercase tracking-[0.28em]">
              {`Slide ${String(slideNumber).padStart(2, "0")}`}
            </p>
            <span className="h-px w-20 bg-[linear-gradient(90deg,rgba(38,49,61,0.45),rgba(38,49,61,0))]" />
          </div>
        ) : null}
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center">
          {children}
        </div>
      </div>
    </section>
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
  title,
  maxWidth = "max-w-4xl",
}: {
  title: string;
  maxWidth?: string;
}) {
  return (
    <div className={maxWidth}>
      <h1
        className="font-display text-4xl leading-[1.02] text-ink md:text-6xl [text-wrap:balance]"
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
                  ? "text-[1.22rem] leading-9 text-ink md:text-[1.55rem] md:leading-10 [text-wrap:pretty]"
                  : "text-lg leading-8 text-ink md:text-[1.3rem] md:leading-9 [text-wrap:pretty]"
              }
            >
              {renderInlineLinks(item)}
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
            className="border-l-2 border-accent pl-4 text-xl leading-9 text-ink md:text-[1.35rem] md:leading-10"
          >
            {renderInlineLinks(statement)}
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
        <p className="pt-0.5 text-lg leading-8 text-ink md:text-[1.3rem] md:leading-9 [text-wrap:pretty]">
          {renderInlineLinks(statement)}
        </p>
      </div>
    </article>
  );
}

function BalancedSectionGrid({ sections }: { sections: SlideSection[] }) {
  if (sections.length === 0) return null;

  return (
    <div className="grid max-w-5xl gap-4">
      {sections.map((section) => (
        <SectionBlock key={section.heading ?? section.items.join("-")} section={section} />
      ))}
    </div>
  );
}

function CoverSlide({ slide, number }: { slide: Slide; number: number }) {
  return (
    <SlideShell slideNumber={number}>
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
            <div className="max-w-xl space-y-5 border-t border-line pt-6">
              {slide.statements.map((statement) => (
                <p key={statement} className="text-xl leading-9 text-ink md:text-[1.7rem] md:leading-10">
                  {renderInlineLinks(statement)}
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
    <SlideShell slideNumber={number}>
      <div className="grid w-full items-center gap-12 md:grid-cols-[0.88fr_1.12fr] md:gap-20">
        <TitleBlock title={slide.title} maxWidth="max-w-3xl" />

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
                  <p key={item} className="text-lg leading-8 text-ink md:text-[1.3rem] md:leading-9">
                    {renderInlineLinks(item)}
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
      <SlideShell slideNumber={number}>
        <div className="flex w-full flex-col justify-center gap-10">
          <TitleBlock title={slide.title} maxWidth="max-w-4xl" />
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
    <SlideShell slideNumber={number}>
      <div className="grid w-full items-center gap-12 md:grid-cols-[0.84fr_1.16fr] md:gap-20">
        <div className="space-y-8 md:pr-4">
          <TitleBlock title={slide.title} maxWidth="max-w-3xl" />
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
    <SlideShell slideNumber={number}>
      <div className="flex w-full flex-col items-center justify-center text-center">
        <h1 className="font-display text-5xl leading-none text-ink md:text-8xl">
          {slide.title}
        </h1>
        <p className="mt-8 max-w-2xl text-2xl leading-tight text-ink md:text-4xl">
          {renderInlineLinks(statement)}
        </p>
      </div>
    </SlideShell>
  );
}

function splitTitleParts(title: string) {
  const [primary, secondary] = title.split(/\s*\/\s*/);
  return {
    primary: primary?.trim() ?? title,
    secondary: secondary?.trim(),
  };
}

function trimTrailingPeriod(value: string | undefined) {
  return value?.replace(/\.+$/, "") ?? "";
}

function findMapSection(slide: Slide, heading: string) {
  return slide.sections.find((section) => section.heading === heading);
}

function MapBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[1.2rem] border border-ink/10 bg-white/80 px-5 py-3.5 text-center shadow-[0_8px_24px_rgba(17,22,28,0.06)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_12px_32px_rgba(17,22,28,0.08)] ${className}`}>
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/40 via-accent to-accent/40 opacity-60" />
      {children}
    </div>
  );
}

function MapPill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-full border border-[#345aa1]/40 bg-[linear-gradient(180deg,#648cdd,#4d73c6)] px-5 py-2 text-center shadow-[0_8px_20px_rgba(77,115,198,0.2)] transition-transform duration-300 hover:-translate-y-0.5 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-white md:text-sm">
        {children}
      </p>
    </div>
  );
}

function MiniChip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-full border border-line bg-white/90 px-4 py-1.5 text-center shadow-sm transition-colors duration-300 hover:border-accent/40 hover:bg-white ${className}`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink/80">
        {children}
      </p>
    </div>
  );
}

function Phase1Slide({ slide, number }: { slide: Slide; number: number }) {
  const INDUSTRY_NAMES = ["Oil & Gas", "Automotive", "Medical", "Technology", "Insurance"];

  const industries = slide.sections
    .filter((s) => INDUSTRY_NAMES.includes(s.heading ?? ""))
    .map((section) => {
      const raw = (section.items[0] ?? "").replace(/\.$/, "");
      const parts = raw.split(/\s*\|\s*/);
      const lead = parts[0]?.trim() ?? "";
      const orgsRaw = parts[1]?.trim() ?? "";
      const orgs = orgsRaw ? orgsRaw.split(/,\s*/).filter(Boolean) : [];
      const policies = parseInt(parts[2] ?? "0") || 0;
      return { name: section.heading ?? "", lead, orgs, policies };
    });

  const goalsSection = slide.sections.find((s) => s.heading === "Goals");
  const targetSection = slide.sections.find((s) => s.heading === "Target Completion");
  const subtitle = slide.statements[0] ?? "";

  const titleMatch = slide.title.match(/^(Phase \d+):\s*(.+)$/);
  const phaseLabel = titleMatch?.[1] ?? "Phase 1";
  const titleRest = titleMatch?.[2] ?? slide.title;

  return (
    <SlideShell slideNumber={number}>
      <div className="flex w-full flex-col gap-3 py-1">
        {/* Title box */}
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-xl border border-line bg-white/95 px-7 py-2.5 shadow-sm">
            <h1 className="text-center font-display text-[1.45rem] font-bold text-ink md:text-[1.8rem]">
              <span>{phaseLabel}:</span>{" "}
              <span>{titleRest}</span>
            </h1>
          </div>
          {subtitle ? (
            <p className="max-w-4xl text-center text-sm text-graphite md:text-base">{subtitle}</p>
          ) : null}
        </div>

        {/* Connecting tree lines (aligned with the 5 data columns) */}
        <div className="mx-auto flex w-full max-w-6xl">
          <div className="w-36 shrink-0" />
          <div className="flex flex-1 flex-col items-center">
            <div className="h-4 w-[2px] bg-[#7a9adb]" />
            <div className="w-[90%]">
              <div className="h-[2px] w-full bg-[#7a9adb]" />
              <div className="flex justify-between">
                {industries.map((ind) => (
                  <div key={ind.name} className="h-4 w-[2px] bg-[#7a9adb]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data grid: label col + 5 industry cols */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[9rem_1fr_1fr_1fr_1fr_1fr] gap-x-2 gap-y-3">
          {/* Row: Industries */}
          <div className="flex items-center">
            <p className="text-[0.8rem] font-bold leading-tight text-ink">Industries</p>
          </div>
          {industries.map((ind) => (
            <div key={`ind-${ind.name}`} className="flex justify-center">
              <MapBox className="w-full py-2.5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.07em] text-ink md:text-[0.7rem]">
                  {ind.name}
                </p>
              </MapBox>
            </div>
          ))}

          {/* Row: Lead Facilitator */}
          <div className="flex items-center">
            <p className="text-[0.8rem] font-bold leading-tight text-ink">
              George Partsch IV
              <br />
              <span className="font-normal text-graphite">– Lead Facilitator</span>
            </p>
          </div>
          {industries.map((ind) => (
            <div key={`lead-${ind.name}`} className="flex justify-center">
              <MapPill className="w-full">{ind.lead}</MapPill>
            </div>
          ))}

          {/* Row: Orgs Served */}
          <div className="flex items-center">
            <p className="text-[0.8rem] font-bold leading-tight text-ink">Orgs. Served</p>
          </div>
          {industries.map((ind) => (
            <div key={`orgs-${ind.name}`} className="flex flex-wrap items-center justify-center gap-1">
              {ind.orgs.map((org) => (
                <MiniChip key={org}>{org}</MiniChip>
              ))}
            </div>
          ))}

          {/* Row: Est. Number of Policies */}
          <div className="flex items-center">
            <p className="text-[0.8rem] font-bold leading-tight text-ink">
              Est. Number
              <br />
              of Policies
            </p>
          </div>
          {industries.map((ind) => (
            <div key={`pol-${ind.name}`} className="flex justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white shadow-sm">
                <span className="text-sm font-bold text-ink">{ind.policies}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-auto w-full max-w-6xl border-t border-line" />

        {/* Goals & Target Completion */}
        <div className="mx-auto w-full max-w-6xl space-y-2.5">
          {goalsSection?.items[0] ? (
            <div className="flex gap-5">
              <p className="w-36 shrink-0 text-[0.82rem] font-bold text-ink">Goals:</p>
              <p className="text-[0.82rem] leading-relaxed text-graphite">{goalsSection.items[0]}</p>
            </div>
          ) : null}
          {targetSection?.items[0] ? (
            <div className="flex items-center gap-5">
              <p className="w-36 shrink-0 text-[0.82rem] font-bold text-ink">Target Completion:</p>
              <div className="rounded-full border border-line bg-white/95 px-5 py-2 shadow-sm">
                <p className="text-[0.82rem] font-bold text-ink">{targetSection.items[0]}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </SlideShell>
  );
}

function MapSlide({ slide, number }: { slide: Slide; number: number }) {
  const { primary, secondary } = splitTitleParts(slide.title);
  const [intro, detail, byline, hubLabelRaw] = slide.statements;
  const hubLabel = trimTrailingPeriod(hubLabelRaw) || "Step 1 Industry Alliance";
  const oilSection = findMapSection(slide, "Oil & Gas");
  const medicalSection = findMapSection(slide, "Medical");
  const technologySection = findMapSection(slide, "Technology");
  const automotiveSection = findMapSection(slide, "Automotive");

  const oilLead = trimTrailingPeriod(oilSection?.items[0]);
  const oilSupport = oilSection?.items
    .slice(1)
    .flatMap((item) => trimTrailingPeriod(item).split(/\s+and\s+/i))
    .filter(Boolean) ?? [];
  const medicalValue = trimTrailingPeriod(medicalSection?.items[0]);
  const technologyValue = trimTrailingPeriod(technologySection?.items[0]);
  const techLead = /samsung/i.test(technologyValue) ? "Samsung" : technologyValue;
  const techSupport = /aligned technology partners/i.test(technologyValue)
    ? "Aligned technology partners"
    : "";
  const autoItems = automotiveSection?.items.map((item) => trimTrailingPeriod(item)) ?? [];
  const autoFacilitator = autoItems[autoItems.length - 1] ?? "";
  const autoBrands = autoItems.slice(0, -1);

  return (
    <SlideShell slideNumber={number}>
      <div className="flex w-full flex-col justify-center gap-8 py-3 md:gap-10">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-display text-3xl leading-[1.05] text-ink md:text-[3.5rem]">
            <span>{primary}</span>
            {secondary ? <span className="text-mist">{` / ${secondary}`}</span> : null}
          </h1>
          {intro ? (
            <p className="mx-auto mt-6 max-w-6xl text-lg font-medium leading-relaxed text-mist md:text-[1.35rem] md:leading-[1.85rem]">
              {intro}
            </p>
          ) : null}
          {detail ? (
            <p className="mx-auto mt-1 max-w-6xl text-lg font-medium leading-relaxed text-mist md:text-[1.35rem] md:leading-[1.85rem]">
              {detail}
            </p>
          ) : null}
          {byline ? (
            <p className="mt-8 text-xl font-medium text-ink md:text-[1.4rem]">
              {trimTrailingPeriod(byline)}
            </p>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto w-fit rounded-[999px] border border-accent/20 bg-white/95 px-8 pt-3 pb-3 shadow-[0_4px_16px_rgba(17,22,28,0.06)] md:min-w-[42rem] md:px-16 md:py-4">
            <p className="text-center font-display text-2xl font-semibold tracking-tight text-ink md:text-[2.2rem]">
              {hubLabel}
            </p>
          </div>

          {/* Normal CSS Connecting Lines */}
          <div className="mx-auto hidden w-full flex-col items-center md:flex md:mb-0">
            {/* Center line down from Hub */}
            <div className="h-8 w-[2px] bg-gradient-to-b from-[#4d73c6] to-[#7a9adb]" />
            
            {/* Horizontal Spanning Line & Vertical Drops */}
            <div className="w-full" style={{ padding: "0 calc((100% - 4.5rem) / 8)" }}>
              {/* Spanning Horizontal Line */}
              <div className="h-[2px] w-full rounded-t-sm bg-[#7a9adb]" />
              
              {/* The 4 Vertical Drops */}
              <div className="flex w-full justify-between">
                <div className="h-6 w-[2px] rounded-b-sm bg-[#7a9adb]" />
                <div className="h-6 w-[2px] rounded-b-sm bg-[#7a9adb]" />
                <div className="h-6 w-[2px] rounded-b-sm bg-[#7a9adb]" />
                <div className="h-6 w-[2px] rounded-b-sm bg-[#7a9adb]" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:mt-4 md:grid-cols-4 md:gap-6">
            <div className="flex flex-col items-center">
              <MapBox className="w-full max-w-[15rem]">
                <p className="text-sm font-semibold uppercase tracking-[0.04em] text-ink md:text-[0.95rem]">
                  Oil &amp; Gas
                </p>
              </MapBox>
              {oilLead ? <MapPill className="mt-8 min-w-[9rem]">{oilLead}</MapPill> : null}
              {oilSupport.length > 0 ? (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  {oilSupport.map((item) => (
                    <MiniChip key={item}>{item}</MiniChip>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-center">
              <MapBox className="w-full max-w-[15rem]">
                <p className="text-sm font-semibold uppercase tracking-[0.04em] text-ink md:text-[0.95rem]">
                  Automotive
                </p>
              </MapBox>
              {autoFacilitator ? <MapPill className="mt-8 min-w-[9rem]">{autoFacilitator}</MapPill> : null}
              {autoBrands.length > 0 ? (
                <div className="mt-5 grid w-full max-w-[15rem] grid-cols-2 gap-3">
                  {autoBrands.map((brand) => (
                    <MiniChip key={brand}>{brand}</MiniChip>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-center">
              <MapBox className="w-full max-w-[15rem]">
                <p className="text-sm font-semibold uppercase tracking-[0.04em] text-ink md:text-[0.95rem]">
                  Medical
                </p>
              </MapBox>
              <MapPill className="mt-8 min-w-[9rem]">
                {medicalValue ? "Confidential" : "Medical"}
              </MapPill>
              {medicalValue ? (
                <p className="mt-4 max-w-[13rem] text-center text-sm leading-6 text-graphite md:text-[0.98rem]">
                  {medicalValue}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-center">
              <MapBox className="w-full max-w-[15rem]">
                <p className="text-sm font-semibold uppercase tracking-[0.04em] text-ink md:text-[0.95rem]">
                  Technology
                </p>
              </MapBox>
              {techLead ? <MapPill className="mt-8 min-w-[9rem]">{techLead}</MapPill> : null}
              {techSupport ? (
                <p className="mt-4 max-w-[13rem] text-center text-sm leading-6 text-graphite md:text-[0.98rem]">
                  {techSupport}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function SlideDeck({ slides }: SlideDeckProps) {
  const total = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const initialIndex = parseHash(total);
    setCurrentIndex(initialIndex);
  }, [total]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentIndex(parseHash(total));
    };
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

  const goPrevious = () => {
    setCurrentIndex((index) => clamp(index - 1, total));
  };

  const goNext = () => {
    setCurrentIndex((index) => clamp(index + 1, total));
  };

  return (
    <main className="min-h-screen">
      {slide.type === "cover" ? (
        <CoverSlide slide={slide} number={currentIndex + 1} />
      ) : slide.type === "timeline" ? (
        <TimelineSlide slide={slide} number={currentIndex + 1} />
      ) : slide.type === "phase1" ? (
        <Phase1Slide slide={slide} number={currentIndex + 1} />
      ) : slide.type === "map" ? (
        <MapSlide slide={slide} number={currentIndex + 1} />
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
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/92 text-xl text-ink shadow-deck transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent hover:bg-white hover:shadow-[0_28px_60px_rgba(17,22,28,0.14)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/92 text-xl text-ink shadow-deck transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent hover:bg-white hover:shadow-[0_28px_60px_rgba(17,22,28,0.14)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentIndex === total - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </main>
  );
}
