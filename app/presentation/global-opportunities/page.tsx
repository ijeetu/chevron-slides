import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Global Opportunities",
  description: "Global opportunities presentation.",
};

export default function GlobalOpportunitiesPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "tamslides.md"), "utf8");
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} />;
}
