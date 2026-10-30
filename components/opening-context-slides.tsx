"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowRight, Bot, Cpu, Factory, Network, Play, Zap } from "lucide-react";

type ContextProps = { onOpenVideo?: (url: string) => void };

const longGameVideo = "https://player.vimeo.com/video/1206848346?h=a76eaac1c9&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1";

function ContextFrame({ children, labelledBy }: { children: ReactNode; labelledBy: string }) {
  return <section aria-labelledby={labelledBy} className="presentation-scroll flex h-full w-full flex-col overflow-y-auto px-[6%] pb-[132px] pt-[82px] text-[#f4f2ec]">
    <div className="my-auto w-full max-w-[1400px] self-center">{children}</div>
  </section>;
}

function ContextHeader({ title, chapter, titleId }: { title: string; chapter: string; titleId: string }) {
  return <header>
    <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#9beaff] sm:text-xs">BENEATH THE NOISE <span className="mx-2 text-[#9beaff]/40">/</span> {chapter}</p>
    <h1 id={titleId} className="mt-3 max-w-6xl font-display text-[clamp(2rem,4.6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-.045em]">{title}</h1>
  </header>;
}

const powerCenters = [
  { title: "MILITARY", description: "INDUSTRIAL COMPLEX", domain: "Defense · National security", foundation: "Decades of government spending", accent: "#8fb6d0" },
  { title: "FINANCIAL", description: "INDUSTRIAL COMPLEX", domain: "Capital · Banking · Debt · Markets", foundation: "The institutions financing governments and industry", accent: "#b4cbdd" },
  { title: "TECHNOLOGY", description: "INDUSTRIAL COMPLEX", domain: "AI · Robotics · Data · Energy", foundation: "Advanced manufacturing and digital infrastructure", accent: "#9beaff" },
] as const;

export function RevisedCompetitionSlide() {
  const titleId = useId();
  return <ContextFrame labelledBy={titleId}>
    <ContextHeader title="The Competition for Power" chapter="01" titleId={titleId} />
    <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#b7c8d2] sm:text-[clamp(.9rem,1.3vw,1.15rem)]">Three centers of influence. Power increasingly moves between them.</p>
    <div className="relative mt-7 sm:mt-10">
      <ol className="grid list-none gap-4 p-0 md:grid-cols-3 md:gap-7">
        {powerCenters.map((center, index) => <li key={center.title} className="relative min-w-0 rounded-2xl border border-[#9beaff]/20 bg-[linear-gradient(140deg,rgba(38,58,75,.72),rgba(11,26,39,.88))] px-6 py-6 sm:px-7 sm:py-8">
          <p className="font-mono text-[10px] tracking-[.16em] text-[#85adbf]">0{index + 1}</p>
          <h2 className="mt-5 font-display text-[clamp(1.5rem,2.5vw,2.65rem)] font-semibold leading-none tracking-[-.025em]" style={{ color: center.accent }}>{center.title}</h2>
          <p className="mt-2 text-[10px] font-medium tracking-[.14em] text-[#b5c8d6] sm:text-[11px]">{center.description}</p>
          <div className="mt-5 border-t border-[#9beaff]/15 pt-4 sm:mt-8 sm:pt-5">
            <p className="text-[13px] leading-relaxed text-[#e0ebf1] sm:text-[clamp(.8rem,1.1vw,1rem)]">{center.domain}</p>
            <p className="mt-2 min-h-[2.8em] text-xs leading-relaxed text-[#91adbf] sm:text-[13px]">{center.foundation}</p>
          </div>
          {index < 2 && <ArrowRight aria-hidden="true" size={20} strokeWidth={1.4} className="absolute -bottom-[19px] left-1/2 z-10 -translate-x-1/2 rotate-90 text-[#9beaff]/65 md:-right-6 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0" />}
        </li>)}
      </ol>
      <div aria-hidden="true" className="mx-auto hidden h-5 w-[68%] rounded-b-2xl border-x border-b border-[#9beaff]/25 md:block" />
    </div>
    <div className="mt-6 flex flex-col gap-4 border-b border-[#9beaff]/20 pb-6 text-[11px] leading-relaxed text-[#9dbccb] sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6 sm:text-[13px]">
      <p>CAPITAL <span className="mx-2 text-[#9beaff]">→</span> OPPORTUNITY</p>
      <p>TECHNOLOGY <span className="mx-2 text-[#9beaff]">→</span> STRATEGIC POSSIBILITY</p>
      <p>GOVERNMENT <span className="mx-2 text-[#9beaff]">→</span> RESOURCE FLOWS</p>
    </div>
    <p className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2.6rem)] leading-[1.2] tracking-[-.025em]">Power rarely appears suddenly. <span className="text-[#9beaff]">It compounds.</span></p>
    <p className="mt-3 text-[11px] leading-relaxed text-[#94adbd] sm:text-xs">A conceptual framework for examining influence; no single system is presented as controlling everything.</p>
  </ContextFrame>;
}

const longGameSteps = [
  { title: "PERSISTENCE", body: "Build. Fail. Rebuild. Try again." },
  { title: "CAPABILITY", body: "Turn ideas into working technology." },
  { title: "SCALE", body: "Expand into industry and infrastructure." },
  { title: "INFLUENCE", body: "Become part of the systems governments depend upon." },
] as const;

