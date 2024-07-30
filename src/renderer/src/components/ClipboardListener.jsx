import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { clipsState } from '../GlobalStates/states.js'

const ClipboardListener = () => {
  const [combinedClipsState, setCombinedClips] = useRecoilState(clipsState)

  useEffect(() => {
    const handleClipChange = (data) => {
      setCombinedClips((old) => [data, ...old])
    }

    window.electron.onClipboardChanged(handleClipChange)
    window.electron.onImageChanged(handleClipChange)
  }, [setCombinedClips])

  return null
}

export default ClipboardListener
