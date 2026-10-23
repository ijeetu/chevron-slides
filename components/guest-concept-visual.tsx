"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import styles from "./guest-concept-visual.module.css";

export type GuestConceptKind =
  | "sovereign-core" | "trust-layers" | "trust-verification" | "proof-test" | "ai-accountability"
  | "water-recovery" | "desalination" | "feasibility" | "freight"
  | "legislative" | "participation" | "physical-network" | "vehicle"
  | "energy" | "health" | "health-economics" | "health-access"
  | "water-feasibility" | "production" | "governance"
  | "policy-pathways" | "parked-interface" | "capability-network";

type Props = { kind: GuestConceptKind; step?: number };
type Stage = { title: string; detail: string; label?: string };

const TITLES: Record<GuestConceptKind, string> = {
  "sovereign-core": "Sovereign core / public proof",
  "trust-layers": "Four distinct trust mechanisms",
  "trust-verification": "Verified participation / independent audit",
  "proof-test": "Fictional verification test",
  "ai-accountability": "Accountable AI assistance",
  "water-recovery": "Water capture / conveyance / recovery",
  desalination: "Desalination process",
  feasibility: "Evidence and pilot gates",
  freight: "Surface access / underground freight",
  legislative: "Legislative development process",
  participation: "Civic organizing and official authority",
  "physical-network": "Local touchpoints / shared services",
  vehicle: "Owner-controlled connection",
  energy: "Energy supply and productive demand",
  health: "Health understanding and care",
  "health-economics": "Healthcare dollar flow",
  "health-access": "Clinical evidence to patient access",
  "water-feasibility": "Five water feasibility gates",
  "policy-pathways": "Two public policy pathways",
  "parked-interface": "Optional parked-vehicle civic display",
  "capability-network": "Six capabilities / one shared architecture",
  production: "One editorial system / many surfaces",
  governance: "Authority / evidence / public review",
};

const SVG_KINDS = new Set<GuestConceptKind>([
  "sovereign-core", "water-recovery", "desalination", "freight", "physical-network",
  "health-economics", "policy-pathways", "capability-network",
]);

function Shell({ kind, children, note, label = "Conceptual system" }: {
  kind: GuestConceptKind; children: ReactNode; note: string; label?: string;
}) {
  const isDiagram = SVG_KINDS.has(kind);
  return <section className={styles.visual} data-kind={kind} aria-label={TITLES[kind]}>
    <div className={styles.heading}><span className={styles.headingTitle}>{TITLES[kind]}</span><span className={styles.legend}><i />{label}</span></div>
    <div className={`${styles.canvas} ${isDiagram ? styles.diagramCanvas : ""}`} tabIndex={isDiagram ? 0 : undefined} role={isDiagram ? "region" : undefined} aria-label={isDiagram ? `${TITLES[kind]} diagram; scroll horizontally on narrow screens` : undefined} onKeyDown={isDiagram ? (event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.stopPropagation(); } : undefined}>{children}</div>
    {isDiagram && <p className={styles.scrollHint}>← Scroll diagram horizontally →</p>}
    <p className={styles.note}><span aria-hidden="true">↳</span>{note}</p>
  </section>;
}

function Diagram({ children, label }: { children: ReactNode; label: string }) {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 640 310" className={styles.diagram} role="img" aria-label={label}>
    <defs><marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L7 4L1 7" fill="none" stroke="currentColor" strokeWidth="1.4" /></marker></defs>
    <g style={{ "--arrow": `url(#${id}-arrow)` } as React.CSSProperties}>{children}</g>
  </svg>;
}

function Label({ x, y, children, center = false, muted = false }: { x: number; y: number; children: ReactNode; center?: boolean; muted?: boolean }) {
  return <text x={x} y={y} textAnchor={center ? "middle" : undefined} className={muted ? styles.svgSmall : styles.svgLabel}>{children}</text>;
}

