"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Car, Cpu, HeartPulse, Pause, Play, RotateCcw, Shield, SkipForward, Zap } from "lucide-react";
import styles from "./podcast-strategy-slide.module.css";

type PodcastStrategySlideProps = {
  onContinue?: () => void;
};

const INDUSTRIES = [
  { name: "Automotive", Icon: Car },
  { name: "Energy", Icon: Zap },
  { name: "Technology", Icon: Cpu },
  { name: "Defense", Icon: Shield },
  { name: "Healthcare", Icon: HeartPulse },
] as const;

// The visual sequence is independent of audio. Each milestone leaves the
// preceding content in place, and the final frame does not loop.
const MILESTONES = [0, 2200, 3500, 4700, 5900, 7100, 8300, 9700, 11200, 12800, 14900, 17900, 19400];
const LAST_STAGE = MILESTONES.length - 1;

function useStrategySequence() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setStage(LAST_STAGE);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || stage >= LAST_STAGE) return;
    const timer = window.setTimeout(
      () => setStage((current) => Math.min(current + 1, LAST_STAGE)),
      MILESTONES[stage + 1] - MILESTONES[stage],
    );
    return () => window.clearTimeout(timer);
  }, [stage, paused, reducedMotion, replay]);

  const restart = () => {
    setStage(reducedMotion ? LAST_STAGE : 0);
    setPaused(false);
    setReplay((current) => current + 1);
  };

  return {
    stage,
    paused,
    reducedMotion,
    restart,
    togglePause: () => setPaused((current) => !current),
    complete: () => {
      setStage(LAST_STAGE);
      setPaused(false);
    },
  };
}

export function PodcastStrategySlide({ onContinue }: PodcastStrategySlideProps = {}) {
  const sequence = useStrategySequence();
  const { stage } = sequence;
  const mapVisible = stage >= 1;
  const connected = stage >= 7;
  const guestsVisible = stage >= 8;
  const pathVisible = stage >= 9;
  const statementVisible = stage === 10;
  const firstGuestFocused = stage >= 12;
  const finished = stage === LAST_STAGE;

  return (
    <section
      className={styles.root}
      data-revealed={mapVisible}
      data-reduced-motion={sequence.reducedMotion}
      aria-labelledby="podcast-strategy-title"
    >
      <h1 id="podcast-strategy-title" className={`${styles.title} font-display`}>
        THE PODCAST<br />BECOMES THE STRATEGY
      </h1>

      <div className={styles.content} data-visible={mapVisible} aria-hidden={!mapVisible}>
        <div className={styles.mapSurface} data-dimmed={statementVisible}>
          <div className={styles.industryMap}>
            <div className={styles.industryNodes} aria-label="Five anchor industries">
              {INDUSTRIES.map(({ name, Icon }, index) => (
                <div className={styles.industryNode} data-active={stage >= index + 2} key={name}>
                  <span className={styles.nodeIndex}>0{index + 1}</span>
                  <Icon className={styles.industryIcon} size={28} strokeWidth={1.35} aria-hidden="true" />
                  <span className={`${styles.industryName} font-display`}>{name}</span>
                  <span className={styles.nodeLight} aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className={styles.connections} data-visible={connected} aria-hidden="true">
              <svg className={styles.desktopConnections} viewBox="0 0 1000 100" preserveAspectRatio="none">
                {[100, 300, 500, 700, 900].map((x) => (
                  <path key={x} d={`M ${x} 0 V 35 Q ${x} 48 ${x > 500 ? x - 13 : x < 500 ? x + 13 : x} 48 H 500 V 100`} pathLength="1" />
                ))}
              </svg>
              <svg className={styles.mobileConnections} viewBox="0 0 30 280" preserveAspectRatio="none">
                <path d="M 0 23 H 15 V 255 H 0 M 0 75 H 15 M 0 127 H 15 M 0 179 H 15 M 0 231 H 15" pathLength="1" />
              </svg>
            </div>

            <div className={styles.ecosystem} data-visible={connected}>
              <span className={styles.ecosystemDot} aria-hidden="true" />
              ONE INTERCONNECTED ECOSYSTEM
            </div>
          </div>

          <div className={styles.guestProgression} data-visible={guestsVisible} aria-hidden={!guestsVisible}>
            <div className={styles.guestCard} data-focused={firstGuestFocused}>
              <p className={styles.eyebrow}>FIRST CONVERSATION</p>
              <h2 className="font-display">MO GAWDAT</h2>
              <p className={styles.guestTopic} data-visible={firstGuestFocused}>
                THE HUMANITY &amp;<br className={styles.topicBreak} /> AI GOVERNANCE LAYER
              </p>
            </div>
            <div className={styles.guestPath} data-visible={pathVisible} aria-hidden="true">
              <svg viewBox="0 0 500 40" preserveAspectRatio="none">
                <path className={styles.pathTrack} d="M 0 20 H 500" />
                <path className={styles.pathReveal} d="M 0 20 H 500" pathLength="1" />
              </svg>
              <span className={styles.nextNode}><ArrowRight size={17} strokeWidth={1.6} /></span>
              <span className={styles.nextNode}><ArrowRight size={17} strokeWidth={1.6} /></span>
              <span className={styles.futurePath} />
            </div>
          </div>
        </div>

        <div className={styles.statement} data-visible={statementVisible} aria-hidden={!statementVisible}>
          <p className="font-display">EVERY CONVERSATION<br />UNLOCKS THE NEXT.</p>
          <span className={styles.statementRule} />
        </div>

        <div className={styles.controls}>
          <div className={styles.playbackControls}>
            {!sequence.reducedMotion && (
              <>
                <button className={styles.iconButton} onClick={sequence.restart} aria-label="Replay strategy map sequence" title="Replay sequence">
                  <RotateCcw size={16} aria-hidden="true" />
                </button>
                {!finished && (
                  <>
                    <button className={styles.iconButton} onClick={sequence.togglePause} aria-label={sequence.paused ? "Resume strategy map sequence" : "Pause strategy map sequence"} title={sequence.paused ? "Resume" : "Pause"}>
                      {sequence.paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                    </button>
                    <button className={styles.iconButton} onClick={sequence.complete} aria-label="Show completed strategy map" title="Show complete map">
                      <SkipForward size={16} aria-hidden="true" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          {firstGuestFocused && onContinue && (
            <button className={styles.continueButton} onClick={onContinue}>
              First conversation <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <span className={styles.screenReaderOnly} role="status" aria-live="polite">
        {finished ? "Strategy map complete. First conversation: Mo Gawdat, the Humanity and AI Governance Layer." : sequence.paused ? "Strategy map sequence paused." : ""}
      </span>
    </section>
  );
}
