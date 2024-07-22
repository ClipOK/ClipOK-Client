import * as path from 'path'
import { app, BrowserWindow } from 'electron'
import ClipboardWatcher from '../renderer/src/Reusables/Clipboard.js'

let mainWindow

function createWindow() {
  let preloadScriptPath
  if (app.isPackaged) {
    preloadScriptPath = path.join(process.resourcesPath, '../preload', 'preload.js')
  } else {
    preloadScriptPath = path.join(__dirname, '../preload', 'preload.mjs')
  }

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: true, // Allow resizing
    webPreferences: {
      preload: preloadScriptPath,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: false
    },
    autoHideMenuBar: true
  })

  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL('http://localhost:5173') // Adjust this URL as needed

  const clipboardWatcher = new ClipboardWatcher(200, (newText) => {
    mainWindow.webContents.send('clipboard-changed', newText)
  })

  mainWindow.on('closed', () => {
    clipboardWatcher.stopWatching()
    mainWindow = null
  })

  // Handle will-resize event to enforce size constraints
  mainWindow.on('will-resize', (event, newBounds) => {
    if (!mainWindow.isMaximized() && (newBounds.width !== 1280 || newBounds.height !== 720)) {
      event.preventDefault()
      mainWindow.setSize(1280, 720)
    }
  })
}

app.on('ready', () => {
  createWindow()
  mainWindow.maximize()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
