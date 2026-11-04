"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { SyntheticSlideVoiceover } from "@/components/synthetic-slide-voiceover";
import { slideVoiceovers } from "@/lib/slide-voiceovers";
import type { ViralFusionSlideId } from "@/lib/viral-fusion-deck";

type Props = {
  slideId: ViralFusionSlideId;
  title: string;
  suspended: boolean;
};

type PlaybackController = {
  play: () => void;
  pause: () => void;
  suspend: () => void;
  resume: () => void;
};

function RecordedSlideVoiceover({ slideId, title, suspended }: Props) {
  const tracks = slideVoiceovers[slideId]!;
  const audioRef = useRef<HTMLAudioElement>(null);
  const controllerRef = useRef<PlaybackController | null>(null);
  const suspendedRef = useRef(suspended);
  const previouslySuspendedRef = useRef(suspended);
  const wantsPlaybackRef = useRef(true);
  const resumeAfterSuspensionRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Gesture and promise callbacks must see a newly opened video immediately.
  suspendedRef.current = suspended;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let disposed = false;
    let requestId = 0;
    let pendingPlay = false;
    let hasRetriedGesture = false;

    const removeGestureRetry = () => {
      window.removeEventListener("pointerdown", retryFromGesture);
      window.removeEventListener("keydown", retryFromGesture);
    };

    const startPlayback = (manual = false) => {
      if (disposed || suspendedRef.current) return;
      removeGestureRetry();
      if (manual) hasRetriedGesture = true;
      wantsPlaybackRef.current = true;
      const currentRequest = ++requestId;
      pendingPlay = true;
      setIsBlocked(false);
      setHasError(false);

      const handleFailure = (error: unknown) => {
        if (disposed || currentRequest !== requestId) return;
        pendingPlay = false;
        setIsPlaying(false);
        const name = error instanceof Error ? error.name : "";
        if (name === "AbortError") return;
        if (name === "NotAllowedError") {
          setIsBlocked(true);
          if (!hasRetriedGesture && !suspendedRef.current) {
            window.addEventListener("pointerdown", retryFromGesture);
            window.addEventListener("keydown", retryFromGesture);
          }
        } else {
          wantsPlaybackRef.current = false;
          setHasError(true);
        }
      };

      try {
        void audio.play().then(() => {
          if (disposed || currentRequest !== requestId) {
            // A later, valid request on this same element may already be playing.
            if (!audio.isConnected || suspendedRef.current || !wantsPlaybackRef.current) audio.pause();
            return;
          }
          pendingPlay = false;
          setIsPlaying(!audio.paused);
        }, handleFailure);
      } catch (error) {
        handleFailure(error);
      }
    };

    function retryFromGesture(event: Event) {
      if (disposed || suspendedRef.current || !wantsPlaybackRef.current) return;
      // The button's click handler owns its gesture, avoiding a play/pause toggle.
      if (event.target instanceof Element && event.target.closest("[data-slide-voiceover-control]")) return;
      removeGestureRetry();
      hasRetriedGesture = true;
      startPlayback();
    }

    const stopPlayback = () => {
      ++requestId;
      pendingPlay = false;
      removeGestureRetry();
      audio.pause();
      setIsPlaying(false);
    };

    const controller: PlaybackController = {
      play: () => {
        if (audio.ended) audio.currentTime = 0;
        if (audio.error) audio.load();
        startPlayback(true);
      },
      pause: () => {
        wantsPlaybackRef.current = false;
        resumeAfterSuspensionRef.current = false;
        stopPlayback();
      },
      suspend: () => {
        resumeAfterSuspensionRef.current = wantsPlaybackRef.current && (!audio.paused || pendingPlay);
        stopPlayback();
      },
      resume: () => {
        const shouldResume = resumeAfterSuspensionRef.current && wantsPlaybackRef.current;
        resumeAfterSuspensionRef.current = false;
        if (shouldResume) startPlayback();
      },
    };
    controllerRef.current = controller;

    const onPlay = () => {
      if (disposed || suspendedRef.current || !wantsPlaybackRef.current) {
        audio.pause();
        return;
      }
      setIsPlaying(true);
      setIsBlocked(false);
      setHasError(false);
    };
    const onPause = () => { if (!disposed) setIsPlaying(false); };
    const onEnded = () => {
      if (disposed || suspendedRef.current || !wantsPlaybackRef.current) return;
      removeGestureRetry();
      setIsPlaying(false);
      if (trackIndex + 1 < tracks.length) {
        setTrackIndex(trackIndex + 1);
      } else {
        wantsPlaybackRef.current = false;
      }
    };
    const onError = () => {
      if (disposed) return;
      wantsPlaybackRef.current = false;
      stopPlayback();
      setIsBlocked(false);
      setHasError(true);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    if (!suspendedRef.current && wantsPlaybackRef.current) startPlayback();

    return () => {
      disposed = true;
      ++requestId;
      removeGestureRetry();
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [slideId, trackIndex, tracks]);

  useEffect(() => {
    if (suspended && !previouslySuspendedRef.current) controllerRef.current?.suspend();
    if (!suspended && previouslySuspendedRef.current) controllerRef.current?.resume();
    previouslySuspendedRef.current = suspended;
  }, [suspended]);

  const action = isPlaying ? "Pause" : hasError ? "Retry" : "Play";
  return <>
    <audio ref={audioRef} src={tracks[trackIndex]} preload="auto" data-slide-voiceover data-slide-id={slideId} data-track-index={trackIndex} />
    <button
      type="button"
      data-slide-voiceover-control
      aria-label={`${action} ${title} voiceover`}
      title={hasError ? "Voiceover unavailable. Retry playback." : `${action} voiceover`}
      disabled={suspended}
      onClick={() => isPlaying ? controllerRef.current?.pause() : controllerRef.current?.play()}
      className="fixed right-6 top-6 z-30 flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/65 px-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-sm hover:border-[#9beaff]/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9beaff] disabled:opacity-50 md:right-8 md:top-8"
    >
      {isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
      {(isBlocked || hasError) && <span>{hasError ? "Retry voiceover" : "Play voiceover"}</span>}
    </button>
  </>;
}

export function SlideVoiceover(props: Props) {
  return slideVoiceovers[props.slideId]?.length
    ? <RecordedSlideVoiceover {...props} />
    : <SyntheticSlideVoiceover {...props} />;
}
