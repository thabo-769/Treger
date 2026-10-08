Set-Location 'C:\Users\Uncommon\Downloads\treger'
git add -A
Write-Output '--- STAGED ---'
git status --porcelain
git commit -m "Replace Pro Plastics logo with Treger Products logo (nav, footer, favicon)"
$c = $LASTEXITCODE
Write-Output "COMMIT EXIT: $c"
if ($c -eq 0) {
  git push origin main 2>&1 | ForEach-Object { "$_" }
  Write-Output "PUSH EXIT: $LASTEXITCODE"
}
git --no-pager log -1 --format='%h %s'
