import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Flame, Car, Heart, Cpu, ShieldCheck,
  Building2, UserCheck, Users, ScrollText,
  MapPin, Megaphone, Lock, Target, CalendarClock,
  Handshake, Rocket, Network, Shield, Radio,
} from "lucide-react";

// ─── Data types ──────────────────────────────────────────────────────────────

type Industry = {
  name: string;
  lead: string;
  orgs: string[];
  policies: number;
  icon: LucideIcon;
};

type FlowRow =
  | { type: "pair"; left: string; right: string; leftIcon?: LucideIcon; rightIcon?: LucideIcon }
  | { type: "single"; text: string; highlight?: boolean; icon?: LucideIcon };

type Phase = {
  number: number;
  title: string;
  subtitle?: string;
  industries?: Industry[];
  goals?: string;
  descriptions?: string[];
  totalPolicies?: number;
  flowRows?: FlowRow[];
  summary?: string;
  targetCompletion?: string;
};

type RailConfig = {
  labels: string[];
  className?: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    number: 1,
    title: "Strategic Multi-Industry Legislative Alignment",
    subtitle:
      "Aligning industry-specific priorities into a coordinated legislative package that creates force multiplication at scale.",
    industries: [
      { name: "Oil & Gas",  lead: "Chevron",                      orgs: ["WSPA", "CIPA"],          policies: 4, icon: Flame      },
      { name: "Automotive", lead: "Ford",                          orgs: ["Major Manufacturers"],   policies: 2, icon: Car        },
      { name: "Medical",    lead: "Cancer Treatment & Insurance",  orgs: ["Aligned Organizations"], policies: 3, icon: Heart      },
      { name: "Technology", lead: "Confidential",                  orgs: ["Aligned Organizations"], policies: 3, icon: Cpu        },
      { name: "Insurance",  lead: "Home, Bus. & Auto",             orgs: ["Aligned Organizations"], policies: 3, icon: ShieldCheck },
    ],
    goals:
      "Create the most durable policy possible — structured for long-term stability, protected for a defined duration, and amendable only by a vote of the people.",
    targetCompletion: "Timed to support a December 2026 legislative roll-out.",
  },
  {
    number: 2,
    title: "Narrative and Policy Insulation",
    descriptions: [
      "A coordinated sequence of public-interest policies launched alongside the Phase 1 package to broaden the scope of public discussion and reduce concentrated attention on any single policy. The Strategy is intended to shape a wider narrative environment and provide strategic cover for the core initiatives advanced during Phase 1.",
    ],
    totalPolicies: 15,
    targetCompletion: "Timed to support a December 2026 legislative roll-out.",
  },
  {
    number: 3,
    title: "Media Rail Deployment Across High-Traffic Public Locations",
    flowRows: [
      { type: "pair",   left: ">5,000 Locations", right: "Targeted Marketing",                                    leftIcon: MapPin,   rightIcon: Megaphone },
      { type: "single", text: "Est. Reach: 60% of California's Voters Every Week",                                icon: Users                              },
      { type: "single", text: "LTA Secures High-Efficiency, Low-Cost, Petition Signature Hubs", highlight: true,  icon: Lock                               },
    ],
    summary:
      "Controlled distribution, direct public reach, narrative control at scale, and thousands of locations to onboard users, support signature drives, and enable the transition to a technology-driven policy model.",
  },
];

// ─── Design tokens ────────────────────────────────────────────────────────────

const BLUE_LINE = "#7a9adb";
const BLUE_DEEP = "#4d73c6";

const PHASE_ICONS: Record<number, LucideIcon> = {
  1: Network,
  2: Shield,
  3: Radio,
  4: Handshake,
};

const PHASE_RAILS: Record<number, RailConfig> = {
  1: {
    labels: ["START", "FORM\nALLIANCES", "DRAFT\nPOLICY"],
    className: "top-10 bottom-12",
  },
  2: {
    labels: ["PROTECT\nPOLICY", "CREATE\nNOISE"],
    className: "top-10 bottom-14",
  },
  3: {
    labels: ["DEPLOY\nMEDIA\nRAILS", "SECURE\nLTAs"],
    className: "top-12 bottom-12",
  },
};

// ─── Shared primitives ───────────────────────────────────────────────────────

function GradientDivider() {
  return (
    <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(17,22,28,0.14)_20%,rgba(17,22,28,0.14)_80%,transparent)]" />
  );
}

