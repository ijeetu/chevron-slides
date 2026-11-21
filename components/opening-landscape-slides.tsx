"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Cable, ChevronRight, Cpu, Leaf, Orbit, Pause, Play, RadioTower, RotateCcw, SkipForward } from "lucide-react";
import styles from "./opening-landscape-slides.module.css";
import { useVoiceoverPosition } from "@/components/voiceover-cues";

type MediaProps = { onOpenVideo?: (url: string) => void };

// These controls manage the visual build; the deck owns slide narration.
function useVisualBuild(labels: readonly string[], interval = 5500) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) { setStage(labels.length - 1); setPlaying(false); }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [labels.length]);
  useEffect(() => {
    if (!playing || reducedMotion || stage >= labels.length - 1) return;
    const timer = window.setTimeout(() => setStage(value => Math.min(value + 1, labels.length - 1)), interval);
    return () => window.clearTimeout(timer);
  }, [interval, labels.length, playing, reducedMotion, stage]);
  return { stage, playing: playing && stage < labels.length - 1, reducedMotion,
    pause: () => setPlaying(false),
    next: () => { setPlaying(false); setStage(value => Math.min(value + 1, labels.length - 1)); },
    complete: () => { setPlaying(false); setStage(labels.length - 1); },
    replay: () => { setStage(0); setPlaying(false); },
    toggle: () => { if (stage >= labels.length - 1) setStage(0); setPlaying(value => !value); },
    label: labels[stage], last: stage === labels.length - 1,
  };
}

function BuildControls({ build }: { build: ReturnType<typeof useVisualBuild> }) {
  return <div className={styles.controls} role="group" aria-label="Slide animation controls" onKeyDown={event => event.stopPropagation()}>
    <button type="button" onClick={build.replay} aria-label="Replay visual sequence" title="Replay visual sequence"><RotateCcw size={16} /></button>
    {!build.reducedMotion && <button type="button" onClick={build.toggle} aria-label={build.playing ? "Pause visual sequence" : "Play visual sequence"} title={build.playing ? "Pause visual sequence" : "Play visual sequence"}>{build.playing ? <Pause size={16} /> : <Play size={16} />}</button>}
    <button type="button" onClick={build.next} disabled={build.last} aria-label="Next visual scene" title="Next visual scene"><ChevronRight size={17} /></button>
    <button type="button" onClick={build.complete} disabled={build.last} aria-label="Show complete slide" title="Show complete slide"><SkipForward size={16} /></button>
    <span aria-live="polite">{build.label}</span>
  </div>;
}

function SlideFrame({ children, title, eyebrow, build, centeredHeader = false }: { children: ReactNode; title: string; eyebrow?: string; build: ReturnType<typeof useVisualBuild>; centeredHeader?: boolean }) {
  const titleId = useId();
  return <section className={styles.root} aria-labelledby={titleId} data-reduced-motion={build.reducedMotion} data-scene={build.stage}>
    <div className={styles.frame}>
      <header className={`${styles.header} ${centeredHeader ? styles.centeredHeader : ""}`}>{eyebrow && <p>{eyebrow}</p>}<h1 id={titleId} className="font-display">{title}</h1></header>
      {children}
    </div>
    <BuildControls build={build} />
  </section>;
}

function MediaButton({ url, children, onOpenVideo, onPlay }: MediaProps & { url: string; children: ReactNode; onPlay: () => void }) {
  return onOpenVideo
    ? <button className={styles.mediaButton} type="button" onClick={() => { onPlay(); onOpenVideo(url); }}><Play size={16} aria-hidden="true" />{children}<ArrowRight size={16} aria-hidden="true" /></button>
    : <a className={styles.mediaButton} href={url} target="_blank" rel="noopener noreferrer" onClick={onPlay}><Play size={16} aria-hidden="true" />{children}<ArrowRight size={16} aria-hidden="true" /></a>;
}

const ANNIVERSARY_SCENES = ["250 years", "A movement", "The Constitution", "Accountability", "Execution", "A movement through results", "The next chapter"] as const;

