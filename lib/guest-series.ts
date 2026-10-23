import type { GuestConceptKind } from "@/components/guest-concept-visual";

/** Audience copy distilled from Guest_Series_Jeetu.docx, 21 October 2026.
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
      { label: "The architecture", title: "Intelligence with human oversight", body: "Verified participation connects to AI-assisted systems, lawful human authority and independent audit.", visual: "ai-accountability", note: "Proposed architecture. AI supports public decisions within lawful human authority." },
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
      { label: "The proposal", title: "An ecosystem prepared for execution", body: "Evaluate engineering, AI, security, commercial relationships and a deployment roadmap before a coordinated announcement.", visual: "governance" },
    ],
  },
  "charles-adkins": {
    id: "charles-adkins", number: 38, name: "Charles Adkins", organization: "Institutional governance and enterprise technology",
    layer: "The sovereign trust challenge",
    invitation: "Where would you challenge this architecture before any public institution depends on it?",
    scenes: [
      { label: "The challenge", title: "Who controls the infrastructure?", body: "Rules, permissions, institutional accountability and operational continuity determine where trust comes from.", words: ["Who sets the rules?", "Who can change them?", "What happens during a failure?"] },
      { label: "Sovereign core", title: "Sovereign core. Public proof", body: "Protected civic records stay within the governed core. Only defined cryptographic commitments cross into public verification.", visual: "sovereign-core", seconds: 14, note: "Proposed architecture. Hedera is one potential public anchoring service." },
      { label: "Four protections", title: "Four different trust problems", body: "Inclusion, independent publication, selected private statements and the integrity of the whole process require distinct safeguards.", visual: "trust-layers", seconds: 18 },
      { label: "The integrity test", title: "A valid proof has a defined scope", body: "Changing a committed record should break the comparison. An unchanged record can still have an unauthorized or incorrect origin.", visual: "proof-test", seconds: 16, note: "Illustrative simulation. Record integrity does not establish truth, eligibility or official election security." },
      { label: "Public applications", title: "Four public-sector reference cases", body: "Public-sector reference cases examine digital finance, vehicle titles, authenticated records and a historical mobile-voting pilot.", feature: "state-precedents", seconds: 24 },
      { label: "The evaluation", title: "Requirements determine the technology", body: "Compare governance, privacy, costs, continuity and independent verification before committing to a network.", visual: "governance" },
    ],
  },
  "palmer-luckey": {
    id: "palmer-luckey", number: 39, name: "Palmer Luckey", organization: "Anduril",
    layer: "Security, resilience & government modernization",
    invitation: "Would you help assemble the team to explore the next generation of government technology?",
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
      { label: "The interface", title: "A stationary, optional civic interface", body: "A proposed display lets a customer explore information and participation when the vehicle is parked. Ford retains control of the vehicle platform.", visual: "parked-interface", note: "Concept only. Opt-in access, parked use and vehicle safety remain design requirements." },
      { label: "Policy research", title: "A separate automotive policy pathway", body: "Bring engineering and customer experience into research, economic analysis, legal drafting and public evaluation.", visual: "legislative" },
      { label: "The partnership", title: "Customer value and American capability", body: "Connect better digital services with skilled trades, workforce development and a serious examination of policy.", words: ["Connected customer experience", "Evidence-based policy work", "Skilled trades and opportunity"], clip: 3 },
    ],
  },
  "lynsi-snyder": {
    id: "lynsi-snyder", number: 41, name: "Lynsi Snyder", organization: "In-N-Out Burger",
    layer: "Food, family & California community",
    invitation: "Which priorities would you bring to the table for California’s families and communities?",
    scenes: [
      { label: "California", title: "A conversation grounded in everyday life", body: "Family economics, local businesses and the values behind a California institution open the discussion.", words: ["Family", "Community", "Consumer choice"] },
      { label: "Food policy", title: "Evidence before conclusions", body: "Farmers, ranchers, scientists, businesses and consumers evaluate competing claims about California’s food future.", visual: "legislative", note: "A proposed policy process. Food and health claims require independent evidence." },
      { label: "The priorities", title: "A place for community experience", body: "Explore affordability, agriculture and the work addressing addiction and human trafficking. Let Lynsi identify the priorities she would pursue.", words: ["California agriculture", "Family economics", "Community support"] },
    ],
  },
  chevron: {
    id: "chevron", number: 42, name: "Chevron", organization: "A proposed conversation with Andy Walz",
    layer: "Energy, reliability & public policy",
    invitation: "Would you help evaluate an energy framework the public can understand and scrutinize?",
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
    invitation: "What would a responsible California pathway for advanced energy require?",
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
      { label: "Public understanding", title: "A continuing conversation", body: "Explore independent interviews, policy sessions, legislative explainers and live programming before and after a proposed California launch.", visual: "production" },
      { label: "Launch programming", title: "A proposed daily policy cadence", body: "Live policy sessions could introduce proposals to expert scrutiny and public questions during the California launch.", words: ["Target: 5–10 proposals introduced daily", "Expert challenges and public questions", "A continuing legislative conversation"], note: "A programming and development target. This is not a claim of completed drafts, official filings or enacted laws." },
      { label: "The opportunities", title: "Healthcare, media and personal involvement", body: "Examine the roles separately, including editorial independence and the evidence needed to evaluate public claims.", words: ["Healthcare access", "Media and distribution", "Personal participation"], note: "Production and proposal-volume ambitions are planning targets, not completed agreements or filings." },
    ],
  },
  "brandon-cuevas": {
    id: "brandon-cuevas", number: 45, name: "Brandon Cuevas", organization: "Healthcare economics and operating experience",
    layer: "Healthcare economics & new models",
    invitation: "Would you help examine where the money goes and explore a better model?",
    scenes: [
      { label: "The economics", title: "Where the healthcare dollar goes", body: "Follow financing through administration, provider payment and patient care. Ask which costs improve outcomes and which create friction.", visual: "health-economics", note: "Illustrative flow. No invented percentages or spending estimates." },
      { label: "AI efficiency", title: "Administrative work with human accountability", body: "Compare today’s workflow with a proposed AI-assisted process. Keep consequential decisions, review and appeals visible.", visual: "ai-accountability" },
      { label: "The hypothesis", title: "Health outcomes and financial incentives", body: "Test how prevention and chronic-disease management affect patient outcomes and total costs.", words: ["Measure patient outcomes", "Evaluate total spending", "Test incentive alignment"], note: "An economic hypothesis. Preventive care does not always reduce total spending." },
      { label: "A new model", title: "Voluntary participation. Serious modeling.", body: "Explore a future healthcare or insurance offering through actuarial analysis, provider networks and appropriate insurer arrangements.", visual: "governance", note: "Prospective platform reach is not enrollment. A real offering requires capital, consumer protections and regulatory review." },
    ],
  },
  "chad-bianco": {
    id: "chad-bianco", number: 46, name: "Sheriff Chad Bianco", organization: "Public safety and operating experience",
    layer: "Public safety & legislative action",
    invitation: "Which public-safety problem would you bring into a serious legislative development process?",
    scenes: [
      { label: "The experience", title: "Public safety through an operator’s eyes", body: "A focused authentic excerpt establishes the experience and policy questions behind the conversation.", words: ["Firsthand experience", "Policy consequences", "Public accountability"], clip: 0 },
      { label: "Policy development", title: "Experience becomes a testable proposal", body: "Research, economic analysis and legal drafting turn a defined problem into a proposal for expert and public evaluation.", visual: "legislative" },
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
    invitation: "Which California infrastructure opportunity would you examine first, and what would a meaningful pilot require?",
    scenes: [
      { label: "The engineering", title: "What could California build underground?", body: "Tunneling experience opens a conversation about water recovery, conveyance and other infrastructure opportunities.", image: "/guest-series/water-recovery-concept.webp", imageAlt: "Generated engineering concept showing a partial stormwater diversion through underground conveyance to inland treatment, storage and recharge.", note: "AI-generated concept artwork. This is not an existing or approved Boring Company project." },
      { label: "Water recovery", title: "Reimagining what goes underground", body: "Follow selected stormwater from an existing channel through a proposed diversion and tunnel to treatment, storage or groundwater recharge.", visual: "water-recovery", seconds: 25, note: "Exploratory engineering concept. Recovery depends on hydrology, treatment, storage and environmental requirements." },
      { label: "Desalination", title: "Separate systems. One water pathway.", body: "Distinguish seawater intake, desalination treatment, concentrate discharge and treated-water conveyance to inland networks.", visual: "desalination", seconds: 16, note: "Tunneling supports connections. It does not desalinate water. Energy and marine impacts require evaluation." },
      { label: "The first pilot", title: "An idea becomes a feasibility study", body: "Location, route, treatment capacity, economics and environmental review establish whether a project deserves to advance.", visual: "water-feasibility" },
      { label: "Other corridors", title: "Freight and utilities below the surface", body: "Examine purpose-built freight systems, utility conveyance and communications near existing transport corridors.", visual: "freight", note: "Separate proposed infrastructure. Site design, clearances, rights-of-way and agreements require review." },
      { label: "Policy", title: "Engineering informs the policy question", body: "Determine which obstacles need engineering, financing, administration or changes in law.", visual: "legislative" },
    ],
  },
  "hedera-founders": {
    id: "hedera-founders", number: 49, name: "Mance Harmon & Dr. Leemon Baird", organization: "Governance, engineering and independent evidence",
    layer: "The trust architecture",
    invitation: "What would you change before allowing something this important to depend on the design?",
    scenes: [
      { label: "The foundation", title: "The architecture returns as an engineering question", body: "Revisit the sovereign core and public proof model, then ask what must be built and tested.", visual: "sovereign-core" },
      { label: "Governance", title: "Mance: authority and continuity", body: "Who operates the core, controls permissions and changes the rules? What continues when the public anchoring service is unavailable?", visual: "governance", note: "Proposed continuity design. An anchoring outage can delay independent public verification." },
      { label: "Engineering", title: "Leemon: a design that withstands scrutiny", body: "Evaluate commitments, selected privacy proofs, operating costs, compromised devices and failures.", visual: "trust-layers" },
      { label: "Prototype", title: "Test the failure", body: "A fictional nonbinding record produces an illustrative receipt. Compare the original, alter it, then try an unauthorized event.", visual: "proof-test", seconds: 30, note: "Conceptual simulation. No live ledger, cryptographic service or independent security assessment is claimed." },
      { label: "AI provenance", title: "Reconstruct what happened", body: "Distinguish the human request, AI recommendation, authorization boundary, recorded action and independent review.", visual: "ai-accountability", note: "An audit trail records evidence. It does not independently prove that a recommendation was correct." },
      { label: "Independent testing", title: "Design. Build. Test. Verify.", body: "Begin with a narrow civic workflow. Independently evaluate its security, privacy, continuity and cost before broader deployment.", words: ["Defined scope", "Deliberate failure tests", "Independent assessment"] },
    ],
  },
  "michele-chan": {
    id: "michele-chan", number: 50, name: "Michele B. Chan", organization: "NantStudios",
    layer: "The media, experience & execution engine",
    invitation: "Would you help create the production architecture for a new media experience?",
    scenes: [
      { label: "The studio", title: "The entire series becomes part of the conversation", body: "Explore an immersive production environment where the evidence and ideas from preceding interviews surround a future conversation.", image: "/guest-series/immersive-studio-concept.webp", imageAlt: "Generated production-design concept of an empty immersive interview studio with wraparound screens displaying energy, water, healthcare and digital trust imagery.", clip: 0, note: "AI-generated production concept. The interview and NantStudios collaboration are unconfirmed. This artwork does not depict an actual NantStudios facility." },
      { label: "Visible systems", title: "Make the complicated understandable", body: "Return to the water, energy, healthcare, legislative and digital-trust systems already examined. Use a consistent visual language.", visual: "water-recovery" },
      { label: "The format", title: "A repeatable production engine", body: "Adapt the series for explainers, live discussions, launch programming and physical locations. Preserve independent inquiry and competing perspectives.", visual: "production", clip: 1 },
      { label: "Public understanding", title: "Evidence people can question", body: "Shawn leads an independent, unscripted interview. George brings proposals. The monitor makes history, evidence and concepts visible.", words: ["Shawn · independent questions", "George · proposed architecture", "The monitor · evidence and explanation"] },
      { label: "The larger vision", title: "A platform for the next chapter", body: "The proposed California launch and future media network introduce the longer-term America First Party vision developed in subsequent chapters.", words: ["California launch", "Continuing public programming", "America First Party vision"], note: "Future partnerships, distribution commitments and events remain prospective." },
      { label: "The Blueprint", title: "The Blueprint begins to move", body: "Each conversation introduces a capability. The capabilities begin to connect within a larger proposed architecture.", visual: "capability-network", seconds: 14 },
    ],
  },
};
