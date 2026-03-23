export type SlideSection = {
  heading?: string;
  items: string[];
};

export type Slide = {
  id: string;
  label: string;
  title: string;
  lead?: string;
  sections: SlideSection[];
  statements: string[];
  type: "cover" | "timeline" | "statement" | "standard" | "map" | "phase1";
};

const slideMatcher = /^(Slide\s+[A-Za-z0-9]+)(?:\s+[—-]\s+(.+))?$/;

function isHeadingCandidate(line: string) {
  return (
    line.length <= 34 &&
    !/[.!?]$/.test(line) &&
    !/\b(By|Chevron)\b/.test(line)
  );
}

function parseSectionLabel(line: string) {
  if (line === "Cover Slide") {
    return { label: line };
  }

  const match = line.match(slideMatcher);
  if (!match) {
    return null;
  }

  return {
    label: match[1],
    inlineTitle: match[2]?.trim(),
  };
}

export function parseSlides(markdown: string): Slide[] {
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[•●▪]\s*/, ""))
    .filter((line, index, array) => !(line === "" && array[index - 1] === ""));

  const rawSlides: { label: string; content: string[]; inlineTitle?: string }[] = [];
  const coverContent: string[] = [];
  let current: { label: string; content: string[]; inlineTitle?: string } | null = null;

  for (const line of lines) {
    const section = parseSectionLabel(line);

    if (section) {
      if (current) rawSlides.push(current);
      current = { label: section.label, content: [], inlineTitle: section.inlineTitle };
      continue;
    }

    if (!line) {
      continue;
    }

    if (!current) {
      coverContent.push(line);
      continue;
    }

    current.content.push(line);
  }

  if (current) rawSlides.push(current);

  if (coverContent.length > 0) {
    rawSlides.unshift({ label: "Cover Slide", content: coverContent });
  }

  return rawSlides.map((entry, index) => {
    if (entry.label === "Cover Slide") {
      const [title = "", lead = "", ...rest] = entry.content;

      return {
        id: `slide-${index + 1}`,
        label: entry.label,
        title,
        lead,
        sections: [],
        statements: rest,
        type: "cover",
      };
    }

    const [firstLine = "", ...remainingLines] = entry.content;
    const title = entry.inlineTitle ?? firstLine;
    const rest = entry.inlineTitle ? entry.content : remainingLines;
    const sections: SlideSection[] = [];
    const statements: string[] = [];

    for (let i = 0; i < rest.length; ) {
      const line = rest[i];
      const next = rest[i + 1];

      if (isHeadingCandidate(line)) {
        const items: string[] = [];
        let cursor = i + 1;

        while (cursor < rest.length && !isHeadingCandidate(rest[cursor])) {
          items.push(rest[cursor]);
          cursor += 1;
        }

        if (items.length > 0) {
          sections.push({ heading: line, items });
          i = cursor;
          continue;
        }
      }

      statements.push(line);
      i += 1;
    }

    const isPhase1 = /^Phase \d+:/i.test(title);

    const isAllianceMap =
      /special projects initiative/i.test(title) &&
      /confidential/i.test(title) &&
      statements.some((statement) => /step 1 industry alliance/i.test(statement)) &&
      sections.length >= 4;

    const type = isPhase1
      ? "phase1"
      : isAllianceMap
      ? "map"
      : /timeline/i.test(title)
        ? "timeline"
        : sections.length === 0 && statements.length <= 1
          ? "statement"
          : "standard";

    return {
      id: `slide-${index + 1}`,
      label: entry.label,
      title,
      lead: sections[0]?.heading,
      sections,
      statements,
      type,
    };
  });
}
