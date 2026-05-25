"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BookOpenText, ExternalLink, X } from "lucide-react";

type QuickLink = {
  href: string;
  label: string;
  description: string;
};

const quickLinks: QuickLink[] = [
  { href: "/", label: "Home", description: "Main landing page" },
  { href: "/library", label: "Library", description: "Deck library view" },
  { href: "/tam", label: "Problems", description: "Problem framing deck" },
  {
    href: "/presentation",
    label: "Core Presentation",
    description: "Main presentation hub",
  },
  {
    href: "/presentation/main-deck",
    label: "Viral Fusion Intro",
    description: "Vision intro page",
  },
  {
    href: "/presentation/main-deck/deck",
    label: "Viral Fusion Deck",
    description: "PDF slide viewer",
  },
  {
    href: "/presentation/global-opportunities",
    label: "Global Opportunities",
    description: "Market opportunity slides",
  },
  {
    href: "/presentation/special-projects",
    label: "MVP",
    description: "Special projects deck",
  },
  {
    href: "/strategymap",
    label: "Strategy Map",
    description: "Strategic alliance map",
  },
  { href: "/summary", label: "Summary", description: "Executive summary deck" },
];

export function FloatingLinksMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkCountLabel = useMemo(() => `${quickLinks.length} links`, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#11161c] text-white shadow-[0_18px_38px_rgba(17,22,28,0.32)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-[#1e2730] sm:bottom-6 sm:left-6"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="resources-modal"
        aria-label="Open resources"
      >
        <BookOpenText className="h-4 w-4" strokeWidth={2} />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-start bg-[#11161c]/45 p-4 backdrop-blur-sm sm:items-end sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <section
            id="resources-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Resources"
            className="w-full max-w-md rounded-[1.6rem] border border-white/70 bg-[rgba(252,251,248,0.96)] p-4 shadow-[0_28px_80px_rgba(17,22,28,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-ink">Resources</h2>
                <p className="mt-1 text-sm text-mist">{linkCountLabel}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/75 text-ink transition-colors hover:bg-white"
                aria-label="Close resources"
              >
                <X className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {quickLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between gap-4 rounded-[1.15rem] border px-4 py-3 transition-all ${
                      isActive
                        ? "border-[#11161c]/20 bg-[#11161c] text-white shadow-[0_12px_26px_rgba(17,22,28,0.18)]"
                        : "border-black/8 bg-white/78 text-ink hover:border-[#11161c]/18 hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{link.label}</div>
                      <div
                        className={`mt-1 text-xs ${
                          isActive ? "text-white/74" : "text-mist"
                        }`}
                      >
                        {link.description}
                      </div>
                    </div>
                    <ExternalLink
                      className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-mist"}`}
                      strokeWidth={2}
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
