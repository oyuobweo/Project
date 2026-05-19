# Implementation Plan - Minimal Plus Icon Hover Refinement (v2.3)

## 1) Problem Summary
플러스(`+`) 버튼의 호버 효과에서 배경색(프레임) 변화를 제거하고, 아이콘 자체의 확대와 색상 전환에만 집중하도록 수정함. 시계 아이콘은 기존의 배경 하이라이트 방식을 유지하여 두 버튼 간의 시각적 차별화를 둠.

## 2) Design Summary
- **배경색 제거**: 플러스 버튼 호버 시 `background`를 `transparent`로 유지하여 깔끔한 느낌 부여.
- **아이콘 애니메이션**: 
    - 호버 시 아이콘 색상을 `var(--primary)`로 변경.
    - 확대 비율을 `scale(1.15)` 정도로 조정하여 배경 없이도 충분한 피드백 제공.
- **독립적 스타일링**: 시계 아이콘과 플러스 버튼의 호버 로직을 분리 관리.

## 3) Implementation Plan

### Step 1: 호버 스타일 분리
- [ ] `SideBoard.css`에서 통합되어 있던 `.stealth-input-wrapper:hover`와 `.submit-pill:hover`를 개별 규칙으로 분리.

### Step 2: 플러스 버튼 호버 정의
- [ ] `.submit-pill:hover`에서 `background` 속성을 삭제하거나 `transparent`로 명시.
- [ ] `transform: scale(1.15);` 적용하여 확대 효과 강조.
- [ ] `color: var(--primary);` 유지.

### Step 3: 시계 아이콘 호버 유지
- [ ] `.stealth-input-wrapper:hover`는 기존처럼 배경색 변화와 `scale(1.05)`를 유지.

### Step 4: 최종 검증
- [ ] 브라우저에서 플러스 아이콘 호버 시 배경이 나타나지 않는지 확인.
- [ ] 아이콘 자체가 커지며 보라색으로 변하는지 확인.

## 4) Behavioral Summary
푸터의 시계 아이콘은 기존의 '버튼형' 피드백을 유지하는 반면, 플러스 아이콘은 '기호 자체'가 강조되는 미니멀한 애니메이션으로 변경됩니다.

## 5) Self Code Review
- **의도**: 플러스 아이콘은 '추가/등록'의 의미를 가지므로 기호 자체가 커지는 것이 더 직관적일 수 있음.
- **결과**: 두 액션 버튼이 서로 다른 개성을 가지면서도 조화를 이루는 푸터 디자인 완성.
