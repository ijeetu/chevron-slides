import type { ViralFusionSlideId } from "./viral-fusion-deck";

/**
 * Spoken script for slides 3–22 of "VF_Pres_11.08.26.docx" (From Promises to Action),
 * with the 11.9.26 revision of Colin's introduction.
 *
 * Each slide lists its spoken segments in order. A segment with `src` has audio and
 * plays as part of the slide voiceover; a segment without one is waiting for a
 * recording. Replace a file and it plays in the same place.
 *
 * George's and Colin's lines use their ElevenLabs voice clones ("George Partsch",
 * "Colin Heaton") until they record them.
 */
export type ScriptSegment = {
  speaker: "george" | "colin";
  text: string;
  /** One file, or several when a long passage was recorded in parts. */
  src?: string | readonly string[];
  /** Spoken after the slide's video: playback waits here until the video is opened and closed. */
  afterVideo?: boolean;
};

const g = (file: string, text: string): ScriptSegment => ({ speaker: "george", text, src: `/voices/george-2611/${file}.mp3` });
const colin = (file: string | readonly string[], text: string): ScriptSegment => ({
  speaker: "colin",
  text,
  src: typeof file === "string" ? `/voices/colin-2611/${file}.mp3` : file.map((f) => `/voices/colin-2611/${f}.mp3`),
});

