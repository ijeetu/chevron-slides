"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * On-screen moments timed to the slide voiceover.
 *
 * A cue names the voiceover track it belongs to (its audio path) and a window in
 * seconds within that track. It follows the shared slide voiceover player, so cues
 * stay in sync when tracks are added (for example Colin's recordings) or the viewer
 * pauses and resumes. `to: Infinity` holds the moment until the slide changes.
 */
export type VoiceoverCue = {
  src: string;
  from: number;
  to: number;
  render: (progress: number) => ReactNode;
};

export type Position = { src: string; time: number };

export function useVoiceoverPosition() {
  const [position, setPosition] = useState<Position | null>(null);
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const audio = document.querySelector<HTMLAudioElement>("audio[data-slide-voiceover]");
      if (audio) {
        const src = decodeURI(new URL(audio.currentSrc || audio.src, window.location.href).pathname);
        const time = audio.ended ? Number.POSITIVE_INFINITY : audio.currentTime;
        setPosition((prev) => (prev && prev.src === src && Math.abs(prev.time - time) < 0.04 ? prev : { src, time }));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return position;
}

export function VoiceoverCues({ cues }: { cues: readonly VoiceoverCue[] }) {
  const position = useVoiceoverPosition();
  const active = position
    ? cues.filter((cue) => cue.src === position.src && position.time >= cue.from && position.time < cue.to)
    : [];
  if (!active.length || !position) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-[#07101a]/80 px-6 backdrop-blur-sm motion-safe:animate-[fadeIn_.5s_ease-out]">
      {active.map((cue, i) => {
        const span = Number.isFinite(cue.to) ? cue.to - cue.from : 4;
        const progress = Number.isFinite(position.time) ? Math.min(1, (position.time - cue.from) / span) : 1;
        return <div key={i}>{cue.render(progress)}</div>;
      })}
    </div>
  );
}

/** A statement given its own moment on screen. */
export function CueStatement({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div className="max-w-5xl text-center">
      {eyebrow ? <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff] sm:text-xs">{eyebrow}</p> : null}
      <p className="font-display text-[clamp(2.2rem,6vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#f4f2ec]">{children}</p>
    </div>
  );
}

/** A progression revealed step by step: steps[i] appears when progress passes i / steps.length. */
export function CueSteps({ steps, progress, eyebrow }: { steps: readonly string[]; progress: number; eyebrow?: string }) {
  return (
    <div className="text-center">
      {eyebrow ? <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#9beaff] sm:text-xs">{eyebrow}</p> : null}
      <ol className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6">
        {steps.map((step, i) => {
          const shown = progress >= i / steps.length;
          return (
            <li key={step} className={`flex items-center gap-4 transition-opacity duration-500 sm:gap-6 ${shown ? "opacity-100" : "opacity-0"}`}>
              {i > 0 ? <span aria-hidden="true" className="text-xl text-[#9beaff] sm:text-3xl">→</span> : null}
              <span className="border-b-2 border-[#9beaff]/70 pb-1 font-display text-[clamp(1.1rem,2.6vw,2.4rem)] font-semibold tracking-[0.06em] text-[#f4f2ec]">{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
