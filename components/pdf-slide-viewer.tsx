"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
} from "lucide-react";

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

export function PdfSlideViewer({
  file,
  slides,
  title,
  backHref = "/",
  backLabel = "Home",
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
      if (!slideSrc) return;

      const image = new window.Image();
      image.src = slideSrc;
    });
  }, [pageNumber, slides]);

  const activeSlide = useMemo(() => slides[pageNumber - 1] ?? "", [pageNumber, slides]);

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-y-0 left-[6%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,22,28,0.18),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden px-5 py-5 md:px-8 md:py-6">
        <header className="relative flex items-center justify-end text-graphite">
          <Link
            href={backHref}
            className="fixed left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/78 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-graphite shadow-deck backdrop-blur-sm transition-colors hover:bg-white md:left-8 md:top-8"
            aria-label={`Back to ${backLabel.toLowerCase()}`}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.1} />
            <span>{backLabel}</span>
          </Link>

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

        <div className="flex min-h-0 flex-1 items-center justify-center py-4 md:py-5">
          <div className="flex h-full min-h-0 w-full items-center justify-center">
            <div className="relative flex h-full w-full items-center justify-center">
              {activeSlide ? (
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

        <div className="mx-auto flex flex-col items-center gap-4">
          <nav className="flex items-center gap-2 rounded-full border border-white/70 bg-white/76 p-1.5 shadow-deck backdrop-blur">
            <button
              type="button"
              onClick={() => goToPage(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:bg-panel disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="min-w-20 text-center text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-graphite">
              {pageNumber} / {totalPages || "-"}
            </div>

            <button
              type="button"
              onClick={() => goToPage(pageNumber + 1)}
              disabled={!totalPages || pageNumber >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:bg-panel disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>

          {continueHref && continueLabel && totalPages > 0 && pageNumber === totalPages ? (
            <Link
              href={continueHref}
              className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/82 px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-ink shadow-deck backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <span>Continue</span>
              <span className="text-graphite">{continueLabel}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
