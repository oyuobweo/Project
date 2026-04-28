# Implementation Plan - Footer Icon Alignment & Style Synchronization (v1.9)

## 1) Problem Summary
푸터 영역의 시계 아이콘과 플러스 아이콘의 수직 중앙 정렬을 완벽하게 맞추고, 시계 아이콘이 활성 상태(패널 확장 시)에서 상시 보라색 프레임과 색상을 유지하던 기존 방식을 변경함. 플러스 버튼과 동일하게 평상시에는 무채색을 유지하다가 호버 시에만 강조되는 방식으로 통일하여 인터렉션의 일관성을 확보함.

## 2) Design Summary
- **수직 정렬 보정**: `entry-footer` 내부의 모든 요소가 Y축 기준 정중앙에 위치하도록 `display: flex` 및 `align-items: center` 최적화.
- **인터렉션 동기화**: 
    - 시계 아이콘의 `.active` 클래스에 부여된 상시 보라색 스타일 제거.
    - 시계 아이콘과 플러스 버튼 모두 기본 상태: `var(--text-dim)`, 호버 상태: `var(--primary) + 배경 하이라이트`로 동작 통일.

## 3) Implementation Plan

### Step 1: 시계 아이콘 활성 스타일 제거
- [ ] `SideBoard.css`에서 `.stealth-input-wrapper.active` 스타일 삭제.
- [ ] 패널이 열려 있어도 아이콘은 호버 시에만 강조되도록 설정.

### Step 2: 푸터 수직 정렬 정밀 교정
- [ ] `.entry-footer`의 높이와 자식 요소(`32px`) 간의 정렬 확인.
- [ ] `button`과 `div` 간의 브라우저 기본 렌더링 차이(패딩 등)를 고려하여 `box-sizing: border-box` 및 `padding: 0` 재확인.

### Step 3: 호버 스타일 최종 동기화
- [ ] 두 아이콘의 `transition`, `border-radius`, `background-color` 속성이 완벽히 동일한지 최종 점검.

### Step 4: 시각적 검증
- [ ] 브라우저에서 메타 패널을 확장한 상태에서도 시계 아이콘이 보라색으로 변하지 않는지 확인.
- [ ] 두 아이콘에 마우스를 올렸을 때 동일한 피드백이 발생하는지 확인.

## 4) Behavioral Summary
푸터의 시계와 플러스 아이콘이 완벽한 수직 정렬을 이루며, 두 버튼 모두 호버링이라는 명시적인 사용자 인터렉션이 있을 때만 보라색 테마 컬러로 전환됩니다.

## 5) Self Code Review
- **의도**: 사용자는 '상시 강조'보다는 '필요할 때의 피드백'을 선호함. 이를 반영하여 인터페이스를 더욱 차분하고 세련되게 정돈.
- **리스크**: 패널이 확장된 상태임을 나타내는 시각적 단서가 약해질 수 있으나, 패널 자체가 아래에 펼쳐지므로 사용자 경험상 문제는 없을 것으로 판단됨.
