import type { ReactNode } from "react";

// ─── Data types ──────────────────────────────────────────────────────────────

type Industry = {
  name: string;
  lead: string;
  orgs: string[];
  policies: number;
};

type FlowRow =
  | { type: "pair"; left: string; right: string }
  | { type: "single"; text: string; highlight?: boolean };

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

// ─── Data ────────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    number: 1,
    title: "Strategic Multi-Industry Legislative Alignment",
    subtitle:
      "Aligning industry-specific priorities into a coordinated legislative package that creates force multiplication at launch.",
    industries: [
      { name: "Oil & Gas", lead: "Chevron", orgs: ["WSPA", "CIPA"], policies: 4 },
      { name: "Automotive", lead: "Ford", orgs: ["Major Manufacturers"], policies: 2 },
      {
        name: "Medical",
        lead: "Cancer Treatment & Insurance",
        orgs: ["Aligned Organizations"],
        policies: 3,
      },
      {
        name: "Technology",
        lead: "Confidential",
        orgs: ["Aligned Organizations"],
        policies: 3,
      },
      {
        name: "Insurance",
        lead: "Home, Bus. & Auto",
        orgs: ["Aligned Organizations"],
        policies: 3,
      },
    ],
    goals:
      "Create the most durable policy possible — structured for long-term stability, protected for a defined duration, and amendable only by a vote of the people.",
    targetCompletion: "Timed to support a December 2026 legislative roll-out.",
  },
  {
    number: 2,
    title: "Policy Insulation Barrier",
    descriptions: [
      "A strategic sequence of public-interest policies launched alongside Phase 1 policies.",
      "Focused on Government accountability, and other high-priority issues already being demanded by the public.",
      "Designed to broaden the field of discussion, strengthen public alignment, and create strategic insulation for Oil & Gas, Automotive, Medical, and Insurance.",
    ],
    totalPolicies: 15,
    targetCompletion: "Timed to support a December 2026 legislative roll-out.",
  },
  {
    number: 3,
    title: "Media Rail Deployment Across High-Traffic Public Locations",
    flowRows: [
      { type: "pair", left: ">5,000 Locations", right: "Targeted Marketing" },
      { type: "single", text: "Est. Reach: 60% of California's Voters Every Week" },
      {
        type: "single",
        text: "LTA Secures High-Efficiency, Low-Cost, Petition Signature Hubs", highlight: true,
      },
    ],
    summary:
      "Controlled distribution, direct public reach, narrative control at scale, and thousands of locations to support our signature drives at any time.",
  },
];

// ─── Design tokens / shared UI ───────────────────────────────────────────────

const BLUE_LINE = "#7a9adb";
const BLUE_DEEP = "#4d73c6";

function GradientDivider() {
  return (
    <div className="my-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(17,22,28,0.14)_20%,rgba(17,22,28,0.14)_80%,transparent)]" />
  );
}

function PhaseLabel({ number }: { number: number }) {
  return (
    <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-mist">
      Phase {String(number).padStart(2, "0")}
    </p>
  );
}

function PhaseHeader({
  number,
  title,
  subtitle,
}: {
  number: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 flex flex-col items-center gap-3">
      <PhaseLabel number={number} />
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white/95 px-8 py-3.5 shadow-deck">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4d73c6]/30 to-transparent" />
        <h2 className="text-center font-display text-[1.45rem] font-bold text-ink md:text-[1.85rem]">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="mt-1 max-w-3xl text-center text-sm leading-relaxed text-mist md:text-[0.95rem]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TargetRow({ value }: { value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-graphite">
        Target Completion
      </p>
      <div className="h-3.5 w-px bg-line" />
      <div className="rounded-full border border-[#4d73c6]/25 bg-white/95 px-6 py-2 shadow-sm">
        <p className="text-[0.82rem] font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

// ─── Phase 1 — industry table ─────────────────────────────────────────────────

function LeadBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-[#345aa1]/35 bg-[linear-gradient(160deg,#648cdd,#4260b8)] px-4 py-3 text-center shadow-[0_6px_18px_rgba(77,115,198,0.28)]">
      <p className="text-xs font-semibold uppercase leading-snug tracking-[0.07em] text-white/95 md:text-[0.78rem]">
        {children}
      </p>
    </div>
  );
}

function OrgChip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full border border-ink/12 bg-white/85 px-3 py-1 text-center shadow-sm">
      <p className="text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-graphite">
        {children}
      </p>
    </div>
  );
}