export function RevisedLongGameSlide({ onOpenVideo }: ContextProps) {
  const titleId = useId();
  const [inlineVideo, setInlineVideo] = useState(false);
  const play = () => onOpenVideo ? onOpenVideo(longGameVideo) : setInlineVideo(true);
  return <ContextFrame labelledBy={titleId}>
    <ContextHeader title="The Long Game" chapter="02" titleId={titleId} />
    <div className="mt-7 grid items-center gap-8 lg:mt-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
      <div>
        <div className="relative aspect-video overflow-hidden rounded-[20px] border border-[#9beaff]/25 bg-[#07121e]">
          {inlineVideo ? <iframe src={longGameVideo} title="The Long Game — archival video" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button type="button" onClick={play} className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(42,83,108,.45),transparent_75%)] px-8 text-center transition-colors hover:bg-[#142a3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-[#9beaff]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(155,234,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(155,234,255,.14)_1px,transparent_1px)] [background-size:35px_35px]" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#9beaff]/50 bg-[#9beaff]/[.06] text-[#9beaff] transition-transform group-hover:scale-105 sm:h-16 sm:w-16"><Play size={23} fill="currentColor" strokeWidth={1.2} className="ml-1" /></span>
            <span className="relative mt-5 font-display text-[clamp(1.2rem,2vw,2rem)] font-medium tracking-[-.02em]">Let&apos;s go back.</span>
            <span className="relative mt-2 text-[10px] font-semibold uppercase tracking-[.15em] text-[#9bb8ca]">WATCH THE LONG GAME</span>
          </button>}
        </div>
        <p className="mt-4 max-w-[36rem] text-sm leading-relaxed text-[#a9c0cf]">Ideas once at the margins became part of industry, defense, government, and national infrastructure.</p>
      </div>
      <ol className="list-none p-0">
        {longGameSteps.map((step, index) => <li key={step.title} className="relative grid grid-cols-[26px_1fr] gap-4 border-b border-[#9beaff]/15 py-4 first:pt-0 last:border-0 lg:py-5">
          <span className="pt-1 font-mono text-[10px] tracking-[.13em] text-[#68a9c3]">0{index + 1}</span>
          <div><h2 className="font-display text-[clamp(1.1rem,1.7vw,1.65rem)] font-semibold leading-none tracking-[-.02em] text-[#9beaff]">{step.title}</h2><p className="mt-2 text-xs leading-relaxed text-[#afc4d2] sm:text-[13px]">{step.body}</p></div>
        </li>)}
      </ol>
    </div>
    <p className="mt-6 max-w-5xl border-t border-[#9beaff]/20 pt-5 font-display text-[clamp(1.25rem,2vw,2rem)] leading-[1.25] tracking-[-.025em]">Why not understand the system—<br className="hidden sm:block" />build something better—and change it?</p>
  </ContextFrame>;
}

const technologyFields = [
  { label: "AI", Icon: Cpu },
  { label: "ROBOTICS", Icon: Bot },
  { label: "ADVANCED MANUFACTURING", Icon: Factory },
  { label: "ENERGY", Icon: Zap },
  { label: "DIGITAL INFRASTRUCTURE", Icon: Network },
] as const;

export function RevisedTechnologicalPowerSlide() {
  const titleId = useId();
  return <ContextFrame labelledBy={titleId}>
    <ContextHeader title="Technological Power" chapter="02" titleId={titleId} />
    <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#b3c7d4] sm:text-[clamp(.9rem,1.4vw,1.25rem)]">The technologies defining the next century—and a public role in shaping them.</p>
    <ol className="mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-5 sm:gap-4 lg:mt-10">
      {technologyFields.map(({ label, Icon }) => <li key={label} className="flex min-h-[130px] min-w-0 flex-col items-center justify-center rounded-2xl border border-[#9beaff]/20 bg-[linear-gradient(145deg,rgba(31,57,75,.65),rgba(11,27,40,.8))] px-3 py-5 text-center sm:min-h-[160px] sm:px-4">
        <Icon size={31} strokeWidth={1.35} className="shrink-0 text-[#9beaff]" aria-hidden="true" />
        <h2 className="mt-5 max-w-[15rem] text-[10px] font-semibold leading-relaxed tracking-[.1em] text-[#e4eff4] sm:text-[clamp(.6rem,.9vw,.85rem)]">{label}</h2>
      </li>)}
    </ol>
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-[10px] font-medium uppercase tracking-[.08em] text-[#97b8cb] sm:gap-4 sm:text-xs">
      <span>Mobilize capital</span><ArrowRight size={14} className="text-[#9beaff]/60" aria-hidden="true" /><span>Expand domestic capability</span><ArrowRight size={14} className="text-[#9beaff]/60" aria-hidden="true" /><span>Align government and industry</span>
    </div>
    <div className="mt-8 border-t border-[#9beaff]/25 pt-6 sm:mt-9">
      <p className="text-[10px] font-semibold tracking-[.16em] text-[#9beaff] sm:text-xs">PUBLIC PARTICIPATION IN THE ARCHITECTURE</p>
      <div className="mt-4 grid gap-5 md:grid-cols-3 md:gap-8">
        {[
          { question: "What gets built?", detail: "Where technology is deployed." },
          { question: "Under what rules?", detail: "The safeguards and institutions around it." },
          { question: "For whose benefit?", detail: "Who ultimately benefits." },
        ].map(({ question, detail }) => <div key={question}>
          <h2 className="font-display text-[clamp(1.35rem,2.35vw,2.3rem)] font-medium leading-[1.15] tracking-[-.025em]">{question}</h2>
          <p className="mt-2 text-xs leading-relaxed text-[#a7bfce] sm:text-sm">{detail}</p>
        </div>)}
      </div>
    </div>
  </ContextFrame>;
}
