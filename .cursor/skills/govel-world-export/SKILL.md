---
name: govel-world-export
description: >-
  Update Govel world summary, export, and changelog after lore approval.
  Use when regenerating worlds/{world_id}/summary.md, export.md, or changelog.md
  after approved Markdown changes.
---

# Govel World Export

## When to Use

- After `/approve` applies Markdown changes to a world
- When creating or refreshing `summary.md`, `export.md`, or `changelog.md`
- When consolidating world lore into a single AI-friendly export file

## Post-Approval Update Order

After approved Markdown files are written:

1. Update affected lore Markdown files (`characters/`, `locations/`, `factions/`, `rules/`, `events/`).
2. Regenerate `summary.md` with a concise world overview.
3. Regenerate `export.md` as the single AI context file.
4. Append an entry to `changelog.md` with date, proposal summary, and changed files.
5. Update `world.json` `updatedAt` if the schema includes it.

## summary.md

- Short world overview for the wiki home and list cards.
- Highlight core rules and major entities.
- Keep it readable for humans browsing the site.

## export.md Structure

Path: `worlds/{world_id}/export.md`

Use this section order:

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

Rules:

- Optimize for AI context: dense, structured, self-contained.
- Pull content from canonical lore Markdown files; do not invent lore.
- Include cross-references where helpful.
- Keep headings stable so downstream tools can parse predictably.

## changelog.md

Each approved proposal adds one entry:

- Date
- Proposal title or short summary
- Files created or modified
- Approver (GitHub username)

## Content Rules

- Markdown files are canonical lore. `export.md` is a derived aggregate, not a second source of truth.
- Use stable sections in lore files: Summary, Details, Related, Changelog.
- Do not invent complex schemas unless required.

## Reference

- [.github/instructions/world-content.instructions.md](../../.github/instructions/world-content.instructions.md)
- [govel_mvp_plan.md](../../govel_mvp_plan.md) sections 11, 12
