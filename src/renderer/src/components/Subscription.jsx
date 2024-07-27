import React, { useState, useEffect } from 'react'
import useRazorpay from 'react-razorpay'
import styles from './Styles/Subscription.module.scss'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import axios from 'axios'
import { secrets } from '../Secrets'
import { showToast, dismissToast } from '../Reusables/data'
import AfterPayment from './AfterPayment.jsx'

const tokenState = await window.electronStore.getCookie('token')
const planId = await window.electronStore.getCookie('planId')

const Subscription = () => {
  const { keyId } = secrets
  const { backendUrl } = secrets
  const [showAfterPayment, setShowAfterPayment] = useState(false)
  const [Razorpay] = useRazorpay()

  const verifySignature = async (signature, orderId, paymentId, planId) => {
    const options = {
      method: 'POST',
      url: `${backendUrl}/payment/verify-payment/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenState}`
      },
      data: {
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        razorpaySignature: signature,
        planId: planId,
        email: await window.electronStore.getCookie('email')
      }
    }

    axios(options)
      .then((response) => {
        if (response.data.status == 'ok') {
          console.log('Payment Successful')
          showToast('Payment Successful', 'success')
        }
      })
      .catch((error) => {
        console.error(error)
        showToast('Payment Failed', 'error')
      })
  }

  const handlePayment = async ({ id, amount }, planId) => {
    console.log(id, amount)
    const options = {
      key: keyId,
      amount: Number(amount),
      currency: 'INR',
      name: 'ClipOK',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: id,
      handler: function (response) {
        verifySignature(
          response.razorpay_signature,
          response.razorpay_order_id,
          response.razorpay_payment_id,
          planId
        )
      },
      prefill: {
        name: 'Piyush Garg',
        email: 'youremail@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#ffc418'
      }
    }

    const rzp1 = new Razorpay(options)

    rzp1.on('payment.failed', function (response) {
      console.log('Payment Failed')
      console.log(response)
      showToast('Payment Failed', 'error', 1)
    })

    rzp1.open()
    showToast('Proceed with Razorpay', 'success', 1)
  }

  const createOrder = async ({ amount, planId }) => {
    const email = await window.electronStore.getCookie('email')
    console.log(tokenState)
    if (!email) return
    showToast('Creating Payment', 'loading', 1)
    const options = {
      method: 'POST',
      url: `${backendUrl}/payment/create-payment/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenState}`
      },
      data: {
        amount,
        email,
        planId
      }
    }
    axios(options)
      .then((response) => {
        console.log(response.data)
        const { data } = response.data
        handlePayment(data, planId)
      })
      .catch((error) => {
        console.error(error)
        window.alert(error)
        showToast('Some Error Occured', 'error', 1)
      })
  }

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

  useEffect(() => {
    console.log(planId)
  }, [])

  return (
    <div className={styles.main}>
      {showAfterPayment && <AfterPayment />}
      {!showAfterPayment && (
        <>
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
                  {plan.price === 0 ? (
                    <p className={styles.perMonth}>Free Forever</p>
                  ) : (
                    <p className={styles.perMonth}>/month</p>
                  )}
                  {planId == plan.id ? (
                    <div
                      className={styles.buttonPurchase}
                      onClick={() => {
                        createOrder({
                          planId: plan.id,
                          amount: plan.price
                        })
                      }}
                    >
                      Active Plan
                    </div>
                  ) : (
                    <div
                      className={styles.buttonPurchase}
                      onClick={() => {
                        createOrder({
                          planId: plan.id,
                          amount: plan.price
                        })
                      }}
                    >
                      Subscribe
                    </div>
                  )}

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
        </>
      )}
    </div>
  )
}

export default Subscription
