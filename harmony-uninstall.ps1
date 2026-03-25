# [Harmony] v2.1 삭제 및 초기화 스크립트 (Windows PowerShell)
# 이 스크립트는 로컬 컴퓨터의 하모니 에이전트 환경을 완전히 제거합니다.

Write-Host "`n>>> Harmony 에이전트 환경 완전 삭제를 시작합니다..." -ForegroundColor Yellow

# 1. 글로벌 설정 폴더 삭제 (~/.claude)
$claudeDir = "$HOME\.claude"
if (Test-Path $claudeDir) {
    Remove-Item -Path $claudeDir -Recurse -Force
    Write-Host "OK: 글로벌 설정 폴더($claudeDir)를 삭제했습니다." -ForegroundColor Green
} else {
    Write-Host "NOTE: 삭제할 설정 폴더($claudeDir)가 이미 존재하지 않습니다." -ForegroundColor Gray
}

# 2. 프로젝트 스크립트 삭제 안내
Write-Host "`n>>> [성공] 시스템 엔진이 완전히 제거되었습니다! 마지막으로 다음을 수행하세요:" -ForegroundColor Yellow
Write-Host "1. 안티그래비티 설정 창의 '+ Global'에 있는 모든 룰 텍스트를 수동으로 지우세요."
Write-Host "2. 'harmony-setup.ps1', 'scan.ps1'과 같은 파일들도 필요 없다면 수동으로 삭제하세요."
Write-Host "3. 이제 안티그래비티는 초기 상태('일반 AI 모드')로 돌아갑니다." -ForegroundColor Cyan
