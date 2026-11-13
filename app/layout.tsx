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
  metadataBase: new URL("https://chevron-slides.vercel.app"),
  title: "Viral Fusion",
  description:
    "Connecting voices. Powering change. Explore the vision, civic technology, and strategic alliances behind Viral Fusion.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Viral Fusion",
    title: "Viral Fusion",
    description:
      "Connecting voices. Powering change. Explore the vision, civic technology, and strategic alliances behind Viral Fusion.",
    images: [
      {
        url: "/viral-fusion-social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Viral Fusion — Connecting Voices Into Engines For Change, with a connected globe.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Fusion",
    description:
      "Connecting voices. Powering change. Explore the vision, civic technology, and strategic alliances behind Viral Fusion.",
    images: ["/viral-fusion-social-preview.jpg"],
  },
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
