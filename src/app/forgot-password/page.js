'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Laugh, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '../../config/firebase-config' 

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
})

export default function RecoverPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Check if the email exists in the 'users' collection
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where("email", "==", data.email))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        // Email doesn't exist in the collection
        setErrorDialogOpen(true)
      } else {
        // Email exists, proceed with password reset
        await sendPasswordResetEmail(auth, data.email)
        setResetSent(true)
      }
    } catch (error) {
      console.error('Error during password reset process:', error)
      alert('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-black/50 backdrop-blur-md p-8 rounded-xl border border-blue-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Laugh className="w-16 h-16 text-blue-400" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Recupera tu contraseña</h2>
          <p className="mt-2 text-sm text-blue-200">
            Ingresa tu correo electrónico para recibir un enlace de recuperación
          </p>
        </div>
        {!resetSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email" className="sr-only">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo Electrónico"
                  {...register("email")}
                  className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </Button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <p className="mb-4">Se ha enviado un enlace de recuperación a tu correo electrónico.</p>
            <p>Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.</p>
          </motion.div>
        )}
        <div className="text-center">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 flex items-center justify-center">
            <ArrowLeft size={16} className="mr-2" />
            Volver al inicio de sesión
          </Link>
        </div>
      </motion.div>

      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent className="bg-gray-900 border border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-white">Correo no encontrado</DialogTitle>
            <DialogDescription className="text-gray-300">
              No se encontró una cuenta asociada a este correo electrónico. Por favor, verifica que hayas ingresado el correo correcto o crea una nueva cuenta.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setErrorDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}