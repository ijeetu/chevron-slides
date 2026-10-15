"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, BookOpen, Box, Check, Code2, MapPin, Pause, Play, Radio, RotateCcw, Scale, SkipForward, UsersRound, X } from "lucide-react";
import { civicCapabilities, followonSlides, moatCapabilities, technologyCapabilities, type FollowonSlideId } from "@/lib/followon-chapter";
import styles from "./followon-chapter-slide.module.css";

// The supplied documents contain scripts and editorial timings, not recordings.
// This clock rehearses the visual build and never synthesizes or starts audio.
function useSequence(duration: number) {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [overview, setOverview] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const finished = elapsed >= duration;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) { setElapsed(duration); setOverview(true); }
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [duration]);

  useEffect(() => {
    if (paused || finished || reducedMotion) return;
    let previous = performance.now();
    const interval = window.setInterval(() => {
      const now = performance.now();
      const delta = document.hidden ? 0 : now - previous;
      previous = now;
      setElapsed((time) => Math.min(duration, time + delta));
    }, 100);
    return () => window.clearInterval(interval);
  }, [duration, paused, finished, reducedMotion]);

  return {
    elapsed, paused, overview, reducedMotion, finished, setPaused,
    replay: () => { setOverview(reducedMotion); setElapsed(reducedMotion ? duration : 0); setPaused(false); },
    complete: () => { setOverview(true); setElapsed(duration); setPaused(false); },
  };
}

function orbitPoint(index: number, count: number, radiusX = 38, radiusY = radiusX) {
  const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
  return { x: 50 + radiusX * Math.cos(angle), y: 50 + radiusY * Math.sin(angle) };
}

function CapabilityWheel({ civic, elapsed, overview, dimmed }: { civic?: boolean; elapsed: number; overview: boolean; dimmed: boolean }) {
  const labels = civic ? civicCapabilities : technologyCapabilities;
  const start = civic ? 15000 : 0;
  return <div className={styles.capabilityWheel} data-civic={Boolean(civic)} data-dimmed={dimmed}>
    <svg viewBox="0 0 500 500" className={styles.wheelLines} fill="none" aria-hidden="true">
      <circle cx="250" cy="250" r="226" className={styles.outerOrbit} />
      <circle cx="250" cy="250" r="190" className={styles.wheelOrbit} />
      {labels.map((label, index) => {
        const angle = -Math.PI / 2 + index * Math.PI * 2 / labels.length;
        const from = angle + 0.13;
        const to = angle + Math.PI * 2 / labels.length - 0.13;
        const active = overview || elapsed >= start + index * 1900;
        return <g key={label} data-active={active} className={styles.wheelSegment}>
          <path d={`M${250 + 190 * Math.cos(from)} ${250 + 190 * Math.sin(from)} A190 190 0 0 1 ${250 + 190 * Math.cos(to)} ${250 + 190 * Math.sin(to)}`} pathLength="1" />
          <circle cx={250 + 190 * Math.cos(angle)} cy={250 + 190 * Math.sin(angle)} r="3.5" />
        </g>;
      })}
    </svg>
    <div className={`${styles.wheelCore} font-display`}>
      <span>{civic ? "CIVIC" : "TECHNOLOGICAL"}</span><strong>VELOCITY</strong>
      <small>{civic ? "VIRAL FUSION" : "MUSK ECOSYSTEM"}</small>
    </div>
    <ol className={styles.wheelNodes} aria-label={civic ? "Viral Fusion civic flywheel" : "Musk technology flywheel"}>
      {labels.map((label, index) => {
        const p = orbitPoint(index, labels.length);
        return <li key={label} data-active={overview || elapsed >= start + index * 1900} style={{ "--x": `${p.x}%`, "--y": `${p.y}%` } as CSSProperties}>{label}</li>;
      })}
    </ol>
  </div>;
}

