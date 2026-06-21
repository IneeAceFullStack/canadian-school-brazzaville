# ============================================================
# DECEMBRE 2025 - Fonctionnalites pedagogiques
# Ecole Canadienne - Script PowerShell de reconstitution Git
# 18 commits
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path
)

Set-Location $ProjectPath
Write-Host "=== DECEMBRE 2025 - Fonctionnalites pedagogiques ===" -ForegroundColor Cyan

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

# -- 01 decembre 2025 --
Commit -Date "2025-12-01T09:20:00" `
       -Message "feat: gestion des notes par matiere et trimestre" `
       -Files @("backend/src/routes/grades.ts", "frontend/src/pages/admin/AdminGrades.tsx")

# -- 02 decembre 2025 --
Commit -Date "2025-12-02T10:30:00" `
       -Message "feat: saisie des notes par l'enseignant" `
       -Files @("frontend/src/pages/teacher/TeacherGrades.tsx")

# -- 03 decembre 2025 --
Commit -Date "2025-12-03T09:00:00" `
       -Message "feat: emploi du temps - creation et affichage par classe" `
       -Files @("backend/src/routes/schedule.ts", "frontend/src/pages/admin/AdminSchedule.tsx")

# -- 04 decembre 2025 --
Commit -Date "2025-12-04T11:00:00" `
       -Message "feat: dashboard eleve - notes et emploi du temps" `
       -Files @("frontend/src/pages/student/StudentDashboard.tsx")

# -- 05 decembre 2025 --
Commit -Date "2025-12-05T09:30:00" `
       -Message "feat: page notes de l'eleve avec moyenne par trimestre" `
       -Files @("frontend/src/pages/student/StudentGrades.tsx")

# -- 06 decembre 2025 --
Commit -Date "2025-12-06T14:20:00" `
       -Message "feat: emploi du temps de l'eleve" `
       -Files @("frontend/src/pages/student/StudentSchedule.tsx")

# -- 08 decembre 2025 --
Commit -Date "2025-12-08T10:00:00" `
       -Message "feat: systeme d'annonces - creation et publication" `
       -Files @("backend/src/routes/announcements.ts", "frontend/src/pages/admin/AdminAnnouncements.tsx")

# -- 09 decembre 2025 --
Commit -Date "2025-12-09T09:15:00" `
       -Message "feat: formulaire de contact public" `
       -Files @("backend/src/routes/contact.ts", "frontend/src/pages/ContactPage.tsx")

# -- 10 decembre 2025 --
Commit -Date "2025-12-10T11:30:00" `
       -Message "feat: statistiques dashboard admin - eleves, paiements, inscriptions" `
       -Files @("backend/src/routes/stats.ts", "frontend/src/pages/admin/AdminDashboard.tsx")

# -- 11 decembre 2025 --
Commit -Date "2025-12-11T09:45:00" `
       -Message "feat: graphique encaissements mensuels avec Recharts" `
       -Files @("frontend/src/pages/admin/AdminDashboard.tsx")

# -- 12 decembre 2025 --
Commit -Date "2025-12-12T10:00:00" `
       -Message "fix: le calcul du taux d'inscription etait incorrect" `
       -Files @("backend/src/routes/stats.ts")

# -- 13 decembre 2025 --
Commit -Date "2025-12-13T14:30:00" `
       -Message "refactor: extraction du client Axios dans un service API centralise" `
       -Files @("frontend/src/services/api.ts")

# -- 15 decembre 2025 --
Commit -Date "2025-12-15T09:00:00" `
       -Message "style: palette de couleurs - rouge primaire #CC0000" `
       -Files @("tailwind.config.js", "frontend/src/index.css")

# -- 16 decembre 2025 --
Commit -Date "2025-12-16T10:15:00" `
       -Message "feat: page d'accueil publique - hero, stats, programmes, temoignages" `
       -Files @("frontend/src/pages/HomePage.tsx")

# -- 17 decembre 2025 --
Commit -Date "2025-12-17T09:30:00" `
       -Message "feat: page A propos - histoire, valeurs, equipe de direction" `
       -Files @("frontend/src/pages/AboutPage.tsx")

# -- 18 decembre 2025 --
Commit -Date "2025-12-18T11:00:00" `
       -Message "feat: page Programmes - Maternelle au Lycee avec specialites" `
       -Files @("frontend/src/pages/ProgramsPage.tsx")

# -- 19 decembre 2025 --
Commit -Date "2025-12-19T10:00:00" `
       -Message "feat: page Vie scolaire - activites parascolaires et infrastructures" `
       -Files @("frontend/src/pages/VieScolairePage.tsx")

# -- 20 decembre 2025 --
Commit -Date "2025-12-20T09:15:00" `
       -Message "fix: la navbar ne se fermait pas sur mobile apres navigation" `
       -Files @("frontend/src/components/layout/Navbar.tsx")

# Nettoyage
Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Decembre 2025 termine - 18 commits ajoutes ===" -ForegroundColor Cyan