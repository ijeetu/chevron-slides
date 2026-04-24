import fs from "node:fs";
import path from "node:path";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

function getVisionVideoEmbedUrl() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "tamslides.md"), "utf8");
  const match = markdown.match(/^Video:\s*(https?:\/\/\S+)$/im);
  const url = match?.[1];

  if (!url) {
    return null;
  }

  const manageMatch = url.match(/vimeo\.com\/manage\/videos\/(\d+)\/([a-zA-Z0-9]+)/i);
  if (manageMatch) {
    return `https://player.vimeo.com/video/${manageMatch[1]}?h=${manageMatch[2]}&badge=0&autopause=0&player_id=0&app_id=58479`;
  }

  const directMatch = url.match(/vimeo\.com\/(\d+)(?:\?.*)?$/i);
  if (directMatch) {
    return `https://player.vimeo.com/video/${directMatch[1]}?badge=0&autopause=0&player_id=0&app_id=58479`;
  }

  return url;
}

export default function Home() {
  const videoEmbedUrl = getVisionVideoEmbedUrl();

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-9rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(149,174,201,0.24),transparent_66%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[12rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(208,196,169,0.18),transparent_66%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <section className="w-full max-w-[58rem]">
          <div className="text-center">
            <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl lg:text-[4.5rem]">
              Our Vision
            </h1>
          </div>

          <div className="mt-7 overflow-hidden rounded-[2.2rem] border border-white/45 bg-white/80 p-1.5 shadow-deck backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#11161c]">
              {videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  title="Our Vision video"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center px-8 text-center text-base text-mist">
                  Video placeholder unavailable
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/library"
              className="group inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/75 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_16px_44px_rgba(17,22,28,0.11),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_54px_rgba(17,22,28,0.15)]"
            >
              <span>Enter</span>
              <ArrowRight className="h-4 w-4 text-ink transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.1} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
