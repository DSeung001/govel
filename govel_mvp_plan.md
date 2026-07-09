# Govel MVP 기획 정리

## 1. 프로젝트 이름

Govel

## 2. 한 줄 설명

Govel은 AI로 만든 세계관을 GitHub Pages로 공개하고, 사람들이 제안한 설정을 AI가 분류, 정리, 충돌 검사한 뒤 Markdown 세계관 위키에 반영하는 오픈 월드빌딩 사이트입니다.

## 3. 핵심 컨셉

Govel은 소설 생성기가 아니라 세계관 생성 및 공개 플랫폼입니다.

목표는 다음과 같습니다.

- AI로 세계관을 빠르게 만든다.
- GitHub Pages로 누구나 읽을 수 있게 공개한다.
- 사람들이 세계관에 대해 설정을 제안할 수 있다.
- AI가 제안을 분류하고 기존 세계관과 충돌하는지 확인한다.
- 세계관 관리자가 승인한 내용만 정식 세계관에 반영된다.
- 최종 세계관은 Markdown 파일로 관리된다.
- AI가 읽기 좋은 단일 Markdown export 파일을 제공한다.

## 4. MVP에서 고정할 원칙

### 4.1 Discussion 중심이 아니라 Issue Form 중심

초기 MVP에서는 GitHub Discussions를 핵심 관리 도구로 쓰지 않습니다.

대신 다음 구조로 갑니다.

- 세계관 공개: GitHub Pages
- 세계관 정본: Markdown 파일
- 설정 제안: GitHub Issue Form
- AI 분석: GitHub Actions
- 승인 처리: Issue 댓글 명령어
- 반영 처리: Bot 또는 GitHub Actions가 Markdown 수정
- Export: 단일 Markdown 파일 생성

Discussion은 나중에 가벼운 댓글, 감상, 피드백 용도로 추가할 수 있습니다.

### 4.2 Markdown 파일이 정식 세계관 DB

GitHub Issue, 댓글, Discussion은 제안과 토론의 공간입니다.

정식 세계관 데이터는 반드시 Markdown 파일에만 존재합니다.

### 4.3 승인된 설정만 반영

사용자의 제안은 바로 반영하지 않습니다.

AI가 분석한 뒤, 세계관 관리자가 `/approve`를 해야만 Markdown에 반영됩니다.

### 4.4 GitHub 계정은 MVP에서 필수

초기 MVP에서는 설정 제안과 승인을 GitHub Issue 기반으로 처리하므로 GitHub 계정이 필요합니다.

단, 세계관 읽기와 Markdown 다운로드는 로그인 없이 가능합니다.

## 5. MVP 핵심 기능

MVP에는 아래 기능만 포함합니다.

1. 세계관 목록 페이지
2. 세계관 상세 홈
3. Markdown 기반 세계관 위키
4. GitHub Issue Form으로 설정 제안
5. AI 분류
6. AI 충돌 검사
7. Markdown 변경안 생성
8. `/approve` 명령어로 반영
9. `export.md` 단일 Markdown 생성
10. 최소 스타일의 메모장형 UI

## 6. MVP에서 제외할 기능

아래 기능은 MVP에서 제외합니다.

- 자체 회원가입
- GitHub 계정 없는 사용자 제안
- Notion Import
- Obsidian Import
- 실시간 댓글
- giscus 댓글
- GitHub Discussions 기반 세계관 관리
- 관계도 시각화
- 타임라인 시각화
- PR 기반 리뷰
- GitHub Projects 연동
- 여러 AI Provider 선택 UI
- 웹사이트에서 사용자 API Key 입력
- 소설 생성
- 웹툰 콘티 생성
- 관리자 대시보드 고도화

## 7. 사용자 흐름

### 7.1 읽는 사람

```txt
메인 페이지 접속
→ 세계관 목록 확인
→ 세계관 선택
→ 세계관 상세 홈 진입
→ 세계관 위키 읽기
→ 필요하면 AI용 Markdown 다운로드
→ 마음에 들면 설정 제안하기 클릭
```

### 7.2 설정 제안자

```txt
세계관 상세 홈
→ 설정 제안하기 클릭
→ GitHub Issue Form 이동
→ 제안 작성
→ Issue 생성
→ AI 분석 댓글 확인
→ 관리자 승인 대기
```

