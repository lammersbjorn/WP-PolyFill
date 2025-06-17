# Development Guide

## Project Structure

This extension uses a modern, organized file structure for better maintainability and developer experience.

### 📁 Directory Structure

```
src/
├── 📁 background/          # Service worker/background scripts
├── 📁 content/             # Content scripts and injection scripts
├── 📁 modules/             # Core functionality modules
│   ├── 📁 translation/     # Translation engine modules
│   ├── 📁 database/        # Database operations
│   ├── 📁 glossary/        # Glossary management
│   └── 📁 utilities/       # Utility functions
├── 📁 ui/                  # User interface components
│   ├── 📁 pages/           # Extension pages (options, etc.)
│   ├── 📁 components/      # Reusable UI components
│   └── 📁 styles/          # CSS stylesheets
├── 📁 assets/              # Static assets
│   ├── 📁 audio/           # Audio files
│   ├── 📁 images/          # Images and icons
│   └── 📁 data/            # Data files (JSON, CSV)
├── 📁 lib/                 # External libraries
│   └── 📁 third-party/     # Third-party dependencies
├── 📁 locales/             # Internationalization files
├── 📁 manifests/           # Browser-specific manifests
└── 📁 metadata/            # Extension metadata
```

## Development Workflow

### 🛠️ Building Extensions

#### Using the Build Script (Recommended)
```bash
./build.sh
```

#### Manual Build
```bash
# Chrome
mkdir -p build/chrome
cp -r src/* build/chrome/
cp src/manifests/chrome.json build/chrome/manifest.json
cd build/chrome && zip -r ../../chrome-extension.zip .

# Firefox
mkdir -p build/firefox
cp -r src/* build/firefox/
cp src/manifests/firefox.json build/firefox/manifest.json
cd build/firefox && zip -r ../../firefox-addon.zip .
```

### 🧪 Testing

#### Chrome
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `src/` directory

#### Firefox
1. Open `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `src/manifest.json` file

### 📝 Adding New Features

#### Translation Modules
Add new translation services in `src/modules/translation/`:
```javascript
// src/modules/translation/new-service-translate.js
async function newServiceTranslate(original, destlang, options) {
    // Implementation
}
```

#### UI Components
Add reusable components in `src/ui/components/`:
```
src/ui/components/
└── my-component/
    ├── my-component.js
    ├── my-component.css
    └── my-component.html
```

#### Utilities
Add helper functions in `src/modules/utilities/`:
```javascript
// src/modules/utilities/my-utility.js
function myUtility() {
    // Implementation
}
```

### 🔄 File Reference Guidelines

When referencing files in code:

#### Chrome Extensions API
```javascript
// ✅ Correct - use organized paths
chrome.runtime.getURL('ui/pages/options.html')
chrome.runtime.getURL('assets/images/icon.png')
chrome.runtime.getURL('assets/audio/notification.wav')

// ❌ Avoid - old flat structure
chrome.runtime.getURL('wppo-options.html')
```

#### Import/Include Patterns
```javascript
// Content script references
script.src = chrome.runtime.getURL('content/inject.js');

// Asset references
const iconPath = 'assets/images/icons/success.svg';
const audioPath = 'assets/audio/error-alert.flac';
```

### 📋 Manifest Updates

When adding new files, update the appropriate manifest:

#### Content Scripts
```json
// src/manifests/manifest.json
"content_scripts": [{
  "js": [
    "modules/utilities/functions.js",
    "modules/translation/common-translate.js",
    "content/content-script.js"
  ]
}]
```

#### Web Accessible Resources
```json
"web_accessible_resources": [{
  "resources": [
    "assets/images/icons/*",
    "ui/components/alert/cute-alert.css",
    "assets/audio/*"
  ]
}]
```

### 🎯 Best Practices

1. **Modular Design**: Keep related functionality together
2. **Clear Naming**: Use descriptive, kebab-case file names
3. **Asset Organization**: Group assets by type and purpose
4. **Documentation**: Comment complex functionality
5. **Testing**: Test in both Chrome and Firefox
6. **Version Control**: Use semantic versioning for releases

### 🔍 Debugging

#### Chrome DevTools
1. Right-click extension icon → "Inspect popup"
2. Go to `chrome://extensions/` → Click "Details" → "Inspect views"

#### Firefox DevTools
1. Go to `about:debugging`
2. Find your extension → Click "Inspect"

### 📦 Release Process

1. Update version in all manifest files
2. Run build script: `./build.sh`
3. Test both Chrome and Firefox builds
4. Create git tag: `git tag v1.x.x`
5. Push tag: `git push --tags`
6. GitHub Actions will automatically create release

### 🆘 Troubleshooting

#### Common Issues
- **File not found**: Check path in manifest matches actual file location
- **Permission denied**: Ensure all required permissions in manifest
- **Cross-browser issues**: Test browser-specific manifest differences

#### Debug Checklist
- [ ] Manifest syntax is valid JSON
- [ ] All referenced files exist at specified paths
- [ ] Permissions are properly declared
- [ ] Content Security Policy allows required operations
