import React from 'react'
import styles from './Styles/Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader
