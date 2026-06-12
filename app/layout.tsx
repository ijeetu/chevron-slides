import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { FloatingLinksMenu } from "@/components/floating-links-menu";
import { PasscodeGate } from "@/components/passcode-gate";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

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
      <body className={plusJakartaSans.variable} suppressHydrationWarning>
        <PasscodeGate>
          {children}
          <FloatingLinksMenu />
        </PasscodeGate>
      </body>
    </html>
  );
}
