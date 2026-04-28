# Implementation Plan - Reverting Magazine Header Layout Alternatives (v1.3)

## 1) Problem Summary
이전에 추가했던 매거진 헤더의 레이아웃 대안(Alt 1, 2, 3)들을 제거하고, 사이드보드를 단일 고정 헤더 레이아웃으로 복원함. 단, 미세 정렬을 위해 구축한 CSS 변수 시스템은 유지하여 완성도를 보존함.

## Design Summary
- **제거**:
    - `SideBoard.jsx`: `layoutVariant` 상태 및 `variant-switcher` UI.
    - `SideBoard.css`: `.alt-split`, `.alt-overlay`, `.alt-horizontal` 등 모든 레이아웃 변형 스타일.
- **유지**:
    - `.magazine-header`의 독립적 픽셀 조절 시스템 (`transform: translateY(var(--mag-y))`).

## Implementation Plan

### Step 1: SideBoard.jsx 정리
- [ ] `layoutVariant` 관련 `useState` 제거.
- [ ] JSX 내의 `variant-switcher` 버튼 렌더링 로직 삭제.
- [ ] `<div className="magazine-header">`로 클래스 명칭 단순화.

### Step 2: SideBoard.css 정리
- [ ] `/* --- Layout Alternatives --- */` 하위의 모든 클래스 삭제.
- [ ] `variant-switcher` 및 `v-btn` 스타일 삭제.
- [ ] 기본 `.magazine-header` 내의 변수 설정값 확인 및 최적화.

### Step 3: 최종 검증
- [ ] 브라우저에서 헤더가 다시 깔끔한 단일 레이아웃으로 나오는지 확인.
- [ ] 미세 조절 변수가 여전히 정상 작동하는지 확인.

## Behavioral Summary
사용자 인터페이스에서 레이아웃 전환 버튼이 사라지고, 기존의 세련된 단일 매거진 헤더 레이아웃으로 고정됨.

## Self Code Review
- **목적**: 불필요한 레이아웃 복잡도를 제거하고 핵심 기능(정렬)에 집중.
- **결과**: 코드량이 감소하고 메인 레이아웃의 안정성 강화.
