"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Cable, ChevronRight, Cpu, Leaf, Orbit, Pause, Play, RadioTower, RotateCcw, SkipForward } from "lucide-react";
import styles from "./opening-landscape-slides.module.css";

type MediaProps = { onOpenVideo?: (url: string) => void };

// These controls rehearse the visual build; they do not claim to play narration.
function useVisualBuild(labels: readonly string[], interval = 5500) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const beforeScript = useRef(false);
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
    const handleScript = (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail.open;
      if (open) setPlaying(current => { beforeScript.current = current; return false; });
      else setPlaying(beforeScript.current);
    };
    window.addEventListener("opening-script-visibility", handleScript);
    return () => window.removeEventListener("opening-script-visibility", handleScript);
  }, []);
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
  return <div className={styles.controls} role="group" aria-label="Visual rehearsal controls" onKeyDown={event => event.stopPropagation()}>
    <button type="button" onClick={build.replay} aria-label="Replay visual sequence" title="Replay visual sequence"><RotateCcw size={16} /></button>
    {!build.reducedMotion && <button type="button" onClick={build.toggle} aria-label={build.playing ? "Pause visual sequence" : "Play visual sequence"} title={build.playing ? "Pause visual sequence" : "Play visual sequence"}>{build.playing ? <Pause size={16} /> : <Play size={16} />}</button>}
    <button type="button" onClick={build.next} disabled={build.last} aria-label="Next visual scene" title="Next visual scene"><ChevronRight size={17} /></button>
    <button type="button" onClick={build.complete} disabled={build.last} aria-label="Show complete slide" title="Show complete slide"><SkipForward size={16} /></button>
    <span aria-live="polite">{build.label}</span>
  </div>;
}

function SlideFrame({ children, title, eyebrow, build }: { children: ReactNode; title: string; eyebrow?: string; build: ReturnType<typeof useVisualBuild> }) {
  const titleId = useId();
  return <section className={styles.root} aria-labelledby={titleId} data-reduced-motion={build.reducedMotion} data-scene={build.stage}>
    <div className={styles.frame}>
      <header className={styles.header}>{eyebrow && <p>{eyebrow}</p>}<h1 id={titleId} className="font-display">{title}</h1></header>
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
  return <SlideFrame title="1776–2026" eyebrow="250 YEARS" build={build}>
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
  return <SlideFrame title="The problems we must understand" build={build}>
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

const NETWORK_SCENES = ["Capital", "Institutions", "Media", "Law", "Politics", "Research", "Organized action", "Durable. Distributed.", "Infrastructure for citizens"] as const;
const NETWORK_NODES = ["INSTITUTIONS", "MEDIA", "LAW", "POLITICS", "RESEARCH", "ORGANIZED ACTION"] as const;

export function NetworkPowerSlide({ onOpenVideo }: MediaProps = {}) {
  const build = useVisualBuild(NETWORK_SCENES, 4000);
  return <SlideFrame title="THE POWER OF NETWORKS" eyebrow="BENEATH THE NOISE // 03" build={build}>
    <div className={styles.networkComposition}>
      <div className={styles.networkBoard}>
        <div className={styles.networkCenter}><span className={styles.eyebrow}>{build.stage >= 8 ? "CITIZEN" : "CONNECTED"}</span><strong className="font-display">{build.stage >= 8 ? "INFRASTRUCTURE" : "CAPITAL"}</strong></div>
        <div className={styles.networkNodes}>{NETWORK_NODES.map((node, index) => <div key={node} data-visible={build.stage >= index + 1} aria-hidden={build.stage < index + 1}><i aria-hidden="true" /><span className="font-display">{node}</span></div>)}</div>
      </div>
      <div className={styles.networkConclusion}>
        <p className={styles.eyebrow}>NETWORKS COMPOUND POWER</p>
        <h2 className="font-display">{build.stage >= 8 ? <>Citizens gain<br /><em>infrastructure of their own.</em></> : build.stage >= 7 ? <>Durable.<br /><em>Distributed.</em></> : <>Power is embedded<br /><em>in networks.</em></>}</h2>
        <MediaButton url="https://www.youtube.com/embed/vsVTsB_SaGQ?autoplay=1" onOpenVideo={onOpenVideo} onPlay={build.pause}>Watch the documentary</MediaButton>
        <p className={styles.caption}>George Soros &amp; the Open Society ecosystem</p>
      </div>
    </div>
  </SlideFrame>;
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

export function RevisedFivePillarsSlide() {
  const build = useVisualBuild(PILLAR_SCENES, 5500);
  return <SlideFrame title="FIVE PILLARS" eyebrow="HARD-WIRED TO ACTION" build={build}>
    <div className={styles.pillars}>
      {PILLARS.map(({ name, detail, Icon }, index) => <article key={name} data-visible={build.stage >= index + 1} aria-hidden={build.stage < index + 1}>
        <span className={styles.pillarNumber}>0{index + 1}</span><Icon size={36} strokeWidth={1.3} aria-hidden="true" /><h2 className="font-display">{name}</h2><p>{detail}</p>
      </article>)}
    </div>
    <div className={styles.pillarOutcome} data-visible={build.stage >= 6} aria-hidden={build.stage < 6}>
      <p className={styles.eyebrow}>ONE OBJECTIVE</p>
      <h2 className="font-display">Shorten the distance between</h2>
      <div className={styles.actionRail}><span>PUBLIC VOICE</span><i aria-hidden="true" /><ArrowRight size={26} aria-hidden="true" /><strong>LAWFUL ACTION</strong></div>
      <p className={styles.actionMethods}>DEPLOY <span>·</span> INTEGRATE <span>·</span> BUILD NEW RAILS <span>·</span> SCALE</p>
    </div>
  </SlideFrame>;
}
