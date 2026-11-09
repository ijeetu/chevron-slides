"use client";

import { CueStatement, CueSteps, VoiceoverCues } from "@/components/voiceover-cues";

/** Slide 3 — Colin Heaton's personal introduction (VF_Pres_11.08.26). */
export function ColinIntroSlide() {
  const credentials = ["Military historian", "Author", "Former professor", "U.S. Army & Marine Corps veteran"];
  return (
    <section className="flex h-full items-center justify-center px-6">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Personal introduction</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#f4f2ec]">Colin Heaton</h1>
        <div className="mx-auto mt-6 h-px w-48 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
        <ul className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.95rem] text-[#dbe6ec] sm:text-lg">
          {credentials.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 ? <span aria-hidden="true" className="text-[#9beaff]/60">·</span> : null}
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-[#a9bcc8] sm:text-base">
          Historical documentary production — preserving the stories and lessons of the past.
        </p>
      </div>
    </section>
  );
}

/** Slide 15 — Executing the Vision: 250 YEARS, then TPUSA archival footage under George. */
export function ExecutingVisionSlide() {
  const closing = "/voices/george-2611/s15e.mp3";
  return (
    <section className="flex h-full items-center justify-center px-6 py-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="text-center md:text-left">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#9beaff] sm:text-xs">Executing the vision</p>
          <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f4f2ec]">250 YEARS</h1>
          <p className="mt-6 max-w-xl font-display text-[clamp(1.2rem,2.2vw,1.9rem)] leading-[1.25] text-[#dbe6ec] md:mx-0 mx-auto">
            A movement can start with one man—someone who executes a strong vision with absolute conviction and puts in the time.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[#9beaff]/80">His vision — look at what it became.</p>
        </div>
        <div className="mx-auto w-full max-w-[19rem] overflow-hidden rounded-[1.2rem] border border-[#9beaff]/30 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <video
            src="/executing-vision/tpusa-crowd.mp4"
            poster="/executing-vision/tpusa-crowd-poster.jpg"
            className="aspect-[9/16] h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Charlie Kirk throwing hats into the crowd at a Turning Point USA event"
          />
        </div>
      </div>
      <VoiceoverCues
        cues={[
          { src: closing, from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement eyebrow="TPUSA was a turning point.">This platform is what comes next.</CueStatement> },
        ]}
      />
    </section>
  );
}

const george = (file: string) => `/voices/george-2611/${file}.mp3`;

/** Slide 10 — the long game: persistence → influence, then George's closing challenge. */
export function LongGameCues() {
  return (
    <VoiceoverCues
      cues={[
        // span set so each step lands as George says it (28.6s, 31.0s, 33.1s, 34.0s)
        { src: george("s10a"), from: 28.4, to: 34.0 + 1.6, render: (p) => <CueSteps steps={["PERSISTENCE", "CAPABILITY", "SCALE", "INFLUENCE"]} progress={p * (7.2 / 5.6)} /> },
        { src: george("s10b"), from: 7.6, to: 14.8, render: () => <CueStatement>“Why accept it as inevitable?”</CueStatement> },
        { src: george("s10b"), from: 14.9, to: Number.POSITIVE_INFINITY, render: () => <CueStatement>That is American!</CueStatement> },
      ]}
    />
  );
}

/** Slide 11 — the key statement. */
export function TechnologicalPowerCues() {
  return (
    <VoiceoverCues
      cues={[
        { src: george("s11b"), from: 2.3, to: 6.6, render: () => <CueStatement eyebrow="We're proposing something different">Participation in the architecture itself</CueStatement> },
      ]}
    />
  );
}

/** Slide 12 — networks compound power. */
export function NetworkCues() {
  return (
    <VoiceoverCues
      cues={[
        { src: george("s12b"), from: 11.0, to: 24.0, render: (p) => (
          <CueSteps eyebrow="Networks compound power" steps={["INSTITUTIONS", "MEDIA", "LAW", "POLITICS", "RESEARCH", "ORGANIZED ACTION"]} progress={p * (13 / 6.6)} />
        ) },
      ]}
    />
  );
}

/** Slide 14 — George's answer. */
export function WeBuildItCue() {
  return <VoiceoverCues cues={[{ src: george("s14b"), from: 0, to: Number.POSITIVE_INFINITY, render: () => <CueStatement>WE BUILD IT.</CueStatement> }]} />;
}
