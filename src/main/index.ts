import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'), // já buildado para dist/main/preload.js
    },
  });

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