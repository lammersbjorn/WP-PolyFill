#!/bin/bash

# WP PolyFill - Validation Script
# This script validates the project structure and checks for common issues

set -e

echo "🔍 Validating WP PolyFill Project Structure..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0
CHECKS=0

# Helper functions
check_file() {
    local file=$1
    local description=$2
    CHECKS=$((CHECKS + 1))

    if [ -f "$file" ]; then
        echo -e "✅ ${GREEN}$description${NC}"
    else
        echo -e "❌ ${RED}Missing: $file - $description${NC}"
        ERRORS=$((ERRORS + 1))
    fi
}

check_directory() {
    local dir=$1
    local description=$2
    CHECKS=$((CHECKS + 1))

    if [ -d "$dir" ]; then
        echo -e "✅ ${GREEN}$description${NC}"
    else
        echo -e "❌ ${RED}Missing directory: $dir - $description${NC}"
        ERRORS=$((ERRORS + 1))
    fi
}

warn_if_exists() {
    local pattern=$1
    local message=$2

    if find . -name "$pattern" -not -path "./build/*" -not -path "./.git/*" | grep -q .; then
        echo -e "⚠️  ${YELLOW}$message${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
}

echo ""
echo "📁 Checking directory structure..."

# Core directories
check_directory "src" "Source directory"
check_directory "src/background" "Background scripts"
check_directory "src/content" "Content scripts"
check_directory "src/modules" "Modules directory"
check_directory "src/modules/translation" "Translation modules"
check_directory "src/modules/database" "Database modules"
check_directory "src/modules/glossary" "Glossary modules"
check_directory "src/modules/utilities" "Utility modules"
check_directory "src/ui" "UI directory"
check_directory "src/ui/pages" "UI pages"
check_directory "src/ui/components" "UI components"
check_directory "src/ui/styles" "Styles directory"
check_directory "src/assets" "Assets directory"
check_directory "src/assets/audio" "Audio assets"
check_directory "src/assets/images" "Image assets"
check_directory "src/assets/data" "Data assets"
check_directory "src/lib/third-party" "Third-party libraries"
check_directory "src/locales" "Localization files"
check_directory "src/manifests" "Manifest files"

echo ""
echo "📄 Checking essential files..."

# Core files
check_file "src/manifest.json" "Main manifest file"
check_file "src/manifests/chrome.json" "Chrome manifest"
check_file "src/manifests/firefox.json" "Firefox manifest"
check_file "src/background/background.js" "Background script"
check_file "src/content/content-script.js" "Main content script"
check_file "src/content/inject.js" "Injection script"

# Translation modules
check_file "src/modules/translation/common-translate.js" "Common translation functions"
check_file "src/modules/translation/deepl-translate.js" "DeepL translation module"
check_file "src/modules/translation/google-translate.js" "Google translation module"
check_file "src/modules/translation/microsoft-translate.js" "Microsoft translation module"
check_file "src/modules/translation/openai-translate.js" "OpenAI translation module"

# UI files
check_file "src/ui/pages/options.html" "Options page"
check_file "src/ui/pages/options.js" "Options script"
check_file "src/ui/components/alert/cute-alert.js" "Alert component"
check_file "src/ui/components/alert/cute-alert.css" "Alert styles"
check_file "src/ui/styles/main.css" "Main stylesheet"

# Build files
check_file "build.sh" "Build script"
check_file ".gitignore" "Git ignore file"
check_file "README.md" "README documentation"
check_file "DEVELOPMENT.md" "Development guide"

echo ""
echo "🚨 Checking for old structure remnants..."

# Check for old file patterns
warn_if_exists "wppo-*.js" "Found old wppo- prefixed JS files"
warn_if_exists "wppo-*.css" "Found old wppo- prefixed CSS files"
warn_if_exists "wppo-*.html" "Found old wppo- prefixed HTML files"
warn_if_exists "contentScript.js" "Found old contentScript.js (should be content-script.js)"

echo ""
echo "🔧 Checking manifest validity..."

# Check manifest JSON syntax
for manifest in "src/manifest.json" "src/manifests/chrome.json" "src/manifests/firefox.json"; do
    CHECKS=$((CHECKS + 1))
    if [ -f "$manifest" ]; then
        if python3 -m json.tool "$manifest" > /dev/null 2>&1; then
            echo -e "✅ ${GREEN}$manifest is valid JSON${NC}"
        else
            echo -e "❌ ${RED}$manifest has invalid JSON syntax${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

echo ""
echo "📊 Validation Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━"
echo "Total checks: $CHECKS"
echo -e "Errors: ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"

if [ $ERRORS -eq 0 ]; then
    echo ""
    echo -e "🎉 ${GREEN}All essential files and directories are present!${NC}"

    if [ $WARNINGS -eq 0 ]; then
        echo -e "✨ ${GREEN}No warnings found. Project structure is clean!${NC}"
    else
        echo -e "⚠️  ${YELLOW}Found $WARNINGS warning(s). Consider cleaning up old files.${NC}"
    fi

    echo ""
    echo "🚀 Ready to build extensions:"
    echo "   ./build.sh"

    exit 0
else
    echo ""
    echo -e "💥 ${RED}Found $ERRORS error(s). Please fix these issues before building.${NC}"
    exit 1
fi
