# Implementation Plan - Magazine Header Date Color Synchronization (v1.4)

## 1) Problem Summary
매거진 헤더의 날짜 숫자(`mag-date-big`) 색상이 현재 일반 텍스트 색상(`var(--text-main)`)으로 설정되어 있으나, 이를 월(`mag-month`)과 동일한 강조 색상(`var(--primary)`)으로 변경하여 브랜드 아이덴티티를 강화함.

## 2) Design Summary
- **목적**: 헤더 내 주요 정보(날짜 및 월)의 시각적 위계 통합 및 강조.
- **변경 사항**: `.mag-date-big` { `color: var(--text-main)` -> `color: var(--primary)` }

## 3) Implementation Plan

### Step 1: CSS 수정
- [ ] `SideBoard.css`의 `.mag-date-big` 스타일에서 `color` 속성 업데이트.

### Step 2: 테마 호환성 확인
- [ ] 라이트 모드와 다크 모드에서 `var(--primary)`가 충분한 대비를 가지는지 검토.

### Step 3: 시각적 검증 (TDD Cycle)
- [ ] **Red**: 기존 상태 확인.
- [ ] **Green**: 색상 변경 후 날짜와 월이 동일한 색상으로 렌더링되는지 확인.

## 4) Behavioral Summary
매거진 헤더의 날짜 숫자가 월 텍스트와 동일한 컬러(기본값: 인디고/블루 계열)로 변경되어 보다 일관성 있고 강조된 디자인을 보여줌.

## 5) Self Code Review
- **효과**: 주요 날짜 정보에 대한 시각적 주목도가 상승함.
- **리스크**: 배경색에 따라 가독성이 달라질 수 있으나, 기존 `mag-month`에서 검증된 컬러이므로 안정적임.
