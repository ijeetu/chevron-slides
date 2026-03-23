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
  | { type: "single"; text: string };

type Phase = {
  number: number;
  title: string;
  subtitle?: string;
  // Phase 1 — industry breakdown table
  industries?: Industry[];
  goals?: string;
  // Phase 2 — bg-patch description cards + total count
  descriptions?: string[];
  totalPolicies?: number;
  // Phase 3 — flowchart diagram
  flowRows?: FlowRow[];
  summary?: string;
  // Shared (optional so Phase 3 can omit it)
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
        orgs: ["Aligned Tech. Organizations"],
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
        text: "LTA Secures High-Efficiency, Low-Cost, Petition Signature Hubs",
      },
    ],
    summary:
      "Controlled distribution, direct public reach, narrative control at scale, and thousands of locations to support our signature drives at any time.",
  },
];

// ─── Shared primitives ───────────────────────────────────────────────────────

function LeadBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-[#345aa1]/40 bg-[linear-gradient(180deg,#648cdd,#4d73c6)] px-4 py-3 text-center shadow-[0_8px_20px_rgba(77,115,198,0.22)]">
      <p className="text-xs font-semibold uppercase leading-snug tracking-[0.06em] text-white md:text-[0.8rem]">
        {children}
      </p>
    </div>
  );
}

function OrgChip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full border border-ink/15 bg-white/90 px-3 py-1.5 text-center shadow-sm">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-ink/80">
        {children}
      </p>
    </div>
  );
}

function IndustryBox({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.2rem] border border-ink/10 bg-white/80 px-4 py-3 text-center shadow-[0_8px_24px_rgba(17,22,28,0.06)] backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/40 via-accent to-accent/40 opacity-60" />
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.07em] text-ink md:text-[0.7rem]">
        {children}
      </p>
    </div>
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
    <div className="mb-6 flex flex-col items-center gap-2">
      <div className="rounded-xl border border-line bg-white/95 px-7 py-2.5 shadow-sm">
        <h2 className="text-center font-display text-[1.35rem] font-bold text-ink md:text-[1.7rem]">
          Phase {number}: {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="max-w-4xl text-center text-sm text-graphite md:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}

function SectionDivider() {
  return <div className="my-6 border-t border-line" />;
}

function TargetRow({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <p className="shrink-0 text-[0.82rem] font-bold text-ink">Target Completion:</p>
      <div className="rounded-full border border-line bg-white/95 px-5 py-2 shadow-sm">
        <p className="text-[0.82rem] font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

// ─── Phase 1 — industry table ─────────────────────────────────────────────────

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
          <div className="h-5 w-[2px] bg-[#7a9adb]" />
          <div className="mx-auto h-[2px] bg-[#7a9adb]" style={{ width: lineWidthPct }} />
          <div className="mx-auto flex justify-between" style={{ width: lineWidthPct }}>
            {industries.map((ind) => (
              <div key={ind.name} className="h-4 w-[2px] bg-[#7a9adb]" />
            ))}
          </div>
        </div>
      </div>

      {/* Data grid */}
      <div
        className="grid gap-x-3 gap-y-4"
        style={{ gridTemplateColumns: `9rem repeat(${colCount}, 1fr)` }}
      >
        {/* Row: Industries */}
        <div className="flex items-center">
          <p className="text-[0.82rem] font-bold text-ink">Industries</p>
        </div>
        {industries.map((ind) => (
          <div key={`ind-${ind.name}`} className="flex justify-center">
            <IndustryBox>{ind.name}</IndustryBox>
          </div>
        ))}

        {/* Row: Lead Facilitator */}
        <div className="flex items-center">
          <p className="text-[0.82rem] font-bold leading-snug text-ink">
            George Partsch IV
            <br />
            <span className="font-normal text-graphite">– Lead Facilitator</span>
          </p>
        </div>
        {industries.map((ind) => (
          <div key={`lead-${ind.name}`} className="flex justify-center">
            <LeadBox>{ind.lead}</LeadBox>
          </div>
        ))}

        {/* Row: Orgs Served */}
        <div className="flex items-center">
          <p className="text-[0.82rem] font-bold text-ink">Orgs. Served</p>
        </div>
        {industries.map((ind) => (
          <div
            key={`orgs-${ind.name}`}
            className="flex flex-wrap items-center justify-center gap-1.5"
          >
            {ind.orgs.map((org) => (
              <OrgChip key={org}>{org}</OrgChip>
            ))}
          </div>
        ))}

        {/* Row: Est. Number of Policies */}
        <div className="flex items-center">
          <p className="text-[0.82rem] font-bold leading-snug text-ink">
            Est. Number
            <br />
            of Policies
          </p>
        </div>
        {industries.map((ind) => (
          <div key={`pol-${ind.name}`} className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white shadow-sm">
              <span className="text-sm font-bold text-ink">{ind.policies}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionDivider />

      <div className="space-y-3">
        {phase.goals ? (
          <div className="flex justify-center gap-6">
            <p className="shrink-0 text-[0.82rem] font-bold text-ink">Goals:</p>
            <p className="text-[0.82rem] leading-relaxed text-graphite">{phase.goals}</p>
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
        <div className="mb-6 space-y-3">
          {phase.descriptions.map((desc, i) => (
            <article
              key={i}
              className="rounded-[1.4rem] border border-line bg-white/90 px-6 py-4 shadow-sm"
            >
              <p className="text-center text-[0.92rem] leading-relaxed text-ink">{desc}</p>
            </article>
          ))}
        </div>
      ) : null}

      {phase.totalPolicies !== undefined ? (
        <div className="flex items-center justify-center gap-5">
          <p className="text-[0.82rem] font-bold text-ink">Est. Number of Policies:</p>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white shadow-sm">
            <span className="text-lg font-bold text-ink">{phase.totalPolicies}</span>
          </div>
        </div>
      ) : null}

      <SectionDivider />

      {phase.targetCompletion ? <TargetRow value={phase.targetCompletion} /> : null}
    </>
  );
}

// ─── Phase 3 — flowchart diagram ──────────────────────────────────────────────

// Width of the horizontal connector bars — chosen to align drops with pair-box centers
const CONNECTOR_W = "16rem";

function FlowBox({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-[11rem] rounded-xl border border-ink/20 bg-white/90 px-6 py-3 text-center shadow-sm">
      <p className="text-[0.88rem] font-medium text-ink">{children}</p>
    </div>
  );
}

function WideFlowBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-2xl rounded-xl border border-ink/20 bg-white/90 px-8 py-3.5 text-center shadow-sm">
      <p className="text-[0.88rem] font-medium text-ink">{children}</p>
    </div>
  );
}

function BiArrow() {
  return (
    <div className="flex shrink-0 items-center px-3">
      <svg width="36" height="14" viewBox="0 0 36 14" fill="none" aria-hidden="true">
        <line x1="0" y1="7" x2="36" y2="7" stroke="#4d73c6" strokeWidth="1.5" />
        <polyline
          points="7,2 0,7 7,12"
          stroke="#4d73c6"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points="29,2 36,7 29,12"
          stroke="#4d73c6"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Y-split downward: single center line → horizontal bar → two drops */
function SplitDown() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-5 w-[2px] bg-[#7a9adb]" />
      <div className="h-[2px] bg-[#7a9adb]" style={{ width: CONNECTOR_W }} />
      <div className="flex justify-between" style={{ width: CONNECTOR_W }}>
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
      </div>
    </div>
  );
}

/** Inverted Y: two rises → horizontal bar → single center drop */
function MergeDown() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between" style={{ width: CONNECTOR_W }}>
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
        <div className="h-4 w-[2px] bg-[#7a9adb]" />
      </div>
      <div className="h-[2px] bg-[#7a9adb]" style={{ width: CONNECTOR_W }} />
      <div className="h-5 w-[2px] bg-[#7a9adb]" />
    </div>
  );
}

/** Simple single vertical connector */
function LineDown() {
  return <div className="h-8 w-[2px] bg-[#7a9adb]" />;
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
              {/* Connector above this row */}
              {isFirst ? (
                row.type === "pair" ? <SplitDown /> : <LineDown />
              ) : prev?.type === "pair" ? (
                <MergeDown />
              ) : (
                <LineDown />
              )}

              {/* Row content */}
              {row.type === "pair" ? (
                <div className="flex items-center">
                  <FlowBox>{row.left}</FlowBox>
                  <BiArrow />
                  <FlowBox>{row.right}</FlowBox>
                </div>
              ) : (
                <WideFlowBox>{row.text}</WideFlowBox>
              )}
            </div>
          );
        })}
      </div>

      {phase.summary ? (
        <p className="mx-auto mt-10 max-w-3xl text-center text-xl font-medium leading-relaxed text-ink md:text-[1.25rem]">
          {phase.summary}
        </p>
      ) : null}

      {phase.targetCompletion ? (
        <>
          <SectionDivider />
          <TargetRow value={phase.targetCompletion} />
        </>
      ) : null}
    </>
  );
}

