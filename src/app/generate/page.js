'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JokeGenerator from "@/components/JokeGenerator";
import { auth } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { Laugh, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ChistePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Laugh className="animate-bounce text-blue-400" size={48} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex flex-col">
      <Header />
    
        {isAuthenticated ? (
          <JokeGenerator />
        ) : (
          <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center max-w-md w-full bg-black/50 backdrop-blur-md p-8 rounded-xl border border-blue-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Laugh className="mx-auto text-blue-400 mb-6" size={64} />
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              ¡Únete a la diversión!
            </h2>
            <p className="text-blue-200 mb-6">
              Inicia sesión o regístrate para acceder a nuestro increíble generador de chistes y comenzar a reír.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-900">
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Crear Cuenta
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        )}
 
      <Footer />
    </div>
  );
}