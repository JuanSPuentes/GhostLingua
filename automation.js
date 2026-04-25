const { exec } = require('child_process');

/**
 * Injects text into the currently focused window using PowerShell SendKeys.
 * This avoids native dependency issues on Windows.
 * @param {string} text - The translated text to type.
 */
async function injectText(text) {
    // Escape single quotes for PowerShell
    const escapedText = text.replace(/'/g, "''");
    
    // PowerShell command to send keys
    // We add a small delay to ensure the target window has focus
    const command = `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; Start-Sleep -Milliseconds 200; [System.Windows.Forms.SendKeys]::SendWait('${escapedText}')"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Automation error: ${error}`);
                reject(error);
                return;
            }
            resolve();
        });
    });
}

module.exports = { injectText };
