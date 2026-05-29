import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Why We Will Succeed",
  description: "Scalable, cost-effective model for passing legislation at scale.",
};

export default function TamPresentationPage() {
  const markdown = `
Slide 1
Why We Will Succeed
We have built a scalable, cost-effective model for passing legislation at scale.
Our distribution partner has direct upside in helping the model succeed.
The model opens billion-dollar verticals aligned with long-term business growth.
`.trim();
  const slides = parseSlides(markdown);

  return <SlideDeck slides={slides} />;
}
