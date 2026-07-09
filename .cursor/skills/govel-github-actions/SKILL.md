---
name: govel-github-actions
description: >-
  Implement or modify Govel GitHub Actions for AI review and /approve handling.
  Use when working on .github/workflows, issue_comment triggers, owner validation,
  or file path boundary checks for world lore approval.
---

# Govel GitHub Actions

## When to Use

- Creating or editing `.github/workflows/ai-review.yml`
- Creating or editing `.github/workflows/approve-proposal.yml`
- Creating or editing `.github/workflows/build-pages.yml`
- Implementing `/approve` or `/reject` comment handling
- Adding safety checks before automated world file updates

## MVP Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ai-review.yml` | Issue opened (lore proposal) | Classify, summarize, conflict check, post AI review comment |
| `approve-proposal.yml` | Issue comment with `/approve` or `/reject` | Validate, apply Markdown changes, close issue |
| `build-pages.yml` | Push to default branch | Deploy static wiki to GitHub Pages |

## AI Review Checklist

On lore proposal issue creation:

1. Read issue form fields: World, Type, Proposal Title, Proposal Content, Related Existing Lore.
2. Classify proposal type (Character, Location, Faction, Rule, Event, Item, Other).
3. Summarize the proposal in plain language.
4. Search existing `worlds/{world_id}/` Markdown for conflicts.
5. List target files to create or modify.
6. Post an Issue comment with classification, summary, conflict result, file list, and `/approve` / `/reject` guidance.
7. Do not auto-approve. Do not modify world files in this workflow.

## Approval Checklist

On `/approve` comment:

1. Parse world id from the issue (form field or labels).
2. Load `worlds/{world_id}/world.json`.
3. Verify comment author equals `world.json.owner`. Fail safely if not.
4. Verify every target path starts with `worlds/{world_id}/`.
5. Reject paths outside the world folder, other worlds, or system files.
6. Allowed extensions only: `.md`, `.json` under the world folder.
7. Never modify: `.github/`, `src/`, `public/`, `package.json`, `README.md`, root config files.
8. Apply approved Markdown changes only after all checks pass.
9. Regenerate `summary.md`, `export.md`, and `changelog.md` (see `govel-world-export` skill).
10. Comment on the issue with apply result, then close the issue.

On `/reject` comment:

1. Verify comment author equals `world.json.owner`.
2. Comment rejection acknowledgment.
3. Close the issue without modifying world files.

## Safety Principles

- Workflows must fail safely: invalid owner, bad path, or missing world → exit with clear error, no partial writes.
- Keep workflows minimal and explicit. No hidden side effects.
- Store AI API keys in GitHub Secrets only. Never read keys from frontend or issue body.
- Never let AI-generated patches modify system files without path validation.

## Reference

- [AGENTS.md](../../AGENTS.md)
- [mvp-non-goals.md](../../mvp-non-goals.md)
- [govel_mvp_plan.md](../../govel_mvp_plan.md) sections 8.5, 8.6, 14, 17
