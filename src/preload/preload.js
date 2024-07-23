console.log('Preload script is running')
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  onClipboardChanged: (callback) =>
    ipcRenderer.on('clipboard-changed', (event, newText) => callback(newText)),
  onImageChanged: (callback) =>
    ipcRenderer.on('image-changed', (event, newImage) => callback(newImage))
})