function MilestoneBubble({ label, variant = "blue" }: { label: string; variant?: "blue" | "red" }) {
  const isRed = variant === "red";
  return (
    <div className="relative z-10 flex h-[7.6rem] w-[7.6rem] items-center justify-center">
      <div className={`absolute -inset-[5px] rounded-full border ${isRed ? "border-[#96281b]/18" : "border-[#2a54a4]/18"}`} />
      <div className={`absolute inset-0 rounded-full ${isRed ? "bg-[linear-gradient(155deg,#e05c4e_0%,#c0392b_55%,#96281b_100%)] shadow-[0_16px_38px_rgba(150,40,27,0.28)]" : "bg-[linear-gradient(155deg,#6f98e8_0%,#3f6fc8_55%,#2a54a4_100%)] shadow-[0_16px_38px_rgba(47,92,174,0.22)]"}`} />
      <div className="absolute inset-[4px] rounded-full border border-white/18 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.28),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]" />
      <div className={`relative flex h-[6rem] w-[6rem] items-center justify-center rounded-full px-3 text-center ${isRed ? "border border-[#7a1c0e]/55 bg-[radial-gradient(circle_at_50%_28%,#f08070_0%,#e04030_36%,#c0392b_72%,#96281b_100%)]" : "border border-[#24488f]/55 bg-[radial-gradient(circle_at_50%_28%,#95b7f3_0%,#6f96e6_36%,#4472cb_72%,#345db1_100%)]"}`}>
        <p className={`whitespace-pre-line text-[0.82rem] font-semibold uppercase leading-[1.06] tracking-[0.03em] ${isRed ? "text-white" : "text-[#08111c]"}`}>
          {label}
        </p>
      </div>
    </div>
  );
}

