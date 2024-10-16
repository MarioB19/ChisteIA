// components/Header.js

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"; // Asegúrate de que este componente exista
import { motion, AnimatePresence } from "framer-motion";
import Logo from './Logo'; // Asegúrate de que este componente exista
import { Menu, X, LogOut } from 'lucide-react'; // Asegúrate de tener lucide-react instalado
import { auth, signOut } from '../config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Usuario autenticado
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Suscribirse a los cambios de estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Acerca de' },
    { href: '/generate', label: 'Generar' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
                  <span className="text-gray-300 text-sm">{user.email}</span>
                  <button
                    onClick={() => signOut(auth)}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut size={16} />
                  </button>
                </motion.li>
              )}
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
                  <li className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{user.email}</span>
                    <button
                      onClick={() => {
                        signOut(auth);
                        setIsMenuOpen(false);
                      }}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                      aria-label="Cerrar sesión"
                    >
                      <LogOut size={16} />
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
