'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Logo from './Logo'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Acerca de' },
    { href: '/generate', label: 'Generar' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header 
      className="w-full bg-black border-b border-blue-500"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="group">
            <Logo />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <motion.li key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                      pathname === item.href 
                        ? 'text-blue-400 border-b-2 border-blue-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black transition-colors duration-300"
                >
                  Iniciar sesión
                </Button>
              </motion.li>
            </ul>
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                        pathname === item.href 
                          ? 'text-blue-400' 
                          : 'text-gray-300'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black transition-colors duration-300"
                  >
                    Iniciar sesión
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}