### 7.3 세계관 관리자

```txt
GitHub Issue 알림 확인
→ AI 분석 결과 확인
→ 충돌 여부 확인
→ Markdown 변경안 확인
→ /approve 또는 /reject 댓글 작성
→ 승인 시 Markdown 자동 반영
→ export.md 자동 갱신
→ GitHub Pages 위키 갱신
```

## 8. 페이지 구성

## 8.1 메인 페이지

목적:

- 현재 공개된 세계관 목록을 보여준다.
- 사용자가 읽고 싶은 세계관을 고르게 한다.

표시 정보:

- Govel 로고
- 짧은 서비스 설명
- 세계관 카드 목록

세계관 카드에 들어갈 정보:

```txt
세계관 제목
짧은 소개
장르 태그
Characters 개수
Locations 개수
Factions 개수
Rules 개수
최근 업데이트 날짜
[세계관 보기] 버튼
```

예시:

```txt
검은 태양의 대륙

태양이 검게 변한 뒤, 낮과 밤의 경계가 무너진 대륙.

Dark Fantasy / Post Apocalypse

Characters 8
Locations 5
Factions 3
Rules 6

[세계관 보기]
```

## 8.2 세계관 상세 홈

목적:

- 세계관의 첫인상을 보여준다.
- 읽기, 제안하기, 다운로드로 이어지게 한다.

표시 정보:

```txt
세계관 제목
세계관 소개
장르 태그
관리자
최근 업데이트
주요 설정 요약
최근 변경사항
주요 문서 링크
```

버튼:

```txt
[세계관 읽기]
[설정 제안하기]
[AI용 Markdown 다운로드]
```

## 8.3 세계관 위키

목적:

- 승인된 정식 설정만 읽기 좋게 보여준다.

좌측 메뉴:

```txt
Overview
Characters
Locations
Factions
Rules
Events
Changelog
Export
```

본문:

- Markdown 파일을 그대로 렌더링한다.
- 복잡한 카드 UI를 쓰지 않는다.
- 메모장처럼 단순하게 읽히게 한다.

## 8.4 설정 제안 페이지

MVP에서는 자체 페이지를 만들지 않고 GitHub Issue Form으로 이동합니다.

버튼:

```txt
[설정 제안하기]
```

이 버튼은 GitHub Issue Form URL로 이동합니다.

Issue Form 필드:

```txt
World
Type
Proposal Title
Proposal Content
Related Existing Lore
Additional Notes
```

Type 옵션:

```txt
Character
Location
Faction
Rule
Event
Item
Other
```

## 8.5 AI 분석 결과

Issue가 생성되면 GitHub Actions가 실행됩니다.

AI가 Issue 댓글로 분석 결과를 작성합니다.

AI가 해야 할 작업:

1. 제안 타입 분류
2. 핵심 내용 요약
3. 기존 세계관과 충돌 검사
4. 생성 또는 수정될 Markdown 파일 목록 제안
5. Markdown 변경안 생성
6. 관리자 명령어 안내

AI 댓글 예시:

```txt
## AI Review

분류: Faction

이름: 백야 감시단

요약:
북부 제국의 북쪽 국경을 지키는 군사 조직입니다.
장기 복무자는 눈 색이 점점 옅어지는 부작용을 겪습니다.

충돌 검사:
직접 충돌 없음.

변경 예정 파일:
- worlds/black-sun/factions/white-night-watch.md
- worlds/black-sun/locations/northern-empire.md
- worlds/black-sun/rules/white-night-effect.md

관리자 명령:
- /approve
- /reject
```

## 8.6 승인 처리

관리자는 Issue 댓글에 명령어를 작성합니다.

승인:

```txt
/approve
```

거절:

```txt
/reject
```

승인 시 처리:

```txt
1. 댓글 작성자가 해당 세계관 관리자와 일치하는지 확인
2. 변경 대상 파일이 해당 세계관 폴더 내부인지 확인
3. Markdown 파일 생성 또는 수정
4. summary.md 갱신
5. export.md 갱신
6. changelog.md 갱신
7. Issue에 반영 완료 댓글 작성
8. Issue close
```

## 9. 저장소 구조

