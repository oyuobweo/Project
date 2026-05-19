# Implementation Plan - Perfect Hover Synchronization for Footer Icons (v2.1)

## 1) Problem Summary
사이드보드 푸터의 시계 아이콘과 플러스 아이콘 간의 호버 효과 차이(확대 유무 등)를 해결함. 두 아이콘이 동일한 배경색 변화, 색상 강조, 그리고 확대 애니메이션(`scale`)을 공유하도록 스타일을 완전히 동기화하여 인터렉션의 통일성을 완성함.

## 2) Design Summary
- **인터렉션 통합**: 
    - 두 요소 모두 호버 시 `var(--primary)` 색상 전환.
    - 동일한 투명도 배경(`0.08`) 하이라이트 적용.
    - 동일한 `scale(1.05)` 확대 애니메이션 적용.
- **성능 최적화**: `will-change: transform`을 추가하여 애니메이션의 부드러움 확보.

## 3) Implementation Plan

### Step 1: 호버 스타일 그룹화 및 통일
- [ ] `SideBoard.css`에서 `.stealth-input-wrapper:hover`와 `.submit-pill:hover`를 동일한 속성으로 재정의.
- [ ] 확대 효과(`transform: scale(1.05)`)가 플러스 버튼에도 누락 없이 적용되도록 수정.

### Step 2: 공통 트랜지션 확인
- [ ] 두 요소의 `transition` 속성을 `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`로 통일하여 반응 속도 일치.

### Step 3: 라이트 테마 호버 동기화
- [ ] `.theme-light` 환경에서도 두 아이콘의 호버 배경색(`rgba(0, 0, 0, 0.04)`)이 일치하는지 확인.

### Step 4: 최종 시각 검증 (TDD)
- [ ] **Red**: 기존의 확대 효과 누락 현상 확인.
- [ ] **Green**: 시계와 플러스 아이콘이 동일하게 확대되고 강조되는지 브라우저에서 최종 확인.

## 4) Behavioral Summary
푸터 하단의 두 액션 아이콘이 마치 하나의 세트처럼 동작하게 됩니다. 사용자가 어느 아이콘에 마우스를 올려도 동일한 크기 변화와 색상 피드백을 받게 되어 UI의 일관성이 비약적으로 향상됩니다.

## 5) Self Code Review
- **원인 분석**: `button` 요소의 경우 브라우저 기본 스타일이나 다른 규칙에 의해 `transform`이 예상과 다르게 동작했을 가능성이 있음. 이를 명시적으로 재설정하여 해결.
- **결과**: 작은 인터렉션의 차이를 제거함으로써 전체적인 제품의 완성도를 상향 평준화함.
