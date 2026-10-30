import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const filename = "VF_Presentation_1-33_Master_Color_Coded_for_Jeetu (1).docx";
const ids = ["tulsi-intro", "anniversary", "children", "protect-children", "agenda", "problems", "beneath-noise", "competition", "long-game", "technological-power", "networks", "global-incentives", "what-we-learned", "five-pillars", "inspiration", "founder", "operating-system", "viral-fusion", "mission-vision", "solving", "republic", "civic-os", "physical-infrastructure", "strategic-alliance", "blueprint", "what-if", "podcast-strategy"];
const xml = execFileSync("unzip", ["-p", path.join(root, filename), "word/document.xml"], { encoding: "utf8", maxBuffer: 20_000_000 });
const decode = (text) => text.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/gi, (entity) => {
  const named = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
  return named[entity] ?? String.fromCodePoint(parseInt(entity.slice(entity[2] === "x" ? 3 : 2, -1), entity[2] === "x" ? 16 : 10));
});

// Read-only extraction: the Word source and its colors/highlights stay intact.
// Keep repeated headings (22 and 24) in their original source section. The
// embedded SLIDE 28 transition belongs to 27, rather than starting a guest import.
const slides = [];
let destination;
for (const [index, match] of [...xml.matchAll(/<w:p(?:\s[^>]*)?>[\s\S]*?<\/w:p>/g)].entries()) {
  const paragraph = match[0];
  const text = [...paragraph.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\s*\/>|<w:(?:br|cr)\b[^>]*\/>/g)]
    .map((token) => token[1] !== undefined ? decode(token[1]) : token[0].startsWith("<w:tab") ? "\t" : "\n").join("");
  const heading = text.trim().match(/^SLIDE\s*(\d+)(?:\s|[—–-]|$)/i);
  const number = heading ? Number(heading[1]) : null;
  if (number === slides.length + 1 && number <= 27) {
    destination = { sourceSlide: number, id: ids[number - 1], heading: text.trim(), paragraphs: [] };
    slides.push(destination);
  }
  if (!destination) continue;
  const color = paragraph.match(/<w:color[^>]*w:val="([^"]+)"/)?.[1];
  const kind = heading && number === destination.sourceSlide ? "heading"
    : color === "007175" || /^\s*(?:\[?EDITOR|Editor:|Question:|Remove:|Replace:|With:|Do not sho|Add:|Maybe a chart|Lets remove)/.test(text) ? "editor"
    : color === "85222D" ? "george"
    : color === "1E4383" ? "narrator"
    : color === "966914" ? "on-screen" : "body";
  destination.paragraphs.push({ text, kind, revised: /<w:highlight[^>]*w:val="green"/.test(paragraph), sourceParagraph: index + 1 });
}
if (slides.length !== 27) throw new Error(`Expected 27 opening slides, found ${slides.length}`);
const output = `/** Read-only source extraction. Regenerate with node scripts/import-opening-source.mjs. */\nexport type OpeningParagraph = { text: string; kind: string; revised: boolean; sourceParagraph: number };\nexport type OpeningSourceSlide = { sourceSlide: number; id: string; heading: string; paragraphs: OpeningParagraph[] };\nexport const openingSourceDocument = ${JSON.stringify(filename)};\nexport const openingSourceSlides: OpeningSourceSlide[] = ${JSON.stringify(slides, null, 2)};\n`;
const outputPath = path.join(root, "lib/opening-chapter-source.ts");
if (process.argv.includes("--check")) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== output) throw new Error("Opening script differs from the supplied Word master");
  console.log("Opening script matches all 27 source sections.");
} else {
  fs.writeFileSync(outputPath, output);
  console.log(`Imported ${slides.length} opening sections.`);
}
