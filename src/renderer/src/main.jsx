import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Pages/Index.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Home from './Pages/Home.jsx'
import './Styles/globals.scss'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'
import { initConnection } from './Socket/functions.js'
import { AnimatePresence } from 'framer-motion'

const AppChild = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => {
  useEffect(() => {
    initConnection()
  }, [])
  useEffect(() => {
    // Function to prevent drag start
    const preventDragStart = (e) => e.preventDefault()

    const addListenersToImages = () => {
      const images = document.querySelectorAll('img')
      images.forEach((image) => {
        image.addEventListener('dragstart', preventDragStart)
      })
    }

    addListenersToImages()

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          addListenersToImages()
        }
      })
    })

    const config = { childList: true, subtree: true }
    observer.observe(document.body, config)

    return () => {
      observer.disconnect()
      const images = document.querySelectorAll('img')
      images.forEach((image) => {
        image.removeEventListener('dragstart', preventDragStart)
      })
    }
  }, [])

  return (
    <RecoilRoot>
      <Toaster position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/*" element={<AppChild />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