```txt
govel/
  worlds/
    black-sun/
      world.json
      index.md
      summary.md
      export.md
      changelog.md

      characters/
        kael.md

      locations/
        northern-empire.md

      factions/
        sun-church.md

      rules/
        black-sun.md

      events/
        first-night.md

    memory-city/
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

  .github/
    ISSUE_TEMPLATE/
      lore-proposal.yml

    workflows/
      ai-review.yml
      approve-proposal.yml
      build-pages.yml

  src/
    pages/
    components/
    lib/

  public/
```

## 10. world.json 예시

```json
{
  "id": "black-sun",
  "title": "검은 태양의 대륙",
  "description": "태양이 검게 변한 뒤, 낮과 밤의 경계가 무너진 대륙.",
  "genre": ["Dark Fantasy", "Post Apocalypse"],
  "owner": "github-user-name",
  "status": "open",
  "createdAt": "2026-07-09",
  "updatedAt": "2026-07-09"
}
```

## 11. Markdown 문서 예시

### 11.1 세계관 index.md

```md
# 검은 태양의 대륙

태양이 검게 변한 뒤, 낮과 밤의 경계가 무너진 대륙.

## 핵심 설정

- 검은 태양은 세계의 낮과 밤을 불안정하게 만들었다.
- 북부 제국은 검은 태양 이후 군사 국가로 변했다.
- 태양 교단은 검은 태양을 신의 심판으로 해석한다.

## 주요 항목

- Characters
- Locations
- Factions
- Rules
- Events
```

### 11.2 캐릭터 문서

```md
# 카엘

## Type

Character

## Summary

카엘은 북부 제국 출신의 전직 감시단원이다.

## Personality

- 말수가 적다.
- 타인을 쉽게 믿지 않는다.

## Related

- 북부 제국
- 백야 감시단
- 검은 태양
```

### 11.3 세력 문서

```md
# 백야 감시단

## Type

Faction

## Summary

백야 감시단은 북부 제국의 북쪽 국경을 지키는 군사 조직이다.

## Role

이들은 검은 태양 이후 나타난 이형 생명체를 감시한다.

## Side Effect

오래 복무한 감시단원은 눈 색이 점점 옅어진다.

## Related

- 북부 제국
- 검은 태양
- 백야 효과
```

## 12. export.md 구조

각 세계관은 AI가 읽기 좋은 단일 Markdown 파일을 제공합니다.

파일 위치:

```txt
worlds/{world_id}/export.md
```

구성:

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

이 파일은 ChatGPT, Claude, Gemini 같은 AI에 그대로 넣기 좋게 구성합니다.

## 13. AI 처리 범위

MVP에서 AI는 아래 작업만 합니다.

```txt
1. 설정 제안 분류
2. 설정 요약
3. 기존 Markdown 검색
4. 충돌 가능성 판단
5. Markdown 변경안 생성
6. summary.md 갱신
7. export.md 갱신
```

AI가 하지 않는 것:

```txt
- 자동 승인
- 세계관 전체 방향 결정
- 소설 생성
- 사용자의 의도 임의 변경
- 다른 세계관 파일 수정
```

## 14. 권한 원칙

MVP에서는 GitHub 계정 기준으로 관리자를 판단합니다.

세계관 관리자는 `world.json`의 `owner` 값으로 결정합니다.

승인 시 검증:

```txt
1. /approve 작성자 == world.json owner
2. 변경 대상 파일 경로가 worlds/{world_id}/ 내부인지 확인
3. 허용된 파일 확장자만 수정
4. .github, src, package.json 등 시스템 파일 수정 금지
```

허용 경로:

```txt
worlds/{world_id}/
```

금지 경로:

```txt
.github/
src/
public/
package.json
README.md
worlds/{other_world_id}/
```

## 15. 스타일 원칙

Govel MVP 스타일은 메모장처럼 최소화합니다.

디자인 키워드:

```txt
- 무채색
- 가벼움
- 문서 중심
- 장식 최소화
- 읽기 편한 줄 간격
- 카드 최소화
- 애니메이션 없음
- 복잡한 색상 없음
```

컬러:

```txt
Background: #FAFAFA
Surface: #FFFFFF
Text: #111111
Sub Text: #666666
Border: #E5E5E5
Muted: #F5F5F5
Accent: #222222
```

