const { ipcRenderer } = require('electron');

const inputField = document.getElementById('input');
const previewField = document.getElementById('preview');

let debounceTimer;

inputField.addEventListener('input', (e) => {
    const text = e.target.value;
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (text.trim() === '') {
            previewField.innerText = 'Translation preview will appear here...';
            return;
        }
        
        // Call translation logic
        translateText(text);
    }, 500);
});

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const translatedText = previewField.innerText;
        if (translatedText && translatedText !== 'Translating...' && translatedText !== 'Translation preview will appear here...') {
            ipcRenderer.send('send-translation', translatedText);
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
