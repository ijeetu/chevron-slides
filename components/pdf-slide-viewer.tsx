"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
} from "lucide-react";
import type {
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist/types/src/display/api";

type PdfSlideViewerProps = {
  file: string;
  title: string;
};

const MAX_RENDER_PIXEL_RATIO = 1.5;

function clamp(page: number, total: number) {
  return Math.max(1, Math.min(page, total || 1));
}

function parseHash() {
  if (typeof window === "undefined") return 1;
  const match = window.location.hash.match(/page-(\d+)/);
  return match ? Math.max(1, Number(match[1])) : 1;
}

export function PdfSlideViewer({ file, title }: PdfSlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pageCacheRef = useRef<Map<number, Promise<PDFPageProxy>>>(new Map());
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const goToPage = useCallback(
    (nextPage: number) => {
      if (!totalPages) return;
      setPageNumber(clamp(nextPage, totalPages));
    },
    [totalPages],
  );

  const getPdfPage = useCallback(
    (targetPage: number) => {
      if (!pdf) return null;
      const safePage = clamp(targetPage, pdf.numPages);
      const cachedPage = pageCacheRef.current.get(safePage);

      if (cachedPage) {
        return cachedPage;
      }

      const pagePromise = pdf.getPage(safePage);
      pageCacheRef.current.set(safePage, pagePromise);
      return pagePromise;
    },
    [pdf],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let loadedPdf: PDFDocumentProxy | null = null;

    async function loadPdf() {
      try {
        setIsLoading(true);
        setError("");
        const pdfjs = await import("pdfjs-dist");

        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.mjs",
          import.meta.url,
        ).toString();

        const documentTask = pdfjs.getDocument(file);
        loadedPdf = await documentTask.promise;

        if (cancelled) {
          await loadedPdf.destroy();
          return;
        }

        setPdf(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        pageCacheRef.current.clear();
        setPageNumber(clamp(parseHash(), loadedPdf.numPages));
      } catch {
        setError("Could not load the PDF.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      if (loadedPdf) {
        void loadedPdf.destroy();
      }
    };
  }, [file]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setFrameSize({ width, height });
    });

    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pdf || !canvasRef.current || !frameSize.width || !frameSize.height) {
      return;
    }

    let cancelled = false;
    let renderTask: RenderTask | null = null;
    const currentGetPdfPage = getPdfPage;

    async function renderPage() {
      const page = await currentGetPdfPage(pageNumber);
      if (!page) return;
      if (cancelled || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const scale = Math.min(
        frameSize.width / baseViewport.width,
        frameSize.height / baseViewport.height,
      );
      const outputScale = Math.min(
        window.devicePixelRatio || 1,
        MAX_RENDER_PIXEL_RATIO,
      );
      const viewport = page.getViewport({ scale: scale * outputScale });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / outputScale)}px`;
      canvas.style.height = `${Math.floor(viewport.height / outputScale)}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      renderTask = page.render({ canvas, viewport });
      await renderTask.promise;
    }

    renderPage().catch((renderError) => {
      if (!cancelled && renderError instanceof Error && renderError.name !== "RenderingCancelledException") {
        setError("Could not render this page.");
      }
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [frameSize, getPdfPage, pageNumber, pdf]);

  useEffect(() => {
    if (!pdf || !totalPages) return;

    [pageNumber + 1, pageNumber - 1, pageNumber + 2].forEach((targetPage) => {
      if (targetPage >= 1 && targetPage <= totalPages) {
        void getPdfPage(targetPage);
      }
    });
  }, [getPdfPage, pageNumber, pdf, totalPages]);

  useEffect(() => {
    if (!totalPages) return;
    window.history.replaceState(null, "", `#page-${pageNumber}`);
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

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-y-0 left-[6%] w-px bg-[linear-gradient(180deg,transparent,rgba(17,22,28,0.18),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]" />

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden px-5 py-5 md:px-8 md:py-6">
        <header className="flex items-center justify-between gap-4 text-graphite">
          <Link
            href="/presentation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/75 transition-colors hover:bg-white"
            aria-label="Back to presentation options"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.1} />
          </Link>

          <div className="min-w-0 text-center">
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
          <div
            ref={frameRef}
            className="flex h-full min-h-0 w-full items-center justify-center"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-h-full max-w-full rounded-[1rem] bg-white shadow-[0_28px_70px_rgba(17,22,28,0.18)]"
                />

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
        </div>

        <nav className="mx-auto flex items-center gap-3 rounded-full border border-white/70 bg-white/76 p-2 shadow-deck backdrop-blur">
          <button
            type="button"
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:bg-panel disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-24 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-graphite">
            {pageNumber} / {totalPages || "-"}
          </div>

          <button
            type="button"
            onClick={() => goToPage(pageNumber + 1)}
            disabled={!totalPages || pageNumber >= totalPages}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:bg-panel disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </section>
  );
}
