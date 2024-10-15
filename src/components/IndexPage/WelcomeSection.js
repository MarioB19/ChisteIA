'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Laugh, ArrowRight, Sparkles } from 'lucide-react'

export default function WelcomeSection() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

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
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-blue-900 py-20 px-4">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 inline-block"
          variants={itemVariants}
          whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
        >
          <Laugh className="w-24 h-24 text-blue-400" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 text-white"
          variants={itemVariants}
        >
          Bienvenido a <span className="text-blue-400">ChisteIA</span>
        </motion.h1>

        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto text-gray-300"
          variants={itemVariants}
        >
          Descubre y comparte los mejores chistes seleccionados especialmente para ti. 
          Inicia sesión para generar chistes personalizados y desbloquear un mundo de risas.
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Iniciar Sesión</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 text-gray-400"
          variants={itemVariants}
        >
          <p className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>Obtén 20 chistes diarios al iniciar sesión</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}