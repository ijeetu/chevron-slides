"use client";

import { useId } from "react";
import styles from "./guest-energy-reactor.module.css";

type GuestEnergyReactorProps = { step?: number };

const SOURCE_URL = "https://x-energy.com/xe-100/";
const STAGES = [
  "One reactor design",
  "Helium transfers the heat",
  "Configuration A · Electricity",
  "Configuration B · Industrial heat",
  "Choose the application",
];

function HeatMark() {
  return <svg viewBox="0 0 100 63" fill="none" aria-hidden="true">
    <path d="M17 52H83M25 58H75" className={styles.symbolBase} />
    {[30, 50, 70].map((x) => <g key={x}>
      <path d={`M${x} 44C${x - 10} 34 ${x + 10} 25 ${x} 15`} className={styles.heatWave} />
      <path d={`M${x - 4} 21L${x} 15L${x + 5} 20`} className={styles.heatWave} />
    </g>)}
  </svg>;
}

function ExchangeMark() {
  return <svg viewBox="0 0 120 65" fill="none" aria-hidden="true">
    <circle cx="24" cy="32" r="19" className={styles.heliumLoop} />
    <circle cx="96" cy="32" r="19" className={styles.steamLoop} />
    <text x="24" y="36" textAnchor="middle" className={styles.heliumText}>He</text>
    <text x="96" y="36" textAnchor="middle" className={styles.steamText}>H₂O</text>
    <path d="M49 32H71M66 27L71 32L66 37" className={styles.heatWave} />
    <path d="M59 13V23M59 42V52" className={styles.isolation} />
  </svg>;
}

function ApplicationMark({ thermal = false }: { thermal?: boolean }) {
  return <svg viewBox="0 0 38 38" fill="none" aria-hidden="true">
    {thermal ? <>
      <path d="M7 31H31M11 27V18L19 14V19L27 15V27M24 15V7H29V17M15 23H16M21 23H22" />
      <path d="M8 9C5 6 11 4 8 1M16 11C13 8 19 6 16 3" className={styles.processWaves} />
    </> : <>
      <circle cx="19" cy="18" r="12" />
      <path d="M20 9L14 19H20L18 27L25 16H19L20 9ZM10 32H28M14 29V32M24 29V32" />
    </>}
  </svg>;
}

/**
 * Functional energy-flow schematic, not a reactor engineering drawing.
 * Drive steps 0–4 across a 15–25 second presenter-controlled scene.
 * Ratings checked against X-energy's official Xe-100 and Industrial Power
 * pages on 23 October 2026. The two displayed configurations are alternatives.
 */
export function GuestEnergyReactor({ step = 0 }: GuestEnergyReactorProps) {
  const titleId = useId();
  const stage = Number.isFinite(step) ? Math.min(4, Math.max(0, Math.floor(step))) : 0;

  return <section className={styles.root} data-stage={stage} aria-labelledby={titleId} data-technical-source={SOURCE_URL}>
    <header className={styles.header}>
      <div><p>XE-100 · ENERGY APPLICATIONS</p><h3 id={titleId}>One design. Two energy pathways</h3></div>
      <span className={styles.designBadge}>DESIGN CONCEPT</span>
    </header>

    <div className={styles.process}>
      <div className={styles.reactor}>
        <span className={styles.nodeEyebrow}>THERMAL SOURCE</span>
        <HeatMark />
        <strong>Xe-100</strong>
        <p>High-temperature<br />gas-cooled reactor</p>
        <span className={styles.sourceTag}>TRISO-X fuel · Helium coolant</span>
      </div>

      <div className={styles.heliumConnection} aria-hidden="true"><span>HEAT</span><i /><small>Helium loop</small></div>

      <div className={styles.exchange}>
        <span className={styles.nodeEyebrow}>HEAT TRANSFER</span>
        <ExchangeMark />
        <strong>Heat exchange</strong>
        <p>Separate water<br />and steam loop</p>
        <span className={styles.loopBoundary}>Heat crosses.<br />Fluids stay separate.</span>
      </div>

      <div className={styles.steamConnection} aria-hidden="true"><i /><span>STEAM</span></div>

      <div className={styles.outputs}>
        <div className={`${styles.application} ${styles.electric}`}>
          <div className={styles.applicationHeading}><ApplicationMark /><span>CONFIGURATION A<br /><strong>Electricity</strong></span></div>
          <p className={styles.rating}>≈80 <span>MW<sub>e</sub></span></p>
          <span className={styles.ratingCaption}>Design rating per reactor</span>
          <p className={styles.destinations}><span>Steam → turbine + generator</span>AI data centers · Manufacturing · Grid</p>
        </div>
        <span className={styles.either}>OR</span>
        <div className={`${styles.application} ${styles.thermal}`}>
          <div className={styles.applicationHeading}><ApplicationMark thermal /><span>CONFIGURATION B<br /><strong>Industrial heat</strong></span></div>
          <p className={styles.rating}>≈200 <span>MW<sub>th</sub></span></p>
          <span className={styles.ratingCaption}>Design rating per reactor</span>
          <p className={styles.destinations}><span>Steam → industrial process</span>Process heating · Manufacturing</p>
        </div>
      </div>
    </div>

    <div className={styles.stageBar}>
      <div className={styles.stageDots} aria-hidden="true">{STAGES.map((name, index) => <i key={name} data-active={stage === index} data-complete={stage > index} />)}</div>
      <p aria-live="polite"><span>0{stage + 1}</span>{STAGES[stage]}</p>
    </div>

    <div className={styles.context} aria-label="Project evaluation requirements">
      <span><strong>Site</strong>Demand + connections</span>
      <span><strong>Safety</strong>Licensing + review</span>
      <span><strong>Workforce</strong>Skills + local supply chain</span>
    </div>

    <footer className={styles.footer}>
      <p>Design ratings, not demonstrated output. Alternatives are not additive. Proposed California application; project engineering and approvals would be required.</p>
      <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">Source: X-energy Xe-100<span aria-hidden="true">↗</span></a>
    </footer>
  </section>;
}
