import React, { useState, useEffect } from 'react'
import styles from './Styles/Settings.module.scss'
import { IoMdArrowRoundForward } from 'react-icons/io'

const Settings = () => {
  const [user, setUser] = useState({
    name: 'UNKNOWN',
    email: ''
  })

  return (
    <div className={styles.main}>
      <h2>Settings</h2>
      <p>Tweak in changes from here</p>
      <div className={styles.infoWrapper}>
        <div className={styles.unitWrapper}>
          <p>Display Name</p>
          <input type="text" className={styles.normal} placeholder="UNKNOWN" />
        </div>
        <div className={styles.unitWrapper}>
          <p>Email</p>
          <input type="text" className={styles.disabled} disabled placeholder="lost@mail.com" />
        </div>
        <div className={styles.unitWrapper}>
          <p>Change Password</p>
          <input type="password" className={styles.normal} placeholder="********" />
        </div>
        <div className={styles.submit}>
          <p>Save</p>
          <IoMdArrowRoundForward />
        </div>
      </div>
    </div>
  )
}

export default Settings
