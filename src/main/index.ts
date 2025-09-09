import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'node:path';
import * as fs from 'node:fs';

// handlers IPC
import './ipc/universal/universalIpc';
import './ipc/image-organizer/image-organizer-ipc';

function resolvePreloadPath() {
  const candidates = [
    path.join(__dirname, '../preload/preload.cjs'),
    path.join(__dirname, '../preload/preload.js'),
    path.join(__dirname, '../preload/preload.mjs'),
    path.join(__dirname, '../preload/index.cjs'),
    path.join(__dirname, '../preload/index.js'),
    path.join(__dirname, '../preload/index.mjs'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  // Fallback to the first candidate for logging/diagnostics
  return candidates[0];
}

function createWindow() {
  const preloadPath = resolvePreloadPath();
  console.log('Preload path resolved to:', preloadPath);
  
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    Menu.setApplicationMenu(null);
  }
  
  // loads the front end built by Vite
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});