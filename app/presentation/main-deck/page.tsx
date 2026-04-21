import type { Metadata } from "next";

import { PdfSlideViewer } from "@/components/pdf-slide-viewer";

export const metadata: Metadata = {
  title: "Viral Fusion Main Deck",
  description: "Main Viral Fusion PDF deck.",
};

export default function MainDeckPage() {
  return <PdfSlideViewer file="/Viral%20Fusion.pdf" title="Main Deck" />;
}