export const deckScript2611: Partial<Record<ViralFusionSlideId, readonly ScriptSegment[]>> = {
  "colin-intro": [
    colin("c03", "I'm Colin Heaton. I'm a military historian, author, former professor, and veteran of the United States Army and Marine Corps. For decades, I've studied history, interviewed veterans, and worked to preserve the stories and lessons of the past. Helping to bring those stories to new audiences. Today, I'm here supporting a fellow Patriot."),
    colin("c04", "I usually tell the stories of history. Today, we have an opportunity to help make it. The challenges facing our society are extraordinary. And we're going to examine them. Because before we can change the future, we must understand the problems we're trying to solve."),
  ],
  agenda: [
    g("s06", "Our agenda."),
    colin("c06", "First— The Landscape. The problems we face, the systems shaping them, and why conventional approaches may no longer be enough. Then— The Architecture. The technology, legislation, infrastructure, media, and trust required to build something different. Then— The Alliance. The people and companies capable of bringing those pieces together. And finally— The Musk Conversation. Where the ideas, relationships, and capabilities that withstand scrutiny come together— and the next phase could begin."),
  ],
  problems: [
    colin("c07a", "Let's start with what people experience every day. Problems that consume people's attention—and shape their lives."),
    { ...g("s07b", "What you just saw is the world millions of people experience. The problems directly in front of them. I believe these problems, I call insulation and noise, serve a purpose. To keep people overwhelmed. Distracted. And divided. These problems allow decisions involving far greater power, control, and profit to create opportunities to consolidate power, influence, and wealth. I call these Beneath the Noise."), afterVideo: true },
  ],
  competition: [
    // 11.11 revision: no narration — the pie chart moves, then the Chapter 01 video plays.
    { ...g("s09", "Whether every part of that thesis proves correct isn't the point. The more important question is how a relatively small group of technology leaders accumulated this level of influence. The companies. The capital. The networks. The government relationships. The infrastructure. None of it appeared overnight. It was built over decades. And to understand their influence today, we need to understand how it was created. Because power rarely appears suddenly. It compounds. And some of the people shaping the future— have been playing the long game for decades."), afterVideo: true },
  ],
  "long-game": [
    colin("c10a", "Go back far enough— and many technologies now shaping national power were once considered unrealistic. Artificial intelligence at scale. Reusable rockets. Autonomous systems. Private space infrastructure. Software transforming government. Entire industries rebuilt around technology. Some of the people leading these developments spent decades pursuing ideas others doubted could succeed. So to understand their influence today— we need to understand what it took to get here. Let's go back."),
    { ...g("s10a", "Critics dismissed the vision. The technology failed. Capital disappeared. Timelines slipped. But they stayed in the arena. They built. Failed. Raised capital. Lost capital. Rebuilt. And tried again. Over time, ideas once considered impossible became valuable capabilities. Those capabilities entered— Industry. Defense. Government. Capital markets. And national infrastructure. Persistence became capability. Capability became scale. And scale became influence."), afterVideo: true },
    colin("c10b", "That is the long game."),
  ],
  "technological-power": [
    colin("c11a", "Don't get lost in the personalities. Look at what they represent. Technology is becoming one of the defining sources of economic— military— and geopolitical power. Across their different ambitions, one pattern emerges: An effort to build technologies with the potential to shape the next century. Artificial intelligence. Robotics. Advanced manufacturing. Energy. Digital infrastructure. Then accelerate their development. Remove barriers. Mobilize capital. Expand domestic capability. And increasingly— bring government and industry together to move faster. This is more than technological progress. It is a strategy for national power."),
    colin("c11b", "And that leads to a harder question. If the technology exists— the capital exists— the talent exists— and powerful institutions recognize the need for change— why is changing the system itself still so difficult? Because technology is only one layer of power. Behind public policy sits another architecture. Donors. Foundations. Advocacy organizations. Political networks. Media. Legal institutions. Private capital. And competing centers of influence. Technology may determine what is possible. But networks can determine what becomes funded, permitted, adopted, and institutionalized. Which brings us to another form of power. The network."),
  ],
  networks: [
    g("s12a", "Technology companies demonstrate how innovation— capital— and infrastructure— can compound power. And those capabilities can do extraordinary things. Strengthen our military. Support law enforcement. Protect our communities. But technological power is only part of the picture."),
    colin("c12a", "Political influence can compound too. Over decades— foundations— donors— advocacy organizations— legal groups— media— research institutions— and political networks— can form an ecosystem capable of shaping public debate— public policy— and institutional priorities. One of the most debated examples is the network associated with George Soros and the Open Society Foundations. Supporters describe its work as philanthropy advancing democracy— civil society— and human rights. Critics see something more consequential: A long-term architecture of political and institutional influence. This segment examines that argument."),
    { ...g("s12b", "Whatever conclusion you draw about Soros himself— the larger lesson matters. Networks compound power. Capital alone is powerful. But connect it to— Institutions. Media. Law. Politics. Research. And organized action. And it becomes something much larger. It becomes durable. Distributed. And capable of influencing decisions long after any single election— or individual— is gone."), afterVideo: true },
    colin("c12b", "And this is where the balance of power can change. Because historically— building influence at this scale took decades. But what happens when technology compresses that timeline? What happens when citizens can— Organize. Understand. Create change. And pursue lawful reform— faster than traditional institutions were designed to operate?"),
    g("s12c", "Then the advantage of established networks could begin to weaken. Not because one powerful network replaces another— but because citizens gain infrastructure of their own."),
    colin("c12c", "And when networks cross borders— connecting capital— policy— technology— and institutions— the scale changes again. Because beyond domestic influence— the competition becomes global. And so does the opportunity."),
    g("s12d", "Because our vision is global too."),
  ],
  "global-incentives": [
    colin("c13", "Political networks are one layer. But beyond domestic politics, the forces become global. In the next video, Andrei Jikh explores four competing explanations for how some of these forces may be interacting. Iranian economic warfare. Transnational capital. American energy strategy. And a geopolitical interpretation shaped by religious prophecy. Different actors. Different motives. Different theories. But one question connects them: What happens when powerful interests pursue their own objectives—and those interests collide? And what happens to ordinary people caught in the middle? This is not one prediction. It is a map of competing incentives. Let's watch."),
  ],
  "what-we-learned": [
    colin("c14a", "Pull back. What have we actually seen? At the surface— the problems people experience every day. Beneath them— competing centers of power. Technology becoming a source of national influence. Networks capable of accumulating power over decades. And global systems operating according to different incentives. Different players. Different motives. Different theories. But one recurring concern: Many of the decisions shaping people's lives are made at levels where ordinary citizens have little direct influence."),
    g("s14a", "And that is why we went beneath the noise. Not simply to expose problems. To identify what is missing. If capital can organize— If industries can organize— If political networks can organize— And if technology can organize— Then We the People need infrastructure capable of organizing too. Not merely to complain. To understand. To verify. To coordinate. To participate. And ultimately— To act. Because our Republic cannot be preserved by promises alone. It requires action."),
    colin("c14b", "So the question becomes— How do citizens gain meaningful agency over what comes next?"),
    g("s14b", "We build it."),
  ],
  "executing-vision": [
    g("s15a", "A movement can start with one man— someone who executes a strong vision with absolute conviction and puts in the time. His vision— look at what it became."),
    g("s15b", "But the people are ready for more than talk and debate. We've had plenty of that over the decades. And simply showing up to vote hasn't always delivered the results people were promised. So I have to ask you: Do our votes count? With absolute certainty? And how do we actually hold our leaders accountable— to the promises they've made to the people, and the oath they've sworn to the Constitution?"),
    g("s15c", "What do we do when our constitutional republic is no longer working for “We the People”? When our elected representatives serve interests other than those of the citizens they're supposed to represent? When political leaders speak of protecting our democracy— yet the system doesn't provide a meaningful way to create change?"),
    g("s15d", "I want you to see what becomes possible when we combine the raw distribution power of a podcast— with a strong strategy, the right operational tools, intelligence, and people who share a common purpose. Not simply to start another conversation. But to put a series of actions into motion. To demonstrate through execution what America First can mean. And through the results we achieve— build the foundation for the movement and new political party we envision."),
    g("s15e", "TPUSA was a turning point. This platform is what comes next."),
  ],
  inspiration: [
    g("s16", "We can partner to help make this happen."),
  ],
  "mission-vision": [
    g("s17", "Our Mission: Return power to the people by rebuilding public institutions with technology that unlocks civic trust and economic value at scale. Our Vision: Make the public will impossible to ignore by turning raw civic engagement into a data-driven engine for structural reform."),
  ],
  "five-pillars": [
    colin("c18", "If citizens are going to meaningfully shape what comes next— they need more than a voice. They need the infrastructure to act."),
    g("s18a", "Look at the board. Technology. Connectivity. Sustainability. Media Rails. A Powerful Ecosystem. Individually— they are capabilities. Connected— they become infrastructure. Technology creates capability. Connectivity creates scale. Sustainability creates longevity. Media Rails create understanding and distribution. And the ecosystem brings together the people— capital— institutions— and expertise— required to turn opportunity into action. Because— action is the ultimate currency of freedom."),
    g("s18b", "Every pillar serves one objective: Shorten the distance between public voice and lawful action. Deploy. Integrate. Build new rails. Scale. And as these pillars work together— citizens become participants in shaping what comes next. This is the Blueprint we're preparing to put into action. And I'll show you how we intend to build it— and the part you can play in making it happen."),
  ],
  "operating-system": [
    g("s19", "Let's take a look at our operating system."),
  ],
  "viral-fusion": [
    g("s20", "We call it Viral Fusion. And it will connect voices and power change. However, Phase 1 has a different priority."),
  ],
  "civic-os": [
    colin("c21", "Phase One begins with a Civic Operating System built around three core functions. First — Verify the Citizen. Second — Capture the Public Will. Record legitimate participation and real-time public sentiment. Third — Verify the Signal. Anchor defined events through tamper-evident digital records, creating an auditable record of public demand."),
    g("s21a", "But when official elections are involved— there is a higher standard. Citizens should never be asked to blindly trust software. The technology should support the election— not replace the safeguards around it. That means: paper ballots for the physical record— secure digital rails for verification and traceability— and independent parallel audits for accountability. Three layers. One purpose: make the result independently verifiable."),
    g("s21b", "Paper provides the physical record. Digital systems help establish integrity and traceability. Independent audits challenge both. The goal is not blind trust. It is verifiable trust. And paper is not the ideology. Verification is."),
    g("s21c", "Because one day— technology may meet a higher standard of: security— privacy— accessibility— auditability— and public confidence than paper can provide on its own. Our architecture is designed for that future. The objective is not simply to digitize the old system. It is to replace outdated processes with something more secure— more efficient— more verifiable— and ultimately more participatory. Paper is the bridge. Verification is the standard. And the architecture is designed to evolve. And it will."),
  ],
  "physical-infrastructure": [
    colin("c22a", "Digital participation is one layer. But meaningful reach requires infrastructure beyond the screen in someone's hand. A distributed network of intelligent, connected assets— positioned where people already live, work, travel, and gather. These are more than advertising displays. They are designed to become physical gateways into the civic ecosystem. Bringing public-interest information into everyday environments— connecting citizens to digital participation— and extending the platform's reach into the physical world."),
    g("s22a", "And this is where ownership matters. If we control the physical infrastructure— we control the environment. The distribution. The integration. The user experience. And the applications built on top of it. That creates a commercial engine around the civic layer: advertising— media— enterprise services— brand partnerships— data and analytics— and future AI applications."),
    g("s22b", "The objective is not infrastructure dependent on donations— grants— or one political cycle. The commercial engine helps finance the public infrastructure. It maintains it. Expands it. Upgrades it. And gives the system an economic reason to endure."),
    colin("c22b", "That is the model. A physical civic network supported by commercial activity— designed to sustain itself beyond any single campaign, platform, or political moment."),
    g("s22c", "And that brings us to the final reason this physical layer matters: resilience. A civic system this important should not disappear because: one platform changes its rules— restricts access— loses relevance— or shuts down. So the objective is bigger than distribution. It is permanence. A durable physical foundation— connected to digital systems— commercially sustainable— and resilient enough to support a new civic era."),
  ],
  // Slide 23 (11.9.26): Colin's new narration around George's existing recording, split in three.
  "strategic-alliance": [
    colin("c23a", "The physical layer gives the Civic Operating System a presence in the real world. But participation reaches its full potential when it can move at scale. A strategic alliance with X and xAI could create an extraordinary opportunity— connecting civic participation— real-time information— artificial intelligence— and global distribution. Accelerating understanding. Participation. And adoption. X and xAI represent our preferred strategic alliance. But the extent of that relationship will depend on the vision we share— the capabilities each party brings— and the value we can create together. Viral Fusion is not designed to be dependent on X. The Civic Operating System is intended to operate independently— while supporting integration with other compatible platforms— including Facebook and other distribution networks, where permitted. The partnership strategy can evolve. But the independence of the civic infrastructure remains fundamental."),
    { speaker: "george", src: "/voices/george-2611/g23a.mp3", text: "But acceleration without resilience creates dependency. And there is one principle we cannot compromise: No civic infrastructure this important should have a single point of failure. Not one company. Not one platform. Not one distribution channel. Not even an extraordinary one." },
    { speaker: "george", src: "/voices/george-2611/g23b.mp3", text: "That is why the architecture includes a second rail: A Sovereign Parallel Network. Independent. Verifiable. Redundant. Designed to preserve continuity when conventional channels are: disrupted— restricted— unavailable— or simply change. X and xAI give us acceleration. The parallel network gives us resilience. One helps us reach the world. The other ensures the infrastructure can endure. Together— they create scale without dependency." },
    colin("c23b", "And that independence becomes even more important as the architecture expands internationally. Different countries. Different laws. Different cultures. Different risks. But one shared challenge: How can lawful public participation remain accessible when the environment around it becomes unstable? Technology can amplify a voice. But reaching people is not enough. The infrastructure carrying that voice must also be designed to remain available— verifiable— and resilient— when it matters most."),
    { speaker: "george", src: "/voices/george-2611/g23c.mp3", text: "Every nation will require its own safeguards. Its own legal framework. Its own implementation. But the principle travels: lawful public participation should never depend on a single gatekeeper. And lawful public will should have a resilient path to be heard. That is how a civic platform becomes something larger. Not merely national infrastructure. An architecture capable of scaling globally—without surrendering its independence." },
    colin("c23c", "The bottom line: Public participation— can become verified public demand. Verified demand— can provide the foundation for lawful action. And distribution and resilience determine how far— and how reliably— that participation can reach. The objective is to dramatically shorten the distance between— voice— verification— and action. At the speed of the digital age."),
  ],
};

/** Audio tracks for a slide, in script order, skipping segments still waiting for a recording. */
export function scriptTracks(id: ViralFusionSlideId) {
  return deckScript2611[id]?.flatMap((segment) => (segment.src ? [segment.src].flat() : []));
}

/** Track indices (into scriptTracks) where the voiceover waits for the slide's video. */
export function scriptVideoGates(id: ViralFusionSlideId) {
  const gates: number[] = [];
  let index = 0;
  for (const segment of deckScript2611[id] ?? []) {
    if (!segment.src) continue;
    if (segment.afterVideo) gates.push(index);
    index += [segment.src].flat().length;
  }
  return gates;
}
