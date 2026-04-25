const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require('electron');
const path = require('path');
const { translateWithGemini } = require('./translator');
const { injectText } = require('./automation');

let mainWindow;

function createWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 600,
    height: 140,
    x: Math.floor((width - 600) / 2),
    y: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
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

// IPC Handler for sending text
ipcMain.on('send-translation', (event, text) => {
  mainWindow.hide();
  // Return focus to previous window and type
  injectText(text);
});

// Hide window
ipcMain.on('hide-window', () => {
  mainWindow.hide();
});
