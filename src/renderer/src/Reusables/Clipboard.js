import { clipboard, nativeImage, Notification } from 'electron'
import { EventEmitter } from 'events'

class ClipboardWatcher extends EventEmitter {
  constructor(interval = 200, onTextChange, onImageChange) {
    super()
    this.interval = interval
    this.lastText = clipboard.readText()
    this.lastImage = clipboard.readImage()
    this.lastImageSize = this.lastImage.getSize()
    this.onTextChange = onTextChange
    this.onImageChange = onImageChange
    this.currentNotification = null
    this.startWatching()
  }

  startWatching() {
    this.intervalId = setInterval(() => {
      const currentText = clipboard.readText()
      const currentImage = clipboard.readImage()
      const currentImageSize = currentImage.getSize()

      // Check if the clipboard contains text
      if (currentText && currentText !== this.lastText) {
        this.lastText = currentText
        this.emit('text-changed', currentText)
        this.showNotification('Clipboard Text Changed', currentText)
        if (this.onTextChange) {
          this.onTextChange(currentText)
        }
      }

      // Check if the clipboard contains an image
      if (
        !currentImage.isEmpty() &&
        (currentImageSize.width !== this.lastImageSize.width ||
          currentImageSize.height !== this.lastImageSize.height)
      ) {
        this.lastImage = currentImage
        this.lastImageSize = currentImageSize
        this.emit('image-changed', currentImage)
        this.showNotification(
          'Clipboard Image Changed',
          'An image has been copied to the clipboard.'
        )
        if (this.onImageChange) {
          this.onImageChange(currentImage)
        }
      }
    }, this.interval)
  }

  showNotification(title, body) {
    if (this.currentNotification) {
      this.currentNotification.close()
    }
    this.currentNotification = new Notification({
      title: title,
      body: body,
      timeoutType: 'default' // Set the timeout type
    })
    this.currentNotification.show()
  }

  stopWatching() {
    clearInterval(this.intervalId)
  }
}

export default ClipboardWatcher
