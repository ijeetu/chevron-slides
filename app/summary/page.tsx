import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Special Projects Initiative Recap | Viral Fusion",
  description:
    "A recap of Viral Fusion’s Special Projects Initiative, strategic alliances, and path toward lasting outcomes for California.",
};

export default function SummaryPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "summaryslides.md"), "utf8");
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} backHref="/#decks" preferHistoryBack={false} />;
}
