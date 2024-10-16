'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-3xl font-bold text-blue-400 mb-6">Recuperación de Contraseña</h1>
          <p className="text-lg text-blue-200 mb-6">
            La funcionalidad de recuperación de contraseña está en proceso de desarrollo.
          </p>
          <Link href="/login">
            <a className="text-blue-500 hover:text-blue-400 font-bold underline">
              Regresar a la página de inicio de sesión
            </a>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
