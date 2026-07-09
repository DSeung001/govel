---
applyTo: "src/**/*.{ts,tsx,css,mdx}"
---

# Frontend Instructions

## General

- Build a minimal document-style UI.
- Do not use colorful design systems.
- Use simple layout: header, sidebar, content.
- The world wiki should feel like a plain notepad or simple documentation site.
- Avoid modals unless necessary.
- Avoid client-side complexity unless required.
- Use grayscale only. No complex animations. Buttons are simple rectangular controls.

## Main Page

Purpose: show the list of published worlds.

Display:

- Govel logo
- Short service description
- World card list

Each world card shows:

- World title
- Short description
- Genre tags
- Characters count
- Locations count
- Factions count
- Rules count
- Last updated date
- `[세계관 보기]` button

## World Home

Purpose: first impression; lead to read, propose, or download.

Display:

- World title
- World description
- Genre tags
- Owner (admin)
- Last updated
- Core setting summary
- Recent changes
- Key document links

Buttons:

- `[세계관 읽기]`
- `[설정 제안하기]` — links to GitHub Issue Form URL (no custom proposal page in MVP)
- `[AI용 Markdown 다운로드]` — links to `worlds/{world_id}/export.md`

## World Wiki

Purpose: render approved canonical lore only.

Left sidebar menu:

- Overview
- Characters
- Locations
- Factions
- Rules
- Events
- Changelog
- Export

Body:

- Render Markdown files as-is.
- No complex card UI.
- Plain notepad-style reading experience.
