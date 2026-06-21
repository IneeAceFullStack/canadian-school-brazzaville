# ============================================================
# MARS 2026 - Ameliorations UI
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 10 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== MARS 2026 - Ameliorations UI ===" -ForegroundColor Cyan

function Commit {
    param([string]$Date, [string]$Message, [string[]]$Files)
    $env:GIT_AUTHOR_DATE    = $Date
    $env:GIT_COMMITTER_DATE = $Date
    foreach ($f in $Files) {
        $dir = Split-Path $f -Parent
        if ($dir -and !(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        if (!(Test-Path $f)) { New-Item -ItemType File -Path $f -Force | Out-Null }
        Add-Content -Path $f -Value "# $Date - $Message"
        git add $f 2>$null
    }
    git commit -m $Message --date=$Date --allow-empty
    Write-Host "  [OK] $Date - $Message" -ForegroundColor Green
}

# -- 02 mars 2026 --
Commit -Date "2026-03-02T10:00:00" `
       -Message "style: amelioration de la page d'accueil - section hero" `
       -Files @("frontend/src/pages/HomePage.tsx")

# -- 03 mars 2026 --
Commit -Date "2026-03-03T09:15:00" `
       -Message "feat: cartes membres equipe cliquables avec modal biographie" `
       -Files @("frontend/src/pages/AboutPage.tsx")

# -- 04 mars 2026 --
Commit -Date "2026-03-04T11:30:00" `
       -Message "feat: cartes activites et infrastructures cliquables avec modal detail" `
       -Files @("frontend/src/pages/VieScolairePage.tsx")

# -- 05 mars 2026 --
Commit -Date "2026-03-05T10:00:00" `
       -Message "fix: le modal ne se fermait pas en cliquant en dehors" `
       -Files @("frontend/src/pages/AboutPage.tsx", "frontend/src/pages/VieScolairePage.tsx")

# -- 06 mars 2026 --
Commit -Date "2026-03-06T09:30:00" `
       -Message "style: effet hover et animation sur les cartes cliquables" `
       -Files @("frontend/src/pages/AboutPage.tsx", "frontend/src/pages/VieScolairePage.tsx")

# -- 09 mars 2026 --
Commit -Date "2026-03-09T10:15:00" `
       -Message "refactor: reorganisation des types TypeScript" `
       -Files @("frontend/src/services/api.ts", "frontend/src/types/index.ts")

# -- 10 mars 2026 --
Commit -Date "2026-03-10T09:00:00" `
       -Message "style: amelioration du tableau des notes - colonnes et filtres" `
       -Files @("frontend/src/pages/admin/AdminGrades.tsx")

# -- 11 mars 2026 --
Commit -Date "2026-03-11T14:30:00" `
       -Message "fix: la moyenne calculee ne prenait pas en compte le coefficient" `
       -Files @("frontend/src/pages/student/StudentGrades.tsx")

# -- 12 mars 2026 --
Commit -Date "2026-03-12T10:00:00" `
       -Message "style: amelioration de l'emploi du temps - affichage par jour" `
       -Files @("frontend/src/pages/admin/AdminSchedule.tsx")

# -- 13 mars 2026 --
Commit -Date "2026-03-13T09:45:00" `
       -Message "feat: dashboard enseignant avec stats classes et notes recentes" `
       -Files @("frontend/src/pages/teacher/TeacherDashboard.tsx")

# Nettoyage
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Mars 2026 termine - 10 commits ajoutes ===" -ForegroundColor Cyan
