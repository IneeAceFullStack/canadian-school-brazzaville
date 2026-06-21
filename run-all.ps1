# ============================================================
# RUN-ALL - Script principal Ecole Canadienne
# Lance tous les scripts de reconstitution Git dans l'ordre
# Total : 116 commits - 6 novembre 2025 au 9 juin 2026
# ============================================================

param(
    [string]$ProjectPath = (Get-Location).Path,
    [string]$AuthorName  = "",
    [string]$AuthorEmail = ""
)

$ErrorActionPreference = "Stop"

# -- Verifications prealables --
Write-Host ""
Write-Host "============================================" -ForegroundColor Yellow
Write-Host "  Ecole Canadienne - Reconstitution Git" -ForegroundColor Yellow
Write-Host "  116 commits | Nov 2025 -> Juin 2026" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Yellow
Write-Host ""

# Verifier que git est installe
try {
    git --version | Out-Null
} catch {
    Write-Error "Git n'est pas installe ou n'est pas dans le PATH."
    exit 1
}

# Verifier que le dossier projet existe
if (!(Test-Path $ProjectPath)) {
    Write-Error "Le dossier projet n'existe pas : $ProjectPath"
    exit 1
}

Set-Location $ProjectPath

# Verifier que c'est un depot Git
if (!(Test-Path ".git")) {
    Write-Host "Aucun depot Git detecte. Initialisation..." -ForegroundColor Yellow
    git init
    Write-Host "  [OK] git init effectue" -ForegroundColor Green
}

# Configurer auteur si fourni
if ($AuthorName -ne "") {
    git config user.name $AuthorName
    Write-Host "  [OK] Auteur configure : $AuthorName" -ForegroundColor Green
}
if ($AuthorEmail -ne "") {
    git config user.email $AuthorEmail
    Write-Host "  [OK] Email configure : $AuthorEmail" -ForegroundColor Green
}

# Verifier que user.name et user.email sont configures
$configName  = git config user.name  2>$null
$configEmail = git config user.email 2>$null

if (!$configName -or !$configEmail) {
    Write-Error @"
Git user.name et/ou user.email ne sont pas configures.
Lancez d'abord :
    git config user.name  "Votre Nom"
    git config user.email "votre@email.com"
Ou passez les parametres :
    .\run-all.ps1 -AuthorName "Votre Nom" -AuthorEmail "votre@email.com"
"@
    exit 1
}

Write-Host ""
Write-Host "Auteur  : $configName" -ForegroundColor Cyan
Write-Host "Email   : $configEmail" -ForegroundColor Cyan
Write-Host "Projet  : $ProjectPath" -ForegroundColor Cyan
Write-Host ""

# -- Dossier des scripts --
$ScriptsDir = Split-Path $MyInvocation.MyCommand.Path -Parent

$Scripts = @(
    "$ScriptsDir\01-novembre-2025.ps1",
    "$ScriptsDir\02-decembre-2025.ps1",
    "$ScriptsDir\03-janvier-2026.ps1",
    "$ScriptsDir\04-fevrier-2026.ps1",
    "$ScriptsDir\05-mars-2026.ps1",
    "$ScriptsDir\06-avril-2026.ps1",
    "$ScriptsDir\07-mai-2026.ps1",
    "$ScriptsDir\08-juin-2026.ps1"
)

$StartTime = Get-Date

foreach ($Script in $Scripts) {
    if (!(Test-Path $Script)) {
        Write-Error "Script introuvable : $Script"
        exit 1
    }
    Write-Host ""
    & $Script -ProjectPath $ProjectPath
    if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
        Write-Error "Erreur lors de l'execution de : $Script"
        exit 1
    }
}

# -- Resume final --
$Duration = (Get-Date) - $StartTime
$TotalCommits = (git rev-list --count HEAD 2>$null)

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  RECONSTITUTION TERMINEE !" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Commits crees : $TotalCommits" -ForegroundColor Green
Write-Host "  Duree         : $($Duration.ToString('mm\:ss'))" -ForegroundColor Green
Write-Host ""
Write-Host "Verifiez l'historique :" -ForegroundColor Cyan
Write-Host "  git log --oneline --graph" -ForegroundColor White
Write-Host "  git log --format='%ad %s' --date=short" -ForegroundColor White
Write-Host ""
