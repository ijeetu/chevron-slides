"use client";

import { useId } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Play } from "lucide-react";

import type { GuestSlide } from "@/lib/guest-chapter";
import portraitCredits from "@/public/guest-chapter/credits.json";
import styles from "./guest-chapter-slide.module.css";

type GuestChapterSlideProps = {
  slide: GuestSlide;
  onContinue: () => void;
  onOpenVideo: (url: string) => void;
  nextLabel?: string;
  portraitSrc?: string;
  portraitAlt?: string;
};

type GuestPortrait = {
  person: string;
  asset: string;
  sourceUrl?: string;
  credit?: string;
  license?: string;
  licenseUrl?: string;
  changes?: string;
};

function isPlayableEmbed(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (
      ((url.hostname === "www.youtube-nocookie.com" || url.hostname === "www.youtube.com") && /^\/embed\/[A-Za-z0-9_-]{11}$/.test(url.pathname)) ||
      (url.hostname === "player.vimeo.com" && /^\/video\/\d+$/.test(url.pathname))
    );
  } catch {
    return false;
  }
}

const VISUALS: Record<GuestSlide["visual"], { title: string; description: string; code: string }> = {
  humanity: { title: "Humanity before automation", description: "Human agency at the center of a system of rights, lawful authority, AI guardrails and measurable outcomes.", code: "HUMAN SYSTEM" },
  "physical-ai": { title: "A network in the real world", description: "A connected network of physical displays links locations, AI, media and civic participation.", code: "PHYSICAL NETWORK" },
  "pressure-test": { title: "Test the architecture", description: "An architecture moves through three independent review gates before a decision to pilot.", code: "ARCHITECTURE REVIEW" },
  resilience: { title: "Resilience by design", description: "Distributed infrastructure connects through redundant routes, with a protected core and a visible perimeter.", code: "RESILIENCE NETWORK" },
  vehicle: { title: "Agency in every connection", description: "A vehicle connects to an external service through an explicit permission gate controlled by its owner.", code: "OPT-IN MOBILITY" },
  community: { title: "Start with everyday life", description: "A neighborhood business is at the center of connected families, local economics and community outcomes.", code: "COMMUNITY LAYER" },
  "energy-policy": { title: "Certainty enables investment", description: "An energy grid links reliable supply and productive demand through a clear public policy process.", code: "ENERGY SYSTEM" },
  "advanced-energy": { title: "From innovation to deployment", description: "An advanced energy source connects a skilled workforce and local investment to a resilient distribution grid.", code: "DEPLOYMENT PATH" },
  "health-media": { title: "Understanding to access", description: "Independent media and scientific expertise meet at public understanding, with separate pathways to healthcare access.", code: "INFORMATION + HEALTH" },
  "health-economics": { title: "Make outcomes measurable", description: "An economic feedback loop connects prevention, care, measured outcomes and transparent accountability.", code: "OUTCOMES LOOP" },
  trust: { title: "A verifiable foundation", description: "Private records connect to defined events, provenance and independent verification through separated system layers.", code: "TRUST ARCHITECTURE" },
  production: { title: "One story. Every surface.", description: "A production control system routes one coherent story to a live stage, immersive environment and national distribution.", code: "LAUNCH ARCHITECTURE" },
  "public-safety": { title: "Experience into action", description: "Operating experience moves through expert scrutiny and the lawful policy process toward implementation and review.", code: "PUBLIC SAFETY" },
};

