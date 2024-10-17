'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Laugh, Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Importar Firebase
import { auth, db } from '../../config/firebase-config'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

// Importar componentes de diálogo de Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  confirmPassword: z.string().min(8, { message: "La confirmación de contraseña debe tener al menos 8 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden",
})

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [firebaseError, setFirebaseError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setFirebaseError(null)

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user


      // Guardar información adicional en Firestore con estatus 'pendiente'
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        createdAt: new Date()
      })

      // Enviar correo de verificación
      await sendEmailVerification(user)

      
      signOut(auth)

   

      // Abrir el diálogo de verificación
      setIsDialogOpen(true)

      // Redirigir al usuario después de 3 segundos
      setTimeout(() => {
        setIsDialogOpen(false)
        window.location.href = '/login'
      }, 3000)

      // Limpiar el formulario
      reset()

    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      let errorMessage = 'Ocurrió un error al registrar tu cuenta. Inténtalo de nuevo.'

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está en uso.'
          break
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido.'
          break
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil.'
          break
        default:
          errorMessage = error.message
      }

      setFirebaseError(errorMessage)
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />

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
              <h2 className="mt-6 text-3xl font-extrabold text-white">Crea una cuenta en ChisteIA</h2>
              <p className="mt-2 text-sm text-blue-200">
                O{' '}
                <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                  inicia sesión con una cuenta existente
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="sr-only">
                    Nombre
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nombre"
                      {...register("name")}
                      className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
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
                  <Label htmlFor="password" className="sr-only">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password")}
                      className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="sr-only">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirmar Contraseña"
                      {...register("confirmPassword")}
                      className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              {firebaseError && <p className="mt-2 text-sm text-red-500">{firebaseError}</p>}

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <Footer />

        {/* Diálogo de Verificación */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-white text-black border border-blue-500 rounded-md shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-blue-600 text-lg font-bold">Verifica tu correo electrónico</DialogTitle>
              <DialogDescription className="text-sm mt-2">
                Hemos enviado un correo de verificación a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para activar tu cuenta.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
