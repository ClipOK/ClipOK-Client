import { clipboard, nativeImage } from 'electron'
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
    this.startWatching()
  }

  startWatching() {
    this.intervalId = setInterval(() => {
      const currentText = clipboard.readText()
      const currentImage = clipboard.readImage()
      const currentImageSize = currentImage.getSize()

      if (currentText !== this.lastText) {
        this.lastText = currentText
        this.emit('text-changed', currentText)
        if (this.onTextChange) {
          this.onTextChange(currentText)
        }
      }

      if (
        !currentImage.isEmpty() &&
        (currentImageSize.width !== this.lastImageSize.width ||
          currentImageSize.height !== this.lastImageSize.height)
      ) {
        this.lastImage = currentImage
        this.lastImageSize = currentImageSize
        console.log('Image changed')
        console.log(currentImage.toDataURL())
        this.emit('image-changed', currentImage)
        if (this.onImageChange) {
          this.onImageChange(currentImage)
        }
      }
    }, this.interval)
  }

  stopWatching() {
    clearInterval(this.intervalId)
  }
}

export default ClipboardWatcher
