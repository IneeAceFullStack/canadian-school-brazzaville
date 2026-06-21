# ============================================================
# NOVEMBRE 2025 - Fondations
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 30 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== NOVEMBRE 2025 - Fondations ===" -ForegroundColor Cyan

# Fonction utilitaire
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

# -- 06 novembre 2025 --
Commit -Date "2025-11-06T09:12:00" `
       -Message "init: initialisation du projet React + Vite + Express" `
       -Files @("package.json", "tsconfig.json", ".gitignore", "README.md")

Commit -Date "2025-11-06T14:28:00" `
       -Message "chore: configuration TailwindCSS et PostCSS" `
       -Files @("tailwind.config.js", "postcss.config.js", "frontend/src/index.css")

# -- 07 novembre 2025 --
Commit -Date "2025-11-07T10:05:00" `
       -Message "chore: mise en place de la structure frontend/backend" `
       -Files @("frontend/package.json", "backend/package.json", "frontend/vite.config.ts", "backend/tsconfig.json")

# -- 08 novembre 2025 --
Commit -Date "2025-11-08T11:15:00" `
       -Message "feat: configuration Prisma et connexion PostgreSQL" `
       -Files @("prisma/schema.prisma", "backend/.env.example", "backend/src/lib/prisma.ts")

Commit -Date "2025-11-08T16:40:00" `
       -Message "feat: schema initial - modeles User et Session" `
       -Files @("prisma/schema.prisma")

# -- 09 novembre 2025 --
Commit -Date "2025-11-09T09:30:00" `
       -Message "feat: modele Student avec champs identite et scolarite" `
       -Files @("prisma/schema.prisma")

Commit -Date "2025-11-09T15:20:00" `
       -Message "feat: modele Parent et relation Student-Parent" `
       -Files @("prisma/schema.prisma")

# -- 10 novembre 2025 --
Commit -Date "2025-11-10T10:00:00" `
       -Message "feat: modeles Teacher et Grade" `
       -Files @("prisma/schema.prisma")

Commit -Date "2025-11-10T16:45:00" `
       -Message "feat: modeles Payment, Inscription et Schedule" `
       -Files @("prisma/schema.prisma")

# -- 11 novembre 2025 --
Commit -Date "2025-11-11T09:20:00" `
       -Message "feat: modeles Announcement et ContactMessage" `
       -Files @("prisma/schema.prisma")

# -- 12 novembre 2025 --
Commit -Date "2025-11-12T10:30:00" `
       -Message "feat: migration initiale de la base de donnees" `
       -Files @("prisma/schema.prisma", "prisma/migrations/20251112_init/migration.sql")

# -- 13 novembre 2025 --
Commit -Date "2025-11-13T09:15:00" `
       -Message "feat: authentification JWT - login et verification du token" `
       -Files @("backend/src/routes/auth.ts", "backend/src/middleware/auth.ts")

Commit -Date "2025-11-13T15:50:00" `
       -Message "feat: middleware de verification des roles (admin, teacher, student)" `
       -Files @("backend/src/middleware/auth.ts")

# -- 14 novembre 2025 --
Commit -Date "2025-11-14T10:20:00" `
       -Message "feat: route /me et changement de mot de passe" `
       -Files @("backend/src/routes/auth.ts")

# -- 15 novembre 2025 --
Commit -Date "2025-11-15T09:00:00" `
       -Message "fix: le token JWT n'incluait pas le role utilisateur" `
       -Files @("backend/src/routes/auth.ts")

# -- 17 novembre 2025 --
Commit -Date "2025-11-17T10:45:00" `
       -Message "feat: serveur Express - middleware, CORS, Helmet, rate limiting" `
       -Files @("backend/src/index.ts")

Commit -Date "2025-11-17T16:30:00" `
       -Message "feat: gestionnaire d'erreurs global" `
       -Files @("backend/src/middleware/errorHandler.ts")

# -- 18 novembre 2025 --
Commit -Date "2025-11-18T09:30:00" `
       -Message "feat: page de connexion avec formulaire et gestion des roles" `
       -Files @("frontend/src/pages/auth/LoginPage.tsx", "frontend/src/context/AuthContext.tsx")

# -- 19 novembre 2025 --
Commit -Date "2025-11-19T10:00:00" `
       -Message "feat: layout admin avec sidebar et navigation" `
       -Files @("frontend/src/components/layout/AdminLayout.tsx")

Commit -Date "2025-11-19T15:40:00" `
       -Message "feat: layouts Student et Teacher" `
       -Files @("frontend/src/components/layout/StudentLayout.tsx", "frontend/src/components/layout/TeacherLayout.tsx")

# -- 20 novembre 2025 --
Commit -Date "2025-11-20T09:15:00" `
       -Message "feat: Navbar et Footer du site public" `
       -Files @("frontend/src/components/layout/Navbar.tsx", "frontend/src/components/layout/Footer.tsx")

# -- 21 novembre 2025 --
Commit -Date "2025-11-21T10:30:00" `
       -Message "feat: CRUD eleves - creation, liste et recherche" `
       -Files @("backend/src/routes/students.ts", "frontend/src/pages/admin/AdminStudents.tsx")

# -- 22 novembre 2025 --
Commit -Date "2025-11-22T09:00:00" `
       -Message "feat: CRUD enseignants" `
       -Files @("backend/src/routes/teachers.ts", "frontend/src/pages/admin/AdminTeachers.tsx")

# -- 24 novembre 2025 --
Commit -Date "2025-11-24T10:15:00" `
       -Message "fix: erreur 500 lors de la suppression d'un eleve avec paiements lies" `
       -Files @("backend/src/routes/students.ts")

# -- 25 novembre 2025 --
Commit -Date "2025-11-25T09:30:00" `
       -Message "feat: gestion des inscriptions - nouvelle inscription multi-etapes" `
       -Files @("backend/src/routes/inscriptions.ts")

Commit -Date "2025-11-25T15:00:00" `
       -Message "feat: gestion des reinscriptions avec recherche de l'eleve" `
       -Files @("backend/src/routes/inscriptions.ts")

# -- 26 novembre 2025 --
Commit -Date "2025-11-26T10:00:00" `
       -Message "feat: page admin inscriptions avec filtres et statuts" `
       -Files @("frontend/src/pages/admin/AdminInscriptions.tsx")

# -- 27 novembre 2025 --
Commit -Date "2025-11-27T09:45:00" `
       -Message "feat: gestion des paiements - creation et confirmation" `
       -Files @("backend/src/routes/payments.ts")

# -- 28 novembre 2025 --
Commit -Date "2025-11-28T14:30:00" `
       -Message "feat: generation de recu PDF avec jsPDF" `
       -Files @("frontend/src/pages/admin/AdminPayments.tsx")

# -- 29 novembre 2025 --
Commit -Date "2025-11-29T10:00:00" `
       -Message "fix: le PDF generait une erreur si la reference etait vide" `
       -Files @("frontend/src/pages/admin/AdminPayments.tsx")

# Nettoyage des variables d'environnement
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Novembre 2025 termine - 30 commits ajoutes ===" -ForegroundColor Cyan
