import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import type { Metadata } from "next";

import { PdfSlideViewer } from "@/components/pdf-slide-viewer";

export const dynamic = "force-dynamic";
const expectedRenderer = "pdftoppm 150dpi -> cwebp q85";

export const metadata: Metadata = {
  title: "Viral Fusion Main Deck",
  description: "Main Viral Fusion PDF deck.",
};

const execFileAsync = promisify(execFile);

async function ensureSlidesAreFresh() {
  const publicDir = path.join(process.cwd(), "public");
  const pdfFile = path.join(publicDir, "Viral Fusion.pdf");
  const manifestPath = path.join(publicDir, "viral-fusion-slides", "manifest.json");
  const pdfStat = await fs.stat(pdfFile);

  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    const manifest = JSON.parse(raw) as {
      sourceSize?: number;
      slides?: string[];
      renderer?: string;
    };

    if (
      manifest.sourceSize === pdfStat.size &&
      Array.isArray(manifest.slides) &&
      manifest.slides.length > 0 &&
      manifest.renderer === expectedRenderer &&
      manifest.slides.every((slide) => slide.endsWith(".webp"))
    ) {
      return;
    }
  } catch {
    // Fall through and attempt regeneration below.
  }

  try {
    await execFileAsync("node", ["scripts/render-pdf-slides.mjs"], {
      cwd: process.cwd(),
    });
  } catch {
    // Regeneration tools (pdftoppm/pdfinfo) may not be available in production.
    // The page will still serve any pre-rendered slides that already exist.
  }
}

async function getSlides() {
  await ensureSlidesAreFresh();

  const manifestPath = path.join(
    process.cwd(),
    "public",
    "viral-fusion-slides",
    "manifest.json",
  );
  const raw = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(raw) as { slides?: string[] };

  return Array.isArray(manifest.slides)
    ? manifest.slides.map((slide) => `/${slide}`)
    : [];
}

export default async function MainDeckPage() {
  const slides = await getSlides();

  return (
    <PdfSlideViewer
      file="/Viral%20Fusion.pdf"
      slides={slides}
      title="Viral Fusion Deck"
      backHref="/presentation/main-deck"
      backLabel="Vision Intro"
      continueHref="/presentation/global-opportunities"
      continueLabel="Global Opportunities"
    />
  );
}
