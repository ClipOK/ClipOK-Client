import React, { useState, useEffect } from 'react'
import styles from './Styles/Subscription.module.scss'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { IoMdStarOutline } from 'react-icons/io'

const Subscription = () => {
  const [plans, setPlans] = useState([
    {
      id: 0,
      name: 'Free',
      title: 'General Usage',
      price: 0,
      features: [
        '1 Desktop Device Supported',
        '30 Items / Clipboard',
        '500MB Transfer Limit',
        'Includes Ads'
      ]
    },
    {
      id: 1,
      name: 'Basic',
      title: 'Suitable for Personal Use',
      price: 149,
      features: [
        '2 Desktop Devices Supported',
        '100 Items / Clipboard',
        '1GB Transfer Limit',
        'No Ads'
      ]
    },
    {
      id: 2,
      name: 'Premium',
      title: 'Suitable for Teams',
      price: 199,
      features: [
        '4 Desktop Devices supported',
        '200 Items / Clipboard',
        '5GB Transfer Limit',
        'No Ads'
      ]
    }
  ])
  return (
    <div className={styles.main}>
      <h2>Subscription</h2>
      <span>Prices in INR</span>
      <div className={styles.cardWrapper}>
        {plans.map((plan) => {
          return (
            <div key={plan.id} className={styles.card}>
              <h2>{plan.name}</h2>
              <p>{plan.title}</p>
              <p className={styles.price}>
                <span>₹</span>
                {plan.price}
              </p>
              {
                // If the plan is free, display a message
                plan.price === 0 ? (
                  <p className={styles.perMonth}>Free Forever</p>
                ) : (
                  <p className={styles.perMonth}>/month</p>
                )
              }
              <div className={styles.buttonPurchase}>Subscribe</div>
              <div className={styles.featuresWrapper}>
                <p>Features</p>
                {plan.features.map((feature, index) => {
                  return (
                    <div key={index} className={styles.feature}>
                      <IoIosCheckmarkCircle />
                      <p>{feature}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Subscription
