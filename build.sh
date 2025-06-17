#!/bin/bash

# WP PolyFill - Build Script
# This script builds Chrome and Firefox extensions from the organized source structure

set -e

echo "🔨 Building WP PolyFill Extensions..."

# Clean previous builds
rm -rf build/
rm -f *.zip

# Create build directories
mkdir -p build/chrome build/firefox

echo "📦 Building Chrome extension..."
# Copy all source files
cp -r src/* build/chrome/

# Use Chrome-specific manifest
cp src/manifests/chrome.json build/chrome/manifest.json

# Clean up unnecessary files
rm -rf build/chrome/manifests
rm -rf build/chrome/docs

# Create Chrome zip
cd build/chrome
zip -r ../../chrome-extension.zip . -x "*.DS_Store" "*.git*" "*/node_modules/*" > /dev/null
cd ../..

echo "🦊 Building Firefox extension..."
# Copy all source files
cp -r src/* build/firefox/

# Use Firefox-specific manifest
cp src/manifests/firefox.json build/firefox/manifest.json

# Clean up unnecessary files
rm -rf build/firefox/manifests
rm -rf build/firefox/docs

# Create Firefox zip
cd build/firefox
zip -r ../../firefox-addon.zip . -x "*.DS_Store" "*.git*" "*/node_modules/*" > /dev/null
cd ../..

echo "✅ Build completed successfully!"
echo "📄 Generated files:"
ls -la *.zip

echo ""
echo "🚀 Installation Instructions:"
echo "Chrome: Load chrome-extension.zip as unpacked extension"
echo "Firefox: Install firefox-addon.zip as temporary add-on"
