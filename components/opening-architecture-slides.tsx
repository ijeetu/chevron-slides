"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ArrowRight, FileCheck2, Fingerprint, Pause, Play, RotateCcw, ShieldCheck, SkipForward } from "lucide-react";
import styles from "./opening-architecture-slides.module.css";

type SlideProps = { onContinue?: () => void };

// These clocks rehearse the visual build only. Recorded narration for the
// revised master has not been supplied, so no existing audio is played here.
function useVisualRehearsal(durationMs: number) {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [preview, setPreview] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(false);
  const finished = elapsed >= durationMs;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        setPreview(true);
        setElapsed(durationMs);
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [durationMs]);

  useEffect(() => {
    const update = (event: Event) => setScriptOpen(Boolean((event as CustomEvent<{ open: boolean }>).detail?.open));
    window.addEventListener("opening-script-visibility", update);
    return () => window.removeEventListener("opening-script-visibility", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || finished || scriptOpen) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      // A hidden tab or open script dialog must not consume the visual build.
      const suspended = document.hidden || Boolean(document.querySelector("dialog[open]"));
      const delta = suspended ? 0 : now - previous;
      previous = now;
      setElapsed((time) => Math.min(durationMs, time + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [durationMs, paused, reducedMotion, finished, scriptOpen]);

  return {
    elapsed,
    paused,
    preview,
    reducedMotion,
    finished,
    all: preview || reducedMotion,
    toggle: () => setPaused((value) => !value),
    replay: () => {
      setPreview(reducedMotion);
      setElapsed(reducedMotion ? durationMs : 0);
      setPaused(false);
    },
    complete: () => { setPreview(true); setElapsed(durationMs); setPaused(false); },
    jump: (time: number) => { setPreview(false); setElapsed(time); setPaused(false); },
  };
}

type Rehearsal = ReturnType<typeof useVisualRehearsal>;

function Controls({ sequence, onContinue, children }: { sequence: Rehearsal; onContinue?: () => void; children?: ReactNode }) {
  return <div className={styles.controls} role="group" aria-label="Visual rehearsal controls">
    <span className={styles.controlLabel}>{sequence.all ? "COMPLETE VIEW" : sequence.finished ? "REHEARSAL COMPLETE" : "VISUAL REHEARSAL"}</span>
    {!sequence.reducedMotion && <>
      <button type="button" onClick={sequence.replay} aria-label="Replay visual rehearsal" title="Replay visual rehearsal"><RotateCcw size={15} /></button>
      {!sequence.finished && <button type="button" onClick={sequence.toggle} aria-label={sequence.paused ? "Resume visual rehearsal" : "Pause visual rehearsal"} title={sequence.paused ? "Resume" : "Pause"}>{sequence.paused ? <Play size={15} /> : <Pause size={15} />}</button>}
    </>}
    <button type="button" onClick={sequence.complete} aria-label="Show complete slide" title="Show complete slide"><SkipForward size={15} /><span>Show complete</span></button>
    {children}
    {onContinue && <button type="button" className={styles.continueButton} onClick={onContinue}>Continue<ArrowRight size={15} /></button>}
  </div>;
}

function Frame({ children, sequence, onContinue, className = "", controls }: { children: ReactNode; sequence: Rehearsal; onContinue?: () => void; className?: string; controls?: ReactNode }) {
  return <section className={`${styles.root} ${className}`} data-reduced-motion={sequence.reducedMotion} data-paused={sequence.paused}>
    <div className={styles.frame}>{children}<Controls sequence={sequence} onContinue={onContinue}>{controls}</Controls></div>
  </section>;
}

function Header({ number, eyebrow, title, subtitle, titleId }: { number: string; eyebrow: string; title: string; subtitle?: string; titleId: string }) {
  return <header className={styles.header}>
    <p className={styles.eyebrow}>{eyebrow}<span aria-hidden="true"> · </span>{number}</p>
    <h1 id={titleId} className="font-display">{title}</h1>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </header>;
}

const civicFunctions = [
  { title: "VERIFY", body: "Citizen identity and participation", time: 0 },
  { title: "CAPTURE", body: "Real-time public sentiment", time: 3500 },
  { title: "ANCHOR", body: "Tamper-evident civic records", time: 7000 },
] as const;

export function RevisedCivicOperatingSystemSlide({ onContinue }: SlideProps) {
  const sequence = useVisualRehearsal(63500);
  const titleId = useId();
  const closing = !sequence.preview && sequence.elapsed >= 55000;
  const safeguards = !sequence.all && sequence.elapsed >= 26000 && sequence.elapsed < 41000;
  const show = (time: number) => sequence.all || sequence.elapsed >= time;
  const closingControl = <button type="button" onClick={closing ? sequence.complete : () => sequence.jump(sequence.reducedMotion ? 63500 : 55000)}>{closing ? "Architecture" : "View closing"}</button>;

  return <Frame sequence={sequence} onContinue={onContinue} className={styles.civic} controls={closingControl}>
    {closing ? <div className={styles.closing} aria-labelledby={titleId}>
      <p className={styles.eyebrow}>PROPOSED FUTURE DIRECTION</p>
      <h1 id={titleId} className="font-display">THE FUTURE OF<br />ELECTION INTEGRITY</h1>
      <p className={styles.closingBridge} data-visible={show(57500)}>Paper is the bridge.</p>
      <p className={styles.closingStandard} data-visible={show(61000)}>Electronic verification<br className={styles.mobileBreak} /> becomes the standard.</p>
      <p className={styles.qualification}>Requires independent validation and appropriate legal authorization.</p>
    </div> : <div className={styles.content} aria-labelledby={titleId}>
      <Header number="22" eyebrow="CORE OS ARCHITECTURE" title="Authenticating the Future of Representation" titleId={titleId} />
      <div className={styles.civicMain}>
        <ol className={styles.civicFunctions} aria-label="Three core operating-system functions">
          {civicFunctions.map((item, index) => <li key={item.title} data-visible={show(item.time)} aria-hidden={!show(item.time)}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <h2 className="font-display">{item.title}</h2>
            <p>{item.body}</p>
            {index < 2 && <ArrowRight className={styles.functionArrow} aria-hidden="true" size={22} />}
          </li>)}
        </ol>
        <div className={styles.civicOutcome} data-visible={show(11000)} aria-hidden={!show(11000)}>
          <p className={styles.eyebrow}>OUTCOME</p>
          <p>Turning verified public sentiment into actionable intelligence for California&apos;s legislative rollout.</p>
        </div>
      </div>
      <div className={styles.phaseTwo} data-visible={show(17000)} aria-hidden={!show(17000)}>
        <div><p className={styles.eyebrow}>PHASE TWO — LAWFUL CIVIC ACTION</p><span className={styles.futureBadge}>FUTURE RELEASE</span></div>
        <p>Petitions · Initiatives · Referenda · Recalls</p>
        <strong className="font-display">Made Easy.</strong>
      </div>
      <p className={styles.qualification}>Verified civic sentiment is distinct from official election results. Phase Two is a future software release.</p>
      {safeguards && <div className={styles.safeguards} aria-label="Complementary safeguards in the proposed future architecture">
        <p className={styles.eyebrow}>COMPLEMENTARY SAFEGUARDS · PROPOSED ARCHITECTURE</p>
        <div className={styles.safeguardSteps}>
          {[
            { label: "PAPER RECORD", Icon: FileCheck2, time: 26000 },
            { label: "DIGITAL VERIFICATION", Icon: Fingerprint, time: 30000 },
            { label: "INDEPENDENT AUDIT", Icon: ShieldCheck, time: 34000 },
          ].map(({ label, Icon, time }, index) => <div key={label} data-visible={show(time)} aria-hidden={!show(time)}><Icon size={30} strokeWidth={1.3} /><span>{label}</span>{index < 2 && <ArrowRight className={styles.safeguardArrow} size={18} aria-hidden="true" />}</div>)}
        </div>
        <p className={styles.qualification}>Complementary safeguards, requiring independent evaluation. A ledger alone does not establish election legitimacy.</p>
      </div>}
    </div>}
  </Frame>;
}

const infrastructureRows = [
  { title: "DISTRIBUTION", body: "Connected displays in high-traffic locations.", detail: "RETAIL · TRANSPORTATION · COMMERCIAL SPACES · COMMUNITIES", time: 0 },
  { title: "COMMERCIAL SUSTAINABILITY", body: "Media, advertising, enterprise services, and partnerships finance the network.", detail: "OPERATE → EXPAND → UPGRADE", time: 5500 },
  { title: "RESILIENCE", body: "Distributed infrastructure designed for long-term continuity.", detail: "INDEPENDENT OPERATIONS · ACTUAL TECHNICAL DEPENDENCIES", time: 11000 },
] as const;

export function RevisedCivicConnectivitySlide({ onContinue }: SlideProps) {
  const sequence = useVisualRehearsal(20000);
  const titleId = useId();
  const show = (time: number) => sequence.all || sequence.elapsed >= time;
  return <Frame sequence={sequence} onContinue={onContinue}>
    <div className={styles.content} aria-labelledby={titleId}>
      <Header number="23" eyebrow="PHYSICAL INFRASTRUCTURE" title="Hard-Wired Civic Connectivity" subtitle="Anchoring the Digital Pulse into Physical Assets" titleId={titleId} />
      <ol className={styles.infrastructureRows} aria-label="Physical network architecture">
        {infrastructureRows.map((item, index) => <li key={item.title} data-visible={show(item.time)} aria-hidden={!show(item.time)}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <div><h2 className="font-display">{item.title}</h2><p>{item.body}</p></div>
          <p className={styles.rowDetail}>{item.detail}</p>
        </li>)}
      </ol>
      <div className={styles.goal} data-visible={show(16000)} aria-hidden={!show(16000)}><p className={styles.eyebrow}>THE GOAL</p><p>A permanent physical foundation for civic participation—commercially sustainable and built to endure.</p></div>
      <p className={styles.qualification}>Proposed network. Availability and continuity depend on the infrastructure actually deployed.</p>
    </div>
  </Frame>;
}

export function RevisedStrategicAllianceSlide({ onContinue }: SlideProps) {
  const sequence = useVisualRehearsal(30000);
  const titleId = useId();
  const show = (time: number) => sequence.all || sequence.elapsed >= time;
  const restricted = !sequence.all && sequence.elapsed >= 15000 && sequence.elapsed < 24000;
  const connected = show(26500);
  return <Frame sequence={sequence} onContinue={onContinue}>
    <div className={styles.content} aria-labelledby={titleId}>
      <Header number="24" eyebrow="CORE OS ARCHITECTURE" title="The Strategic Alliance" subtitle="A Global Distribution Pathway to Scale" titleId={titleId} />
      <p className={styles.proposed}>PROPOSED ALLIANCE</p>
      <div className={styles.allianceRails} data-connected={connected} data-restricted={restricted}>
        <article className={styles.distributionRail}>
          <p className={styles.number}>01</p><h2 className="font-display">X / xAI</h2>
          <p className={styles.railPurpose}>ACCELERATION</p>
          <p className={styles.railDescription}>Global distribution + AI intelligence.</p>
          <div className={styles.railLine} aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <p className={styles.railStatus}>{restricted ? "SOCIAL DISTRIBUTION RESTRICTED" : "GLOBAL REACH"}</p>
        </article>
        <article className={styles.sovereignRail} data-visible={show(7000)} aria-hidden={!show(7000)}>
          <p className={styles.number}>02</p><h2 className="font-display">SOVEREIGN<br />PARALLEL NETWORK</h2>
          <p className={styles.railPurpose}>RESILIENCE</p>
          <p className={styles.railDescription}>Independent civic continuity + verification.</p>
          <div className={styles.railLine} aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <p className={styles.railStatus}>{restricted ? "CIVIC PARTICIPATION CONTINUES" : "INDEPENDENT CONTINUITY"}</p>
        </article>
      </div>
      <div className={styles.allianceClosing}>
        {restricted ? <div className={styles.scenario}><p className={styles.eyebrow}>HYPOTHETICAL DISTRIBUTION RESTRICTION</p><p>COMMUNICATE → ORGANIZE → DEVELOP PROPOSALS → LAWFUL ACTION</p></div> : <div className={styles.convergence} data-visible={connected} aria-hidden={!connected}><span className={styles.eyebrow}>TOGETHER</span><p className="font-display">SCALE WITHOUT DEPENDENCY</p></div>}
      </div>
      <p className={styles.qualification}>Conceptual scenario assumes independent hosting, authentication, communications, and legally permitted operation. Continuity is not guaranteed or already demonstrated.</p>
      <div className={styles.allianceBottomLine} data-visible={connected} aria-hidden={!connected}><span className={styles.eyebrow}>THE BOTTOM LINE</span><p>From verified public participation to lawful action—at digital-age speed.</p></div>
    </div>
  </Frame>;
}

const blueprintEngines = [
  { title: "ACTIONS", body: "Verified participation → Lawful action", time: 0 },
  { title: "VERTICALS", body: "New industries → Commercial expansion", time: 4500 },
  { title: "ECOSYSTEM", body: "Capital → Technology → Partnerships", time: 9000 },
  { title: "VELOCITY", body: "Intelligence → Distribution → Execution", time: 13500 },
] as const;

export function RevisedBlueprintSlide({ onContinue }: SlideProps) {
  const sequence = useVisualRehearsal(22500);
  const titleId = useId();
  const connected = sequence.all || sequence.elapsed >= 19000;
  return <Frame sequence={sequence} onContinue={onContinue} className={styles.blueprint}>
    <div className={styles.content} aria-labelledby={titleId}>
      <Header number="25" eyebrow="FOUR FOUNDATIONAL ENGINES" title="The Blueprint" subtitle="ACTIONS. VERTICALS. ECOSYSTEM. VELOCITY." titleId={titleId} />
      <ol className={styles.blueprintGrid} data-connected={connected} aria-label="Four engines of the Blueprint">
        {blueprintEngines.map((engine, index) => {
          const visible = sequence.all || sequence.elapsed >= engine.time;
          return <li key={engine.title} data-visible={visible} aria-hidden={!visible}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <h2 className="font-display">{engine.title}</h2><p>{engine.body}</p>
          </li>;
        })}
        <li className={styles.blueprintJunction} data-visible={connected} aria-hidden="true"><span /><span /></li>
      </ol>
    </div>
  </Frame>;
}
