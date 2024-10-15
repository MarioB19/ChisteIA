'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Laugh, Zap, Users, Mail } from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutChisteIA from "@/components/AboutChisteIA";

export default function Home() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-col items-center justify-center">
        <section className="w-full py-20 px-4 text-center">
          <motion.h1
            className="text-5xl font-bold mb-6 text-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Bienvenido a ChisteIA
          </motion.h1>

          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Descubre y comparte los mejores chistes seleccionados especialmente para ti. Inicia sesión para generar chistes personalizados.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
            >
              Iniciar Sesión
            </Button>
          </motion.div>
        </section>

        <WhyChooseUs></WhyChooseUs>

        <AboutChisteIA></AboutChisteIA>

        <motion.section
          className="w-full py-16 bg-blue-900"
          {...fadeIn}
        >
          
        </motion.section>


        
      </main>

      <Footer />
    </div>
  );
}