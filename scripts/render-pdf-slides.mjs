import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const pdfPath = path.join(projectRoot, "public", "Viral Fusion.pdf");
const outputDir = path.join(projectRoot, "public", "viral-fusion-slides");
const manifestPath = path.join(outputDir, "manifest.json");
const outputPrefix = path.join(outputDir, "slide");
const outputDpi = "300";
const rendererName = `pdftoppm ${outputDpi}dpi`;

async function getPdfPageCount() {
  const { stdout } = await execFileAsync("pdfinfo", [pdfPath]);
  const match = stdout.match(/^Pages:\s+(\d+)/m);

  if (!match) {
    throw new Error("Could not determine PDF page count.");
  }

  return Number.parseInt(match[1], 10);
}

async function readManifest() {
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function hasAllSlides(slides) {
  const checks = await Promise.all(
    slides.map(async (slidePath) => {
      try {
        await fs.access(path.join(projectRoot, "public", slidePath));
        return true;
      } catch {
        return false;
      }
    }),
  );

  return checks.every(Boolean);
}

async function clearRenderedSlides() {
  await fs.mkdir(outputDir, { recursive: true });
  const entries = await fs.readdir(outputDir, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => fs.unlink(path.join(outputDir, entry.name))),
  );
}

async function renderSlides() {
  const pdfStat = await fs.stat(pdfPath);
  const pageCount = await getPdfPageCount();
  const existingManifest = await readManifest();

  if (
    existingManifest &&
    existingManifest.sourceMtimeMs === pdfStat.mtimeMs &&
    existingManifest.sourceSize === pdfStat.size &&
    existingManifest.renderer === rendererName &&
    existingManifest.pageCount === pageCount &&
    Array.isArray(existingManifest.slides) &&
    (await hasAllSlides(existingManifest.slides))
  ) {
    console.log("Slides are up to date.");
    return;
  }

  await clearRenderedSlides();

  await execFileAsync("pdftoppm", [
    "-png",
    "-r",
    outputDpi,
    "-f",
    "1",
    "-l",
    String(pageCount),
    pdfPath,
    outputPrefix,
  ]);

  const generatedFiles = (await fs.readdir(outputDir))
    .filter((fileName) => /^slide-\d+\.png$/.test(fileName))
    .sort((left, right) => {
      const leftNumber = Number.parseInt(left.match(/\d+/)?.[0] ?? "0", 10);
      const rightNumber = Number.parseInt(right.match(/\d+/)?.[0] ?? "0", 10);
      return leftNumber - rightNumber;
    });

  const slides = [];

  if (generatedFiles.length !== pageCount) {
    throw new Error(
      `Expected ${pageCount} rendered slides, got ${generatedFiles.length}.`,
    );
  }

  for (const [index, fileName] of generatedFiles.entries()) {
    const targetFileName = `slide-${String(index + 1).padStart(2, "0")}.png`;

    if (fileName !== targetFileName) {
      await fs.rename(
        path.join(outputDir, fileName),
        path.join(outputDir, targetFileName),
      );
    }

    slides.push(`viral-fusion-slides/${targetFileName}`);
    console.log(`Rendered ${targetFileName}`);
  }

  const manifest = {
    sourceFile: "Viral Fusion.pdf",
    sourceMtimeMs: pdfStat.mtimeMs,
    sourceSize: pdfStat.size,
    pageCount: slides.length,
    slides,
    renderer: rendererName,
  };

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

renderSlides().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
