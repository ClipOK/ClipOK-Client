import React, { useState, useEffect, useRef } from 'react'
import styles from './Styles/AfterPayment.module.scss'
import Lottie from 'lottie-react'
import success from '../assets/success.json'
import failed from '../assets/failed.json'

const AfterPayment = () => {
  const lottieRef = useRef()
  useEffect(() => {
    lottieRef.current.play()
  }, [])
  return (
    <div className={styles.main}>
      <div className={styles.animation}>
        <Lottie
          lottieRef={lottieRef}
          className={styles.animationPlayer}
          animationData={success}
          autoPlay={false}
          loop={false}
        />
      </div>
      <div className={styles.heading}>
        <h2>Woohoo! Payment Successful</h2>
        <p>Thank you for your purchase!</p>
        <p>An invoice for this payment has been sent to your registered mail</p>
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.button}>Ask for Support</div>
        <div className={styles.button}>Go to Dashboard</div>
      </div>
    </div>
  )
}

export default AfterPayment
