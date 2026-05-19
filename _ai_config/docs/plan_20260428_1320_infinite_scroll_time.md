# Implementation Plan - Infinite Scroll Time Dropdown (v2.8)

## 1) Problem Summary
- **과제**: 타임 드롭다운 리스트가 끝에 도달했을 때 멈추지 않고, 무한히 반복(Infinite Loop)되어 회전하는 효과 구현.
- **해결**: 리스트의 상단과 하단에 데이터 세트를 복제(Cloning)하여 배치하고, 스크롤이 임계점에 도달했을 때 위치를 순간적으로 이동시키는 'Seamless Loop' 기술을 적용함.

## 2) Design Summary
- **데이터 트리플링(Tripling)**: 원본 데이터 세트를 [복제-원본-복제] 순으로 3배 늘려 배치하여 상하 어느 방향으로든 충분한 스크롤 영역 확보.
- **자동 위치 보정**:
    - 하단 끝 도달 시 -> 중앙 원본 영역의 상단으로 점프.
    - 상단 끝 도달 시 -> 중앙 원본 영역의 하단으로 점프.
- **사용자 경험**: 스크롤바가 숨겨진 상태에서 끊김 없는 무한 휠링(Infinite Wheeling) 감성 제공.

## 3) Implementation Plan

### Step 1: 시간 프리셋 확장 로직
- [ ] `TimeListDropdown.jsx`에서 `presets` 데이터를 `[...presets, ...presets, ...presets]` 형태로 확장.

### Step 2: 무한 스크롤 이벤트 핸들러 구현
- [ ] `onScroll` 이벤트를 리스트 컨테이너에 부착.
- [ ] `scrollTop` 값을 감시하여 상/하단 임계점 도달 시 `scrollTo`를 이용해 중앙 섹션으로 순간 이동.

### Step 3: 초기 위치 설정
- [ ] 컴포넌트 마운트 시, 중앙 섹션의 `selectedTime` 위치로 초기 스크롤 설정.

### Step 4: 시각적 최적화
- [ ] 순간 이동 시 애니메이션이 튀지 않도록 스크롤 속성(`behavior: 'auto'`) 관리.

## 4) Behavioral Summary
사용자가 시간 드롭다운에서 휠을 돌리면 시간이 00:00에서 23:45를 지나 다시 00:00으로 끊김 없이 이어집니다. 마치 실제 시계 바늘이 회전하듯 무한히 반복되는 부드러운 선택 환경이 제공됩니다.

## 5) Self Code Review
- **의도**: 24시간 목록이 길기 때문에 끝에 도달했을 때 다시 위로 올라가야 하는 번거로움을 제거하여 사용성을 극대화함.
- **주의**: 스크롤 이벤트가 빈번하게 발생하므로 `requestAnimationFrame` 또는 효율적인 조건문으로 성능 저하 방지.
