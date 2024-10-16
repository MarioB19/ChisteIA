'use client'

import Link from 'next/link'
import { Instagram, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/brandonmuro/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/brandon.muro.mx/', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/MarioB19', label: 'Github' },
  
    
  ]

  const quickLinks = [
    { href: '/about', label: 'Acerca de nosotros' },
    { href: '/generate', label: 'Generar chistes' },
    { href: '/privacy.pdf', label: 'Política de privacidad' },
    { href: '/terms.pdf', label: 'Términos de servicio' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <footer className="bg-black text-white border-t border-blue-500">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={itemVariants}>
            <Logo />
            <p className="text-sm text-gray-400 leading-relaxed">
              Generando risas, un chiste a la vez. Nuestra misión es hacer del mundo un lugar más divertido.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={24} />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-400">
            © {currentYear} ChisteIA. Todos los derechos reservados.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
