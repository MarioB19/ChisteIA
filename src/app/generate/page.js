'use client'; // Asegura que este componente se ejecute en el cliente

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JokeGenerator from "@/components/JokeGenerator";
import { auth } from "@/config/firebase-config"; // Asegúrate de importar Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function ChistePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Cuando termina la verificación, dejar de cargar
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        {isAuthenticated ? (
          // Mostrar el componente de generador de chistes si está autenticado
          <JokeGenerator />
        ) : (
          // Mostrar el mensaje si no está autenticado
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              ¡Debes iniciar sesión para disfrutar de nuestros chistes!
            </h2>
            <p className="text-blue-200 mb-4">
              Inicia sesión o regístrate para acceder al generador de chistes.
            </p>
            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-bold underline">
              Iniciar Sesión
            </Link>
            <span className="mx-2">o</span>
            <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-bold underline">
              Crear Cuenta
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
