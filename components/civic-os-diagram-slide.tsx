"use client";

import { ArrowDown, BadgeCheck, ClipboardCheck, Files, ShieldCheck, UserCheck, Users } from "lucide-react";
import type { ReactNode } from "react";
import { useVoiceoverPosition } from "@/components/voiceover-cues";

/**
 * Slide 21 — Civic Operating System, two-stage architecture (VF_Pres_11.9.26).
 * Stage 1 lights the three Phase One functions as Colin names them; stage 2 adds the
 * separate election-integrity layers as George explains them. Times are seconds into
 * each voiceover track. Phase Two (petitions, recalls, referenda) is deliberately not
 * shown on this slide.
 */
// VF_Pres_11.18.26: Colin and George alternate (c21 → s21a → c21b → s21b → c21c → s21c).
const TRACKS = ["c21", "s21a", "c21b", "s21b", "c21c", "s21c"].map((f) => `/voices/${f.startsWith("c") ? "colin" : "george"}-2611/${f}.mp3`);

function useStage() {
  const position = useVoiceoverPosition();
  const track = position ? TRACKS.indexOf(position.src) : -1;
  const t = position?.time ?? 0;
  const after = (i: number, at: number) => track > i || (track === i && t >= at);
  // 11.22.26: c21 now opens with 2.6s of silence while the title holds large in the center.
  const lead = 2.6;
  return {
    intro: track === 0 && t < 2.1,
    phaseOne: after(0, lead),
    citizen: after(0, lead + 5.3),
    will: after(0, lead + 7.6),
    signal: after(0, lead + 14.1),
    election: after(1, 0),
    paper: after(1, 0.6),
    rails: after(1, 3.4),
    audits: after(1, 6.7),
    // Colin: "It is verifiable trust."
    trust: after(4, 2.5),
    qualities: [3.8, 5.0, 6.3, 7.4, 9.0].map((at) => after(5, at)),
    // "Paper is the bridge." (0.9s pause added before it)
    conclusion: after(5, 28.7),
    // which election layer George is describing right now
    focus: track === 1 ? (t >= 6.7 ? 2 : t >= 3.4 ? 1 : t >= 0.6 ? 0 : -1) : -1,
  };
}

