import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Chevron Strategy Map",
  description: "Strategic alliance map deck generated from strategymap.md",
};

export default function StrategyMapPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "strategymap.md"), "utf8");
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} />;
}
