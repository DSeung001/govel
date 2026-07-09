import fs from "node:fs/promises";
import path from "node:path";

const worldId = process.argv[2];
const issueNumber = process.argv[3] ?? "manual";
if (!worldId) {
  throw new Error("Usage: node scripts/regenerate-world.mjs <worldId> [issueNumber]");
}
if (!/^[a-z0-9-]+$/.test(worldId)) {
  throw new Error(`Invalid world id: ${worldId}`);
}

const worldsRoot = path.resolve(process.cwd(), "worlds");
const worldDir = path.resolve(worldsRoot, worldId);
if (worldDir !== path.join(worldsRoot, worldId)) {
  throw new Error(`World path boundary check failed for id: ${worldId}`);
}
const worldJsonPath = path.join(worldDir, "world.json");
const worldMeta = JSON.parse(await fs.readFile(worldJsonPath, "utf-8"));

const categories = ["characters", "locations", "factions", "rules", "events"];

async function readCategoryDocs(category) {
  const categoryDir = path.join(worldDir, category);
  let entries = [];
  try {
    entries = await fs.readdir(categoryDir, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
  const fileNames = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name).sort();
  const docs = [];
  for (const fileName of fileNames) {
    const filePath = path.join(categoryDir, fileName);
    const content = await fs.readFile(filePath, "utf-8");
    docs.push({ fileName, content: content.trim() });
  }
  return docs;
}

const docsByCategory = {};
for (const category of categories) {
  docsByCategory[category] = await readCategoryDocs(category);
}

const counts = Object.fromEntries(categories.map((category) => [category, docsByCategory[category].length]));
const now = new Date().toISOString().slice(0, 10);

const summary = [
  `# ${worldMeta.title} Summary`,
  "",
  "## Summary",
  "",
  worldMeta.description,
  "",
  "## Details",
  "",
  `- Characters: ${counts.characters}`,
  `- Locations: ${counts.locations}`,
  `- Factions: ${counts.factions}`,
  `- Rules: ${counts.rules}`,
  `- Events: ${counts.events}`,
  "",
  "## Related",
  "",
  "- index.md",
  "- export.md",
  "- changelog.md",
  "",
  "## Changelog",
  "",
  `- ${now}: summary 재생성 (issue #${issueNumber})`,
  "",
].join("\n");

function categorySection(title, docs) {
  if (docs.length === 0) {
    return `## ${title}\n\n- (empty)\n`;
  }
  const merged = docs.map((doc) => doc.content).join("\n\n---\n\n");
  return `## ${title}\n\n${merged}\n`;
}

const exportDoc = [
  "# Govel AI Context Export",
  "",
  "## World",
  "",
  worldMeta.title,
  "",
  "## World Summary",
  "",
  worldMeta.description,
  "",
  "## Core Rules",
  "",
  docsByCategory.rules.length > 0 ? docsByCategory.rules.map((doc) => `- ${doc.fileName.replace(/\.md$/, "")}`).join("\n") : "- (empty)",
  "",
  categorySection("Characters", docsByCategory.characters),
  categorySection("Locations", docsByCategory.locations),
  categorySection("Factions", docsByCategory.factions),
  categorySection("Events", docsByCategory.events),
  "## Timeline",
  "",
  "- See events section for canonical chronology.",
  "",
  "## Writing Constraints",
  "",
  "- Only approved lore is canonical.",
  "- Canonical files must stay in worlds/{world_id}/.",
  "",
  "## Unresolved Questions",
  "",
  "- (pending)",
  "",
  "## Changelog",
  "",
  `- ${now}: export 재생성 (issue #${issueNumber})`,
  "",
].join("\n");

const changelogPath = path.join(worldDir, "changelog.md");
const changelogBase = await fs.readFile(changelogPath, "utf-8");
const changelogNext = `${changelogBase.trim()}\n- ${now}: issue #${issueNumber} 승인 반영\n`;

await fs.writeFile(path.join(worldDir, "summary.md"), summary);
await fs.writeFile(path.join(worldDir, "export.md"), exportDoc);
await fs.writeFile(changelogPath, changelogNext);

worldMeta.updatedAt = now;
await fs.writeFile(worldJsonPath, `${JSON.stringify(worldMeta, null, 2)}\n`);
