import { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { clipBoardState } from '../GlobalStates/states.js'

const ClipboardListener = () => {
  const [clipBoard, setClipBoard] = useRecoilState(clipBoardState)
  const resetClipBoard = useResetRecoilState(clipBoardState)

  useEffect(() => {
    const handleClipboardChange = (newText) => {
      setClipBoard((old) => [newText, ...old])
    }

    if (window.electron && window.electron.onClipboardChanged) {
      console.log('Clipboard changed')
      window.electron.onClipboardChanged(handleClipboardChange)
    } else {
      console.log(window)
      console.error('window.electron is not defined or does not have onClipboardChanged method')
    }

    if (window.electron && window.electron.onImageChanged) {
      window.electron.onImageChanged((newImage) => {
        console.log('Image changed')
        console.log(newImage)
      })
    } else {
      console.error('window.electron is not defined or does not have onImageChanged method')
    }
  }, [setClipBoard])

  return null
}

export default ClipboardListener