function Card({ icon, title, body, lit, focus = false, hideUntilLit = false }: { icon: ReactNode; title: string; body: string; lit: boolean; focus?: boolean; hideUntilLit?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border px-4 py-4 text-center transition-all duration-700 sm:py-5 ${
        lit ? "translate-y-0 border-[#9beaff]/45 bg-[#12283a]/90 opacity-100" : hideUntilLit ? "translate-y-3 border-white/10 bg-[#101c28]/60 opacity-0" : "border-white/10 bg-[#101c28]/60 opacity-35"
      } ${focus ? "scale-[1.04] border-[#9beaff] shadow-[0_0_40px_rgba(155,234,255,0.25)]" : ""}`}
    >
      <span className="text-[#9beaff]">{icon}</span>
      <p className="mt-2 font-display text-[0.8rem] font-semibold tracking-[0.06em] text-[#f4f2ec] sm:text-[0.95rem]">{title}</p>
      <p className="mt-1 text-[0.7rem] leading-snug text-[#a9bcc8] sm:text-[0.8rem]">{body}</p>
    </div>
  );
}

export function CivicOsDiagramSlide() {
  const s = useStage();
  const qualities = ["SECURITY", "PRIVACY", "ACCESSIBILITY", "AUDITABILITY", "PUBLIC CONFIDENCE"];
  return (
    <section className="flex h-full items-center justify-center overflow-y-auto px-5 py-8">
      {/* 11.22.26: the title starts large in the center of the screen, then moves to the left as Colin begins. */}
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-[#07101a] px-6 transition-opacity duration-700 ${s.intro ? "opacity-100" : "opacity-0"}`}>
        <p className={`max-w-5xl text-center font-display text-[clamp(2.4rem,6.5vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#f4f2ec] transition-transform duration-700 ease-in-out ${s.intro ? "translate-x-0 scale-100" : "-translate-x-[28vw] -translate-y-[30vh] scale-50"}`}>
          Authenticating the Future of Representation
        </p>
      </div>
      <div className="mx-auto w-full max-w-5xl">
        <header className="text-left">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#9beaff] sm:text-xs">Civic Operating System</p>
          <h1 className="mt-2 font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#f4f2ec]">Authenticating the Future of Representation</h1>
        </header>

        <p className={`mt-6 font-display text-[clamp(1.1rem,2.2vw,1.7rem)] font-semibold tracking-[-0.01em] text-[#9beaff] transition-all duration-700 ${s.phaseOne ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          Phase One <span className="text-[#a9bcc8]">— three core functions</span>
        </p>
        <div className="mt-3 grid gap-3 text-center sm:grid-cols-3">
          <Card icon={<UserCheck size={22} />} title="01 — VERIFY THE CITIZEN" body="Authenticate identity and participation eligibility" lit={s.citizen} hideUntilLit />
          <Card icon={<Users size={22} />} title="02 — CAPTURE THE PUBLIC WILL" body="Record legitimate participation and public sentiment" lit={s.will} hideUntilLit />
          <Card icon={<Files size={22} />} title="03 — VERIFY THE SIGNAL" body="Create tamper-evident, auditable participation records" lit={s.signal} hideUntilLit />
        </div>

        <div className={`text-center transition-all duration-700 ${s.election ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <p className="mt-4 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a9bcc8]">
            <ArrowDown size={14} aria-hidden="true" /> Additional safeguards for official elections
          </p>
          <div className="mt-3 rounded-2xl border border-white/12 p-3 sm:p-4">
            <p className="text-left text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#a9bcc8]">Election integrity — three complementary layers</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              <Card icon={<Files size={22} />} title="PAPER RECORD" body="Physical record suitable for independent examination" lit={s.paper} focus={s.focus === 0} />
              <Card icon={<ShieldCheck size={22} />} title="SECURE DIGITAL RAILS" body="Integrity controls, traceability and audit evidence" lit={s.rails} focus={s.focus === 1} />
              <Card icon={<ClipboardCheck size={22} />} title="INDEPENDENT AUDITS" body="Independent checks of election records and outcomes" lit={s.audits} focus={s.focus === 2} />
            </div>
          </div>

          <div className={`mt-4 transition-all duration-700 ${s.trust ? "opacity-100" : "opacity-25"}`}>
            <p className="flex items-center justify-center gap-2 font-display text-[clamp(1.2rem,2.6vw,2rem)] font-semibold tracking-[0.04em] text-[#f4f2ec]">
              <BadgeCheck className="text-[#9beaff]" size={26} aria-hidden="true" /> VERIFIABLE TRUST
            </p>
            {/* 11.17.26: outcome statement */}
            <p className="mt-1 text-[0.78rem] text-[#a9bcc8]"><span className="font-semibold tracking-[0.18em] text-[#9beaff]">OUTCOME</span> — Paper record + secure digital verification + independent audit = verifiable election integrity.</p>
          </div>

          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold tracking-[0.18em] text-[#9beaff] sm:text-xs">
            {qualities.map((q, i) => (
              <li key={q} className={`transition-opacity duration-500 ${s.qualities[i] ? "opacity-100" : "opacity-0"}`}>
                {i > 0 ? <span aria-hidden="true" className="mr-3 text-[#9beaff]/50">·</span> : null}
                {q}
              </li>
            ))}
          </ul>

          <p className={`mt-4 font-display text-[clamp(1rem,2.2vw,1.6rem)] font-semibold tracking-[0.03em] text-[#f4f2ec] transition-opacity duration-700 ${s.conclusion ? "opacity-100" : "opacity-0"}`}>
            PAPER IS THE BRIDGE. VERIFICATION IS THE STANDARD.
          </p>
        </div>
      </div>
    </section>
  );
}
