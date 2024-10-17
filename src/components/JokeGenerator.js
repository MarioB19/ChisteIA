'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Laugh, Search, X, Volume2, VolumeX } from 'lucide-react'

const allCategories = [
  "Humor negro", "Clasistas", "Tecnologia", "De peda", "Relaciones tóxicas", "Pepito", "Toc-Toc", "Amor",
  "Normal", "Borrachos", "Chistes de papás", "Groserías mexicanas",
  "Cosas de la chaviza", "Chistes Godínez", "Tacos", "De pobres y ricos", "Escuela", "Maestros manchados",
  "Exámenes", "De suegras", "Vecinos metiches", "Comida callejera", "Políticos", "Presidente",
  "Narcos", "Fútbol", "Crushes", "Estudiantes", "Doctores", "Buchones", "Influencers", "Millonarios",
  "Chismosos", "Nacos vs fresas", "Humor ácido", "Compas", "Chistes de WhatsApp", "Fiestas",
  "Música de banda", "Supersticiones mexicanas", "Sobrenatural", "Aliens", "Terror en la colonia",
  "Leyendas urbanas", "Emos", "Skatos", "Chismes de famosos", "Redes sociales", "De tianguis",
  "Compromisos de barrio", "Papás estrictos", "Cuñados", "De políticos corruptos",
  "Policías", "Amor de rancho", "Cultura pop mexicana", "Televisión mexicana", "Novelas", "Influencers caídos",
  "TikTok", "Memes", "Series mexicanas", "Cantantes", "YouTubers", "Reguetón", "Conciertos", "Vivir en la colonia",
  "Transporte público", "Días de quincena", "Mercados", "Chistes de Godinez en Home Office", "El primo borracho",
  "Amigos traicioneros", "Oxxo", "Chismes del vecindario", "Mala suerte", "Deudas", "Prietos"
];

export default function JokeGenerator() {
  const [joke, setJoke] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(allCategories)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechRate, setSpeechRate] = useState(1)

  useEffect(() => {
    setFilteredCategories(
      allCategories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm])

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else if (prev.length < 3) {
        return [...prev, category]
      }
      return prev
    })
  }

  const generateJoke = async () => {
    if (selectedCategories.length === 0) return
    setIsLoading(true)

    try {
      const response = await fetch('/api/joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: selectedCategories.join(', ') }),
      })

      const data = await response.json()

      if (response.ok) {
        setJoke(data.joke)
      } else {
        throw new Error(data.error || 'Error al generar el chiste')
      }
    } catch (error) {
      console.error('Error al generar el chiste:', error)
      setJoke('Hubo un error al generar el chiste. Intenta de nuevo.')
    }

    setIsLoading(false)
  }

  const speakJoke = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(joke)
      utterance.lang = 'es-MX' // Set language to Mexican Spanish
      utterance.rate = speechRate // Set the speech rate
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    } else {
      alert('Lo siento, tu navegador no soporta la síntesis de voz.')
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleRateChange = (newRate) => {
    setSpeechRate(newRate[0])
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-black p-4">
      <Card className="w-full max-w-2xl bg-black/50 backdrop-blur-md text-white border-blue-500 border">
        <CardContent className="pt-6">
          <motion.h1
            className="text-3xl font-bold text-blue-400 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Generador de Chistes
          </motion.h1>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {allCategories.slice(0, 10).map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isSelected={selectedCategories.includes(category)}
                onClick={() => toggleCategory(category)}
              />
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-sm px-3 py-1 rounded-full bg-transparent text-blue-400 border-blue-400 hover:bg-blue-700 hover:text-white">
                  Ver más...
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border-blue-500">
                <DialogHeader>
                  <DialogTitle className="text-blue-400">Todas las categorías</DialogTitle>
                </DialogHeader>
                <div className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Buscar categorías..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 text-white border-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                </div>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="flex flex-wrap gap-2">
                    {filteredCategories.map((category) => (
                      <CategoryButton
                        key={category}
                        category={category}
                        isSelected={selectedCategories.includes(category)}
                        onClick={() => toggleCategory(category)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-blue-300 mb-4 text-center">
            Seleccionadas: {selectedCategories.length}/3
          </p>
          <motion.div
            className="min-h-[150px] flex flex-col items-center justify-center text-center p-4 bg-gray-800 rounded-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Laugh className="animate-bounce text-blue-400 mr-2" size={24} />
                <span className="text-blue-300">Generando chiste...</span>
              </div>
            ) : (
              <>
                <p className="text-blue-300 mb-4">{joke || "¡Selecciona hasta 3 categorías y genera un chiste!"}</p>
                {joke && (
                  <>
                    <Button
                      onClick={isSpeaking ? stopSpeaking : speakJoke}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 transform hover:scale-105 flex items-center mb-4"
                    >
                      {isSpeaking ? (
                  <>
                    <VolumeX className="mr-2" size={18} />
                    Detener
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2" size={18} />
                    Escuchar chiste
                  </>
                )}
              </Button>
              <div className="flex items-center space-x-2 mt-2 w-full max-w-xs">
                <span className="text-sm text-blue-300">Velocidad:</span>
                <div className="relative w-full">
  <Slider
    min={0.5}
    max={2}
    step={0.1}
    value={[speechRate]}
    onValueChange={handleRateChange}
    className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    thumbClassName="w-4 h-4 bg-black rounded-full shadow-md transform translate-y-[-50%] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
  />
</div>


                <span className="text-sm text-blue-300 min-w-[40px] text-right">{speechRate.toFixed(1)}x</span>
              </div>
            </>
          )}
              </>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={generateJoke}
            disabled={isLoading || selectedCategories.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 transform hover:scale-105"
          >
            Generar Chiste
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function CategoryButton({ category, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`text-sm px-3 py-1 rounded-full ${
        isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-transparent text-blue-400 border border-blue-400 hover:bg-blue-700 hover:text-white'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {category}
    </motion.button>
  )
}