/** Purpose-built line diagrams keep the guest chapter in the deck's visual language. */
function GuestDiagram({ visual }: { visual: GuestSlide["visual"] }) {
  const id = useId().replace(/:/g, "");
  const info = VISUALS[visual];
  const arrow = `url(#${id}-arrow)`;
  const node = (x: number, y: number, size = 6) => (
    <g key={`${x}-${y}`}><circle cx={x} cy={y} r={size + 7} className={styles.nodeHalo} /><circle cx={x} cy={y} r={size} className={styles.node} /></g>
  );

  return (
    <svg className={styles.diagram} viewBox="0 0 500 280" fill="none" role="img" aria-label={info.description}>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L7 4L1 7" className={styles.strongLine} /></marker>
        <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="currentColor" /></pattern>
      </defs>
      <rect x="14" y="14" width="472" height="252" fill={`url(#${id}-dots)`} className={styles.dots} />

      {visual === "humanity" && <>
        <circle cx="250" cy="137" r="102" className={styles.faintLine} />
        <circle cx="250" cy="137" r="76" className={styles.line} strokeDasharray="3 7" />
        <path d="M250 34V66M250 208V240M147 137H179M321 137H353" className={styles.line} />
        <path d="M181 69L197 85M303 189L319 205M181 205L197 189M303 85L319 69" className={styles.faintLine} />
        <rect x="201" y="78" width="98" height="113" rx="49" className={styles.panelOutline} />
        <circle cx="250" cy="113" r="19" className={styles.strongLine} />
        <path d="M216 167V157C216 140 229 133 250 133C271 133 284 140 284 157V167H216Z" className={styles.strongLine} />
        {[[250, 35], [352, 137], [250, 239], [148, 137]].map(([x, y]) => node(x, y))}
        <text x="250" y="218" className={styles.tinyText} textAnchor="middle">HUMAN AGENCY</text>
        <path d="M23 42H105M23 48H60M395 232H477M440 238H477" className={styles.faintLine} />
      </>}

      {visual === "physical-ai" && <>
        <path d="M250 212V132M75 107V144H425V107M162 68V144M338 68V144" className={styles.line} />
        {[[40, 49], [127, 16], [215, 49], [303, 16], [390, 49]].map(([x, y], index) => <g key={x}>
          <rect x={x} y={y} width="70" height="50" rx="2" className={styles.panelOutline} />
          <rect x={x + 6} y={y + 6} width="58" height="32" className={styles.screenFill} />
          <path d={`M${x + 13} ${y + 30}L${x + 25} ${y + 21}L${x + 36} ${y + 28}L${x + 55} ${y + 13}`} className={index % 2 ? styles.line : styles.strongLine} />
          <path d={`M${x + 30} ${y + 50}V${y + 57}H${x + 40}V${y + 50}`} className={styles.line} />
        </g>)}
        <rect x="171" y="187" width="158" height="51" className={styles.panelOutline} />
        <circle cx="193" cy="212" r="4" className={styles.node} />
        <text x="260" y="209" className={styles.diagramText} textAnchor="middle">ONE NETWORK</text>
        <text x="260" y="225" className={styles.tinyText} textAnchor="middle">AI · MEDIA · PARTICIPATION</text>
        {[[75, 144], [162, 144], [250, 144], [338, 144], [425, 144]].map(([x, y]) => node(x, y, 3))}
        <path d="M60 187H128M372 187H440M60 194H92M408 194H440" className={styles.faintLine} />
      </>}

      {visual === "pressure-test" && <>
        <path d="M37 137H463" className={styles.faintLine} />
        {[66, 205, 344].map((x, index) => <g key={x}>
          <rect x={x} y="60" width="89" height="154" className={styles.panelOutline} />
          <path d={`M${x + 8} 70H${x + 29}M${x + 8} 78H${x + 20}`} className={styles.faintLine} />
          <circle cx={x + 45} cy="126" r="27" className={index === 2 ? styles.strongLine : styles.line} />
          <path d={`M${x + 33} 126L${x + 42} 135L${x + 58} 115`} className={styles.strongLine} />
          <text x={x + 45} y="175" className={styles.diagramText} textAnchor="middle">{["REVIEW", "FIT", "PILOT"][index]}</text>
          <text x={x + 45} y="195" className={styles.tinyText} textAnchor="middle">{`GATE 0${index + 1}`}</text>
        </g>)}
        <path d="M155 137H193M294 137H332" className={styles.strongLine} markerEnd={arrow} />
        <path d="M109 226V247H389V226" className={styles.line} strokeDasharray="3 5" />
        <text x="250" y="263" className={styles.tinyText} textAnchor="middle">EVIDENCE BEFORE COMMITMENT</text>
      </>}

      {visual === "resilience" && <>
        <path d="M78 68L250 41L422 68V211L250 244L78 211Z" className={styles.line} strokeDasharray="4 6" />
        <path d="M106 91H173L210 117M394 91H327L290 117M106 189H173L210 163M394 189H327L290 163" className={styles.line} />
        <path d="M106 91V189M394 91V189M106 91L394 189M106 189L394 91" className={styles.faintLine} />
        <path d="M250 87L289 101V137C289 162 270 184 250 193C230 184 211 162 211 137V101L250 87Z" className={styles.panelOutline} />
        <path d="M234 139L245 150L269 122" className={styles.strongLine} />
        {[[106, 91], [394, 91], [106, 189], [394, 189]].map(([x, y]) => <g key={`${x}-${y}`}>
          <rect x={x - 23} y={y - 20} width="46" height="40" className={styles.panelOutline} />
          <path d={`M${x - 13} ${y - 9}H${x + 13}M${x - 13} ${y}H${x + 13}M${x - 13} ${y + 9}H${x + 2}`} className={styles.line} />
        </g>)}
        <text x="250" y="224" className={styles.tinyText} textAnchor="middle">DISTRIBUTED · CONNECTED · RESILIENT</text>
      </>}

      {visual === "vehicle" && <>
        <path d="M36 186H328" className={styles.faintLine} />
        <path d="M54 148L66 122L107 114L137 85H218L250 116L294 125L308 151V169H277M236 169H127M87 169H54V148Z" className={styles.panelOutline} />
        <path d="M125 114L145 95H210L233 114H125ZM179 95V114M156 128H169M225 128H238" className={styles.line} />
        <circle cx="107" cy="167" r="20" className={styles.strongLine} /><circle cx="257" cy="167" r="20" className={styles.strongLine} />
        <circle cx="107" cy="167" r="8" className={styles.line} /><circle cx="257" cy="167" r="8" className={styles.line} />
        <path d="M179 84V49H388V87" className={styles.line} strokeDasharray="4 5" />
        <rect x="340" y="88" width="96" height="112" className={styles.panelOutline} />
        <path d="M373 129V119A15 15 0 0 1 403 119V129" className={styles.strongLine} />
        <rect x="367" y="129" width="42" height="31" rx="2" className={styles.strongLine} />
        <circle cx="388" cy="143" r="3" className={styles.node} />
        <text x="388" y="182" className={styles.tinyText} textAnchor="middle">OWNER CONTROL</text>
        <text x="179" y="226" className={styles.diagramText} textAnchor="middle">AN EXPLICIT OPT-IN</text>
        <path d="M180 236H389V211" className={styles.line} />
        {node(179, 49, 4)}
      </>}

      {visual === "community" && <>
        <circle cx="250" cy="141" r="111" className={styles.faintLine} />
        <path d="M67 225H433M250 208V230M114 141H170M330 141H386M250 35V73" className={styles.line} />
        <path d="M178 105H322L310 76H190L178 105Z" className={styles.panelOutline} />
        <path d="M187 105V192H313V105M205 78L199 105M227 78L224 105M250 78V105M273 78L276 105M295 78L301 105" className={styles.line} />
        <rect x="233" y="131" width="34" height="61" className={styles.strongLine} />
        <rect x="201" y="127" width="21" height="33" className={styles.line} /><rect x="278" y="127" width="21" height="33" className={styles.line} />
        <path d="M245 159H249M170 193H330" className={styles.line} />
        {[[108, 141], [392, 141], [250, 32]].map(([x, y]) => <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="16" className={styles.panelOutline} />
          <circle cx={x} cy={y - 4} r="4" className={styles.strongLine} />
          <path d={`M${x - 7} ${y + 7}C${x - 7} ${y - 1} ${x + 7} ${y - 1} ${x + 7} ${y + 7}`} className={styles.line} />
        </g>)}
        <text x="250" y="253" className={styles.tinyText} textAnchor="middle">FAMILIES · BUSINESS · COMMUNITY</text>
      </>}

      {visual === "energy-policy" && <>
        <path d="M58 203H442M104 114H396" className={styles.faintLine} />
        {[93, 407].map((x) => <g key={x}>
          <path d={`M${x} 65L${x - 25} 199M${x} 65L${x + 25} 199M${x - 33} 106H${x + 33}M${x - 28} 138H${x + 28}M${x - 19} 106L${x + 16} 138M${x + 19} 106L${x - 16} 138M${x - 16} 138L${x + 23} 180M${x + 16} 138L${x - 23} 180`} className={styles.line} />
          <path d={`M${x - 30} 106V123M${x + 30} 106V123`} className={styles.strongLine} />
        </g>)}
        <path d="M123 120C175 150 325 150 377 120M123 101C175 128 325 128 377 101" className={styles.line} />
        <rect x="196" y="158" width="108" height="60" className={styles.panelOutline} />
        <path d="M216 197H284M224 185V172M237 185V172M250 185V172M263 185V172M276 185V172" className={styles.line} />
        <text x="250" y="239" className={styles.tinyText} textAnchor="middle">A TRANSPARENT POLICY PROCESS</text>
        {node(250, 135, 5)}
        <path d="M250 148V158" className={styles.strongLine} />
        <text x="250" y="55" className={styles.diagramText} textAnchor="middle">RELIABILITY + INVESTMENT</text>
      </>}

      {visual === "advanced-energy" && <>
        <path d="M53 219H450" className={styles.faintLine} />
        <path d="M76 200V106C76 83 149 83 149 106V200H76Z" className={styles.panelOutline} />
        <path d="M91 200V116C91 105 134 105 134 116V200M76 107C76 124 149 124 149 107M91 158H134" className={styles.line} />
        <path d="M158 184H211M158 169H203" className={styles.strongLine} markerEnd={arrow} />
        <rect x="224" y="138" width="79" height="62" className={styles.panelOutline} />
        <circle cx="263" cy="169" r="18" className={styles.line} />
        <path d="M251 169H275M263 157V181M253 159L273 179M273 159L253 179" className={styles.line} />
        <path d="M304 169H353V121H391M353 169V203H391" className={styles.line} />
        {[109, 191].map((y) => <g key={y}><rect x="392" y={y} width="49" height="25" className={styles.panelOutline} /><path d={`M401 ${y + 8}H432M401 ${y + 16}H420`} className={styles.line} /></g>)}
        <path d="M112 79V44H263V127" className={styles.line} strokeDasharray="3 5" />
        {node(263, 44, 4)}
        <text x="250" y="250" className={styles.tinyText} textAnchor="middle">SOURCE → WORKFORCE → DEPLOYMENT</text>
      </>}

      {visual === "health-media" && <>
        <path d="M59 219H442" className={styles.faintLine} />
        <rect x="43" y="64" width="100" height="133" className={styles.panelOutline} />
        <path d="M58 86H128M58 96H111M58 155H128M58 165H128M58 175H106" className={styles.line} />
        <rect x="58" y="112" width="30" height="31" className={styles.line} /><path d="M99 115H128M99 125H128M99 135H119" className={styles.line} />
        <path d="M143 130H210M290 130H357" className={styles.strongLine} markerEnd={arrow} />
        <circle cx="250" cy="130" r="38" className={styles.panelOutline} />
        <path d="M231 130H269M250 111V149" className={styles.strongLine} />
        <path d="M250 168V208H393V200" className={styles.line} />
        <rect x="358" y="64" width="98" height="133" className={styles.panelOutline} />
        <path d="M377 84L437 171M437 84L377 171M385 96H429M392 107H421M399 118H414M399 137H414M392 148H421M385 159H429" className={styles.line} />
        <text x="94" y="239" className={styles.tinyText} textAnchor="middle">INDEPENDENT MEDIA</text><text x="408" y="239" className={styles.tinyText} textAnchor="middle">SCIENTIFIC EXPERTISE</text>
        <text x="250" y="45" className={styles.diagramText} textAnchor="middle">PUBLIC UNDERSTANDING</text>
      </>}

      {visual === "health-economics" && <>
        <circle cx="250" cy="140" r="93" className={styles.faintLine} />
        <path d="M183 61C231 22 306 42 331 91M335 185C314 238 242 258 194 226M160 184C135 139 149 91 179 67" className={styles.strongLine} markerEnd={arrow} />
        <rect x="90" y="100" width="90" height="72" className={styles.panelOutline} />
        <rect x="319" y="100" width="90" height="72" className={styles.panelOutline} />
        <rect x="205" y="190" width="90" height="57" className={styles.panelOutline} />
        <path d="M119 126H151M135 110V142" className={styles.strongLine} />
        <path d="M337 139H348L355 120L365 151L373 135H391" className={styles.strongLine} />
        <path d="M226 226V213M241 226V205M256 226V217M271 226V199" className={styles.strongLine} />
        <text x="135" y="159" className={styles.tinyText} textAnchor="middle">PREVENTION</text><text x="365" y="159" className={styles.tinyText} textAnchor="middle">CARE</text><text x="250" y="240" className={styles.tinyText} textAnchor="middle">OUTCOMES</text>
        <circle cx="250" cy="122" r="24" className={styles.line} />
        <text x="250" y="127" className={styles.diagramText} textAnchor="middle">$</text>
        <text x="250" y="165" className={styles.tinyText} textAnchor="middle">ACCOUNTABILITY</text>
      </>}

      {visual === "trust" && <>
        {[48, 103, 158].map((y, index) => <g key={y}>
          <path d={`M83 ${y + 17}L250 ${y - 12}L417 ${y + 17}L250 ${y + 46}L83 ${y + 17}Z`} className={index === 1 ? styles.panelOutline : styles.line} />
          <path d={`M83 ${y + 17}V${y + 30}L250 ${y + 59}L417 ${y + 30}V${y + 17}M250 ${y + 46}V${y + 59}`} className={styles.faintLine} />
          <text x="250" y={y + 22} className={index === 1 ? styles.diagramText : styles.tinyText} textAnchor="middle">{["PRIVATE RECORDS", "DEFINED EVENTS", "VERIFIABLE INTEGRITY"][index]}</text>
        </g>)}
        <path d="M434 65H457V201H434M459 132H477" className={styles.strongLine} />
        <circle cx="61" cy="229" r="8" className={styles.line} /><path d="M57 229L60 232L66 225" className={styles.strongLine} />
        <path d="M77 229H388" className={styles.line} strokeDasharray="3 5" />
        <text x="250" y="253" className={styles.tinyText} textAnchor="middle">INDEPENDENT AUDIT · CONDITIONAL PILOT</text>
      </>}

      {visual === "production" && <>
        <path d="M164 138H219V53H290M219 138H290M219 138V224H290" className={styles.strongLine} />
        <rect x="49" y="95" width="114" height="88" className={styles.panelOutline} />
        <path d="M67 143H83L91 125L99 156L107 134L115 143H145" className={styles.strongLine} />
        <text x="107" y="167" className={styles.tinyText} textAnchor="middle">ONE STORY</text>
        {[25, 110, 195].map((y, index) => <g key={y}>
          <rect x="291" y={y} width="154" height="57" className={styles.panelOutline} />
          {index === 0 && <path d={`M308 ${y + 40}V${y + 16}H337V${y + 40}M305 ${y + 43}H340M321 ${y + 16}V${y + 35}`} className={styles.line} />}
          {index === 1 && <><path d={`M309 ${y + 18}L334 ${y + 14}V${y + 40}L309 ${y + 36}Z`} className={styles.line} /><path d={`M313 ${y + 26}H330M323 ${y + 15}V${y + 39}`} className={styles.line} /></>}
          {index === 2 && <><path d={`M316 ${y + 40}V${y + 18}M309 ${y + 28}Q316 ${y + 16} 323 ${y + 28}M304 ${y + 23}Q316 ${y + 5} 328 ${y + 23}`} className={styles.line} /><circle cx="316" cy={y + 41} r="2" className={styles.node} /></>}
          <text x="385" y={y + 32} className={styles.diagramText} textAnchor="middle">{["LIVE", "IMMERSIVE", "DISTRIBUTED"][index]}</text>
        </g>)}
        {node(219, 138, 4)}
      </>}

      {visual === "public-safety" && <>
        <path d="M48 139H452" className={styles.line} />
        {[[91, "EXPERIENCE"], [250, "SCRUTINY"], [409, "ACTION"]].map(([x, label], index) => <g key={String(label)}>
          <circle cx={Number(x)} cy="139" r="42" className={styles.panelOutline} />
          {index === 0 && <><path d="M91 109L109 116V136C109 151 100 161 91 167C82 161 73 151 73 136V116L91 109Z" className={styles.line} /><path d="M82 137L88 143L100 129" className={styles.strongLine} /></>}
          {index === 1 && <><circle cx="247" cy="134" r="17" className={styles.strongLine} /><path d="M259 147L271 159M240 133H254M247 126V140" className={styles.line} /></>}
          {index === 2 && <><path d="M390 122H428M390 132H428M390 142H417M390 152H406" className={styles.line} /><path d="M415 157L421 163L431 149" className={styles.strongLine} /></>}
          <text x={Number(x)} y="207" className={styles.tinyText} textAnchor="middle">{String(label)}</text>
        </g>)}
        <path d="M407 90V45H91V90" className={styles.line} strokeDasharray="3 5" markerEnd={arrow} />
        <text x="250" y="35" className={styles.tinyText} textAnchor="middle">REVIEW · IMPLEMENT · IMPROVE</text>
        <text x="250" y="251" className={styles.diagramText} textAnchor="middle">A LAWFUL POLICY PROCESS</text>
      </>}

      <path d="M14 32V14H32M468 14H486V32M14 248V266H32M468 266H486V248" className={styles.cornerLine} />
    </svg>
  );
}

