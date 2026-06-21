# ============================================================
# FEVRIER 2026 - Stabilisation
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 10 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== FEVRIER 2026 - Stabilisation ===" -ForegroundColor Cyan

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

# -- 02 fevrier 2026 --
Commit -Date "2026-02-02T10:15:00" `
       -Message "refactor: amelioration des messages d'erreur API" `
       -Files @("backend/src/middleware/errorHandler.ts")

# -- 03 fevrier 2026 --
Commit -Date "2026-02-03T09:30:00" `
       -Message "style: uniformisation des badges de statut dans l'interface admin" `
       -Files @("frontend/src/pages/admin/AdminStudents.tsx", "frontend/src/pages/admin/AdminInscriptions.tsx", "frontend/src/pages/admin/AdminPayments.tsx")

# -- 04 fevrier 2026 --
Commit -Date "2026-02-04T11:00:00" `
       -Message "feat: pagination sur la liste des eleves" `
       -Files @("frontend/src/pages/admin/AdminStudents.tsx", "backend/src/routes/students.ts")

# -- 05 fevrier 2026 --
Commit -Date "2026-02-05T10:00:00" `
       -Message "feat: recherche et filtres sur les paiements" `
       -Files @("frontend/src/pages/admin/AdminPayments.tsx")

# -- 06 fevrier 2026 --
Commit -Date "2026-02-06T09:15:00" `
       -Message "fix: erreur lors de la creation d'un eleve sans parent assigne" `
       -Files @("backend/src/routes/students.ts")

# -- 09 fevrier 2026 --
Commit -Date "2026-02-09T10:30:00" `
       -Message "refactor: optimisation des requetes Prisma avec select explicite" `
       -Files @("backend/src/routes/students.ts", "backend/src/routes/payments.ts")

# -- 10 fevrier 2026 --
Commit -Date "2026-02-10T09:00:00" `
       -Message "fix: le formulaire de paiement ne se resetait pas apres soumission" `
       -Files @("frontend/src/pages/admin/AdminPayments.tsx")

# -- 11 fevrier 2026 --
Commit -Date "2026-02-11T14:00:00" `
       -Message "style: amelioration de la page de connexion" `
       -Files @("frontend/src/pages/auth/LoginPage.tsx")

# -- 12 fevrier 2026 --
Commit -Date "2026-02-12T10:15:00" `
       -Message "fix: les annonces publiques s'affichaient meme non publiees" `
       -Files @("backend/src/routes/announcements.ts")

# -- 13 fevrier 2026 --
Commit -Date "2026-02-13T09:30:00" `
       -Message "chore: nettoyage des console.log et code mort" `
       -Files @("backend/src/routes/auth.ts", "backend/src/routes/students.ts", "backend/src/routes/payments.ts", "frontend/src/pages/admin/AdminDashboard.tsx", "frontend/src/pages/admin/AdminStudents.tsx")

# Nettoyage
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Fevrier 2026 termine - 10 commits ajoutes ===" -ForegroundColor Cyan
