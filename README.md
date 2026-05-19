# 🚀 Work Info Dashboard

## ▣ 프로젝트 개요
**Work Info**는 사용자의 일정, 할 일, 그리고 주요 업무 통계를 한눈에 파악하고 관리할 수 있는 통합 대시보드 및 캘린더 웹 애플리케이션입니다.

- **Project Name**: Work Info
- **Tech Stack**: React 19, Vite 6, Zustand (상태 관리), Vanilla CSS (Premium Aesthetics)
- **주요 라이브러리**: Lucide-react (아이콘), React Router DOM (라우팅), React-grid-layout (그리드 레이아웃)

## ▣ 주요 기능
1. **대시보드 뷰 (Dashboard View)**: 전체 일정 요약 및 최근 활동 통계 제공
2. **캘린더 뷰 (Calendar View)**: 월간 캘린더 기반의 일정 확인 및 관리
3. **사이드보드 (SideBoard)**: 특정 날짜 클릭 시 상세 일정 및 할 일(Todo) 목록 확인/수정 기능
4. **테마 지원**: 다크 모드 및 라이트 모드 토글 지원
5. **드래그 앤 드롭 지원**: 시각적인 캔버스를 통한 유연한 레이아웃 구성 가능 (Visual Builder Canvas)

## ▣ 폴더 구조 가이드
- `src/`
  - `components/`: UI를 구성하는 공통 및 기능별 컴포넌트 모음 (layout, features, common)
  - `constants/`: 네비게이션 탭, 테마 등 정적 상수 관리
  - `hooks/`: 비즈니스 로직 및 상태 관리를 위한 커스텀 훅 (예: `useEvents`)
  - `utils/`: 로거(Logger) 등 공통 유틸리티 함수
- `public/`: 정적 리소스 파일
- `docs/`: 프로젝트 관련 부가 문서

## ▣ 시작하기 가이드 (Quick Start)

### 1. 패키지 설치
프로젝트 클론 후, 필요한 의존성 패키지를 설치합니다.
```powershell
npm install
```

### 2. 개발 서버 실행
로컬 개발 서버를 실행하여 프로젝트를 확인합니다.
```powershell
npm run dev
```

### 3. 빌드 및 프리뷰
프로덕션용으로 빌드하고 로컬에서 미리보기 할 수 있습니다.
```powershell
npm run build
npm run preview
```

---
Copyright © 2026 Work Info Project.