function IndustryBox({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.2rem] border border-ink/10 bg-white/85 px-4 py-3 text-center shadow-[0_4px_16px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink md:text-[0.7rem]">
        {children}
      </p>
    </div>
  );
}

function RowLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center">
      <div className="mr-3 h-full w-[2px] self-stretch rounded-full bg-gradient-to-b from-[#4d73c6]/30 to-transparent" />
      <p className="text-[0.78rem] font-bold leading-snug text-ink">{children}</p>
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
        <RowLabel>Industries</RowLabel>
        {industries.map((ind) => (
          <div key={`ind-${ind.name}`} className="flex justify-center">
            <IndustryBox>{ind.name}</IndustryBox>
          </div>
        ))}

        <RowLabel>
          George Partsch IV
          <br />
          <span className="font-normal text-mist">– Lead Facilitator</span>
        </RowLabel>
        {industries.map((ind) => (
          <div key={`lead-${ind.name}`} className="flex justify-center">
            <LeadBox>{ind.lead}</LeadBox>
          </div>
        ))}

        <RowLabel>Orgs. Served</RowLabel>
        {industries.map((ind) => (
          <div key={`orgs-${ind.name}`} className="flex flex-wrap items-center justify-center gap-1.5">
            {ind.orgs.map((org) => (
              <OrgChip key={org}>{org}</OrgChip>
            ))}
          </div>
        ))}

        <RowLabel>
          Est. Number
          <br />
          of Policies
        </RowLabel>
        {industries.map((ind) => (
          <div key={`pol-${ind.name}`} className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4d73c6]/25 bg-white shadow-sm">
              <span className="text-sm font-bold text-ink">{ind.policies}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Goals + Target */}
      <div className="mt-8 space-y-3">
        {phase.goals ? (
          <div className="relative overflow-hidden rounded-[1.4rem] border border-line bg-white/80 px-6 py-4 shadow-sm">
            <div className="flex items-start gap-5">
              <p className="shrink-0 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-mist">
                Goals
              </p>
              <p className="text-[0.88rem] leading-relaxed text-graphite">{phase.goals}</p>
            </div>
          </div>
        ) : null}
        {phase.targetCompletion ? <TargetRow value={phase.targetCompletion} /> : null}
      </div>
    </>
  );
}

// ─── Phase 2 — description cards + count ─────────────────────────────────────

function SummaryPhase({ phase }: { phase: Phase }) {
  return (
    <>
      {phase.descriptions && phase.descriptions.length > 0 ? (
        <div className="mb-7 space-y-3">
          {phase.descriptions.map((desc, i) => (
            <article
              key={i}
              className="relative overflow-hidden rounded-[1.4rem] border border-line bg-white/90 px-8 py-5 shadow-sm"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4d73c6]/40 to-transparent" />
              <p className="text-center text-[0.94rem] leading-relaxed text-ink">{desc}</p>
            </article>
          ))}
        </div>
      ) : null}

      {phase.totalPolicies !== undefined ? (
        <div className="mb-7 flex items-center justify-center gap-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-graphite">
            Est. Number of Policies
          </p>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4d73c6]/30 bg-white shadow-[0_4px_16px_rgba(77,115,198,0.12)]">
            <span className="font-display text-xl font-bold text-ink">{phase.totalPolicies}</span>
          </div>
        </div>
      ) : null}

      {phase.targetCompletion ? <TargetRow value={phase.targetCompletion} /> : null}
    </>
  );
}

