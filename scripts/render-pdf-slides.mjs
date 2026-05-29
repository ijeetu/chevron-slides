import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
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
const outputDpi = "150";
const outputQuality = "85";
const rendererName = `pdftoppm ${outputDpi}dpi -> cwebp q${outputQuality}`;

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
  const existingManifest = await readManifest();

  // Check manifest before invoking any binaries — git doesn't preserve mtime,
  // so we use file size as the cache key instead.
  if (
    existingManifest &&
    existingManifest.sourceSize === pdfStat.size &&
    existingManifest.renderer === rendererName &&
    Array.isArray(existingManifest.slides) &&
    existingManifest.slides.length > 0 &&
    (await hasAllSlides(existingManifest.slides))
  ) {
    console.log("Slides are up to date.");
    return;
  }

  const pageCount = await getPdfPageCount();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "viral-fusion-slides-"));
  const tempPrefix = path.join(tempDir, "slide");

  try {
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
      tempPrefix,
    ]);

    const generatedFiles = (await fs.readdir(tempDir))
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
      const sourcePath = path.join(tempDir, fileName);
      const targetFileName = `slide-${String(index + 1).padStart(2, "0")}.webp`;
      const targetPath = path.join(outputDir, targetFileName);

      await execFileAsync("cwebp", [
        "-quiet",
        "-q",
        outputQuality,
        sourcePath,
        "-o",
        targetPath,
      ]);

      slides.push(`viral-fusion-slides/${targetFileName}`);
      console.log(`Rendered ${targetFileName}`);
    }

    const manifest = {
      sourceFile: "Viral Fusion.pdf",
      sourceSize: pdfStat.size,
      pageCount: slides.length,
      slides,
      renderer: rendererName,
    };

    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

renderSlides().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
