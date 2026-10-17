#requires -Version 5.1
<#
.SYNOPSIS
  Build the site and deploy dist/ to Hostinger (usmanitoys.com).

.DESCRIPTION
  Usage:
    .\deploy.ps1
    .\deploy.ps1 -SkipBuild

  Auth (first match wins):
    1. HOSTINGER_API_TOKEN environment variable
    2. .env.deploy  (HOSTINGER_API_TOKEN=hst_...)
    3. Hostinger MCP OAuth file: %APPDATA%\hostinger-mcp\credentials.json

  Create an API token in hPanel -> Profile -> API Tokens if OAuth is missing.
#>
[CmdletBinding()]
param(
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$Root = $PSScriptRoot
$SiteConfigPath = Join-Path $Root '.hostinger\site.json'
$DistDir = Join-Path $Root 'dist'
$ApiBase = 'https://developers.hostinger.com'

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Get-SiteConfig {
  if (-not (Test-Path $SiteConfigPath)) {
    throw "Missing $SiteConfigPath"
  }
  return Get-Content -Raw -Path $SiteConfigPath | ConvertFrom-Json
}

function Get-HostingerToken {
  if ($env:HOSTINGER_API_TOKEN) {
    return $env:HOSTINGER_API_TOKEN.Trim()
  }

  $envFile = Join-Path $Root '.env.deploy'
  if (Test-Path $envFile) {
    foreach ($line in Get-Content $envFile) {
      if ($line -match '^\s*HOSTINGER_API_TOKEN\s*=\s*(.+)\s*$') {
        return $Matches[1].Trim().Trim('"').Trim("'")
      }
    }
  }

  $oauthPath = Join-Path $env:APPDATA 'hostinger-mcp\credentials.json'
  if (Test-Path $oauthPath) {
    $creds = Get-Content -Raw -Path $oauthPath | ConvertFrom-Json
    if ($creds.access_token) {
      return [string]$creds.access_token
    }
  }

  throw @"
No Hostinger auth found.

Fix one of:
  - Set HOSTINGER_API_TOKEN in the environment
  - Create .env.deploy with: HOSTINGER_API_TOKEN=hst_your_token
  - Sign in once via Cursor Hostinger MCP (OAuth)
"@
}

function Invoke-HostingerApi {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][string]$Token,
    [object]$Body = $null
  )

  $headers = @{
    Authorization = "Bearer $Token"
    Accept        = 'application/json'
  }

  $uri = "$ApiBase$Path"
  if ($null -ne $Body) {
    $json = $Body | ConvertTo-Json -Compress -Depth 6
    return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers -ContentType 'application/json' -Body $json
  }

  return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers
}

function Invoke-Build {
  Write-Step 'Building production bundle (npm run build)'
  Push-Location $Root
  try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build failed with exit code $LASTEXITCODE" }
  }
  finally {
    Pop-Location
  }
}

function New-DistArchive {
  param([Parameter(Mandatory)][string]$OutZip)

  if (-not (Test-Path (Join-Path $DistDir 'index.html'))) {
    throw 'dist\index.html missing - run a build first.'
  }

  if (Test-Path $OutZip) { Remove-Item -Force $OutZip }

  Write-Step ("Packaging dist/ -> " + (Split-Path $OutZip -Leaf))
  # Compress-Archive with dist\* keeps files at zip root (required by Hostinger).
  Compress-Archive -Path (Join-Path $DistDir '*') -DestinationPath $OutZip -CompressionLevel Optimal

  $count = (Get-ChildItem -Recurse -File $DistDir).Count
  $sizeMb = [math]::Round((Get-Item $OutZip).Length / 1MB, 2)
  Write-Host "    $count files, $sizeMb MB"
  return $OutZip
}

function Send-TusUpload {
  param(
    [Parameter(Mandatory)][string]$UploadUrl,
    [Parameter(Mandatory)][string]$AuthKey,
    [Parameter(Mandatory)][string]$RestAuthKey,
    [Parameter(Mandatory)][string]$RemoteName,
    [Parameter(Mandatory)][string]$LocalFile
  )

  $size = (Get-Item $LocalFile).Length
  $dest = ($UploadUrl.TrimEnd('/') + '/' + $RemoteName + '?override=true')

  Write-Step ("Uploading " + $RemoteName + " (" + [math]::Round($size/1MB,2) + " MB) via TUS")

  $create = & curl.exe -sS -i -X POST $dest `
    -H ("X-Auth: " + $AuthKey) `
    -H ("X-Auth-Rest: " + $RestAuthKey) `
    -H 'Tus-Resumable: 1.0.0' `
    -H ("Upload-Length: " + $size) `
    -H 'Upload-Offset: 0'
  $createText = ($create | Out-String)

  if ($LASTEXITCODE -ne 0) { throw "TUS create failed (curl exit $LASTEXITCODE)" }
  if ($createText -notmatch 'HTTP/\S+\s+201') {
    throw ("TUS create did not return 201:`n" + $createText)
  }

  $patch = & curl.exe -sS -i -X PATCH $dest `
    -H ("X-Auth: " + $AuthKey) `
    -H ("X-Auth-Rest: " + $RestAuthKey) `
    -H 'Tus-Resumable: 1.0.0' `
    -H 'Content-Type: application/offset+octet-stream' `
    -H 'Upload-Offset: 0' `
    --data-binary ("@" + $LocalFile)
  $patchText = ($patch | Out-String)

  if ($LASTEXITCODE -ne 0) { throw "TUS upload failed (curl exit $LASTEXITCODE)" }
  if ($patchText -notmatch 'HTTP/\S+\s+204') {
    throw ("TUS upload did not return 204:`n" + $patchText)
  }

  Write-Host '    Upload complete'
}

