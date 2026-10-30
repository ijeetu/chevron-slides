"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, BookOpen, Pause, Play, RotateCcw, SkipForward, X } from "lucide-react";
import { whatIfSlide } from "@/lib/what-if-slide";
import styles from "./what-if-slide.module.css";

// This clock is a visual rehearsal; it does not synthesize or play audio.
function useWhatIfSequence() {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [preview, setPreview] = useState(false);
  const sharedScriptPaused = useRef<boolean | null>(null);
  const duration = whatIfSlide.durationMs;
  const finished = elapsed >= duration;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(preference.matches); if (preference.matches) setElapsed(duration); };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [duration]);

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
    if (paused || reducedMotion || finished) return;
    let previous = performance.now();
    let wasHidden = document.hidden;
    const timer = window.setInterval(() => {
      const now = performance.now();
      const hidden = document.hidden;
      const delta = hidden || wasHidden ? 0 : now - previous;
      previous = now;
      wasHidden = hidden;
      setElapsed((value) => Math.min(duration, value + delta));
    }, 75);
    return () => window.clearInterval(timer);
  }, [duration, paused, reducedMotion, finished]);

  return {
    elapsed, paused, reducedMotion, preview, finished, setPaused,
    toggle: () => setPaused((value) => !value),
    replay: () => { setPreview(false); setElapsed(reducedMotion ? duration : 0); setPaused(false); },
    complete: () => { setPreview(true); setElapsed(duration); setPaused(false); },
  };
}

export function WhatIfSlide({ onContinue }: { onContinue?: () => void } = {}) {
  const sequence = useWhatIfSequence();
  const titleId = useId();
  const scriptTitleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previouslyPaused = useRef(false);
  const overview = sequence.preview || sequence.reducedMotion;
  const stage = [...whatIfSlide.stages].reverse().find((cue) => sequence.elapsed >= cue.startMs) ?? whatIfSlide.stages[0];
  const blackout = !overview && stage.id === "blackout";
  const silentTitle = !overview && stage.id === "silent-title";
  const thesis = !overview && stage.id === "execution-engine";
  const opening = !overview && stage.id === "opening";

  const openScript = () => { previouslyPaused.current = sequence.paused; sequence.setPaused(true); dialogRef.current?.showModal(); };

  return <section className={styles.root} data-stage={overview ? "complete" : stage.id} data-paused={sequence.paused} data-blackout={blackout} data-silent-title={silentTitle} data-thesis={thesis} data-opening={opening} data-overview={overview} aria-labelledby={titleId}>
    <div className={styles.frame}>
      <div className={styles.composition} aria-hidden={blackout || silentTitle || thesis}>
        <header className={styles.header}>
          <h1 id={titleId} className="font-display">{whatIfSlide.title}</h1>
          <p data-visible={overview}>{whatIfSlide.subtitle}</p>
        </header>
        <ol className={styles.sections}>
          {whatIfSlide.sections.map((section, index) => {
            const visible = overview || index < stage.visibleQuestions;
            return <li key={section.title} data-visible={visible} aria-hidden={!visible}>
              <span className={styles.sectionNumber} aria-hidden="true">0{index + 1}</span>
              <div><h2>{section.title}</h2><p className="font-display">{section.text}</p></div>
            </li>;
          })}
        </ol>
        {overview && <p className={`${styles.overviewStatement} font-display`}>{whatIfSlide.finalStatement}</p>}
      </div>

      {thesis && <div className={styles.thesis}><h2 className="font-display">CAN A PODCAST<br />BECOME AN<br /><span>EXECUTION ENGINE?</span></h2></div>}
      {silentTitle && <div className={styles.silentTitle}><h2 className="font-display">THE PODCAST<br />BECOMES THE STRATEGY.</h2></div>}

      <div className={styles.controls} role="group" aria-label="Slide animation controls">
        {!sequence.reducedMotion && <>
          <button onClick={sequence.replay} aria-label="Replay slide animation" title="Replay"><RotateCcw size={16} /></button>
          {!sequence.finished && <>
            <button onClick={sequence.toggle} aria-label={sequence.paused ? "Resume slide animation" : "Pause slide animation"} title={sequence.paused ? "Resume" : "Pause"}>{sequence.paused ? <Play size={16} /> : <Pause size={16} />}</button>
            <button onClick={sequence.complete} aria-label="Show complete slide" title="Show complete slide"><SkipForward size={16} /></button>
          </>}
        </>}
        <button onClick={openScript} aria-label="Read slide voiceover" title="Read voiceover"><BookOpen size={16} /></button>
        {sequence.finished && onContinue && <button className={styles.continueButton} onClick={onContinue}>Strategy map <ArrowRight size={16} /></button>}
      </div>
    </div>

    <dialog ref={dialogRef} className={styles.transcript} aria-labelledby={scriptTitleId} onClose={() => sequence.setPaused(previouslyPaused.current)} onKeyDown={(event) => event.stopPropagation()}>
      <header><div><span>VOICEOVER SCRIPT</span><h2 id={scriptTitleId}>{whatIfSlide.title}</h2></div><button autoFocus onClick={() => dialogRef.current?.close()} aria-label="Close voiceover script"><X size={20} /></button></header>
      <div className={styles.scriptBody}>
        <p className={styles.scriptNote}>{whatIfSlide.timingNote}</p>
        {whatIfSlide.speakerCues.map((cue, index) => <div className={styles.speakerCue} key={index}><h3>{cue.speaker}</h3><p className={styles.performance}>{cue.performance}</p><p>{cue.text}</p></div>)}
        <div className={styles.speakerCue}><h3>TITLE REVEAL — NO VOICEOVER</h3><p>{whatIfSlide.finalStatement}</p></div>
      </div>
    </dialog>
  </section>;
}
