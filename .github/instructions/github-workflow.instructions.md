---
applyTo: ".github/workflows/*.yml,.github/ISSUE_TEMPLATE/*.yml"
---

# GitHub Workflow Instructions

## General

- Keep workflows minimal and explicit.
- Workflows must fail safely.
- Approval workflow must verify world owner.
- Approval workflow must verify file path boundaries.
- Never let AI-generated patches modify system files.
- Store AI API keys in GitHub Secrets only.

## Issue Form — lore-proposal.yml (§8.4)

Fields:

- World
- Type
- Proposal Title
- Proposal Content
- Related Existing Lore
- Additional Notes

Type options: Character, Location, Faction, Rule, Event, Item, Other

MVP does not use a custom proposal page. The `[설정 제안하기]` button links to this Issue Form.

## AI Review — ai-review.yml (§8.5)

Trigger: lore proposal issue opened.

AI tasks:

1. Classify proposal type
2. Summarize core content
3. Check conflicts with existing world Markdown
4. List files to create or modify
5. Generate Markdown change draft
6. Guide admin commands

Comment format:

```txt
## AI Review

분류: {Type}

이름: {title}

요약:
{summary}

충돌 검사:
{conflict result}

변경 예정 파일:
- worlds/{world_id}/...

관리자 명령:
- /approve
- /reject
```

Do not auto-approve. Do not modify world files in this workflow.

## Approval — approve-proposal.yml (§8.6, §14)

Commands: `/approve`, `/reject`

On `/approve`:

1. Verify comment author equals `world.json.owner`
2. Verify target paths are inside `worlds/{world_id}/`
3. Allow only `.md` and `.json` under the world folder
4. Never modify `.github/`, `src/`, `package.json`, or other worlds
5. Create or update Markdown files
6. Regenerate `summary.md`, `export.md`, `changelog.md`
7. Comment apply result on the issue
8. Close the issue

On `/reject`:

1. Verify comment author equals `world.json.owner`
2. Comment rejection acknowledgment
3. Close the issue without modifying world files

## Pages Deploy — build-pages.yml (§17.1)

Trigger: push to default branch.

Deploy static wiki to GitHub Pages after build.
