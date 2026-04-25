const axios = require('axios');
require('dotenv').config();

/**
 * Translates text using OpenRouter API.
 */
async function translateWithOpenRouter(text, targetLang = 'English') {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.MODEL_NAME || 'google/gemini-2.0-flash-exp';

    if (!apiKey) {
        return `[Error]: Missing OpenRouter API Key.`;
    }

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: model,
            messages: [
                {
                    role: "system",
                    content: `You are a professional translator. Translate the text to ${targetLang}. Return ONLY the translated text.`
                },
                {
                    role: "user",
                    content: text
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com/JuanSPuentes/GhostLingua-', // Optional for OpenRouter
                'X-Title': 'GhostLingua'
            }
        });

        const translated = response.data.choices[0].message.content;
        return translated.trim();
    } catch (error) {
        console.error('Translation error:', error.response ? error.response.data : error.message);
        return `[Translation Error]`;
    }
}

// Map the old function name to the new OpenRouter implementation
module.exports = { translateWithGemini: translateWithOpenRouter };