export function RevisedAnniversarySlide({ onOpenVideo }: MediaProps = {}) {
  const build = useVisualBuild(ANNIVERSARY_SCENES, 9000);
  const { stage } = build;
  return <SlideFrame title="1776–2026" eyebrow="250 YEARS" build={build} centeredHeader>
    <div className={styles.anniversary} key={stage}>
      {(stage === 0 || stage === 6) && <div className={styles.anniversaryTitle}>
        <span className={styles.yearsRule} aria-hidden="true" />
        <h2 className="font-display">{stage === 0 ? <>DOES “WE THE PEOPLE”<br />STILL RULE?</> : <>THIS PLATFORM IS<br /><em>WHAT COMES NEXT.</em></>}</h2>
        {stage === 6 && <p>And it starts right here, today.</p>}
      </div>}
      {stage === 1 && <div className={styles.mediaScene}>
        <p className={styles.eyebrow}>A MOVEMENT CAN START WITH ONE MAN</p>
        <h2 className="font-display">A vision.<br />Conviction. <em>Execution.</em></h2>
        <MediaButton url="https://www.youtube.com/embed/XnKxnoZMCjM?autoplay=1" onOpenVideo={onOpenVideo} onPlay={build.pause}>Charlie Kirk / TPUSA — source footage</MediaButton>
        <p className={styles.caption}>Archival excerpt · 5–8 seconds</p>
      </div>}
      {stage === 2 && <div className={styles.mediaScene}>
        <p className={styles.eyebrow}>PUBLIC RESPONSIBILITY</p>
        <h2 className="font-display">Promises.<br />The oath. <em>The Constitution.</em></h2>
        <MediaButton url="https://www.youtube.com/embed/EMxgI9kdTyY?start=242&end=258&autoplay=1" onOpenVideo={onOpenVideo} onPlay={build.pause}>Tulsi Gabbard · 4:02–4:18</MediaButton>
      </div>}
      {stage === 3 && <div className={styles.accountability}>
        <p className={styles.eyebrow}>CONSTITUTIONAL ACCOUNTABILITY</p>
        <h2 className="font-display">What do we do when our constitutional republic is no longer working for <em>“We the People”?</em></h2>
      </div>}
      {(stage === 4 || stage === 5) && <div className={styles.executionScene}>
        <p className={styles.eyebrow}>{stage === 4 ? "THREE HOURS. A SHARED PURPOSE." : "BUILD THE FOUNDATION"}</p>
        <ol className={styles.progression}>
          {(stage === 4 ? ["DISTRIBUTION", "STRATEGY", "TECHNOLOGY", "EXECUTION"] : ["PLATFORM", "PROVEN RESULTS", "MOVEMENT"]).map((word, index) => <li key={word}><span className="font-display">{word}</span>{index < (stage === 4 ? 3 : 2) && <ArrowRight size={22} aria-hidden="true" />}</li>)}
        </ol>
      </div>}
    </div>
  </SlideFrame>;
}

const PYRAMID_SCENES = ["The problems", "Protect our children"] as const;
const PROBLEM_TIERS = [
  ["Public Safety & Justice"],
  ["Housing & Homelessness", "Education & Workforce"],
  ["Economy, Jobs & Business", "Healthcare & Mental Health", "Infrastructure & Transport"],
  ["Energy, Water & Environment", "Fiscal Responsibility", "Governance & Accountability"],
  ["Technology, Privacy & Cybersecurity", "Civil Rights & Quality of Life", "Immigration & Border", "Civic Participation"],
] as const;

export function ChildrenPyramidSlide() {
  const build = useVisualBuild(PYRAMID_SCENES, 14000);
  return <SlideFrame title="The problems we must understand" build={build} centeredHeader>
    <div className={styles.pyramid}>
      <div className={styles.pyramidGlow} aria-hidden="true" />
      <div className={styles.childrenApex} data-visible={build.stage >= 1} aria-hidden={build.stage < 1}>CHILDREN</div>
      {PROBLEM_TIERS.map((tier, index) => <div className={styles.pyramidTier} style={{ width: `${42 + index * 14.5}%`, gridTemplateColumns: `repeat(${tier.length}, minmax(0, 1fr))` }} key={index}>
        {tier.map(label => <span key={label}>{label}</span>)}
      </div>)}
      <p className={styles.pyramidClosing} data-visible={build.stage >= 1} aria-hidden={build.stage < 1}>We cannot be united if we cannot even protect our children.</p>
    </div>
  </SlideFrame>;
}

const NETWORK_NODES = ["INSTITUTIONS", "MEDIA", "LAW", "POLITICS", "RESEARCH", "ORGANIZED ACTION"] as const;
const NETWORK_VIDEO_URL = "https://www.youtube.com/embed/vsVTsB_SaGQ?autoplay=1";

