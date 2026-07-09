# MVP Cleanup Checklist

MVP 완료 후 임시·기획·스캐폴딩 요소를 제거하기 위한 체크리스트입니다.

## When to Run

- [govel_mvp_plan.md](govel_mvp_plan.md) §18 시나리오 9단계가 모두 통과한 뒤
- 아래 항목을 순서대로 처리
- **맨 마지막에 이 파일(`mvp-cleanup.md`)도 삭제**

---

## 1. Delete Entire Files

| File | Reason |
|------|--------|
| [govel_mvp_plan.md](govel_mvp_plan.md) | 기획 전용. 런타임·에이전트에 불필요 |
| [mvp-non-goals.md](mvp-non-goals.md) | MVP 범위 제한용. 필요 시 README 또는 CONTRIBUTING으로 이전 |
| [mvp-cleanup.md](mvp-cleanup.md) | 체크리스트 완료 후 **맨 마지막** 삭제 |

### Optional — delete if no longer needed

| File | Condition |
|------|-----------|
| [.cursor/skills/govel-static-wiki/SKILL.md](.cursor/skills/govel-static-wiki/SKILL.md) | 1단계 위키·worlds 구조가 코드에 반영됨 |
| [.cursor/skills/govel-issue-forms/SKILL.md](.cursor/skills/govel-issue-forms/SKILL.md) | Issue Form 연동 완료 |

### Keep — do not delete

- `.github/workflows/*.yml` — placeholder 제거 후 파일은 유지
- `.github/instructions/`, `.cursor/rules/`
- `.cursor/skills/govel-github-actions/`, `.cursor/skills/govel-world-export/`

---

## 2. Remove Code Blocks (workflows)

### [.github/workflows/build-pages.yml](.github/workflows/build-pages.yml)

Delete the entire `package.json` missing fallback:

```yaml
else
  echo "package.json not found — placeholder build"
  mkdir -p dist
  printf ... Static wiki build pending ...
```

Replace with: require `package.json`; fail with `exit 1` if missing.

### [.github/workflows/ai-review.yml](.github/workflows/ai-review.yml)

| Remove / replace | Current |
|------------------|---------|
| Hardcoded fallback | `world_id=unknown`, `proposal_type=Other` |
| TODO comments + placeholder steps | `# TODO: extract World...`, `# TODO: call AI API` |
| Placeholder echo | `AI review placeholder — implement provider call` |
| Pending comment template | `분류: (pending)`, `이름: (pending)`, `(pending)` (×3) |

Replace with: real issue body parsing + AI API response in review comment.

### [.github/workflows/approve-proposal.yml](.github/workflows/approve-proposal.yml)

| Remove / replace | Current |
|------------------|---------|
| Hardcoded fallback | `world_id=unknown` |
| TODO + placeholder | `echo "Path validation placeholder"`, `echo "Apply changes placeholder"` |
| Temporary approval message | `Proposal approved. Lore update pending full implementation.` |

Replace with: real path validation, Markdown apply, `summary.md` / `export.md` / `changelog.md` regeneration, completion message.

---

## 3. Remove Phrases and Strings

Run grep after cleanup. These should return **no matches** in workflows and docs (except exclusions below):

```txt
(pending)
placeholder
world_id=unknown
pending full implementation
Static wiki build pending
package.json not found — placeholder build
AI review placeholder
Path validation placeholder
Apply changes placeholder
framework TBD
Scaffolding only
MVP phase
§8.
§9
§10
§11
§12
§14
§17
```

**Exclusion — do not remove:**

- `placeholder: black-sun` in [.github/ISSUE_TEMPLATE/lore-proposal.yml](.github/ISSUE_TEMPLATE/lore-proposal.yml) — UI hint for form field

**Suggested command:**

```bash
rg "TODO|placeholder|pending|\(pending\)|world_id=unknown|MVP phase|Scaffolding|framework TBD|§[0-9]" .github/workflows .cursor .github/instructions AGENTS.md
```

---

## 4. Simplify Docs (edit, not delete)

| File | Action |
|------|--------|
| [AGENTS.md](AGENTS.md) | Replace `Implement only the MVP loop` with product description; remove `mvp-non-goals.md` references from `Maintaining AI Instructions`; remove `Post-MVP` section after cleanup |
| [.cursor/rules/mvp-scope.mdc](.cursor/rules/mvp-scope.mdc) | Remove `mvp-non-goals.md` link; soften or remove `Do not expand scope beyond the MVP` |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Remove `Do not expand scope beyond the MVP` |
| `.github/instructions/*.md`, `.cursor/rules/*.mdc` | Remove `§8.1` etc. section number refs; keep content |
| `.cursor/skills/govel-*/SKILL.md` (all 4) | Remove `govel_mvp_plan.md` reference links; remove `MVP phase`, `Scaffolding` wording |

---

## 5. Verify Before Closing

```txt
[ ] govel_mvp_plan.md §18 시나리오 E2E 통과
[ ] workflow에 TODO/placeholder 없음
[ ] AI review 댓글이 실제 분류·요약·충돌 결과 포함
[ ] /approve 후 worlds/ 파일 실제 반영 + export.md 갱신
[ ] build-pages.yml이 실제 프론트 빌드 산출물 배포
[ ] mvp-non-goals.md, govel_mvp_plan.md 삭제
[ ] AGENTS.md / copilot-instructions MVP 한정 문구 정리
[ ] optional skills 삭제 여부 결정
[ ] mvp-cleanup.md 삭제 (맨 마지막)
```
