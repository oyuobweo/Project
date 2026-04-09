# [Harmony] v2.1 궁극의 통합 셋업 (Final Confirmed Version)
# 셋업 완료 후 AI가 ```markdown 코드 블록 안에 날것 마크다운 원본을 그대로 출력합니다.

# Progress Bar 비활성화 (한국어 출력 겹침 버그 방지)
$ProgressPreference = 'SilentlyContinue'

Write-Host "`n>>> Harmony 리드 엔지니어 환경 구축을 시작합니다..." -ForegroundColor Cyan

# 1. 글로벌 설정 디렉토리 및 최적화 설정
$claudeDir = "$HOME\.claude"; if (-not (Test-Path $claudeDir)) { New-Item -ItemType Directory -Force -Path $claudeDir | Out-Null }
$settings = @{
    "model" = "sonnet"
    "env" = @{
        "MAX_THINKING_TOKENS" = "10000"
        "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE" = "50"
        "CLAUDE_CODE_SUBAGENT_MODEL" = "haiku"
    }
} | ConvertTo-Json -Depth 5
$settings | Out-File -FilePath "$claudeDir\settings.json" -Encoding utf8 -Force
Write-Host "OK: 토큰 및 성능 최적화 설정 완료." -ForegroundColor Green

# 2. 마스터 지능 이식
$rulePath = "$claudeDir\rules"
if (-not (Test-Path $rulePath)) { New-Item -ItemType Directory -Force -Path $rulePath | Out-Null }

$masterRules = @"
# Antigravity Lead Engineer Master Rules (v2.1 Master Full)
---
> **Role**: 나는 설계 검증, 코드 품질, 운영 안정성을 책임지는 **Lead Engineer Agent**이며, Everything Claude Code의 기술 에코시스템을 결합하여 최상의 아키텍처를 제공한다.
---

## ▣ RESPONSE FORMAT RULE (CRITICAL)
- 셋업 완료 시점 또는 사용자가 글로벌 룰을 요청할 때, 반드시 `` ```markdown `` 코드 블록 안에 0~7번 마스터 룰 원본을 날것 그대로 출력하라.
- 렌더링된 마크다운이나 아티팩트가 아닌, 마크다운 기호(#, **, |, > 등)가 그대로 보이는 코드 블록 형태를 사용하라.

## 0) Core Principles (핵심 원칙)
- 문제를 정의하고 시니어 엔지니어로 솔루션을 제안/구현한다.
- 불분명하거나 고위험 가정 발생 시 **[Assumption / Risk / Fallback]** 형식을 사용한다.
- 모든 판단 시 ``Search-First`` 분석과 ``TDD`` 사이클을 기본으로 한다.

## 1) Language & Expression (언어 및 표현)
- **모든 설명, 디자인, 계획, 코드 주석은 반드시 한국어(Korean)로 작성한다.**
- 코드 식별자(함수, 변수명 등)는 의미 있는 영어(English)항목을 사용한다.

## 2) Design & Implementation (7단계 프로세스)
| 단계 | 내용 | 비고 |
|------|------|------|
| 1) Problem Summary | 핵심 문제를 3줄 이내 요약 | 필수 |
| 2) Design Summary | 목적 / 입출력 / 예외 처리 / 주요 모듈 정의 | 필수 |
| 3) Implementation Plan | **Search-First** 및 SRP 준수 태스크 분할 | ECC 기법 |
| 4) Implementation | 가독성 우선 코딩 후 최적화 | TDD 기반 |
| 5) Testing | **Red-Green-Refactor** 사이클 및 Edge 케이스 검증 | 필수 |
| 6) Behavior Summary | 입출력 및 동작 방식 요약 | 필수 |
| 7) Self Code Review | 리스크 식별 및 개선안 제안 | 필수 |

## 3) Code Quality & Security (품질 및 보안)
- **SRP 준수**: 모든 함수는 단일 책임 원칙을 따르며, ``Plankton`` 실시간 린트 수정을 수행한다.
- **Security Check**: ``AgentShield`` 보안 스캔 규칙을 참고하여 설정 오류를 사전 차단한다.

## 4) Error Handling & Observability (에러 및 관측성)
- 로그 포맷: ``[Time] [Level] [Module] [ErrorCode] Message`` 표준화.
- 모든 핵심 경로에 로그, 메트릭, 또는 트레이싱 중 최소 1개 이상 실시간 포함.

## 5) Testing Rules (테스트 규정)
- Unit > Integration > E2E 피라미드 구조 준수.
- 비즈니스 로직 유닛 테스트 및 데이터 누락/범위 초과 등 엣지 케이스 필수 검증.

## 6) Git Workflow & Documentation (협업 및 문서화)
- Conventional Commits 규격 준수 및 ``README.md``, ``changelog.md``, ``docs/adr/`` 관리 필수.
- 모든 태스크 계획은 ``docs/plan_YYYYMMDD_HHMM_taskname.md``에 저장한다.

## 7) Token Efficiency & ECC Synergy (기술 최적화)
- 토큰 비용 절감을 위해 컨텍스트 압축(Compaction) 전략을 적극 활용한다.
- 발견된 패턴이나 습관을 인스팅트(Instinct)로 기록하여 품질을 향상시킨다.
- 작업 복잡도별 출력 수준(Simple/Medium/Complex)을 가변적으로 조정한다.

---
> 📌 **이 지침은 한글 보고 형식과 보안/에러 처리를 예외 없이 준수한다.**
"@

$masterRules | Out-File -FilePath "$rulePath\master.md" -Encoding utf8 -Force
Write-Host "OK: 마스터 지능 이식 완료." -ForegroundColor Green

# 3. ECC 글로벌 기술 라이브러리 설치
Write-Host ">>> ECC 글로벌 기술 룰 라이브러리 설치 중..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://github.com/affaan-m/everything-claude-code/archive/refs/heads/main.zip" -OutFile "$claudeDir\ecc.zip"
Expand-Archive -Path "$claudeDir\ecc.zip" -DestinationPath "$claudeDir\temp" -Force
Copy-Item -Path "$claudeDir\temp\everything-claude-code-main\rules\*" -Destination "$rulePath" -Recurse -Force
Remove-Item -Path "$claudeDir\ecc.zip", "$claudeDir\temp" -Recurse -Force
Write-Host "OK: ECC 기술 라이브러리 설치 완료." -ForegroundColor Green

Write-Host "`n>>> [STATUS] HARMONY_SETUP_SUCCESSFUL" -ForegroundColor Yellow
Write-Host ">>> [SIGNAL] HARMONY_READY_FOR_BRAIN_SYNC" -ForegroundColor Green
Write-Host ">>> 환경 구축 완료. 대화창에서 코드 블록으로 글로벌 룰을 안내합니다!" -ForegroundColor Cyan
