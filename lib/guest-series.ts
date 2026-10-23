import type { GuestConceptKind } from "@/components/guest-concept-visual";

/** Audience copy distilled from Viral_Fusion_10.21.26_Slides_36-50_Revised (1).docx.
 * The complete supplied text remains in guest-series-source.ts.
 * All scenes are silent. Clips play only after an explicit audience action.
 */
export type GuestSeriesId =
  | "mo-gawdat" | "samsung" | "charles-adkins" | "palmer-luckey" | "ford"
  | "lynsi-snyder" | "chevron" | "x-energy" | "patrick-soon-shiong"
  | "brandon-cuevas" | "chad-bianco" | "spencer-pratt" | "steve-davis"
  | "hedera-founders" | "michele-chan";

export type GuestScene = {
  label: string;
  title: string;
  body: string;
  visual?: GuestConceptKind;
  image?: string;
  imageAlt?: string;
  feature?: "state-precedents" | "xe-100";
  words?: string[];
  note?: string;
  clip?: number;
  seconds?: number;
};

export type GuestSeriesSlide = {
  id: GuestSeriesId;
  number: number;
  name: string;
  organization: string;
  layer: string;
  invitation: string;
  scenes: GuestScene[];
};

export const guestSeriesIds: GuestSeriesId[] = [
  "mo-gawdat", "samsung", "charles-adkins", "palmer-luckey", "ford", "lynsi-snyder",
  "chevron", "x-energy", "patrick-soon-shiong", "brandon-cuevas", "chad-bianco",
  "spencer-pratt", "steve-davis", "hedera-founders", "michele-chan",
];

