"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { slideNarration } from "@/lib/slide-narration";
import type { ViralFusionSlideId } from "@/lib/viral-fusion-deck";

type Props = { slideId: ViralFusionSlideId; title: string; suspended: boolean };
type SpeechControls = { play: () => void; pause: () => void; suspend: (value: boolean) => void };

// Keep long scripts in short utterances so each completed passage can release
// its speech resources without queuing the rest of the presentation.
function splitNarration(text: string) {
  const chunks: string[] = [];
  let remaining = text.replace(/\s+/g, " ").trim();
  while (remaining.length > 240) {
    const window = remaining.slice(0, 240);
    const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "), window.lastIndexOf("; "));
    const end = sentenceEnd > 80 ? sentenceEnd + 1 : window.lastIndexOf(" ");
    const boundary = end > 0 ? end : 240;
    chunks.push(remaining.slice(0, boundary).trim());
    remaining = remaining.slice(boundary).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

export function SyntheticSlideVoiceover(props: Props) {
  const narration = slideNarration[props.slideId];
  return narration ? <SpeechVoiceover {...props} narration={narration} /> : null;
}

function SpeechVoiceover({ slideId, title, suspended, narration }: Props & { narration: string }) {
  const chunks = useMemo(() => splitNarration(narration), [narration]);
  const controls = useRef<SpeechControls | null>(null);
  const suspendedRef = useRef(suspended);
  const manuallyPaused = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  suspendedRef.current = suspended;

  useEffect(() => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setUnavailable(true);
      return;
    }

    const synthesis = window.speechSynthesis;
    let disposed = false;
    let index = 0;
    let attemptedPlayback = false;
    let resumeAfterSuspension = suspendedRef.current;
    let current: SpeechSynthesisUtterance | null = null;
    const canPlay = () => !disposed && !suspendedRef.current && !manuallyPaused.current;
    const removeRetryListeners = () => {
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
    };

    function retry(event: Event) {
      if (!canPlay()) return;
      const target = event.target;
      if (target instanceof Element && target.closest('nav[aria-label="Presentation navigation"], a[href], [data-slide-voiceover-control]')) return;
      if (event instanceof KeyboardEvent && ["ArrowRight", "ArrowLeft", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) return;
      start();
    }

    function start() {
      if (!canPlay()) return;
      removeRetryListeners();
      setFailed(false);
      if (current) {
        synthesis.resume();
        setIsPlaying(true);
        return;
      }
      if (index >= chunks.length) return;
      attemptedPlayback = true;
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      const voices = synthesis.getVoices();
      const englishVoices = voices.filter((item) => item.lang === "en-US");
      const voice = ["Samantha", "Alex", "Google US English", "Microsoft Aria", "Microsoft Jenny"]
        .map((name) => englishVoices.find((item) => item.name.includes(name)))
        .find(Boolean)
        ?? englishVoices.find((item) => item.default)
        ?? englishVoices.find((item) => item.localService)
        ?? englishVoices[0]
        ?? voices.find((item) => item.lang.startsWith("en"));
      utterance.lang = "en-US";
      if (voice) utterance.voice = voice;
      current = utterance;
      const isCurrent = () => !disposed && current === utterance;
      utterance.onstart = () => {
        if (!isCurrent()) return;
        if (!canPlay()) synthesis.pause();
        setIsPlaying(canPlay());
      };
      utterance.onend = () => {
        if (!isCurrent()) return;
        current = null;
        index += 1;
        if (index < chunks.length && canPlay()) start();
        else setIsPlaying(false);
      };
      utterance.onerror = (event) => {
        if (!isCurrent()) return;
        current = null;
        setIsPlaying(false);
        if (event.error === "not-allowed") {
          window.addEventListener("pointerdown", retry);
          window.addEventListener("keydown", retry);
        } else {
          setFailed(true);
        }
      };
      // cancel() leaves the global synthesizer paused on some platforms.
      synthesis.resume();
      try {
        synthesis.speak(utterance);
      } catch {
        current = null;
        setIsPlaying(false);
        setFailed(true);
      }
    }

    const controller: SpeechControls = {
      play: () => {
        if (disposed) return;
        manuallyPaused.current = false;
        if (index >= chunks.length) index = 0;
        start();
      },
      pause: () => {
        if (disposed) return;
        manuallyPaused.current = true;
        resumeAfterSuspension = false;
        removeRetryListeners();
        synthesis.pause();
        setIsPlaying(false);
      },
      suspend: (value) => {
        if (disposed) return;
        if (value) {
          resumeAfterSuspension = !manuallyPaused.current && (current !== null || !attemptedPlayback);
          removeRetryListeners();
          synthesis.pause();
          setIsPlaying(false);
        } else if (resumeAfterSuspension && !manuallyPaused.current) {
          resumeAfterSuspension = false;
          start();
        }
      },
    };
    controls.current = controller;
    synthesis.cancel();
    start();

    return () => {
      disposed = true;
      removeRetryListeners();
      if (current) {
        current.onstart = null;
        current.onend = null;
        current.onerror = null;
        current = null;
      }
      if (controls.current === controller) controls.current = null;
      synthesis.cancel();
    };
  }, [chunks]);

  useEffect(() => controls.current?.suspend(suspended), [suspended]);

  const action = failed ? "Retry" : isPlaying ? "Pause" : "Play";
  return (
    <button
      type="button"
      data-slide-voiceover="synthetic"
      data-slide-voiceover-control
      data-slide-id={slideId}
      disabled={unavailable || suspended}
      aria-label={unavailable ? "Voiceover unavailable" : `${action} ${title} voiceover`}
      title={unavailable ? "Voiceover unavailable in this browser" : `${action} voiceover`}
      onClick={() => isPlaying ? controls.current?.pause() : controls.current?.play()}
      className="fixed right-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/65 text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-sm transition-colors hover:border-[#01c7f3]/75 hover:text-[#b9f2ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9beaff] disabled:opacity-40 md:right-8 md:top-8"
    >
      {failed ? <RotateCcw className="h-5 w-5" /> : isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
    </button>
  );
}
