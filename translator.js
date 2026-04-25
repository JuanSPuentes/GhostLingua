const axios = require('axios');
require('dotenv').config();

/**
 * Universal Translation Function (OpenAI-Compatible)
 * Works with: OpenAI, OpenRouter, Groq, Mistral, Local LLMs (Ollama/LMStudio), etc.
 */
async function translateUniversal(text, targetLang = 'English') {
    const apiKey = process.env.API_KEY;
    const baseUrl = process.env.BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.MODEL_NAME || 'gpt-3.5-turbo';

    if (!apiKey) {
        return `[Error]: Missing API Key. Check your .env file.`;
    }

    try {
        // Build the full endpoint carefully
        const endpoint = `${baseUrl.replace(/\/$/, '')}/chat/completions`;

        const response = await axios.post(endpoint, {
            model: model,
            messages: [
                {
                    role: "system",
                    content: `You are a professional translator. Translate the following text into ${targetLang}. Return ONLY the translation, without quotes or additional comments.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0.3
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const translated = response.data.choices[0].message.content;
        return translated.trim();
    } catch (error) {
        console.error('Translation error:', error.response ? error.response.data : error.message);
        return `[Service Error]`;
    }
}

// Export with the expected name for main.js compatibility
module.exports = { translateWithGemini: translateUniversal };
