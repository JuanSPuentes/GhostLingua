# GhostLingua 👻

![GhostLingua Demo](gifexample.gif)

**GhostLingua** is a premium, real-time translation bridge for desktop. Type in Spanish and have your thoughts typed across any chat application (Discord, Slack, Browsers, etc.) in English automatically.

## 🚀 Key Features

- **Universal Compatibility:** Support for any OpenAI-compatible API (OpenAI, OpenRouter, Groq, Mistral, Ollama, etc.).
- **Invisibility Mode:** Captures the previous active window and ensures the text lands exactly in your chat input.
- **Manual Control:** Type naturally and press **Enter** to translate, paste, and clear—perfect for multi-message conversations.
- **Premium UI:** Solid dark theme, draggable window, and minimalist design.
- **No-Flicker Injection:** Fast focused-pasting system using Clipboard + Ctrl+V logic.

## 🛠️ Setup

### 1. Requirements
- Node.js installed.
- An API Key from your preferred provider.

### 2. Configuration
Create a `.env` file in the root directory:
```env
# Example for OpenRouter
BASE_URL=https://openrouter.ai/api/v1
API_KEY=your_key_here
MODEL_NAME=google/gemini-2.5-flash

# Example for OpenAI
# BASE_URL=https://api.openai.com/v1
# API_KEY=your_openai_key
# MODEL_NAME=gpt-4o

# Example for Local LLM (Ollama)
# BASE_URL=http://localhost:11434/v1
# API_KEY=ollama
# MODEL_NAME=llama3
```

### 3. Installation
```bash
npm install
```

## 🎮 Usage

1. **Start the app:** `npm start`
2. **Focus your Chat:** Click on the text box of the app you want to chat in (e.g. Discord, Chrome).
3. **Summon GhostLingua:** Press `Alt + Shift + G`.
4. **Type naturally:** Write your message in Spanish.
5. **Send to Chat:** Press **Enter**. The translation will be pasted into the chat and the GhostLingua bar will clear for your next thought.
6. **Hide:** Press `Esc` or the hotkey again to hide the window.

## 🛡️ License & Commercial Use
This software is protected by a **Proprietary License**. All rights reserved to the author. Commercial use, redistribution, or modification without explicit permission is strictly prohibited. See the `LICENSE` file for more details.

---
*Created with ❤️ by Juan S. Puentes for global communication.*
