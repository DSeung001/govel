# Govel

Govel is a minimal GitHub-native worldbuilding platform.

It implements the MVP loop:

World → Proposal → AI Review → Approve → Markdown Update → Publish

## Core Idea

- Worlds are canonical Markdown files under `worlds/{world_id}/`.
- GitHub Issue Forms collect lore proposals.
- GitHub Actions runs AI review and approval flow.
- World owner approves with `/approve` (or rejects with `/reject`).
- Approved changes update canonical world files and regenerate `summary.md`, `export.md`, `changelog.md`.
- Astro builds and publishes the wiki to GitHub Pages.

## MVP Non-goals

- No database
- No custom login
- No Discussions/giscus workflow
- No Notion/Obsidian import
- No graph visualization
- No novel generation
- No complex dashboard
