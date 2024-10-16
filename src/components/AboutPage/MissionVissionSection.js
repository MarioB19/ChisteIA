'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Eye } from 'lucide-react'

export default function MissionVisionSection() {
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
    <section className="py-20 bg-gradient-to-b from-black to-blue-900">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="bg-black/50 backdrop-blur-md border-blue-500 hover:border-blue-400 transition-colors duration-300 h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <Rocket className="w-8 h-8 text-blue-400 mr-3" />
                  <h2 className="text-3xl font-bold text-blue-400">Nuestra Misión</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed flex-grow">
                  Nuestra misión es llevar alegría y risas a las personas de todo el mundo a través de chistes ingeniosos y divertidos. Creemos en el poder del humor para conectar a las personas y hacer del mundo un lugar más feliz.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="bg-black/50 backdrop-blur-md border-blue-500 hover:border-blue-400 transition-colors duration-300 h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-blue-400 mr-3" />
                  <h2 className="text-3xl font-bold text-blue-400">Nuestra Visión</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed flex-grow">
                  Aspiramos a ser la plataforma líder mundial en generación de chistes, creando una comunidad global de amantes del humor y fomentando conexiones a través de la risa compartida.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}