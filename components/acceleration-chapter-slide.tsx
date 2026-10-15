"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { BookOpen, Check, Pause, Play, RotateCcw, SkipForward, X } from "lucide-react";
import { accelerationSlides, type AccelerationSlideId, type AccelerationStage } from "@/lib/acceleration-chapter";
import styles from "./acceleration-chapter-slide.module.css";

// These are visual rehearsals of the supplied editorial timings. No recorded
// voiceover was supplied for this chapter, so playback never starts audio.
function useSequence(durationMs: number) {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setElapsed(durationMs);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [durationMs]);

  useEffect(() => {
    if (paused || reducedMotion || elapsed >= durationMs) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = document.hidden ? 0 : now - previous;
      previous = now;
      setElapsed((time) => Math.min(durationMs, time + delta));
    }, 100);
    return () => window.clearInterval(timer);
    // elapsed is intentionally read only when starting or resuming the clock.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs, paused, reducedMotion, elapsed >= durationMs]);

  return {
    elapsed,
    paused,
    reducedMotion,
    preview,
    finished: elapsed >= durationMs,
    toggle: () => setPaused((value) => !value),
    setPaused,
    replay: () => { setPreview(false); setElapsed(reducedMotion ? durationMs : 0); setPaused(false); },
    complete: () => { setPreview(true); setElapsed(durationMs); setPaused(false); },
  };
}

function point(index: number, count: number) {
  const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
  return { x: 500 + 360 * Math.cos(angle), y: 275 + 176 * Math.sin(angle) };
}

