import type { Metadata } from "next";

import { SlideDeck } from "@/components/slide-deck";
import { parseSlides } from "@/lib/parse-slides";

export const metadata: Metadata = {
  title: "Future Outlook",
  description: "Future outlook closing slide for the Viral Fusion deck.",
};

export default function FutureOutlookPage() {
  const markdown = `
Slide 1
Future Outlook
Support from POTUS
Vision for technology dominance and decentralization.
Secure Elections
Why should The People trust the government for secure elections?
Provide a Layer of Democracy
Make government representatives accountable to the people they serve.

Slide 2
Future Outlook
Support from POTUS
Vision for technology dominance and decentralization.
Secure Elections
Why should The People trust the government for secure elections?
{{red-bold:We take control of the process.}}
Provide a Layer of Democracy
Make government representatives accountable to the people they serve.

Slide 3
Future Outlook
Support from POTUS
Vision for technology dominance and decentralization.
Secure Elections
Why should The People trust the government for secure elections?
{{red-bold:We take control of the process.}}
Provide a Layer of Democracy
Make government representatives accountable to the people they serve.
{{red-bold:Lead by example and show what creative minds can deliver.}}
`.trim();
  const slides = parseSlides(markdown);

  return (
    <SlideDeck
      slides={slides}
      backHref="/presentation/main-deck/deck"
      preferHistoryBack={false}
    />
  );
}
