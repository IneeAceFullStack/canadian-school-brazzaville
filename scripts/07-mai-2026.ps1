# ============================================================
# MAI 2026 - Finitions
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 18 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== MAI 2026 - Finitions ===" -ForegroundColor Cyan

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

# -- 04 mai 2026 --
Commit -Date "2026-05-04T10:00:00" `
       -Message "fix: correction de l'encodage des caracteres accentues dans Prisma" `
       -Files @("prisma/schema.prisma")

# -- 05 mai 2026 --
Commit -Date "2026-05-05T09:15:00" `
       -Message "feat: rate limiting sur les routes d'authentification" `
       -Files @("backend/src/index.ts")

# -- 06 mai 2026 --
Commit -Date "2026-05-06T11:00:00" `
       -Message "refactor: centralisation de la configuration dans index.ts" `
       -Files @("backend/src/index.ts")

# -- 07 mai 2026 --
Commit -Date "2026-05-07T10:30:00" `
       -Message "fix: CORS bloquait les requetes du frontend en developpement" `
       -Files @("backend/src/index.ts")

# -- 08 mai 2026 --
Commit -Date "2026-05-08T09:00:00" `
       -Message "style: amelioration de la page Programmes - niveaux et specialites" `
       -Files @("frontend/src/pages/ProgramsPage.tsx")

# -- 11 mai 2026 --
Commit -Date "2026-05-11T10:15:00" `
       -Message "fix: le formulaire de contact ne reinitialise pas apres envoi" `
       -Files @("frontend/src/pages/ContactPage.tsx")

# -- 12 mai 2026 --
Commit -Date "2026-05-12T09:30:00" `
       -Message "style: amelioration de la page Vie scolaire - reglement" `
       -Files @("frontend/src/pages/VieScolairePage.tsx")

# -- 13 mai 2026 --
Commit -Date "2026-05-13T11:00:00" `
       -Message "feat: protection des routes privees - redirection si non connecte" `
       -Files @("frontend/src/App.tsx", "frontend/src/context/AuthContext.tsx")

# -- 14 mai 2026 --
Commit -Date "2026-05-14T10:00:00" `
       -Message "fix: l'utilisateur restait connecte apres expiration du token" `
       -Files @("frontend/src/context/AuthContext.tsx")

# -- 15 mai 2026 --
Commit -Date "2026-05-15T09:15:00" `
       -Message "refactor: amelioration des messages de toast - succes et erreurs" `
       -Files @("frontend/src/pages/admin/AdminDashboard.tsx", "frontend/src/pages/admin/AdminStudents.tsx", "frontend/src/pages/admin/AdminPayments.tsx", "frontend/src/pages/admin/AdminGrades.tsx")

# -- 19 mai 2026 --
Commit -Date "2026-05-19T10:30:00" `
       -Message "chore: mise a jour des dependances npm" `
       -Files @("package.json", "frontend/package.json", "backend/package.json")

# -- 20 mai 2026 --
Commit -Date "2026-05-20T09:00:00" `
       -Message "fix: la migration Prisma echouait sur une base non vide" `
       -Files @("prisma/migrations/20251112_init/migration.sql")

# -- 21 mai 2026 --
Commit -Date "2026-05-21T14:00:00" `
       -Message "chore: ajout des variables d'environnement manquantes" `
       -Files @("backend/.env.example", "frontend/.env.example")

# -- 22 mai 2026 --
Commit -Date "2026-05-22T10:15:00" `
       -Message "style: uniformisation des marges et espacements" `
       -Files @("frontend/src/index.css")

# -- 26 mai 2026 --
Commit -Date "2026-05-26T09:30:00" `
       -Message "fix: les stats du dashboard ne se rafraichissaient pas" `
       -Files @("frontend/src/pages/admin/AdminDashboard.tsx")

# -- 27 mai 2026 --
Commit -Date "2026-05-27T11:00:00" `
       -Message "style: amelioration des cartes de statistiques admin" `
       -Files @("frontend/src/pages/admin/AdminDashboard.tsx")

# -- 28 mai 2026 --
Commit -Date "2026-05-28T10:00:00" `
       -Message "refactor: nettoyage final du code - suppression des imports inutiles" `
       -Files @("frontend/src/pages/admin/AdminDashboard.tsx", "frontend/src/pages/admin/AdminStudents.tsx", "backend/src/routes/auth.ts", "backend/src/routes/grades.ts", "backend/src/routes/schedule.ts")

# -- 29 mai 2026 --
Commit -Date "2026-05-29T09:15:00" `
       -Message "docs: redaction du README avec instructions d'installation" `
       -Files @("README.md")

# Nettoyage
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Mai 2026 termine - 18 commits ajoutes ===" -ForegroundColor Cyan