// ─── Phase 3 — flowchart diagram ──────────────────────────────────────────────

const CONNECTOR_W = "16rem";

function FlowBox({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-w-[11rem] overflow-hidden rounded-[1.2rem] border border-ink/10 bg-white/85 px-6 py-3.5 text-center shadow-[0_4px_16px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      <p className="text-[0.88rem] font-medium text-ink">{children}</p>
    </div>
  );
}

function WideFlowBox({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  if (highlight) {
    return (
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[1.2rem] border-2 border-[#345aa1]/60 bg-[linear-gradient(160deg,#5a7fd4,#3d5faa)] px-8 py-4 text-center shadow-[0_6px_20px_rgba(77,115,198,0.35)]">
        <p className="text-[0.88rem] font-semibold text-white">{children}</p>
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-[1.2rem] border border-ink/10 bg-white/85 px-8 py-4 text-center shadow-[0_4px_16px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      <p className="text-[0.88rem] font-medium text-ink">{children}</p>
    </div>
  );
}

function BiArrow() {
  return (
    <div className="flex shrink-0 items-center px-3">
      <svg width="36" height="14" viewBox="0 0 36 14" fill="none" aria-hidden="true">
        <line x1="0" y1="7" x2="36" y2="7" stroke={BLUE_DEEP} strokeWidth="1.5" />
        <polyline
          points="7,2 0,7 7,12"
          stroke={BLUE_DEEP}
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points="29,2 36,7 29,12"
          stroke={BLUE_DEEP}
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
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
                  <FlowBox>{row.left}</FlowBox>
                  <BiArrow />
                  <FlowBox>{row.right}</FlowBox>
                </div>
              ) : (
                <WideFlowBox highlight={row.type === "single" ? row.highlight : undefined}>{row.text}</WideFlowBox>
              )}
            </div>
          );
        })}
      </div>

      {phase.summary ? (
        <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[1.6rem] border border-line bg-white/85 px-10 py-7 text-center shadow-deck">
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

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <>
      <GradientDivider />
      <section className="px-[5%] py-12">
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
            Designed to align industry, public support, and execution to create durable outcomes at
            scale.
          </p>
        </div>

        <p className="mt-5 text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-graphite">
          By George Partsch IV
        </p>
      </header>

      {/* Phases */}
      {PHASES.map((phase) => (
        <PhaseSection key={phase.number} phase={phase} />
      ))}

      {/* Phase 4 */}
      <GradientDivider />
      <section className="px-[5%] py-12">
        <div className="mb-8 flex flex-col items-center gap-3">
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-mist">
            Phase 04
          </p>
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#c0392b,#96281b)] px-10 py-4 shadow-[0_8px_24px_rgba(150,40,27,0.35)]">
            <h2 className="text-center font-display text-[1.45rem] font-bold text-white md:text-[1.85rem]">
              The Deal
            </h2>
          </div>
        </div>
        <div className="mx-auto flex flex-col items-center">
          <div className="h-8 w-[2px] bg-gradient-to-b from-[#4d73c6] to-[#7a9adb]" />
          <div className="w-full max-w-3xl overflow-hidden rounded-[1.6rem] border-2 border-[#4d73c6]/60 bg-white/85 px-8 py-6 text-center shadow-deck">
            <p className="mb-3 text-[0.98rem] leading-relaxed text-ink">
              We have four ways of orchestrating a meeting with Elon Musk / xAI.
            </p>
            <p className="mb-3 text-[0.98rem] leading-relaxed text-ink">
              We form a strategic alliance with xAI for distribution to launch Viral Fusion.
            </p>
            <p className="text-[0.98rem] leading-relaxed text-ink">
              Our Go-To-Market Strategy is a first in the World.
            </p>
          </div>
        </div>
      </section>

      {/* The Fun Begins */}
      <GradientDivider />
      <section className="px-[5%] py-12 text-center">
        <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">The Fun Begins</h2>
      </section>

      <div className="h-12" />
    </div>
  );
}
