import React, { useState, useEffect } from 'react'
import Login from './Login.jsx'
import Home from './Home.jsx'

const Index = () => {
  const [component, setComponent] = useState(null)

  useEffect(() => {
    const checkToken = async () => {
      const token = await window.electronStore.getCookie('token')
      if (token) {
        setComponent(<Home />)
      } else {
        setComponent(<Login />)
      }
    }

    checkToken()
  }, [])

  return component
}

export default Index
