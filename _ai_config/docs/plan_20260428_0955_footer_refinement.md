# Implementation Plan - Footer Icon Spacing & Animation Sync (v2.0)

## 1) Problem Summary
푸터 하단의 시계 아이콘과 플러스 아이콘 사이의 간격을 절반(`6px`)으로 줄여 밀도를 높이고, 시계 아이콘에 적용된 호버 확대 효과를 플러스 버튼에도 동일하게 적용하여 두 아이콘의 인터렉션을 완벽히 일치시킴.

## 2) Design Summary
- **간격 조정**: `entry-footer-actions` 그룹 내의 `gap`을 `12px` -> `6px`로 축소하여 요소 간의 연관성 강화.
- **애니메이션 일치**: 
    - 두 아이콘 버튼 모두 호버 시 `scale(1.05)` 확대 효과 적용.
    - 부드러운 전환을 위해 `transition`에 `transform` 속성 반영 확인.

## 3) Implementation Plan

### Step 1: 아이콘 간격 축소
- [ ] `SideBoard.css`의 `.entry-footer-actions` 클래스에서 `gap: 12px`를 `gap: 6px`로 수정.

### Step 2: 호버 확대 애니메이션 추가
- [ ] `.stealth-input-wrapper:hover`에 `transform: scale(1.05);` 적용.
- [ ] `.submit-pill:hover`에 `transform: scale(1.05);` 적용.
- [ ] `transition` 설정이 `transform` 변화를 부드럽게 표현하는지 확인 (현재 `all 0.2s`로 설정됨).

### Step 3: 최종 검증
- [ ] 브라우저에서 시계 아이콘의 위치가 유지되면서 플러스 아이콘이 좌측으로 붙었는지 확인.
- [ ] 두 아이콘에 각각 마우스를 올렸을 때 동일한 비율로 확대되는지 확인.

## 4) Behavioral Summary
푸터의 두 아이콘이 이전보다 더 가까이 배치되어 시각적 결속력이 강화되며, 호버 시 동일한 확대 애니메이션을 공유하여 프리미엄 UI의 일관된 피드백을 제공함.

## 5) Self Code Review
- **레이아웃**: `flex-start` 정렬을 유지하므로 시계 아이콘의 위치는 변하지 않고 플러스 버튼만 이동하는 의도가 정확히 구현됨.
- **애니메이션**: `1.05` 정도의 미세한 확대는 레이아웃 흔들림 없이 고급스러운 느낌을 주기에 적합함.
