$ErrorActionPreference = "Stop"

$scriptDir = $PSScriptRoot
$projectRoot = Resolve-Path "$scriptDir\..\..\.."

$sourceFile = "$scriptDir\project-source.md"

Push-Location $projectRoot

try {
    repomix `
        --style markdown `
        --output $sourceFile `
        "src" `
        "src-py" `
        "src-tauri"

    if ($LASTEXITCODE -ne 0) {
        throw "repomix failed with exit code $LASTEXITCODE"
    }
}
finally {
    Pop-Location
}
