'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Spinner } from "@nextui-org/react"
import { Toggle } from "@/components/ui/toggle"
import { GlobeIcon } from "lucide-react"

const categories = {
  en: [
    "Puns", "Dad Jokes", "One-liners", "Knock-knock", "Wordplay",
    "Observational", "Sarcastic", "Dark Humor", "Silly", "Tech"
  ],
  es: [
    "Juegos de palabras", "Chistes de papá", "Frases ingeniosas", "Toc-toc", "Juegos lingüísticos",
    "Observacional", "Sarcástico", "Humor negro", "Tonto", "Tecnología"
  ]
}

const translations = {
  en: {
    title: "Joke Generator",
    instruction: "Select up to 5 categories and generate a joke!",
    selected: "Selected:",
    generate: "Generate Joke",
    loading: "Loading joke..."
  },
  es: {
    title: "Generador de Chistes",
    instruction: "¡Selecciona hasta 5 categorías y genera un chiste!",
    selected: "Seleccionadas:",
    generate: "Generar Chiste",
    loading: "Cargando chiste..."
  }
}

export default function JokeGenerator() {
  const [joke, setJoke] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEnglish, setIsEnglish] = useState(true)

  const lang = isEnglish ? 'en' : 'es'

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
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (isEnglish) {
      setJoke(`Here's a joke from ${selectedCategories.join(', ')}: Why don't scientists trust atoms? Because they make up everything!`)
    } else {
      setJoke(`Aquí tienes un chiste de ${selectedCategories.join(', ')}: ¿Por qué los científicos no confían en los átomos? ¡Porque lo componen todo!`)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 text-white border-blue-500 border">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-400">{translations[lang].title}</h1>
            <Toggle
              aria-label="Toggle language"
              pressed={isEnglish}
              onPressedChange={(pressed) => {
                setIsEnglish(pressed)
                setSelectedCategories([])
                setJoke("")
              }}
              className="bg-gray-800 data-[state=on]:bg-blue-600"
            >
              <GlobeIcon className="h-4 w-4" />
              <span className="ml-2">{isEnglish ? 'EN' : 'ES'}</span>
            </Toggle>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories[lang].map((category) => (
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
            {translations[lang].selected} {selectedCategories.length}/5
          </p>
          <div className="min-h-[100px] flex items-center justify-center text-center p-4 bg-gray-800 rounded-md">
            {isLoading ? (
              <div className="flex items-center">
                <Spinner color="primary" size="sm" />
                <span className="ml-2 text-blue-300">{translations[lang].loading}</span>
              </div>
            ) : (
              <p className="text-blue-300">{joke || translations[lang].instruction}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={generateJoke} 
            disabled={isLoading || selectedCategories.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {translations[lang].generate}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}