function SovereignCore({ step }: { step: number }) {
  return <Shell kind="sovereign-core" note="A public-network outage delays anchoring and receipts; the sovereign record remains in its own system.">
    <Diagram label="Private records stay in the sovereign core. Only a cryptographic commitment is sent to a public anchor. An independent auditor reviews permissioned evidence and the public commitment.">
      <rect x="25" y="32" width="245" height="244" rx="6" className={styles.boundary} />
      <Label x={44} y={57}>SOVEREIGN CORE</Label><Label x={44} y={77} muted>Controlled access · lawful authority</Label>
      <rect x="45" y="104" width="205" height="75" rx="4" className={styles.svgBox} />
      <Label x={62} y={132}>Private record</Label><Label x={62} y={155} muted>Identity + underlying data stay here</Label>
      <path d="M147 179V201" className={styles.arrow} />
      <rect x="45" y="203" width="205" height="56" rx="4" className={styles.svgBox} />
      <Label x={147} y={225} center>Commitment generation</Label><Label x={147} y={247} center muted>Proof reference, not record contents</Label>
      <g className={step % 3 === 1 ? styles.focus : undefined}><path d="M250 225H320V109H393" className={styles.arrow} /><Label x={332} y={87} center muted>Commitment only</Label></g>
      <rect x="405" y="61" width="208" height="94" rx="4" className={step % 3 === 1 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={509} y={92} center>Public anchor</Label><Label x={509} y={116} center muted>Timestamp + proof reference</Label><Label x={509} y={137} center muted>No private record published</Label>
      <path d="M509 155V204" className={styles.arrow} />
      <path d="M270 245H388" className={styles.dashedArrow} /><Label x={329} y={270} center muted>Permissioned evidence</Label>
      <rect x="405" y="215" width="208" height="62" rx="4" className={step % 3 === 2 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={509} y={241} center>Independent auditor</Label><Label x={509} y={263} center muted>Reconcile record + commitment</Label>
    </Diagram>
  </Shell>;
}

function WaterRecovery({ step }: { step: number }) {
  const active = (value: number) => `${styles.waterStage} ${step % 5 === value ? styles.waterFocus : styles.waterQuiet}`;
  const stageNames = ["Rainfall + runoff", "Separate diversion", "Underground conveyance", "Treatment", "Storage / recharge"];
  return <Shell kind="water-recovery" note="Schematic only. Site, water quality and environmental review determine feasibility.">
    <Diagram label="Rainfall and runoff enter an existing surface channel. A separate diversion point routes some water through underground conveyance to treatment and then to storage or recharge.">
      <text x="612" y="27" textAnchor="end" className={styles.stageProgress}>{stageNames[step % 5]}</text>
      <path d="M20 114H620V291H20Z" className={styles.soil} />
      <path d="M20 114H620" className={styles.ground} />
      <Label x={32} y={281} muted>BELOW GROUND</Label>
      <g className={active(0)}><Label x={36} y={27}>Rainfall</Label><path d="M51 41V73M84 41V73M117 41V73" className={styles.arrow} /><path d="M22 85L169 110H258" className={styles.waterLine} /><Label x={150} y={76} muted>Surface runoff</Label></g>
      <path d="M278 111H616" className={styles.channelLine} /><Label x={456} y={84} center>Existing channel continues</Label>
      <g className={active(1)}><circle cx="267" cy="111" r="8" className={styles.junction} /><path d="M267 120V164" className={styles.waterLine} /><Label x={245} y={143} center muted><tspan x="194">Separate</tspan><tspan x="194" dy="17">diversion point</tspan></Label></g>
      <g className={active(2)}><path d="M267 164V218H354" className={styles.waterArrow} /><Label x={279} y={252} center muted><tspan x="291">Underground</tspan><tspan x="291" dy="17">conveyance</tspan></Label></g>
      <g className={active(3)}><rect x="367" y="179" width="105" height="78" rx="4" className={styles.svgBox} /><path d="M387 198V236M397 198V236" className={styles.filter} /><Label x={419} y={282} center>Treatment</Label><Label x={431} y={213} center muted><tspan x="431">Quality</tspan><tspan x="431" dy="17">checks</tspan></Label></g>
      <g className={active(4)}><path d="M472 218H516" className={styles.waterArrow} /><path d="M532 184V244H606V184M532 204H606M540 217H598M540 226H598" className={styles.waterLine} /><Label x={569} y={164} center>Storage / recharge</Label><path d="M550 252V278M586 252V278" className={styles.dashedArrow} /></g>
    </Diagram>
  </Shell>;
}

function Desalination({ step }: { step: number }) {
  return <Shell kind="desalination" note="Energy demand, intake impacts, concentrate discharge and delivery cost require project-specific review.">
    <Diagram label="A seawater intake feeds pretreatment and desalination. Treated water is conveyed to storage or users. A separate concentrate stream goes through discharge and environmental review.">
      <path d="M26 63H143V270H26Z" className={styles.sea} /><path d="M143 62V270" className={styles.ground} />
      <Label x={85} y={91} center>SEA</Label><Label x={85} y={246} center muted>Coastal interface</Label>
      <path d="M53 137H179" className={styles.waterArrow} /><Label x={84} y={119} center muted>Intake</Label>
      <rect x="190" y="108" width="112" height="69" rx="4" className={step % 4 === 0 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={246} y={137} center>Pretreatment</Label><Label x={246} y={158} center muted>Source-water quality</Label>
      <path d="M302 143H342" className={styles.waterArrow} />
      <rect x="354" y="108" width="125" height="69" rx="4" className={step % 4 === 1 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={416} y={137} center>Desalination</Label><Label x={416} y={158} center muted>Separation process</Label>
      <g className={step % 4 === 3 ? styles.focus : undefined}><path d="M479 143H603V97" className={styles.waterArrow} /><Label x={554} y={62} center>Treated water</Label><Label x={554} y={82} center muted>Conveyance to storage / users</Label></g>
      <g className={step % 4 === 2 ? styles.focus : undefined}><path d="M416 177V235H185" className={styles.concentrateArrow} /><Label x={344} y={263} center>Concentrate discharge</Label><Label x={344} y={283} center muted>Separate stream + environmental review</Label></g>
      <path d="M174 220H151M174 233H151M174 246H151" className={styles.concentrateLine} />
      <Label x={416} y={82} center muted>Energy input + operations</Label>
    </Diagram>
  </Shell>;
}

type ProofState = "original" | "altered" | "unauthorized";
const proofStateForStep = (step: number): ProofState => step % 5 >= 4 ? "unauthorized" : step % 5 >= 2 ? "altered" : "original";

function ProofTest({ step }: { step: number }) {
  const [test, setTest] = useState<ProofState>(() => proofStateForStep(step));
  useEffect(() => { setTest(proofStateForStep(step)); }, [step]);
  const altered = test === "altered";
  const denied = test === "unauthorized";
  return <Shell kind="proof-test" label="Interactive simulation" note="Fixed illustrative tokens only: no cryptography is performed. Fictional, nonbinding petition; no voting or certification capability.">
    <div className={styles.proof}>
      <div className={styles.testControls} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        {([ ["original", "Original record"], ["altered", "Alter record"], ["unauthorized", "Unauthorized event"] ] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={test === value} className={test === value ? styles.selectedTest : styles.testButton} onClick={() => setTest(value)}>{label}</button>)}
      </div>
      <div className={styles.proofRecord}><span className={styles.miniLabel}>Fictional record · P-017</span><strong>Public garden petition</strong><span>Choice: <b className={altered ? styles.changed : undefined}>{altered ? "Oppose" : "Support"}</b><span className={styles.recordDivider}>/</span>Revision: {altered ? "2" : "1"}</span></div>
      <div className={styles.tokenRow}><div><span className={styles.miniLabel}>Reference token</span><code>SIM-4K7A</code></div><span className={styles.compareMark} aria-hidden="true">{denied ? "×" : altered ? "≠" : "="}</span><div><span className={styles.miniLabel}>{denied ? "Event authorization" : "Observed token"}</span><code>{denied ? "NOT PERMITTED" : altered ? "SIM-9Q2C" : "SIM-4K7A"}</code></div></div>
      <div className={denied || altered ? styles.proofWarning : styles.proofSuccess} role="status" aria-live="polite"><span className={styles.statusDot} /><strong>{denied ? "AUTHORIZATION DENIED" : altered ? "MISMATCH DETECTED" : "SIMULATED MATCH"}</strong><p>{denied ? "The submitting role cannot publish this event. No new receipt is issued." : altered ? "The changed record no longer matches the illustrative reference." : "The unchanged record matches the illustrative reference."}</p></div>
    </div>
  </Shell>;
}

function TrustLayers({ step }: { step: number }) {
  const layers = [
    ["01", "Merkle proofs", "Record inclusion and changes to committed data", "INCLUSION"],
    ["02", "Public anchoring", "Independent publication of a commitment", "PUBLICATION"],
    ["03", "Zero-knowledge proofs", "A selected statement without revealing its private witness", "PRIVACY"],
    ["04", "End-to-end integrity", "Identity · secure devices · authorized and accurate processing · coercion resistance · audits", "SYSTEM"],
  ];
  return <Shell kind="trust-layers" note="These mechanisms prove different things. None alone guarantees the integrity of the whole system.">
    <div className={styles.layers}>{layers.map(([n, title, detail, tag], index) => <div key={n} className={`${styles.layer} ${step % 4 === index ? styles.activeLayer : ""}`}><span className={styles.layerNumber}>{n}</span><div><strong>{title}</strong><p>{detail}</p></div><span className={styles.layerTag}>{tag}</span></div>)}</div>
  </Shell>;
}

function Flow({ kind, step, stages, note, returnLabel }: { kind: GuestConceptKind; step: number; stages: Stage[]; note: string; returnLabel?: string }) {
  return <Shell kind={kind} note={note}><div className={styles.flow}>
    <div className={styles.flowTrack} aria-hidden="true" />
    <div className={styles.flowStages} data-count={stages.length} style={{ "--stage-count": stages.length } as React.CSSProperties}>{stages.map((stage, index) => <div key={stage.title} className={`${styles.stage} ${step % stages.length === index ? styles.activeStage : ""}`}><span className={styles.stageIndex}>{String(index + 1).padStart(2, "0")}</span><strong>{stage.title}</strong><p>{stage.detail}</p>{stage.label && <small>{stage.label}</small>}</div>)}</div>
    {returnLabel && <div className={styles.returnLine}><span>↶</span><p>{returnLabel}</p></div>}
  </div></Shell>;
}

function Accountability({ step }: { step: number }) {
  return <Shell kind="ai-accountability" note="AI can assist analysis and communication. Accountable people retain the authority to approve, contest and correct consequential decisions.">
    <div className={styles.accountability}>
      <div className={styles.authority}><span className={styles.miniLabel}>Authority stays here</span><strong>People + lawful institutions</strong><p>Set purpose · define rights · approve decisions</p></div>
      <div className={styles.guardrailLabel}>↓ <span>Bounded instruction + permission</span> ↓</div>
      <div className={styles.assistance}><span className={styles.miniLabel}>AI assistance</span><div>{["Analyze", "Explain", "Recommend"].map((label, i) => <span key={label} className={step % 3 === i ? styles.activeAssist : undefined}>{label}</span>)}</div></div>
      <div className={styles.accountabilityBase}><span>Traceable evidence</span><span>Human review</span><span>Appeal + correction</span></div>
    </div>
  </Shell>;
}

function Freight({ step }: { step: number }) {
  return <Shell kind="freight" note="Route selection depends on geology, utilities, safety, access and operating economics.">
    <Diagram label="An existing railroad corridor continues aboveground. A separately engineered underground freight corridor links logistics hubs, with utilities on a distinct layer.">
      <Label x={30} y={43}>EXISTING RAIL CORRIDOR</Label><Label x={533} y={43} center muted>Operating rail infrastructure</Label>
      <path d="M25 78H615M25 87H615" className={styles.ground} /><path d="M43 70V95M80 70V95M117 70V95M154 70V95M191 70V95M228 70V95M265 70V95M302 70V95M339 70V95M376 70V95M413 70V95M450 70V95M487 70V95M524 70V95M561 70V95M598 70V95" className={styles.channelLine} />
      <path d="M25 88H615V286H25Z" className={styles.soil} />
      <rect x="47" y="122" width="121" height="61" rx="4" className={styles.svgBox} /><Label x={107} y={148} center>Logistics hub</Label><Label x={107} y={169} center muted>Transfer + inspection</Label>
      <rect x="472" y="122" width="121" height="61" rx="4" className={styles.svgBox} /><Label x={532} y={148} center>Local hub</Label><Label x={532} y={169} center muted>Last-mile connection</Label>
      <path d="M107 183V221H532V183" className={step % 3 === 1 ? styles.waterLine : styles.channelLine} />
      <path d="M212 221H286M354 221H428" className={styles.arrow} />
      <rect x="298" y="204" width="44" height="32" rx="3" className={styles.svgActiveBox} />
      <Label x={320} y={266} center>Dedicated freight corridor</Label>
      <path d="M46 295H594" className={styles.dashedLine} /><Label x={320} y={306} center muted>Separate utility layer · service access</Label>
    </Diagram>
  </Shell>;
}

function PhysicalNetwork({ step }: { step: number }) {
  return <Shell kind="physical-network" note="A proposed network of useful local touchpoints. Participation, content permissions and data controls are explicit at each location.">
    <Diagram label="A shared media and service network connects local community, retail and civic locations. Each location has local utility and explicit participation choices.">
      <rect x="209" y="32" width="222" height="66" rx="4" className={styles.svgBox} /><Label x={320} y={59} center>Shared network services</Label><Label x={320} y={81} center muted>Content · AI assistance · operations</Label>
      <path d="M320 98V135M105 135H535M105 135V172M320 135V172M535 135V172" className={styles.channelLine} />
      {[{ x: 105, title: "Community", detail: "Useful local information" }, { x: 320, title: "Retail", detail: "Services + local commerce" }, { x: 535, title: "Civic space", detail: "Voluntary participation" }].map((item, i) => <g key={item.title} className={step % 3 === i ? styles.focus : undefined}><rect x={item.x - 68} y="180" width="136" height="76" rx="4" className={styles.svgBox} /><Label x={item.x} y={210} center>{item.title}</Label><Label x={item.x} y={234} center muted>Local touchpoint</Label><Label x={item.x} y={283} center muted>{item.detail}</Label></g>)}
    </Diagram>
  </Shell>;
}

function Vehicle({ step }: { step: number }) {
  return <Shell kind="vehicle" note="Access requires a defined purpose, limited permissions and a way for the owner to withdraw consent.">
    <div className={styles.vehicleFlow}>
      <div className={styles.vehicleNode}><span className={styles.miniLabel}>Owner-controlled</span><strong>Vehicle + data</strong><p>Local function and private records</p></div>
      <div className={`${styles.permissionGate} ${step % 3 === 1 ? styles.activeStage : ""}`}><span className={styles.stageIndex}>?</span><strong>Permission gate</strong><p>Purpose<br />Scope<br />Duration</p></div>
      <div className={styles.vehicleNode}><span className={styles.miniLabel}>External</span><strong>Connected service</strong><p>Only the access that was granted</p></div>
    </div><div className={styles.withdraw}><span>↶</span> Review permissions / revoke access</div>
  </Shell>;
}

function HealthEconomics({ step }: { step: number }) {
  return <Shell kind="health-economics" note="Illustrative financing paths; arrangements vary. Evaluate patient outcomes alongside total spending, without assumed percentages.">
    <Diagram label="Household and employer premiums and public program funding flow to payers. Payers fund provider services and administration. Patients can also pay providers directly out of pocket.">
      <rect x="20" y="25" width="198" height="67" rx="4" className={styles.svgBox} />
      <Label x={119} y={52} center>Households + employers</Label><Label x={119} y={74} center muted>Premiums + contributions</Label>
      <rect x="432" y="25" width="187" height="67" rx="4" className={styles.svgBox} />
      <Label x={525} y={52} center>Public budgets</Label><Label x={525} y={74} center muted>Program funding</Label>
      <path d="M180 92V106H283V124M525 92V106H379V124" className={styles.arrow} />
      <rect x="240" y="135" width="182" height="65" rx="4" className={step % 3 === 0 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={331} y={162} center>Payers + health plans</Label><Label x={331} y={184} center muted>Financing + coverage</Label>
      <path d="M331 200V238" className={styles.arrow} /><path d="M422 168H545V238" className={styles.arrow} />
      <path d="M119 92V276H228" className={styles.dashedArrow} />
      <Label x={68} y={173} center muted><tspan x="66">Direct</tspan><tspan x="66" dy="16">out-of-pocket</tspan><tspan x="66" dy="16">payments</tspan></Label>
      <rect x="240" y="250" width="182" height="58" rx="4" className={step % 3 === 1 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={331} y={274} center>Providers + medicines</Label><Label x={331} y={295} center muted>Payments for care</Label>
      <rect x="463" y="250" width="157" height="58" rx="4" className={step % 3 === 2 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={541} y={274} center>Administration</Label><Label x={541} y={295} center muted>Plan operations + services</Label>
    </Diagram>
  </Shell>;
}

function PolicyPathways({ step }: { step: number }) {
  return <Shell kind="policy-pathways" note="Initiatives must qualify under applicable law. Legal and court review may apply to either route.">
    <Diagram label="Two distinct policy routes. The legislative route runs from Legislature to Governor to Law. A qualified initiative goes to voters and, if approved, becomes voter-approved law. Qualification is required, not automatic.">
      <Label x={25} y={32} muted>LEGISLATIVE ROUTE</Label>
      <rect x="25" y="49" width="172" height="73" rx="4" className={step % 5 === 0 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={111} y={80} center>Legislature</Label><Label x={111} y={103} center muted>Consider + pass</Label>
      <path d="M197 85H234" className={styles.arrow} />
      <rect x="246" y="49" width="141" height="73" rx="4" className={step % 5 === 1 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={316} y={80} center>Governor</Label><Label x={316} y={103} center muted>Executive action</Label>
      <path d="M387 85H430" className={styles.arrow} />
      <rect x="442" y="49" width="172" height="73" rx="4" className={step % 5 === 2 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={528} y={91} center>Law</Label>
      <path d="M25 157H614" className={styles.dashedLine} />
      <Label x={25} y={187} muted>CITIZEN INITIATIVE ROUTE</Label>
      <rect x="25" y="204" width="172" height="73" rx="4" className={step % 5 === 3 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={111} y={235} center>Qualified initiative</Label><Label x={111} y={258} center muted>Qualification required</Label>
      <path d="M197 240H234" className={styles.arrow} />
      <rect x="246" y="204" width="141" height="73" rx="4" className={step % 5 === 4 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={316} y={235} center>Voters</Label><Label x={316} y={258} center muted>Decide the measure</Label>
      <path d="M387 240H430" className={styles.arrow} />
      <rect x="442" y="204" width="172" height="73" rx="4" className={step % 5 === 4 ? styles.svgActiveBox : styles.svgBox} />
      <Label x={528} y={235} center>Voter-approved law</Label><Label x={528} y={258} center muted>If approved</Label>
    </Diagram>
  </Shell>;
}

function ParkedInterface({ step }: { step: number }) {
  return <Shell kind="parked-interface" label="Conceptual display" note="Optional use while parked. Public authorities administer official election procedures; this display does not cast votes.">
    <div className={styles.parkedDisplay}>
      <div className={styles.parkedStatus}><span className={styles.parkedBadge}>P</span><span>Parked vehicle</span><span>Optional civic information</span></div>
      <div className={styles.civicScreen}>
        <div className={styles.screenHeader}><span>Public measure information</span><span>Information only</span></div>
        <div className={`${styles.screenSummary} ${step % 3 === 0 ? styles.activeScreenSection : ""}`}><span className={styles.miniLabel}>Measure summary</span><strong>What would the proposal change?</strong><p>Plain-language context and the full measure text.</p></div>
        <div className={`${styles.screenEvidence} ${step % 3 === 1 ? styles.activeScreenSection : ""}`}><strong>Evidence + sources</strong><span>Read the supporting material ↗</span></div>
        <div className={`${styles.screenArguments} ${step % 3 === 2 ? styles.activeScreenSection : ""}`}><span className={styles.miniLabel}>Competing arguments</span><div><span>Arguments for</span><span>Arguments against</span></div></div>
      </div>
    </div>
  </Shell>;
}

function CapabilityNetwork({ step }: { step: number }) {
  const stage = step % 5;
  const capabilities = [
    { title: "Energy", x: 20, y: 28, path: "M172 52H200V125H216", active: stage === 0 },
    { title: "Healthcare", x: 20, y: 111, path: "M172 135H216", active: stage === 1 },
    { title: "Infrastructure", x: 20, y: 194, path: "M172 218H200V156H216", active: stage === 1 },
    { title: "AI", x: 468, y: 28, path: "M468 52H440V125H424", active: stage === 2 },
    { title: "Legislation", x: 468, y: 111, path: "M468 135H424", active: stage === 2 },
    { title: "Digital Trust", x: 468, y: 194, path: "M468 218H440V156H424", active: stage === 3 },
  ];
  return <Shell kind="capability-network" note="Shared governance, evidence and verification connect the capabilities to implementation.">
    <Diagram label="Energy, Healthcare, Infrastructure, AI, Legislation and Digital Trust converge through a shared Viral Fusion architecture and continue to The Blueprint in Motion. All paths remain visible as each group is emphasized.">
      {capabilities.map((capability) => <g key={capability.title}>
        <path d={capability.path} className={capability.active || stage === 4 ? styles.capabilityActivePath : styles.capabilityPath} />
        <rect x={capability.x} y={capability.y} width="152" height="49" rx="4" className={capability.active || stage === 4 ? styles.capabilityActiveBox : styles.svgBox} />
        <Label x={capability.x + 76} y={capability.y + 30} center>{capability.title}</Label>
      </g>)}
      <rect x="228" y="99" width="184" height="91" rx="5" className={stage === 4 ? styles.capabilityActiveBox : styles.svgBox} />
      <Label x={320} y={127} center>Viral Fusion</Label><Label x={320} y={151} center>Shared architecture</Label><Label x={320} y={174} center muted>Governance · evidence · trust</Label>
      <path d="M320 190V251" className={stage === 4 ? styles.capabilityActivePath : styles.capabilityPath} />
      <text x="320" y="282" textAnchor="middle" className={styles.finaleLabel}>The Blueprint in Motion</text>
    </Diagram>
  </Shell>;
}

export function GuestConceptVisual({ kind, step = 0 }: Props) {
  if (kind === "sovereign-core") return <SovereignCore step={step} />;
  if (kind === "water-recovery") return <WaterRecovery step={step} />;
  if (kind === "desalination") return <Desalination step={step} />;
  if (kind === "proof-test") return <ProofTest step={step} />;
  if (kind === "trust-layers") return <TrustLayers step={step} />;
  if (kind === "ai-accountability") return <Accountability step={step} />;
  if (kind === "freight") return <Freight step={step} />;
  if (kind === "physical-network") return <PhysicalNetwork step={step} />;
  if (kind === "vehicle") return <Vehicle step={step} />;
  if (kind === "health-economics") return <HealthEconomics step={step} />;
  if (kind === "policy-pathways") return <PolicyPathways step={step} />;
  if (kind === "parked-interface") return <ParkedInterface step={step} />;
  if (kind === "capability-network") return <CapabilityNetwork step={step} />;
  const flows: Record<Exclude<GuestConceptKind, "sovereign-core" | "water-recovery" | "desalination" | "proof-test" | "trust-layers" | "ai-accountability" | "freight" | "physical-network" | "vehicle" | "health-economics" | "policy-pathways" | "parked-interface" | "capability-network">, { stages: Stage[]; note: string; returnLabel?: string }> = {
    "trust-verification": {
      stages: [{ title: "VERIFIED PARTICIPATION", detail: "Check identity, eligibility and permission before participation" }, { title: "SECURE RECORD", detail: "Protect sensitive records in systems with controlled access" }, { title: "CRYPTOGRAPHIC PROOF", detail: "Commitments and proof references support checks for record changes" }, { title: "INDEPENDENT AUDIT", detail: "Reconcile permissioned evidence against the proof references" }],
      note: "Record integrity does not by itself establish truth, eligibility, authorization or the integrity of the whole process.",
    },
    feasibility: {
      stages: [{ title: "Define", detail: "Problem, route and public value", label: "SCOPE" }, { title: "Test", detail: "Engineering, impacts and economics", label: "EVIDENCE" }, { title: "Authorize", detail: "Independent review and lawful approvals", label: "GATE" }, { title: "Pilot", detail: "Bounded trial with stop criteria", label: "LEARN" }],
      note: "A concept is a starting hypothesis. Advance only when evidence supports the next commitment.", returnLabel: "Revise the proposal when evidence changes",
    },
    legislative: {
      stages: [{ title: "Research + economic analysis", detail: "Problem, evidence and economic implications" }, { title: "Legal draft", detail: "Proposed language and lawful authority" }, { title: "Expert review", detail: "Technical, legal and practical scrutiny" }, { title: "Public evaluation", detail: "Open consideration and public feedback" }],
      note: "Research precedes a draft. Any later official action follows the applicable legislative process.",
    },
    participation: {
      stages: [{ title: "Citizen organization", detail: "Civic education and voluntary organizing", label: "VF + CITIZENS" }, { title: "Petition process", detail: "Submission through the lawful petition route", label: "CITIZENS" }, { title: "OFFICIAL verification", detail: "Authorized officials check legal requirements", label: "PUBLIC AUTHORITIES" }, { title: "Public decision", detail: "The decision follows the official process", label: "PUBLIC AUTHORITIES" }],
      note: "Viral Fusion supports organizing. Authorized public bodies verify submissions and administer official decisions.",
    },
    energy: {
      stages: [{ title: "Supply", detail: "Reliable generation and resource planning" }, { title: "Connect", detail: "Grid capacity, storage and distribution" }, { title: "Use", detail: "Homes, industry and productive demand" }, { title: "Measure", detail: "Reliability, cost and environmental outcomes" }],
      note: "An integrated planning model. Technology selection depends on local conditions, permits, economics and operating evidence.", returnLabel: "Measured demand informs the next investment",
    },
    health: {
      stages: [{ title: "Understand", detail: "Clear information with visible sources" }, { title: "Access", detail: "Qualified care and appropriate services" }, { title: "Support", detail: "Prevention, follow-up and continuity" }, { title: "Evaluate", detail: "Outcomes, cost and patient experience" }],
      note: "Media can improve understanding. Clinical decisions remain with qualified professionals and the people receiving care.", returnLabel: "Evidence improves services and public understanding",
    },
    "health-access": {
      stages: [{ title: "Clinical evidence", detail: "Safety, efficacy and quality evidence" }, { title: "Regulatory review", detail: "Review by the relevant health authority" }, { title: "Coverage + provider delivery", detail: "Payment access and clinical delivery capacity" }, { title: "Patient access", detail: "Eligible patients can receive appropriate care" }],
      note: "An access pathway, not a claim of approval, coverage or treatment availability.",
    },
    "water-feasibility": {
      stages: [{ title: "Location", detail: "Source, geography and demand" }, { title: "Route + tunnel design", detail: "Ground conditions and constructability" }, { title: "Treatment + storage capacity", detail: "Water quality and usable capacity" }, { title: "Economic analysis", detail: "Capital, operations and delivery costs" }, { title: "Environmental review", detail: "Impacts, safeguards and approvals" }],
      note: "Each gate requires project-specific evidence before the concept can advance.",
    },
    production: {
      stages: [{ title: "Editorial", detail: "Research, guests and a coherent story", label: "PREPARE" }, { title: "Capture", detail: "Conversation, evidence and live moments", label: "PRODUCE" }, { title: "Adapt", detail: "Episode, short cuts and immersive surfaces", label: "PACKAGE" }, { title: "Distribute", detail: "Reach audiences and learn from response", label: "RELEASE" }],
      note: "One source conversation becomes several deliberate formats. Editorial review and permissions follow every derivative.", returnLabel: "Audience questions shape the next conversation",
    },
    governance: {
      stages: [{ title: "Mandate", detail: "Define who has authority and why" }, { title: "Operate", detail: "Named owners and controlled access" }, { title: "Audit", detail: "Independent evidence and exceptions" }, { title: "Correct", detail: "Appeal, remedy and public accountability" }],
      note: "Governance is an operating responsibility: clear decision rights, independent scrutiny and a practical path to correction.", returnLabel: "Review the mandate against observed outcomes",
    },
  };
  return <Flow kind={kind} step={step} {...flows[kind]} />;
}
