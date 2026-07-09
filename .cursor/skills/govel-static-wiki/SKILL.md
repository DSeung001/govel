---
name: govel-static-wiki
description: >-
  Guide Govel static wiki setup: worlds folder structure, page layout, sidebar,
  and build-pages.yml. Use when scaffolding worlds/{world_id}/, wiki pages in src/,
  or GitHub Pages deployment workflow.
---

# Govel Static Wiki

## When to Use

- Designing or implementing the static world wiki (MVP phase 1)
- Scaffolding `worlds/{world_id}/` file structure
- Building main page, world home, or wiki pages in `src/`
- Writing or editing `.github/workflows/build-pages.yml`

## World Folder Spec (§9)

Each world at `worlds/{world_id}/`:

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

See [world-content.instructions.md](../../.github/instructions/world-content.instructions.md) for `world.json` fields and lore document sections.

## Page Structure (§8.1~8.3)

### Main Page

- Govel logo, short service description
- World cards: title, description, genre, entity counts, last updated, `[세계관 보기]`

### World Home

- Title, description, genre, owner, last updated, summary, recent changes, doc links
- Buttons: `[세계관 읽기]`, `[설정 제안하기]`, `[AI용 Markdown 다운로드]`

### World Wiki

Left sidebar: Overview, Characters, Locations, Factions, Rules, Events, Changelog, Export

Body: render Markdown as-is. Grayscale, notepad-style. No complex cards.

## build-pages.yml

- Trigger on push to default branch
- Build static site (framework TBD — wire `npm run build` when `package.json` exists)
- Deploy to GitHub Pages via `actions/deploy-pages`
- Permissions: `contents: read`, `pages: write`, `id-token: write`

Scaffolding only until frontend framework is chosen.

## Reference

- [frontend.instructions.md](../../.github/instructions/frontend.instructions.md)
- [govel_mvp_plan.md](../../govel_mvp_plan.md) §8, §9, §17.1
