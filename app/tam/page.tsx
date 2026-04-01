import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "TAM",
  description: "Problems video and global problem framing.",
};

export default function TamPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "tamslides.md"), "utf8");
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} />;
}
