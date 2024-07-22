import React, { useState, useEffect } from 'react'
import styles from './Styles/SharedFile.module.scss'
import empty from '../assets/empty.svg'
import { IoMdRefresh } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'

const SharedFile = () => {
  const [files, setFiles] = useState([])

  return (
    <div className={styles.main}>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>
          <h2>Shared Files</h2>
          <p>All your shared files will appear here</p>
        </div>
        <div className={styles.buttons}>
          <IoMdRefresh />
          <RiDeleteBin6Line />
        </div>
      </div>
      {files.length == 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="" />
          <p>No files shared yet</p>
        </div>
      ) : (
        <div className={styles.itemWrapper}></div>
      )}
    </div>
  )
}

export default SharedFile
