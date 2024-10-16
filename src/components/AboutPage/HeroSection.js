'use client'

import { motion } from 'framer-motion'
import { Laugh } from 'lucide-react'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section className="bg-gradient-to-b from-blue-900 to-black py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500 opacity-10">
        <div className="absolute inset-0 opacity-50 mix-blend-soft-light"></div>
      </div>
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <Laugh className="w-24 h-24 text-blue-400" />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-center mb-6 text-white"
          variants={itemVariants}
        >
          Acerca de <span className="text-blue-400">ChisteIA</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-center text-blue-200 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Generando risas, un chiste a la vez.
        </motion.p>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}