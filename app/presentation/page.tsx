import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText, Layers3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Core Presentation",
  description: "View the Viral Fusion deck or the MVP presentation.",
};

const options = [
  {
    title: "Viral Fusion Deck",
    href: "/presentation/main-deck",
    icon: FileText,
  },
  {
    title: "MVP",
    href: "/presentation/special-projects",
    icon: Layers3,
  },
];

export default function PresentationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
      <Link
        href="/library"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/30 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-mist backdrop-blur-sm transition-colors hover:bg-white/45 hover:text-graphite sm:left-10 sm:top-8 lg:left-14"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.1} />
        <span>Back</span>
      </Link>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col justify-center">
        <header className="text-center">
          <h1 className="font-display text-6xl leading-none text-ink sm:text-7xl lg:text-[5.4rem]">
            Core Presentation
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
