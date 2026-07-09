---
applyTo: "worlds/**/*.md,worlds/**/*.json"
---

# World Content Instructions

## General

- Markdown files are canonical lore.
- Keep headings simple.
- Use stable sections: Summary, Details, Related, Changelog.
- Do not invent complex schemas unless required.
- `export.md` must be optimized for AI context.

## World Folder Structure (§9)

Each world lives at `worlds/{world_id}/`:

```txt
world.json
index.md
summary.md
export.md
changelog.md
characters/
locations/
factions/
rules/
events/
```

## world.json Fields (§10)

- `id` — world slug (e.g. `black-sun`)
- `title` — display name
- `description` — short intro
- `genre` — array of genre tags
- `owner` — GitHub username of world admin
- `status` — e.g. `open`
- `createdAt`, `updatedAt` — ISO date strings

## Lore Document Sections (§11)

Use entity-appropriate sections. Common patterns:

- `## Type` — Character, Location, Faction, Rule, Event, etc.
- `## Summary` — one-paragraph overview
- `## Personality` — for characters
- `## Role`, `## Side Effect` — for factions or rules
- `## Related` — links to other lore entries

`index.md` includes world intro, core settings, and links to major categories.

## export.md Structure (§12)

Path: `worlds/{world_id}/export.md`

Section order:

```md
# Govel AI Context Export

## World
## World Summary
## Core Rules
## Characters
## Locations
## Factions
## Events
## Timeline
## Writing Constraints
## Unresolved Questions
## Changelog
```

Regenerate after every approved lore change. Pull from canonical lore files; do not invent content.
