'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, User, MessageSquare } from 'lucide-react'

export default function FormContact() {
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      mensaje: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        alert('Mensaje enviado con éxito')
        reset()
      } else {
        throw new Error('Error al enviar el mensaje')
      }
    } catch (error) {
      alert('Error al enviar el mensaje: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black/50 backdrop-blur-md border border-blue-500 rounded-lg p-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
        <Mail className="mr-2" />
        Manda un mensaje
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-200 mb-1">
            Nombre
          </label>
          <Controller
            name="nombre"
            control={control}
            rules={{
              required: 'El nombre es requerido',
              minLength: { value: 5, message: 'Mínimo 5 caracteres' },
              maxLength: { value: 50, message: 'Máximo 50 caracteres' }
            }}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  id="nombre"
                  placeholder="Tu nombre"
                  className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
              </div>
            )}
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Email inválido'
              }
            }}
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
              </div>
            )}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-200 mb-1">
            Mensaje
          </label>
          <Controller
            name="mensaje"
            control={control}
            rules={{
              required: 'El mensaje es requerido',
              minLength: { value: 20, message: 'Mínimo 20 caracteres' },
              maxLength: { value: 1000, message: 'Máximo 1,000 caracteres' }
            }}
            render={({ field }) => (
              <div className="relative">
                <Textarea
                  {...field}
                  id="mensaje"
                  placeholder="Tu mensaje"
                  className="pl-10 bg-black/30 border-blue-500 text-white placeholder-gray-400"
                  rows={4}
                />
                <MessageSquare className="absolute left-3 top-3 text-blue-400" size={18} />
              </div>
            )}
          />
          {errors.mensaje && <p className="mt-1 text-sm text-red-500">{errors.mensaje.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>
      </div>
    </motion.form>
  )
}