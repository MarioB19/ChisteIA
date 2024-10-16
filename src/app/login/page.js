'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Laugh, Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Here you would typically handle the login logic
    console.log(data)
    setIsLoading(false)
  }

  return (
    <>
       <Header></Header>
   
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
          <h2 className="mt-6 text-3xl font-extrabold text-white">Inicia sesión en ChisteIA</h2>
          <p className="mt-2 text-sm text-blue-200">
            O{' '}
            <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
              crea una cuenta nueva
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>

    <Footer></Footer>
    </>
  )
}