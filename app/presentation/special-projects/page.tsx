import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Special Projects Initiative",
  description: "Special projects initiative presentation.",
};

export default function SpecialProjectsPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "slides.md"), "utf8");
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} />;
}
