import React, { useState, useRef, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'

import styles from './Styles/MyDevices.module.scss'
import empty from '../assets/empty.svg'
import iphone from '../assets/iphone.png'
import android from '../assets/android.png'
import { VscDebugDisconnect } from 'react-icons/vsc'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { FiBatteryCharging } from 'react-icons/fi'
import { MdOutlinePersonPinCircle } from 'react-icons/md'
import { PiPlugsConnected } from 'react-icons/pi'
import { MdMyLocation } from 'react-icons/md'
import { FiSmartphone } from 'react-icons/fi'
import { HiLocationMarker } from 'react-icons/hi'
import { MdArrowOutward } from 'react-icons/md'
import 'leaflet/dist/leaflet.css'
import Transition from '../Transition'

const MyDevices = () => {
  const [isDeviceEmpty, setIsDeviceEmpty] = useState(false)
  const MapView = useRef(null)
  const [device, setDevice] = useState({
    OS: 'android',
    name: 'iPhone 12 Pro Max',
    model: 'A2341',
    battery: '100%',
    lastActive: 'Just now',
    connected: true,
    lastLocation: 'Home'
  })
  const [devices, setDevices] = useState([])
  const [position, setPosition] = useState([51.505, -0.09])
  const [lat, long] = position
  const RenderMap = () => {
    const map = L.map(MapView.current).setView(position, 20)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'ClipOK'
    }).addTo(map)

    const smartphoneIconHtml = ReactDOMServer.renderToString(
      <HiLocationMarker style={{ fontSize: '50px', color: 'red' }} />
    )

    // Create a custom icon using the HTML string
    const smartphoneIcon = L.divIcon({
      html: smartphoneIconHtml,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    })

    L.marker(position, { icon: smartphoneIcon }).addTo(map).bindPopup('Realme GT 6T').openPopup()
  }

  const getGoogleMapsUrl = () => {
    window.open(`https://www.google.com/maps?q=${lat},${long}`)
  }

  useEffect(() => {
    RenderMap()
  }, [])

  return (
    <div className={styles.main}>
      <h2>My Device</h2>
      <p>Below device is connected with your account</p>
      {isDeviceEmpty ? (
        <div className={styles.emptyDevice}>
          <img src={empty} alt="empty" />
          <p>
            No device connected <br />
            Connect a device to start sharing
          </p>
        </div>
      ) : (
        <div className={styles.device}>
          <div className={styles.phoneModel}>
            {device.OS === 'iOS' ? (
              <img src={iphone} alt="Iphone" />
            ) : (
              <img src={android} alt="Android" />
            )}
          </div>
          <div className={styles.map}>
            <div className={styles.mapContainer} ref={MapView}></div>
          </div>
          <div className={styles.phoneInfo}>
            <div className={styles.Item}>
              <FiSmartphone />
              <p>Name:</p>
              <p>{device.name}</p>
            </div>
            <div className={styles.Item}>
              <IoInformationCircleOutline />
              <p>Model:</p>
              <p>{device.model}</p>
            </div>
            <div className={styles.Item}>
              <FiBatteryCharging />
              <p>Battery:</p>
              <p>{device.battery}</p>
            </div>
            <div className={styles.Item}>
              <MdOutlinePersonPinCircle />
              <p>Last Active:</p>
              <p>{device.lastActive}</p>
            </div>
            <div className={styles.Item}>
              <PiPlugsConnected />
              <p>Connected:</p>
              <p>{device.connected ? 'Yes' : 'No'}</p>
            </div>
            <div className={styles.Item}>
              <MdMyLocation />
              <p>Last Location:</p>
              <p onClick={getGoogleMapsUrl}>
                View in Map <MdArrowOutward />
              </p>
            </div>
            <div className={styles.disconnectBtn}>
              <VscDebugDisconnect />
              <p>Disconnect</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyDevices
