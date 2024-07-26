import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import './Styles/Transition.scss'

const Transition = (Component) => {
  return () => (
    <>
      <Component />
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1]
        }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1]
        }}
      />
    </>
  )
}

export default Transition
