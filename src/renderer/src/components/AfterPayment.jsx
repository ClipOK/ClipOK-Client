import React, { useState, useEffect } from 'react'
import styles from './Styles/AfterPayment.module.scss'

const AfterPayment = () => {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your payment</p>
      </div>
      <div className={styles.content}>
        <p>
          Your payment has been successfully processed. You can now close this window and go back to
          the app.
        </p>
      </div>
    </div>
  )
}

export default AfterPayment
