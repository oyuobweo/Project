# Implementation Plan - Magazine Header Pixel-Perfect Alignment (v1.1)

## 1) Problem Summary
매거진 헤더의 각 텍스트 영역(날짜 숫자, 월, 요일)이 레이아웃에 따라 시각적으로 완벽하게 정렬되지 않을 수 있으므로, 각 요소별로 독립적인 위치 및 간격 조절(Fine-tuning)이 가능한 구조를 구축하여 '픽셀 퍼펙트'한 완성도를 추구함.

## 2) Design Summary
- **목적**: 폰트 종류나 크기에 상관없이 각 요소의 베이스라인과 시각적 중심을 정교하게 일치시킴.
- **핵심 기술**: CSS Custom Properties를 활용한 레이아웃별 오프셋 제어.
- **조절 대상**:
    - `Big Date`: 전체적인 중심축 역할.
    - `Month / Day`: 개별 수직 위치(Y) 및 자간(Letter-spacing).

## 3) Implementation Plan

### Step 1: CSS Variable System 구축
- [ ] `.magazine-header` 공통 변수 정의:
    - `--mag-y-offset-date`: 날짜 숫자 미세 위치.
    - `--mag-y-offset-month`: 월 텍스트 미세 위치.
    - `--mag-y-offset-day`: 요일 텍스트 미세 위치.

### Step 2: 개별 요소 적용 (SRP 준수)
- [ ] 각 클래스(`.mag-date-big`, `.mag-month`, `.mag-day`)에 `transform: translateY()` 또는 `margin`을 변수와 연동.
- [ ] `line-height: 1` 설정을 유지하며 폰트 고유의 상하 여백 제거.

### Step 3: 레이아웃별(Alt 1~3) 최적화 값 설정
- [ ] **Alt 1 (Split)**: 구분선과 텍스트의 상단 라인을 일치시키기 위한 값 조정.
- [ ] **Alt 2 (Overlay)**: 큰 숫자와 겹치는 텍스트의 가독성을 위한 오프셋 조정.
- [ ] **Alt 3 (Horizontal)**: 바닥면(Baseline) 정렬을 위한 미세 조정.

### Step 4: 테스트 및 검증
- [ ] 브라우저에서 실시간으로 변수값을 수정하며 최적의 '황금 오프셋' 도출.
- [ ] 11일(2자리) vs 1일(1자리) 등 날짜 길이에 따른 정렬 흐트러짐 확인.

## 4) Behavioral Summary
CSS 변수를 통해 각 레이아웃 Variant 내에서도 개별 글자 영역의 위치를 0.5px 단위로 정밀하게 제어할 수 있게 됨.

## 5) Self Code Review
- **장점**: 코드 수정 없이 CSS 변수값만 변경하여 모든 레이아웃의 정렬을 완벽하게 맞출 수 있음.
- **리스크**: 폰트가 변경될 경우 오프셋 값을 재조정해야 할 수 있음.
- **해결**: 글로벌 테마 변수와 연동하여 폰트셋별 사전 정의된 오프셋 제공 고려.