function TwoFlywheels({ elapsed, overview }: { elapsed: number; overview: boolean }) {
  const connected = overview || elapsed >= 42000;
  const dimmed = elapsed >= 99000 && !overview;
  const gradientId = useId().replace(/:/g, "");
  return <div className={styles.flywheelComposition} data-connected={connected} data-dimmed={dimmed}>
    <div className={styles.twoWheels}>
      <svg className={styles.exchangeLines} viewBox="0 0 1200 500" fill="none" aria-hidden="true">
        <defs><linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="475" y1="0" x2="725" y2="0"><stop stopColor="#8cd9ff" /><stop offset="1" stopColor="#edc66c" /></linearGradient></defs>
        {[0, 1, 2, 3].map((i) => <g key={i} style={{ "--line-delay": `${i * 220}ms` } as CSSProperties}>
          <path d={`M475 ${155 + i * 63} C540 ${155 + i * 63}, 660 ${155 + i * 63}, 725 ${155 + i * 63}`} stroke={`url(#${gradientId})`} pathLength="1" />
          <path d={`M${i % 2 ? 483 : 717} ${149 + i * 63} l${i % 2 ? -8 : 8} 6 l${i % 2 ? 8 : -8} 6`} stroke={i % 2 ? "#8cd9ff" : "#edc66c"} className={styles.exchangeArrow} />
        </g>)}
      </svg>
      <CapabilityWheel elapsed={elapsed} overview={overview} dimmed={dimmed} />
      <div className={styles.bridge} data-visible={connected}>
        <span className="font-display">ACCELERATION</span>
        <p>INDEPENDENT SYSTEMS<br />EXCHANGING VALUE</p>
      </div>
      <CapabilityWheel civic elapsed={elapsed} overview={overview} dimmed={dimmed} />
    </div>
    <div className={styles.sovereignty} data-visible={overview || elapsed >= 66000}>
      <span>TECHNOLOGY ACCOUNTABLE TO LAW</span><i aria-hidden="true" /><span>CIVIC AUTHORITY REMAINS WITH CITIZENS</span>
    </div>
    <ol className={styles.pathway} aria-label="The path to deployment">
      {["PROBLEM", "SOLUTION", "PROOF", "DEPLOYMENT"].map((word, index) => <li key={word} data-active={overview || elapsed >= 82000 + index * 3800}><span>{word}</span>{index < 3 && <ArrowRight size={15} aria-hidden="true" />}</li>)}
    </ol>
    <span className={styles.screenReaderOnly}>AI exchanges value with Understanding; Connectivity with Participation; Infrastructure with Legislation; Manufacturing with Outcomes. The two systems retain separate authority.</span>
  </div>;
}

const moatActivation = [32000, 15000, 19000, 25500, 21500, 23000, 28500, 17000, 30500, 27000];

function AccumulatedExecution({ elapsed, overview }: { elapsed: number; overview: boolean }) {
  const isolated = !overview && elapsed >= 50000 && elapsed < 54000;
  const final = !overview && elapsed >= 86500;
  return <div className={styles.moatComposition} data-isolated={isolated} data-compounding={overview || elapsed >= 68000} data-final={final}>
    <div className={styles.moatArchitecture}>
      <svg viewBox="0 0 900 550" fill="none" className={styles.moatLines} aria-hidden="true">
        {[158, 205, 250].map((radius, index) => <circle key={radius} cx="450" cy="275" r={radius} data-active={overview || elapsed >= 13000 + index * 9000} className={styles.moatRing} />)}
        <circle cx="450" cy="275" r="265" data-active={overview || elapsed >= 32000} className={styles.outcomesRing} />
        {moatCapabilities.map((label, index) => {
          const p = orbitPoint(index, 10, 33, 46);
          return <path key={label} d={`M450 275L${p.x * 9} ${p.y * 5.5}`} className={styles.moatSpoke} data-active={overview || elapsed >= moatActivation[index]} />;
        })}
      </svg>
      <div className={`${styles.moatCore} font-display`} data-feature={isolated}>
        {isolated ? <><Code2 aria-hidden="true" size={28} /><span>A PETITION<br />FEATURE</span><small>SOFTWARE CAN BE COPIED.</small></> : <><span>THE MOAT IS NOT<br />THE SOFTWARE.</span><small>ACCUMULATED EXECUTION</small></>}
      </div>
      <ol className={styles.moatNodes} aria-label="The reinforcing layers around the software">
        {moatCapabilities.map((label, index) => {
          const p = orbitPoint(index, 10, 33, 46);
          return <li key={label} className={styles.moatNode} data-outcomes={index === 0} data-active={overview || elapsed >= moatActivation[index]} style={{ "--x": `${p.x}%`, "--y": `${p.y}%` } as CSSProperties}>
            <span>{label}</span>{index === 0 && <small>EVIDENCE → CREDIBILITY</small>}
          </li>;
        })}
      </ol>
    </div>
    <div className={styles.finalStatement} aria-hidden={!final}><span className="font-display">WE EARN THE RIGHT<br />TO <strong>EXPAND.</strong></span></div>
    <p className={styles.compoundCaption} data-visible={overview || elapsed >= 68000}>KNOWLEDGE. PROOF. RELATIONSHIPS. A PLAYBOOK.</p>
  </div>;
}

