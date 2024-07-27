import React, { useState, useEffect } from 'react'
import styles from './Styles/MyPlan.module.scss'
import empty from '../assets/empty.svg'
import { BiCheckCircle } from 'react-icons/bi'
import { IoHourglassOutline } from 'react-icons/io5'
import { MdOutlinePayments } from 'react-icons/md'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userPlan } from '../GlobalStates/states.js'
import { secrets } from '../Secrets.js'
import { epochToDateLocale } from '../Reusables/data.js'

const email = await window.electronStore.getCookie('email')
const tokenState = await window.electronStore.getCookie('token')

const MyPlan = ({ navigate }) => {
  const { backendUrl } = secrets
  const [plan, setPlan] = useRecoilState(userPlan)
  const [isPlanEmpty, setIsPlanEmpty] = useState(false)
  const [activePlan, setActivePlan] = useState({
    planId: 0,
    name: 'Free',
    title: 'General Usage',
    expiry: '29th April, 2024',
    price: 0
  })

  const getPlanDetails = async () => {
    const options = {
      method: 'GET',
      url: `${backendUrl}/user/plan-details/?email=${email}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenState}`
      }
    }

    axios(options)
      .then((response) => {
        if (response.data.status === 'ok') {
          setIsPlanEmpty(false)
          setActivePlan(response.data.plan)
          setPlan(response.data.plan)
        } else {
          setIsPlanEmpty(true)
        }
      })
      .catch((error) => {
        console.error(error)
        setIsPlanEmpty(true)
      })
  }

  const [plans, setPlans] = useState([
    {
      id: 0,
      name: 'Free',
      title: 'General Usage',
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
      features: [
        '4 Desktop Devices supported',
        '200 Items / Clipboard',
        '5GB Transfer Limit',
        'No Ads'
      ]
    }
  ])

  useEffect(() => {
    if (Object.keys(plan).length === 0) {
      getPlanDetails()
    } else {
      setActivePlan(plan)
    }
  }, [])

  return (
    <div className={styles.main}>
      <h2>My Plan</h2>
      <p>Active plan will be displayed here</p>
      {isPlanEmpty ? (
        <div className={styles.emptyPlan}>
          <img src={empty} alt="" />
          <p>No active plan</p>
        </div>
      ) : (
        <div className={styles.planWrapper}>
          <div className={styles.card}>
            <div className={styles.upperHeading}>
              <div className={styles.heading}>
                <h2>{activePlan.name}</h2>
                <p>{plans[activePlan.planId].title}</p>
              </div>
              <div className={styles.planIndicator}>
                <p>Active</p>
                <span></span>
              </div>
            </div>
            <div className={styles.infoWrapper}>
              <div className={styles.priceWrapper}>
                <h2>₹{activePlan.price}</h2>
                <p>/ month</p>
              </div>
              <div className={styles.featureWrapper}>
                <h3>Enabled Features:</h3>
                {plans[activePlan.planId].features.map((feature, index) => (
                  <div className={styles.feature} key={index}>
                    <BiCheckCircle />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <div className={styles.btnWrapper}>
                <div className={styles.expiryBtn}>
                  <IoHourglassOutline />
                  {activePlan.planId === 0 ? (
                    <p>This plan is Free Forever</p>
                  ) : (
                    <p>Expiry on {epochToDateLocale(activePlan.expiry, 'ms')}</p>
                  )}
                </div>
                <div
                  className={styles.upgradePlan}
                  onClick={() => {
                    navigate('Subscriptions')
                  }}
                >
                  <MdOutlinePayments />
                  <p>Upgrade Plan</p>
                </div>
              </div>
              <div className={styles.getHelp}>
                <p>Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPlan
