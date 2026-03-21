import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Chevron Strategic Briefing Summary",
  description: "Executive summary slide deck generated from summaryslides.md",
};

export default function SummaryPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "summaryslides.md"), "utf8");
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} />;
}
