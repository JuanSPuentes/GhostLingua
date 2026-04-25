const { ipcRenderer } = require('electron');

const inputField = document.getElementById('input');
const previewField = document.getElementById('preview');

let debounceTimer;

inputField.addEventListener('input', async (e) => {
    const text = e.target.value;
    
    // 1. Translation PREVIEW (Fast update in the bar)
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        if (text.trim() === '') {
            previewField.innerText = 'Translation preview will appear here...';
            return;
        }
        await translateText(text);
    }, 300);
});

// Helper to find the difference between two translation versions
function calculateDelta(oldFull, newFull) {
    if (!oldFull) return newFull;
    if (newFull.startsWith(oldFull)) {
        return newFull.substring(oldFull.length);
    }
    // Fallback: just return the new trailing words
    const oldWords = oldFull.split(' ');
    const newWords = newFull.split(' ');
    return newWords.slice(oldWords.length).join(' ');
}

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const translatedText = previewField.innerText;
        if (translatedText && translatedText !== 'Translating...' && translatedText !== 'Translation preview will appear here...') {
            // Send the final translation
            ipcRenderer.send('send-translation', translatedText);
            
            // Clear the bar for the next message
            inputField.value = '';
            previewField.innerText = 'Translation preview will appear here...';
        }
    }
    if (e.key === 'Escape') {
        ipcRenderer.send('hide-window');
    }
});

async function translateText(text) {
    previewField.innerText = 'Translating...';
    
    try {
        const translated = await ipcRenderer.invoke('translate-text', text);
        previewField.innerText = translated;
    } catch (error) {
        previewField.innerText = 'Error in translation';
    }
}
