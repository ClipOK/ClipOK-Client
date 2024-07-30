import { ipcRenderer, contextBridge } from 'electron'
console.log('Preload script is running')
ipcRenderer.setMaxListeners(20)

contextBridge.exposeInMainWorld('electron', {
  onClipboardChanged: (callback) => {
    console.log('Setting up clipboard changed listener')
    ipcRenderer.on('text-changed', (event, newText) => {
      callback(newText)
    })
  },
  onImageChanged: (callback) => {
    console.log('Setting up image changed listener')
    ipcRenderer.on('image-changed', (event, newImage) => {
      callback(newImage)
    })
  }
})

contextBridge.exposeInMainWorld('electronStore', {
  getCookie: (name) => ipcRenderer.invoke('getCookie', name),
  setCookie: (name, value) => ipcRenderer.invoke('setCookie', { name, value }),
  deleteCookie: (name) => ipcRenderer.invoke('deleteCookie', name),
  clearAllCookies: () => ipcRenderer.invoke('clearAllCookies')
})
