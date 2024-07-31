import React, { useEffect, useState } from 'react'
import styles from './Styles/Clipboard.module.scss'
import empty from '../assets/empty.svg'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { clipsState } from '../GlobalStates/states.js' // Added the clipBoardState atom
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineContentCopy } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'
import { copyImageToClipboard } from '../Reusables/data.js' // Added the copyImageToClipboard function

const ClipBoard = () => {
  const [combinedClipsState, setCombinedClips] = useRecoilState(clipsState)
  const resetClipBoard = useResetRecoilState(clipsState)

  const isImageDataUrl = (dataUrl) => {
    return dataUrl.startsWith('data:image/') && dataUrl.length > 'data:image/'.length
  }

  return (
    <div className={styles.main}>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>
          <h2>Clipboard Items</h2>
          <p>All your copied clips will appear here</p>
        </div>
        <div className={styles.buttons}>
          <RiDeleteBin6Line data-tooltip-id="delete" onClick={resetClipBoard} />
          <Tooltip
            id="delete"
            content={'Delete All Clips'}
            style={{
              backgroundColor: 'red',
              color: 'white',
              fontSize: '.85rem',
              fontWeight: '500'
            }}
          />
        </div>
      </div>
      {combinedClipsState.length === 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="" />
          <p>No clips copied yet</p>
        </div>
      ) : (
        <div className={styles.itemWrapper}>
          {combinedClipsState.map((item, index) => (
            <div key={index} className={styles.clipItem}>
              {isImageDataUrl(item) ? <img src={item} alt="<Image Data>" /> : <p>{item}</p>}
              <div className={styles.btn}>
                <div className={styles.copy}>
                  <MdOutlineContentCopy
                    onClick={() => {
                      if (isImageDataUrl(item)) {
                        const image = new Image()
                        image.src = item
                        copyImageToClipboard(image)
                      } else {
                        navigator.clipboard.writeText(item)
                      }
                    }}
                  >
                    Copy
                  </MdOutlineContentCopy>
                </div>
                <div
                  className={styles.delete}
                  onClick={() => {
                    setCombinedClips(combinedClipsState.filter((_, i) => i !== index))
                  }}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div> // Display each clipboard item
          ))}
        </div>
      )}
    </div>
  )
}

export default ClipBoard
