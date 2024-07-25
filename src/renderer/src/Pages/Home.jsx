import React, { useState, useEffect } from 'react'
import styles from '../Styles/Home.module.scss'
import logo from '../assets/clipok-white.png'
import { MdOutlineDashboard } from 'react-icons/md'
import { RxShare1 } from 'react-icons/rx'
import { BsClipboard2X } from 'react-icons/bs'
import { LuSmartphone } from 'react-icons/lu'
import { LuCrown } from 'react-icons/lu'
import { IoSettingsOutline } from 'react-icons/io5'
import { IoMdLogOut } from 'react-icons/io'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
// Components
import HomeMain from '../components/HomeMain'
import MyDevices from '../components/MyDevices'
import Subscription from '../components/Subscription'
import MyPlan from '../components/MyPlan'
import Loader from '../components/Loader.jsx'
import Settings from '../components/Settings.jsx'
import SharedFile from '../components/SharedFile.jsx'
import ClipBoard from '../components/Clipboard.jsx'
import Login from './Login.jsx'
import { wait } from '../Reusables/data.js'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('Dashboard')
  const [isLoginRequired, setLoginRequired] = useState(false)
  useEffect(() => {
    async function checkToken() {
      await wait(2000)
      if (await window.electronStore.getCookie('token')) {
        console.log('Token found')
        console.log(window.electronStore.getCookie('token'))
        setLoginRequired(false)
        setLoading(false)
      } else {
        setLoginRequired(true)
        setLoading(false)
      }
    }
    checkToken()
  }, [])
  const ButtonData = [
    { id: 0, name: 'Dashboard', icon: <MdOutlineDashboard /> },
    { id: 1, name: 'Shared Files', icon: <RxShare1 /> },
    { id: 2, name: 'Clipboard', icon: <BsClipboard2X /> },
    { id: 3, name: 'My Device', icon: <LuSmartphone /> },
    { id: 4, name: 'My Plan', icon: <LuCrown /> },
    { id: 5, name: 'Subscriptions', icon: <RiMoneyRupeeCircleLine /> },
    { id: 6, name: 'Settings', icon: <IoSettingsOutline /> }
  ]

  const handleNavigation = (route) => {
    setActive(route)
  }

  const renderComponent = () => {
    switch (active) {
      case 'Dashboard':
        return <HomeMain navigate={handleNavigation} />
      case 'Shared Files':
        return <SharedFile />
      case 'Clipboard':
        return <ClipBoard />
      case 'My Device':
        return <MyDevices />
      case 'Subscriptions':
        return <Subscription />
      case 'My Plan':
        return <MyPlan />
      case 'Settings':
        return <Settings />
      default:
        return <HomeMain />
    }
  }

  return (
    <>
      {isLoginRequired && (
        <Login
          redirect={() => {
            setLoginRequired(false)
          }}
        />
      )}
      <>
        {!isLoginRequired && (
          <div className={styles.main}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className={styles.sidebar}>
                  <img src={logo} alt="Logo" />
                  {ButtonData.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={
                          active === item.name
                            ? `${styles.actionButton} ${styles.active}`
                            : `${styles.actionButton}`
                        }
                        onClick={() => setActive(item.name)}
                      >
                        {item.icon}
                        <p>{item.name}</p>
                      </div>
                    )
                  })}
                  <div
                    className={styles.logoutButton}
                    onClick={() => {
                      window.electronStore.clearAllCookies()
                      setLoginRequired(true)
                    }}
                  >
                    <IoMdLogOut />
                    <p>Logout</p>
                  </div>
                </div>
                <div className={styles.rightMain}>{renderComponent()}</div>
              </>
            )}
          </div>
        )}
      </>
    </>
  )
}

export default Home