export function GuestChapterSlide({ slide, onContinue, onOpenVideo, nextLabel, portraitSrc, portraitAlt }: GuestChapterSlideProps) {
  const visual = VISUALS[slide.visual];
  const titleId = `guest-title-${slide.id}`;
  const portraits: GuestPortrait[] = portraitSrc
    ? [{ asset: portraitSrc, person: portraitAlt || slide.name }]
    : portraitCredits.portraits.filter((portrait) => portrait.guestId === slide.id);
  const creditedPortraits = portraits.filter((portrait) => portrait.sourceUrl);

  return (
    <section className={styles.root} aria-labelledby={titleId}>
      <div key={slide.id} className={styles.frame}>
        <div className={styles.main}>
          <div className={styles.editorial}>
            <header className={styles.guestHeader}>
              <div className={styles.identity} data-portraits={portraits.length}>
                <div className={styles.identityText}>
                  <p className={styles.organization}>{slide.organization}</p>
                  <h1 id={titleId} className={`${styles.name} font-display`}>{slide.name}</h1>
                </div>
                {portraits.length > 0 && <div className={styles.portraits}>{portraits.map((portrait) => <div className={styles.portrait} key={portrait.asset}><img src={portrait.asset} alt={portrait.person} title={portrait.person} width={70} height={85} decoding="async" /></div>)}</div>}
              </div>
              <p className={`${styles.layer} font-display`}>{slide.layer}</p>
            </header>

            <div className={styles.arguments}>
              <div className={styles.argument}>
                <span className={styles.argumentNumber} aria-hidden="true">01</span>
                <div><h2>The problem</h2><p>{slide.problem}</p></div>
              </div>
              <div className={styles.argument} data-opportunity="true">
                <span className={styles.argumentNumber} aria-hidden="true">02</span>
                <div><h2>The opportunity</h2><p>{slide.opportunity}</p></div>
              </div>
            </div>

            <div className={styles.values} aria-label="Value of the partnership">
              <span className={styles.valueHeading}>THE VALUE</span>
              <ul>{slide.values.map((value) => <li key={value}>{value}</li>)}</ul>
            </div>
          </div>

          <figure className={styles.visual}>
            <h2 className={`${styles.visualTitle} font-display`}>{visual.title}</h2>
            <GuestDiagram visual={slide.visual} />
            <figcaption className={styles.diagramLabels}>
              {slide.diagramLabels.map((label, index) => <span key={label}><span className={styles.labelIndex} aria-hidden="true">0{index + 1}</span>{label}</span>)}
            </figcaption>
          </figure>
        </div>

        <div className={styles.invitation}>
          <span className={styles.invitationLabel}>THE INVITATION</span>
          <p className="font-display">{slide.ask}</p>
        </div>

        <div className={styles.actions} onKeyDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
          {slide.media.length + creditedPortraits.length > 0 ? (
            <details className={styles.sources} key={`${slide.id}-sources`}>
              <summary><Play size={13} strokeWidth={1.6} aria-hidden="true" /><span>Sources &amp; credits</span><span className={styles.sourceCount}>{slide.media.length + creditedPortraits.length}</span><ChevronDown className={styles.sourceChevron} size={14} aria-hidden="true" /></summary>
              <div className={styles.sourcePanel}>
                <p className={styles.sourcePanelTitle}>REFERENCE MATERIAL</p>
                {slide.media.map((media) => <div className={styles.sourceItem} key={`${media.label}-${media.url}`}>
                  <div className={styles.sourceItemText}><span>{media.label}</span>{media.note && <p>{media.note}</p>}</div>
                  <div className={styles.sourceActions}>
                    {media.kind === "video" && isPlayableEmbed(media.embedUrl) ? <>
                      <button className={styles.sourceAction} type="button" onClick={() => onOpenVideo(media.embedUrl!)} aria-label={`Watch ${media.label}`}>Watch <Play size={12} fill="currentColor" aria-hidden="true" /></button>
                      <a className={`${styles.sourceAction} ${styles.externalSource}`} href={media.url} target="_blank" rel="noopener noreferrer" aria-label={`Open the full ${media.label} source in a new tab`} title="Open full source"><ArrowUpRight size={16} aria-hidden="true" /></a>
                    </> : <a className={styles.sourceAction} href={media.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${media.label} source in a new tab`}>View <ArrowUpRight size={15} aria-hidden="true" /></a>}
                  </div>
                </div>)}
                {creditedPortraits.length > 0 && <div className={styles.photoCredits}><h3>Photography</h3>{creditedPortraits.map((portrait) => <p key={portrait.asset}><a href={portrait.sourceUrl} target="_blank" rel="noopener noreferrer">{portrait.person} · {portrait.credit}<ArrowUpRight size={12} aria-hidden="true" /></a>{portrait.licenseUrl && <><br /><a href={portrait.licenseUrl} target="_blank" rel="noopener noreferrer">{portrait.license}</a><span> · {portrait.changes}</span></>}</p>)}</div>}
              </div>
            </details>
          ) : <span className={styles.conversationLabel}>A CONVERSATION THAT BUILDS THE NEXT LAYER</span>}
          <button type="button" className={styles.continueButton} onClick={onContinue}>{nextLabel || "Continue"}<ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
