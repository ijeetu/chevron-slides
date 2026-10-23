import { guestSlides, type GuestMedia, type GuestSlideId } from "./guest-chapter";

/**
 * Footage carried forward from the earlier editor master, arranged for the
 * October 21 guest-series revision. A source window is not a completed edit.
 * No narration or audio assets are attached here.
 */
function existing(
  guest: GuestSlideId,
  index: number,
  label: string,
  note: string,
  overrides: Partial<GuestMedia> = {},
): GuestMedia {
  return { ...guestSlides[guest].media[index], label, note, ...overrides };
}

export const guestSeriesMedia: Record<string, GuestMedia[]> = {
  "mo-gawdat": [
    existing("mo-gawdat", 0, "Opening · AI and institutional urgency", "PRIMARY · 0:00–0:51. Begin with Mo's actual warning before introducing the presentation. Keep the opening focused; no unrelated AI montage."),
    existing("mo-gawdat", 1, "Opening · A hopeful future", "PRIMARY · 1:12–approximately 1:24. Follow the warning with Mo's optimistic statement about humanity's future. Approximate out point; check the final sentence before editing."),
    existing("mo-gawdat", 2, "The question · What can individuals do?", "PRIMARY · Approximately 1:04:34–1:04:52. Let Mo's question finish before returning to George. Do not overlap their dialogue."),
    existing("mo-gawdat", 3, "The question · Government serving people", "PRIMARY · Approximately 2:59–3:38. Existing governance excerpt for Mo's question about why government must change. Follow with the proposed citizen-control architecture."),
    existing("mo-gawdat", 5, "The challenge · Are you going to intervene?", "PRIMARY · Approximately 12:25–12:38. Let the intervention challenge land immediately before George's response. Briefly reduce any future music at the handoff."),
    existing("mo-gawdat", 4, "Optional reference · Success aligned with humanity", "OPTIONAL REFERENCE · Approximately 8:29–8:46. Earlier-master excerpt about entrepreneurial success and humanity. The revised chapter does not require this additional beat; use only if pacing permits."),
  ],
  samsung: [
    existing("samsung", 0, "AI Living · Intelligence in everyday life", "PRIMARY · Select the strongest 10–20 seconds showing natural, helpful AI integration. Place after the AI Living setup. The requested Phase One integration video has no supplied asset URL and is a separate production requirement."),
  ],
  "charles-adkins": [
    existing("charles-adkins", 0, "Reference · Enterprise adoption and governance", "WRITTEN REFERENCE · Historical appointment article supporting enterprise adoption and governance research. This is not a video clip and does not establish Charles's current role. The revised chapter invites Charles to pressure-test institutional requirements and assess whether Hedera fits them before any technology is selected. No authentic interview footage URL was supplied."),
  ],
  "palmer-luckey": [],
  ford: [
    existing("ford", 0, "Customer control · The digital experience", "PRIMARY · Decoder 43:17–43:53. Open on Farley's existing customer-agency excerpt, then transition briefly into connected-vehicle technology. Preserve the customer-first and privacy context."),
    existing("ford", 1, "The AI companion · An optional civic access point", "PRIMARY · Decoder starts approximately 44:18; no precise out point was supplied. Select the focused AI-companion statement before the stationary, opt-in civic-interface concept. Determine the final out point during editing."),
    existing("ford", 3, "The boundary · Vehicle functions stay separate", "PRIMARY SOURCE WINDOW · Decoder 46:21–approximately 49:11. Aggressively shorten the discussion to distinguish customer experience from outside control of vehicle functions. The full source window is not an approved final cut."),
    existing("ford", 7, "The closing bridge · Working together", "PRIMARY · Los Angeles Times interview 17:24–18:09. Preferred closing excerpt: business, government, educators, and communities working together. Return directly to George for the final Ford invitation."),
    existing("ford", 2, "Optional reference · Companion extension", "OPTIONAL REFERENCE · Decoder approximately 51:49–52:25. Earlier-master extension on companion-like OEM functionality. Omit if the primary companion excerpt already makes the point."),
    existing("ford", 4, "Optional reference · Digital experience differentiates", "OPTIONAL REFERENCE · Decoder approximately 50:36–51:49. Earlier commercial-differentiation beat; the revised chapter instead foregrounds automotive policy and the optional civic interface."),
    existing("ford", 5, "Optional reference · A sustainable American company", "OPTIONAL REFERENCE · Los Angeles Times interview 14:50–14:57. Earlier closing-sequence opening; the revision prefers the collaboration excerpt."),
    existing("ford", 6, "Optional reference · Technicians and skilled trades", "OPTIONAL REFERENCE · Los Angeles Times interview 16:35–17:10. Earlier workforce beat. Keep only if it supports the revised collaboration close without extending the sequence unnecessarily."),
  ],
  "lynsi-snyder": [
    existing("lynsi-snyder", 0, "California · Raising a family and running a business", "PRIMARY · Apple Podcasts source 51:29–52:12. Open with Lynsi's own perspective, followed by restrained restaurant, employee, and California-community visuals. External source; no embeddable video was supplied."),
    existing("lynsi-snyder", 1, "Community · Values and family legacy", "PRIMARY · Apple Podcasts source 54:41–55:30. Use in the community-work passage to establish company values, legacy, and standards. External source; no embeddable video was supplied."),
    existing("lynsi-snyder", 2, "Community · Slave 2 Nothing", "PRIMARY · Apple Podcasts source 13:17–approximately 13:40; target 15–20 seconds. Focus on the foundation's substance-abuse and human-trafficking work. Pair with authentic program imagery, keeping the passage personal and respectful."),
    existing("lynsi-snyder", 3, "Optional reference · Customer loyalty", "OPTIONAL REFERENCE · Standalone 1:18 source. Earlier-master loyalty beat; retain as research unless it adds something necessary to the revised food, family, and community chapter."),
  ],
  chevron: [
    existing("chevron", 2, "Opening · California policy and investment", "PRIMARY SOURCE WINDOW · FOX Business 2:53–3:38. Preferred source in the revised document. Select a focused 15–25 seconds on refinery capacity, policy, fuel supply, and investment uncertainty. Preserve context and distinguish Andy's argument from independent economic findings."),
    existing("chevron", 1, "Reference · Policy and capital allocation", "OPTIONAL REFERENCE · KCRA's Andy Walz interview/article. Locate the investment, reliability, and affordability statement with sufficient capital-allocation context. The supplied page is a source reference, not a verified playable edit."),
    existing("chevron", 0, "Reference · What energy infrastructure supports", "OPTIONAL REFERENCE · Energy Tailgate review window 1:54–3:05: refinery function 1:54–2:22, everyday products 2:23–3:05. Earlier-master context; the revised opening prefers FOX Business. No embeddable video was supplied."),
    existing("chevron", 3, "Reference · Debate and informed analysis", "WRITTEN REFERENCE · Retain the Chevron Richmond letter for research and attribution. Do not treat it as an interview clip unless corresponding authentic footage is separately supplied."),
  ],
  "x-energy": [
    existing("x-energy", 0, "The philosophy · Imagine. Believe. Execute.", "PRIMARY SOURCE · Leadership Matters. Find the early entrepreneurial-philosophy passage introducing IBX. No precise bounds or embeddable video were supplied; locate the authentic excerpt during editing."),
    existing("x-energy", 1, "Energy demand · AI and dependable power", "PRIMARY SOURCE · Existing CNBC discussion about expanding AI electricity demand and reliable power. No precise bounds were supplied. Select a focused excerpt rather than treating the full interview as the final cut."),
    existing("x-energy", 2, "The human purpose · Electricity and quality of life", "PRIMARY SOURCE · Existing Kam founding-story excerpt connecting reliable electricity with clean water, education, opportunity, and quality of life. No precise bounds or supported embed were supplied. Open the original LinkedIn source for editorial review."),
    existing("x-energy", 3, "Optional reference · Jobs, workforce and investment", "OPTIONAL REFERENCE · Existing X-energy/Centrica partnership source. The revised chapter asks about potential California benefits; do not portray this separate international example as a California commitment. No precise bounds or supported embed were supplied."),
  ],
  "patrick-soon-shiong": [
    existing("patrick-soon-shiong", 0, "Opening · Truth, trust and public confidence", "PRIMARY · Daily Show 47:22–47:50. Establish the importance of credible information before the medical milestone. Let Patrick's actual statement land."),
    existing("patrick-soon-shiong", 4, "Medical innovation · Cancer-treatment research", "PRIMARY · Daily Show 43:59–44:17. Pair with the supplied FDA approval timeline. Distinguish the scope of approved indications from broader research and investigational claims."),
    {
      label: "Written source · FDA indication expansion",
      kind: "source",
      url: "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-expanded-indication-nogapendekin-alfa-inbakicept-pmln-bcg-unresponsive-non-muscle",
      note: "WRITTEN PRIMARY SOURCE · FDA milestone link supplied by the revised production document for October 14, 2026. Confirm exact indication wording against this source before finalizing the approval timeline; this is not a video asset.",
    },
    existing("patrick-soon-shiong", 5, "Patient access · Regulatory requirements", "PRIMARY SOURCE WINDOW · Megyn Kelly approximately 59:34–1:01:05. Focus the excerpt on regulatory requirements and access. Preserve the distinction between approved treatments, investigational therapies, and clinical research; check approximate bounds during editing."),
    existing("patrick-soon-shiong", 1, "Media · The voices of the people", "PRIMARY · Daily Show 46:02–46:37. Use after the patient-access discussion as the transition to media and public understanding. Let the voices-of-the-people statement finish naturally."),
    existing("patrick-soon-shiong", 2, "Reference · The broader media platform", "OPTIONAL TRANSCRIPT REFERENCE · Tucker discussion approximately 1:39:09–1:44:42; earlier short target 1:44:01–1:44:42. Supplied link is a transcript, not playable footage. The revised chapter does not require this additional interview."),
    existing("patrick-soon-shiong", 3, "Optional reference · LAT Media Group", "OPTIONAL REFERENCE · NYSE interview, total 9:15. Earlier target was 15–25 seconds on media-platform expansion and public participation. No precise bounds or supported embed were supplied. Keep commercial production proposals distinct from independent newsroom decisions."),
    existing("patrick-soon-shiong", 6, "Optional reference · A patient perspective", "OPTIONAL SOURCE WINDOW · NewsNation 17:25–21:10; choose only 15–30 seconds if needed. This was required in the earlier master but is not an explicit video beat in the revised chapter. Preserve patient context and avoid presenting an individual experience as general clinical evidence."),
    existing("patrick-soon-shiong", 7, "Optional reference · Clinical-program discussion", "OPTIONAL REFERENCE · NYSE ImmunityBio interview, total 5:44. Earlier target was 15–20 seconds on clinical-program progress. No precise bounds or supported embed were supplied; distinguish company statements from independent validation."),
  ],
  "brandon-cuevas": [],
  "chad-bianco": [
    existing("chad-bianco", 1, "Opening excerpt · Public safety and accountability", "PRIMARY · Existing bounded excerpt 03:43–04:20, with the policy-accountability passage from approximately 03:50. The revised presentation calls for a focused excerpt and explicitly avoids the full 5:48 opening. Review this existing cut in context before production."),
    existing("chad-bianco", 2, "The standard · Proof of concept", "PRIMARY SOURCE · KQED town hall. Select approximately 20–30 seconds around Chad's history and proof-of-concept statement. Let it finish before George applies the same standard to Viral Fusion. No exact timestamp or supported embed was supplied."),
    existing("chad-bianco", 0, "Full source reference · Public-safety statement", "REFERENCE ONLY · Full 5:48 original statement. Retained for context and source review; the revised Shawn presentation expressly calls for a focused excerpt rather than playing this entire statement.", { kind: "source", embedUrl: undefined }),
  ],
  "spencer-pratt": [],
  "steve-davis": [],
  "hedera-founders": [
    existing("hedera-founders", 0, "Mance · Governance and institutional adoption", "PRIMARY SOURCE · Existing Hedera/World Economic Forum excerpt. Target approximately 15–20 seconds for the concise introduction. Pair with a brief graphic distinguishing institutional governance from technical infrastructure. The revised chapter asks who sets the rules, controls access, and audits operators, then proposes an independently tested trust architecture without assuming Hedera is the answer. No supported embed was supplied."),
    existing("hedera-founders", 1, "Leemon · AI provenance", "PRIMARY SOURCE · Existing provenance excerpt, approximately 12–20 seconds. Place in the later AI-accountability section, after the record-integrity example. Identify which AI system initiated an action, what informed it, who authorized it, and whether a human reviewed the outcome. No supported embed was supplied."),
    existing("hedera-founders", 2, "Leemon · Human oversight and guardrails", "PRIMARY SOURCE · Existing human-approval and predefined-boundaries excerpt, approximately 20–30 seconds. Follow the provenance excerpt with a focused guardrails segment; combine the two into one concise sequence where possible. An audit log alone does not establish that an AI recommendation was correct. No supported embed was supplied."),
  ],
  "michele-chan": [
    existing("michele-chan", 0, "Production proof · The Dynamic Volume System", "PRIMARY SOURCE · Select the strongest 15–25 seconds showing reconfigurable LED walls, camera operation, and immersive scale. No precise bounds were supplied. Use authentic studio footage, then distinguish the proposed Shawn–Elon immersive production concept from an actual or confirmed interview."),
    existing("michele-chan", 1, "Immersive production · One environment, new settings", "PRIMARY SOURCE OPTION · Target 10–15 seconds around the Manhattan-to-Grand-Canyon transition. Use to demonstrate a repeatable immersive production format, with earlier chapter assets adapted across subjects. No precise bounds or supported embed were supplied."),
    existing("michele-chan", 2, "Immersive production · Multiple worlds in one volume", "PRIMARY SOURCE OPTION · Target 10–20 seconds of authentic Matrix-project BTS and environment changes, ideally including a camera view proving the same volume. Prioritize production capability over the music performance. No precise bounds or supported embed were supplied."),
    existing("michele-chan", 3, "Reference · The finished Matrix project", "OPTIONAL REFERENCE · Finished music-video project supplied by the earlier master. Prefer the authentic BTS/environment changes for the revised immersive-production demonstration. No precise bounds were supplied."),
    existing("michele-chan", 4, "Optional reference · A live launch environment", "OPTIONAL REFERENCE · Battlefield 6 launch. Earlier target 8–12 seconds maximum showing live audience, immersive screens, broadcast, and streaming. The revised chapter prioritizes repeatable production across subjects; cut this extra beat first if pacing is long. No precise bounds or supported embed were supplied."),
  ],
};

guestSeriesMedia["patrick-soon-shiong"].push({
  label: "FDA primary source · Initial ANKTIVA approval",
  kind: "source",
  url: "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-nogapendekin-alfa-inbakicept-pmln-bcg-unresponsive-non-muscle-invasive-bladder-cancer",
  note: "Verified FDA announcement, 22 April 2024. ANKTIVA with BCG for adults with BCG-unresponsive non-muscle-invasive bladder cancer with carcinoma in situ, with or without papillary tumors. Read alongside the separate October 2026 expanded-indication source.",
});
