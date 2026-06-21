# ============================================================
# CLEANUP - Supprime les lignes # 20XX ajoutees par les scripts
# ============================================================

$files = git grep -l "# 2025|# 2026" 2>$null

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    # Supprime toutes les lignes commencant par # 2025 ou # 2026
    $cleaned = ($content -split "`n" | Where-Object { $_ -notmatch "^# 202[56]" }) -join "`n"
    # Supprime les lignes vides en fin de fichier
    $cleaned = $cleaned.TrimEnd() + "`n"
    Set-Content $file $cleaned -NoNewline
    Write-Host "  [OK] Nettoye : $file" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Nettoyage termine ===" -ForegroundColor Cyan