function MilestoneRail({
  labels,
  className = "top-10 bottom-10",
}: RailConfig) {
  return (
    <div
      className={`pointer-events-none absolute left-[-8.35rem] hidden w-32 flex-col items-center xl:flex ${className}`}
      aria-hidden="true"
    >
      <div className="absolute bottom-8 left-1/2 top-8 w-[4px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(122,154,219,0.08),#6b93e1_16%,#456dc2_84%,rgba(122,154,219,0.08))]" />
      <div className="absolute bottom-8 left-1/2 top-8 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(106,145,226,0.2),transparent_70%)]" />
      {labels.map((label, index) => (
        <div key={label} className="flex h-full flex-col items-center">
          <MilestoneBubble label={label} />
          {index < labels.length - 1 ? (
            <div className="my-2.5 w-[3px] flex-1 rounded-full bg-transparent" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PhaseLabel({ number }: { number: number }) {
  return (
    <div className="mb-2 rounded-full bg-[linear-gradient(135deg,#7a9adb,#c4d3f0)] p-[1.5px] shadow-[0_4px_20px_rgba(77,115,198,0.18)]">
      <div className="flex items-center gap-2 rounded-full bg-white px-5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#7a9adb,#4d73c6)]" />
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-graphite">
          Phase {String(number).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

function PhaseHeader({ number, title, subtitle }: { number: number; title: string; subtitle?: string }) {
  const Icon = PHASE_ICONS[number];
  return (
    <div className="mb-8 flex flex-col items-center gap-3">
      <PhaseLabel number={number} />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white/95 px-8 py-3.5 shadow-deck">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/30 to-transparent" />
        <div className="flex items-center justify-center gap-3">
          {Icon && <Icon size={18} className="text-[#4d73c6]/60" strokeWidth={1.8} />}
          <h2 className="text-center font-display text-[1.45rem] font-bold text-ink md:text-[1.85rem]">
            {title}
          </h2>
        </div>
      </div>
      {subtitle ? (
        <p className="mt-1 text-center text-sm leading-relaxed text-mist md:text-[0.95rem] whitespace-nowrap">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TargetRow({ value }: { value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <CalendarClock size={13} className="text-graphite" strokeWidth={1.8} />
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-graphite">
        Target Completion
      </p>
      <div className="h-3.5 w-px bg-line" />
      <div className="rounded-full border border-[#4d73c6]/25 bg-white/95 px-5 py-1.5 shadow-sm">
        <p className="text-[0.82rem] font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

// ─── Phase 1 — industry table ─────────────────────────────────────────────────

function LeadBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl border border-[#345aa1]/35 bg-[linear-gradient(160deg,#648cdd,#4260b8)] px-4 py-3 text-center shadow-[0_6px_18px_rgba(77,115,198,0.28)]">
      <p className="text-[0.82rem] font-semibold uppercase leading-snug tracking-[0.07em] text-white/95">
        {children}
      </p>
    </div>
  );
}

function OrgChip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full border border-ink/12 bg-white/85 px-3 py-1 text-center shadow-sm">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-graphite">
        {children}
      </p>
    </div>
  );
}

function IndustryBox({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-ink/10 bg-white/85 px-4 py-3 text-center shadow-[0_4px_16px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      {Icon && <Icon size={14} className="mx-auto mb-1.5 text-[#4d73c6]" strokeWidth={1.8} />}
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink">
        {children}
      </p>
    </div>
  );
}

function RowLabel({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="flex items-center gap-2">
      <div className="mr-1 h-full w-[2px] self-stretch rounded-full bg-gradient-to-b from-[#4d73c6]/30 to-transparent" />
      {Icon && <Icon size={13} className="shrink-0 text-[#4d73c6]/70" strokeWidth={1.8} />}
      <p className="text-[0.78rem] font-semibold leading-snug text-ink">{children}</p>
    </div>
  );
}

function IndustryTablePhase({ phase }: { phase: Phase }) {
  const industries = phase.industries!;
  const colCount = industries.length;
  const lineWidthPct = `${((colCount - 1) / colCount) * 100}%`;

  return (
    <>
      {/* Connecting tree lines */}
      <div className="flex w-full">
        <div className="w-36 shrink-0" />
        <div className="flex flex-1 flex-col items-center">
          <div className="h-6 w-[2px] bg-gradient-to-b from-[#4d73c6] to-[#7a9adb]" />
          <div className="mx-auto h-[2px] bg-[#7a9adb]" style={{ width: lineWidthPct }} />
          <div className="mx-auto flex justify-between" style={{ width: lineWidthPct }}>
            {industries.map((ind) => (
              <div key={ind.name} className="h-5 w-[2px] bg-[#7a9adb]" />
            ))}
          </div>
        </div>
      </div>

      {/* Data grid */}
      <div
        className="grid gap-x-3 gap-y-4"
        style={{ gridTemplateColumns: `9rem repeat(${colCount}, 1fr)` }}
      >
        <RowLabel icon={Building2}>Industries</RowLabel>
        {industries.map((ind) => (
          <div key={`ind-${ind.name}`} className="flex justify-center">
            <IndustryBox icon={ind.icon}>{ind.name}</IndustryBox>
          </div>
        ))}

        <RowLabel icon={UserCheck}>
          George Partsch IV
          <br />
          <span className="font-normal text-mist">– Lead Facilitator</span>
        </RowLabel>
        {industries.map((ind) => (
          <div key={`lead-${ind.name}`} className="flex items-stretch justify-center">
            <LeadBox>{ind.lead}</LeadBox>
          </div>
        ))}

        <RowLabel icon={Users}>Orgs. Served</RowLabel>
        {industries.map((ind) => (
          <div key={`orgs-${ind.name}`} className="flex flex-wrap items-center justify-center gap-1.5">
            {ind.orgs.map((org) => (
              <OrgChip key={org}>{org}</OrgChip>
            ))}
          </div>
        ))}

        <RowLabel icon={ScrollText}>
          Est. Number
          <br />
          of Policies
        </RowLabel>
        {industries.map((ind) => (
          <div key={`pol-${ind.name}`} className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4d73c6]/25 bg-white shadow-sm">
              <span className="text-sm font-medium text-ink">{ind.policies}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Goals + Target */}
      <div className="mt-8 space-y-3">
        {phase.goals ? (
          <div className="relative overflow-hidden rounded-2xl border border-ink/8 bg-white px-10 py-7 text-center shadow-[0_4px_24px_rgba(17,22,28,0.07)]">
            <div className="mx-auto mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4d73c6]/30" />
              <div className="flex items-center gap-1.5">
                <Target size={12} className="text-[#4d73c6]" strokeWidth={2} />
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[#4d73c6]">Goals</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4d73c6]/30" />
            </div>
            <p className="text-sm leading-relaxed text-ink">{phase.goals}</p>
          </div>
        ) : null}
        {phase.targetCompletion ? <TargetRow value={phase.targetCompletion} /> : null}
      </div>
    </>
  );
}

// ─── Phase 2 — description cards ─────────────────────────────────────────────

function SummaryPhase({ phase }: { phase: Phase }) {
  return (
    <>
      {phase.descriptions && phase.descriptions.length > 0 ? (
        <div className="mb-7 space-y-3">
          {phase.descriptions.map((desc, i) => (
            <article
              key={i}
              className="relative overflow-hidden rounded-2xl border border-line bg-white/90 px-8 py-5 shadow-sm"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4d73c6]/40 to-transparent" />
              <p className="text-center text-sm leading-relaxed text-ink">{desc}</p>
            </article>
          ))}
        </div>
      ) : null}

      {phase.totalPolicies !== undefined ? (
        <div className="mb-7 flex items-center justify-center gap-4">
          <ScrollText size={13} className="text-graphite" strokeWidth={1.8} />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-graphite">
            Est. Number of Policies
          </p>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4d73c6]/30 bg-white shadow-[0_4px_16px_rgba(77,115,198,0.12)]">
            <span className="font-display text-xl font-medium text-ink">{phase.totalPolicies}</span>
          </div>
        </div>
      ) : null}

      {phase.targetCompletion ? <TargetRow value={phase.targetCompletion} /> : null}
    </>
  );
}

// ─── Phase 3 — flowchart diagram ──────────────────────────────────────────────

const CONNECTOR_W = "16rem";

function FlowBox({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="relative min-w-[11rem] overflow-hidden rounded-xl border border-ink/10 bg-white/85 px-6 py-3.5 text-center shadow-[0_4px_16px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      {Icon && <Icon size={14} className="mx-auto mb-1.5 text-[#4d73c6]" strokeWidth={1.8} />}
      <p className="text-sm font-medium text-ink">{children}</p>
    </div>
  );
}

function WideFlowBox({ children, highlight, icon: Icon }: { children: ReactNode; highlight?: boolean; icon?: LucideIcon }) {
  if (highlight) {
    return (
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border-2 border-[#345aa1]/60 bg-[linear-gradient(160deg,#5a7fd4,#3d5faa)] px-8 py-4 text-center shadow-[0_6px_20px_rgba(77,115,198,0.35)]">
        {Icon && <Icon size={15} className="mx-auto mb-2 text-white/80" strokeWidth={1.8} />}
        <p className="text-sm font-semibold text-white">{children}</p>
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-ink/10 bg-white/85 px-8 py-4 text-center shadow-[0_4px_16px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      {Icon && <Icon size={14} className="mx-auto mb-1.5 text-[#4d73c6]" strokeWidth={1.8} />}
      <p className="text-sm font-medium text-ink">{children}</p>
    </div>
  );
}

function BiArrow() {
  return (
    <div className="flex shrink-0 items-center px-3">
      <svg width="36" height="14" viewBox="0 0 36 14" fill="none" aria-hidden="true">
        <line x1="0" y1="7" x2="36" y2="7" stroke={BLUE_DEEP} strokeWidth="1.5" />
        <polyline points="7,2 0,7 7,12"  stroke={BLUE_DEEP} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points="29,2 36,7 29,12" stroke={BLUE_DEEP} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SplitDown() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-5 w-[2px] bg-gradient-to-b from-[#4d73c6] to-[#7a9adb]" />
      <div className="h-[2px] bg-[#7a9adb]" style={{ width: CONNECTOR_W }} />
      <div className="flex justify-between" style={{ width: CONNECTOR_W }}>
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
      </div>
    </div>
  );
}

function MergeDown() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between" style={{ width: CONNECTOR_W }}>
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
      </div>
      <div className="h-[2px] bg-[#7a9adb]" style={{ width: CONNECTOR_W }} />
      <div className="h-5 w-[2px] bg-gradient-to-b from-[#7a9adb] to-[#4d73c6]" />
    </div>
  );
}

function LineDown() {
  return <div className="h-8 w-[2px] bg-gradient-to-b from-[#7a9adb] to-[#4d73c6]" />;
}

function FlowchartPhase({ phase }: { phase: Phase }) {
  const rows = phase.flowRows ?? [];

  return (
    <>
      <div className="flex flex-col items-center">
        {rows.map((row, i) => {
          const prev = i > 0 ? rows[i - 1] : null;
          const isFirst = i === 0;

          return (
            <div key={i} className="flex flex-col items-center">
              {isFirst ? (
                row.type === "pair" ? <SplitDown /> : <LineDown />
              ) : prev?.type === "pair" ? (
                <MergeDown />
              ) : (
                <LineDown />
              )}
              {row.type === "pair" ? (
                <div className="flex items-center">
                  <FlowBox icon={row.leftIcon}>{row.left}</FlowBox>
                  <BiArrow />
                  <FlowBox icon={row.rightIcon}>{row.right}</FlowBox>
                </div>
              ) : (
                <WideFlowBox highlight={row.highlight} icon={row.icon}>{row.text}</WideFlowBox>
              )}
            </div>
          );
        })}
      </div>

      {phase.summary ? (
        <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white/85 px-10 py-7 text-center shadow-deck">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/25 to-transparent" />
          <p className="font-display text-xl font-medium leading-relaxed text-ink md:text-[1.25rem]">
            {phase.summary}
          </p>
        </div>
      ) : null}

      {phase.targetCompletion ? (
        <div className="mt-6">
          <TargetRow value={phase.targetCompletion} />
        </div>
      ) : null}
    </>
  );
}

// ─── Phase section wrapper ───────────────────────────────────────────────────

function PhaseSection({ phase, rail }: { phase: Phase; rail?: RailConfig }) {
  return (
    <>
      <GradientDivider />
      <section className="relative px-[5%] py-12 xl:pl-28">
        {rail ? <MilestoneRail labels={rail.labels} className={rail.className} /> : null}
        <PhaseHeader number={phase.number} title={phase.title} subtitle={phase.subtitle} />
        {phase.industries && phase.industries.length > 0 ? (
          <IndustryTablePhase phase={phase} />
        ) : phase.flowRows && phase.flowRows.length > 0 ? (
          <FlowchartPhase phase={phase} />
        ) : (
          <SummaryPhase phase={phase} />
        )}
      </section>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function StrategyMapWebPage() {
  return (
    <div className="mx-auto w-full max-w-[96rem]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="px-[5%] pb-10 pt-12 text-center">
          <h1 className="font-display text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            Special Projects Initiative <span className="text-mist">/ CONFIDENTIAL</span>
          </h1>

          <div className="mt-5 space-y-2">
            <p className="text-base text-graphite md:text-lg">
              Built to move where conventional channels have stalled.
            </p>
            <p className="text-base text-graphite md:text-lg">
              Designed to align industry, public support, and execution to create durable outcomes at scale.
            </p>
          </div>

          <p className="mt-5 text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-graphite">
            By George Partsch IV
          </p>
        </header>

        {/* Phases */}
        {PHASES.map((phase) => (
          <PhaseSection key={phase.number} phase={phase} rail={PHASE_RAILS[phase.number]} />
        ))}

        {/* Phase 4 */}
        <GradientDivider />
        <section className="relative px-[5%] py-12 xl:pl-28">
          <MilestoneRail
            labels={["CREATE\nCONNECTIVITY", "DISTRIBUTION\nDEAL"]}
            className="top-8 bottom-12"
          />
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="mb-2 rounded-full bg-[linear-gradient(135deg,#7a9adb,#c4d3f0)] p-[1.5px] shadow-[0_4px_20px_rgba(77,115,198,0.18)]">
              <div className="flex items-center gap-2 rounded-full bg-white px-5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#7a9adb,#4d73c6)]" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-graphite">
                  Phase 04
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#c0392b,#96281b)] px-10 py-4 shadow-[0_8px_24px_rgba(150,40,27,0.35)]">
              <div className="flex items-center justify-center gap-3">
                <Handshake size={20} className="text-white/80" strokeWidth={1.8} />
                <h2 className="text-center font-display text-[1.45rem] font-bold text-white md:text-[1.85rem]">
                  The Deal
                </h2>
              </div>
            </div>
          </div>
          <div className="mx-auto flex flex-col items-center">
            <div className="h-8 w-[2px] bg-gradient-to-b from-[#4d73c6] to-[#7a9adb]" />
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-[#4d73c6]/60 bg-white/85 px-8 py-6 text-center shadow-deck">
              <p className="mb-3 text-sm leading-relaxed text-ink">
                We have identified four distinct pathways to secure a meeting with Elon Musk / xAI.
              </p>
              <p className="mb-3 text-sm leading-relaxed text-ink">
                The objective is to establish a strategic alliance with xAI for distribution and the launch of Viral Fusion.
              </p>
              <p className="text-sm leading-relaxed text-ink">
                The go-to-market strategy is a world first, followed by a billion-dollar legislative rollout — another world first — and supported by an aggressive IPO timeline.
              </p>
            </div>
          </div>
        </section>

        {/* The Fun Begins */}
        <GradientDivider />
        <section className="relative px-[5%] py-12 text-center xl:pl-28">
          <div className="pointer-events-none absolute left-[-8.35rem] top-1/2 hidden -translate-y-1/2 xl:flex" aria-hidden="true">
            <MilestoneBubble label={`PREPARE\nTO\nLAUNCH`} variant="red" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Rocket size={26} className="text-[#4d73c6]" strokeWidth={1.8} />
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">The Fun Begins</h2>
          </div>
        </section>

        <div className="h-12" />
      </div>
    </div>
  );
}
