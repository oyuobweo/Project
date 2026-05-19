# Implementation Plan - Footer UI Alignment & Hover Consistency (v1.6)

## 1) Problem Summary
사이드보드 입력 폼 푸터에 위치한 시계 아이콘과 '등록' 버튼의 수직 정렬을 완벽히 맞추고, 두 요소의 호버(Hover) 시각적 피드백을 동일하게 통일하여 UI의 일관성과 완성도를 높임.

## Design Summary
- **정렬 보정**: 
    - `stealth-input-wrapper` (시계)와 `submit-pill` (등록)의 높이 및 정렬 기준 통일.
    - `display: flex; align-items: center; justify-content: center;` 적용.
- **호버 스타일 통일**:
    - 기존 '등록' 버튼의 텍스트 슬라이드 효과 대신, 시계 아이콘과 동일한 **은은한 배경 하이라이트 + 컬러 변경** 효과 적용.
    - 테마별(Light/Dark) 최적화된 배경색 적용.

## Implementation Plan

### Step 1: Stealth Input Wrapper 스타일 정의
- [ ] `SideBoard.css`에 `.stealth-input-wrapper` 스타일 추가.
- [ ] 시계 아이콘의 크기와 클릭 영역 확보 (예: 28px * 28px).
- [ ] 기본 색상을 `var(--text-dim)`으로 설정.

### Step 2: Submit Pill (등록 버튼) 수정
- [ ] `submit-pill`에 적절한 `padding`과 `border-radius` 부여 (시계 아이콘과 유사한 느낌).
- [ ] `height: 100%` 대신 명시적 높이 또는 패딩 기반 높이 설정으로 정렬 정밀도 향상.

### Step 3: Hover 효과 동기화
- [ ] `.stealth-input-wrapper:hover`와 `.submit-pill:hover`에 동일한 배경색 적용.
    - Dark: `rgba(255, 255, 255, 0.06)`
    - Light: `rgba(0, 0, 0, 0.04)`
- [ ] 호버 시 아이콘 및 텍스트 색상을 `var(--primary)`로 전환.

### Step 4: 최종 검증
- [ ] 브라우저에서 두 요소의 중앙선이 일치하는지 확인.
- [ ] 마우스를 올렸을 때 동일한 반투명 둥근 사각형 배경이 나타나는지 확인.

## Behavioral Summary
입력창 하단의 모든 액션 요소들이 동일한 디자인 언어(둥근 하이라이트 호버)를 공유하게 되어, 인터페이스가 더욱 세련되고 직관적으로 변함.

## Self Code Review
- **핵심**: '등록' 버튼은 텍스트가 포함되어 있으므로, 아이콘만 있는 시계 버튼과 시각적 무게감을 맞추기 위해 좌우 패딩을 조절하는 것이 중요함.
- **확장성**: 추후 다른 액션 버튼이 추가되더라도 동일한 클래스나 믹스인을 적용할 수 있는 기반 마련.