function Deploy-StaticArchive {
  param(
    [Parameter(Mandatory)][string]$Token,
    [Parameter(Mandatory)][string]$Username,
    [Parameter(Mandatory)][string]$Domain,
    [Parameter(Mandatory)][string]$ArchivePath
  )

  Write-Step ("Deploying archive on " + $Domain + " (overwrites public_html)")
  # Some Hostinger accounts need the public_html/ prefix; try bare name first, then prefixed.
  $pathsToTry = @($ArchivePath, ("public_html/" + $ArchivePath))
  $lastError = $null

  foreach ($tryPath in $pathsToTry) {
    try {
      Invoke-HostingerApi -Method Post -Token $Token `
        -Path ("/api/hosting/v1/accounts/" + $Username + "/websites/" + $Domain + "/deploy") `
        -Body @{ archive_path = $tryPath } | Out-Null
      Write-Host ("    Deploy accepted (archive_path=" + $tryPath + ")")
      return
    }
    catch {
      $lastError = $_
      $msg = $_.Exception.Message
      if ($msg -match 'Archive not found' -or $msg -match '404' -or $msg -match '500') {
        Write-Host ("    archive_path=" + $tryPath + " failed, trying next...") -ForegroundColor Yellow
        continue
      }
      throw
    }
  }

  throw ("Deploy failed: " + $lastError)
}

function Clear-SiteCache {
  param(
    [Parameter(Mandatory)][string]$Token,
    [Parameter(Mandatory)][string]$Username,
    [Parameter(Mandatory)][string]$Domain
  )

  Write-Step 'Clearing Hostinger cache'
  try {
    Invoke-HostingerApi -Method Delete -Token $Token `
      -Path ("/api/hosting/v1/accounts/" + $Username + "/websites/" + $Domain + "/cache/clear") | Out-Null
    Write-Host '    Cache cleared'
  }
  catch {
    Write-Host ("    Cache clear skipped: " + $_.Exception.Message) -ForegroundColor Yellow
  }
}

function Test-LiveSite {
  param([Parameter(Mandatory)][string]$Domain)

  Write-Step ("Verifying https://" + $Domain + "/")
  $code = & curl.exe -sS -o NUL -w '%{http_code}' ("https://" + $Domain + "/")
  Write-Host ("    HTTP " + $code)
  if ($code -ne '200') {
    Write-Host '    Warning: expected 200 - check the site in a browser.' -ForegroundColor Yellow
  }
}

# --- main -------------------------------------------------------------------

$site = Get-SiteConfig
$domain = [string]$site.domain
$username = [string]$site.username

Write-Host ("Deploy target: " + $domain + " (" + $username + ")") -ForegroundColor Green

$token = Get-HostingerToken

if (-not $SkipBuild) {
  Invoke-Build
}
elseif (-not (Test-Path (Join-Path $DistDir 'index.html'))) {
  throw 'dist/ is empty and -SkipBuild was set. Run without -SkipBuild.'
}

$stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$zipName = ("dist_" + $stamp + ".zip")
$zipPath = Join-Path $Root $zipName
New-DistArchive -OutZip $zipPath | Out-Null

try {
  Write-Step 'Requesting Hostinger upload URL'
  $upload = Invoke-HostingerApi -Method Post -Token $token `
    -Path '/api/hosting/v1/files/upload-urls' `
    -Body @{ username = $username; domain = $domain }

  Send-TusUpload `
    -UploadUrl $upload.url `
    -AuthKey $upload.auth_key `
    -RestAuthKey $upload.rest_auth_key `
    -RemoteName $zipName `
    -LocalFile $zipPath

  Deploy-StaticArchive -Token $token -Username $username -Domain $domain -ArchivePath $zipName
  Clear-SiteCache -Token $token -Username $username -Domain $domain
  Test-LiveSite -Domain $domain
}
finally {
  if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
  }
}

Write-Host ""
Write-Host ("Live: https://" + $domain + "/") -ForegroundColor Green
Write-Host 'Done.'
