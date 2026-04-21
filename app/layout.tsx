import type { Metadata } from "next";

import { PasscodeGate } from "@/components/passcode-gate";

import "./globals.css";

export const metadata: Metadata = {
  title: "Chevron Strategic Briefing",
  description: "Executive slide deck generated from slides.md",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PasscodeGate>{children}</PasscodeGate>
      </body>
    </html>
  );
}
