"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Cable,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Leaf,
  Orbit,
  Pause,
  Play,
  Presentation,
  RadioTower,
  TrendingUp,
  Volume2,
  X,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  StrategyMapContent,
  StrategyMapIntroSlide,
} from "@/components/strategy-map-page";

type Deck = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  iconTone: string;
  placementClass?: string;
  videoEmbedUrl?: string;
};

type ManifestoStatement = {
  text: string;
};

type FoundingFather = {
  name: string;
  imageSrc: string;
  accentClass: string;
};

type TechnocratFigure = {
  name: string;
  role: string;
  imageSrc: string;
  focusImageSrc?: string;
};

type PromiseItem = {
  title: string;
};

const architecturePillars = [
  { label: "Technology", Icon: Cpu, color: "#9beaff" },
  { label: "Connectivity", Icon: Cable, color: "#6f98e8" },
  { label: "Sustainability", Icon: Leaf, color: "#55c98c" },
  { label: "Media Rails", Icon: RadioTower, color: "#e7b45d" },
  { label: "Powerful Ecosystem", Icon: Orbit, color: "#e05c4e" },
] as const;

const deckPages: Deck[][] = [
  [
    {
      title: "Problems",
      description: "Insulation and Noise",
      href: "/tam",
      icon: BarChart3,
      placementClass: "xl:col-start-2 xl:col-span-2",
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(241,236,225,0.88))] hover:border-[#c9bb9a]/85 hover:shadow-[0_24px_55px_rgba(108,89,52,0.14)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(245,239,227,0.98),rgba(230,216,187,0.94))] text-[#6c5835] border-[#cbbd9f]/50",
    },
    {
      title: "Beneath the Noise",
      description: "Incentives Behind Instability",
      href: "https://vimeo.com/share/d1eaa291-6c14-4d9c-85fd-307e321a81f4?share=copy&fl=sv&fe=ci",
      videoEmbedUrl: "https://player.vimeo.com/video/1208320570?h=27898b1a19&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1",
      icon: TrendingUp,
      placementClass: "xl:col-start-4 xl:col-span-2",
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(229,235,241,0.92))] hover:border-[#91a5b8]/85 hover:shadow-[0_24px_60px_rgba(55,79,105,0.16)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(235,241,247,0.98),rgba(185,201,216,0.94))] text-[#3e5b74] border-[#9aafc1]/50",
    },
  ],
  [
    {
      title: "Core Presentation",
      description: "Vision Video and Strategic Initiatives",
      href: "/presentation",
      icon: Presentation,
      placementClass: "xl:col-start-2 xl:col-span-2",
      tone:
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(228,235,244,0.9))] hover:border-[#94aac2]/85 hover:shadow-[0_24px_60px_rgba(59,88,129,0.16)]",
      iconTone:
        "bg-[linear-gradient(145deg,rgba(233,240,247,0.98),rgba(189,205,223,0.94))] text-[#37567b] border-[#98aec4]/50",
    },
  ],
];

const deckPageHashes: Record<string, number> = {
  "#problems": 11,
  "#decks": 11,
  "#presentation": 19,
  "#global-opportunities": 19,
  "#strategymap": 33,
};

