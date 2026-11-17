"use client";

import { CueStatement, CueSteps, VoiceoverCues, useVoiceoverPosition } from "@/components/voiceover-cues";

/**
 * VF_Pres_11.17.26 Slide 24 — The Architecture Comes Together.
 * Part One (Colin c24, George s24a–s24b) and Part Two (George s24c–s24h). Times are seconds
 * into each take, measured from the recordings.
 */
const colin = (file: string) => `/voices/colin-2611/${file}.mp3`;
const george = (file: string) => `/voices/george-2611/${file}.mp3`;

const LAYERS = [
  { number: "01", title: "Civic Operating System", detail: "Verify the citizen · auditable record of participation", at: 6.9 },
  { number: "02", title: "Verified Participation & Public Sentiment", detail: "Capture the public will", at: 10.7 },
  { number: "03", title: "Physical Infrastructure", detail: "Access · reach · commercial sustainability", at: 15.6 },
  { number: "04", title: "Distribution & Sovereign Resilience", detail: "X and xAI · compatible platforms · Sovereign Parallel Network", at: 24.3 },
] as const;
const TOGETHER_AT = 42.8;

function eyebrow(text: string) {
  return <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff] sm:text-xs">{text}</p>;
}

/** Slide 24, Part One — the four layers join as Colin names them, then light up together. */
export function ArchitectureSlide() {
  const position = useVoiceoverPosition();
  const narrating = position?.src === colin("c24");
  const time = narrating ? position.time : Number.POSITIVE_INFINITY;
  const complete = time >= TOGETHER_AT;
  return (
    <section className="flex h-full items-center justify-center px-6 py-10">
      <div className="mx-auto w-full max-w-5xl text-center">
        {eyebrow("From public voice to lawful action")}
        <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#f4f2ec]">
          The Architecture Comes Together
        </h1>
        <div className="mx-auto mt-8 w-full max-w-3xl">
          <div
            className={`rounded-2xl border px-6 py-4 transition-[border-color,box-shadow] duration-700 ${complete ? "border-[#01c7f3] shadow-[0_0_50px_rgba(1,199,243,0.35)]" : "border-[#9beaff]/25"}`}
          >
            <p className="font-display text-[clamp(1rem,1.8vw,1.4rem)] font-semibold tracking-[0.14em] text-[#9beaff]">VIRAL FUSION</p>
            <p className="mt-1 text-[0.8rem] uppercase tracking-[0.2em] text-[#a9bcc8]">A new civic infrastructure</p>
          </div>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {LAYERS.map((layer) => {
              const shown = time >= layer.at;
              return (
                <li
                  key={layer.number}
                  className={`rounded-2xl border bg-[#0d1d2b]/85 px-5 py-4 text-left transition-[opacity,transform,border-color] duration-700 ${shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} ${complete ? "border-[#01c7f3]/70" : "border-[#9beaff]/20"}`}
                >
                  <p className="font-display text-sm font-semibold tabular-nums tracking-[0.14em] text-[#01c7f3]">{layer.number}</p>
                  <p className="mt-1 font-display text-[clamp(1rem,1.7vw,1.35rem)] font-semibold uppercase tracking-[0.04em] text-[#f4f2ec]">{layer.title}</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-[#a9bcc8]">{layer.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <VoiceoverCues
        cues={[
          // "Think about what this makes possible." — the citizen experience, step by step.
          { src: george("s24a"), from: 2.2, to: 28.0, render: (p) => (
            <CueSteps
              eyebrow="Think about what this makes possible"
              steps={["AUTHENTICATED CITIZEN", "RECORDED PARTICIPATION", "VERIFIABLE PUBLIC SENTIMENT", "FOUNDATION FOR LAWFUL ACTION"]}
              progress={atTimes([0.2, 2.7, 5.0, 19.4], 25.8)(p)}
            />
          ) },
          { src: george("s24a"), from: 28.0, to: Number.POSITIVE_INFINITY, render: () => (
            <div className="text-center">
              <CueStatement eyebrow="Participation, not a poll of the whole population">VERIFIED PUBLIC DEMAND</CueStatement>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[#a9bcc8]">A foundation for organized, lawful action</p>
            </div>
          ) },
          { src: george("s24b"), from: 12.4, to: Number.POSITIVE_INFINITY, render: () => <PhaseReveal time={position?.time ?? 0} /> },
        ]}
      />
    </section>
  );
}

function PhaseReveal({ time }: { time: number }) {
  const phaseTwo = time >= 15.0;
  return (
    <div className="grid w-full max-w-4xl gap-6 text-center sm:grid-cols-2">
      <div className={`rounded-2xl border bg-[#0d1d2b]/90 px-6 py-7 transition-opacity duration-700 ${phaseTwo ? "border-[#9beaff]/20 opacity-60" : "border-[#01c7f3] opacity-100"}`}>
        {eyebrow("Phase One")}
        <p className="mt-3 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-[0.06em] text-[#f4f2ec]">VERIFY · CAPTURE · AUDIT</p>
      </div>
      <div className={`rounded-2xl border border-[#01c7f3] bg-[#0d1d2b]/90 px-6 py-7 transition-[opacity,transform] duration-700 ${phaseTwo ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
        {eyebrow("Phase Two")}
        <p className="mt-3 font-display text-[clamp(1.2rem,2.6vw,2rem)] font-semibold tracking-[0.04em] text-[#f4f2ec]">FROM VERIFIED PUBLIC WILL TO LAWFUL ACTION</p>
      </div>
    </div>
  );
}

function atTimes(times: readonly number[], span: number) {
  return (progress: number) => (times.filter((t) => progress * span >= t).length - 1) / times.length;
}

/** Slide 24, Part Two — why the need for action matters. */
export function NeedForActionSlide() {
  return (
    <section className="flex h-full items-center justify-center px-6 py-10">
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow("Part Two")}
        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#f4f2ec]">
          Why the Need for Action Matters
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[clamp(0.95rem,1.6vw,1.2rem)] leading-relaxed text-[#a9bcc8]">
          Legislation. Election confidence. Shifting policy. The future belongs to We the People.
        </p>
      </div>
      <VoiceoverCues
        cues={[
          { src: george("s24c"), from: 0, to: 4.4, render: () => <CueStatement>Why keep depending on Washington?</CueStatement> },
          // SAVE Act: identification cards while the legislative record is on screen (s24c holds 7.5s).
          { src: george("s24c"), from: 4.4, to: Number.POSITIVE_INFINITY, render: (p) => (
            <div className="grid w-full max-w-4xl gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-[#9beaff]/30 bg-[#0d1d2b]/90 px-6 py-6">
                {eyebrow("Legislative record")}
                <p className="mt-3 font-display text-[clamp(1.1rem,2.2vw,1.7rem)] font-semibold text-[#f4f2ec]">SAVE ACT — PASSED THE HOUSE, STALLED IN THE SENATE</p>
                <p className="mt-3 text-sm leading-relaxed text-[#a9bcc8]">House passage: July 10, 2024 · April 10, 2025. Not advanced through the Senate. Source: Congress.gov</p>
              </div>
              <div className={`rounded-2xl border border-[#9beaff]/30 bg-[#0d1d2b]/90 px-6 py-6 transition-opacity duration-700 ${p > 0.12 ? "opacity-100" : "opacity-0"}`}>
                {eyebrow("2026")}
                <p className="mt-3 font-display text-[clamp(1.1rem,2.2vw,1.7rem)] font-semibold text-[#f4f2ec]">SAVE AMERICA ACT — 2026 CONGRESSIONAL DEBATE</p>
              </div>
            </div>
          ) },
          { src: george("s24d"), from: 0, to: 3.4, render: () => <CueStatement>Election confidence remains a serious issue.</CueStatement> },
          { src: george("s24d"), from: 3.4, to: Number.POSITIVE_INFINITY, render: (p) => (
            <CueSteps eyebrow="Americans disagree about" steps={["HOW ELECTIONS ARE ADMINISTERED", "HOW SYSTEMS ARE VERIFIED", "WHAT SAFEGUARDS EARN PUBLIC TRUST"]} progress={atTimes([0.2, 3.3, 5.7], 8.7)(p)} />
          ) },
          { src: george("s24e"), from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="It's time we provide the tools">The future belongs to We the People.</CueStatement> },
          { src: george("s24f"), from: 0, to: 7.2, render: () => <CueStatement eyebrow="Immigration">Expectations. Policy. Outcomes.</CueStatement> },
          { src: george("s24f"), from: 7.2, to: Number.POSITIVE_INFINITY, render: (p) => (
            <CueSteps steps={["PRESIDENTS MAKE COMMITMENTS", "THEN POLICIES CHANGE"]} progress={atTimes([0.2, 1.7], 3.1)(p)} />
          ) },
          { src: george("s24g"), from: 0, to: 8.7, render: () => <CueStatement eyebrow="Whatever our political differences">No single president, party, or institution.</CueStatement> },
          { src: george("s24g"), from: 8.7, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Technological capabilities previous generations could scarcely imagine">Are we prepared to put them to work?</CueStatement> },
          { src: george("s24h"), from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="Our Republic was never meant to survive on promises alone">Its future depends on its people.</CueStatement> },
        ]}
      />
    </section>
  );
}