const californiaNodes = [
  { label: "MEDIA", Icon: Radio, x: 17, y: 28, time: 20000 },
  { label: "PRODUCT", Icon: Box, x: 83, y: 28, time: 24000 },
  { label: "CREATORS", Icon: UsersRound, x: 50, y: 10, time: 28000 },
  { label: "PHYSICAL RAILS", Icon: MapPin, x: 17, y: 72, time: 32000 },
  { label: "SOFTWARE", Icon: Code2, x: 83, y: 72, time: 36000 },
  { label: "LEGISLATIVE ACTION", Icon: Scale, x: 50, y: 93, time: 40000 },
];

function CaliforniaProof({ elapsed, overview }: { elapsed: number; overview: boolean }) {
  const active = overview || elapsed >= 8000;
  const proven = overview || elapsed >= 60000;
  const demand = overview || elapsed >= 76000;
  return <div className={styles.californiaComposition} data-active={active} data-proven={proven} data-demand={demand}>
    <div className={styles.californiaDiagram}>
      <svg viewBox="0 0 1000 520" fill="none" className={styles.californiaLines} role="img" aria-label="Schematic California proving ground with six activation points and unnamed future demand nodes. Locations are illustrative.">
        <title>Phase One — California</title>
        {/* Editable schematic geography, drawn for this explanatory diagram. */}
        <path className={styles.nationalOutline} d="M143 90L211 101L245 107L316 112L352 120L397 120L443 112L467 96L498 111L527 115L554 125L586 124L611 150L638 163L664 157L697 171L714 155L734 167L755 145L772 128L800 124L824 93L839 111L829 137L811 157L823 176L811 193L790 203L774 229L756 239L746 258L719 266L699 281L692 313L672 329L647 336L660 363L653 382L638 361L628 337L606 330L575 333L555 324L528 330L517 351L499 365L481 354L470 325L448 310L422 302L398 279L373 273L343 254L316 252L292 231L268 217L251 199L225 187L206 172L187 163L173 143L161 123Z" />
        <g className={styles.activationLines}>
          {californiaNodes.map((node) => <path key={node.label} d={`M490 250L${node.x * 10} ${node.y * 5.2}`} pathLength="1" data-active={overview || elapsed >= node.time} />)}
        </g>
        <path className={styles.californiaShape} d="M401 49L497 64L493 172L605 336L569 400L537 391L510 370L489 344L465 326L455 297L438 273L427 239L412 217L405 191L390 174L377 145L384 117L389 91Z" />
        <g className={styles.futureNetwork} data-pulse={!overview && elapsed >= 93000}>
          <path d="M564 313Q670 277 726 217M564 313Q692 361 805 318M726 217L805 318L871 229" />
          <circle cx="726" cy="217" r="8" /><circle cx="805" cy="318" r="8" /><circle cx="871" cy="229" r="8" className={styles.nextNode} />
          <circle cx="871" cy="229" r="8" className={styles.nextPulse} />
        </g>
      </svg>
      <div className={styles.californiaCore} data-visible={overview || elapsed >= 17000}>
        <span>PHASE ONE</span><strong className="font-display">CALIFORNIA</strong>
        <div className={styles.proofMark} data-visible={proven}><Check size={15} strokeWidth={2} aria-hidden="true" /><span>THE EVIDENCE</span></div>
      </div>
      <ol className={styles.californiaNodes} aria-label="California activation points">
        {californiaNodes.map(({ label, Icon, x, y, time }) => <li key={label} data-active={overview || elapsed >= time} style={{ "--x": `${x}%`, "--y": `${y}%` } as CSSProperties}><Icon aria-hidden="true" size={22} strokeWidth={1.25} /><span>{label}</span></li>)}
      </ol>
      <span className={styles.demandCaption} data-visible={demand}>EVIDENCE<br />CREATES DEMAND</span>
    </div>
    <ol className={styles.proofWords} aria-label="Put the architecture under pressure">
      {["ISSUES", "LEGISLATION", "SIGNATURES", "VOTERS", "OUTCOMES"].map((word, index) => <li key={word} data-active={overview || elapsed >= 43000 + index * 2800} data-outcomes={index === 4}><span>REAL</span> {word}</li>)}
    </ol>
    <ol className={styles.launchProcess} aria-label="Earn expansion through proof">
      {["LAUNCH", "PROVE", "MEASURE", "EXPAND"].map((word, index) => <li key={word} data-active={overview || elapsed >= [17000, 43000, 60000, 76000][index]}><span className="font-display">{word}</span>{index < 3 && <ArrowRight aria-hidden="true" size={18} />}</li>)}
    </ol>
  </div>;
}