function getPageFromHash(hash: string, totalPages: number) {
  const mappedPage = deckPageHashes[hash];

  if (typeof mappedPage === "number") {
    return Math.max(0, Math.min(mappedPage, totalPages - 1));
  }

  const match = hash.match(/^#page-(\d+)$/);

  if (!match) {
    return null;
  }

  return Math.max(0, Math.min(Number(match[1]) - 1, totalPages - 1));
}

function namedHashMatchesPage(hash: string, page: number) {
  return deckPageHashes[hash] === page;
}

const manifestoStatements: ManifestoStatement[] = [
  {
    text: "While others talk about America First, we designed the engine, mapped the strategy, and created a blueprint for global change.",
  },
];

function ManifestoStatementText() {
  return (
    <>
      While others talk about America First, we designed the engine, mapped the
      strategy, and created a blueprint for global change.
    </>
  );
}

const foundingFathers: FoundingFather[] = [
  {
    name: "George Washington",
    imageSrc: "/founding-fathers/george-washington.jpg",
    accentClass: "from-[#123a82]/92 via-[#244f9b]/78 to-[#c9d8ff]/18",
  },
  {
    name: "Thomas Jefferson",
    imageSrc: "/founding-fathers/thomas-jefferson.jpg",
    accentClass: "from-[#7e1425]/92 via-[#b92c42]/76 to-[#ffd0d6]/18",
  },
];

const openingQuestions = [
  "It’s challenging to feel hopeful about the future.",
  "A Republic Without Absolute Accountability Is Already in Decay.",
] as const;

const slideTitleTypography =
  "font-display text-6xl font-semibold leading-[0.92] sm:text-7xl lg:text-[5.6rem]";

const promiseItems: PromiseItem[] = [
  {
    title: "Defend Sovereignty",
  },
  {
    title: "Enforce Accountability",
  },
  {
    title: "Secure the Future",
  },
];

const promiseNotes = [
  "You’ve unmasked the systemic failures on this show, and your audience is ready for solutions. This is not a standard investment pitch. And money cannot buy what this platform can deliver.",
  "On the 250th anniversary of America, we are launching the infrastructure to upgrade democracy itself. Where traditional representation has failed, our network is built to scale.",
  "We will defend sovereignty through verifiable, citizen-backed legislation. We will enforce radical accountability to erase corruption. And we will secure a stable future for the next generation.",
  "We aren't here to dissect the past. We are here to execute the blueprint that changes the world.",
] as const;

const problemsNotes = [
  "Problems are rarely accidental.",
  "The friction points most people experience daily are intentionally designed—engineered to keep the majority distracted, vulnerable, and weak. While everyday populations remain occupied by these baseline distractions, a higher tier of disruption and corruption is manufactured globally: funding wars, toppling governments, and rewriting maps.",
  "Let's take a look at both layers of this architecture.",
] as const;

const livingWithPurposeNotes = [
  "Roosevelt believed in work worth doing. For us, there is no greater work than standing up to the tyranny running this country. Stop waiting for change. It is time to deploy the talents God gave us and build the future ourselves. Today, you will see what is possible. Through your platform. Through the power of a podcast. Through our technology, our strategy, and our intellectual property. By connecting the dots and building synergies, we will drive real action—and deliver a level of change the world has never seen.",
] as const;

const architecturePillarsNotes = [
  "To spark a historic American revival, we must stop playing by their rules and rewrite the game entirely. We cannot look to the architects of a broken system to fix it. We must step outside their walls and take command. And we know exactly how to draw the line.",
  "Look at the board. Technology. Connectivity. Sustainability. Media Rails. And a Powerful Ecosystem. To the passive observer, these are mere words. To us, they are weaponized into action. Because action is the ultimate currency of freedom.",
  "The era of idle talk is finished. The blueprint is live. We are deploying technology, integrating infrastructure, and laying down entirely new rails to claim our voice. This is how we forge the most formidable movement in American history. A global network fueled by pure execution. Built so that the actions of everyday patriots permanently lock in their sovereignty, their freedoms, and their future.",
  "We are bringing absolute accountability back to the American people—and in doing so, we will rescue our culture and forever transform this nation.",
] as const;

const technocratFigures: TechnocratFigure[] = [
  {
    name: "Peter Thiel",
    role: "The Philosopher-King & Financier",
    imageSrc: "/technocrats/peter-thiel.jpg",
  },
  {
    name: "Marc Andreessen",
    role: "The Ideologue & Manifestor",
    imageSrc: "/technocrats/marc-andreessen.jpg",
  },
  {
    name: "JD Vance",
    role: "The Political Vessel",
    imageSrc: "/technocrats/jd-vance.jpg",
  },
  {
    name: "Elon Musk",
    role: "The Operational Catalyst",
    imageSrc: "/technocrats/elon-musk.webp",
  },
  {
    name: "David Sacks",
    role: "The Convener & Bundler",
    imageSrc: "/technocrats/david-sacks.jpg",
  },
];

const post2010TechnocratFigures: TechnocratFigure[] = technocratFigures.map((figure) =>
  figure.name === "Elon Musk"
    ? { ...figure, imageSrc: "/technocrats/elon-musk.jpg" }
    : figure,
);

const elonFocusTechnocratFigures: TechnocratFigure[] = technocratFigures.map((figure) =>
  figure.name === "Elon Musk"
    ? { ...figure, focusImageSrc: "/technocrats/elonmusk.png" }
    : figure,
);

const agendaItems = [
  {
    title: "The Landscape & The Players",
    description: "Systemic problems and the key stakeholders.",
  },
  {
    title: "Core Infrastructure & Distribution",
    description: "Phase 1 technology meets new media rails.",
  },
  {
    title: "Project 2026 & Strategy",
    description: "Manifesto preview, pre-launch, and go-to-market.",
  },
  {
    title: "Commercialization & Longevity",
    description: "IPO, sustainability model, verticals, and legislative action.",
  },
  {
    title: "The Musk Alliance & Next Steps",
    description: "Strategic alignment probability and the call to action.",
  },
] as const;

const technologyLeadershipFramework = [
  {
    label: "THE DRIVER",
    text: "Technology determines future economic and geopolitical power.",
  },
  {
    label: "THE FOCUS",
    text: "AI, robotics, advanced manufacturing, and digital infrastructure.",
  },
  {
    label: "THE METHOD",
    text: "Accelerate innovation by reducing regulatory barriers.",
  },
  {
    label: "THE ALLIANCE",
    text: "Government enables innovation and partners with the private sector.",
  },
  {
    label: "THE END GOAL",
    text: "Maintain U.S. technological leadership and long-term national competitiveness.",
  },
] as const;

const preCtaSlides = [
  "Sustainability Model",
  "Legislative Examples",
  "Probability Musk Will for a Strategic Alliance",
] as const;

const mainDeckSlides = [
  "/mainslides/VF1.jpg",
  "/mainslides/VF2.jpg",
  "/mainslides/VF3.jpg",
  "/mainslides/VF4.jpg",
  "/mainslides/VF5.jpg",
  "/mainslides/VF6.jpg",
  "/mainslides/VF7.jpg",
  "/mainslides/VF8.jpg",
] as const;

const vf8VideoEmbedUrl =
  "https://player.vimeo.com/video/1208168027?h=e82221e82e&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1";

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function DeckCard({
  deck,
  onOpenVideo,
}: {
  deck: Deck;
  onOpenVideo: (videoEmbedUrl: string) => void;
}) {
  const Icon = deck.icon;
  const cardClassName = `group relative flex min-h-[17.25rem] flex-col overflow-hidden rounded-[1.9rem] border border-white/75 p-6 text-left transition-all duration-300 ease-out hover:-translate-y-1 xl:col-span-2 ${deck.placementClass ?? ""} ${deck.tone}`;
  const content = (
    <>
      <div className="pointer-events-none absolute inset-x-6 top-0 h-20 bg-gradient-to-r from-white/60 via-white/20 to-transparent blur-2xl" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-[1.75rem] leading-[0.95] text-ink">
              {deck.title}
            </h2>
          </div>

          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_10px_24px_rgba(17,22,28,0.07)] ${deck.iconTone}`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.9} />
          </div>
        </div>

        <p className="mt-5 max-w-sm text-[0.92rem] leading-6 text-graphite">
          {deck.description}
        </p>

        <div className="mt-auto w-full pt-6">
          <div className="flex items-center justify-between rounded-[1.25rem] border border-white/70 bg-white/55 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm transition-all duration-300 group-hover:bg-white/72">
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-graphite">
              Watch Video
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (deck.videoEmbedUrl) {
    return (
      <button
        type="button"
        className={cardClassName}
        onClick={() => onOpenVideo(deck.videoEmbedUrl!)}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={deck.href} className={cardClassName}>
      {content}
    </Link>
  );
}

function FoundersCtaCard({ statement }: { statement: ManifestoStatement }) {
  return (
    <article className="relative overflow-hidden rounded-[2.4rem] border border-[#ebd7a8]/70 bg-[linear-gradient(145deg,#efe2b9,#b68d3d)] p-[1px] shadow-[0_28px_80px_rgba(19,38,74,0.28)]">
      <div className="relative overflow-hidden rounded-[calc(2.4rem-1px)] bg-[#f7f2e9] px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
        <Image
          src="/american-flag-ai-generated_268835-11226.avif"
          alt="American flag background"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,44,0.42),rgba(7,20,44,0.12)_24%,rgba(246,241,232,0.66)_38%,rgba(248,244,236,0.84)_50%,rgba(246,241,232,0.66)_62%,rgba(9,24,48,0.12)_76%,rgba(9,24,48,0.4))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.28),transparent_16%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.16),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_28%,rgba(8,15,29,0.18)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.12)_46%,rgba(255,255,255,0)_60%,rgba(9,17,32,0.18)_100%)] mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(120%_75%_at_50%_-10%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(120%_95%_at_50%_110%,rgba(7,14,27,0.16),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-[29%] hidden w-px bg-white/18 xl:block" />
        <div className="pointer-events-none absolute inset-y-0 right-[29%] hidden w-px bg-[#173f8e]/10 xl:block" />

        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,17rem)_1fr_minmax(0,17rem)] xl:items-center">
          {foundingFathers.map((father, index) => (
            <aside
              key={father.name}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-white/18 bg-[rgba(7,19,42,0.16)] shadow-[0_20px_44px_rgba(7,19,42,0.2)] ${
                index === 0 ? "xl:order-1" : "xl:order-3"
              }`}
            >
              <div className="relative h-[16rem] sm:h-[18rem] xl:h-[20rem]">
                <Image
                  src={father.imageSrc}
                  alt={father.name}
                  fill
                  sizes="(min-width: 1280px) 17rem, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.06),rgba(8,17,34,0.38)_46%,rgba(5,10,20,0.88)_100%)]`}
                />
                <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${father.accentClass}`} />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-10 text-center text-white">
                  <p className="font-display text-[1.55rem] leading-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]">
                    {father.name}
                  </p>
                </div>
              </div>
            </aside>
          ))}

          <div className="relative overflow-hidden rounded-[2rem] border border-[#d7bc7d]/55 bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(247,241,227,0.93)_56%,rgba(234,241,255,0.94)_100%)] px-6 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_24px_60px_rgba(17,22,28,0.12)] sm:px-8 md:px-10 md:py-8 xl:order-2">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-20 bg-gradient-to-r from-transparent via-white/85 to-transparent blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-7 h-16 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0))] blur-xl" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              <p className="max-w-3xl font-display text-[1.9rem] leading-[1.12] text-ink sm:text-[2.25rem] md:text-[2.7rem]">
                <ManifestoStatementText />
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function QuestionSlide({
  question,
  videoEmbedSrc,
  videoTitle,
}: {
  question: ReactNode;
  videoEmbedSrc?: string;
  videoTitle?: string;
}) {
  if (videoEmbedSrc) {
    return (
      <section className="relative flex h-full items-center justify-center px-[5%]">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
          <article className="relative flex h-full max-h-full w-full flex-col items-center justify-center px-5 py-6 sm:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
              <p className="font-display text-[2.2rem] font-semibold leading-[1.1] text-[#f4f2ec] sm:text-[3.1rem] lg:text-[3.7rem]">
                {question}
              </p>
              <div className="mt-4 h-px w-44 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.86),transparent)]" />

              <div className="mt-7 w-full max-w-[58rem] overflow-hidden rounded-[1.45rem] border border-[#01c7f3]/38 bg-black p-1 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
                <div className="aspect-video">
                  <iframe
                    src={videoEmbedSrc}
                    title={videoTitle ?? "Video"}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-full flex-col items-center justify-center px-[5%] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <article className="relative overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.96),rgba(20,35,48,0.98)_48%,rgba(14,27,39,0.98))] px-8 py-10 shadow-[0_34px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-12 sm:py-12">
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff]/85 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(1,199,243,0.17),transparent_42%),linear-gradient(115deg,rgba(255,255,255,0.045),transparent_28%,transparent_72%,rgba(1,199,243,0.04))]" />
          <div className="pointer-events-none absolute -left-px top-10 h-16 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/50 to-transparent" />
          <div className="pointer-events-none absolute -right-px bottom-10 h-16 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />
          <p className="relative text-center font-display text-[2rem] leading-[1.12] text-[#b9f2ff] sm:text-[2.65rem]">
            {question}
          </p>
        </article>
      </div>
    </section>
  );
}

function YearVideoSlide() {
  const videoFrameRef = useRef<HTMLIFrameElement | null>(null);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const outroAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasOutroStartedRef = useRef(false);
  const [narrationPhase, setNarrationPhase] = useState<"intro" | "video" | "outro">("intro");
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

  useEffect(() => {
    const stopIntroListener = pauseWhenAnotherAudioStarts(introAudioRef);
    const stopOutroListener = pauseWhenAnotherAudioStarts(outroAudioRef);

    return () => {
      stopIntroListener();
      stopOutroListener();
    };
  }, []);

  useEffect(() => {
    const sendVimeoCommand = (method: string, value?: string) => {
      videoFrameRef.current?.contentWindow?.postMessage(
        JSON.stringify(value ? { method, value } : { method }),
        "https://player.vimeo.com",
      );
    };

    const startClosingVoiceover = () => {
      if (hasOutroStartedRef.current) return;

      const audio = outroAudioRef.current;
      if (!audio) return;

      hasOutroStartedRef.current = true;
      setNarrationPhase("outro");
      audio.currentTime = 0;
      claimExclusiveAudioPlayback(audio);
      void audio.play().catch(() => setIsNarrationPlaying(false));
    };

    const handleVimeoMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://player.vimeo.com" ||
        event.source !== videoFrameRef.current?.contentWindow
      ) {
        return;
      }

      let message = event.data;
      if (typeof message === "string") {
        try {
          message = JSON.parse(message);
        } catch {
          return;
        }
      }

      if (message?.event === "ready") {
        sendVimeoCommand("addEventListener", "play");
        sendVimeoCommand("addEventListener", "ended");
        sendVimeoCommand("addEventListener", "finish");
        sendVimeoCommand("addEventListener", "timeupdate");
        sendVimeoCommand("addEventListener", "seeked");
      }

      if (message?.event === "play") {
        hasOutroStartedRef.current = false;
        introAudioRef.current?.pause();
        outroAudioRef.current?.pause();
        setNarrationPhase("video");
        setIsNarrationPlaying(false);
      }

      const playbackData = message?.data;
      const reachedVideoEnd =
        (message?.event === "timeupdate" || message?.event === "seeked") &&
        typeof playbackData?.duration === "number" &&
        playbackData.duration > 0 &&
        ((typeof playbackData?.percent === "number" && playbackData.percent >= 0.995) ||
          (typeof playbackData?.seconds === "number" &&
            playbackData.seconds >= playbackData.duration - 0.5));

      if (
        message?.event === "ended" ||
        message?.event === "finish" ||
        reachedVideoEnd
      ) {
        startClosingVoiceover();
      }
    };

    window.addEventListener("message", handleVimeoMessage);
    return () => window.removeEventListener("message", handleVimeoMessage);
  }, []);

  const startVideo = () => {
    setNarrationPhase("video");
    setIsNarrationPlaying(false);
    videoFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "play" }),
      "https://player.vimeo.com",
    );
  };

  const toggleNarration = async () => {
    const audio = narrationPhase === "outro" ? outroAudioRef.current : introAudioRef.current;
    if (!audio || narrationPhase === "video") return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    if (audio.ended) {
      audio.currentTime = 0;
    }

    try {
      claimExclusiveAudioPlayback(audio);
      await audio.play();
    } catch {
      setIsNarrationPlaying(false);
    }
  };

  return (
    <section className="relative flex h-full items-center justify-center px-[5%]">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <article className="relative flex h-full max-h-full w-full flex-col items-center justify-center px-5 py-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className={`${slideTitleTypography} text-[#f4f2ec]`}>
              2010
            </p>
            <div className="mt-3 h-px w-36 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.86),transparent)]" />

            <div className="mt-6 w-full max-w-[58rem] overflow-hidden rounded-[1.45rem] border border-[#01c7f3]/38 bg-black p-1 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
              <div className="aspect-video">
                <iframe
                  ref={videoFrameRef}
                  id="slide-16-video"
                  src="https://player.vimeo.com/video/1206848346?h=a76eaac1c9&badge=0&autopause=0&player_id=slide-16-video&app_id=58479&api=1"
                  title="2010 video"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={() => {
                    videoFrameRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ method: "addEventListener", value: "play" }),
                      "https://player.vimeo.com",
                    );
                    videoFrameRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ method: "addEventListener", value: "ended" }),
                      "https://player.vimeo.com",
                    );
                    videoFrameRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ method: "addEventListener", value: "finish" }),
                      "https://player.vimeo.com",
                    );
                    videoFrameRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ method: "addEventListener", value: "timeupdate" }),
                      "https://player.vimeo.com",
                    );
                    videoFrameRef.current?.contentWindow?.postMessage(
                      JSON.stringify({ method: "addEventListener", value: "seeked" }),
                      "https://player.vimeo.com",
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </article>
      </div>

      {narrationPhase !== "video" ? (
        <button
          type="button"
          aria-label={`${isNarrationPlaying ? "Pause" : "Play"} ${narrationPhase === "intro" ? "introductory" : "closing"} voiceover`}
          onClick={toggleNarration}
          className="fixed right-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/65 text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#01c7f3]/75 hover:text-[#b9f2ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9beaff]/80 md:right-8 md:top-8"
        >
          {isNarrationPlaying ? (
            <Pause className="h-5 w-5" strokeWidth={2.4} />
          ) : (
            <Play className="ml-0.5 h-5 w-5" strokeWidth={2.4} />
          )}
        </button>
      ) : null}

      <audio
        ref={introAudioRef}
        src="/voices/2010_1.mp3"
        preload="auto"
        autoPlay
        onEnded={startVideo}
        onPause={() => setIsNarrationPlaying(false)}
        onPlay={(event) => {
          setNarrationPhase("intro");
          claimExclusiveAudioPlayback(event.currentTarget);
          setIsNarrationPlaying(true);
        }}
      />
      <audio
        ref={outroAudioRef}
        src="/voices/2010_2.mp3"
        preload="auto"
        onEnded={() => setIsNarrationPlaying(false)}
        onPause={() => setIsNarrationPlaying(false)}
        onPlay={(event) => {
          setNarrationPhase("outro");
          claimExclusiveAudioPlayback(event.currentTarget);
          setIsNarrationPlaying(true);
        }}
      />
    </section>
  );
}