/**
 * 11.20.26: THE POWER OF NETWORKS starts alone in the middle of the screen, then the video plays.
 * George's voice then comes in over a cleaned-up slide: capital at the center, six connections around it.
 */
export function NetworkPowerSlide({ onOpenVideo }: MediaProps = {}) {
  const [opened, setOpened] = useState(false);
  const open = () => {
    setOpened(true);
    if (onOpenVideo) onOpenVideo(NETWORK_VIDEO_URL); else window.open(NETWORK_VIDEO_URL, "_blank", "noopener,noreferrer");
  };
  useEffect(() => {
    if (opened || !onOpenVideo) return;
    const timer = window.setTimeout(() => { setOpened(true); onOpenVideo(NETWORK_VIDEO_URL); }, 2800);
    return () => window.clearTimeout(timer);
  }, [opened, onOpenVideo]);
  if (!opened) {
    return <section className="flex h-full w-full flex-col items-center justify-center px-6 text-center text-[#f4f2ec]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Beneath the Noise // 03</p>
      <h1 className="mt-4 font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em]">THE POWER OF NETWORKS</h1>
      <button type="button" onClick={open} className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#9beaff]/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9beaff] hover:bg-[#9beaff]/10"><Play size={14} aria-hidden="true" />Play the documentary</button>
    </section>;
  }
  return <section className="presentation-scroll flex h-full w-full flex-col items-center overflow-y-auto px-6 pb-24 pt-16 text-[#f4f2ec]" aria-labelledby="network-power-title">
    <div className="my-auto flex w-full flex-col items-center">
    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Beneath the Noise // 03</p>
    <h1 id="network-power-title" className="mt-3 text-center font-display text-[clamp(2rem,4.6vw,4.2rem)] font-semibold leading-none tracking-[-0.04em]">The Power of Networks</h1>
    <div className="relative mt-10 grid w-full max-w-4xl grid-cols-2 items-center gap-3 sm:grid-cols-3 sm:gap-4">
      {NETWORK_NODES.slice(0, 3).map(node => <span key={node} className="rounded-xl border border-[#9beaff]/25 bg-[#9beaff]/[0.06] px-3 py-4 text-center text-[11px] font-semibold tracking-[0.14em] text-[#dbe6ec] sm:text-sm">{node}</span>)}
      <div className="col-span-2 my-2 flex flex-col items-center justify-center rounded-2xl border border-[#9beaff]/50 bg-[radial-gradient(ellipse_at_center,rgba(42,83,108,.55),rgba(11,26,39,.9))] py-6 sm:col-span-3 sm:my-4 sm:py-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9beaff]">Connected</span>
        <strong className="mt-1 font-display text-[clamp(1.8rem,4vw,3.2rem)] tracking-[-0.03em]">CAPITAL</strong>
      </div>
      {NETWORK_NODES.slice(3).map(node => <span key={node} className="rounded-xl border border-[#9beaff]/25 bg-[#9beaff]/[0.06] px-3 py-4 text-center text-[11px] font-semibold tracking-[0.14em] text-[#dbe6ec] sm:text-sm">{node}</span>)}
    </div>
    <p className="mt-8 font-display text-[clamp(1.2rem,2.4vw,2rem)] tracking-[-0.02em] text-[#9beaff]">Networks compound power.</p>
    <button type="button" onClick={open} className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9bb8ca] hover:text-[#9beaff]"><Play size={12} aria-hidden="true" />Replay the documentary</button>
    </div>
  </section>;
}

const GLOBAL_SCENES = ["Widening the lens", "Competing incentives", "Everyday consequences", "Four interpretations", "Everything connects"] as const;
const GLOBAL_FORCES = ["Energy", "Capital", "War", "Trade", "Technology", "Religion", "Geopolitics"] as const;
const HOUSEHOLD_EFFECTS = ["Fuel", "Food", "Housing", "Interest rates", "Jobs", "Savings", "Supply chains"] as const;
const INTERPRETATIONS = ["Iranian economic warfare", "Transnational capital", "American energy strategy", "Religious prophecy & geopolitics"] as const;

