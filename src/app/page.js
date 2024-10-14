'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-col items-center justify-center py-20 px-4">
        <motion.h1
          className="text-5xl font-bold mb-6 text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Bienvenido a ChistesApp
        </motion.h1>

        <motion.p
          className="text-xl mb-8 text-center max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Descubre y comparte los mejores chistes seleccionados especialmente para ti. Inicia sesión para acceder al contenido exclusivo.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            Iniciar Sesión
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
