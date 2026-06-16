/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

const PageTransition = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
)

export const ScaleIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
)

export const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => {
  const dirMap = {
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
  }
  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export default PageTransition
