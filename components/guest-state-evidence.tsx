"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { guestSeriesEvidence } from "@/lib/guest-series-evidence";
import { guestUsStatePaths, guestUsStateViewBox } from "@/lib/guest-us-state-paths";
import styles from "./guest-state-evidence.module.css";

/** State examples are data points with different purposes, not one deployment. */
export function GuestStateEvidence({ step = 0 }: { step?: number }) {
  const titleId = useId();
  const mapTitleId = useId();
  const safeStep = Math.max(0, Math.floor(step));
  const [selection, setSelection] = useState({ step: safeStep, index: safeStep % guestSeriesEvidence.length });
  // A manual choice remains selected until silent playback reaches a new step.
  const activeIndex = selection.step === safeStep ? selection.index : safeStep % guestSeriesEvidence.length;
  const active = guestSeriesEvidence[activeIndex];
  const selectedShape = guestUsStatePaths.find((state) => state.fips === active.fips)!;
  const sourceNames = active.state === "West Virginia"
    ? ["State pilot", "MIT research", "MIT overview"]
    : ["Primary source"];

  return <section className={styles.root} aria-labelledby={titleId} onKeyDown={(event) => event.stopPropagation()}>
    <header className={styles.header}>
      <h3 id={titleId}>Public-sector reference cases</h3>
      <span>Four distinct applications</span>
    </header>

    <div className={styles.selectors} role="group" aria-label="Select a state reference">
      {guestSeriesEvidence.map((evidence, index) => <button
        key={evidence.fips}
        type="button"
        aria-pressed={activeIndex === index}
        className={activeIndex === index ? styles.selected : styles.stateButton}
        onClick={(event) => { event.stopPropagation(); setSelection({ step: safeStep, index }); }}
      ><span>{String(index + 1).padStart(2, "0")}</span>{evidence.state}</button>)}
    </div>

    <div className={styles.body}>
      <figure className={styles.map}>
        <svg viewBox={guestUsStateViewBox} role="img" aria-labelledby={mapTitleId}>
          <title id={mapTitleId}>United States map highlighting {active.state}. Wyoming, California, Vermont and West Virginia are the four reference states.</title>
          {guestUsStatePaths.map((state) => {
            const isReference = guestSeriesEvidence.some((evidence) => evidence.fips === state.fips);
            return <path key={state.fips} d={state.d} vectorEffect="non-scaling-stroke" className={
              state.fips === active.fips ? styles.activeState : isReference ? styles.referenceState : styles.state
            }><title>{state.name}</title></path>;
          })}
          <circle className={styles.markerHalo} cx={selectedShape.center[0]} cy={selectedShape.center[1]} r={23} />
          <circle className={styles.marker} cx={selectedShape.center[0]} cy={selectedShape.center[1]} r={6} />
        </svg>
        <figcaption>U.S. Census-derived boundaries · Albers USA projection</figcaption>
      </figure>

      <div className={styles.evidence} aria-live="polite" aria-atomic="true">
        <p className={styles.year}>{active.year}</p>
        <h4>{active.application}</h4>
        <p className={styles.caption}>{active.caption}</p>
        <div className={styles.sources}>{active.sources.map((source, index) => <a
          key={source.url}
          href={source.url}
          title={source.label}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >{sourceNames[index]}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</div>
      </div>
    </div>

    <p className={styles.note}>Different purposes. Different maturity. These examples do not establish a shared architecture or prove official election security.</p>
  </section>;
}
