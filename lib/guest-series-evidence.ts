/** Primary-source support for the four distinct state examples in slide 38.
 * These cases do not demonstrate a shared architecture or election certification.
 * Captions distinguish government records, finance, law and a historical pilot.
 */
export type GuestSeriesEvidence = {
  sourceSlide: 38;
  state: string;
  fips: string;
  year: string;
  application: string;
  caption: string;
  sources: { label: string; url: string }[];
  note: string;
};

export const guestSeriesEvidence: GuestSeriesEvidence[] = [
  {
    sourceSlide: 38,
    state: "Wyoming",
    fips: "56",
    year: "March 2026",
    application: "Digital finance",
    caption: "Hedera reported FRNT minting on its EVM in March 2026—a state digital-finance example.",
    sources: [
      {
        label: "Hedera · FRNT deployment announcement · 12 March 2026",
        url: "https://hedera.com/blog/wyoming-frontier-stable-token-frnt-now-live-on-hedera/",
      },
    ],
    note: "A state-issued stable-token application. This does not establish election-system suitability or Viral Fusion participation.",
  },
  {
    sourceSlide: 38,
    state: "California",
    fips: "06",
    year: "July 2024",
    application: "Vehicle records",
    caption: "In 2024, project partners reported digitizing 42 million vehicle titles on a DMV-run Avalanche blockchain.",
    sources: [
      {
        label: "Avalanche · California DMV project announcement · 30 July 2024",
        url: "https://www.avalanche.com/about/blog/california-dmv-makes-history-digitizes-42-million-car-titles-on-avalanche-blockchain",
      },
    ],
    note: "The figure is attributed to the technology partners' announcement. That announcement described public mobile-wallet access as forthcoming; it does not establish current public availability, a Hedera deployment or voting capability.",
  },
  {
    sourceSlide: 38,
    state: "Vermont",
    fips: "50",
    year: "Current statute",
    application: "Record authentication",
    caption: "Vermont law sets evidentiary rules for qualifying blockchain-authenticated records; authenticity does not establish the truthfulness of their contents.",
    sources: [
      {
        label: "Vermont Legislature · 12 V.S.A. § 1913 · Blockchain enabling",
        url: "https://legislature.vermont.gov/statutes/section/12/081/01913",
      },
    ],
    note: "The statute includes qualifying conditions and limits. It neither requires blockchain adoption nor establishes authorization for the underlying activity.",
  },
  {
    sourceSlide: 38,
    state: "West Virginia",
    fips: "54",
    year: "2018 pilot · 2020 study",
    application: "Historical mobile-voting pilot",
    caption: "West Virginia piloted mobile voting for some military and overseas voters in 2018; MIT later identified security vulnerabilities in Voatz.",
    sources: [
      {
        label: "West Virginia Broadband · State mobile-voting pilot reference",
        url: "https://broadband.wv.gov/news/wv-secretary-of-state-offers-mobile-voting-app/",
      },
      {
        label: "MIT · Security analysis of Voatz · 2020 research paper",
        url: "https://www.mit.edu/~specter/assets/pdf/SecurityAnalysisOfVoatz_Public.pdf",
      },
      {
        label: "MIT News · Research findings · 13 February 2020",
        url: "https://news.mit.edu/2020/voting-voatz-app-hack-issues-0213",
      },
    ],
    note: "The published research analyzed the Android application available in 2020. It does not demonstrate that any particular 2018 vote was altered. A blockchain component does not resolve all election-security requirements.",
  },
];