function FollowonContent({ id }: { id: FollowonSlideId }) {
  const slide = followonSlides[id];
  const sequence = useSequence(slide.durationMs);
  const dialog = useRef<HTMLDialogElement>(null);
  const previouslyPaused = useRef(false);
  const titleId = useId();
  const scriptTitleId = useId();
  const stage = slide.stages.find((item) => sequence.elapsed >= item.startMs && sequence.elapsed < item.endMs) ?? slide.stages[slide.stages.length - 1];
  const finalMoat = id === "accumulated-execution" && sequence.elapsed >= 86500 && !sequence.overview;

  function readVoiceover() {
    previouslyPaused.current = sequence.paused;
    sequence.setPaused(true);
    dialog.current?.showModal();
  }

  return <section className={styles.root} data-slide={id} data-final={finalMoat} data-opening={id === "accumulated-execution" && sequence.elapsed < 12000} data-paused={sequence.paused} aria-labelledby={titleId}>
    <div className={styles.frame}>
      <header className={styles.header}><h1 id={titleId} className="font-display">{slide.title}</h1><p>{slide.subtitle}</p></header>
      {id === "two-flywheels" ? <TwoFlywheels elapsed={sequence.elapsed} overview={sequence.overview} /> : id === "accumulated-execution" ? <AccumulatedExecution elapsed={sequence.elapsed} overview={sequence.overview} /> : <CaliforniaProof elapsed={sequence.elapsed} overview={sequence.overview} />}
      <div className={styles.closing}><p>{slide.footer}</p></div>
      <div className={styles.controls} role="group" aria-label="Slide visual playback controls">
        {!sequence.reducedMotion && <>
          <button onClick={sequence.replay} aria-label="Replay slide animation" title="Replay"><RotateCcw size={16} /></button>
          {!sequence.finished && <><button onClick={() => sequence.setPaused(!sequence.paused)} aria-label={sequence.paused ? "Resume slide animation" : "Pause slide animation"} title={sequence.paused ? "Resume" : "Pause"}>{sequence.paused ? <Play size={16} /> : <Pause size={16} />}</button></>}
          {!sequence.overview && <button onClick={sequence.complete} aria-label="Show complete slide" title="Show complete slide"><SkipForward size={16} /></button>}
        </>}
        <button onClick={readVoiceover} aria-label="Read slide voiceover" title="Read voiceover"><BookOpen size={16} /></button>
        <span className={styles.controlStatus}>{sequence.finished ? "COMPLETE" : sequence.paused ? "PAUSED" : "VISUAL BUILD"}</span>
      </div>
      <span className={styles.screenReaderOnly}>Current visual stage: {stage.label}. {stage.description}</span>
    </div>
    <dialog ref={dialog} className={styles.transcript} aria-labelledby={scriptTitleId} onClose={() => sequence.setPaused(previouslyPaused.current)} onKeyDown={(event) => event.stopPropagation()}>
      <header><div><span>VOICEOVER SCRIPT · {Math.round(slide.durationMs / 1000)} SEC VISUAL TARGET</span><h2 id={scriptTitleId}>{slide.title}</h2></div><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close voiceover script"><X size={20} /></button></header>
      <div className={styles.scriptBody}><p className={styles.scriptNote}>{slide.timingNote}</p>{slide.speakerCues.map((cue, index) => <div className={styles.speakerCue} key={index}><h3>{cue.speaker}<small>{cue.performance}</small></h3><p>{cue.text}</p></div>)}</div>
    </dialog>
  </section>;
}

export function FollowonChapterSlide({ id }: { id: FollowonSlideId }) {
  return <FollowonContent key={id} id={id} />;
}