폰트:

```txt
system-ui
또는
Pretendard
또는
Noto Sans KR
```

본문 느낌:

```txt
메모장처럼 단순하게.
블로그처럼 읽기 쉽게.
SaaS처럼 화려하지 않게.
```

## 16. MVP 화면 스타일

### 16.1 전체 레이아웃

```txt
┌──────────────────────────────────────┐
│ Govel                                │
├───────────────┬──────────────────────┤
│ 메뉴           │ 본문                  │
│               │                      │
│ Overview      │ Markdown Content      │
│ Characters    │                      │
│ Locations     │                      │
│ Factions      │                      │
│ Rules         │                      │
│ Events        │                      │
│ Changelog     │                      │
│ Export        │                      │
└───────────────┴──────────────────────┘
```

### 16.2 문서 스타일

```txt
제목은 크고 명확하게.
본문은 좁지 않게.
줄 간격은 넉넉하게.
링크는 밑줄 또는 진한 회색.
버튼은 사각형.
그림자 최소화.
```

### 16.3 버튼 스타일

```txt
[세계관 읽기]
[설정 제안하기]
[AI용 Markdown 다운로드]
```

버튼은 검은 테두리 또는 회색 배경 정도만 사용합니다.

## 17. MVP 개발 순서

### 1단계: 정적 세계관 위키

```txt
- worlds 폴더 구조 만들기
- 샘플 세계관 1개 만들기
- Markdown 렌더링
- 세계관 목록 페이지
- 세계관 상세 페이지
- GitHub Pages 배포
```

### 2단계: Issue Form 제안

```txt
- lore-proposal.yml 작성
- 설정 제안 버튼 연결
- Issue 생성 테스트
```

### 3단계: AI Review

```txt
- GitHub Actions에서 Issue 생성 감지
- AI API 호출
- 제안 분류
- 충돌 검사
- Issue 댓글 작성
```

### 4단계: 승인 반영

```txt
- /approve 댓글 감지
- owner 검증
- 파일 경로 검증
- Markdown 파일 수정
- summary.md 갱신
- export.md 갱신
- changelog.md 갱신
```

### 5단계: 마감

```txt
- UI 최소 스타일 정리
- README 작성
- 샘플 세계관 완성
- 데모 시나리오 작성
```

## 18. MVP 완료 기준

MVP는 아래 시나리오가 정상 동작하면 완료로 봅니다.

```txt
1. 사용자가 Govel 메인에서 세계관을 본다.
2. 세계관 상세 페이지에서 Markdown 위키를 읽는다.
3. 설정 제안하기를 누른다.
4. GitHub Issue Form으로 제안을 작성한다.
5. AI가 Issue 댓글로 분류, 요약, 충돌 검사 결과를 남긴다.
6. 세계관 관리자가 /approve를 남긴다.
7. Markdown 파일이 자동으로 수정된다.
8. export.md가 갱신된다.
9. GitHub Pages에 변경된 세계관이 반영된다.
```

## 19. README용 짧은 소개

```md
# Govel

Govel is a minimal GitHub-native worldbuilding platform.

It lets you publish AI-generated worlds as Markdown-based wikis, receive lore proposals through GitHub Issues, review them with AI, and merge approved changes into canonical world files.

## Core Idea

- Worlds are stored as Markdown.
- GitHub Pages publishes the wiki.
- GitHub Issue Forms collect lore proposals.
- AI classifies proposals and checks conflicts.
- World owners approve changes with `/approve`.
- Each world provides a single AI-friendly `export.md`.

## MVP Scope

- World list
- World wiki
- Lore proposal issue form
- AI review
- Owner approval
- Markdown update
- Export Markdown
```

## 20. 최종 결론

Govel MVP는 최대한 단순해야 합니다.

핵심은 다음 한 줄입니다.

```txt
AI로 만든 세계관을 Markdown 위키로 공개하고, 사람들이 제안한 설정을 AI가 검토한 뒤 관리자가 승인하면 세계관에 반영한다.
```

초기에는 예쁜 서비스보다 작동하는 루프가 중요합니다.

```txt
World → Proposal → AI Review → Approve → Markdown Update → Publish
```

이 루프만 완성하면 MVP로 충분합니다.
