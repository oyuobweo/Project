# [Harmony] v2.1 실시간 보안 스캐너 (AgentShield)
# 현재 환경의 보안 정합성과 설정 오류를 실시간으로 진단합니다.

Write-Host "`n>>> 하모니 시스템 보안 감사를 시작합니다 (AgentShield)..." -ForegroundColor Yellow

# npx를 사용하여 최신 AgentShield 보안 스캔 실행
try {
    # 1. 전역 설정 보안 스캔
    Write-Host ">>> 글로벌 설정(~/.claude) 무결성 검사 중..." -ForegroundColor Cyan
    npx ecc-agentshield scan
} catch {
    Write-Host "ERR: 보안 스캔 중 오류가 발생했습니다. Node.js/npx 설치 여부를 확인하세요." -ForegroundColor Red
}

Write-Host "`n>>> 보안 점검이 완료되었습니다. 리드 엔지니어의 지침에 따라 안전하게 개발하세요." -ForegroundColor Green
