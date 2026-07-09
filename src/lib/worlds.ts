import fs from "node:fs/promises";
import path from "node:path";

const WORLDS_ROOT = path.join(process.cwd(), "worlds");
const CATEGORY_DIRS = ["characters", "locations", "factions", "rules", "events"] as const;
const WIKI_SECTIONS = ["overview", "characters", "locations", "factions", "rules", "events", "changelog", "export"] as const;

export type WikiSection = (typeof WIKI_SECTIONS)[number];

export interface WorldMeta {
  id: string;
  title: string;
  description: string;
  genre: string[];
  owner: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorldSummary extends WorldMeta {
  counts: Record<(typeof CATEGORY_DIRS)[number], number>;
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function countMarkdownFiles(dirPath: string): Promise<number> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).length;
}

export async function listWorldIds(): Promise<string[]> {
  const entries = await fs.readdir(WORLDS_ROOT, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

export async function getWorld(worldId: string): Promise<WorldSummary> {
  const worldDir = path.join(WORLDS_ROOT, worldId);
  const meta = await readJson<WorldMeta>(path.join(worldDir, "world.json"));
  const counts = Object.fromEntries(
    await Promise.all(
      CATEGORY_DIRS.map(async (dirName) => {
        const count = await countMarkdownFiles(path.join(worldDir, dirName));
        return [dirName, count];
      }),
    ),
  ) as WorldSummary["counts"];
  return { ...meta, counts };
}

export async function listWorlds(): Promise<WorldSummary[]> {
  const worldIds = await listWorldIds();
  const worlds = await Promise.all(worldIds.map((worldId) => getWorld(worldId)));
  return worlds.sort((a, b) => a.title.localeCompare(b.title));
}

export function getWikiSections(): WikiSection[] {
  return [...WIKI_SECTIONS];
}

async function readMarkdownFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf-8");
}

async function aggregateCategory(worldId: string, category: (typeof CATEGORY_DIRS)[number]): Promise<string> {
  const dirPath = path.join(WORLDS_ROOT, worldId, category);
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name).sort();
  const docs = await Promise.all(
    files.map(async (fileName) => {
      const doc = await readMarkdownFile(path.join(dirPath, fileName));
      return doc.trim();
    }),
  );
  return docs.join("\n\n---\n\n");
}

export async function getWikiSectionContent(worldId: string, section: WikiSection): Promise<string> {
  const worldDir = path.join(WORLDS_ROOT, worldId);
  switch (section) {
    case "overview":
      return readMarkdownFile(path.join(worldDir, "index.md"));
    case "changelog":
      return readMarkdownFile(path.join(worldDir, "changelog.md"));
    case "export":
      return readMarkdownFile(path.join(worldDir, "export.md"));
    case "characters":
    case "locations":
    case "factions":
    case "rules":
    case "events":
      return aggregateCategory(worldId, section);
    default:
      return "# Not Found";
  }
}

export async function getRecentChangeLines(worldId: string): Promise<string[]> {
  const changelog = await readMarkdownFile(path.join(WORLDS_ROOT, worldId, "changelog.md"));
  return changelog
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .slice(0, 5);
}

export function buildIssueFormUrl(worldId: string): string {
  const repo = process.env.PUBLIC_GOVEL_REPO ?? "DSeung001/govel";
  return `https://github.com/${repo}/issues/new?template=lore-proposal.yml&world=${encodeURIComponent(worldId)}`;
}
