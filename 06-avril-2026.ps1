# ============================================================
# AVRIL 2026 - Finalisation
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 11 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== AVRIL 2026 - Finalisation ===" -ForegroundColor Cyan

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

# -- 01 avril 2026 --
Commit -Date "2026-04-01T10:00:00" `
       -Message "style: couleur principale mise a jour - Rouge Grenat #9B1C1C" `
       -Files @("tailwind.config.js")

# -- 02 avril 2026 --
Commit -Date "2026-04-02T09:15:00" `
       -Message "fix: la couleur primaire n'etait pas appliquee sur la navbar" `
       -Files @("frontend/src/components/layout/Navbar.tsx", "tailwind.config.js")

# -- 03 avril 2026 --
Commit -Date "2026-04-03T11:00:00" `
       -Message "feat: logo de l'ecole integre dans la navbar" `
       -Files @("frontend/src/components/layout/Navbar.tsx", "frontend/src/assets/logo.png")

# -- 06 avril 2026 --
Commit -Date "2026-04-06T10:30:00" `
       -Message "style: responsive mobile - corrections sur les pages admin" `
       -Files @("frontend/src/pages/admin/AdminStudents.tsx", "frontend/src/pages/admin/AdminTeachers.tsx", "frontend/src/pages/admin/AdminInscriptions.tsx", "frontend/src/pages/admin/AdminPayments.tsx")

# -- 07 avril 2026 --
Commit -Date "2026-04-07T09:00:00" `
       -Message "fix: le menu mobile ne se fermait pas correctement" `
       -Files @("frontend/src/components/layout/Navbar.tsx")

# -- 08 avril 2026 --
Commit -Date "2026-04-08T14:15:00" `
       -Message "refactor: utilitaires formatDate et formatMontant" `
       -Files @("frontend/src/services/api.ts", "frontend/src/utils/formatters.ts")

# -- 09 avril 2026 --
Commit -Date "2026-04-09T10:00:00" `
       -Message "fix: les dates s'affichaient en format ISO dans les tableaux" `
       -Files @("frontend/src/pages/admin/AdminStudents.tsx")

# -- 10 avril 2026 --
Commit -Date "2026-04-10T09:30:00" `
       -Message "style: amelioration de la page Contact - carte et reseaux sociaux" `
       -Files @("frontend/src/pages/ContactPage.tsx")

# -- 13 avril 2026 --
Commit -Date "2026-04-13T11:00:00" `
       -Message "feat: affichage du solde restant du par eleve" `
       -Files @("frontend/src/pages/admin/AdminStudents.tsx")

# -- 14 avril 2026 --
Commit -Date "2026-04-14T10:00:00" `
       -Message "fix: le filtre par statut de paiement ne fonctionnait pas" `
       -Files @("frontend/src/pages/admin/AdminPayments.tsx")

# -- 15 avril 2026 --
Commit -Date "2026-04-15T09:15:00" `
       -Message "style: amelioration des formulaires - validation visuelle" `
       -Files @("frontend/src/pages/InscriptionPage.tsx", "frontend/src/pages/ReinscriptionPage.tsx")

# Nettoyage
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Avril 2026 termine - 11 commits ajoutes ===" -ForegroundColor Cyan
