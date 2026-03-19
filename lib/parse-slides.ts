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
  type: "cover" | "timeline" | "statement" | "standard";
};

const sectionMatcher = /^(Cover Slide|Slide\s+[A-Za-z0-9]+)$/;

function isHeadingCandidate(line: string) {
  return (
    line.length <= 34 &&
    !/[.!?]$/.test(line) &&
    !/\b(By|Chevron)\b/.test(line)
  );
}

export function parseSlides(markdown: string): Slide[] {
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line, index, array) => !(line === "" && array[index - 1] === ""));

  const rawSlides: { label: string; content: string[] }[] = [];
  let current: { label: string; content: string[] } | null = null;

  for (const line of lines) {
    if (sectionMatcher.test(line)) {
      if (current) rawSlides.push(current);
      current = { label: line, content: [] };
      continue;
    }

    if (!current || !line) {
      continue;
    }

    current.content.push(line);
  }

  if (current) rawSlides.push(current);

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

    const [title = "", ...rest] = entry.content;
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

    const type =
      /timeline/i.test(title) ? "timeline" : sections.length === 0 && statements.length <= 1 ? "statement" : "standard";

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
