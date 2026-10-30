"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Film, Pause, Play, RotateCcw, X } from "lucide-react";
import { guestSeries, type GuestSeriesId } from "@/lib/guest-series";
import { guestSeriesMedia } from "@/lib/guest-series-media";
import { guestSeriesSourceSlides } from "@/lib/guest-series-source";
import { slideIndex } from "@/lib/viral-fusion-deck";
import credits from "@/public/guest-chapter/credits.json";
import { GuestConceptVisual } from "./guest-concept-visual";
import { GuestStateEvidence } from "./guest-state-evidence";
import { GuestEnergyReactor } from "./guest-energy-reactor";
import styles from "./guest-series-slide.module.css";

type Props = {
  id: GuestSeriesId;
  onContinue: () => void;
  onOpenVideo: (url: string) => void;
  nextLabel?: string;
};

function playable(value?: string): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (
      (["www.youtube-nocookie.com", "www.youtube.com"].includes(url.hostname) && /^\/embed\/[\w-]{11}$/.test(url.pathname)) ||
      (url.hostname === "player.vimeo.com" && /^\/video\/\d+$/.test(url.pathname))
    );
  } catch { return false; }
}

/** A silent, presenter-controlled visual sequence. No narration player is mounted. */
export function GuestSeriesSlide({ id, onContinue, onOpenVideo, nextLabel }: Props) {
  const slide = guestSeries[id];
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [scriptFilter, setScriptFilter] = useState("all");
  const reference = useRef<HTMLDialogElement>(null);
  const mediaDialog = useRef<HTMLDialogElement>(null);
  const scrollArea = useRef<HTMLElement>(null);
  const titleId = useId();
  const scriptTitle = useId();
  const mediaTitle = useId();
  const scene = slide.scenes[sceneIndex];
  const duration = (scene.seconds ?? 12) * 1000;
  const media = guestSeriesMedia[id] ?? [];
  const source = guestSeriesSourceSlides.find((record) => record.id === id);
  const portraits = credits.portraits.filter((portrait) => portrait.guestId === id);
  const activeClip = scene.clip === undefined ? undefined : media[scene.clip];
  const progress = Math.min(100, elapsed / duration * 100);

  useEffect(() => { scrollArea.current?.scrollTo({ top: 0 }); }, [sceneIndex]);

  useEffect(() => {
    if (!isPlaying) return;
    const start = performance.now() - elapsed;
    const timer = window.setInterval(() => {
      const next = performance.now() - start;
      if (next >= duration) {
        if (sceneIndex < slide.scenes.length - 1) { setElapsed(0); setSceneIndex((value) => value + 1); }
        else { setElapsed(duration); setIsPlaying(false); }
      } else setElapsed(next);
    }, 100);
    return () => window.clearInterval(timer);
    // Elapsed is intentionally captured only when a scene or playback state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, sceneIndex, duration, slide.scenes.length]);

  useEffect(() => {
    const pauseOnHide = () => { if (document.hidden) setIsPlaying(false); };
    document.addEventListener("visibilitychange", pauseOnHide);
    return () => document.removeEventListener("visibilitychange", pauseOnHide);
  }, []);

  function selectScene(index: number) {
    setIsPlaying(false);
    setElapsed(0);
    setSceneIndex(index);
  }

  function openReference() {
    setIsPlaying(false);
    reference.current?.showModal();
  }

  function openMedia() {
    setIsPlaying(false);
    mediaDialog.current?.showModal();
  }

  function watch(url: string) {
    setIsPlaying(false);
    mediaDialog.current?.close();
    onOpenVideo(url);
  }

  return (
    <section ref={scrollArea} className={styles.root} aria-labelledby={titleId}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <div className={styles.chapter}><span>{String(slideIndex(id) + 1).padStart(2, "0")}</span><div><p>THE GUEST SERIES</p><h1 id={titleId}>{slide.name}</h1></div></div>
          <p className={styles.layer}>{slide.layer}</p>
        </header>

        <div className={styles.composition} key={`${id}-${sceneIndex}`}>
          <div className={styles.editorial}>
            <p className={styles.sceneLabel}><span>{String(sceneIndex + 1).padStart(2, "0")}</span>{scene.label}</p>
            <h2 className={styles.sceneTitle}>{scene.title}</h2>
            <p className={styles.body}>{scene.body}</p>
            {activeClip && <div className={styles.clipCue}>
              {playable(activeClip.embedUrl) ? <button type="button" onClick={() => watch(activeClip.embedUrl!)}><Play size={15} fill="currentColor" />Watch excerpt</button> : <a href={activeClip.url} target="_blank" rel="noopener noreferrer">Open source<ArrowUpRight size={16} /></a>}
              <span>{activeClip.label}</span>
            </div>}
            <div className={styles.invitation}><span>THE INVITATION</span><p>{slide.invitation}</p></div>
          </div>

          <div className={styles.visual}>
            {scene.feature === "state-precedents" ? <GuestStateEvidence step={Math.min(3, Math.floor(elapsed / duration * 4))} /> : scene.feature === "xe-100" ? <GuestEnergyReactor step={Math.min(4, Math.floor(elapsed / duration * 5))} /> : scene.image ? <figure className={styles.conceptImage}><img src={scene.image} alt={scene.imageAlt || scene.title} width={1672} height={941} /><figcaption>CONCEPT VISUALIZATION</figcaption></figure> : scene.visual ? <GuestConceptVisual kind={scene.visual} step={Math.min(4, Math.floor(elapsed / Math.max(1000, duration / 5)))} /> : <div className={styles.hero} data-portrait={portraits.length > 0 && sceneIndex === 0}>
              {portraits.length > 0 && sceneIndex === 0 && <div className={styles.portraitStage} data-count={portraits.length}>{portraits.map((portrait) => <img key={portrait.asset} src={portrait.asset} alt={portrait.person} width={480} height={540} />)}</div>}
              <div className={styles.heroWords}>{scene.words?.map((word, index) => <p key={word} style={{ animationDelay: `${index * 130}ms` }}>{word}</p>)}</div>
              <span className={styles.heroCredit}>{slide.organization}</span>
            </div>}
            {scene.note && <p className={styles.conceptNote}>{scene.note}</p>}
          </div>
        </div>

        <div className={styles.storyControls} onKeyDown={(event) => event.stopPropagation()}>
          <div className={styles.sceneNavigation} role="group" aria-label="Visual sequence">
            <button type="button" className={styles.playButton} onClick={() => {
              if (!isPlaying && sceneIndex === slide.scenes.length - 1 && elapsed >= duration) { setSceneIndex(0); setElapsed(0); }
              setIsPlaying((value) => !value);
            }} aria-label={isPlaying ? "Pause silent visual sequence" : "Play silent visual sequence"} title="Play visual sequence without narration">{isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}</button>
            <div className={styles.sceneSteps}>{slide.scenes.map((item, index) => <button type="button" key={item.label} onClick={() => selectScene(index)} aria-current={index === sceneIndex ? "step" : undefined} aria-label={`Scene ${index + 1}: ${item.label}`} title={item.label}><span>{index === sceneIndex && <i style={{ width: `${isPlaying || elapsed > 0 ? progress : 100}%` }} />}</span><em>{item.label}</em></button>)}</div>
            <div className={styles.stepButtons}>
              <button type="button" onClick={() => selectScene(Math.max(0, sceneIndex - 1))} disabled={sceneIndex === 0} aria-label="Previous scene"><ChevronLeft size={18} /></button>
              <span>{sceneIndex + 1}/{slide.scenes.length}</span>
              <button type="button" onClick={() => selectScene(Math.min(slide.scenes.length - 1, sceneIndex + 1))} disabled={sceneIndex === slide.scenes.length - 1} aria-label="Next scene"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className={styles.utilities}>
            <button type="button" onClick={() => selectScene(0)} aria-label="Restart visual sequence"><RotateCcw size={14} /><span>Restart</span></button>
            <button type="button" onClick={openMedia}><Film size={15} /><span>Footage &amp; sources</span><small>{media.length}</small></button>
            <button type="button" onClick={openReference}><BookOpen size={15} /><span>Script &amp; direction</span></button>
            <button type="button" className={styles.continue} onClick={onContinue}><span>{sceneIndex === slide.scenes.length - 1 ? nextLabel || "Continue" : id === "michele-chan" ? "Next chapter" : "Next guest"}</span><ArrowRight size={17} /></button>
          </div>
        </div>
      </div>

      <dialog ref={reference} className={styles.dialog} aria-labelledby={scriptTitle} onKeyDown={(event) => event.stopPropagation()}>
        <header><div><p>GUEST SERIES MASTER · SLIDE {slide.number}</p><h2 id={scriptTitle}>{slide.name}</h2></div><button type="button" onClick={() => reference.current?.close()} aria-label="Close script and direction" autoFocus><X size={21} /></button></header>
        <div className={styles.referenceTools}><label>Show<select value={scriptFilter} onChange={(event) => setScriptFilter(event.target.value)}><option value="all">Complete source</option><option value="script">Conversation script</option><option value="editor">Production cues and reference</option></select></label><span>21 October 2026 · Script text only</span></div>
        <div className={styles.referenceBody}>
          {source?.paragraphs.filter((paragraph) => paragraph.text && (scriptFilter === "all" || (scriptFilter === "script" ? ["narrator", "george"].includes(paragraph.kind) : !["narrator", "george"].includes(paragraph.kind)))).map((paragraph) => <p key={paragraph.sourceParagraph} data-kind={paragraph.kind}>{paragraph.text}</p>)}
        </div>
      </dialog>

      <dialog ref={mediaDialog} className={styles.dialog} aria-labelledby={mediaTitle} onKeyDown={(event) => event.stopPropagation()}>
        <header><div><p>FOOTAGE &amp; SOURCE MATERIAL</p><h2 id={mediaTitle}>{slide.name}</h2></div><button type="button" onClick={() => mediaDialog.current?.close()} aria-label="Close footage and sources" autoFocus><X size={21} /></button></header>
        <div className={styles.mediaBody}>
          {media.length === 0 && <p className={styles.emptyMedia}>The production master calls for authentic footage. No playable source was supplied for this guest. The visual sequence remains available.</p>}
          {media.map((item, index) => <article className={styles.mediaItem} key={`${item.label}-${index}`}><span className={styles.mediaIndex}>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.label}</h3><p>{item.note}</p><div className={styles.mediaActions}>{playable(item.embedUrl) && <button type="button" onClick={() => watch(item.embedUrl!)}><Play size={13} fill="currentColor" />Watch excerpt</button>}<a href={item.url} target="_blank" rel="noopener noreferrer">Open full source<ArrowUpRight size={14} /></a></div></div></article>)}
          {portraits.length > 0 && <div className={styles.photoCredits}><h3>Photography</h3>{portraits.map((portrait) => <p key={portrait.asset}><a href={portrait.sourceUrl} target="_blank" rel="noopener noreferrer">{portrait.person}: {portrait.credit}<ArrowUpRight size={12} /></a><span>{portrait.license} {portrait.changes}</span></p>)}</div>}
          {slide.scenes.some((item) => item.image) && <div className={styles.photoCredits}><h3>Concept artwork</h3><p><a href="/guest-series/credits.json" target="_blank" rel="noopener noreferrer">AI-generated concept artwork and prompts<ArrowUpRight size={12} /></a><span>Illustrative production and engineering concepts. Authentic footage is listed separately above.</span></p></div>}
        </div>
      </dialog>
    </section>
  );
}