// ─── Phase section wrapper ───────────────────────────────────────────────────

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <section className="border-t border-line px-[5%] py-10">
      <PhaseHeader number={phase.number} title={phase.title} subtitle={phase.subtitle} />
      {phase.industries && phase.industries.length > 0 ? (
        <IndustryTablePhase phase={phase} />
      ) : phase.flowRows && phase.flowRows.length > 0 ? (
        <FlowchartPhase phase={phase} />
      ) : (
        <SummaryPhase phase={phase} />
      )}
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function StrategyMapWebPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_0%,rgba(72,88,104,0.16),transparent_24%),linear-gradient(135deg,#d9ddd9_0%,#e8e9e5_34%,#d9dee2_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(17,22,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,22,28,0.05)_1px,transparent_1px)] [background-position:center_center] [background-size:28px_28px]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="px-[5%] py-16 text-center">
          <h1 className="font-display text-4xl font-bold leading-[1.0] text-ink md:text-[4.5rem]">
            Special Projects Initiative{" "}
            <span className="text-mist">/ CONFIDENTIAL</span>
          </h1>
          <div className="mt-5 space-y-1.5">
            <p className="text-lg text-graphite md:text-xl">
              Built to move where conventional channels have stalled.
            </p>
            <p className="text-lg text-graphite md:text-xl">
              Designed to align industry, public support, and execution to create durable outcomes
              at scale.
            </p>
          </div>
          <p className="mt-6 text-base font-semibold text-ink">By George Partsch IV</p>
        </header>

        {/* Phase sections */}
        {PHASES.map((phase) => (
          <PhaseSection key={phase.number} phase={phase} />
        ))}

        <div className="h-16" />
      </div>
    </div>
  );
}