function Flywheel({ id, activeIds, connected, integrated, focusCitizens, societyVisible, stageId, focusIds, coreActive, finished }: {
  id: AccelerationSlideId;
  activeIds: readonly string[];
  connected: boolean;
  integrated: boolean;
  focusCitizens: boolean;
  societyVisible: boolean;
  stageId: string;
  focusIds: readonly string[];
  coreActive: boolean;
  finished: boolean;
}) {
  const slide = accelerationSlides[id];
  const arrowId = useId().replace(/:/g, "");
  const blueprint = id === "blueprint-in-motion";
  const civic = id === "why-viral-fusion";
  const count = slide.nodes.length;

  return (
    <div className={styles.wheel} data-count={count} data-integrated={integrated} data-connected={connected} data-citizen-focus={focusCitizens} data-society={societyVisible} data-stage={stageId} data-isolating={focusIds.length > 0 && !civic}>
      <svg className={styles.connections} viewBox="0 0 1000 550" fill="none" aria-hidden="true">
        <defs><marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
        <ellipse cx="500" cy="275" rx="445" ry="257" className={styles.outerOrbit} />
        <ellipse cx="500" cy="275" rx="360" ry="176" className={styles.orbit} />
        <ellipse cx="500" cy="275" rx="230" ry="112" className={styles.innerOrbit} />
        {blueprint && stageId === "capability-feeds" && [0, 1, 2, 3, 4, 5].map((index) => {
          const end = point(index, count);
          const start = { x: 500 + (end.x - 500) * 1.3, y: 275 + (end.y - 275) * 1.3 };
          return <path key={index} d={`M${start.x} ${start.y}L${end.x} ${end.y}`} className={styles.capabilityFeed} pathLength="1" style={{ animationDelay: `${index * 3}s` }} />;
        })}
        {slide.nodes.map((node, index) => {
          const start = point(index + 0.24, count);
          const end = point(index + 0.76, count);
          const destination = point(index, count);
          const active = activeIds.includes(node.id);
          const nextActive = activeIds.includes(slide.nodes[(index + 1) % count].id);
          return <g key={node.id} data-active={active} className={styles.connection}>
            <path d={`M500 275L${destination.x} ${destination.y}`} className={styles.spoke} pathLength="1" />
            <path d={`M${start.x} ${start.y}A360 176 0 0 1 ${end.x} ${end.y}`} data-linked={blueprint ? active && nextActive && (index < count - 1 || stageId !== "more-capability") : connected && active} className={styles.link} pathLength="1" markerEnd={`url(#${arrowId})`} />
          </g>;
        })}
      </svg>

      {blueprint && <div className={styles.blueprintTerms} aria-label="The four Blueprint components">
        <span>ACTIONS</span><span>VERTICALS</span><span>ECOSYSTEM</span><span>VELOCITY</span>
      </div>}

      {id === "why-musk" && <div className={styles.society} data-visible={societyVisible} aria-hidden={!societyVisible}>
        <span>SOCIETY</span><p>LAW · REGULATION · PUBLIC UNDERSTANDING<br />INFRASTRUCTURE · INSTITUTIONS</p>
      </div>}

      <div className={`${styles.core} font-display`} data-active={coreActive}>
        <span>{id === "why-musk" ? "MUSK" : "VIRAL"}</span>
        <strong>{id === "why-musk" ? "ECOSYSTEM" : "FUSION"}</strong>
        {civic && <small>CITIZEN SOVEREIGNTY</small>}
      </div>

      <ol className={styles.nodes} aria-label={slide.subtitle}>
        {slide.nodes.map((node, index) => {
          const position = point(index, count);
          return <li
            key={node.id}
            className={styles.node}
            data-active={activeIds.includes(node.id)}
            data-focused={focusIds.includes(node.id)}
            data-citizens={civic && index === 0}
            data-brand={node.id === "xai"}
            style={{ "--x": `${position.x / 10}%`, "--y": `${position.y / 5.5}%` } as CSSProperties}
          >
            <span className={styles.nodeNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="font-display">{node.label}</h2>
            <p>{node.subtitle}</p>
          </li>;
        })}
      </ol>
      {id === "why-musk" && <p className={styles.velocityGap} data-visible={!finished && ["unresolved-gap", "viral-fusion-enters"].includes(stageId)}>TECHNOLOGICAL VELOCITY<span />SOCIETY</p>}
    </div>
  );
}

function Velocity({ stage, elapsed, finished }: { stage: AccelerationStage; elapsed: number; finished: boolean }) {
  const focused = finished || ["force-multiplier", "velocity-compounds", "technology-domains", "final-question"].includes(stage.id);
  const domains = accelerationSlides["missing-variable"].domainLabels ?? [];
  const domainStage = accelerationSlides["missing-variable"].stages.find((item) => item.id === "technology-domains")!;
  const visibleDomains = finished ? domains.length : stage.id === "technology-domains" || stage.id === "final-question" ? Math.min(domains.length, 1 + Math.floor((elapsed - domainStage.startMs) / ((domainStage.endMs - domainStage.startMs) / domains.length))) : 0;
  return <div className={styles.velocity} data-focused={focused}>
    <div className={styles.velocityOrbit} aria-hidden="true" />
    <ol className={styles.checklist} aria-label="Blueprint components">
      {accelerationSlides["missing-variable"].nodes.map((node, index) => <li key={node.id} data-velocity={index === 3} data-active={finished || stage.activeNodeIds?.includes(node.id)}>
        <span className="font-display">{node.label}</span>
        {index === 3 ? <strong aria-label="Unresolved">?</strong> : <Check aria-label="Confirmed" size={26} strokeWidth={1.6} />}
      </li>)}
    </ol>
    <div className={styles.velocityFocus} aria-hidden={!focused}>
      <p className="font-display">VELOCITY</p>
      <span>THE FORCE MULTIPLIER</span>
    </div>
    <div className={styles.domainLabels} aria-label="Technology domains">{domains.map((domain, index) => <span key={domain} data-visible={index < visibleDomains}>{domain}</span>)}</div>
    <p className={styles.velocityQuestion} data-visible={stage.id === "final-question" || finished}>How fast can this move?</p>
  </div>;
}

export function AccelerationChapterSlide({ id, onContinue }: { id: AccelerationSlideId; onContinue?: () => void }) {
  const slide = accelerationSlides[id];
  const sequence = useSequence(slide.durationMs);
  const transcriptRef = useRef<HTMLDialogElement>(null);
  const previouslyPaused = useRef(false);
  const titleReveal = id === "acceleration-layer";
  const stage = [...slide.stages].reverse().find((item) => sequence.elapsed >= item.startMs) ?? slide.stages[0];
  const activeIds = sequence.finished ? slide.nodes.map((node) => node.id) : stage?.activeNodeIds ?? [];
  const civic = id === "why-viral-fusion";
  const comparisonVisible = civic && (sequence.finished || sequence.elapsed >= 92000);
  const coreActive = civic || sequence.finished || (id === "blueprint-in-motion" ? stage.id !== "assembly" : stage.id !== "dormant");
  const blackout = id === "why-musk" && stage.id === "black" && !sequence.preview && !sequence.reducedMotion;

  useEffect(() => {
    if (id === "why-musk" && sequence.finished && !sequence.preview && !sequence.reducedMotion) onContinue?.();
  }, [id, sequence.finished, sequence.preview, sequence.reducedMotion, onContinue]);

  return <section className={styles.root} data-tone={civic ? "gold" : "blue"} data-title-reveal={titleReveal} data-reduced-motion={sequence.reducedMotion} data-paused={sequence.paused} data-blackout={blackout} data-stage={sequence.preview ? "complete" : stage.id} aria-labelledby="acceleration-slide-title">
    <div className={styles.frame}>
      {titleReveal ? <div className={styles.chapterTitle}>
        <p data-visible={sequence.elapsed >= 1500 || sequence.finished}>THE ACCELERATION LAYER</p>
        <h1 id="acceleration-slide-title" className="font-display" data-visible={sequence.elapsed >= 3000 || sequence.finished}>WHY MUSK?</h1>
      </div> : <>
        <header className={styles.header}>
          <h1 id="acceleration-slide-title" className="font-display">{slide.title}</h1>
          <p>{slide.subtitle}</p>
        </header>

        {id === "missing-variable" ? <Velocity stage={stage} elapsed={sequence.elapsed} finished={sequence.finished} /> : <Flywheel id={id} activeIds={activeIds} connected={sequence.finished || sequence.elapsed >= (civic ? 58000 : id === "why-musk" ? 28000 : 38999)} integrated={sequence.finished || (id === "blueprint-in-motion" && sequence.elapsed >= 57085)} focusCitizens={civic && (sequence.finished || sequence.elapsed >= 75000)} societyVisible={id === "why-musk" && (sequence.finished || sequence.elapsed >= 40000)} stageId={sequence.preview ? "complete" : stage.id} focusIds={sequence.finished ? [] : stage.focusNodeIds ?? []} coreActive={coreActive} finished={sequence.finished} />}

        <div className={styles.closing}>
          {civic ? <div className={styles.comparison} data-visible={comparisonVisible} data-reinforcing={sequence.finished || sequence.elapsed >= 102000}>
            <p><span>MUSK</span>TECHNOLOGICAL VELOCITY</p><b aria-hidden="true">+</b><p><span>VIRAL FUSION</span>CIVIC VELOCITY</p>
          </div> : id === "why-musk" ? <p className={styles.muskStatement}>HE COMPRESSES THE DISTANCE BETWEEN WHAT IS POSSIBLE<br /><strong>AND WHAT CAN ACTUALLY BE BUILT.</strong></p> : id === "blueprint-in-motion" ? <p className={styles.blueprintStatement}>{slide.footer}</p> : null}
        </div>
      </>}

      <div className={styles.controls} role="group" aria-label="Slide animation controls">
        {!sequence.reducedMotion && <>
          <button onClick={sequence.replay} aria-label="Replay slide animation" title="Replay"><RotateCcw size={16} /></button>
          {!sequence.finished && <>
            <button onClick={sequence.toggle} aria-label={sequence.paused ? "Resume slide animation" : "Pause slide animation"} title={sequence.paused ? "Resume" : "Pause"}>{sequence.paused ? <Play size={16} /> : <Pause size={16} />}</button>
            <button onClick={sequence.complete} aria-label="Show complete slide" title="Show complete slide"><SkipForward size={16} /></button>
          </>}
        </>}
        {!titleReveal && <button onClick={() => { previouslyPaused.current = sequence.paused; sequence.setPaused(true); transcriptRef.current?.showModal(); }} aria-label="Read slide voiceover" title="Read voiceover"><BookOpen size={16} /></button>}
        <span className={styles.sequenceStatus}>{sequence.finished ? "COMPLETE" : sequence.paused ? "PAUSED" : ""}</span>
      </div>
    </div>

    {!titleReveal && <dialog ref={transcriptRef} className={styles.transcript} aria-labelledby="acceleration-script-title" onClose={() => sequence.setPaused(previouslyPaused.current)} onKeyDown={(event) => event.stopPropagation()}>
      <header><div><span>VOICEOVER SCRIPT</span><h2 id="acceleration-script-title">{slide.title}</h2></div><button autoFocus onClick={() => transcriptRef.current?.close()} aria-label="Close voiceover script"><X size={20} /></button></header>
      <div className={styles.scriptBody}><p className={styles.scriptNote}>{slide.timingNote}</p>{slide.speakerCues.map((cue, index) => <div className={styles.speakerCue} key={index}><h3>{cue.speaker}</h3><p>{cue.text.trim()}</p></div>)}</div>
    </dialog>}
  </section>;
}
