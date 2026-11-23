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
          {/* 11.22.26: the suit portrait George sent, lightly touched up (light, skin tone, studio backdrop). */}
          <img src="/colin/colin-heaton-suit.webp" alt="Colin D. Heaton" className="aspect-[2/3] h-full w-full object-cover object-top" />
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
// over the lead-in of s15a before George begins. 11.20.26: more time between them — the
// lead-in is now 8.7s, so each title holds about 2.9s.
const VISION_LEAD_IN = 8.7;
const VISION_TITLES = [
  { text: "1776 – 2026", from: 0, to: 2.9 },
  { text: "250 YEARS", from: 2.9, to: 5.8 },
  { text: "EXECUTING THE VISION", from: 5.8, to: 8.5 },
];

function VisionTitleSequence() {
  const position = useVoiceoverPosition();
  if (position?.src !== "/voices/george-2611/s15a.mp3" || !(position.time < VISION_LEAD_IN)) return null;
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
          {/* 11.20.26: keep this simpler — the title alone beside the TPUSA footage. */}
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">1776 – 2026 · 250 years</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,7.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-[#f4f2ec]">Executing the Vision</h1>
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

/**
 * 11.17.26 (rev 2): a photo for each example as Colin names it (seconds into c10a).
 * Rockets: SpaceX (CC0). Ghost X: U.S. Army photo (public domain). Musk: U.S. Air Force photo (public domain).
 * The AI data center, orbital data center and Warhound images are illustrative renders.
 */
const LONG_GAME_EXAMPLES = [
  { at: 7.1, src: "/long-game/ai-at-scale.webp", title: "Artificial intelligence at scale", caption: "OpenAI · Google DeepMind · Anthropic · xAI · Meta", note: "Illustrative" },
  { at: 9.3, src: "/long-game/reusable-rockets.webp", title: "Reusable rockets", caption: "SpaceX Falcon Heavy side boosters landing, 2018", note: "Photo: SpaceX" },
  { at: 11.0, src: "/long-game/anduril-ghost-x.webp", title: "Autonomous systems", caption: "Anduril Ghost X at Redstone Arsenal", note: "Photo: U.S. Army" },
  { at: 12.6, src: "/long-game/space-data-center.webp", title: "Private space infrastructure", caption: "AI data centers in orbit", note: "Concept render" },
  // 11.20.26: "Software transforming government" is cut; Warhound shows its homepage image, slowly zooming.
  { at: 14.3, src: "/long-game/warhound-dogs.webp", title: "Entire industries rebuilt around technology", caption: "Warhound — the advanced canine genetics & cybernetic platform (Colossal Biosciences · Anduril)", note: "Image: warhound.com" },
] as const;

const LONG_GAME_EXAMPLES_START = 7.1;
const LONG_GAME_PEOPLE_AT = 17.6;

function LongGameExamples({ time }: { time: number }) {
  const current = LONG_GAME_EXAMPLES.reduce((found, item, i) => (time >= item.at ? i : found), 0);
  const people = time >= LONG_GAME_PEOPLE_AT;
  // 11.20.26: "The Long Game" holds in the center of the screen until the first example appears.
  const intro = time < LONG_GAME_EXAMPLES_START;
  const last = LONG_GAME_EXAMPLES[LONG_GAME_EXAMPLES.length - 1];
  const zoom = 1 + 0.14 * Math.max(0, Math.min(1, (time - last.at) / (LONG_GAME_PEOPLE_AT - last.at)));
  return (
    <div className="pointer-events-none fixed inset-0 bg-[#07101a]">
      {LONG_GAME_EXAMPLES.map((item, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={item.src}
          src={item.src}
          alt={item.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${!intro && !people && i === current ? "opacity-100" : "opacity-0"}`}
          style={item === last ? { transform: `scale(${zoom})` } : undefined}
        />
      ))}
      <div className={`absolute inset-0 flex items-center justify-center bg-[#07101a] px-6 transition-opacity duration-500 ${intro ? "opacity-100" : "opacity-0"}`}>
        <div className="text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Beneath the Noise / 02</p>
          <p className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-none tracking-[-0.04em] text-[#f4f2ec]">The Long Game</p>
        </div>
      </div>
      <div className={`absolute inset-0 flex items-center justify-center bg-[#07101a] px-6 transition-opacity duration-700 ${people ? "opacity-100" : "opacity-0"}`}>
        <div className="flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/long-game/elon-musk.webp" alt="Elon Musk" className="h-[min(52vh,26rem)] rounded-[1.4rem] border border-[#9beaff]/30 object-cover shadow-[0_24px_60px_rgba(0,0,0,0.45)]" />
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff] sm:text-xs">Decades pursuing ideas others doubted</p>
            <p className="mt-3 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-[#f4f2ec]">Elon Musk</p>
            <p className="mt-3 text-sm text-[#a9bcc8]">SpaceX · Tesla · Starlink · xAI</p>
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-white/40">Photo: U.S. Air Force</p>
          </div>
        </div>
      </div>
      {!people && !intro ? (
        <>
          <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(7,16,26,0.9),transparent)]" />
          <div className="absolute left-6 top-6 max-w-[calc(100vw-7rem)] sm:left-10 sm:top-8">
            <p className="font-display text-[clamp(1.5rem,3.4vw,2.8rem)] font-semibold tracking-[-0.01em] text-[#f4f2ec]">{LONG_GAME_EXAMPLES[current].title}</p>
            <p className="mt-1 text-sm text-[#cfe3ec]">{LONG_GAME_EXAMPLES[current].caption}</p>
            {LONG_GAME_EXAMPLES[current].note ? <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/45">{LONG_GAME_EXAMPLES[current].note}</p> : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

/** Slide 10 — the long game: example photos as Colin names them, then persistence → influence as George says it. */
export function LongGameCues() {
  return (
    <VoiceoverCues
      cues={[
        { src: colinTrack("c10a"), from: 0, to: 23.8, render: (p) => <LongGameExamples time={p * 23.8} /> },
        // span set so each step lands as George says it (28.3s, 30.7s, 32.8s, 33.7s; 11.20.26 "The" cut moves them 0.42s earlier)
        { src: george("s10a"), from: 28.08, to: 33.68 + 1.6, render: (p) => <CueSteps steps={["PERSISTENCE", "CAPABILITY", "SCALE", "INFLUENCE"]} progress={p * (7.2 / 5.6)} /> },
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

/** Full-screen subtitles: the current spoken line and nothing else. */
function Subtitles({ time, lines }: { time: number; lines: readonly { at: number; text: string }[] }) {
  const current = lines.reduce((found, line, i) => (time >= line.at ? i : found), 0);
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-[#07101a] px-8">
      {lines.map((line, i) => (
        <p key={line.text} className={`absolute max-w-5xl text-center font-display text-[clamp(1.8rem,4.4vw,4rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[#f4f2ec] transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}>
          {line.text}
        </p>
      ))}
    </div>
  );
}

/** Slide 11 — technological power, then the move from technology to networks (Colin). */
export function TechnologicalPowerCues() {
  const colinC11a = colinTrack("c11a");
  const colinC11b = colinTrack("c11b");
  // Seconds into each take where Colin names each item.
  const tech = { from: 19.0, to: 26.0, at: [0.2, 1.8, 2.8, 4.5, 5.3] };
  const network = { from: 21.3, to: 31.7, at: [0.2, 1.0, 2.1, 3.7, 4.9, 5.7, 7.1, 8.2] };
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
        // 11.20.26: subtitles only for "Technology may determine… / But networks can determine…".
        { src: colinC11b, from: 31.7, to: 40.2, render: (p) => (
          <Subtitles time={31.7 + p * 8.5} lines={[
            { at: 31.7, text: "Technology may determine what is possible." },
            { at: 33.95, text: "But networks can determine what becomes funded, permitted, adopted, and institutionalized." },
          ]} />
        ) },
        // 11.20.26: THE NETWORK holds longer (c11b now ends with 3 seconds of silence).
        { src: colinC11b, from: 42.9, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Another form of power">THE NETWORK</CueStatement> },
      ]}
    />
  );
}

/** Slide 12 — networks compound power. 11.17.26 (rev 2): the lead-in narration and its examples are removed; the video plays after the title. */
export function NetworkCues() {
  return (
    <VoiceoverCues
      cues={[
        { src: george("s12b"), from: 11.0, to: 20.2, render: (p) => (
          <CueSteps eyebrow="Networks compound power" steps={["INSTITUTIONS", "MEDIA", "LAW", "POLITICS", "RESEARCH", "ORGANIZED ACTION"]} progress={p * (9.2 / 6.6)} />
        ) },
        // 11.20.26: Colin's "Organize. Understand. Create change. And pursue lawful reform—" on screen (12.9s, 14.6s, 15.4s, 16.6s).
        { src: colinTrack("c12b"), from: 12.8, to: 22.4, render: (p) => (
          <CueSteps eyebrow="What happens when citizens can—" steps={["ORGANIZE", "UNDERSTAND", "CREATE CHANGE", "PURSUE LAWFUL REFORM"]} progress={atTimes([0.1, 1.8, 2.55, 3.85], 9.6)(p)} />
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


const AI_LADY_SCENES = [
  { at: 0, src: "/physical/ai-lady-mall.webp", label: "Shopping mall", caption: "Public engagement" },
  { at: 4.4, src: "/physical/ai-lady-office.webp", label: "Office", caption: "Information & services" },
  { at: 8.8, src: "/physical/ai-lady-dmv.webp", label: "DMV", caption: "Government services · conceptual future implementation" },
  { at: 13.2, src: "/physical/ai-lady-classroom.webp", label: "Classroom", caption: "Education · teacher-led" },
] as const;

/** Slide 22 — the AI Lady on displays in four environments, presented as one connected network. */
function AiLadyScenes({ time }: { time: number }) {
  const current = AI_LADY_SCENES.reduce((found, scene, i) => (time >= scene.at ? i : found), 0);
  return (
    <div className="pointer-events-none fixed inset-0 bg-[#07101a]">
      {AI_LADY_SCENES.map((scene, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={scene.src}
          src={scene.src}
          alt={`AI civic assistant on a connected display — ${scene.label}`}
          className={`absolute inset-0 h-full w-full object-cover object-[72%_50%] transition-[opacity,transform] duration-1000 ${i === current ? "scale-105 opacity-100" : "scale-100 opacity-0"}`}
          style={{ transitionDuration: i === current ? "1000ms, 6000ms" : "1000ms, 1000ms" }}
        />
      ))}
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(7,16,26,0.9),transparent)]" />
      <div className="absolute left-6 top-6 max-w-[calc(100vw-7rem)] text-left sm:left-10 sm:top-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff] sm:text-xs">One connected network</p>
        <p className="mt-2 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-[0.02em] text-[#f4f2ec]">{AI_LADY_SCENES[current].label}</p>
        <p className="mt-1 text-sm text-[#a9bcc8]">{AI_LADY_SCENES[current].caption}</p>
        <ol className="mt-4 flex items-center gap-2" aria-hidden="true">
          {AI_LADY_SCENES.map((scene, i) => (
            <li key={scene.src} className={`h-1.5 rounded-full transition-all duration-700 ${i <= current ? "w-10 bg-[#01c7f3]" : "w-5 bg-white/25"}`} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export function PhysicalInfrastructureCues() {
  return (
    <VoiceoverCues
      cues={[
        // 11.19.26: the AI Lady scenes run across Colin's "These are more than advertising displays…" (c22a2);
        // the Phase One teaser that followed them is struck.
        { src: colinTrack("c22a2"), from: 0, to: Number.POSITIVE_INFINITY, render: (p) => <AiLadyScenes time={p * 17.6} /> },
        // 11.18.26: "It is permanence." on screen as George says it (2.9s into s22c).
        { src: george("s22c"), from: 2.9, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Bigger than distribution">It is permanence.</CueStatement> },
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
        // 11.18.26 order: Colin c23a → George g23n → Colin c23e → George g23a, g23b → Colin c23b → George g23d → Colin c23d → George g23f, g23c → Colin c23c → George g23e
        { src: george("g23n"), from: 0, to: Number.POSITIVE_INFINITY, render: () => hub },
        { src: colinTrack("c23e"), from: 0, to: Number.POSITIVE_INFINITY, render: () => hub },
        { src: george("g23a"), from: 0, to: Number.POSITIVE_INFINITY, render: () => resilience(false) },
        { src: george("g23b"), from: 0, to: Number.POSITIVE_INFINITY, render: () => resilience(false) },
        { src: colinTrack("c23b"), from: 0, to: 8.9, render: () => resilience(false) },
        // "Think about the countries that blocked X…"
        { src: colinTrack("c23b"), from: 8.9, to: Number.POSITIVE_INFINITY, render: () => resilience(true) },
        { src: george("g23d"), from: 0, to: Number.POSITIVE_INFINITY, render: () => resilience(true) },
        { src: colinTrack("c23d"), from: 0, to: 7.7, render: () => resilience(false) },
        // "The other ensures the infrastructure can endure."
        { src: colinTrack("c23d"), from: 7.7, to: Number.POSITIVE_INFINITY, render: () => resilience(true) },
        { src: george("g23f"), from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Together">Scale without dependency.</CueStatement> },
        { src: george("g23c"), from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Scaling globally">Without surrendering its independence.</CueStatement> },
        { src: colinTrack("c23c"), from: 1.5, to: Number.POSITIVE_INFINITY, render: (p) => (
          <CueSteps eyebrow="The bottom line" steps={["PUBLIC PARTICIPATION", "VERIFIED PUBLIC DEMAND", "LAWFUL ACTION"]} progress={atTimes([0.1, 1.9, 8.0], 16.65)(p)} />
        ) },
        { src: george("g23e"), from: 3.2, to: Number.POSITIVE_INFINITY, render: (p) => (
          <div className="text-center">
            <CueSteps steps={["VOICE", "VERIFICATION", "ACTION"]} progress={atTimes([0.1, 1.2, 2.5], 5.54)(p)} />
            <p className="mt-5 font-display text-[clamp(1rem,2.2vw,1.6rem)] font-semibold tracking-[0.12em] text-[#9beaff]">DISTRIBUTION + RESILIENCE</p>
          </div>
        ) },
      ]}
    />
  );
}

/**
 * Slide 15 — Operating System (11.20.26): the title moves to the left and fades out,
 * then turns into Viral Fusion before the deck moves on to George's voiceover.
 */
export function OperatingSystemIntroSlide() {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-6 text-[#f4f2ec]">
      <h1 className="absolute font-display text-[clamp(2.6rem,8vw,7rem)] font-semibold tracking-[-0.04em] motion-safe:animate-[osToLeft_2.2s_ease-in-out_forwards]">Operating System</h1>
      <p aria-hidden="true" className="absolute font-display text-[clamp(2.8rem,9vw,8rem)] font-semibold tracking-[-0.04em] text-[#9beaff] opacity-0 motion-safe:animate-[osToViralFusion_3s_ease-out_forwards]">Viral Fusion</p>
      <style>{`
        @keyframes osToLeft { 0%, 30% { transform: translateX(0); opacity: 1 } 75% { opacity: .35 } 100% { transform: translateX(-34vw); opacity: 0 } }
        @keyframes osToViralFusion { 0%, 55% { opacity: 0; transform: scale(.94) } 85%, 100% { opacity: 1; transform: scale(1) } }
      `}</style>
    </section>
  );
}
