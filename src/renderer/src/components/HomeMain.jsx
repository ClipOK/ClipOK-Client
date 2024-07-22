import React, { useState, useEffect } from 'react'
import styles from './Styles/HomeMain.module.scss'
import Cookies from 'js-cookie'
import { MdContentCopy } from 'react-icons/md'
import { MdCopyAll } from 'react-icons/md'
import { GoArrowRight } from 'react-icons/go'
import { showToast } from '../Reusables/data.js'
import { LuFileUp } from 'react-icons/lu'
import { PiDeviceMobileCamera } from 'react-icons/pi'
import { LuShare2 } from 'react-icons/lu'
import { MdOutlineDownloading } from 'react-icons/md'
import { RxOpenInNewWindow } from 'react-icons/rx'
import { LuFilePieChart } from 'react-icons/lu'
import socket from '../Socket/socket.js'
import { sendClips } from '../Socket/functions.js'

const HomeMain = ({ navigate }) => {
  const [recentlyCopied, setRecentlyCopied] = useState([
    {
      id: 1,
      content: 'DUMMY1'
    },
    {
      id: 2,
      content: 'DUMMY2'
    },
    {
      id: 3,
      content: 'DUMMY3'
    }
  ])
  const [recentlyShared, setRecentlyShared] = useState([
    {
      id: 1,
      fileName: 'DUMMY1',
      size: '500MB',
      isDownloaded: false
    },
    {
      id: 2,
      fileName: 'DUMMY2',
      size: '500MB',
      isDownloaded: false
    },
    {
      id: 3,
      fileName: 'DUMMY3',
      size: '500MB',
      isDownloaded: true
    }
  ])

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
    sendClips(content, 'singhaditya1226')
    showToast('Broadcasted!', 'success')
  }

  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState([])

  const emitCopy = (item) => {
    socket.emit('copied', {
      content: item
    })
  }

  return (
    <div className={styles.mainArea}>
      <div className={styles.QuarterOne}>
        <h2>Hello Aditya 👋</h2>
        <div className={styles.card}>
          <div className={styles.titleWrapper}>
            <p>Quick Access</p>
          </div>
        </div>
        <div className={styles.mainContent}>
          <div
            className={styles.card}
            onClick={() => {
              navigate('Clipboard')
            }}
          >
            <MdContentCopy />
            <p>Clipboard</p>
          </div>
          <div
            className={styles.card}
            onClick={() => {
              navigate('Shared Files')
            }}
          >
            <LuShare2 />
            <p>Shared Files</p>
          </div>
          <div
            className={styles.card}
            onClick={() => {
              navigate('My Device')
            }}
          >
            <PiDeviceMobileCamera />
            <p>My Device</p>
          </div>
        </div>
      </div>
      <div className={styles.QuarterTwo}>
        <h2>Sharing Zone</h2>
        <div
          onDragOver={(e) => {
            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            setIsDragging(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              setSelectedFile(e.dataTransfer.files[0])
            }
          }}
          onClick={(e) => {
            document.querySelector('input').click()
          }}
          className={isDragging ? `${styles.mainArea} ${styles.animate}` : `${styles.mainArea}`}
        >
          <LuFileUp />
          <p>Select any file or Drag & Drop</p>
          <p>Upto 500MB</p>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0])
              }
            }}
          />
        </div>
      </div>
      <div className={styles.QuarterThree}>
        <div className={styles.heading}>
          <h2>Recently Copied</h2>
          <div className={styles.viewAll}>
            <p>View All</p>
            <GoArrowRight />
          </div>
        </div>
        <div className={styles.cardWrapper}>
          {recentlyCopied.map((item) => {
            return (
              <div className={styles.card} key={item.id}>
                <p>{item.content}</p>
                <div
                  className={styles.copyBtn}
                  onClick={() => {
                    copyToClipboard(item.content)
                  }}
                >
                  <MdCopyAll />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.QuarterThree}>
        <div className={styles.heading}>
          <h2>Recently Shared</h2>
          <div className={styles.viewAll}>
            <p>View All</p>
            <GoArrowRight />
          </div>
        </div>
        <div className={styles.cardWrapper}>
          {recentlyShared.map((item) => {
            return (
              <div className={styles.card} key={item.id}>
                <div className={styles.fileDataWrapper}>
                  <p>{item.fileName}</p>
                  <div className={styles.size}>
                    <LuFilePieChart />
                    <p>{item.size}</p>
                  </div>
                </div>
                <div
                  className={styles.copyBtn}
                  onClick={() => {
                    copyToClipboard(item.content)
                  }}
                >
                  {item.isDownloaded ? <RxOpenInNewWindow /> : <MdOutlineDownloading />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeMain
