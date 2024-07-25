import React from 'react'
import styles from './Styles/Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader}></div>
      <p>Initializing</p>
    </div>
  )
}

export default Loader
