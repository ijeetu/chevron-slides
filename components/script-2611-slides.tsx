"use client";

import { CueStatement, CueSteps, VoiceoverCues } from "@/components/voiceover-cues";

/** Slide 3 — Colin Heaton's personal introduction (VF_Pres_11.08.26). */
export function ColinIntroSlide() {
  const credentials = ["Military historian", "Author", "Former professor", "U.S. Army & Marine Corps veteran"];
  return (
    <section className="flex h-full items-center justify-center px-6">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Personal introduction</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#f4f2ec]">Colin Heaton</h1>
        <div className="mx-auto mt-6 h-px w-48 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
        <ul className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.95rem] text-[#dbe6ec] sm:text-lg">
          {credentials.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 ? <span aria-hidden="true" className="text-[#9beaff]/60">·</span> : null}
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-[#a9bcc8] sm:text-base">
          Preserving the stories and lessons of the past — and bringing them to new audiences.
        </p>
      </div>
    </section>
  );
}

/** Slide 15 — Executing the Vision: 250 YEARS, then TPUSA archival footage under George. */
export function ExecutingVisionSlide() {
  const closing = "/voices/george-2611/s15e.mp3";
  return (
    <section className="flex h-full items-center justify-center px-6 py-10">
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
        // span set so each step lands as George says it (28.6s, 31.0s, 33.1s, 34.0s)
        { src: george("s10a"), from: 28.4, to: 34.0 + 1.6, render: (p) => <CueSteps steps={["PERSISTENCE", "CAPABILITY", "SCALE", "INFLUENCE"]} progress={p * (7.2 / 5.6)} /> },
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

/** Slide 12 — networks compound power. */
export function NetworkCues() {
  return (
    <VoiceoverCues
      cues={[
        { src: george("s12b"), from: 11.0, to: 24.0, render: (p) => (
          <CueSteps eyebrow="Networks compound power" steps={["INSTITUTIONS", "MEDIA", "LAW", "POLITICS", "RESEARCH", "ORGANIZED ACTION"]} progress={p * (13 / 6.6)} />
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
