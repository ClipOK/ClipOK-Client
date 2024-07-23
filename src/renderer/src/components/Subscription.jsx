import React, { useState, useEffect } from 'react'
import useRazorpay from 'react-razorpay'
import styles from './Styles/Subscription.module.scss'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { IoMdStarOutline } from 'react-icons/io'
import axios from 'axios'
import { secrets } from '../Secrets'
import { showToast } from '../Reusables/data'
import AfterPayment from './AfterPayment.jsx'

const Subscription = () => {
  const { keyId } = secrets
  const [showAfterPayment, setShowAfterPayment] = useState(true)
  const [Razorpay] = useRazorpay()

  const verifySignature = async (signature, orderId, paymentId) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/payment/verify-payment/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `
      },
      data: {
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        razorpaySignature: signature
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

  const handlePayment = async ({ id, amount }) => {
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
          response.razorpay_payment_id
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
        color: '#3399cc'
      }
    }

    const rzp1 = new Razorpay(options)

    rzp1.on('payment.failed', function (response) {
      console.log('Payment Failed')
      showToast('Payment Failed', 'error')
    })

    rzp1.open()
  }

  const createOrder = async ({ amount, planId, email = 'mail@mail.com' }) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/payment/create-payment/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `
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
        handlePayment(data)
      })
      .catch((error) => {
        console.error(error)
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
                  {
                    // If the plan is free, display a message
                    plan.price === 0 ? (
                      <p className={styles.perMonth}>Free Forever</p>
                    ) : (
                      <p className={styles.perMonth}>/month</p>
                    )
                  }
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
