# WP PolyFill

A browser extension that streamlines WP translation workflows on translate.wordpress.org with AI-powered translations and glossary-based accuracy checking.

## ✨ Features

- **🤖 AI Translation APIs**: DeepL, OpenAI, Google Translate, Microsoft Translator
- **📚 Glossary Integration**: Upload locale glossaries for translation accuracy validation
- **✅ Smart Approval**: One-click approve/reject based on glossary compliance
- **🔍 Spell Checking**: Integrated LanguageTool for translation quality
- **🔧 Text Processing**: Pre/post translation string replacement and formatting
- **🏷️ Brand Protection**: Preserve brand names and terminology
- **🔗 GlotDict Compatible**: Enhanced integration with [GlotDict extension](https://github.com/Mte90/GlotDict)

## 📖 Documentation

- **[📚 Full Wiki](https://github.com/lammersbjorn/WP-PolyFill/wiki)** - Complete documentation
- **[🐛 Report Issues](https://github.com/lammersbjorn/WP-PolyFill/issues/new)** - Bug reports and feature requests

## 🚀 Installation

### Option 1: Browser Stores (Recommended)

#### Chrome
1. Install from [Chrome Web Store]()
2. Configure via Extensions → WP PolyFill → Options

#### Firefox
1. Install from [Firefox Add-ons]()
2. Configure via Add-ons Manager → WP PolyFill → Preferences

### Option 2: Manual Installation

#### Chrome (Developer Mode)
```bash
# Build the extension
./build.sh

# In Chrome:
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the build/chrome/ folder
```

#### Firefox (Temporary Installation)
```bash
# Build the extension
./build.sh

# In Firefox:
# 1. Go to about:debugging
# 2. Click "This Firefox"
# 3. Click "Load Temporary Add-on"
# 4. Select build/firefox/manifest.json
```

#### Firefox (Permanent Installation)
```bash
# Build the extension
./build.sh

# Install the generated firefox-addon.zip:
# 1. Go to about:addons
# 2. Click the gear icon → "Install Add-on From File"
# 3. Select firefox-addon.zip
```

## ⚙️ Configuration

After installation, configure your API keys and preferences:

1. **Open Options/Preferences** from your browser's extension menu
2. **Set API Keys** for your preferred translation services
3. **Upload Glossary** files for your target locales
4. **Configure Settings** as described in the [Wiki](https://github.com/lammersbjorn/WP-PolyFill/wiki/2.-Parameters)

## 🎯 Usage

Once installed and configured:

- **Translate Page**: Use the "Translate" button above the translation list
- **Translate Single**: Click "Translate" within individual translation editors
- **Quality Check**: Use "Check" to validate translations against your glossary
- **Approve/Reject**: Smart buttons appear based on glossary compliance

## 🛠️ Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for development setup, build instructions, and contribution guidelines.

---

## 📊 Project Info

- **License**: Open Source
- **Browsers**: Chrome, Firefox, Edge
- **Platforms**: WordPress.org Translation Platform
- **APIs Supported**: DeepL, OpenAI, Google Translate, Microsoft Translator

## 🔗 Links

- [📚 Documentation Wiki](https://github.com/lammersbjorn/WP-PolyFill/wiki)
- [🐛 Issue Tracker](https://github.com/lammersbjorn/WP-PolyFill/issues)
- [🔌 Chrome Web Store]()
- [🦊 Firefox Add-ons](/)

## 🤝 Contributing

Contributions are welcome! Please check the [issues](https://github.com/lammersbjorn/WP-PolyFill/issues) for ways to help or create a new issue for bugs and feature requests.
