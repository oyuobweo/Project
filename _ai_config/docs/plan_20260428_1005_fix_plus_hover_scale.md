# Implementation Plan - Fixing Hover Scale Animation for Plus Button (v2.2)

## 1) Problem Summary
사이드보드 푸터의 플러스(`+`) 아이콘 버튼에 호버 확대(`scale`) 애니메이션이 적용되지 않는 현상을 수정함. 시계 아이콘과 완벽히 동일한 동역학적 피드백을 제공하기 위해 `transform` 관련 속성을 보강하고 렌더링 우선순위를 조정함.

## 2) Design Summary
- **애니메이션 최적화**: 
    - `will-change: transform`을 적용하여 브라우저의 GPU 가속 유도.
    - `transform` 속성이 다른 레이아웃 속성에 의해 억제되지 않도록 명시적 설정.
- **일관성 확보**: 시계 아이콘(Div)과 플러스 버튼(Button) 간의 태그 차이로 인한 렌더링 이질감 제거.

## 3) Implementation Plan

### Step 1: 기본 상태 속성 보강
- [ ] `.stealth-input-wrapper`와 `.submit-pill`에 `will-change: transform;` 추가.
- [ ] `transform: scale(1);`을 기본값으로 명시하여 애니메이션 시작점 고정.

### Step 2: Hover 상태 애니메이션 강제
- [ ] `.stealth-input-wrapper:hover` 및 `.submit-pill:hover` 그룹에서 `transform: scale(1.05);` 확인.
- [ ] 애니메이션이 부드럽게 이어지도록 `transition` 설정 재점검.

### Step 3: 레이아웃 간섭 체크
- [ ] `entry-footer-actions`의 `gap`이 확대된 아이콘을 가리거나 밀어내지 않는지 확인.

### Step 4: 최종 검증
- [ ] 브라우저에서 플러스 아이콘에 마우스를 올렸을 때 시계 아이콘과 동일한 속도와 크기로 확대되는지 확인.

## 4) Behavioral Summary
푸터의 모든 버튼이 사용자의 마우스 움직임에 즉각적이고 동일한 확대 반응을 보이게 되어, 인터페이스가 더욱 생동감 있고 일관되게 느껴집니다.

## 5) Self Code Review
- **원인 추정**: 일부 브라우저에서 `button` 요소에 `transform`을 적용할 때 기본 스타일과의 충돌이나 레이어 계산 문제로 애니메이션이 누락될 수 있음. `will-change`와 기본 `scale(1)` 명시가 이를 해결하는 표준 방법임.