export function GlobalIncentivesMapSlide({ onOpenVideo }: MediaProps = {}) {
  const build = useVisualBuild(GLOBAL_SCENES, 7000);
  return <SlideFrame title="GLOBAL INCENTIVES" eyebrow="BENEATH THE NOISE // 04" build={build}>
    <div className={styles.globalComposition}>
      <div className={styles.globalMap} aria-label="Conceptual map of global incentives and household consequences">
        <p className={styles.eyebrow}>DIFFERENT ACTORS. DIFFERENT MOTIVES.</p>
        <div className={styles.forceRow} data-visible={build.stage >= 1} aria-hidden={build.stage < 1}>{GLOBAL_FORCES.map(force => <span key={force}>{force}</span>)}</div>
        <div className={styles.mapConnector} data-visible={build.stage >= 1} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.incentivesCenter}>COMPETING INCENTIVES</div>
        <div className={styles.mapConnector} data-visible={build.stage >= 2} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.householdRow} data-visible={build.stage >= 2} aria-hidden={build.stage < 2}>{HOUSEHOLD_EFFECTS.map(effect => <span key={effect}>{effect}</span>)}</div>
        <p className={styles.mapCaption} data-visible={build.stage >= 2} aria-hidden={build.stage < 2}>ORDINARY PEOPLE ABSORB THE CONSEQUENCES</p>
      </div>
      <div className={styles.interpretations} data-visible={build.stage >= 3} aria-hidden={build.stage < 3}>
        <p className={styles.eyebrow}>FOUR COMPETING EXPLANATIONS · ANDREI JIKH</p>
        <div>{INTERPRETATIONS.map((theory, index) => <p key={theory}><span>0{index + 1}</span>{theory}</p>)}</div>
      </div>
      <footer className={styles.globalFooter}>
        <p className="font-display">{build.stage >= 4 ? "A map of competing incentives—and the consequences when they converge." : "Everything connects."}</p>
        <div className={styles.globalVideo}><Image src="/beneath-noise-global-incentives.jpg" alt="Global Incentives documentary thumbnail" width={112} height={63} /><MediaButton url="https://www.youtube.com/embed/6CN5UBeEwrU?autoplay=1" onOpenVideo={onOpenVideo} onPlay={build.pause}>Watch Global Incentives</MediaButton></div>
      </footer>
    </div>
  </SlideFrame>;
}

const PILLARS = [
  { name: "Technology", detail: "CAPABILITY", Icon: Cpu },
  { name: "Connectivity", detail: "SCALE", Icon: Cable },
  { name: "Sustainability", detail: "LONGEVITY", Icon: Leaf },
  { name: "Media Rails", detail: "UNDERSTANDING & DISTRIBUTION", Icon: RadioTower },
  { name: "Powerful Ecosystem", detail: "PEOPLE · CAPITAL · EXPERTISE", Icon: Orbit },
] as const;
const PILLAR_SCENES = ["Five pillars", "Technology", "Connectivity", "Sustainability", "Media Rails", "A Powerful Ecosystem", "Hard-wired to action"] as const;

// Seconds into George's s18a where he names each pillar, then "Because— action is the ultimate currency of freedom."
const PILLAR_VOICE_TIMES = [1.5, 2.6, 3.5, 4.85, 6.1, 33.8] as const;

export function RevisedFivePillarsSlide() {
  const build = useVisualBuild(PILLAR_SCENES, 5500);
  // 11.20.26: the board was staying empty under George's narration — each pillar now appears as he names it,
  // and the completed graphic holds through his closing statement.
  const position = useVoiceoverPosition();
  const voiceStage = position?.src === "/voices/george-2611/s18a.mp3" ? PILLAR_VOICE_TIMES.filter(t => position.time >= t).length : null;
  const stage = voiceStage ?? build.stage;
  return <SlideFrame title="FIVE PILLARS" eyebrow="HARD-WIRED TO ACTION" build={build}>
    <div className={styles.pillars}>
      {PILLARS.map(({ name, detail, Icon }, index) => <article key={name} data-visible={stage >= index + 1} aria-hidden={stage < index + 1}>
        <span className={styles.pillarNumber}>0{index + 1}</span><Icon size={36} strokeWidth={1.3} aria-hidden="true" /><h2 className="font-display">{name}</h2><p>{detail}</p>
      </article>)}
    </div>
    {/* 11.20.26: the struck "Shorten the distance… Deploy. Integrate…" closing gives way to George's final line. */}
    <div className={styles.pillarOutcome} data-visible={stage >= 6} aria-hidden={stage < 6}>
      <h2 className="font-display">Action is the ultimate currency of freedom.</h2>
    </div>
  </SlideFrame>;
}
