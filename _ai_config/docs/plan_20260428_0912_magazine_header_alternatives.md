# Implementation Plan - Magazine Header Layout Alternatives (v1.0)

## 1) Problem Summary
현재 SideBoard의 '매거진 스타일 헤더'는 기본적인 수직 스택 구조를 가지고 있으나, 사용자에게 보다 다양한 시각적 경험과 프리미엄 감성을 제공하기 위해 여러 레이아웃 대안(Alternatives)을 제안하고 이를 선택 또는 순환할 수 있는 구조를 구축하고자 함.

## 2) Design Summary
- **목적**: 사용자 취향에 맞는 다양한 고품격 매거진 헤더 스타일 제공.
- **입출력**: 
    - Input: `selectedDate`, `layoutVariant` (default: 'classic')
    - Output: 선택된 테마에 최적화된 헤더 UI 렌더링.
- **주요 모듈**:
    - `MagazineHeader.jsx` (컴포넌트 분리 추천)
    - `MagazineHeader.css` (레이아웃별 스타일 정의)

## 3) Implementation Plan

### Step 1: Search-First & Analysis
- [ ] 현재 `SideBoard.css`의 `magazine-header` 관련 스타일 분석.
- [ ] 글로벌 테마 변수(`--primary`, `--text-main` 등) 활용 가능성 확인.

### Step 2: Component Refactoring (SRP 준수)
- [ ] `SideBoard.jsx` 내의 헤더 로직을 독립된 `MagazineHeader` 컴포넌트로 추출 고려.
- [ ] `variant` prop을 통해 레이아웃을 전환할 수 있는 구조 설계.

### Step 3: Layout Alternatives Definition
- **Alt 1: Split-Line (구분선 강조형)**
    - 날짜와 텍스트 사이에 세밀한 수직선 배치.
    - 월/요일의 폰트 웨이트 차별화.
- **Alt 2: Magazine Cover (잡지 표지형)**
    - 큰 날짜 숫자 뒤에 배경 텍스트(예: MONTH)를 연하게 배치.
    - 오버랩 효과로 깊이감 부여.
- **Alt 3: Typography Focus (타이포그래피 집중형)**
    - Serif와 Sans-serif 폰트의 혼합 사용 제안.
    - 대문자(Uppercase)와 소문자의 대비 활용.

### Step 4: CSS Implementation
- [ ] `SideBoard.css`에 각 `variant`별 클래스 추가 (예: `.magazine-header.v1`, `.magazine-header.v2`).
- [ ] 반응형 고려: 사이드바 너비 변화에 따른 텍스트 크기 최적화.

### Step 5: Integration & Testing
- [ ] `SideBoard.jsx`에서 `variant` 값을 변경하며 실제 렌더링 확인.
- [ ] 다크/라이트 모드에서의 가독성 테스트.

## 4) Implementation Details (예시 코드 구조)
```jsx
// MagazineHeader.jsx
const MagazineHeader = ({ date, variant = 'classic' }) => {
  return (
    <div className={`magazine-header ${variant}`}>
      {/* variant에 따른 조건부 렌더링 또는 공통 구조 내 CSS 제어 */}
    </div>
  );
};
```

## 5) Testing (Red-Green-Refactor)
- **Unit**: 각 레이아웃 요소의 렌더링 여부 확인.
- **Edge Case**: 
    - 날짜가 1자리 vs 2자리일 때의 정렬 유지.
    - 월 이름이 길어질 때(예: September)의 레이아웃 깨짐 방지.

## 6) Behavior Summary
사용자가 선택한 `layoutVariant`에 따라 사이드바 상단 헤더가 클래식, 분할선, 오버레이 등 다양한 고품격 스타일로 즉시 변경됨.

## 7) Self Code Review
- **Risk**: 너무 복잡한 레이아웃은 가독성을 해칠 수 있음.
- **Fallback**: 기본 'classic' 레이아웃을 항상 유지하고, CSS만으로 스타일 전환 유도.
- **Improvement**: 향후 설정 메뉴에서 사용자가 직접 헤더 스타일을 선택할 수 있도록 연동 가능.
