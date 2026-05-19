# Implementation Plan - Magazine Header Alignment Independence Fix (v1.2)

## 1) Problem Summary
매거진 헤더에서 날짜(`date`)의 수직 위치를 변경할 때 요일(`day`)이 종속적으로 함께 움직이는 현상을 해결함. 각 요소가 서로의 레이아웃 박스에 영향을 주지 않고 픽셀 단위로 독립적으로 기동할 수 있도록 CSS 구조를 보강함.

## 2) Design Summary
- **원인 추정**: 
    - `flex` 컨테이너 내에서 특정 요소의 변형이 부모의 정렬 기준(Baseline 등)을 미세하게 변화시킴.
    - `mag-meta-group`이 부모의 높이에 의존하고 있을 가능성.
- **해결 전략**: 
    - 각 핵심 요소에 `will-change: transform`을 부여하여 독립적 레이어 생성 유도.
    - 부모(`magazine-header`)의 정렬 방식을 `align-items: flex-start`로 고정하고, 자식 요소들의 `align-self`를 명시적으로 설정.

## 3) Implementation Plan

### Step 1: Layout Box 분석 및 고립
- [ ] `magazine-header` 내의 자식 요소들이 서로의 크기에 영향을 받지 않도록 `position: relative` 및 독립적 높이 재설정.
- [ ] `mag-date-big`의 폰트 높이가 컨테이너 전체 높이를 결정하지 않도록 조치.

### Step 2: CSS 수정 (Independence Enforcement)
- [ ] `.mag-date-big`, `.mag-meta-group`에 `align-self: flex-start` 적용.
- [ ] `transform` 적용 시 레이아웃 계산에서 완전히 제외되도록 레이어 격리.

### Step 3: 레이아웃별 오프셋 재검증
- [ ] **Alt 1~3** 전반에 걸쳐 `--mag-date-y` 조절 시 다른 요소가 고정되어 있는지 확인.
- [ ] 특히 `alt-horizontal`과 같이 `flex-end`를 사용하는 경우의 간섭 차단.

### Step 4: 시각적 피드백 시스템 개선
- [ ] 변수 조절이 직관적으로 반영되도록 CSS 주석 및 가이드 추가.

## 4) Behavioral Summary
날짜와 요일의 수직 위치 변수를 각각 조절할 때, 상대방의 위치에 전혀 영향을 주지 않고 독립적으로 픽셀 단위 이동이 가능해짐.

## 5) Self Code Review
- **핵심**: `transform`은 원래 레이아웃에 영향을 주지 않아야 함. 만약 움직인다면 그것은 '시각적 착시'이거나 부모 컨테이너가 자식의 가상 박스 크기에 반응하고 있는 것임.
- **해결책**: 컨테이너 높이를 고정하거나, 모든 자식을 상단 정렬로 못박아 해결.
