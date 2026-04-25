const { exec } = require('child_process');
const { clipboard } = require('electron');

/**
 * Injects text into the currently focused window using Clipboard + Ctrl+V.
 * Now takes a windowId to FORCE focus back before pasting.
 * @param {string} text - The translated text to paste.
 * @param {string} windowId - The process ID of the target window.
 */
async function injectText(text, windowId) {
    // 1. Copy text to system clipboard
    clipboard.writeText(text);
    
    // 2. Use PowerShell to Focus the window and trigger Ctrl+V
    // We use AppActivate with the Process ID to ensure we are in the right spot
    let command = '';
    if (windowId) {
        command = `powershell -Command "Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::AppActivate(${windowId}); Start-Sleep -Milliseconds 100; Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('^v{ENTER}')"`;
    } else {
        command = `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; Start-Sleep -Milliseconds 150; [System.Windows.Forms.SendKeys]::SendWait('^v{ENTER}')"`;
    }

    return new Promise((resolve, reject) => {
        exec(command, (error) => {
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