function TicMicPieSlide() {
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTransitionProgress(1);
      return;
    }

    const animationDelayMs = 1_800;
    const animationDurationMs = 14_600;
    const startedAt = window.performance.now();
    let animationFrame = 0;

    const updateChart = (now: number) => {
      const elapsed = now - startedAt - animationDelayMs;
      const linearProgress = Math.max(
        0,
        Math.min(1, elapsed / animationDurationMs),
      );

      // Keep the shift gradual at first, then emphasize TIC near the end of the narration.
      setTransitionProgress(Math.pow(linearProgress, 1.35));

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(updateChart);
      }
    };

    animationFrame = window.requestAnimationFrame(updateChart);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const chartData = [
    {
      key: "fic",
      name: "FIC",
      value: 1 + transitionProgress * 0.45,
      fill: "url(#fic-green-gradient)",
    },
    {
      key: "mic",
      name: "MIC",
      value: 1 - transitionProgress * 0.68,
      fill: "url(#mic-blue-gradient)",
    },
    {
      key: "tic",
      name: "TIC",
      value: 1 + transitionProgress * 0.55,
      fill: "url(#tic-red-gradient)",
    },
  ];

  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden px-[5%] py-8">
      <BackgroundVoiceoverButton
        src="/voices/ThreeComplexes.mp3"
        label="Three Complexes voiceover"
      />
      <div className="pointer-events-none absolute left-[9%] top-[30%] h-[25rem] w-[25rem] -translate-y-1/2 rounded-full bg-[#2ea66b]/12 blur-[110px]" />
      <div className="pointer-events-none absolute left-[27%] top-[70%] h-[25rem] w-[25rem] -translate-y-1/2 rounded-full bg-[#3f6fc8]/14 blur-[110px]" />
      <div className="pointer-events-none absolute right-[12%] top-1/2 h-[27rem] w-[27rem] -translate-y-1/2 rounded-full bg-[#c0392b]/12 blur-[110px]" />

      <div className="mx-auto grid h-full w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center">
          <div className="pointer-events-none absolute inset-[-2.75rem] rounded-full border border-white/[0.055]" />
          <div className="pointer-events-none absolute inset-[-1.35rem] rounded-full border border-white/[0.085]" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(46,166,107,0.16),transparent_34%),radial-gradient(circle_at_74%_72%,rgba(192,57,43,0.14),transparent_36%)] shadow-[0_38px_120px_rgba(0,0,0,0.46)]" />

          <div className="relative h-full w-full rounded-full border border-white/[0.12] bg-[#07111c]/82 p-4 shadow-[inset_0_0_70px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="fic-green-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#55c98c" />
                    <stop offset="52%" stopColor="#2ea66b" />
                    <stop offset="100%" stopColor="#18784a" />
                  </linearGradient>
                  <linearGradient id="tic-red-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e05c4e" />
                    <stop offset="52%" stopColor="#c0392b" />
                    <stop offset="100%" stopColor="#96281b" />
                  </linearGradient>
                  <linearGradient id="mic-blue-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2a54a4" />
                    <stop offset="48%" stopColor="#3f6fc8" />
                    <stop offset="100%" stopColor="#6f98e8" />
                  </linearGradient>
                  <filter id="chart-depth" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000814" floodOpacity="0.5" />
                  </filter>
                </defs>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius="47%"
                  outerRadius="91%"
                  cornerRadius={5}
                  paddingAngle={1.2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="#08131f"
                  strokeWidth={4}
                  isAnimationActive={false}
                  style={{ filter: "url(#chart-depth)" }}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={entry.fill}
                      stroke="#08131f"
                      strokeWidth={4}
                      className="outline-none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[9.5rem] w-[9.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/[0.14] bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.1),transparent_34%),linear-gradient(145deg,rgba(17,34,50,0.99),rgba(6,15,25,0.99))] text-[#f8fafc] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] sm:h-[11rem] sm:w-[11rem]">
              <span className="font-display text-[3.2rem] font-black leading-none tracking-[-0.045em] sm:text-[4rem]">
                3
              </span>
              <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#a9c3d0] sm:text-[0.7rem]">
                Complexes
              </span>
            </div>

            <div className="pointer-events-none absolute right-[20%] top-[29%] translate-x-1/2 -translate-y-1/2 text-center text-white drop-shadow-[0_5px_22px_rgba(3,30,18,0.48)]">
              <p
                className="font-display text-[2.3rem] font-black leading-none tracking-[-0.04em] sm:text-[3.25rem]"
                style={{ transform: `scale(${1 + transitionProgress * 0.12})` }}
              >
                FIC
              </p>
            </div>

            <div className="pointer-events-none absolute bottom-[15%] left-1/2 -translate-x-1/2 translate-y-1/2 text-center text-white drop-shadow-[0_5px_22px_rgba(3,12,30,0.48)]">
              <p className="font-display text-[1.7rem] font-black leading-none tracking-[-0.04em] sm:text-[2.35rem]">
                MIC
              </p>
            </div>

            <div className="pointer-events-none absolute left-[20%] top-[29%] -translate-x-1/2 -translate-y-1/2 text-center text-white drop-shadow-[0_5px_22px_rgba(30,3,6,0.48)]">
              <p
                className="font-display text-[2.3rem] font-black leading-none tracking-[-0.04em] sm:text-[3.25rem]"
                style={{ transform: `scale(${1 + transitionProgress * 0.12})` }}
              >
                TIC
              </p>
            </div>
          </div>
        </div>

        <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(27,45,59,0.95),rgba(12,25,37,0.98))] px-7 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:px-9 sm:py-9">
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff]/80 to-transparent" />
          <div className="space-y-3">
            {[
              ["FIC", "Financial-Industrial Complex", "#55c98c"],
              ["MIC", "Military-Industrial Complex", "#6f98e8"],
              ["TIC", "Technological-Industrial Complex", "#e05c4e"],
            ].map(([acronym, label, color]) => (
              <div key={acronym} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-b border-white/8 pb-3">
                <span className="font-display text-xl font-black" style={{ color }}>
                  {acronym}
                </span>
                <span className="text-sm leading-6 text-[#dceaf0] sm:text-[0.98rem]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-l-2 border-[#9beaff]/70 pl-5">
            <p className="text-[0.98rem] leading-7 text-[#eef6f8] sm:text-[1.08rem]">
              The speaker contends that the world is entering a structural transition in which long-term investment shifts from perpetual military conflict toward AI, energy, robotics, and digital infrastructure as the primary engines of economic growth.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function TechnocratsSlide({
  figures = technocratFigures,
  frameworkSequence = false,
  elonFocusSequence = false,
  voiceoverSrc,
  voiceoverDelayMs = 0,
}: {
  figures?: TechnocratFigure[];
  frameworkSequence?: boolean;
  elonFocusSequence?: boolean;
  voiceoverSrc?: string;
  voiceoverDelayMs?: number;
}) {
  return (
    <section className="relative flex h-full items-center justify-center px-[3%] py-6">
      {voiceoverSrc ? (
        <BackgroundVoiceoverButton
          src={voiceoverSrc}
          label={frameworkSequence ? "Technocrat Mandate voiceover" : "Elon Musk strategic catalyst voiceover"}
          autoPlayDelayMs={voiceoverDelayMs}
        />
      ) : null}
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center text-center">
        <div className={`relative flex h-full max-h-[43rem] w-full max-w-[72rem] flex-col items-center justify-center gap-4 lg:block ${frameworkSequence ? "technocrat-framework-stage" : ""}`}>
          <div className={`relative z-30 flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-[#9beaff]/70 bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.2),transparent_32%),linear-gradient(145deg,rgba(1,199,243,0.24),rgba(15,29,42,0.95))] shadow-[0_0_0_10px_rgba(1,199,243,0.055),0_22px_70px_rgba(1,199,243,0.18)] sm:h-40 sm:w-40 lg:absolute lg:left-1/2 lg:top-1/2 lg:h-44 lg:w-44 lg:-translate-x-1/2 lg:-translate-y-1/2 ${frameworkSequence ? "technocrat-framework-center" : elonFocusSequence ? "technocrat-focus-center" : ""}`}>
            <div className="absolute inset-[-1.35rem] rounded-full border border-[#01c7f3]/18" />
            <div className="absolute inset-[-2.8rem] rounded-full border border-[#8fa8bd]/10" />
            <span className="relative inline-flex min-h-[1.35em] min-w-[9.7rem] items-center justify-center px-3 text-center font-display text-[1.05rem] font-semibold uppercase tracking-[0.14em] text-[#e8fbff] sm:text-[1.22rem] lg:text-[1.32rem]">
              {frameworkSequence ? (
                <span>Technocrats</span>
              ) : (
                <>
                  <span className="technocrats-title-text technocrats-title-text-full">
                    Technocrats
                  </span>
                  <span className="technocrats-title-text technocrats-title-text-short">
                    TIC
                  </span>
                </>
              )}
            </span>
          </div>

          <div className={`pointer-events-none absolute left-1/2 top-1/2 hidden h-[29rem] w-[29rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#01c7f3]/16 lg:block ${frameworkSequence ? "technocrat-framework-orbit" : elonFocusSequence ? "technocrat-focus-orbit" : ""}`} />
          <div className={`pointer-events-none absolute left-1/2 top-1/2 hidden h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8fa8bd]/12 lg:block ${frameworkSequence ? "technocrat-framework-orbit" : elonFocusSequence ? "technocrat-focus-orbit" : ""}`} />

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:block">
            {figures.map((figure, index) => {
              const isElon = figure.name === "Elon Musk";
              const isPeter = figure.name === "Peter Thiel";
              const positions = [
                "lg:left-1/2 lg:top-0 lg:-translate-x-1/2",
                "lg:right-0 lg:top-[22%]",
                "lg:right-[14%] lg:bottom-0",
                "lg:left-[14%] lg:bottom-0",
                "lg:left-0 lg:top-[22%]",
              ];
              const frameworkClass = frameworkSequence
                ? `technocrat-framework-card technocrat-framework-card-${index + 1}`
                : "";
              const focusClass = elonFocusSequence
                ? isElon
                  ? "technocrat-focus-card technocrat-focus-elon"
                  : isPeter
                    ? "technocrat-focus-card technocrat-focus-peter"
                    : "technocrat-focus-card technocrat-focus-away"
                : "";

              return (
                <article
                  key={figure.name}
                  className={`group relative flex min-h-[13.6rem] flex-col items-center rounded-[1.35rem] border border-[#9beaff]/22 bg-white/[0.055] px-3 pb-4 pt-4 text-center shadow-[0_20px_55px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:last:col-start-2 lg:absolute lg:w-[13.8rem] lg:min-h-[14.1rem] ${positions[index]} ${frameworkClass} ${focusClass}`}
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[#b9f2ff]/70 bg-[#0d1823] shadow-[0_14px_35px_rgba(0,0,0,0.34)] sm:h-28 sm:w-28">
                    <Image
                      src={figure.imageSrc}
                      alt={figure.name}
                      fill
                      sizes="7rem"
                      className={`object-cover object-top ${
                        elonFocusSequence && isElon && figure.focusImageSrc
                          ? "technocrat-focus-base-image"
                          : ""
                      }`}
                    />
                    {elonFocusSequence && isElon && figure.focusImageSrc ? (
                      <Image
                        src={figure.focusImageSrc}
                        alt={figure.name}
                        fill
                        sizes="7rem"
                        className="technocrat-focus-strong-image object-cover object-top"
                      />
                    ) : null}
                  </div>
                  <h2 className="mt-4 font-display text-[1.14rem] leading-none text-[#f4f2ec] sm:text-[1.28rem]">
                    {figure.name}
                  </h2>
                  <p className="mt-2 max-w-[10rem] text-[0.72rem] font-semibold uppercase leading-5 tracking-[0.11em] text-[#9beaff]">
                    {figure.role}
                  </p>
                </article>
              );
            })}
          </div>

          {frameworkSequence ? (
            <article className="technocrat-framework-content absolute inset-x-2 bottom-0 top-[14rem] z-20 flex flex-col overflow-hidden rounded-[1.8rem] border border-[#9beaff]/22 bg-[linear-gradient(145deg,rgba(24,42,57,0.96),rgba(8,20,32,0.98))] px-6 pb-6 pt-5 text-left shadow-[0_30px_100px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] sm:inset-x-8 sm:px-8 lg:inset-x-16">
              <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff]/90 to-transparent" />
              <header className="text-center">
                <p className="font-display text-[1.45rem] font-semibold leading-tight text-[#f4f2ec] sm:text-[1.8rem]">
                  THE TECHNOCRAT MANDATE
                </p>
                <p className="mt-1.5 text-[0.82rem] leading-5 text-[#b8ccd7] sm:text-[0.95rem]">
                  Driving the next generation of American infrastructure.
                </p>
              </header>

              <div className="mx-auto mt-4 grid min-h-0 w-full max-w-3xl flex-1 grid-cols-1">
                {technologyLeadershipFramework.map((item) => (
                  <section
                    key={item.label}
                    className="relative flex items-center border-t border-white/10 py-2.5"
                  >
                    <span className="absolute left-0 top-0 h-px w-12 bg-[#01c7f3]/75" />
                    <p className="text-[0.82rem] leading-5 text-[#d8e7ed] sm:text-[0.94rem] sm:leading-6">
                      <span className="font-display font-semibold text-[#9beaff]">
                        {item.label}:
                      </span>{" "}
                      {item.text}
                    </p>
                  </section>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ArchitecturePillarsSlide() {
  return (
    <section className="relative flex h-full flex-col overflow-hidden px-[4%] py-6">
      <BackgroundVoiceoverButton
        src="/voices/FivePillars.mp3"
        label="Five architecture pillars voiceover"
      />

      <div className="pointer-events-none absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[#01c7f3]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-80 w-80 rounded-full bg-[#e05c4e]/9 blur-[120px]" />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="relative mx-auto w-full max-w-7xl">
          <header className="text-center">
            <h1 className="font-display text-[2.4rem] font-semibold leading-none text-[#f4f2ec] sm:text-[3.15rem] lg:text-[3.8rem]">
              Five pillars. Hard-wired to action.
            </h1>
          </header>

          <div className="relative mx-auto mt-10 w-full max-w-6xl">
            <div className="grid grid-cols-5 gap-3 sm:gap-5">
              {architecturePillars.map(({ label, Icon, color }, index) => (
                <div
                  key={label}
                  className="architecture-pillar flex min-w-0 flex-col items-center text-center"
                  style={{ animationDelay: `${0.35 + index * 0.18}s` }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#0d1b28]/92 shadow-[0_18px_45px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-20 sm:w-20"
                    style={{ borderColor: `${color}88`, color }}
                  >
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.65} />
                  </div>
                  <p className="mt-4 min-h-12 font-display text-[0.9rem] font-semibold leading-tight text-[#edf8fb] sm:text-[1.12rem] lg:text-[1.28rem]">
                    {label}
                  </p>
                  <div
                    className="mt-3 h-16 w-px bg-gradient-to-b from-current to-transparent sm:h-20"
                    style={{ color }}
                  />
                </div>
              ))}
            </div>

            <div className="architecture-action-rail relative -mt-px overflow-hidden rounded-[1.5rem] border border-[#01c7f3]/45 bg-[linear-gradient(90deg,rgba(11,25,37,0.96),rgba(30,65,84,0.98),rgba(11,25,37,0.96))] px-6 py-5 text-center shadow-[0_24px_70px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#9beaff] to-transparent" />
              <p className="font-display text-[2.2rem] font-black tracking-[0.2em] text-[#b9f2ff] sm:text-[3rem]">
                ACTION
              </p>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#9eb9c7] sm:text-[0.76rem]">
                The only metric that generates true value
              </p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#8fa8bd] sm:gap-5 sm:text-[0.76rem]">
              <span>Deploy</span>
              <span className="text-[#01c7f3]">→</span>
              <span>Integrate</span>
              <span className="text-[#01c7f3]">→</span>
              <span>Build new rails</span>
              <span className="text-[#01c7f3]">→</span>
              <span>Drive global change</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl shrink-0 pb-1">
        <div className="mx-auto max-w-4xl space-y-1.5 rounded-[1.1rem] border border-white/10 bg-[#0f1d2a]/55 px-5 py-3">
          {architecturePillarsNotes.map((note) => (
            <p
              key={note}
              className="text-[0.78rem] leading-snug text-[#d8edf6]/80 sm:text-[0.82rem]"
            >
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroVideoSlide() {
  const georgeVideoRef = useRef<HTMLIFrameElement | null>(null);
  const trumpVideoRef = useRef<HTMLVideoElement | null>(null);
  const hasTriggeredTrumpRef = useRef(false);
  const [videoPhase, setVideoPhase] = useState<"george" | "trump" | "return">("george");

  const sendVimeoCommand = (method: "play" | "pause" | "addEventListener" | "getCurrentTime", value?: string) => {
    georgeVideoRef.current?.contentWindow?.postMessage(
      JSON.stringify(value ? { method, value } : { method }),
      "https://player.vimeo.com",
    );
  };

  useEffect(() => {
    const onVimeoMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      if (event.source !== georgeVideoRef.current?.contentWindow) return;

      let message: {
        event?: string;
        method?: string;
        value?: number;
        data?: { seconds?: number };
      };
      try {
        message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (message.event === "ready") {
        sendVimeoCommand("addEventListener", "timeupdate");
        return;
      }

      const currentTime =
        message.event === "timeupdate"
          ? message.data?.seconds
          : message.method === "getCurrentTime"
            ? message.value
            : undefined;

      if ((currentTime ?? 0) >= 85 && !hasTriggeredTrumpRef.current) {
        hasTriggeredTrumpRef.current = true;
        sendVimeoCommand("pause");
        setVideoPhase("trump");
      }
    };

    window.addEventListener("message", onVimeoMessage);
    return () => window.removeEventListener("message", onVimeoMessage);
  }, []);

  useEffect(() => {
    if (videoPhase !== "george") return;

    const timer = window.setInterval(() => {
      sendVimeoCommand("getCurrentTime");
    }, 500);

    return () => window.clearInterval(timer);
  }, [videoPhase]);

  useEffect(() => {
    if (videoPhase !== "trump") return;

    const video = trumpVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const timer = window.setTimeout(() => {
      void video.play().catch(() => undefined);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [videoPhase]);

  const returnToGeorge = () => {
    setVideoPhase("return");
    window.setTimeout(() => sendVimeoCommand("play"), 800);
  };

  const isTrumpPlaying = videoPhase === "trump";

  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden px-[4%] py-6">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center text-center">
        <header className="relative z-20">
          <h1
            className={
              isTrumpPlaying
                ? "font-display text-4xl font-semibold leading-none text-[#f4f2ec] sm:text-5xl lg:text-[4rem]"
                : `${slideTitleTypography} text-[#f4f2ec]`
            }
          >
            {isTrumpPlaying ? "JANUARY 6, 2021" : "Introduction"}
          </h1>
          <div className="mx-auto mt-4 h-px w-44 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.86),transparent)]" />
          <p
            className={`overflow-hidden font-display text-[1.25rem] leading-tight text-[#b9f2ff] transition-all duration-500 sm:text-[1.55rem] lg:text-[1.8rem] ${
              isTrumpPlaying ? "mt-4 max-h-16 translate-y-0 opacity-100" : "mt-0 max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            President Trump Video Statement on Capitol Protesters
          </p>
        </header>

        <div className="relative mt-5 h-[min(55vh,34rem)] w-full max-w-6xl">
          <div
            className={`absolute top-1/2 w-[92%] overflow-hidden rounded-[1.45rem] border bg-black p-1 shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition-[left,width,max-width,transform,opacity,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[78%] ${
              isTrumpPlaying
                ? "left-[2%] max-w-[24rem] -translate-y-1/2 scale-[0.96] border-[#8fa8bd]/35 opacity-80"
                : "left-1/2 max-w-[58rem] -translate-x-1/2 -translate-y-1/2 scale-100 border-[#01c7f3]/38 opacity-100"
            }`}
          >
            <div className="relative aspect-video">
              <iframe
                ref={georgeVideoRef}
                src="https://player.vimeo.com/video/1207181653?h=98b4a337c2&badge=0&autopause=0&api=1&player_id=george-intro&app_id=58479&autoplay=1"
                title="George introduction video"
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => sendVimeoCommand("addEventListener", "timeupdate")}
              />
            </div>
          </div>

          <div
            className={`absolute right-[1%] top-1/2 w-[64%] -translate-y-1/2 overflow-hidden rounded-[1.45rem] border border-[#e7b45d]/50 bg-black p-1 shadow-[0_28px_80px_rgba(0,0,0,0.48)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isTrumpPlaying
                ? "pointer-events-auto translate-x-0 scale-100 opacity-100 delay-300"
                : "pointer-events-none translate-x-[8%] scale-[0.96] opacity-0 delay-0"
            }`}
          >
            <div className="aspect-video">
              <video
                ref={trumpVideoRef}
                src="/President Trump.mp4"
                className="h-full w-full object-cover"
                controls
                playsInline
                onEnded={returnToGeorge}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MuskAllianceVideoSlide() {
  return (
    <section className="relative flex h-full items-center justify-center px-[5%]">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <article className="relative flex h-full max-h-full w-full flex-col items-center justify-center px-5 py-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h1 className="font-display text-[2.1rem] font-semibold leading-[1.08] text-[#f4f2ec] sm:text-[2.85rem] lg:text-[3.35rem]">
              {preCtaSlides[2]}
            </h1>
            <div className="mt-4 h-px w-44 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.86),transparent)]" />

            <p className="mt-6 max-w-[58rem] text-center font-display text-[1.35rem] font-bold uppercase leading-tight tracking-wide text-white sm:text-[1.85rem] lg:text-[2.15rem]">
              Control or be Controlled
            </p>

            <div className="mt-7 w-full max-w-[58rem] overflow-hidden rounded-[1.45rem] border border-[#01c7f3]/38 bg-black p-1 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
              <div className="aspect-video">
                <iframe
                  src="https://player.vimeo.com/video/1208359437?h=07eacda6d0&badge=0&autopause=0&player_id=0&app_id=58479"
                  title="Strategic Alliance"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function GeorgeSorosVideoSlide() {
  return (
    <section className="relative flex h-full items-center justify-center px-[5%]">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        <article className="relative flex h-full max-h-full w-full flex-col items-center justify-center px-5 py-6 sm:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h1 className={`${slideTitleTypography} text-[#f4f2ec]`}>
              George Soros
            </h1>
            <div className="mt-4 h-px w-44 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.86),transparent)]" />

            <div className="mt-7 w-full max-w-[58rem] overflow-hidden rounded-[1.45rem] border border-[#01c7f3]/38 bg-black p-1 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/vsVTsB_SaGQ"
                  title="George Soros"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="mt-6 max-w-[58rem] text-center font-display text-[1.35rem] font-bold uppercase leading-tight tracking-wide text-white sm:text-[1.85rem] lg:text-[2.15rem]">
              &ldquo;He needs to be stopped now.&rdquo;
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function LivingWithPurposeSlide() {
  return (
    <section className="relative flex h-full flex-col overflow-hidden px-[6%] py-6">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.95fr]">
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#01c7f3]/70" />
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#8fa8bd]">
                Call to Action
              </p>
            </div>

            <h1 className={`${slideTitleTypography} mt-4 text-[#f4f2ec]`}>
              Living With
              <br />
              Purpose
            </h1>

            <div className="relative mt-10 max-w-xl">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 -top-10 select-none font-display text-[8rem] font-black leading-none text-[#01c7f3]/[0.08]"
              >
                &ldquo;
              </span>
              <blockquote className="relative border-l-2 border-[#01c7f3]/40 pl-6">
                <p className="font-display text-[1.5rem] font-medium leading-[1.32] text-[#d8edf6] sm:text-[1.8rem]">
                  Far and away the best{" "}
                  <span className="font-semibold text-[#7fd8ff]">
                    prize that life has to
                  </span>{" "}
                  offer is the chance to{" "}
                  <span className="font-semibold text-[#7fd8ff]">
                    work hard at work
                  </span>{" "}
                  worth doing.
                </p>
              </blockquote>
            </div>

            <div className="mt-8 flex items-center gap-3 pl-6">
              <span className="h-px w-10 bg-white/25" />
              <p className="text-[0.85rem] font-medium uppercase tracking-[0.18em] text-[#b8ccd7]">
                Franklin D. Roosevelt
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            <div className="pointer-events-none absolute -inset-3 rounded-[2rem] border border-[#01c7f3]/15" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white/12 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
              <Image
                src="/Benjamin.png"
                alt="Theodore Roosevelt in Rough Rider uniform"
                fill
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="object-cover [filter:grayscale(1)_contrast(1.08)_brightness(0.92)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(1,199,243,0.22),rgba(6,14,24,0.12)_38%,rgba(4,10,18,0.72))] mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(155,234,255,0.18),transparent_45%)]" />
              <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-[#9beaff]/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[#9beaff]/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl shrink-0 pb-1">
        <div className="mx-auto max-w-4xl space-y-1.5 rounded-[1.1rem] border border-white/10 bg-[#0f1d2a]/55 px-5 py-3">
          {livingWithPurposeNotes.map((note) => (
            <p
              key={note}
              className="text-[0.78rem] leading-snug text-[#d8edf6]/80 sm:text-[0.82rem]"
            >
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullScreenFlagSlide({ src }: { src: string }) {
  return (
    <section className="fixed inset-0 z-0 bg-black">
      <video
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
      />
    </section>
  );
}

const exclusiveAudioPlayEvent = "chevron:exclusive-audio-play";

function pauseWhenAnotherAudioStarts(audioRef: RefObject<HTMLAudioElement | null>) {
  const pauseCurrentAudio = (event: Event) => {
    const nextAudio = (event as CustomEvent<HTMLAudioElement>).detail;
    const currentAudio = audioRef.current;

    if (currentAudio && currentAudio !== nextAudio && !currentAudio.paused) {
      currentAudio.pause();
    }
  };

  window.addEventListener(exclusiveAudioPlayEvent, pauseCurrentAudio);
  return () => window.removeEventListener(exclusiveAudioPlayEvent, pauseCurrentAudio);
}

function claimExclusiveAudioPlayback(audio: HTMLAudioElement) {
  window.dispatchEvent(
    new CustomEvent<HTMLAudioElement>(exclusiveAudioPlayEvent, { detail: audio }),
  );
}

function BackgroundVoiceoverButton({
  src,
  label,
  autoPlayDelayMs = 0,
}: {
  src: string;
  label: string;
  autoPlayDelayMs?: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasManualPlaybackRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => pauseWhenAnotherAudioStarts(audioRef), []);

  useEffect(() => {
    if (autoPlayDelayMs <= 0) return;

    const timer = window.setTimeout(() => {
      const audio = audioRef.current;
      if (!audio || hasManualPlaybackRef.current || !audio.paused) return;

      claimExclusiveAudioPlayback(audio);
      void audio.play().catch(() => setIsPlaying(false));
    }, autoPlayDelayMs);

    return () => window.clearTimeout(timer);
  }, [autoPlayDelayMs]);

  const toggleVoiceover = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    hasManualPlaybackRef.current = true;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      claimExclusiveAudioPlayback(audio);
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
        onClick={toggleVoiceover}
        className="fixed right-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/65 text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#01c7f3]/75 hover:text-[#b9f2ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9beaff]/80 md:right-8 md:top-8"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" strokeWidth={2.4} />
        ) : (
          <Play className="ml-0.5 h-5 w-5" strokeWidth={2.4} />
        )}
      </button>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        autoPlay={autoPlayDelayMs <= 0}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={(event) => {
          claimExclusiveAudioPlayback(event.currentTarget);
          setIsPlaying(true);
        }}
      />
    </>
  );
}

function BlackSwanSlide() {
  return (
    <section className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
      <Image
        src="/swanblack.webp"
        alt="Black Swan"
        width={1586}
        height={992}
        sizes="100vw"
        className="h-full w-full border border-white/30 object-fill"
      />
      <BackgroundVoiceoverButton
        src="/voices/blackswan.mp3"
        label="California Black Swan voiceover"
      />
    </section>
  );
}

function IpoStrategySlide() {
  const layers = [
    { title: "Actions", accent: "bg-[#9beaff]" },
    { title: "Verticals", accent: "bg-[#6f98e8]" },
    { title: "Ecosystem", accent: "bg-[#55c98c]" },
    { title: "The xAI Velocity", accent: "bg-[#e05c4e]" },
  ];

  return (
    <section className="flex h-full flex-col items-center justify-center px-[5%] py-6 text-center">
      <BackgroundVoiceoverButton
        src="/voices/TheBlueprint.mp3"
        label="The Blueprint voiceover"
      />
      <header className="mx-auto max-w-6xl">
        <h1 className={`${slideTitleTypography} text-[#f4f2ec]`}>
          The Blueprint
        </h1>
        <div className="mx-auto mt-6 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
        <p className="mt-5 font-display text-[1.2rem] font-medium leading-tight text-[#b9f2ff] sm:text-[1.55rem] lg:text-[1.8rem]">
          Benchmark: SpaceX ~30-Month IPO Strategy
        </p>
      </header>

      <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 overflow-hidden border border-white/[0.15] bg-[#07111c]/[0.48] text-left shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:grid-cols-2">
        {layers.map((layer, index) => (
          <article
            key={layer.title}
            className={`relative flex min-h-[7.75rem] items-end overflow-hidden bg-[linear-gradient(135deg,rgba(36,57,74,0.72),rgba(10,23,35,0.9))] px-6 py-5 sm:min-h-[8.75rem] sm:px-8 sm:py-6 ${
              index > 0 ? "border-t border-white/[0.12]" : ""
            } ${index === 1 ? "sm:border-l sm:border-t-0" : ""} ${
              index === 3 ? "sm:border-l" : ""
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(155,234,255,0.08),transparent_45%)]" />
            <div className={`absolute left-0 top-0 h-1 w-28 ${layer.accent}`} />
            <span className="absolute right-5 top-4 font-mono text-[0.68rem] tracking-[0.18em] text-[#6f8798]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="relative font-display text-[2rem] font-semibold leading-none text-[#f4f2ec] sm:text-[2.35rem] lg:text-[2.65rem]">
              {layer.title}
            </h2>
          </article>
        ))}
      </div>
    </section>
  );
}

function MainDeckImageSlide({
  src,
  index,
  videoEmbedUrl,
  onOpenVideo,
}: {
  src: string;
  index: number;
  videoEmbedUrl?: string;
  onOpenVideo?: (videoEmbedUrl: string) => void;
}) {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <img
        src={src}
        alt={`Viral Fusion main deck slide ${index + 1}`}
        className={`h-full w-full ${index === 0 ? "object-cover" : "object-contain"}`}
        draggable={false}
      />
      {videoEmbedUrl && onOpenVideo ? (
        <button
          type="button"
          aria-label="Play VF8 video"
          onClick={() => onOpenVideo(videoEmbedUrl)}
          onKeyDown={(event) => event.stopPropagation()}
          className="absolute bottom-44 left-14 z-10 flex h-12 items-center gap-2 rounded-full border border-white/45 bg-black/62 px-4 text-white shadow-[0_14px_34px_rgba(0,0,0,0.42)] backdrop-blur-md transition-all hover:scale-[1.02] hover:border-[#9beaff]/80 hover:bg-black/78 focus:outline-none focus:ring-2 focus:ring-[#9beaff] focus:ring-offset-2 focus:ring-offset-black sm:bottom-48 sm:left-20 sm:h-14 sm:px-5"
        >
          <Play className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" strokeWidth={1.8} />
          <span className="text-sm font-semibold uppercase tracking-[0.14em] sm:text-[0.95rem]">
            Play Video
          </span>
        </button>
      ) : null}
    </section>
  );
}

function ViralFusionEarthSlide() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrame = 0;
    const slowdownWindowSeconds = 3;

    const updatePlaybackRate = () => {
      if (
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        !video.paused
      ) {
        const remaining = video.duration - video.currentTime;

        if (remaining <= 0.06) {
          video.pause();
          video.currentTime = Math.max(0, video.duration - 0.04);
          video.playbackRate = 0.18;
          return;
        }

        if (remaining < slowdownWindowSeconds) {
          const slowdownProgress =
            1 - remaining / slowdownWindowSeconds;
          video.playbackRate = Math.max(
            0.18,
            1 - slowdownProgress * 0.82,
          );
        } else {
          video.playbackRate = 1;
        }
      }

      animationFrame = window.requestAnimationFrame(updatePlaybackRate);
    };

    animationFrame = window.requestAnimationFrame(updatePlaybackRate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      video.pause();
    };
  }, []);

  const holdFinalFrame = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    video.pause();
    video.currentTime = Math.max(0, video.duration - 0.04);
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/EARTH.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={holdFinalFrame}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,7,15,0.18),rgba(0,8,18,0.06)_42%,rgba(0,7,15,0.42))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_16%,rgba(0,5,12,0.2)_68%,rgba(0,4,10,0.48)_100%)]" />

      <div className="relative z-10 flex h-full w-full items-center justify-start pl-[5%] pr-[7%] text-left">
        <header className="drop-shadow-[0_8px_32px_rgba(0,0,0,0.72)]">
          <h1 className="font-display text-[clamp(3.2rem,7vw,7.8rem)] font-black leading-[0.92] tracking-[-0.055em] text-white">
            Viral Fusion
          </h1>
          <p className="mt-6 text-[clamp(1.05rem,2vw,2.15rem)] font-medium tracking-[0.015em] text-[#e7f7fb]">
            Connecting Voices Into Engines For Change
          </p>
        </header>
      </div>
    </section>
  );
}

const missionVisionItems = [
  {
    number: "01",
    title: "Our Mission",
    body: "Return power to the people by rebuilding institutions with technology that unlocks civic trust and economic value at scale.",
    letter: "M",
  },
  {
    number: "02",
    title: "Our Vision",
    body: "Make public will impossible to ignore by turning civic engagement into a data-driven engine for systemic reform.",
    letter: "V",
  },
] as const;

function MissionVisionSlide() {
  return (
    <section className="presentation-scroll relative h-full w-full overflow-y-auto text-[#f7f8f8] md:overflow-hidden">

      <div className="relative mx-auto flex min-h-full w-[92%] flex-col justify-center py-[clamp(1rem,4vh,3rem)] md:h-full md:w-[89%]">
        <p className="font-display text-[clamp(.68rem,min(1.35vw,2.2vh),1.65rem)] font-medium tracking-[0.09em] text-[#b8c0c3]">
          MISSION &amp; VISION
        </p>
        <h1 className="mt-[clamp(.25rem,.8vh,.5rem)] font-display text-[clamp(1.65rem,min(5vw,7vh),6rem)] font-bold leading-none tracking-[-0.045em]">
          Driving Real Impact
        </h1>
        <div className="mt-[clamp(.65rem,2vh,1.8rem)] h-px w-full bg-white/15">
          <div className="h-px w-[12%] bg-[#18bfe3]" />
        </div>

        <div className="mt-[clamp(.7rem,2vh,1.8rem)] grid shrink-0 grid-cols-2 gap-[clamp(.55rem,1.5vw,1.25rem)]">
          {missionVisionItems.map((item) => (
            <article
              key={item.title}
              className="relative min-h-[clamp(9rem,25vh,18rem)] min-w-0 overflow-hidden rounded-[clamp(.8rem,1.6vw,1.75rem)] border border-[#9beaff]/20 bg-[linear-gradient(145deg,rgba(38,58,75,0.74),rgba(14,27,39,0.88))] px-[clamp(.7rem,6%,3rem)] py-[clamp(.7rem,2.4vh,2rem)] shadow-[0_24px_65px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.72),transparent)]" />
              <span className="font-mono text-[clamp(.6rem,min(1vw,1.6vh),1.15rem)] font-bold tracking-[0.28em] text-[#18bfe3]">
                {item.number}
              </span>
              <h2 className="mt-[clamp(.35rem,1vh,.75rem)] font-display text-[clamp(1.15rem,min(3vw,4.5vh),3.7rem)] font-bold leading-none">
                {item.title}
              </h2>
              <div className="mt-[clamp(.55rem,2vh,1.5rem)] border-l-[clamp(1px,.22vw,3px)] border-[#18bfe3] pl-[clamp(.55rem,5%,1.5rem)]">
                <p className="relative z-10 max-w-[42rem] font-display text-[clamp(.7rem,min(1.42vw,2.25vh),1.72rem)] leading-[1.4] text-[#d0d8db]">
                  {item.body}
                </p>
              </div>
              <span className="pointer-events-none absolute bottom-[-8%] right-[4%] font-display text-[clamp(5rem,min(16vw,24vh),18rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(155,234,255,0.10)]">
                {item.letter}
              </span>
            </article>
          ))}
        </div>

        <div className="relative mt-[clamp(.6rem,1.7vh,1.35rem)] shrink-0 overflow-hidden rounded-[clamp(.75rem,1.3vw,1rem)] border border-[#9beaff]/20 bg-[#071426]/72 px-[clamp(.75rem,3.3%,2.5rem)] py-[clamp(.55rem,1.4vh,1.2rem)] shadow-[0_18px_50px_rgba(0,0,0,0.2)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#18bfe3]">
          <p className="font-mono text-[clamp(.58rem,min(.9vw,1.5vh),1rem)] font-bold tracking-[0.25em] text-[#18bfe3]">
            VIRAL FUSION
          </p>
          <p className="mt-[clamp(.25rem,.7vh,.5rem)] font-display text-[clamp(.72rem,min(1.55vw,2.3vh),1.9rem)] font-semibold leading-[1.3]">
            Productizing technology, trust, and public will into systemic reform.
          </p>
        </div>
      </div>
    </section>
  );
}

function FounderQuoteSlide() {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden text-[#f7f8f8]">

      <Image
        src="/mainslides/BG2-optimized.webp"
        alt="George Partsch IV on rebuilding trusted institutions"
        width={2200}
        height={930}
        priority
        sizes="90vw"
        quality={88}
        className="relative h-auto max-h-[82vh] w-[90%] object-contain"
      />
    </section>
  );
}

function SimpleRepublicSlide() {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden text-white">
      <Image
        src="/mainslides/BG5.jpg"
        alt="American flag framed by a civic technology interface"
        fill
        priority
        sizes="100vw"
        unoptimized
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 mx-auto w-[90%] text-center drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
        <p className="font-display text-[clamp(1.15rem,2.35vw,2.8rem)] font-medium text-white/90">
          We keep it simple:
        </p>
        <h1 className="mt-[2%] whitespace-nowrap font-display text-[clamp(1.75rem,4vw,4.8rem)] font-bold leading-none tracking-[-0.035em]">
          Connectivity. Tools. Better decision-making.
        </h1>
        <p className="mt-[2.2%] font-display text-[clamp(1.1rem,2.45vw,2.95rem)] font-medium text-white/92">
          A stronger Republic—powered by proof, voice, and action.
        </p>
      </div>
    </section>
  );
}

const problemTiers = [
  ["Public Safety & Justice"],
  ["Housing & Homelessness", "Education & Workforce Dev"],
  ["Economy, Jobs & Business", "Healthcare & Mental Health", "Infrastructure & Transport"],
  [
    "Energy, Water & Environment",
    "Fiscal Responsibility & Budget",
    "Governance & Accountability",
  ],
  [
    "Technology, Innovation, Privacy & Cybersecurity",
    "Civil Rights & Quality of Life",
    "Immigration & Border",
    "Civic OS / Platform / Controls",
  ],
] as const;

function ProblemsPyramidSlide() {
  return (
    <section className="relative h-full w-full overflow-hidden text-[#f7f8f8]">

      <div className="relative mx-auto grid h-full w-[89%] grid-cols-[29%_1fr] items-center gap-[5%] py-[7%]">
        <div className="flex min-h-0 min-w-0 flex-col justify-center">
          <p className="font-display text-[clamp(.82rem,1.4vw,1.65rem)] text-[#b8c0c3]">The Problems</p>
          <h1 className="mt-2 whitespace-nowrap font-display text-[clamp(2.15rem,4.15vw,5.1rem)] font-bold leading-[.94] tracking-[-0.05em]">
            We’re Solving
          </h1>
          <div className="mt-[7%] h-px w-24 bg-[linear-gradient(90deg,#01c7f3,transparent)]" />
          <figure className="relative mt-[7%] h-[42vh] min-h-[12rem] max-h-[24rem] w-full overflow-hidden rounded-[clamp(1rem,2vw,2rem)] border border-[#9beaff]/20 bg-[#07111c] shadow-[0_25px_70px_rgba(5,20,30,0.28)]">
            <Image
              src="/mainslides/assets/ai-technology-unsplash.jpg"
              alt="Blue neon technology hardware"
              fill
              priority
              sizes="32vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,15,24,0.02),rgba(4,15,24,0.42))]" />
          </figure>
        </div>

        <div className="relative flex min-h-0 min-w-0 flex-col justify-center">
          <div className="pointer-events-none absolute bottom-[3%] left-1/2 h-[94%] w-[94%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(1,199,243,0.025),rgba(1,199,243,0.12))] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
          <div className="relative z-10 flex flex-col gap-[clamp(.4rem,1vh,.85rem)]">
            {problemTiers.map((tier, tierIndex) => (
              <div
                key={tier.join("-")}
                className="mx-auto grid w-full gap-[1.7%]"
                style={{
                  gridTemplateColumns: `repeat(${tier.length}, minmax(0, 1fr))`,
                  width: `${42 + tierIndex * 14.5}%`,
                }}
              >
                {tier.map((label, itemIndex) => (
                  <div
                    key={label}
                    className="pyramid-item-reveal flex min-h-[clamp(3.6rem,8.3vh,6.25rem)] items-center justify-center rounded-[clamp(.6rem,1vw,1rem)] border border-[#5b6d73]/55 bg-[#091114]/82 px-[4%] py-3 text-center font-display text-[clamp(.65rem,1.04vw,1.25rem)] font-medium leading-[1.18] text-[#f2f5f5] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm"
                    style={{
                      animationDelay: `${(problemTiers.slice(0, tierIndex).reduce((count, row) => count + row.length, 0) + itemIndex) * 170}ms`,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="pyramid-base-reveal relative z-10 mx-auto mt-[clamp(.5rem,1.1vh,.95rem)] flex min-h-[clamp(3.2rem,6.5vh,5rem)] w-[96%] items-center justify-center border-t border-[#18bfe3]/35 bg-[#071012]/85 px-4 py-3 text-center font-display text-[clamp(.65rem,1.12vw,1.35rem)] font-bold tracking-[0.32em] text-[#c4ced1]">
            TECHNOCRATIC NATIONALISM
          </div>
        </div>
      </div>
    </section>
  );
}

type ArchitectureNarrativeSlideProps = {
  eyebrow?: string;
  title: string;
  sectionTitle: string;
  points: readonly string[];
  takeawayLabel: string;
  takeaway: string;
  videoEmbedUrl?: string;
  onOpenVideo?: (videoEmbedUrl: string) => void;
};

function ArchitectureNarrativeSlide({
  eyebrow = "Core OS Architecture",
  title,
  sectionTitle,
  points,
  takeawayLabel,
  takeaway,
  videoEmbedUrl,
  onOpenVideo,
}: ArchitectureNarrativeSlideProps) {
  return (
    <section className="presentation-scroll relative h-full w-full overflow-y-auto text-[#f7f8f8] md:overflow-hidden">

      <div className="relative mx-auto flex min-h-full w-[92%] flex-col py-[clamp(1rem,4vh,3rem)] md:h-full md:w-[89%] md:justify-center">
        <p className="font-display text-[clamp(.7rem,min(1.25vw,2.2vh),1.45rem)] font-medium tracking-[0.08em] text-[#aebcc2]">
          {eyebrow}
        </p>
        <h1 className="mt-[clamp(.25rem,1vh,.5rem)] max-w-[96%] font-display text-[clamp(1.65rem,min(4.6vw,7vh),5.6rem)] font-bold leading-[.96] tracking-[-0.045em]">
          {title}
        </h1>
        <div className="mt-[clamp(.6rem,2vh,1.8rem)] h-px w-full bg-white/15">
          <div className="h-px w-[12%] bg-[#18bfe3]" />
        </div>

        <article className="relative mt-[clamp(.7rem,2.2vh,1.6rem)] shrink-0 overflow-hidden rounded-[clamp(.85rem,1.7vw,1.9rem)] border border-[#9beaff]/20 bg-[linear-gradient(145deg,rgba(38,58,75,0.72),rgba(14,27,39,0.9))] px-[clamp(.8rem,3.2%,2.5rem)] py-[clamp(.75rem,2.2vh,2rem)] shadow-[0_28px_75px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.72),transparent)]" />
          <h2 className="font-display text-[clamp(1rem,min(1.8vw,3vh),2.2rem)] font-semibold leading-tight text-[#eaf2f4]">
            {sectionTitle}
          </h2>

          <div className="mt-[clamp(.55rem,1.7vh,1.25rem)] divide-y divide-white/10 border-y border-white/10">
            {points.map((point, index) => (
              <div
                key={point}
                className="grid min-w-0 grid-cols-[clamp(2.4rem,5vw,4.5rem)_1fr] items-start gap-[clamp(.5rem,1.5vw,1.4rem)] py-[clamp(.55rem,1.35vh,1rem)]"
              >
                <span className="font-mono text-[clamp(.62rem,min(.9vw,1.6vh),1rem)] font-bold tracking-[0.2em] text-[#18bfe3]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-[clamp(.74rem,min(1.18vw,1.95vh),1.4rem)] leading-[1.3] text-[#d2dde1]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </article>

        <div className="relative mt-[clamp(.7rem,2.2vh,1.6rem)] shrink-0 overflow-hidden rounded-[clamp(.8rem,1.3vw,1rem)] border border-[#9beaff]/20 bg-[#071426]/78 px-[clamp(.8rem,3.2%,2.5rem)] py-[clamp(.65rem,1.5vh,1.25rem)] shadow-[0_18px_50px_rgba(0,0,0,0.2)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#18bfe3]">
          <p className="font-mono text-[clamp(.58rem,min(.8vw,1.4vh),.9rem)] font-bold tracking-[0.22em] text-[#18bfe3]">
            {takeawayLabel.toUpperCase()}
          </p>
          <p className="mt-[clamp(.3rem,.7vh,.5rem)] font-display text-[clamp(.74rem,min(1.22vw,2vh),1.48rem)] leading-[1.32] text-[#e2e9eb]">
            {takeaway}
          </p>
        </div>

        {videoEmbedUrl && onOpenVideo ? (
          <div className="mt-[clamp(.6rem,1.5vh,1.15rem)] flex shrink-0 justify-start">
            <button
              type="button"
              aria-label="Play strategic alliance video"
              onClick={() => onOpenVideo(videoEmbedUrl)}
              onKeyDown={(event) => event.stopPropagation()}
              className="flex h-11 items-center gap-2 rounded-full border border-[#9beaff]/45 bg-[#071426]/90 px-4 text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#9beaff] focus:outline-none focus:ring-2 focus:ring-[#9beaff]"
            >
              <Play className="h-4 w-4" fill="currentColor" strokeWidth={1.8} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">Play Video</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CivicOperatingSystemSlide() {
  return (
    <ArchitectureNarrativeSlide
      title="Authenticating the Future of Representation"
      sectionTitle="Phase One — A Civic Operating System That…"
      points={[
        "Verifies citizens and captures real-time sentiment.",
        "Anchors that signal on-chain as tamper-evident proof of public demand.",
        "Converts public will into lawful action—petitions, recalls, referenda, and coordinated campaigns—executed fast and cost-effectively.",
      ]}
      takeawayLabel="Outcomes"
      takeaway="Strengthened election trust via end-to-end integrity: paper ballots + secure digital rails (on-chain) + parallel audits for total transparency."
    />
  );
}

function CivicConnectivitySlide() {
  return (
    <ArchitectureNarrativeSlide
      eyebrow="Physical Infrastructure"
      title="Hard-Wired Civic Connectivity"
      sectionTitle="Anchoring the Digital Pulse into Physical Assets"
      points={[
        "AI-enabled technology anchors civic engagement in high-traffic public infrastructure—powering citizen-first media and scalable revenue verticals.",
        "By owning the hardware, we control the narrative environment.",
        "A high-margin data and advertising rail generates recurring revenue while providing a critical public service.",
      ]}
      takeawayLabel="The Goal"
      takeaway="Create a permanent, physical foundation for a new civic era—one that cannot be turned off or de-platformed by centralized interests."
    />
  );
}

function StrategicAllianceSlide({
  videoEmbedUrl,
  onOpenVideo,
}: {
  videoEmbedUrl?: string;
  onOpenVideo?: (videoEmbedUrl: string) => void;
}) {
  return (
    <ArchitectureNarrativeSlide
      title="The Strategic Alliance"
      sectionTitle="A Global Distribution Pathway to Scale"
      points={[
        "X / xAI Integration: A dual-sided alliance amplifies reach and accelerates adoption through global AI and social distribution networks.",
        "Sovereign Parallel Network: Verifiable data ensures operational continuity in contested or silenced environments—a resilient civic rail.",
      ]}
      takeawayLabel="The Bottom Line"
      takeaway="We provide the first clear path to execute lawful change at the speed of the digital age—permanently changing who gets heard and how fast public will is realized."
      videoEmbedUrl={videoEmbedUrl}
      onOpenVideo={onOpenVideo}
    />
  );
}

function GirlPage() {
  return (
    <section className="fixed inset-0 overflow-hidden bg-black">
      <article className="h-full w-full">
        <div className="relative h-full w-full">
          <Image
            src="/girlchild.webp"
            alt="Portrait of a young girl"
            fill
            sizes="(min-width: 1280px) 80vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.08),rgba(8,17,34,0.22)_46%,rgba(5,10,20,0.78)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-24 pt-24 text-center sm:px-10 sm:pb-28">
            <p className="font-display text-[2.3rem] leading-[1.15] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] sm:text-[3.1rem]">
              Good intentions do not stop predators.
              <br />
              Only uncompromising laws will.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function MagaPage() {
  return (
    <section className="fixed inset-0 overflow-hidden bg-black">
      <article className="h-full w-full">
        <div className="relative h-full w-full">
          <Image
            src="/maga.png"
            alt="Creative showing the division between MAGA and the Democratic Party"
            fill
            sizes="(min-width: 1280px) 80vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,34,0.1),rgba(8,17,34,0.18)_38%,rgba(5,10,20,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-24 pt-24 text-center sm:px-10 sm:pb-28">
            <p className="font-display text-[2.3rem] leading-[1.15] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] sm:text-[3.1rem]">
              The people demand something better.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function ManifestoStatementsPage() {
  return (
    <section className="relative flex h-full min-h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(49,76,99,0.58),transparent_42%),linear-gradient(145deg,#101b26_0%,#142330_48%,#0e1822_100%)] px-[5%] py-10">
      <Image
        src="/america-first-blueprint-v2.png"
        alt="A blueprint-inspired vision of American civic institutions, infrastructure, and precision machinery"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.24]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(184,203,218,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,203,218,0.1)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,18,36,0.08),rgba(5,14,28,0.22)_75%)]" />

      <article className="relative mx-auto w-full max-w-5xl px-7 py-9 text-center sm:px-12 sm:py-12">
        <h1 className={`${slideTitleTypography} text-[#f4f2ec]`}>
          America First Blueprint
        </h1>
        <div className="mx-auto mt-7 h-px w-36 bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.9),transparent)]" />
        <p className="mx-auto mt-7 max-w-4xl text-[1.15rem] leading-relaxed text-[#d8edf6] sm:text-[1.45rem]">
          <span aria-hidden="true">• </span>
          <ManifestoStatementText />
        </p>
      </article>
    </section>
  );
}

function PromisePage() {
  return (
    <section className="relative flex h-full flex-col overflow-hidden py-6">
      <BackgroundVoiceoverButton
        src="/voices/ThePromise.mp3"
        label="The Promise voiceover"
      />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <header className="mx-auto max-w-4xl shrink-0 text-center">
          <h1 className={`${slideTitleTypography} text-[#f4f2ec]`}>
            The Promise
          </h1>
          <div className="mx-auto mt-6 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
        </header>

        <article className="relative mx-auto mt-6 w-full max-w-7xl shrink-0 overflow-hidden rounded-[2.35rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.96),rgba(20,35,48,0.98)_46%,rgba(14,27,39,0.98))] shadow-[0_38px_100px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(143,168,189,0.14),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(1,199,243,0.11),transparent_30%),linear-gradient(115deg,rgba(255,255,255,0.04),transparent_28%,transparent_72%,rgba(1,199,243,0.035))]" />
          <div className="pointer-events-none absolute inset-x-20 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.88),transparent)]" />
          <div className="pointer-events-none absolute inset-x-28 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,168,189,0.32),transparent)]" />
          <div className="pointer-events-none absolute -left-px top-16 h-24 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/42 to-transparent" />
          <div className="pointer-events-none absolute -right-px bottom-16 h-24 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />

          <div className="relative grid md:grid-cols-3">
            {promiseItems.map((item, index) => {
              return (
                <section
                  key={item.title}
                  className={`relative flex min-h-[11rem] flex-col justify-between px-6 py-5 sm:px-8 sm:py-6 lg:px-10 ${
                    index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-start justify-end">
                    <span className="font-display text-4xl leading-none text-[#8fa8bd]/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 max-w-sm">
                    <h2 className="font-display text-[2rem] font-semibold leading-[0.98] text-[#f4f2ec] sm:text-[2.3rem] lg:text-[2.55rem]">
                      {item.title}
                    </h2>
                  </div>
                </section>
              );
            })}
          </div>
        </article>
      </div>

      <div className="mx-auto w-full max-w-7xl shrink-0 pb-1">
        <div className="mx-auto max-w-4xl space-y-1.5 rounded-[1.1rem] border border-white/10 bg-[#0f1d2a]/55 px-5 py-3">
          {promiseNotes.map((note) => (
            <p
              key={note}
              className="text-[0.78rem] leading-snug text-[#d8edf6]/75 sm:text-[0.82rem]"
            >
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderCtaPage() {
  return (
    <section className="flex min-h-full items-center justify-center py-8">
      <article className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(230,236,243,0.9))] px-8 py-12 text-center shadow-[0_24px_60px_rgba(59,88,129,0.14)] sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 bg-gradient-to-r from-transparent via-white/65 to-transparent blur-2xl" />
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-graphite">
          CTA
        </p>
        <h2 className="mt-5 font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
          Call to action
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-graphite sm:text-lg">
          We will add content here later.
        </p>
      </article>
    </section>
  );
}

function AgendaPage() {
  return (
    <section className="flex h-full flex-col items-center justify-center text-center">
      <header className="mx-auto max-w-3xl">
        <h1 className={`${slideTitleTypography} text-[#f4f2ec]`}>
          Our Agenda
        </h1>
        <div className="mx-auto mt-4 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />
      </header>

      <div className="relative mt-6 w-full max-w-4xl overflow-hidden rounded-[2.15rem] bg-[linear-gradient(145deg,rgba(38,58,75,0.94),rgba(20,35,48,0.97)_50%,rgba(14,27,39,0.97))] px-5 py-5 text-left shadow-[0_34px_90px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(1,199,243,0.15),transparent_45%),linear-gradient(115deg,rgba(255,255,255,0.04),transparent_30%,transparent_70%,rgba(1,199,243,0.035))]" />
        <div className="pointer-events-none absolute inset-x-20 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.82),transparent)]" />
        <div className="pointer-events-none absolute -left-px top-8 h-16 w-px bg-gradient-to-b from-transparent via-[#01c7f3]/42 to-transparent" />
        <div className="pointer-events-none absolute -right-px bottom-8 h-16 w-px bg-gradient-to-b from-transparent via-[#8fa8bd]/35 to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <ol className="space-y-2">
            {agendaItems.map((item, index) => (
              <li
                key={item.title}
                className="grid grid-cols-[2rem_1fr] items-start gap-3 border-b border-white/8 pb-2"
              >
                <span className="pt-1 text-right text-[0.74rem] font-semibold text-[#6f8798]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[1.05rem] leading-[1.08] text-[#f4f2ec] sm:text-[1.22rem] lg:text-[1.35rem]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-5 text-[#b8ccd7] sm:text-[0.86rem]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function VoiceoverPlayer({
  src,
  eyebrow,
  title,
}: {
  src: string;
  eyebrow: string;
  title: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => pauseWhenAnotherAudioStarts(audioRef), []);

  const initializeAudioVisualizer = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);

      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      audioSourceRef.current = source;
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    const canvasContext = canvas?.getContext("2d");
    if (!canvas || !canvasContext) return;

    const frequencyData = new Uint8Array(64);
    let animationFrame = 0;

    const drawVisualizer = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(bounds.width * pixelRatio));
      const pixelHeight = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      canvasContext.clearRect(0, 0, bounds.width, bounds.height);

      const analyser = analyserRef.current;
      if (analyser) {
        analyser.getByteFrequencyData(frequencyData);
      } else {
        frequencyData.fill(0);
      }

      const barCount = 42;
      const gap = 2.5;
      const barWidth = Math.max(1.5, (bounds.width - gap * (barCount - 1)) / barCount);
      const centerY = bounds.height / 2;
      const maxBarHeight = bounds.height * 0.78;
      const gradient = canvasContext.createLinearGradient(0, 0, bounds.width, 0);
      gradient.addColorStop(0, "rgba(91, 176, 211, 0.5)");
      gradient.addColorStop(0.48, "rgba(155, 234, 255, 0.98)");
      gradient.addColorStop(1, "rgba(1, 199, 243, 0.58)");
      canvasContext.fillStyle = gradient;
      canvasContext.globalAlpha = isPlaying ? 1 : 0.42;

      for (let index = 0; index < barCount; index += 1) {
        const frequencyIndex = Math.min(
          frequencyData.length - 1,
          Math.floor((index / barCount) * frequencyData.length * 0.72),
        );
        const frequencyLevel = frequencyData[frequencyIndex] / 255;
        const idleLevel = 0.055 + Math.sin(index * 0.72) * 0.018;
        const level = isPlaying ? Math.max(0.07, frequencyLevel) : idleLevel;
        const barHeight = Math.max(2, maxBarHeight * level);
        const x = index * (barWidth + gap);

        canvasContext.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
      }

      canvasContext.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isPlaying, src]);

  useEffect(() => {
    return () => {
      audioSourceRef.current?.disconnect();
      analyserRef.current?.disconnect();

      const audioContext = audioContextRef.current;
      if (audioContext && audioContext.state !== "closed") {
        void audioContext.close();
      }
    };
  }, []);

  const toggleVoiceover = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    claimExclusiveAudioPlayback(audio);

    try {
      await initializeAudioVisualizer();
    } catch {
      // Keep voiceover playback available if Web Audio is unavailable.
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seekVoiceover = (value: string) => {
    const audio = audioRef.current;
    const nextTime = Number(value);

    if (!audio || !Number.isFinite(nextTime)) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[1.7rem] border border-[#01c7f3]/45 bg-[linear-gradient(145deg,rgba(15,29,42,0.92),rgba(10,20,31,0.96))] p-4 text-left shadow-[0_18px_48px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm sm:p-5">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,234,255,0.9),transparent)]" />
        <div className="relative flex items-center gap-4">
          <button
            type="button"
            aria-label={isPlaying ? `Pause ${title} voiceover` : `Play ${title} voiceover`}
            onClick={toggleVoiceover}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#01c7f3]/65 bg-[#15283a] text-[#b9f2ff] shadow-[0_14px_34px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-0.5 hover:border-[#01c7f3] hover:bg-[#1a3349]"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" strokeWidth={2.4} />
            ) : (
              <Play className="ml-0.5 h-5 w-5" strokeWidth={2.4} />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8ecfe1]">
                  {eyebrow}
                </p>
                <p className="mt-1 truncate font-display text-[1.35rem] leading-none text-[#f4f2ec]">
                  {title}
                </p>
              </div>
              <Volume2 className="hidden h-5 w-5 shrink-0 text-[#8fa8bd] sm:block" strokeWidth={2.1} />
            </div>

            <div className="mt-4">
              <div className="relative mb-3 h-12 overflow-hidden rounded-xl border border-[#01c7f3]/20 bg-[linear-gradient(180deg,rgba(1,199,243,0.055),rgba(4,13,22,0.36))] px-2">
                <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px bg-[#9beaff]/10" />
                <canvas
                  ref={visualizerCanvasRef}
                  aria-hidden="true"
                  className="relative h-full w-full"
                />
              </div>
              <input
                type="range"
                aria-label={`${title} voiceover progress`}
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || currentTime)}
                onChange={(event) => seekVoiceover(event.target.value)}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#274257] accent-[#01c7f3]"
              />
              <div className="mt-2 flex items-center justify-between font-mono text-[0.72rem] text-[#8fa8bd]">
                <span>{formatAudioTime(currentTime)}</span>
                <span>{formatAudioTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPause={() => setIsPlaying(false)}
        onPlay={(event) => {
          claimExclusiveAudioPlayback(event.currentTarget);
          setIsPlaying(true);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
    </div>
  );
}

function SectionTitleSlide({
  title,
  voiceoverSrc,
  introVoiceoverSrc,
  bottomCopy,
}: {
  title: string;
  voiceoverSrc?: string;
  introVoiceoverSrc?: string;
  bottomCopy?: ReactNode;
}) {
  return (
    <section className="flex min-h-full flex-col justify-center py-6">
      {introVoiceoverSrc ? (
        <BackgroundVoiceoverButton
          src={introVoiceoverSrc}
          label={`${title} introduction`}
        />
      ) : null}
      <header className="mx-auto w-full max-w-4xl text-center">
        <h1 className={`${slideTitleTypography} text-[#f4f2ec]`}>
          {title}
        </h1>
        <div className="mx-auto mt-6 h-px w-40 bg-[linear-gradient(90deg,transparent,rgba(1,199,243,0.78),transparent)]" />

        {voiceoverSrc ? (
          <div className="mx-auto mt-9 w-full max-w-xl">
            <VoiceoverPlayer
              src={voiceoverSrc}
              eyebrow="Manifesto Preview"
              title="Project 2026"
            />
          </div>
        ) : null}
      </header>
      {bottomCopy ? (
        <div className="absolute inset-x-0 bottom-10 px-6 text-center sm:bottom-12">
          <div className="mx-auto max-w-xl text-[#c9dce7]">{bottomCopy}</div>
        </div>
      ) : null}
    </section>
  );
}

export function LibraryPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeVideoEmbedUrl, setActiveVideoEmbedUrl] = useState<string | null>(null);
  const [hasResolvedInitialHash, setHasResolvedInitialHash] = useState(false);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const operatingSystemPage = 19;
  const mainDeckStartPage = operatingSystemPage + 1;
  const howPage = mainDeckStartPage + mainDeckSlides.length;
  const project2026Page = howPage + 1;
  const ipoStrategyPage = project2026Page + 1;
  const strategyMapIntroPage = project2026Page + 2;
  const blackSwanPage = project2026Page + 3;
  const strategyMapContentPage = project2026Page + 4;
  const preCtaStartPage = project2026Page + 5;
  const finalTechnocratsPage = preCtaStartPage + preCtaSlides.length;
  const mainDeckSlideIndex = currentPage - mainDeckStartPage;
  const preCtaSlideIndex = currentPage - preCtaStartPage;
  const totalPages = finalTechnocratsPage + 1;
  const isFullScreenStatementSlide = currentPage === 3 || currentPage === 7;
  const isManifestoSlide = currentPage === 8;
  const isPromiseSlide = currentPage === 9;
  const isProblemsSlide = currentPage === 11;
  const isLivingWithPurposeSlide = currentPage === 16;
  const isRelocatedAgendaSlide = currentPage === 10;
  const isTicMicPieSlide = currentPage === 12;
  const isYearVideoSlide = currentPage === 13;
  const isInsertedTechnocratsSlide = currentPage === 14;
  const isTechnocratsSlide = currentPage === finalTechnocratsPage;
  const isArchitecturePillarsSlide = currentPage === 17;
  const isIntroVideoSlide = currentPage === 18;
  const isOperatingSystemSlide = currentPage === operatingSystemPage;
  const isMainDeckImageSlide =
    mainDeckSlideIndex >= 0 && mainDeckSlideIndex < mainDeckSlides.length;
  const isIpoStrategySlide = currentPage === ipoStrategyPage;
  const isBlackSwanSlide = currentPage === blackSwanPage;
  const isStrategyMapIntroSlide = currentPage === strategyMapIntroPage;
  const isStrategyMapContentSlide = currentPage === strategyMapContentPage;
  const isStrategyMapSlide = isStrategyMapIntroSlide || isStrategyMapContentSlide;
  const isPreCtaSlide =
    preCtaSlideIndex >= 0 && preCtaSlideIndex < preCtaSlides.length;
  const isCameraOpeningSlide =
    currentPage <= 6 ||
    isFullScreenStatementSlide ||
    isManifestoSlide ||
    isPromiseSlide ||
    isRelocatedAgendaSlide ||
    isTicMicPieSlide ||
    isYearVideoSlide ||
    isInsertedTechnocratsSlide ||
    isTechnocratsSlide ||
    currentPage === 15 ||
    isLivingWithPurposeSlide ||
    isArchitecturePillarsSlide ||
    isIntroVideoSlide ||
    isOperatingSystemSlide ||
    isMainDeckImageSlide ||
    currentPage === howPage ||
    (currentPage >= project2026Page && currentPage <= ipoStrategyPage) ||
    isBlackSwanSlide ||
    isPreCtaSlide;

  useEffect(() => {
    const applyHashPage = () => {
      const page = getPageFromHash(window.location.hash, totalPages);

      if (typeof page === "number") {
        setCurrentPage(page);
      }

      setHasResolvedInitialHash(true);
    };

    applyHashPage();
    window.addEventListener("hashchange", applyHashPage);
    return () => window.removeEventListener("hashchange", applyHashPage);
  }, [totalPages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeVideoEmbedUrl) {
        if (event.key === "Escape") {
          setActiveVideoEmbedUrl(null);
        }
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        setCurrentPage((page) => Math.min(page + 1, totalPages - 1));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setCurrentPage((page) => Math.max(page - 1, 0));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideoEmbedUrl, totalPages]);

  useEffect(() => {
    pageContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    if (!hasResolvedInitialHash) {
      return;
    }

    const nextHash = `#page-${currentPage + 1}`;

    if (namedHashMatchesPage(window.location.hash, currentPage)) {
      return;
    }

    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [currentPage, hasResolvedInitialHash]);

  useEffect(() => {
    document.documentElement.dataset.resourcesTone = isCameraOpeningSlide
      ? "dark"
      : "light";

    return () => {
      delete document.documentElement.dataset.resourcesTone;
    };
  }, [isCameraOpeningSlide]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isCameraOpeningSlide
          ? "bg-[radial-gradient(circle_at_50%_-10%,rgba(49,76,99,0.58),transparent_42%),linear-gradient(145deg,#101b26_0%,#142330_48%,#0e1822_100%)]"
          : "bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 [background-position:center_center] [background-size:28px_28px] ${
          isCameraOpeningSlide
            ? "opacity-20 [background-image:linear-gradient(rgba(184,203,218,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,203,218,0.08)_1px,transparent_1px)]"
            : "opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 ${
          isCameraOpeningSlide
            ? "bg-[linear-gradient(180deg,rgba(143,168,189,0.08),transparent)]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 ${
          isCameraOpeningSlide
            ? "bg-[linear-gradient(0deg,rgba(0,0,0,0.16),transparent)]"
            : "bg-[linear-gradient(0deg,rgba(92,108,123,0.08),transparent)]"
        }`}
      />

      <main
        className={`relative z-10 mx-auto flex h-[100dvh] max-w-none flex-col ${
          isStrategyMapSlide || isMainDeckImageSlide || isManifestoSlide
            ? "w-full px-0 py-0"
            : "w-[90%] px-6 py-10 sm:px-10 lg:px-14"
        }`}
      >
        <div
          ref={pageContainerRef}
          className={
            isStrategyMapSlide ||
            isManifestoSlide ||
            isPromiseSlide ||
            isProblemsSlide ||
            isLivingWithPurposeSlide ||
            isYearVideoSlide ||
            isTicMicPieSlide ||
            isArchitecturePillarsSlide ||
            isIntroVideoSlide ||
            isRelocatedAgendaSlide ||
            isBlackSwanSlide ||
            isIpoStrategySlide ||
            isOperatingSystemSlide ||
            isMainDeckImageSlide ||
            isStrategyMapIntroSlide ||
            isInsertedTechnocratsSlide ||
            isTechnocratsSlide ||
            isPreCtaSlide
              ? "presentation-scroll min-h-0 flex-1 overflow-hidden"
              : "presentation-scroll min-h-0 flex-1 overflow-y-auto pb-24 pt-24 pr-1 md:pb-28 md:pt-28 md:pr-2"
          }
        >
          {currentPage === 0 ? (
            <SectionTitleSlide
              title="1776 - 2026"
              introVoiceoverSrc="/voices/slide1.mp3"
              bottomCopy={
                <>
                  <p className="font-display text-[1.1rem] leading-tight text-[#f4f2ec] sm:text-[1.35rem]">
                    250 Years
                  </p>
                  <p className="mt-1 font-display text-[1.1rem] leading-tight text-[#f4f2ec] sm:text-[1.35rem]">
                    Does ‘We the People’ still rule?
                  </p>
                </>
              }
            />
          ) : currentPage === 1 ? (
            <SectionTitleSlide
              title="DOGE"
              introVoiceoverSrc="/voices/Slide3.mp3"
              bottomCopy={
                <>
                  <p className="font-display text-[1.1rem] leading-tight text-[#f4f2ec] sm:text-[1.35rem]">
                    The Goal Isn’t to Catch Fraud Faster
                  </p>
                  <p className="mt-1 font-display text-[1.1rem] leading-tight text-[#f4f2ec] sm:text-[1.35rem]">
                    The goal is to make fraud physically impossible.
                  </p>
                </>
              }
            />
          ) : currentPage === 2 ? (
            <SectionTitleSlide title="The Children" />
          ) : currentPage === 3 ? (
            <GirlPage />
          ) : currentPage === 4 ? (
            <QuestionSlide question={openingQuestions[1]} />
          ) : currentPage === 5 ? (
            <FullScreenFlagSlide src="/flag1.webm" />
          ) : currentPage === 6 ? (
            <QuestionSlide
              question={openingQuestions[0]}
              videoEmbedSrc="https://www.youtube.com/embed/LlgTzWlrCAw"
              videoTitle="Feeling hopeful about the future"
            />
          ) : currentPage === 7 ? (
            <MagaPage />
          ) : currentPage === 8 ? (
            <ManifestoStatementsPage />
          ) : currentPage === 9 ? (
            <PromisePage />
          ) : currentPage === 10 ? (
            <AgendaPage />
          ) : currentPage === 11 ? (
            <section className="relative flex h-full flex-col overflow-hidden py-8">
              <BackgroundVoiceoverButton
                src="/voices/Problems.mp3"
                label="Problems voiceover"
              />

              <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
                <header className="mx-auto max-w-3xl shrink-0 text-center">
                  <h1 className={`${slideTitleTypography} text-ink`}>
                    Problems
                  </h1>
                </header>
                <section
                  key={currentPage}
                  className="mt-10 grid w-full shrink-0 gap-5 md:grid-cols-2 xl:grid-cols-6"
                >
                  {deckPages[0].map((deck) => (
                    <DeckCard
                      key={deck.href}
                      deck={deck}
                      onOpenVideo={setActiveVideoEmbedUrl}
                    />
                  ))}
                </section>
              </div>

              <div className="mx-auto w-full max-w-7xl shrink-0 pb-1">
                <div className="mx-auto max-w-4xl space-y-1.5 rounded-[1.1rem] border border-ink/10 bg-white/60 px-5 py-3 backdrop-blur-sm">
                  {problemsNotes.map((note) => (
                    <p
                      key={note}
                      className="text-[0.78rem] leading-snug text-graphite sm:text-[0.82rem]"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ) : currentPage === 12 ? (
            <TicMicPieSlide />
          ) : currentPage === 13 ? (
            <YearVideoSlide />
          ) : currentPage === 14 ? (
            <TechnocratsSlide
              figures={post2010TechnocratFigures}
              frameworkSequence
              voiceoverSrc="/voices/Technocrats_01.mp3"
            />
          ) : currentPage === 15 ? (
            <GeorgeSorosVideoSlide />
          ) : currentPage === 16 ? (
            <LivingWithPurposeSlide />
          ) : currentPage === 17 ? (
            <ArchitecturePillarsSlide />
          ) : currentPage === 18 ? (
            <IntroVideoSlide />
          ) : isOperatingSystemSlide ? (
            <SectionTitleSlide title="Operating System" />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 0 ? (
            <ViralFusionEarthSlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 1 ? (
            <FounderQuoteSlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 2 ? (
            <MissionVisionSlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 3 ? (
            <ProblemsPyramidSlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 4 ? (
            <SimpleRepublicSlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 5 ? (
            <CivicOperatingSystemSlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 6 ? (
            <CivicConnectivitySlide />
          ) : isMainDeckImageSlide && mainDeckSlideIndex === 7 ? (
            <StrategicAllianceSlide
              videoEmbedUrl={vf8VideoEmbedUrl}
              onOpenVideo={setActiveVideoEmbedUrl}
            />
          ) : isMainDeckImageSlide ? (
            <MainDeckImageSlide
              src={mainDeckSlides[mainDeckSlideIndex]!}
              index={mainDeckSlideIndex}
              videoEmbedUrl={
                mainDeckSlides[mainDeckSlideIndex] === "/mainslides/VF8.jpg"
                  ? vf8VideoEmbedUrl
                  : undefined
              }
              onOpenVideo={setActiveVideoEmbedUrl}
            />
          ) : currentPage === howPage ? (
            <SectionTitleSlide title="Our Playbook" />
          ) : currentPage === project2026Page ? (
            <SectionTitleSlide
              title="Project 2026"
              voiceoverSrc="/project-2026-nrusa%20copy%202.mp3"
              introVoiceoverSrc="/project2026intro.mp3"
            />
          ) : currentPage === ipoStrategyPage ? (
            <IpoStrategySlide />
          ) : currentPage === strategyMapIntroPage ? (
            <StrategyMapIntroSlide label="" />
          ) : currentPage === blackSwanPage ? (
            <BlackSwanSlide />
          ) : currentPage === strategyMapContentPage ? (
            <section className="presentation-scroll h-full w-full overflow-y-auto px-4 py-8 md:px-6">
              <StrategyMapContent />
            </section>
          ) : isPreCtaSlide && preCtaSlideIndex === 2 ? (
            <MuskAllianceVideoSlide />
          ) : isPreCtaSlide ? (
            <SectionTitleSlide title={preCtaSlides[preCtaSlideIndex]} />
          ) : currentPage === finalTechnocratsPage ? (
            <TechnocratsSlide
              figures={elonFocusTechnocratFigures}
              elonFocusSequence
              voiceoverSrc="/slide-19-voiceover.mp3"
              voiceoverDelayMs={3000}
            />
          ) : (
            <PlaceholderCtaPage />
          )}
        </div>
      </main>

      {activeVideoEmbedUrl ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Embedded video"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07101a]/88 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setActiveVideoEmbedUrl(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/20 bg-black shadow-[0_36px_120px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActiveVideoEmbedUrl(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/65 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
            >
              <X size={20} strokeWidth={2.2} />
            </button>
            <div className="aspect-video">
              <iframe
                src={activeVideoEmbedUrl}
                title="Beneath the Noise"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full px-2 py-1.5 shadow-deck md:bottom-8 md:right-8 ${
          isCameraOpeningSlide
            ? "border border-white/10 bg-[#172534]/92"
            : "border border-line bg-white/92"
        }`}
      >
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
          disabled={currentPage === 0}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 ${
            isCameraOpeningSlide
              ? "border-white/10 bg-white/5 text-[#f4f2ec] hover:border-[#01c7f3]/65"
              : "border-line bg-white text-ink hover:border-accent"
          }`}
        >
          <ChevronLeft size={17} strokeWidth={2.1} />
        </button>
        <div
          className={`min-w-16 px-2 text-center text-[0.72rem] font-semibold tabular-nums tracking-[0.16em] ${
            isCameraOpeningSlide ? "text-[#d8edf6]" : "text-graphite"
          }`}
          aria-live="polite"
        >
          {currentPage + 1}/{totalPages}
        </div>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 ${
            isCameraOpeningSlide
              ? "border-white/10 bg-white/5 text-[#f4f2ec] hover:border-[#01c7f3]/65"
              : "border-line bg-white text-ink hover:border-accent"
          }`}
        >
          <ChevronRight size={17} strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}
