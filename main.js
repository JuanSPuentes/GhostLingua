const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require('electron');
const path = require('path');
const { execSync } = require('child_process');
const { translateWithGemini } = require('./translator');
const { injectText } = require('./automation');

let mainWindow;
let lastActiveWindowId = '';

function createWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 600,
    height: 140,
    x: Math.floor((width - 600) / 2),
    y: 100,
    frame: false,
    transparent: false, // Now opaque
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    backgroundColor: '#1a1a1e', // Solid background
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Register global hotkey
  globalShortcut.register('Alt+Shift+G', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      // CAPTURE the current active window ID before showing GhostLingua
      try {
        const psCommand = "$d = '[DllImport(\\\"user32.dll\\\")] public static extern IntPtr GetForegroundWindow();'; $t = Add-Type -MemberDefinition $d -Name W32 -Namespace Win -PassThru; $h = [Win.W32]::GetForegroundWindow(); (Get-Process | Where-Object {$_.MainWindowHandle -eq $h}).Id";
        
        lastActiveWindowId = execSync(`powershell -Command "${psCommand}"`).toString().trim();
        console.log('Target Window Process ID captured:', lastActiveWindowId);
      } catch (e) {
        console.error('Failed to capture active window:', e);
      }
      
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC Handler for translation preview
ipcMain.handle('translate-text', async (event, text) => {
  return await translateWithGemini(text);
});

// IPC Handler for sending text chunks (Live mode)
ipcMain.on('send-translation-chunk', async (event, text) => {
  // NO HIDE anymore. We just inject directly to the target window.
  // The target window will capture focus for a split second, but GhostLingua remains on top.
  await injectText(text, lastActiveWindowId);
  
  // Refocus GhostLingua immediately so the user can continue typing
  mainWindow.focus();
});

// IPC Handler for final send (Enter)
ipcMain.on('send-translation', async (event, text) => {
  mainWindow.hide();
  await new Promise(r => setTimeout(r, 60)); 
  await injectText(text, lastActiveWindowId);
  
  // Re-show and refocus so the user can type the next sentence immediately
  mainWindow.show();
  mainWindow.focus();
});

// Hide window
ipcMain.on('hide-window', () => {
  mainWindow.hide();
});