export const guestSeries: Record<GuestSeriesId, GuestSeriesSlide> = {
  "mo-gawdat": {
    id: "mo-gawdat", number: 36, name: "Mo Gawdat", organization: "Humanity and artificial intelligence",
    layer: "Humanity & AI governance",
    invitation: "Would you help design the boundaries technology must never cross?",
    scenes: [
      { label: "The stakes", title: "Human beings remain in control", body: "As AI becomes more capable, public institutions must protect human agency and retain the authority to govern.", words: ["Human agency", "Citizen rights", "Accountable institutions"], clip: 0 },
      { label: "The architecture", title: "Intelligence with human oversight", body: "Connect verified participation, public accountability, legislative action and AI-enabled modernization. Make government more capable while keeping people in control.", visual: "ai-accountability", note: "Proposed architecture. AI supports public decisions within lawful human authority." },
      { label: "Citizen control", title: "The people", body: "The ethical standard begins with the rights of the people the system is intended to serve.", words: ["Freedom", "Accountability", "Human oversight"], clip: 4 },
      { label: "The invitation", title: "A place at the design table", body: "Challenge the architecture. Help establish ethical boundaries and safeguards that can be tested.", visual: "governance" },
    ],
  },
  samsung: {
    id: "samsung", number: 37, name: "Samsung", organization: "A proposed conversation with Yoonie Joung",
    layer: "Physical AI & distribution",
    invitation: "Would Samsung help establish the category and evaluate a dedicated integration initiative?",
    scenes: [
      { label: "AI Living", title: "AI reaches the physical world", body: "Helpful intelligence extends into retail, transport, commercial buildings and community spaces.", words: ["Everyday environments", "Connected devices", "Useful applications"], clip: 0 },
      { label: "Phase One", title: "A proposed network at scale", body: "More than 5,000 locations and approximately 91,000 intelligent displays form the Phase One planning target.", visual: "physical-network", note: "Planning targets. Locations, equipment and deployment agreements are prospective." },
      { label: "The integration", title: "Complementary capabilities", body: "Samsung’s hardware and device security meet Viral Fusion’s proposed software and commercial architecture. A future AI and distribution alliance could extend the system.", words: ["Samsung · physical infrastructure", "Viral Fusion · civic software", "Potential X / xAI · intelligence and reach"], note: "All alliances and integration arrangements remain proposals." },
      { label: "The proposal", title: "A dedicated integration initiative", body: "George proposes leading a confidential special-projects initiative within Samsung, bringing engineering, AI, security and commercial teams together to secure agreements, locations and a deployment roadmap before a coordinated announcement.", visual: "governance", note: "A proposed leadership and integration role. Samsung has not committed to the initiative." },
    ],
  },
  "charles-adkins": {
    id: "charles-adkins", number: 38, name: "Charles Adkins", organization: "Institutional governance and enterprise technology",
    layer: "The first pressure test",
    invitation: "Is Hedera the right technology, what should remain off-chain, and which assumptions should we reconsider?",
    scenes: [
      { label: "Institutional trust", title: "What does serious trust require?", body: "Charles brings experience across government, finance, enterprise technology and distributed systems to challenge the design before institutions depend on it.", words: ["Identity · privacy · security", "Governance · scalability · auditability", "Who controls the rules?"], clip: 0 },
      { label: "The pressure test", title: "Challenge the architecture", body: "Who can change the rules? What happens when something fails? Establish the requirements before asking citizens or institutions to trust the system.", visual: "governance" },
      { label: "Independent verification", title: "Protect the information. Examine the evidence.", body: "Evaluate an independent layer for the integrity and sequence of defined digital events. Sensitive personal information need not go on a public ledger.", words: ["Integrity of defined events", "Private information protected", "Independent examination"], note: "Proposed verification layer. Hedera and alternatives remain under evaluation." },
      { label: "Technical direction", title: "Find the right foundation", body: "Determine where Hedera fits, what stays off-chain and what needs independent audit. If another technology is better, identify it—and the technical leaders needed next.", words: ["Evaluate the alternatives", "Reconsider assumptions", "Mance Harmon · Leemon Baird"], note: "The objective is technical direction. No technology selection or endorsement is implied." },
    ],
  },
  "palmer-luckey": {
    id: "palmer-luckey", number: 39, name: "Palmer Luckey", organization: "Anduril",
    layer: "Security, resilience & government modernization",
    invitation: "Would you help assemble the talent, challenge the architecture and establish the technical standards for tomorrow’s government technology?",
    scenes: [
      { label: "The builder", title: "Engineering for consequential problems", body: "The conversation connects Palmer’s experience building technology companies with California’s infrastructure and institutional needs.", words: ["Engineering talent", "Systems thinking", "A mission worth building"] },
      { label: "Anduril", title: "Critical infrastructure resilience", body: "Explore transparent, performance-based competition for protecting ports, water, energy, communications and transport.", visual: "physical-network", note: "Potential competitive opportunities. No public contract or partnership is represented as secured." },
      { label: "Palmer", title: "The government technology team", body: "A separate personal invitation: help assemble engineers, AI specialists and security architects around accountable public institutions.", visual: "ai-accountability" },
      { label: "Two opportunities", title: "Company capability. Personal leadership.", body: "Anduril could compete on infrastructure. Palmer could help build the engineering organization. Each requires its own evaluation.", words: ["Anduril · critical infrastructure", "Palmer · engineering leadership"] },
    ],
  },
  ford: {
    id: "ford", number: 40, name: "Ford Motor Company", organization: "A proposed conversation with Jim Farley",
    layer: "Connected vehicles & consumer agency",
    invitation: "Could Ford explore an optional civic interface and help examine the policies shaping the vehicle’s future?",
    scenes: [
      { label: "The customer", title: "Agency inside the connected vehicle", body: "The customer’s digital life and freedom of choice establish the starting point for the conversation.", words: ["Customer choice", "A useful AI companion", "Ford’s vehicle authority"], clip: 0 },
      { label: "The interface", title: "A stationary, optional civic interface", body: "Explore legislation while it is being shaped. The longer-term vision includes secure digital ballot access from connected vehicles, with Ford retaining control of its vehicle platform.", visual: "parked-interface", note: "Future concept. Opt-in access, parked use, vehicle safety and official election authorization would be required. This demonstration has no voting capability." },
      { label: "Policy research", title: "A durable automotive policy framework", body: "Engineering, economic analysis and legal drafting could inform a qualified initiative placed before California voters, with the aim of greater regulatory stability across political cycles.", visual: "policy-pathways", note: "Proposed initiative pathway. Qualification, voter approval and amendment requirements remain subject to applicable law." },
      { label: "The partnership", title: "Customer value and American capability", body: "Connect better digital services with skilled trades, workforce development and a serious examination of policy.", words: ["Connected customer experience", "Evidence-based policy work", "Skilled trades and opportunity"], clip: 3 },
    ],
  },
  "lynsi-snyder": {
    id: "lynsi-snyder", number: 41, name: "Lynsi Snyder", organization: "In-N-Out Burger",
    layer: "Food, family & California community",
    invitation: "If you could change three things affecting California families or communities, what would they be—and which would you tackle first?",
    scenes: [
      { label: "California", title: "A conversation grounded in everyday life", body: "Family economics, local businesses and the values behind a California institution open the discussion.", words: ["Family", "Community", "Consumer choice"] },
      { label: "Food policy", title: "Evidence before conclusions", body: "Farmers, ranchers, scientists, businesses and consumers evaluate competing claims about California’s food future.", visual: "legislative", note: "A proposed policy process. Food and health claims require independent evidence." },
      { label: "The priorities", title: "A place for community experience", body: "Explore affordability, agriculture and the work addressing addiction and human trafficking. Let Lynsi identify the priorities she would pursue.", words: ["California agriculture", "Family economics", "Community support"] },
    ],
  },
  chevron: {
    id: "chevron", number: 42, name: "Chevron", organization: "A proposed conversation with Andy Walz",
    layer: "California’s energy future & voter-approved reform",
    invitation: "Would Chevron contribute engineering, expertise and resources to evaluate the choices—and potentially support a transparent, legally compliant initiative effort?",
    scenes: [
      { label: "Everyday energy", title: "The operating reality of energy", body: "Refining, dependable supply and the products people use every day establish the practical stakes.", visual: "energy" },
      { label: "The economics", title: "Costs have several causes", body: "Evaluate supply, infrastructure, market conditions, taxes and regulatory choices together. Compare their effects on affordability and investment.", words: ["Reliability", "Affordability", "Investment conditions"], clip: 0 },
      { label: "Two pathways", title: "Legislative and initiative pathways", body: "Expert analysis and legal drafting can inform conventional legislation or a lawful ballot-initiative route. Each has distinct requirements.", visual: "policy-pathways", note: "Legal review determines the available route and any limits on later amendment." },
      { label: "Public choice", title: "Competing evidence in public view", body: "Industry, environmental stakeholders, consumers and independent experts help make the choices understandable.", visual: "participation" },
    ],
  },
  "x-energy": {
    id: "x-energy", number: 43, name: "X-energy", organization: "A proposed conversation with Dr. Kam Ghaffarian",
    layer: "Advanced energy deployment",
    invitation: "What would California need to change for X-energy to consider investing and deploying here—and would you help put that opportunity before Californians?",
    scenes: [
      { label: "The possibility", title: "Advanced energy for the AI age", body: "Explore dependable electricity and industrial heat alongside local investment and a skilled workforce.", words: ["Electricity", "Industrial heat", "Workforce development"] },
      { label: "The application", title: "Electricity and industrial heat", body: "The Xe-100 design has potential applications in electricity generation and industrial heat. Each configuration connects to different infrastructure and demand.", feature: "xe-100", seconds: 20 },
      { label: "The pathway", title: "Responsible competition", body: "Technology-neutral standards, safety, waste management, economics and environmental review shape any deployment decision.", visual: "feasibility" },
      { label: "The invitation", title: "A workforce and a proving ground", body: "Evaluate the legal pathway, the skills required and the evidence a first project would need to produce.", visual: "governance" },
    ],
  },
  "patrick-soon-shiong": {
    id: "patrick-soon-shiong", number: 44, name: "Dr. Patrick Soon-Shiong", organization: "Healthcare, public understanding and media",
    layer: "Medical innovation & public access",
    invitation: "Would you explore the healthcare opportunity, the media strategy and a personal role in the initiative?",
    scenes: [
      { label: "The patient", title: "Innovation must reach people", body: "Scientific progress raises practical questions about access, delivery, coverage and the institutions surrounding a patient.", words: ["Medical innovation", "Patient access", "Evidence and understanding"] },
      { label: "FDA milestones", title: "Two defined ANKTIVA milestones", body: "The initial 2024 approval concerned BCG-unresponsive disease with carcinoma in situ. The October 2026 expansion includes high-grade papillary-only disease, with BCG.", words: ["April 2024 · initial FDA approval", "14 October 2026 · expanded indication"], clip: 1, note: "Specific adult non-muscle-invasive bladder-cancer indications. These approvals do not apply to all bladder cancers." },
      { label: "The pathway", title: "The journey from discovery to care", body: "Clinical evidence and regulatory review connect to coverage, provider capacity and patient access. Each stage has its own requirements.", visual: "health-access", note: "Conceptual access pathway. No claim of efficacy, guaranteed access or completed reform." },
      { label: "A working session", title: "Make the development process visible", body: "Begin with a serious legislative working session on child trafficking. Bring the relevant experts together to examine the problem, challenge proposals and document the decisions.", visual: "legislative", note: "Proposed proof of process. No completed legislative proposal or working-session agreement is implied." },
      { label: "Before launch", title: "Document the work as it develops", body: "LAT Media Group could explore hosting the first legislative working sessions and documenting the research, disagreements, proposed legislation and decisions before the California launch.", visual: "production", note: "A prospective production relationship. Editorial independence remains distinct from commercial programming." },
      { label: "Launch programming", title: "A continuing public conversation", body: "Recurring live discussions on X Spaces could bring proposals to expert scrutiny and public questions during the proposed California launch.", words: ["Target: 5–10 proposals introduced daily", "X Spaces · expert challenges · public questions", "A continuing legislative conversation"], note: "A programming and development target. This is not a claim of completed drafts, official filings or enacted laws." },
      { label: "The opportunities", title: "Healthcare, media and personal involvement", body: "Explore patient access, a personal role in the initiative, and LAT Media Group’s potential sponsorship of live events as part of a continuing media and distribution strategy.", words: ["Healthcare access", "Media · distribution · live events", "Personal participation"], note: "Future sponsorships, distribution relationships and participation remain prospective." },
    ],
  },
  "brandon-cuevas": {
    id: "brandon-cuevas", number: 45, name: "Brandon Cuevas", organization: "Healthcare economics and operating experience",
    layer: "Healthcare economics & new models",
    invitation: "Would you help examine where the money goes and explore a better model?",
    scenes: [
      { label: "The economics", title: "Real savings—or costs shifted elsewhere?", body: "Follow financing through administration, provider payment and patient care. Examine prior authorization and consolidation, and ask whether a claimed saving eliminates expense or shifts it to someone else.", visual: "health-economics", note: "Illustrative flow. No assumed spending estimates or savings." },
      { label: "AI efficiency", title: "Administrative work with measurable outcomes", body: "Evaluate where AI-assisted processes could remove expense. Keep consequential decisions, human review and appeals visible, and measure real savings alongside patient outcomes.", visual: "ai-accountability" },
      { label: "The hypothesis", title: "Health outcomes and financial incentives", body: "Test how prevention and chronic-disease management affect patient outcomes and total costs.", words: ["Measure patient outcomes", "Evaluate total spending", "Test incentive alignment"], note: "An economic hypothesis. Preventive care does not always reduce total spending." },
      { label: "A new model", title: "Voluntary participation. Serious modeling.", body: "Explore a future healthcare or insurance offering through actuarial analysis, provider networks and appropriate insurer arrangements.", visual: "governance", note: "Prospective platform reach is not enrollment. A real offering requires capital, consumer protections and regulatory review." },
    ],
  },
  "chad-bianco": {
    id: "chad-bianco", number: 46, name: "Sheriff Chad Bianco", organization: "Public safety and operating experience",
    layer: "Public safety & legislative action",
    invitation: "Would you help lead the public-safety effort, develop its legislative agenda and determine which proposals are ready to pursue?",
    scenes: [
      { label: "The experience", title: "Public safety through an operator’s eyes", body: "A focused authentic excerpt establishes the experience and policy questions behind the conversation.", words: ["Firsthand experience", "Policy consequences", "Public accountability"], clip: 0 },
      { label: "Policy development", title: "Experience becomes a testable proposal", body: "Research, economic analysis and legal drafting turn a defined problem into a proposal for expert and public evaluation.", visual: "legislative" },
      { label: "Proof of concept", title: "Apply the same standard to Viral Fusion", body: "Use Chad’s proof-of-concept standard to evaluate the platform itself. Develop a public-safety legislative agenda, examine its consequences and establish which proposals merit action.", words: ["Demonstrate the process", "Examine the consequences", "Earn the confidence to proceed"], clip: 1 },
      { label: "Public evaluation", title: "A lawful route to public choice", body: "Separate civic organizing from official signature verification and election procedures.", visual: "participation", note: "Proposed organizing technology does not certify a petition or replace official verification." },
      { label: "The handoff", title: "The wildcard", body: "The next conversation connects personal loss in the Palisades with public accountability and the experience of running for office.", words: ["Los Angeles", "Public accountability", "Spencer Pratt"], note: "Authentic documentary footage is required for the fire and campaign transition." },
    ],
  },
  "spencer-pratt": {
    id: "spencer-pratt", number: 47, name: "Spencer Pratt", organization: "Los Angeles and civic participation",
    layer: "The wildcard",
    invitation: "What did running for office teach you, and would you consider doing it again?",
    scenes: [
      { label: "The conversation", title: "Personal experience. Public accountability.", body: "A conversation about the Palisades, Los Angeles government and the experience of asking people for their trust.", words: ["Emergency preparedness", "Public safety", "Government accountability"] },
      { label: "Participation", title: "Organizing and official verification", body: "Citizen organization supports a petition process. Public authorities determine whether the legal requirements have been met.", visual: "participation", note: "Concept only. Electronic signatures do not automatically qualify for recall petitions." },
      { label: "The question", title: "A future role in Los Angeles?", body: "The final question leaves room for an unscripted answer and the guest’s own judgment.", words: ["What would you change?", "Would you run again?"], note: "No recall campaign, election qualification or candidacy agreement is represented as established." },
    ],
  },
  "steve-davis": {
    id: "steve-davis", number: 48, name: "Steve Davis", organization: "The Boring Company",
    layer: "California water & underground infrastructure",
    invitation: "Which California infrastructure opportunity would you pilot first—and, if the broader architecture has merit, would you help introduce it to Elon Musk?",
    scenes: [
      { label: "The engineering", title: "What could California build underground?", body: "Tunneling experience opens a conversation about water recovery, conveyance and other infrastructure opportunities.", image: "/guest-series/water-recovery-concept.webp", imageAlt: "Generated engineering concept showing a partial stormwater diversion through underground conveyance to inland treatment, storage and recharge.", note: "AI-generated concept artwork. This is not an existing or approved Boring Company project." },
      { label: "California experience", title: "What happened to the earlier opportunities?", body: "Revisit the Sepulveda corridor, Dodger Stadium and Ontario Airport concepts. Ask what happened and what engineering, economic, administrative or policy lessons should inform a future pilot.", words: ["Sepulveda corridor", "Dodger Stadium", "Ontario Airport"], note: "Historical project concepts. Their mention does not imply completed or currently approved projects." },
      { label: "Water recovery", title: "Reimagining what goes underground", body: "Follow selected stormwater from an existing channel through a proposed diversion and tunnel to treatment, storage or groundwater recharge.", visual: "water-recovery", seconds: 25, note: "Exploratory engineering concept. Recovery depends on hydrology, treatment, storage and environmental requirements." },
      { label: "Desalination", title: "Separate systems. One water pathway.", body: "Distinguish seawater intake, desalination treatment, concentrate discharge and treated-water conveyance to inland networks.", visual: "desalination", seconds: 16, note: "Tunneling supports connections. It does not desalinate water. Energy and marine impacts require evaluation." },
      { label: "The first pilot", title: "An idea becomes a feasibility study", body: "Location, route, treatment capacity, economics and environmental review establish whether a project deserves to advance.", visual: "water-feasibility" },
      { label: "Other corridors", title: "Freight and utilities below the surface", body: "Examine purpose-built freight systems, utility conveyance and communications near existing transport corridors.", visual: "freight", note: "Separate proposed infrastructure. Site design, clearances, rights-of-way and agreements require review." },
      { label: "Policy", title: "Engineering informs the policy question", body: "Determine which obstacles need engineering, financing, administration or changes in law.", visual: "legislative" },
    ],
  },
  "hedera-founders": {
    id: "hedera-founders", number: 49, name: "Mance Harmon & Dr. Leemon Baird", organization: "Governance, engineering and independent evidence",
    layer: "Verification, governance & AI accountability",
    invitation: "Would you help build and independently test the trust architecture for Viral Fusion’s California launch?",
    scenes: [
      { label: "Digital trust", title: "Evidence the public can independently examine", body: "Petitions, legislative records and AI-assisted processes need verifiable evidence. Mance brings governance and commercial experience; Leemon brings technology and mathematics.", words: ["Public verification", "Responsible governance", "Technology evaluated on evidence"] },
      { label: "Governance", title: "Mance: who governs the system?", body: "Who establishes the rules, changes them and controls access? Who audits the operators? Establish accountability alongside the underlying technical infrastructure.", visual: "governance", clip: 0 },
      { label: "Verification", title: "From participation to independent audit", body: "A defined event creates a secure record and selected cryptographic evidence. Examine when it was created, whether it changed and its recorded sequence while protecting sensitive information.", visual: "trust-verification", seconds: 20, note: "Conceptual architecture. Record integrity does not prove the original information was correct or the action authorized." },
      { label: "The integrity check", title: "Change the record. Test the evidence.", body: "Compare an unchanged record with an altered one. A failed integrity check is distinct from testing whether the original action was authorized or accurate.", visual: "proof-test", seconds: 20, note: "Illustrative simulation. No live cryptographic service or independently assessed system is represented." },
      { label: "AI accountability", title: "Leemon: reconstruct what happened", body: "Which system initiated an action? What information informed it? Who authorized it, and did a human review the outcome? An independent auditor must be able to reconstruct the evidence.", visual: "ai-accountability", clip: 1, note: "AI provenance and human oversight require evaluation. A recorded recommendation is not proof that it was correct." },
      { label: "The practical test", title: "Build and prove a narrow application", body: "Start with a petition-related event, legislative record or AI-assisted policy workflow. Test privacy, authorization, reliability, scale and cost under realistic conditions and deliberate attempts to compromise it.", words: ["Define the application and authority", "Test at scale · independently audit", "Select Hedera only if the evidence supports it"] },
    ],
  },
  "michele-chan": {
    id: "michele-chan", number: 50, name: "Michele B. Chan", organization: "NantStudios",
    layer: "The media, experience & execution engine",
    invitation: "Would you help create the production architecture for a new media experience?",
    scenes: [
      { label: "The studio", title: "Shawn Ryan. Elon Musk. The entire series around them.", body: "Imagine a proposed Shawn–Elon interview at NantStudios. Immersive walls bring the evidence, disagreements, discoveries and technologies from the preceding interviews into the conversation.", image: "/guest-series/immersive-studio-concept.webp", imageAlt: "Generated production-design concept of an empty immersive interview studio with wraparound screens displaying energy, water, healthcare and digital trust imagery.", clip: 0, note: "AI-generated production concept. The interview and NantStudios collaboration are unconfirmed. This artwork does not depict an actual NantStudios facility." },
      { label: "Visible systems", title: "Make the complicated understandable", body: "Return to the water, energy, healthcare, legislative and digital-trust systems already examined. Use a consistent visual language.", visual: "water-recovery" },
      { label: "Michele’s story", title: "From storytelling to immersive production", body: "The proposed historical segment connects Michele’s role as Mei Jan in MacGyver: Children of Light with her later work in immersive storytelling and NantStudios.", words: ["Children of Light · Mei Jan", "A fictional story of public participation", "A new production format"], note: "Use an authenticated still or licensed clip. The character’s political beliefs must not be attributed to Michele." },
      { label: "The format", title: "A repeatable production engine", body: "Adapt the series for explainers, live discussions, launch programming and physical locations. Preserve independent inquiry and competing perspectives.", visual: "production", clip: 1 },
      { label: "Distribution", title: "Conversations with a global reach", body: "If future alliances with X and xAI have mutual value, a continuing media and distribution network could carry the series, live programming and public explainers beyond California.", visual: "physical-network", note: "Proposed distribution opportunity. No X, xAI or NantStudios agreement is represented as secured." },
      { label: "Public understanding", title: "Evidence people can question", body: "Shawn leads an independent, unscripted interview. George brings proposals. The monitor makes history, evidence and concepts visible.", words: ["Shawn · independent questions", "George · proposed architecture", "The monitor · evidence and explanation"] },
      { label: "The larger vision", title: "A platform for the next chapter", body: "The proposed California launch and future media network introduce the longer-term America First Party vision developed in subsequent chapters.", words: ["California launch", "Continuing public programming", "America First Party vision"], note: "Future partnerships, distribution commitments and events remain prospective." },
      { label: "The Blueprint", title: "The Blueprint begins to move", body: "Each conversation introduces a capability. The capabilities begin to connect within a larger proposed architecture.", visual: "capability-network", seconds: 14 },
    ],
  },
};
