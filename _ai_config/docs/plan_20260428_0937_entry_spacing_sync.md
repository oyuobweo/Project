# Implementation Plan - Entry Card Spacing Consistency (v1.5)

## 1) Problem Summary
사이드보드 입력 영역에서 메모장-시계 아이콘 간격과 시계 아이콘-메타 패널 간격이 서로 달라 발생하는 시각적 불균형을 해결함. 두 간격을 동일한 수치로 조정하여 레이아웃의 일관성과 심미성을 높임.

## 2) Design Summary
- **목적**: 입력 폼 내의 수직 리듬(Vertical Rhythm) 통일.
- **조정 대상**:
    - `.entry-footer` (시계 아이콘 행)의 상단 여백.
    - `.expanded-meta-panel-v2` (확장 설정 패널)의 상단 여백.
- **목표 수치**: 시각적으로 쾌적한 **12px~16px** 사이의 통일된 간격 적용.

## 3) Implementation Plan

### Step 1: 현재 간격 분석
- [ ] `.entry-card`의 기본 `gap: 8px` 확인.
- [ ] `.entry-footer`의 `padding-top: 12px` 확인.
- [ ] `.expanded-meta-panel-v2`의 `margin: -1px` 확인.

### Step 2: CSS 수정
- [ ] `.entry-footer`의 여백을 재정의하여 메모장과의 간격 설정.
- [ ] `.expanded-meta-panel-v2`의 음수 마진을 제거하고 `.entry-footer`와 동일한 간격이 유지되도록 `margin-top` 또는 패딩 조정.
- [ ] `border-top` 라인과 여백의 관계를 고려하여 시각적 중심 정렬.

### Step 3: 시각적 검증
- [ ] 브라우저에서 패널 확장/축소 시 간격의 대칭성 확인.
- [ ] 텍스트 입력 유무에 따른 레이아웃 시프트 확인.

## 4) Behavioral Summary
메모장 하단의 여백과 시계 아이콘 하단의 여백이 완벽하게 일치하게 되어, 입력 폼이 보다 정돈되고 설계된 느낌을 줌.

## 5) Self Code Review
- **효과**: 작은 간격의 차이가 전체적인 '완성도'를 결정함. 이번 수정을 통해 프리미엄 UI의 디테일을 강화.
- **주의**: `entry-card` 자체의 `gap` 속성과 개별 요소의 `margin/padding`이 중첩되지 않도록 계산에 유의.
