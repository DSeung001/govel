# AGENTS.md

This repository contains Govel, a minimal GitHub-native worldbuilding MVP.

## Goal

Implement only the MVP loop:

World → Proposal → AI Review → Approve → Markdown Update → Publish

## Non-goals

Do not implement:
- custom login
- database
- comments
- Discussions workflow
- Notion import
- Obsidian import
- relationship graph
- novel generation
- complex dashboard

## Canonical Data

World data lives in:

`worlds/{world_id}/`

Only approved changes may update these files.

## Required Checks

Before modifying world files:
- verify the world owner
- verify the target path is inside the correct world folder
- reject changes to system files

## Maintaining AI Instructions

This file and [mvp-non-goals.md](mvp-non-goals.md) are the single source of truth for MVP scope.

When changing scope or safety rules:

1. Update `mvp-non-goals.md` or this file first.
2. Sync `.github/copilot-instructions.md` for GitHub Copilot.
3. Sync `.cursor/rules/mvp-scope.mdc` for Cursor.
4. Sync path-scoped mirrors if the rule applies to a specific area:
   - `src/**/*` → `.github/instructions/frontend.instructions.md` + `.cursor/rules/frontend.mdc`
   - `worlds/**/*` → `.github/instructions/world-content.instructions.md` + `.cursor/rules/world-content.mdc`
   - `.github/workflows/**`, `.github/ISSUE_TEMPLATE/**` → `.github/instructions/github-workflow.instructions.md` + `.cursor/rules/github-workflow.mdc`

Do not move GitHub platform files out of `.github/`. Workflows and Issue Templates must stay there.

## Post-MVP

After MVP completion, follow [mvp-cleanup.md](mvp-cleanup.md).