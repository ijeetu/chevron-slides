"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  FileText,
  Globe2,
  MessagesSquare,
  Play,
  ScanLine,
} from "lucide-react";

export const BENEATH_NOISE_POWER_VIDEO_URL =
  "https://player.vimeo.com/video/1208320570?h=27898b1a19&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1";

export const BENEATH_NOISE_GLOBAL_VIDEO_URL =
  "https://www.youtube.com/embed/6CN5UBeEwrU";

const chapters = [
  { number: "01", title: "POWER" },
  { number: "02", title: "THE LONG GAME" },
  { number: "03", title: "NETWORKS" },
  { number: "04", title: "GLOBAL INCENTIVES" },
] as const;

type OpenVideo = (url: string) => void;

function ChapterSlide({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section
      aria-label={label}
      className="presentation-scroll relative flex h-full min-h-0 w-full flex-col overflow-y-auto px-4 pb-28 pt-8 text-[#f4f2ec] sm:px-[5%]"
    >
      <div className="my-auto w-full">{children}</div>
    </section>
  );
}

function ChapterLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[0.72rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-[#9beaff] sm:text-[0.8rem] sm:tracking-[0.2em]">
      {children}
    </p>
  );
}

export function BeneathNoiseIntroSlide({ onOpenVideo }: { onOpenVideo: OpenVideo }) {
  return (
    <ChapterSlide label="Beneath the Noise chapter introduction">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-7 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <header>
          <div aria-hidden="true" className="mb-5 h-1 w-12 bg-[#9beaff] sm:mb-7" />
          <h1 className="font-display text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            BENEATH
            <br />
            THE NOISE
          </h1>
          <p className="mt-5 max-w-[29rem] text-[1rem] leading-relaxed text-[#c2cdd5] sm:mt-7 sm:text-[1.1rem] lg:max-w-[31rem] lg:text-[1.2rem]">
            An investigation into the systems operating above everyday politics.
          </p>
        </header>

        <div className="w-full">
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {chapters.map((chapter) => (
              <li key={chapter.number} className="flex items-center gap-4 py-3.5 sm:gap-6 sm:py-5">
                <span className="font-display text-[0.85rem] font-medium tabular-nums text-[#9beaff] sm:text-[1rem]">
                  {chapter.number}
                </span>
                <span className="font-display text-[0.97rem] font-semibold tracking-[-0.025em] sm:text-[1.15rem] lg:text-[1.3rem]">
                  {chapter.title}
                </span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => onOpenVideo(BENEATH_NOISE_POWER_VIDEO_URL)}
            className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#9beaff]/35 bg-[#9beaff]/[0.08] px-5 py-3 text-[0.78rem] font-semibold tracking-[0.08em] text-[#9beaff] transition-colors hover:border-[#9beaff]/70 hover:bg-[#9beaff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9beaff] sm:mt-7 sm:px-6 sm:text-[0.85rem]"
          >
            <Play aria-hidden="true" className="h-4 w-4 fill-current" />
            WATCH CHAPTER 01
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </button>
        </div>
      </div>
    </ChapterSlide>
  );
}

const recapSteps = [
  { number: null, title: "VISIBLE PROBLEMS" },
  { number: null, title: "BENEATH THE NOISE" },
  { number: "01", title: "COMPETING CENTERS OF POWER" },
  { number: "02", title: "THE RISE OF TECHNOLOGICAL POWER" },
  { number: "03", title: "NETWORKED POLITICAL INFLUENCE" },
  { number: "04", title: "GLOBAL INCENTIVES & CONSEQUENCES" },
] as const;

export function BeneathNoiseRecapSlide() {
  return (
    <ChapterSlide label="Beneath the Noise: What We Learned">
      <div className="mx-auto w-full max-w-4xl text-center">
        <header>
          <ChapterLabel>BENEATH THE NOISE:</ChapterLabel>
          <h1 className="mt-2 font-display text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[2.6rem] lg:text-[3rem]">
            WHAT WE LEARNED
          </h1>
        </header>

        <ol className="mx-auto mt-5 flex w-full max-w-[43rem] flex-col items-center sm:mt-6">
          {recapSteps.map((step, index) => (
            <li key={step.title} className="flex w-full flex-col items-center">
              <div className={`flex min-h-9 w-full items-center justify-center gap-2 px-2 py-1.5 sm:gap-3 ${index === 1 ? "text-[#9beaff]" : "text-[#e4e9ec]"}`}>
                {step.number ? (
                  <span className="shrink-0 font-display text-[0.75rem] font-medium tabular-nums text-[#9beaff] sm:text-[0.88rem]">
                    {step.number}
                    <span aria-hidden="true" className="ml-2 text-[#9beaff]/45 sm:ml-3">—</span>
                  </span>
                ) : null}
                <span className="font-display text-[0.81rem] font-semibold leading-snug tracking-[0.015em] sm:text-[1.02rem] lg:text-[1.12rem]">
                  {step.title}
                </span>
              </div>
              <ArrowDown aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#9beaff]/50" />
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-4 max-w-[46rem] border-t border-[#9beaff]/25 pt-4 sm:mt-5 sm:pt-5">
          <ChapterLabel>THE QUESTION</ChapterLabel>
          <p className="mt-2 font-display text-[1.25rem] font-medium leading-[1.3] tracking-[-0.025em] text-[#f4f2ec] sm:text-[1.75rem] lg:text-[2rem]">
            How do citizens regain meaningful agency over what comes next?
          </p>
        </div>
      </div>
    </ChapterSlide>
  );
}

type GlobalIncentivesSlideProps = {
  embedUrl?: string;
  thumbnailSrc?: string;
  onOpenVideo?: OpenVideo;
};

export function GlobalIncentivesSlide({
  embedUrl = BENEATH_NOISE_GLOBAL_VIDEO_URL,
  thumbnailSrc = "/beneath-noise-global-incentives.jpg",
  onOpenVideo,
}: GlobalIncentivesSlideProps) {
  const canOpenVideo = Boolean(embedUrl && onOpenVideo);

  return (
    <ChapterSlide label="Beneath the Noise chapter 04: Global Incentives">
      <div className="mx-auto w-full max-w-5xl text-center">
        <header>
          <ChapterLabel>BENEATH THE NOISE // 04</ChapterLabel>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            GLOBAL INCENTIVES
          </h1>
        </header>

        {embedUrl ? (
          <div className="mx-auto mt-6 w-full max-w-[52rem] overflow-hidden rounded-[1.2rem] border border-[#9beaff]/30 bg-black p-1 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:max-w-[min(52rem,calc((100dvh-21rem)*1.7778))]">
            <div className="relative aspect-video">
              {canOpenVideo ? (
                <button
                  type="button"
                  aria-label="Watch Global Incentives with Andrei Jikh"
                  onClick={() => onOpenVideo?.(embedUrl)}
                  className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0c1721] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#9beaff]"
                >
                  {thumbnailSrc ? (
                    <Image src={thumbnailSrc} alt="" fill sizes="(max-width: 900px) 90vw, 832px" className="object-cover" />
                  ) : (
                    <Globe2 aria-hidden="true" className="absolute h-36 w-36 text-[#9beaff]/15 sm:h-64 sm:w-64" strokeWidth={0.6} />
                  )}
                  <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/15" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/65 bg-[#101b26]/80 text-white backdrop-blur-sm transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                    <Play aria-hidden="true" className="ml-1 h-5 w-5 fill-current sm:h-7 sm:w-7" />
                  </span>
                  <span className="absolute bottom-3 left-4 text-[0.72rem] font-semibold tracking-[0.12em] text-white sm:bottom-5 sm:left-6 sm:text-[0.85rem]">WATCH CHAPTER 04</span>
                </button>
              ) : (
                <iframe
                  src={embedUrl}
                  title="Global Incentives — Andrei Jikh"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-6 rounded-[1.2rem] border border-white/10 bg-[#142330]/65 px-5 py-8 sm:py-10">
            <Globe2 aria-hidden="true" className="h-24 w-24 text-[#9beaff]/65 sm:h-32 sm:w-32" strokeWidth={0.75} />
            <p className="max-w-xl font-display text-[1.2rem] font-medium leading-snug text-[#e4e9ec] sm:text-[1.6rem]">
              A map of competing interests—and their consequences.
            </p>
          </div>
        )}

        <footer className="mx-auto mt-4 flex max-w-[52rem] flex-col items-center justify-center gap-1 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-0">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.78rem] text-[#bccbd5] sm:gap-x-4 sm:text-[0.85rem]">
            {["Energy", "Markets", "War", "Trade", "Religion", "Geopolitics"].map((theme, index) => (
              <span key={theme} className="inline-flex items-center gap-3 sm:gap-4">
                {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#9beaff]/50" /> : null}
                {theme}
              </span>
            ))}
          </div>
          <a
            href="https://www.youtube.com/watch?v=6CN5UBeEwrU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[0.78rem] text-[#9beaff] underline decoration-[#9beaff]/35 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9beaff] sm:text-[0.85rem]"
          >
            Watch on YouTube
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </footer>
      </div>
    </ChapterSlide>
  );
}

const globalStructures = [
  { label: "Institutions", Icon: Building2 },
  { label: "Frameworks", Icon: ScanLine },
  { label: "Forums", Icon: MessagesSquare },
  { label: "Agreements", Icon: FileText },
] as const;

export function FinalBeneathNoiseSlide() {
  return (
    <ChapterSlide label="Beneath the Noise final chapter: The Global Framework">
      <div className="mx-auto w-full max-w-6xl text-center">
        <header>
          <ChapterLabel>BENEATH THE NOISE // FINAL CHAPTER</ChapterLabel>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.3vw,4.3rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            THE GLOBAL FRAMEWORK
          </h1>
        </header>

        <div className="relative mx-auto mt-7 w-full max-w-5xl sm:mt-10">
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-[linear-gradient(90deg,rgba(155,234,255,0.12),rgba(155,234,255,0.5),rgba(155,234,255,0.12))] sm:block" />
          <ul className="relative grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-5">
            {globalStructures.map(({ label, Icon }) => (
              <li key={label} className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#9beaff]/25 bg-[#142330] text-[#9beaff] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.4} />
                </div>
                <span className="font-display text-[0.85rem] font-medium sm:text-[1.05rem] lg:text-[1.25rem]">{label}</span>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-5 flex flex-col items-center sm:mt-7">
            <div aria-hidden="true" className="h-5 w-px bg-[#9beaff]/35 sm:h-7" />
            <p className="max-w-xl rounded-full border border-[#9beaff]/25 bg-[#9beaff]/[0.06] px-4 py-3 font-display text-[0.9rem] font-medium leading-snug text-[#9beaff] sm:px-7 sm:text-[1.15rem]">
              Competing geopolitical interests
            </p>
          </div>
        </div>

        <div className="mx-auto mt-7 grid w-full max-w-4xl gap-5 border-t border-white/10 pt-5 text-left sm:mt-9 sm:grid-cols-2 sm:gap-10 sm:pt-6">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#9beaff] sm:text-[0.78rem]">DOCUMENTED STRUCTURES</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-[#c2cdd5] sm:text-[1rem]">Institutions, published frameworks, and agreements.</p>
          </div>
          <div className="sm:border-l sm:border-white/10 sm:pl-10">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#e7b45d] sm:text-[0.78rem]">INTERPRETATIONS</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-[#c2cdd5] sm:text-[1rem]">Claims about influence, purpose, and intent.</p>
          </div>
        </div>
      </div>
    </ChapterSlide>
  );
}
