'use client'

import { motion } from 'framer-motion'
import FormContact from './FormContact'

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <motion.section
      className="w-full py-16 bg-gradient-to-b from-blue-900 to-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-blue-400"
          variants={itemVariants}
        >
          Contáctanos
        </motion.h2>
        <motion.div variants={itemVariants}>
          <FormContact />
        </motion.div>
      </div>
    </motion.section>
  )
}