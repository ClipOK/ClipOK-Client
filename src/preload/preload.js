console.log('Preload script is running')
import { contextBridge, ipcRenderer } from 'electron'

ipcRenderer.setMaxListeners(20)
contextBridge.exposeInMainWorld('electron', {
  onClipboardChanged: (callback) =>
    ipcRenderer.on('clipboard-changed', (event, newText) => callback(newText)),
  onImageChanged: (callback) =>
    ipcRenderer.on('image-changed', (event, newImage) => callback(newImage))
})

contextBridge.exposeInMainWorld('electronStore', {
  getCookie: (name) => ipcRenderer.invoke('getCookie', name),
  setCookie: (name, value) => ipcRenderer.invoke('setCookie', { name, value }),
  deleteCookie: (name) => ipcRenderer.invoke('deleteCookie', name),
  clearAllCookies: () => ipcRenderer.invoke('clearAllCookies')
})
