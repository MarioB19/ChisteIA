'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { Instagram } from '@mui/icons-material'

export default function FounderSection() {
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
    <section className="py-20 bg-gradient-to-b from-black to-blue-900">
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
          Nuestro Fundador
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <motion.div 
            className="w-64 h-64 relative rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/50"
            variants={itemVariants}
          >
            <Image
              src="/founder.jpg"
              alt="Brandon Muro - Fundador de ChisteIA"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div 
            className="flex-1 max-w-2xl"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-semibold mb-2 text-blue-300">Brandon Muro</h3>
            <p className="text-xl mb-4 text-gray-400">Fundador y CEO</p>
            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed"
              variants={itemVariants}
            >
             Brandon Muro es un apasionado de la tecnología y el aprendizaje, quien ve en sus proyectos una oportunidad para divertirse y seguir creciendo. Como ex olímpico y entrenador de olimpiadas de matemáticas, es fundador y desarrollador de software en VoluntRED (voluntred.com), una plataforma que conecta a voluntarios con ONGs. Además, es desarrollador de software en Daskalos (proyectodaskalos.com), una aplicación educativa enfocada en tutorías personalizadas de matemáticas.
            </motion.p>
            <motion.p 
              className="text-gray-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Actualmente, está trabajando en ChisteIA, un proyecto donde combina su pasión por la inteligencia artificial y el humor para aprender más sobre IA mientras se divierte en el proceso.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
           
              <motion.a
                href="https://www.linkedin.com/in/brandonmuro/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/brandon.muro.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>

              <motion.a
                href="https://github.com/MarioB19"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </motion.a>

            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
