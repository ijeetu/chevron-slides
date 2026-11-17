"use client";

import { CueStatement, CueSteps, VoiceoverCues, useVoiceoverPosition } from "@/components/voiceover-cues";

/** Slide 3 — Colin Heaton's personal introduction (VF_Pres_11.08.26; photo, books and channels per 11.16–11.17.26). */
export function ColinIntroSlide() {
  const credentials = ["Military historian", "Author", "Former professor", "U.S. Army & Marine Corps veteran", "Historical film & documentary consultant"];
  return (
    <section className="flex h-full items-center justify-center px-6">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[auto_1fr]">
        <div className="mx-auto w-40 overflow-hidden rounded-[1.4rem] border border-[#9beaff]/30 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:w-48 md:w-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/colin/colin-heaton.png" alt="Colin D. Heaton" className="aspect-[312/438] h-full w-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Introducing the narrator</p>
          <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#f4f2ec]">Colin D. Heaton</h1>
          <div className="mx-auto mt-5 h-px w-48 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)] md:mx-0 md:bg-[linear-gradient(90deg,rgba(1,199,243,0.78),transparent)]" />
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.95rem] text-[#dbe6ec] sm:text-lg md:justify-start">
            {credentials.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden="true" className="text-[#9beaff]/60">·</span> : null}
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-6 text-[#a9bcc8] sm:text-base">
            Author of <em className="text-[#f4f2ec]">Above the Reich</em> and <em className="text-[#f4f2ec]">Above the Pacific</em>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {["The Forgotten History Channel", "Heaton's History"].map((channel) => (
              <span key={channel} className="rounded-full border border-[#9beaff]/35 bg-[#9beaff]/[0.08] px-5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[#9beaff] sm:text-sm">
                {channel}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Slide 15 — Executing the Vision: 250 YEARS, then TPUSA archival footage under George. */
// 11.17.26: the slide opens on 1776–2026, fades to 250 YEARS, then EXECUTING THE VISION,
// over the 5.6s lead-in of s15a before George begins.
const VISION_TITLES = [
  { text: "1776 – 2026", from: 0, to: 1.9 },
  { text: "250 YEARS", from: 1.9, to: 3.7 },
  { text: "EXECUTING THE VISION", from: 3.7, to: 5.4 },
];

function VisionTitleSequence() {
  const position = useVoiceoverPosition();
  if (position?.src !== "/voices/george-2611/s15a.mp3" || !(position.time < 5.6)) return null;
  const t = position.time;
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-[#07101a]">
      {VISION_TITLES.map((title) => {
        const opacity = Math.max(0, Math.min(1, (t - title.from) / 0.45, (title.to - t) / 0.45));
        return (
          <p key={title.text} className="absolute font-display text-[clamp(2.6rem,8vw,7rem)] font-semibold tracking-[-0.02em] text-[#f4f2ec]" style={{ opacity }}>
            {title.text}
          </p>
        );
      })}
    </div>
  );
}

export function ExecutingVisionSlide() {
  const closing = "/voices/george-2611/s15e.mp3";
  return (
    <section className="flex h-full items-center justify-center px-6 py-10">
      <VisionTitleSequence />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="text-center md:text-left">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Executing the vision</p>
          <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f4f2ec]">250 YEARS</h1>
          <p className="mt-6 max-w-xl font-display text-[clamp(1.2rem,2.2vw,1.9rem)] leading-[1.25] text-[#dbe6ec] md:mx-0 mx-auto">
            A movement can start with one man—someone who executes a strong vision with absolute conviction and puts in the time.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[#9beaff]/80">His vision — look at what it became.</p>
        </div>
        <div className="mx-auto w-full max-w-[19rem] overflow-hidden rounded-[1.2rem] border border-[#9beaff]/30 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <video
            src="/executing-vision/tpusa-crowd.mp4"
            poster="/executing-vision/tpusa-crowd-poster.jpg"
            className="aspect-[9/16] h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Charlie Kirk throwing hats into the crowd at a Turning Point USA event"
          />
        </div>
      </div>
      <VoiceoverCues
        cues={[
          { src: closing, from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="TPUSA was a turning point.">This platform is what comes next.</CueStatement> },
        ]}
      />
    </section>
  );
}

const george = (file: string) => `/voices/george-2611/${file}.mp3`;
const colinTrack = (file: string) => `/voices/colin-2611/${file}.mp3`;

/** Slide 10 — the long game: persistence → influence as George says it. */
export function LongGameCues() {
  return (
    <VoiceoverCues
      cues={[
        // span set so each step lands as George says it (28.7s, 31.1s, 33.2s, 34.1s; 11.16.26 "their vision" adds 0.1s)
        { src: george("s10a"), from: 28.5, to: 34.1 + 1.6, render: (p) => <CueSteps steps={["PERSISTENCE", "CAPABILITY", "SCALE", "INFLUENCE"]} progress={p * (7.2 / 5.6)} /> },
      ]}
    />
  );
}

/**
 * CueSteps reveals step i once progress reaches i / steps.length. This maps a cue's
 * progress to that scale so each step appears at its own time (seconds into the cue).
 */
function atTimes(times: readonly number[], span: number) {
  return (progress: number) => (times.filter((t) => progress * span >= t).length - 1) / times.length;
}

/** Slide 11 — technological power, then the move from technology to networks (Colin). */
export function TechnologicalPowerCues() {
  const colinC11a = colinTrack("c11a");
  const colinC11b = colinTrack("c11b");
  // Seconds into each take where Colin names each item.
  const tech = { from: 19.0, to: 26.0, at: [0.2, 1.8, 2.8, 4.5, 5.3] };
  const network = { from: 21.3, to: 40.2, at: [0.2, 1.0, 2.1, 3.7, 4.9, 5.7, 7.1, 8.2] };
  return (
    <VoiceoverCues
      cues={[
        { src: colinC11a, from: tech.from, to: tech.to, render: (p) => (
          <CueSteps steps={["ARTIFICIAL INTELLIGENCE", "ROBOTICS", "ADVANCED MANUFACTURING", "ENERGY", "DIGITAL INFRASTRUCTURE"]} progress={atTimes(tech.at, tech.to - tech.from)(p)} />
        ) },
        { src: colinC11a, from: 40.2, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="More than technological progress">A strategy for national power.</CueStatement> },
        { src: colinC11b, from: network.from, to: network.to, render: (p) => (
          <CueSteps eyebrow="Behind public policy sits another architecture" steps={["DONORS", "FOUNDATIONS", "ADVOCACY ORGANIZATIONS", "POLITICAL NETWORKS", "MEDIA", "LEGAL INSTITUTIONS", "PRIVATE CAPITAL", "COMPETING CENTERS OF INFLUENCE"]} progress={atTimes(network.at, network.to - network.from)(p)} />
        ) },
        { src: colinC11b, from: 42.9, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Another form of power">THE NETWORK</CueStatement> },
      ]}
    />
  );
}

/** Example cards, each revealed at its own second into the cue. */
function ExampleCards({ eyebrow, cards, elapsed }: { eyebrow?: string; cards: readonly { at: number; title: string; example: string }[]; elapsed: number }) {
  return (
    <div className="mx-auto max-w-6xl text-center">
      {eyebrow ? <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff] sm:text-xs">{eyebrow}</p> : null}
      <ul className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.title}
            className={`rounded-2xl border border-[#9beaff]/25 bg-[#0d1d2b]/85 px-6 py-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-500 ${elapsed >= card.at ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            <p className="font-display text-[clamp(1.05rem,2vw,1.7rem)] font-semibold tracking-[0.04em] text-[#f4f2ec]">{card.title}</p>
            <p className="mt-3 text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#a9bcc8]">{card.example}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Slide 12 — networks compound power. */
export function NetworkCues() {
  const s12a = george("s12a");
  const c12a = colinTrack("c12a");
  // 11.16.26: examples on screen to strengthen the section (times are seconds into each take).
  const compound = { from: 1.7, to: 7.0 };
  const serve = { from: 10.4, to: 15.5 };
  const ecosystem = { from: 3.8, to: 13.2, at: [0.2, 1.2, 2.2, 3.9, 5.0, 6.2, 7.6] };
  return (
    <VoiceoverCues
      cues={[
        { src: s12a, from: compound.from, to: compound.to, render: (p) => (
          <ExampleCards eyebrow="How technology companies compound power" elapsed={p * (compound.to - compound.from)} cards={[
            { at: 0.2, title: "INNOVATION", example: "SpaceX made rockets reusable, cutting the cost of reaching orbit." },
            { at: 1.3, title: "CAPITAL", example: "Private investment now funds frontier AI at the scale of national budgets." },
            { at: 2.2, title: "INFRASTRUCTURE", example: "Starlink's satellite network delivers connectivity almost anywhere on Earth." },
          ]} />
        ) },
        { src: s12a, from: serve.from, to: serve.to, render: (p) => (
          <ExampleCards eyebrow="Those capabilities can do extraordinary things" elapsed={p * (serve.to - serve.from)} cards={[
            { at: 0.2, title: "STRENGTHEN OUR MILITARY", example: "Anduril autonomous defense systems · Palantir battlefield software" },
            { at: 1.5, title: "SUPPORT LAW ENFORCEMENT", example: "Body cameras and digital evidence systems used by police nationwide" },
            { at: 3.2, title: "PROTECT OUR COMMUNITIES", example: "Starlink restoring connectivity to disaster zones" },
          ]} />
        ) },
        { src: c12a, from: ecosystem.from, to: ecosystem.to, render: (p) => (
          <CueSteps eyebrow="Political influence can compound too" steps={["FOUNDATIONS", "DONORS", "ADVOCACY ORGANIZATIONS", "LEGAL GROUPS", "MEDIA", "RESEARCH INSTITUTIONS", "POLITICAL NETWORKS"]} progress={atTimes(ecosystem.at, ecosystem.to - ecosystem.from)(p)} />
        ) },
        { src: c12a, from: 13.2, to: 19.6, render: (p) => (
          <CueSteps eyebrow="An ecosystem capable of shaping" steps={["PUBLIC DEBATE", "PUBLIC POLICY", "INSTITUTIONAL PRIORITIES"]} progress={atTimes([2.0, 3.2, 4.4], 6.4)(p)} />
        ) },
        { src: c12a, from: 19.9, to: 39.6, render: (p) => (
          <ExampleCards eyebrow="One of the most debated examples" elapsed={p * 19.7} cards={[
            { at: 3.2, title: "GEORGE SOROS · OPEN SOCIETY FOUNDATIONS", example: "One of the world's largest private funders of civil-society groups" },
            { at: 6.2, title: "SUPPORTERS SEE", example: "Philanthropy advancing democracy, civil society and human rights" },
            { at: 13.5, title: "CRITICS SEE", example: "A long-term architecture of political and institutional influence" },
          ]} />
        ) },
        { src: george("s12b"), from: 11.0, to: 20.2, render: (p) => (
          <CueSteps eyebrow="Networks compound power" steps={["INSTITUTIONS", "MEDIA", "LAW", "POLITICS", "RESEARCH", "ORGANIZED ACTION"]} progress={p * (9.2 / 6.6)} />
        ) },
        // 11.13.26: bring "It becomes durable. Distributed." on screen (20.3s, 21.7s).
        { src: george("s12b"), from: 20.2, to: 28.9, render: (p) => (
          <div className="text-center">
            <CueStatement eyebrow="Networks compound power">It becomes durable.</CueStatement>
            <p className={`mt-4 font-display text-[clamp(2rem,5vw,4.6rem)] font-semibold tracking-[-0.03em] text-[#9beaff] transition-opacity duration-500 ${p * 8.7 >= 1.5 ? "opacity-100" : "opacity-0"}`}>Distributed.</p>
          </div>
        ) },
      ]}
    />
  );
}

/** Slide 14 — George's answer. */
export function WeBuildItCue() {
  return <VoiceoverCues cues={[{ src: george("s14b"), from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement>WE BUILD IT.</CueStatement> }]} />;
}


/** Slide 22 — Phase One teaser at the end of Colin's opening, before George begins. */
export function PhysicalInfrastructureCues() {
  return (
    <VoiceoverCues
      cues={[
        { src: colinTrack("c22a"), from: 31.5, to: Number.POSITIVE_INFINITY, render: () => (
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff]">Coming up</p>
            <p className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.02em] text-[#f4f2ec]">PHASE ONE</p>
            <p className="mt-2 font-display text-[clamp(1.1rem,2.6vw,2rem)] font-semibold tracking-[0.04em] text-[#dbe6ec]">HIGH-TRAFFIC DEPLOYMENT NETWORK</p>
            <p className="mt-3 text-sm text-[#a9bcc8]">Locations and rollout strategy to follow</p>
          </div>
        ) },
      ]}
    />
  );
}

function Node({ title, sub, state }: { title: string; sub: string; state: "on" | "off" | "core" }) {
  const tone =
    state === "core" ? "border-[#9beaff] bg-[#12283a]" : state === "on" ? "border-[#9beaff]/45 bg-[#101f2d]" : "border-red-400/50 bg-[#2a1416]/70 opacity-70";
  return (
    <div className={`rounded-2xl border px-4 py-3 text-center transition-all duration-700 ${tone}`}>
      <p className="font-display text-[0.85rem] font-semibold tracking-[0.04em] text-[#f4f2ec] sm:text-base">{title}</p>
      <p className={`mt-1 text-[0.7rem] sm:text-xs ${state === "off" ? "text-red-300" : "text-[#a9bcc8]"}`}>{sub}</p>
    </div>
  );
}

/** Slide 23 — interoperability hub, resilience (normal → X unavailable), and the closing progression. */
export function StrategicAllianceCues() {
  const hub = (
    <div className="mx-auto w-full max-w-3xl text-center">
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#9beaff]">Platforms connect to Viral Fusion — they do not replace it</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Node title="X + xAI" sub="Preferred strategic alliance" state="on" />
        <Node title="META / FACEBOOK" sub="Potential integration" state="on" />
        <Node title="OTHER PLATFORMS" sub="Future options" state="on" />
      </div>
      <p className="my-3 text-[#9beaff]" aria-hidden="true">↓ ↓ ↓</p>
      <Node title="VIRAL FUSION — CIVIC OPERATING SYSTEM" sub="Verified participation · Public sentiment · Auditable records" state="core" />
    </div>
  );
  const resilience = (xDown: boolean) => (
    <div className="mx-auto w-full max-w-3xl text-center">
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#9beaff]">
        {xDown ? "Hypothetical — X becomes unavailable" : "Proposed architecture — normal operation"}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Node title={xDown ? "X ACCESS" : "X + xAI"} sub={xDown ? "Restricted or unavailable" : "Acceleration layer · Connected"} state={xDown ? "off" : "on"} />
        <Node title="SOVEREIGN NETWORK" sub={xDown ? "Core services continue where permitted" : "Independent continuity layer · Operational"} state="on" />
      </div>
      <p className="my-3 text-[#9beaff]" aria-hidden="true">↓</p>
      <Node
        title={xDown ? "VIRAL FUSION REMAINS INDEPENDENTLY ACCESSIBLE" : "VIRAL FUSION CIVIC OPERATING SYSTEM"}
        sub={xDown ? "Intended outcome, subject to lawful access and independent technical operation" : "Verified participation · Public sentiment · Auditable records"}
        state="core"
      />
    </div>
  );
  return (
    <VoiceoverCues
      cues={[
        { src: colinTrack("c23a"), from: 38.7, to: Number.POSITIVE_INFINITY, render: () => hub },
        { src: george("g23a"), from: 0, to: Number.POSITIVE_INFINITY, render: () => resilience(false) },
        { src: george("g23b"), from: 0, to: 11.8, render: () => resilience(false) },
        { src: george("g23b"), from: 11.8, to: Number.POSITIVE_INFINITY, render: () => resilience(true) },
        { src: colinTrack("c23c"), from: 20.3, to: Number.POSITIVE_INFINITY, render: (p) => (
          <div className="text-center">
            <CueSteps steps={["VOICE", "VERIFICATION", "ACTION"]} progress={p * (6.3 / 2.6)} />
            <p className="mt-5 font-display text-[clamp(1rem,2.2vw,1.6rem)] font-semibold tracking-[0.12em] text-[#9beaff]">DISTRIBUTION + RESILIENCE</p>
          </div>
        ) },
      ]}
    />
  );
}
