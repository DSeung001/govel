---
name: govel-issue-forms
description: >-
  Create or wire Govel lore proposal Issue Forms. Use when editing
  .github/ISSUE_TEMPLATE/lore-proposal.yml or connecting the 설정 제안하기 button
  to GitHub Issue Form URLs.
---

# Govel Issue Forms

## When to Use

- Creating or editing `.github/ISSUE_TEMPLATE/lore-proposal.yml`
- Connecting `[설정 제안하기]` button to the Issue Form
- Testing lore proposal issue creation (MVP phase 2)

## lore-proposal.yml Fields (§8.4)

| Field | Required | Notes |
|-------|----------|-------|
| World | yes | World ID slug (e.g. `black-sun`) |
| Type | yes | Dropdown |
| Proposal Title | yes | Short title for the proposal |
| Proposal Content | yes | Full lore proposal text |
| Related Existing Lore | no | Links or names of related entries |
| Additional Notes | no | Extra context for reviewers |

## Type Options

Character, Location, Faction, Rule, Event, Item, Other

## Issue Form URL Pattern

Link the world home `[설정 제안하기]` button to:

```txt
https://github.com/{owner}/{repo}/issues/new?template=lore-proposal.yml
```

Optional query params to pre-fill World when supported:

```txt
https://github.com/{owner}/{repo}/issues/new?template=lore-proposal.yml&world={world_id}
```

MVP does not build a custom proposal page. GitHub Issue Form is the only submission path.

## Workflow Integration

- `ai-review.yml` triggers on issues opened with the lore-proposal template or `lore-proposal` label
- AI reads form fields from issue body to classify, summarize, and check conflicts

## Reference

- [github-workflow.instructions.md](../../.github/instructions/github-workflow.instructions.md)
- [govel_mvp_plan.md](../../govel_mvp_plan.md) §8.4, §17.2
