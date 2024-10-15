'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Acerca de' },
    { href: '/generate', label: 'Generar' },
  ]

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
          
              <Logo></Logo>
          </Link>
          <nav>
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
        </div>
      </div>
    </motion.header>
  )
}