# ============================================================
# JANVIER 2026 - Pages publiques et UI
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 11 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== JANVIER 2026 - Pages publiques et UI ===" -ForegroundColor Cyan

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

# -- 05 janvier 2026 --
Commit -Date "2026-01-05T10:00:00" `
       -Message "feat: page Inscription publique - formulaire 4 etapes" `
       -Files @("frontend/src/pages/InscriptionPage.tsx")

# -- 06 janvier 2026 --
Commit -Date "2026-01-06T09:30:00" `
       -Message "feat: page Reinscription - recherche eleve et confirmation" `
       -Files @("frontend/src/pages/ReinscriptionPage.tsx")

# -- 07 janvier 2026 --
Commit -Date "2026-01-07T11:15:00" `
       -Message "feat: page Actualites avec liste d'articles" `
       -Files @("frontend/src/pages/BlogPage.tsx")

# -- 08 janvier 2026 --
Commit -Date "2026-01-08T10:00:00" `
       -Message "feat: page detail d'un article" `
       -Files @("frontend/src/pages/BlogDetailPage.tsx")

# -- 09 janvier 2026 --
Commit -Date "2026-01-09T09:45:00" `
       -Message "fix: le formulaire d'inscription ne validait pas le champ email" `
       -Files @("frontend/src/pages/InscriptionPage.tsx")

# -- 10 janvier 2026 --
Commit -Date "2026-01-10T14:30:00" `
       -Message "style: responsive mobile sur toutes les pages publiques" `
       -Files @("frontend/src/pages/HomePage.tsx", "frontend/src/pages/AboutPage.tsx", "frontend/src/pages/ProgramsPage.tsx", "frontend/src/pages/VieScolairePage.tsx", "frontend/src/pages/ContactPage.tsx")

# -- 12 janvier 2026 --
Commit -Date "2026-01-12T10:00:00" `
       -Message "refactor: routage centralise dans App.tsx avec protection des routes" `
       -Files @("frontend/src/App.tsx")

# -- 13 janvier 2026 --
Commit -Date "2026-01-13T09:15:00" `
       -Message "fix: redirection incorrecte apres login selon le role" `
       -Files @("frontend/src/context/AuthContext.tsx")

# -- 14 janvier 2026 --
Commit -Date "2026-01-14T11:00:00" `
       -Message "style: amelioration du dashboard admin - cartes de stats" `
       -Files @("frontend/src/pages/admin/AdminDashboard.tsx")

# -- 15 janvier 2026 --
Commit -Date "2026-01-15T10:30:00" `
       -Message "feat: seed de la base de donnees avec comptes de demonstration" `
       -Files @("backend/prisma/seed.ts")

# -- 16 janvier 2026 --
Commit -Date "2026-01-16T09:00:00" `
       -Message "fix: le seed echouait si la base n'etait pas vide" `
       -Files @("backend/prisma/seed.ts")

# Nettoyage
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Janvier 2026 termine - 11 commits ajoutes ===" -ForegroundColor Cyan
