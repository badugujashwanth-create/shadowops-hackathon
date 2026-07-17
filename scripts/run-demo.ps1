[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host 'Starting ShadowOps Safety Lab in local demo mode.'
Write-Host 'Review environment placeholders and use synthetic data before continuing.'
npm run dev --prefix frontend -- --host 127.0.0.1

