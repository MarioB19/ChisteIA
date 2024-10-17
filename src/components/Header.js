"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut } from 'lucide-react'
import { auth, signOut } from '../config/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

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
          <nav className="hidden md:flex items-center space-x-6">
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
              {loading ? null : !user ? (
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/login">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black transition-colors duration-300"
                    >
                      Iniciar sesión
                    </Button>
                  </Link>
                </motion.li>
              ) : (
                <motion.li className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || '/placeholder.svg?height=32&width=32'} alt={user.displayName || user.email} />
                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-300 text-sm hidden lg:inline-block">{user.email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut(auth)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut size={20} />
                  </Button>
                </motion.li>
              )}
            </ul>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
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
                {loading ? null : !user ? (
                  <li>
                    <Link href="/login">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Iniciar sesión
                      </Button>
                    </Link>
                  </li>
                ) : (
                  <li className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL || '/placeholder.svg?height=32&width=32'} alt={user.displayName || user.email} />
                          <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-300 text-sm">{user.email}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          signOut(auth)
                          setIsMenuOpen(false)
                        }}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        aria-label="Cerrar sesión"
                      >
                        <LogOut size={20} />
                      </Button>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}