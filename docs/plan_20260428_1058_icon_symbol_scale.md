# Implementation Plan - Enhancing Icon Shape Scale Animation (v2.6)

## 1) Problem Summary
플러스(`+`) 버튼 호버 시 배경 프레임만 변하는 것처럼 느껴지는 문제를 해결하기 위해, 내부의 플러스 기호(SVG) 자체가 명확하게 확대되는 애니메이션을 추가함. 시계 아이콘과 플러스 아이콘 모두 내부 기호에 직접적인 확대 효과를 부여하여 시각적 피드백을 강화함.

## 2) Design Summary
- **심볼 중심 확대**: 버튼 컨테이너의 확대 외에도 내부 `svg` 요소에 개별적인 `transform: scale`을 적용하여 기호의 역동성 부여.
- **일관된 애니메이션**: 
    - `svg` 요소에 `transition: transform 0.2s` 적용.
    - 호버 시 `scale(1.2)` 수준의 명확한 기호 확대 구현.

## 3) Implementation Plan

### Step 1: SVG 애니메이션 속성 추가
- [ ] `SideBoard.css`에서 `.stealth-input-wrapper svg`와 `.submit-pill svg`에 기본 `transition` 추가.

### Step 2: 호버 시 SVG 확대 정의
- [ ] `.stealth-input-wrapper:hover svg`에 `transform: scale(1.15);` 적용.
- [ ] `.submit-pill:hover svg`에 `transform: scale(1.15);` 적용.

### Step 3: 컨테이너 확대와 조화
- [ ] 기존 컨테이너 확대(`1.05`)와 결합되어 더욱 풍성한 확대 효과가 나타나는지 확인.

### Step 4: 최종 검증
- [ ] 브라우저에서 플러스 기호 자체가 시원하게 커지는지 육안 확인.
- [ ] 시계 아이콘의 바늘/모양도 함께 커지는지 확인.

## 4) Behavioral Summary
푸터의 아이콘 버튼에 마우스를 올리면 버튼 배경이 강조됨과 동시에 내부의 기호(시계, 플러스)가 튀어 나오듯 확대되어, 사용자에게 매우 명확한 인터렉션 경험을 제공합니다.

## 5) Self Code Review
- **의도**: 컨테이너만 커지는 것은 배경색 변화에 묻힐 수 있음. 내부 심볼을 직접 키워주면 '기능 버튼'으로서의 인지도가 극대화됨.
- **결과**: 고품질 UI의 디테일한 애니메이션 감성을 확보.
