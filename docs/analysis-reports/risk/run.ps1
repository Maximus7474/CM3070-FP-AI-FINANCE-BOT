$ErrorActionPreference = "Stop"

$scriptDir = $PSScriptRoot
$projectRoot = Resolve-Path "$scriptDir\..\.."

$sourceFile = "$scriptDir\..\source\project-source.md"
$promptFile = "$scriptDir\security-prompt.txt"
$outputFile = "$scriptDir\SECURITY_ISSUE_REPORT.md"

$prompt = Get-Content $promptFile -Raw
$source = Get-Content $sourceFile -Raw
$input = $prompt + "`r`n`r`n--- PROJECT SOURCE ---`r`n" + $source

$output = $input | ollama run qwen3-coder:30b

if ($LASTEXITCODE -ne 0) {
    throw "Ollama failed with exit code $LASTEXITCODE"
}

if ([string]::IsNullOrWhiteSpace($output)) {
    throw "Ollama returned an empty response"
}

# clean escape sequences
$output = $output -replace "`e\[[0-9;?]*[ -/]*[@-~]", ""

Set-Content `
    -Path $outputFile `
    -Value $output `
    -Encoding utf8

Write-Host "SECURITY_ISSUE_REPORT.md generated successfully."
