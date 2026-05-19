# Implementation Plan - Click Outside to Close Dropdowns (v2.9)

## 1) Problem Summary
- **과제**: 메타 패널(날짜/시간 선택)에서 드롭다운이나 캘린더가 열려있을 때, 해당 영역 외부를 클릭하면 열려있는 메뉴를 자동으로 닫히게 설정.
- **해결**: `SideBoard` 컴포넌트에 글로벌 클릭 이벤트 리스너를 추가하고, `useRef`를 사용하여 클릭된 지점이 메뉴 내부인지 외부인지 판단하여 상태(`activeCalendar`, `activeTimePicker`)를 초기화함.

## 2) Design Summary
- **포괄적 감지**: 날짜 선택 박스, 시간 칩, 그리고 실제 드롭다운 메뉴 전체를 포함하는 컨테이너를 `ref`로 참조.
- **이벤트 전파 제어**: 내부 클릭 시에는 닫히지 않도록 `contains()` 메서드로 검증.
- **사용자 경험**: 별도의 닫기 버튼을 누르지 않아도 빈 영역 클릭만으로 메뉴를 정리할 수 있는 직관적인 UX 제공.

## 3) Implementation Plan

### Step 1: DOM 참조를 위한 Ref 추가
- [ ] `SideBoard.jsx`에서 메타 설정 패널 전체를 감싸는 영역에 `metaPanelRef` 추가.

### Step 2: 글로벌 클릭 이벤트 핸들러 구현
- [ ] `useEffect`를 사용하여 `document`에 `mousedown` 이벤트 리스너 등록.
- [ ] 클릭된 `target`이 `metaPanelRef` 내부에 포함되지 않는 경우 `setActiveCalendar(null)` 및 `setActiveTimePicker(null)` 실행.

### Step 3: 이벤트 리스너 클린업
- [ ] 컴포넌트 언마운트 시 또는 종속성 변경 시 리스너를 제거하여 메모리 누수 방지.

### Step 4: 예외 처리 (시계 아이콘 클릭)
- [ ] 시계 아이콘(메타 패널 토글 버튼) 클릭 시에는 패널 자체가 닫히지 않도록 기존 로직과 충돌 여부 확인.

## 4) Behavioral Summary
사용자가 날짜를 선택하려고 캘린더를 열었거나 시간을 고르기 위해 드롭다운을 열었을 때, 실수로 다른 곳을 클릭하거나 입력을 마치고 다른 영역을 누르면 열려있던 선택 창들이 즉시 사라집니다. UI가 항상 깔끔하게 유지됩니다.

## 5) Self Code Review
- **의도**: 모달이나 드롭다운 UI의 표준 패턴인 'Click Outside to Close'를 적용하여 완성도 향상.
- **최적화**: 이벤트 리스너는 패널이 열려있을 때만 동작하도록 조건부 로직 적용 고려.
