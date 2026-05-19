# Implementation Plan - Footer UI Precision Alignment & Hover Synchronization (v1.7)

## 1) Problem Summary
하단 푸터의 '+' 아이콘과 '등록' 텍스트 간의 미세한 수직 정렬 불일치를 해결하고, 시계 아이콘과 등록 버튼의 호버 효과(배경색, 컬러 전환, 애니메이션 속도)를 완전히 일치시켜 시각적 완성도를 극대화함.

## 2) Design Summary
- **정렬 교정**:
    - `submit-pill` 내부의 `Plus` 아이콘(SVG)과 `span` (텍스트) 간의 베이스라인 불일치 해결.
    - `align-items: center` 외에도 폰트 고유의 상단 여백을 고려한 미세 오프셋 적용.
- **호버 동기화**:
    - `stealth-input-wrapper`와 `submit-pill`의 `transition` 속성 통일.
    - 호버 시 배경색(`rgba`) 및 텍스트 색상 전환 로직의 완벽한 일치.

## 3) Implementation Plan

### Step 1: Submit Pill 내부 정렬 보정
- [ ] `submit-pill` 내부 `span`에 `line-height: 1` 적용하여 텍스트 상하 여백 제거.
- [ ] 아이콘과 텍스트의 시각적 중앙을 맞추기 위해 `span`에 `transform: translateY(0.5px)` 또는 `margin-top` 미세 조정.
- [ ] 아이콘 크기(`18px`)와 텍스트 크기(`0.9rem`)의 비례 확인.

### Step 2: Hover 스타일 및 애니메이션 동기화
- [ ] 두 요소의 `transition`을 `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`로 통일.
- [ ] 호버 배경색을 변수로 관리하거나 명시적으로 동일한 값(`rgba(255, 255, 255, 0.08)`) 적용.
- [ ] `border-radius`가 동일한지 확인 (현재 둘 다 `8px`).

### Step 3: 레이아웃 고립 및 간섭 제거
- [ ] 버튼 내부에 불필요한 `margin`이나 `padding`이 정렬을 방해하지 않는지 확인.
- [ ] `display: inline-flex` 등을 활용하여 내부 요소 정렬의 견고함 확보.

### Step 4: 최종 검증 (Pixel-Perfect Check)
- [ ] 브라우저에서 두 요소의 중앙 가이드라인을 그려 정렬 확인.
- [ ] 호버 시의 색상 변화 타이밍이 일치하는지 육안 확인.

## 4) Behavioral Summary
푸터의 모든 버튼이 동일한 물리적 높이와 정렬 기준을 공유하며, 호버 시 마치 하나의 테마를 공유하는 것처럼 일관된 시각적 피드백을 제공함.

## 5) Self Code Review
- **핵심**: 아이콘은 기하학적 중앙을 기준으로 렌더링되지만, 글자는 베이스라인 기준이므로 `align-items: center`만으로는 1~2px의 오차가 발생할 수 있음. 이를 수동으로 보정하는 것이 핵심임.
- **결과**: 작은 버튼 하나에서도 '설계된 디자인'이라는 인상을 주게 됨.
