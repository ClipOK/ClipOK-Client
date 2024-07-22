import React, { useState } from 'react'
import styles from '../Styles/Login.module.scss'
import logo from '../assets/clipok-white.png'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import LoginArt from '../assets/login-art.svg'
import reviews from '../assets/reviews.png'

const Login = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })

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
            placeholder="naman@gmail.com"
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>Password</p>
          <div className={styles.passwordWrapper}>
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
        <div className={styles.submitButton}>Login to CLIPOK</div>
        <p className={styles.newAccount}>
          Don't have an account? <span>Register Here</span>
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

export default Login
