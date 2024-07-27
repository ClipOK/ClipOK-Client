import React, { useState, useRef } from 'react'
import axios from 'axios'
import styles from '../Styles/Login.module.scss'
import LoginArt from '../assets/login-art.svg'
import logo from '../assets/clipok-white.png'
import reviews from '../assets/reviews.png'
import { IoLogInOutline } from 'react-icons/io5'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import { showToast, wait } from '../Reusables/data.js'
import { secrets } from '../Secrets'
import Transition from '../Transition.jsx'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const divRef = useRef(null)
  const navigate = useNavigate()
  const { backendUrl } = secrets
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const login = async () => {
    const options = {
      method: 'POST',
      url: `${backendUrl}/user/login`,
      data: {
        email: loginData.email,
        password: loginData.password
      }
    }
    const toast = showToast('Logging in...', 'loading')
    axios(options)
      .then(async (res) => {
        setIsButtonDisabled(false)
        if (res.data.status === 'Success') {
          await window.electronStore.setCookie('token', res.data.token)
          await window.electronStore.setCookie('email', res.data.email)
          await window.electronStore.setCookie('planId', res.data.planId)
          if ((await window.electronStore.getCookie('email')) === res.data.email) {
            showToast('Logged in successfully', 'success', toast)
            await wait(1000)
            navigate('/home')
          }
        } else {
          showToast(res.data.message, 'error', toast)
        }
      })
      .catch((err) => {
        setIsButtonDisabled(false)
        showToast(err?.response?.data?.message || 'Something went wrong', 'error', toast)
      })
  }

  const handleLogin = () => {
    if (isButtonDisabled) return
    if (loginData.email === '' || loginData.password === '') {
      showToast('Please fill all the fields', 'error')
    } else {
      setIsButtonDisabled(true)
      login()
    }
  }
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img className={styles.logo} draggable={false} src={logo} alt="Clipok" />
        <h2>Welcome Back 👋</h2>
        <p>Please login to your account</p>
        <div className={styles.inputWrapper}>
          <p>Username / Email ID</p>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value })
            }}
            placeholder="aditya@gmail.com"
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>Password</p>
          <div className={styles.passwordWrapper} ref={divRef}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value })
              }}
              placeholder="• • • • • • • •"
            />
            {showPassword ? (
              <IoMdEye
                onClick={() => {
                  setShowPassword(false)
                }}
                className={styles.eyeIcon}
              />
            ) : (
              <IoMdEyeOff
                onClick={() => {
                  setShowPassword(true)
                }}
                className={styles.eyeIcon}
              />
            )}
          </div>
        </div>
        <div className={styles.bottomInputs}>
          <div className={styles.remMeWrapper}>
            <label className={styles.container}>
              <input
                checked={rememberMe}
                type="checkbox"
                onChange={() => {
                  setRememberMe(!rememberMe)
                }}
              />
              <svg viewBox="0 0 64 64" height="1.25rem" width="1.25rem">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  className={styles.path}
                ></path>
              </svg>
            </label>
            <p>Remember Me</p>
          </div>
          <p className={styles.forgotPassword}>Forgot Password?</p>
        </div>
        <div className={styles.submitButton} onClick={handleLogin}>
          Login to CLIPOK <IoLogInOutline />
        </div>
        <p className={styles.newAccount}>
          Don't have an account?{' '}
          <span
            onClick={() => {
              navigate('/register')
            }}
          >
            Register Here
          </span>
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.reviews}>
          <p>
            'ClipOK is the best tool for managing your clipboard history. It is a must-have tool for
            every individual or team.'
          </p>
          <img draggable={false} src={reviews} alt="" />
        </div>
        <img draggable={false} src={LoginArt} alt="" />
      </div>
    </div>
  )
}

export default Transition(Login)
