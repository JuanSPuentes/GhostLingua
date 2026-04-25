# GhostLingua 👻

**GhostLingua** is a premium, real-time translation bridge for desktop. Type in Spanish and have your thoughts typed across any chat application (Discord, Slack, Browsers, etc.) in English automatically.

## 🚀 Key Features

- **Invisibility Mode:** Captures the previous active window and restores focus automatically to ensure your text lands exactly where it should.
- **Live Streaming:** Detects when you stop typing for a brief moment and injects the translated chunk as you go.
- **Seamless Injection:** Uses a Clipboard + Ctrl+V method for 100% compatibility across all modern apps and browsers.
- **Premium UI:** Now featuring a solid, movable dark theme. Drag the window anywhere on your screen.
- **AI Powered:** Integrated with OpenRouter/Gemini for human-like, contextual translations.

## 🛠️ Setup

### 1. Requirements
- Node.js installed.
- An OpenRouter API Key.

### 2. Configuration
Create a `.env` file in the root directory:
```env
OPENROUTER_API_KEY=your_key_here
MODEL_NAME=google/gemini-2.0-flash-exp
```

### 3. Installation
```bash
npm install
```

## 🎮 Usage

1. **Start the app:** `npm start`
2. **Focus your Chat:** Click on the text box of the app you want to chat in.
3. **Summon GhostLingua:** Press `Alt + Shift + G`.
4. **Type naturally:** Write your message in Spanish.
5. **Auto-Inject:** Pause for 1.2 seconds, and GhostLingua will automatically paste the translated fragment into the chat.
6. **Finish:** Press **Enter** to send the final part and close the bar.

## ⌨️ Shortcuts
- `Alt + Shift + G`: Show / Hide GhostLingua.
- `Enter`: Inject final text and stay open (or press again to close).
- `Esc`: Hide the window immediately.

## 🛡️ Privacy
All processing happens locally through Electron. Your API keys are stored in your private `.env` file.

---
*Created with ❤️ for global communication.*
