"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cpu, Network, Pause, Play, Radio, RotateCcw, Scale, SkipForward } from "lucide-react";
import styles from "./podcast-strategy-slide.module.css";

type PodcastStrategySlideProps = { onContinue?: () => void };

export const PODCAST_CAPABILITY_GROUPS = [
  { name: "INTELLIGENCE & TRUST", description: "AI Governance • Verification • Security", Icon: Cpu },
  { name: "PHYSICAL INFRASTRUCTURE", description: "Displays • Energy • Engineering", Icon: Network },
  { name: "PUBLIC SYSTEMS & POLICY", description: "Healthcare • Public Safety • Legislation", Icon: Scale },
  { name: "MEDIA & DISTRIBUTION", description: "Production • Public Understanding • Reach", Icon: Radio },
] as const;

// Estimated visual rehearsal, independent of the production voiceover. Reveal
// the podcast, categories, relationships, closing, and AI focus in that order.
const MILESTONES = [0, 3000, 7000, 11000, 15000, 19000, 31000, 48000, 67000, 80000];
const LAST_STAGE = MILESTONES.length - 1;

function useStrategySequence() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [replay, setReplay] = useState(0);
  const [overview, setOverview] = useState(false);
  const sharedScriptPaused = useRef<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(preference.matches); if (preference.matches) { setStage(LAST_STAGE); setOverview(true); } };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScriptVisibility = (event: Event) => {
      if ((event as CustomEvent<{ open: boolean }>).detail.open) {
        setPaused((value) => { sharedScriptPaused.current = value; return true; });
      } else if (sharedScriptPaused.current !== null) {
        setPaused(sharedScriptPaused.current);
        sharedScriptPaused.current = null;
      }
    };
    window.addEventListener("opening-script-visibility", onScriptVisibility);
    return () => window.removeEventListener("opening-script-visibility", onScriptVisibility);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || stage >= LAST_STAGE) return;
    const timer = window.setTimeout(() => setStage((value) => Math.min(value + 1, LAST_STAGE)), MILESTONES[stage + 1] - MILESTONES[stage]);
    return () => window.clearTimeout(timer);
  }, [stage, paused, reducedMotion, replay]);

  return {
    stage, paused, reducedMotion, overview,
    restart: () => { setStage(reducedMotion ? LAST_STAGE : 0); setOverview(reducedMotion); setPaused(false); setReplay((value) => value + 1); },
    toggle: () => setPaused((value) => !value),
    complete: () => { setStage(LAST_STAGE); setPaused(false); setOverview(true); },
  };
}

export function PodcastStrategySlide({ onContinue }: PodcastStrategySlideProps = {}) {
  const sequence = useStrategySequence();
  const rootRef = useRef<HTMLElement>(null);
  const { stage, overview } = sequence;
  const connected = stage >= 6;
  const closing = stage >= 7;
  const focused = stage >= 9 && !overview;
  const guestVisible = stage >= 8 && !overview;

  return <section ref={rootRef} className={styles.root} data-stage={stage} data-focused={focused} data-overview={overview} data-reduced-motion={sequence.reducedMotion} aria-labelledby="podcast-strategy-title">
    <div className={styles.frame}>
      <header className={styles.header}>
        <h1 id="podcast-strategy-title" className="font-display">THE PODCAST BECOMES THE STRATEGY</h1>
        <p>From Conversations to Action</p>
      </header>

      <div className={styles.map}>
        <div className={styles.hub} data-visible={stage >= 1} aria-hidden={stage < 1}>
          <span>THE CONVENING ENGINE</span>
          <h2 className="font-display">SHAWN RYAN PODCAST</h2>
        </div>
        <div className={styles.connections} data-visible={connected} aria-hidden="true">
          <svg viewBox="0 0 1000 90" preserveAspectRatio="none">{[125, 375, 625, 875].map((x) => <path key={x} d={`M500 0 V30 H${x} V90`} pathLength="1" />)}</svg>
        </div>
        <div className={styles.groups} aria-label="Four capability groups">
          {PODCAST_CAPABILITY_GROUPS.map(({ name, description, Icon }, index) => {
            const visible = stage >= index + 2;
            return <article className={styles.group} key={name} data-visible={visible} data-active={connected} data-focused={focused && index === 0} data-dimmed={focused && index !== 0} aria-hidden={!visible}>
              <div className={styles.groupTop}><span>0{index + 1}</span><Icon size={25} strokeWidth={1.4} aria-hidden="true" /></div>
              <h3 className="font-display">{name}</h3>
              <p>{description}</p>
            </article>;
          })}
        </div>
      </div>

      <div className={styles.closing} data-visible={closing} aria-hidden={!closing}>
        <p className={styles.progression}>DISCUSSION <span>→</span> SHARED VISION <span>→</span> CALL TO ACTION <span>→</span> EXECUTION</p>
        <h2 className="font-display">MORE THAN A CONVERSATION.</h2>
        <p className={styles.statement}>AN OPPORTUNITY TO CREATE VALUE THROUGH ACTION.</p>
      </div>

      <div className={styles.firstGuest} data-visible={guestVisible} aria-hidden={!guestVisible}>
        <p>FIRST CONVERSATION <span>INTELLIGENCE &amp; TRUST</span></p>
        <h2 className="font-display">Mo Gawdat</h2>
        <span>Artificial intelligence. Who should it serve?</span>
      </div>
      <p className={styles.proposed} data-visible={stage >= 6}>Proposed conversations and collaborations.</p>
      <div className={styles.controls}>
        <div role="group" aria-label="Strategy map animation controls">
          {!sequence.reducedMotion && <>
            <button onClick={() => { sequence.restart(); rootRef.current?.scrollTo({ top: 0 }); }} aria-label="Replay strategy map sequence" title="Replay sequence"><RotateCcw size={16} /></button>
            {stage < LAST_STAGE && <>
              <button onClick={sequence.toggle} aria-label={sequence.paused ? "Resume strategy map sequence" : "Pause strategy map sequence"} title={sequence.paused ? "Resume" : "Pause"}>{sequence.paused ? <Play size={16} /> : <Pause size={16} />}</button>
              <button onClick={() => { sequence.complete(); rootRef.current?.scrollTo({ top: 0 }); }} aria-label="Show completed strategy map" title="Show complete map"><SkipForward size={16} /></button>
            </>}
          </>}
        </div>
        {stage >= 8 && onContinue && <button className={styles.continueButton} onClick={onContinue}>First conversation <ArrowRight size={16} /></button>}
      </div>
    </div>
    <span className={styles.screenReaderOnly} role="status" aria-live="polite">{stage >= 9 ? "Strategy map complete. First conversation: Mo Gawdat, Intelligence and Trust." : sequence.paused ? "Strategy map sequence paused." : ""}</span>
  </section>;
}
