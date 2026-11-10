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
const TRACKS = ["/voices/colin-2611/c21.mp3", "/voices/george-2611/s21a.mp3", "/voices/george-2611/s21b.mp3", "/voices/george-2611/s21c.mp3"];

function useStage() {
  const position = useVoiceoverPosition();
  const track = position ? TRACKS.indexOf(position.src) : -1;
  const t = position?.time ?? 0;
  const after = (i: number, at: number) => track > i || (track === i && t >= at);
  return {
    citizen: after(0, 5.3),
    will: after(0, 7.6),
    signal: after(0, 14.1),
    election: after(1, 0),
    paper: after(1, 13.5),
    rails: after(1, 16.2),
    audits: after(1, 19.8),
    trust: after(2, 8.7),
    qualities: [3.8, 5.0, 6.3, 7.4, 9.0].map((at) => after(3, at)),
    conclusion: after(3, 27.8),
    // which election layer George is describing right now
    focus: track === 1 ? (t >= 19.8 ? 2 : t >= 16.2 ? 1 : t >= 13.5 ? 0 : -1) : -1,
  };
}

function Card({ icon, title, body, lit, focus = false }: { icon: ReactNode; title: string; body: string; lit: boolean; focus?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border px-4 py-4 text-center transition-all duration-700 sm:py-5 ${
        lit ? "border-[#9beaff]/45 bg-[#12283a]/90 opacity-100" : "border-white/10 bg-[#101c28]/60 opacity-35"
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
      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#9beaff] sm:text-xs">Civic Operating System</p>
        <h1 className="mt-2 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-[-0.02em] text-[#f4f2ec]">AUTHENTICATING THE FUTURE OF REPRESENTATION</h1>

        <p className="mt-5 text-left text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#a9bcc8]">Phase One — three core functions</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          <Card icon={<UserCheck size={22} />} title="01 — VERIFY THE CITIZEN" body="Authenticate identity and participation eligibility" lit={s.citizen} />
          <Card icon={<Users size={22} />} title="02 — CAPTURE THE PUBLIC WILL" body="Record legitimate participation and public sentiment" lit={s.will} />
          <Card icon={<Files size={22} />} title="03 — VERIFY THE SIGNAL" body="Create tamper-evident, auditable participation records" lit={s.signal} />
        </div>

        <div className={`transition-all duration-700 ${s.election ? "opacity-100" : "pointer-events-none opacity-0"}`}>
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
            <p className="mt-1 text-[0.78rem] text-[#a9bcc8]">The intended design standard—not blind reliance on software</p>
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
