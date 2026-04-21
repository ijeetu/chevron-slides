import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText, Layers3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Core Presentation",
  description: "Choose the main deck or the special projects initiative.",
};

const options = [
  {
    title: "Main Deck",
    href: "/presentation/main-deck",
    description: "Open the Viral Fusion PDF as slides.",
    icon: FileText,
  },
  {
    title: "Special Projects Initiative",
    href: "/presentation/special-projects",
    description: "Open the initiative presentation.",
    icon: Layers3,
  },
];

export default function PresentationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col justify-center">
        <header className="text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-mist">
            Core Presentation
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">
            Choose a Deck
          </h1>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.href}
                href={option.href}
                className="group flex min-h-[14rem] flex-col justify-between rounded-[1.6rem] border border-white/75 bg-white/82 p-6 shadow-deck transition-all duration-300 hover:-translate-y-1 hover:bg-white/92"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/35 bg-panel text-graphite">
                    <Icon className="h-6 w-6" strokeWidth={1.9} />
                  </div>
                  <h2 className="mt-5 font-display text-3xl leading-none text-ink">
                    {option.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-mist">
                    {option.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between rounded-[1.15rem] border border-white/70 bg-white/65 px-4 py-3">
                  <span className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-graphite">
                    Open
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}
