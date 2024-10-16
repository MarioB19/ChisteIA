'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Smile, Zap } from 'lucide-react'

const values = [
  {
    title: 'Creatividad',
    description: 'Fomentamos la originalidad y el pensamiento innovador en cada chiste que generamos.',
    icon: Lightbulb
  },
  {
    title: 'Inclusividad',
    description: 'Creamos humor que respeta y celebra la diversidad de nuestra audiencia global.',
    icon: Users
  },
  {
    title: 'Positividad',
    description: 'Nos esforzamos por difundir alegría y buen humor a través de nuestro contenido.',
    icon: Smile
  },
  {
    title: 'Innovación',
    description: 'Utilizamos tecnología de vanguardia para revolucionar la forma en que se crean y comparten los chistes.',
    icon: Zap
  }
]

export default function ValuesSection() {
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
    <section className="py-20 bg-gradient-to-b from-blue-900 to-black">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center text-blue-400"
          variants={itemVariants}
        >
          Nuestros Valores
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div key={value.title} variants={itemVariants}>
              <Card className="bg-black/50 backdrop-blur-md border-blue-500 hover:border-blue-400 transition-colors duration-300">
                <CardContent className="p-6">
                  <value.icon className="w-12 h-12 mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}