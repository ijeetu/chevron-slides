"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

import styles from "./execution-priorities-slide.module.css";

const priorities = [
  "BUILD THE ALLIANCE",
  "PROVE IT THROUGH ACTION",
  "ALIGN CAPITAL WITH OUTCOMES",
] as const;

const fundingStatement =
  "THOSE WHO BENEFIT FROM BETTER OUTCOMES HELP FINANCE THE SYSTEM THAT MAKES THOSE OUTCOMES POSSIBLE.";

// The extra beat after priority 02 lets the audience absorb the action-first idea.
const revealDelays = [2200, 3000, 4500, 3000] as const;

export function ExecutionPrioritiesSlide() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [restart, setRestart] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        setStage(4);
        setPlaying(false);
      }
    };

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || stage >= 4) return;

    const timer = window.setTimeout(() => {
      setStage((previous) => Math.min(previous + 1, 4));
    }, revealDelays[stage]);

    return () => window.clearTimeout(timer);
  }, [playing, reducedMotion, restart, stage]);

  const replay = () => {
    setStage(reducedMotion ? 4 : 0);
    setPlaying(!reducedMotion);
    setRestart((previous) => previous + 1);
  };

  const advance = () => {
    // Taking control pauses the timeline so subsequent reveals remain deliberate.
    setPlaying(false);
    setStage((previous) => Math.min(previous + 1, 4));
  };

  const announcement =
    stage === 4
      ? fundingStatement
      : stage > 0
        ? `${String(stage).padStart(2, "0")} — ${priorities[stage - 1]}`
        : "";

  return (
    <section
      className={`${styles.slide} font-display`}
      aria-labelledby="execution-priorities-title"
    >
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 id="execution-priorities-title" className={styles.title}>
            THREE EXECUTION
            <br />
            PRIORITIES
          </h1>
        </header>

        <div className={styles.sequence}>
          <ol className={styles.priorities} aria-label="Execution priorities">
            {priorities.map((priority, index) => {
              const revealed = stage > index;

              return (
                <li
                  key={priority}
                  className={styles.priority}
                  data-visible={revealed}
                  aria-hidden={!revealed}
                >
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.dash} aria-hidden="true" />
                  <span className={styles.priorityTitle}>{priority}</span>
                </li>
              );
            })}
          </ol>

          <div
            className={styles.funding}
            data-visible={stage === 4}
            aria-hidden={stage !== 4}
          >
            <span className={styles.fundingRule} aria-hidden="true" />
            <p>{fundingStatement}</p>
          </div>
        </div>

        <div
          className={styles.controls}
          role="group"
          aria-label="Priority reveal controls"
          onKeyDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          {!reducedMotion && stage < 4 ? (
            <button
              type="button"
              className={styles.control}
              onClick={() => setPlaying((previous) => !previous)}
              aria-label={playing ? "Pause priority reveals" : "Resume priority reveals"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              <span>{playing ? "Pause" : "Resume"}</span>
            </button>
          ) : null}
          <button
            type="button"
            className={styles.control}
            onClick={advance}
            disabled={stage === 4}
            aria-label="Reveal the next priority or funding statement"
          >
            <span>Reveal next</span>
            <ChevronRight size={15} />
          </button>
          <button type="button" className={styles.control} onClick={replay}>
            <RotateCcw size={14} />
            <span>Replay</span>
          </button>
        </div>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </span>
      </div>
    </section>
  );
}
