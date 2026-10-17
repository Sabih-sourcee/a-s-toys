#requires -Version 5.1
<#
.SYNOPSIS
  Build the site and deploy dist/ to Hostinger (usmanitoys.com).

.DESCRIPTION
  Usage:
    .\deploy.ps1
    .\deploy.ps1 -SkipBuild

  Auth, tried in order until Hostinger accepts one:
    1. .env.deploy  (HOSTINGER_API_TOKEN=hst_...)
    2. HOSTINGER_API_TOKEN environment variable
    3. Hostinger MCP OAuth file: %APPDATA%\hostinger-mcp\credentials.json

  A 401 means the token was rejected. Create a new one in hPanel -> Profile -> API.
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

function Read-TextFile([string]$Path) {
  $bytes = [System.IO.File]::ReadAllBytes($Path)
  if ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
    return [System.Text.Encoding]::Unicode.GetString($bytes)
  }
  if ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
    return [System.Text.Encoding]::BigEndianUnicode.GetString($bytes)
  }
  return [System.Text.Encoding]::UTF8.GetString($bytes).TrimStart([char]0xFEFF)
}

function Normalize-Token([string]$Value) {
  if (-not $Value) { return '' }
  $token = $Value.Trim().Trim([char]0xFEFF).Trim('"').Trim("'")
  if ($token.StartsWith('Bearer ')) { $token = $token.Substring(7).Trim() }
  return $token
}

function Get-HostingerCredentials {
  $script:deployCreds = New-Object System.Collections.Generic.List[object]
  $script:deploySeen = @{}

  function Add-Candidate([string]$Source, [string]$Value) {
    $token = Normalize-Token $Value
    if (-not $token -or $script:deploySeen.ContainsKey($token)) { return }
    $script:deploySeen[$token] = $true
    $script:deployCreds.Add([pscustomobject]@{ Source = $Source; Token = $token }) | Out-Null
  }

  $envFile = Join-Path $Root '.env.deploy'
  if (Test-Path $envFile) {
    $matched = $false
    foreach ($line in (Read-TextFile $envFile) -split '\r?\n') {
      if ($line -match '^\s*HOSTINGER_API_TOKEN\s*=\s*(.+)\s*$') {
        Add-Candidate '.env.deploy' $Matches[1]
        $matched = $true
      }
    }
    if (-not $matched) {
      Write-Host '.env.deploy is present but has no HOSTINGER_API_TOKEN= line.' -ForegroundColor Yellow
    }
  }

  if ($env:HOSTINGER_API_TOKEN) {
    Add-Candidate 'HOSTINGER_API_TOKEN environment variable' $env:HOSTINGER_API_TOKEN
  }

  $oauthPath = Join-Path $env:APPDATA 'hostinger-mcp\credentials.json'
  if (Test-Path $oauthPath) {
    $creds = (Read-TextFile $oauthPath) | ConvertFrom-Json
    if ($creds.access_token) {
      Add-Candidate 'Hostinger MCP OAuth file' ([string]$creds.access_token)
    }
  }

  if ($script:deployCreds.Count -eq 0) {
    throw @"
No Hostinger auth found.

Create .env.deploy in this folder with one line:
  HOSTINGER_API_TOKEN=hst_your_token

Create the token in hPanel -> Profile -> API.
"@
  }

  return $script:deployCreds
}

function Invoke-HostingerApi {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][string]$Token,
    [object]$Body = $null
  )

  $uri = "$ApiBase$Path"
  $bodyFile = [System.IO.Path]::GetTempFileName()
  $curlArgs = @(
    '-sS', '-o', $bodyFile, '-w', '%{http_code}',
    '-X', $Method,
    '-H', "Authorization: Bearer $Token",
    '-H', 'Accept: application/json'
  )
  if ($null -ne $Body) {
    $json = $Body | ConvertTo-Json -Compress -Depth 6
    $curlArgs += @('-H', 'Content-Type: application/json', '--data-binary', $json)
  }
  $curlArgs += $uri

  $code = ((& curl.exe @curlArgs) | Out-String).Trim()
  $text = ''
  if (Test-Path $bodyFile) {
    $text = [System.IO.File]::ReadAllText($bodyFile).Trim()
    Remove-Item -Force $bodyFile
  }
  if ($LASTEXITCODE -ne 0) {
    throw "Hostinger request failed (curl exit $LASTEXITCODE)"
  }
  if ($code -eq '401') {
    $detail = $text
    if (-not $detail) { $detail = 'Unauthorized' }
    throw "401 $detail"
  }
  if ($code -notmatch '^2') {
    throw "HTTP $code $text"
  }
  if (-not $text) { return $null }
  return $text | ConvertFrom-Json
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

$credentials = @(Get-HostingerCredentials)
$token = $null
foreach ($candidate in $credentials) {
  Write-Host ("Checking token from " + $candidate.Source)
  try {
    Invoke-HostingerApi -Method Post -Token $candidate.Token `
      -Path '/api/hosting/v1/files/upload-urls' `
      -Body @{ username = $username; domain = $domain } | Out-Null
    $token = $candidate.Token
    Write-Host ("Authenticated with " + $candidate.Source) -ForegroundColor Green
    break
  }
  catch {
    Write-Host ("    " + $candidate.Source + " was rejected: " + $_.Exception.Message) -ForegroundColor Yellow
  }
}
if (-not $token) {
  throw @"
Hostinger returned 401 for every saved token.

The token in .env.deploy is missing, expired, or from a different Hostinger account.
1. hPanel -> Profile -> API -> create a new token.
2. Put this single line in .env.deploy (Notepad is fine):
     HOSTINGER_API_TOKEN=hst_your_new_token
3. Run .\deploy.ps1 again.
Do not paste the token into chat.
"@
}

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
