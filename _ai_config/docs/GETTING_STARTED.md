# 🚀 Getting Started (시작하기 가이드)

본 가이드는 **Work Info Project**를 새로운 환경(신규 PC 또는 다른 기기)에서 처음 시작할 때 필요한 모든 절차를 안내합니다.

---

## 📋 1. 사전 요구사항
작업을 시작하기 전 아래 도구들이 설치되어 있어야 합니다.
- **Node.js**: v18 이상 (최신 LTS 권장)
- **Git**: 리포지토리 동기화용
- **VS Code**: 권장 에디터
- **Claude Code**: AI 에이전트 인터페이스 (필수)

---

## 🛠️ 2. 초기 셋업 절차 (New PC)

새로운 PC에서 프로젝트를 처음 가져올 때 아래 순서대로 진행하세요.

### 1) 프로젝트 클론 및 라이브러리 설치
```powershell
# 프로젝트 복제
git clone https://github.com/oyuobweo/Project.git
cd "00. Anti Project"

# 의존성 라이브러리 설치
npm install
```

### 2) AI 시스템 환경 동기화 (중요)
본 프로젝트는 **AIRIS (Lead Engineer)** 지침을 따릅니다. AI 에이전트의 뇌를 프로젝트 사양에 맞게 셋업하려면 아래 명령어를 실행하세요.
```powershell
# backups 폴더 내의 셋업 스크립트 실행 (PowerShell)
.\backups\harmony-setup.ps1
```
*※ 이 스크립트는 AI의 성능 설정(Token limit 등)과 글로벌 기술 라이브러리를 자동으로 구성합니다.*

---

## 🔄 3. 일상적인 동기화 (협업/Multi-PC)

두 대 이상의 PC에서 교대로 작업할 때는 아래 루틴을 권장합니다.

1. **작업 시작 전**: `git pull`을 통해 최신 코드와 AI 지침을 가져옵니다.
2. **개발 진행**: AI 에이전트(AIRIS)가 프로젝트 내의 `.claude/rules/`를 자동으로 읽어 기술 표준을 준수합니다.
3. **작업 완료 후**: `git add .`, `git commit`, `git push`를 통해 저장소에 반영합니다.

---

## 🖥️ 4. 개발 서버 실행
모든 셋업이 완료되었다면 아래 명령어로 개발 서버를 기동합니다.
```powershell
npm run dev
```

---

## 💡 꿀팁: AI와 대화하기
본 프로젝트는 **AIRIS v2.1** 시스템에 의해 관리됩니다. AI에게 파일 생성이나 수정을 요청할 때 프로젝트 규칙을 언급하지 않아도, AI는 이미 `.claude/rules/`를 통해 모든 표준을 인지하고 있습니다.

- 문제가 생겼을 때: "현재 프로젝트의 기술 표준(ENGINEERING_STANDARDS.md)에 맞춰 이 코드를 리뷰해줘"라고 요청하세요.
