"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { BackButton } from "@/components/back-button";
import {
  floatingControlButtonClass,
  floatingControlMetaClass,
  floatingControlSurfaceClass,
} from "@/components/floating-controls";

type PdfSlideViewerProps = {
  file: string;
  slides: string[];
  title: string;
  backHref?: string;
  backLabel?: string;
  continueHref?: string;
  continueLabel?: string;
};

function clamp(page: number, total: number) {
  return Math.max(1, Math.min(page, total || 1));
}

function parseHash() {
  if (typeof window === "undefined") return 1;
  const match = window.location.hash.match(/page-(\d+)/);
  return match ? Math.max(1, Number(match[1])) : 1;
}

function isVideoSlide(slideSrc: string) {
  return /\.(mp4|webm|mov)(?:\?.*)?$/i.test(slideSrc);
}

export function PdfSlideViewer({
  file,
  slides,
  title,
  backHref = "/",
  backLabel = "Back",
  continueHref,
  continueLabel,
}: PdfSlideViewerProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const totalPages = slides.length;

  const goToPage = useCallback(
    (nextPage: number) => {
      if (!totalPages) return;
      setPageNumber(clamp(nextPage, totalPages));
    },
    [totalPages],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setPageNumber(clamp(parseHash(), totalPages));

    function handleHashChange() {
      setPageNumber(clamp(parseHash(), totalPages));
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [totalPages]);

  useEffect(() => {
    if (!totalPages) return;
    window.history.replaceState(null, "", `#page-${pageNumber}`);
    setIsLoading(true);
    setError("");
  }, [pageNumber, totalPages]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goToPage(pageNumber + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPage(pageNumber - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPage, pageNumber]);

  useEffect(() => {
    if (!totalPages) {
      setIsLoading(false);
      setError("Slide images are not available yet.");
    }
  }, [totalPages]);

  useEffect(() => {
    [pageNumber - 1, pageNumber + 1].forEach((targetPage) => {
      const slideSrc = slides[targetPage - 1];
      if (!slideSrc || isVideoSlide(slideSrc)) return;

      const image = new window.Image();
      image.src = slideSrc;
    });
  }, [pageNumber, slides]);

  const activeSlide = useMemo(() => slides[pageNumber - 1] ?? "", [pageNumber, slides]);
  const activeSlideIsVideo = isVideoSlide(activeSlide);

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-y-0 left-[6%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,22,28,0.18),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden px-5 py-5 md:px-8 md:py-6">
        <header className="relative flex items-center justify-end text-graphite">
          <BackButton fallbackHref={backHref} label={backLabel} />

          <div className="pointer-events-none absolute left-1/2 min-w-0 -translate-x-1/2 text-center">
            <p className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-mist">
              {title}
            </p>
          </div>

          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/75 transition-colors hover:bg-white"
            aria-label="Open PDF in new tab"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={2.1} />
          </a>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center py-2 md:py-3">
          <div className="flex h-full min-h-0 w-full items-center justify-center">
            <div className="relative flex h-full w-full items-center justify-center">
              {activeSlide && activeSlideIsVideo ? (
                <video
                  key={activeSlide}
                  src={activeSlide}
                  className="max-h-full max-w-full rounded-[1rem] bg-black shadow-[0_28px_70px_rgba(17,22,28,0.18)]"
                  autoPlay
                  muted
                  playsInline
                  controls
                  onLoadedData={() => {
                    setIsLoading(false);
                    setError("");
                  }}
                  onError={() => {
                    setIsLoading(false);
                    setError("Could not load the slide video.");
                  }}
                />
              ) : activeSlide ? (
                <img
                  key={activeSlide}
                  src={activeSlide}
                  alt={`${title} slide ${pageNumber}`}
                  className="max-h-full max-w-full rounded-[1rem] bg-white shadow-[0_28px_70px_rgba(17,22,28,0.18)]"
                  onLoad={() => {
                    setIsLoading(false);
                    setError("");
                  }}
                  onError={() => {
                    setIsLoading(false);
                    setError("Could not load the slide image.");
                  }}
                  draggable={false}
                />
              ) : null}

              {isLoading || error ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-[1.4rem] border border-white/70 bg-white/88 px-6 py-5 text-center shadow-deck backdrop-blur">
                    {error ? (
                      <p className="text-sm font-medium text-[#a74343]">{error}</p>
                    ) : (
                      <div className="flex items-center gap-3 text-sm font-medium text-graphite">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading deck
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {error ? (
          <div className="mx-auto -mt-2 text-center text-sm text-graphite">
            <a
              href={file}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink underline underline-offset-4"
            >
              Open the PDF directly
            </a>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
        {continueHref && continueLabel && totalPages > 0 && pageNumber === totalPages ? (
          <Link
            href={continueHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-deck transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
          >
            <span>{continueLabel}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}

        <nav className={floatingControlSurfaceClass} aria-label="PDF slide navigation">
          <button
            type="button"
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className={floatingControlButtonClass}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className={floatingControlMetaClass}>
            {String(pageNumber).padStart(2, "0")} /{" "}
            {totalPages ? String(totalPages).padStart(2, "0") : "--"}
          </div>

          <button
            type="button"
            onClick={() => goToPage(pageNumber + 1)}
            disabled={!totalPages || pageNumber >= totalPages}
            className={floatingControlButtonClass}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </section>
  );
}
