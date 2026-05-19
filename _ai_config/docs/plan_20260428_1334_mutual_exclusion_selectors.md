# Implementation Plan - Mutual Exclusion of Meta Selectors (v2.10)

## 1) Problem Summary
- **과제**: 타임 드롭다운 메뉴와 미니 캘린더가 동시에 열리는 겹침 현상을 방지. 하나가 열릴 때 다른 하나는 자동으로 닫히도록 배타적 선택(Mutual Exclusion) 로직 구현.
- **해결**: `setActiveCalendar` 호출 시 `setActiveTimePicker(null)`을 병행하고, 그 반대의 경우도 동일하게 적용하여 UI가 항상 단일 드롭다운 상태를 유지하도록 제어함.

## 2) Design Summary
- **싱글 포커스 정책**: 사용자가 날짜를 클릭하면 시간 선택 모드가 종료되고, 시간을 클릭하면 날짜 선택 모드가 종료됨.
- **레이아웃 시프트 방지**: 겹침으로 인한 시각적 혼란을 제거하여 더욱 전문적이고 깔끔한 인터페이스 제공.

## 3) Implementation Plan

### Step 1: 날짜 선택 시 시간 드롭다운 닫기
- [ ] `SideBoard.jsx`에서 `setActiveCalendar`가 호출되는 모든 `onClick` 핸들러에 `setActiveTimePicker(null)` 추가.

### Step 2: 시간 선택 시 캘린더 닫기
- [ ] `setActiveTimePicker`가 호출되는 `onClick` 핸들러에 `setActiveCalendar(null)` 추가.

### Step 3: 통합 상태 관리 고려 (선택 사항)
- [ ] 만약 상태가 더 많아진다면 `activeSelector: 'date' | 'startTime' | 'endTime' | null` 형태의 통합 상태로 리팩토링 검토. 현재는 두 상태의 상호 배제만으로도 충분함.

## 4) Behavioral Summary
사용자가 종료일 설정을 위해 날짜 박스를 누르면, 만약 열려있던 시간 선택 메뉴가 있었다면 즉시 사라집니다. 반대로 시간을 수정하려고 칩을 누르면 열려있던 캘린더가 닫힙니다. 화면에는 항상 현재 조작 중인 하나의 설정 창만 존재하게 됩니다.

## 5) Self Code Review
- **의도**: 좁은 모바일/사이드바 환경에서 레이어 겹침은 치명적인 UX 저하 요소임. 배타적 선택을 통해 이를 예방함.
- **효율성**: 기존의 외부 클릭 닫기 로직과 결합되어 매우 견고한 UI 제어가 가능해짐.
