"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { openingSourceDocument, openingSourceSlides } from "@/lib/opening-chapter-source";

const earlierRecordings: Record<string, string> = {
  anniversary: "/voices/george/slide02.mp3", agenda: "/voices/george/slide05.mp3",
  problems: "/voices/george/slide06-george-1.mp3", "beneath-noise": "/voices/george/slide07.mp3",
  competition: "/voices/george/slide08.mp3", "long-game": "/voices/george/slide09.mp3",
  "technological-power": "/voices/george/slide10.mp3", networks: "/voices/george/slide11.mp3",
  "what-we-learned": "/voices/george/slide13.mp3", "five-pillars": "/voices/george/slide14.mp3",
  founder: "/voices/george/slide24.mp3", solving: "/voices/george/slide28.mp3",
  republic: "/voices/george/slide29.mp3", "civic-os": "/voices/george/slide30.mp3",
  "physical-infrastructure": "/voices/george/slide31.mp3", "strategic-alliance": "/voices/george/slide32.mp3",
  blueprint: "/voices/george/slide33.mp3",
};

export function OpeningScriptPanel({ slideId }: { slideId: string }) {
  const source = openingSourceSlides.find((slide) => slide.id === slideId);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [revisionsOnly, setRevisionsOnly] = useState(false);

  useEffect(() => () => {
    window.dispatchEvent(new CustomEvent("opening-script-visibility", { detail: { open: false } }));
  }, []);

  if (!source) return null;
  const close = () => dialog.current?.close();
  const onClose = () => {
    dialog.current?.querySelectorAll("audio").forEach((media) => media.pause());
    window.dispatchEvent(new CustomEvent("opening-script-visibility", { detail: { open: false } }));
  };
  return <>
    <button type="button" onClick={() => {
      dialog.current?.showModal();
      window.dispatchEvent(new CustomEvent("opening-script-visibility", { detail: { open: true } }));
      document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => media.pause());
    }} aria-label="Read production script" className="fixed left-4 top-4 z-30 flex h-10 items-center gap-2 rounded-full border border-[#9beaff]/30 bg-[#081521]/90 px-3 text-xs text-[#d8f5ff] backdrop-blur-md hover:border-[#9beaff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9beaff] sm:left-6 sm:top-6">
      <BookOpen size={15} /><span className="hidden sm:inline">Production script</span>
    </button>
    <dialog ref={dialog} aria-labelledby={titleId} onKeyDown={(event) => event.stopPropagation()} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) close(); }} className="m-auto max-h-[88dvh] w-[min(52rem,94vw)] overflow-hidden rounded-2xl border border-[#9beaff]/30 bg-[#0c1b29] p-0 text-[#eaf3f6] shadow-2xl backdrop:bg-black/75">
      <header className="flex items-start justify-between gap-4 border-b border-white/15 p-5 sm:px-7">
        <div><p className="text-[.65rem] uppercase tracking-widest text-[#9beaff]">Production master · Slide {source.sourceSlide}</p><h2 id={titleId} className="mt-2 font-display text-xl sm:text-2xl">{source.heading}</h2></div>
        <button type="button" autoFocus onClick={close} aria-label="Close production script" className="rounded-full p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9beaff]"><X size={20} /></button>
      </header>
      <div className="max-h-[65dvh] overflow-y-auto p-5 sm:px-7">
        <p className="mb-4 break-words text-xs leading-5 text-[#a8bbc7]">{openingSourceDocument}</p>
        {earlierRecordings[slideId] && <div className="mb-6 border-b border-white/15 pb-5"><p className="mb-2 text-sm text-[#c0d3df]">Earlier recording · reference only</p><p className="mb-3 text-xs leading-5 text-[#a8bbc7]">This recording may differ from the revised script below.</p><audio controls preload="none" src={earlierRecordings[slideId]} aria-label="Earlier voiceover recording" className="h-10 w-full" /></div>}
        {slideId === "republic" && <p className="mb-6 border-l-2 border-[#99d8a8] pl-3 text-sm leading-6 text-[#e0e9ef]">Revised closing voiceover: A stronger Republic—powered by proof, voice, and action.</p>}
        <label className="mb-6 flex cursor-pointer items-center gap-3 text-sm text-[#d9e6eb]"><input type="checkbox" checked={revisionsOnly} onChange={(event) => setRevisionsOnly(event.target.checked)} className="accent-[#9beaff]" />Show green-highlighted revisions only</label>
        <div className="space-y-3">{source.paragraphs.filter((p) => p.text.trim() && !/^\d+$/.test(p.text.trim()) && (!revisionsOnly || p.revised)).map((p) => <p key={p.sourceParagraph} data-kind={p.kind} className={`whitespace-pre-wrap break-words text-[.94rem] leading-7 ${p.kind === "editor" ? "text-[#99d8d2]" : p.kind === "heading" ? "font-semibold text-white" : p.kind === "on-screen" ? "text-[#eed29c]" : "text-[#e0e9ef]"} ${p.revised ? "border-l-2 border-[#99d8a8] bg-[#99d8a8]/10 py-1 pl-3" : ""}`}>{p.text}</p>)}</div>
        {revisionsOnly && !source.paragraphs.some((p) => p.revised) && <p className="text-sm text-[#a8bbc7]">No green-highlighted revisions in this section.</p>}
      </div>
    </dialog>
  </>;
}
