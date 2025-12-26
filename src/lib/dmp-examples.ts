export const DMP_BADGE_TOOLTIP =
  "The DMP v0.1 badge indicates a claim of compliance with the frozen execution contract. It is not a quality rating, endorsement, or performance guarantee.";

export type DmpExample = {
  name: string;
  problemClass: string;
  description: string;
  directoryPath: string;
  decisionCardPath: string;
};

const decisionCardModules = import.meta.glob(
  "/core/rastion/decision_model_package/examples/*/decision_card.md",
  { query: "?raw", import: "default", eager: true },
);

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\s*([\s\S]*?)\n---\s*/);
  if (!match) {
    return { data: {}, body: raw };
  }

  const data: Record<string, string> = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("-")) {
      continue;
    }
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || !value) {
      continue;
    }
    data[key] = value.replace(/^['"]|['"]$/g, "");
  }

  return { data, body: raw.slice(match[0].length) };
};

const extractFirstParagraph = (body: string) => {
  const lines = body.split("\n");
  const paragraph: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraph.length) {
        break;
      }
      continue;
    }
    if (trimmed.startsWith("#")) {
      continue;
    }
    paragraph.push(trimmed);
  }
  return paragraph.join(" ");
};

export const dmpExamples: DmpExample[] = Object.entries(decisionCardModules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw as string);
    const description = extractFirstParagraph(body);
    const directoryPath = path.replace(/\/decision_card\.md$/, "");

    return {
      name: data.name ?? directoryPath.split("/").slice(-1)[0],
      problemClass: data.problem_class ?? "Unspecified",
      description: description || "No description provided in decision_card.md.",
      directoryPath,
      decisionCardPath: path,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
