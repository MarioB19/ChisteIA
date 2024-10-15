'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Spinner } from "@nextui-org/react"

const categories = [
  "Juegos de palabras", "Chistes de papá", "Frases ingeniosas", "Toc-toc", "Juegos lingüísticos",
  "Observacional", "Sarcástico", "Humor negro", "Tonto", "Tecnología"
]

export default function JokeGenerator() {
  const [joke, setJoke] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else if (prev.length < 5) {
        return [...prev, category]
      }
      return prev
    })
  }

  const generateJoke = async () => {
    if (selectedCategories.length === 0) return
    setIsLoading(true)

    try {
      // Llamada a tu API en /api/joke
      const response = await fetch('/api/joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: selectedCategories.join(', ') }),
      })

      const data = await response.json()

      if (response.ok) {
        setJoke(`Aquí tienes un chiste: ${data.joke}`)
      } else {
        setJoke(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error al generar el chiste:', error)
      setJoke('Hubo un error al generar el chiste. Intenta de nuevo.')
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 text-white border-blue-500 border">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-blue-400">Generador de Chistes</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => toggleCategory(category)}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className={`text-sm px-3 py-1 rounded-full ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-transparent text-blue-400 border-blue-400 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          <p className="text-sm text-blue-300 mb-4 text-center">
            Seleccionadas: {selectedCategories.length}/5
          </p>
          <div className="min-h-[100px] flex items-center justify-center text-center p-4 bg-gray-800 rounded-md">
            {isLoading ? (
              <div className="flex items-center">
                <Spinner color="primary" size="sm" />
                <span className="ml-2 text-blue-300">Cargando chiste...</span>
              </div>
            ) : (
              <p className="text-blue-300">{joke || "¡Selecciona hasta 5 categorías y genera un chiste!"}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={generateJoke} 
            disabled={isLoading || selectedCategories.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Generar Chiste
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
