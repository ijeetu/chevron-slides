import Link from "next/link";
import { ArrowRight, Presentation, BarChart3, Map } from "lucide-react";

export default function Home() {
  const decks = [
    {
      title: "Strategic Briefing",
      description: "Main presentation covering the core strategic initiatives and market analysis.",
      href: "/presentation",
      icon: Presentation,
    },
    {
      title: "Executive Summary",
      description: "High-level summary of the strategic briefing for quick review.",
      href: "/summary",
      icon: BarChart3,
    },
    {
      title: "Strategy Map",
      description: "Visual map detailing the strategic alliances and partnerships.",
      href: "/strategymap",
      icon: Map,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        
        <header className="text-center space-y-4">
          <h1 className="font-display text-5xl sm:text-6xl text-ink leading-none">
            Viral Fusion
          </h1>
          <p className="text-lg max-w-xl mx-auto text-mist">
            Select a presentation deck to view.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <Link
              key={deck.href}
              href={deck.href}
              className="group relative flex flex-col rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line bg-paper hover:shadow-deck transition-all duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 bg-panel text-accent group-hover:bg-accent group-hover:text-white"
              >
                <deck.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-ink">
                {deck.title}
              </h2>
              <p className="text-sm leading-relaxed flex-grow text-mist">
                {deck.description}
              </p>
              <div 
                className="mt-6 flex items-center text-sm font-medium transition-colors text-accent group-hover:text-ink"
              >
                View Deck
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
