import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function AboutPage() {
  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Acerca de JokeGen</h1>
          <p className="text-xl text-center text-blue-200">Generando risas, un chiste a la vez.</p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-blue-500">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Nuestra Misión</h2>
                <p className="text-gray-300">
                  Nuestra misión es llevar alegría y risas a las personas de todo el mundo a través de chistes ingeniosos y divertidos. Creemos en el poder del humor para conectar a las personas y hacer del mundo un lugar más feliz.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-blue-500">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Nuestra Visión</h2>
                <p className="text-gray-300">
                  Aspiramos a ser la plataforma líder mundial en generación de chistes, creando una comunidad global de amantes del humor y fomentando conexiones a través de la risa compartida.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Creatividad', 'Inclusividad', 'Positividad', 'Innovación'].map((value) => (
              <Card key={value} className="bg-gray-800 border-blue-500">
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">{value}</h3>
                  <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">Nuestro Fundador</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-48 h-48 relative rounded-full overflow-hidden">
              <Image
                src="/founder.jpg"
                alt="Fundador de ChisteIA"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-blue-300">Brandon Muro</h3>
              <p className="text-xl mb-4 text-gray-400">Fundador y CEO</p>
              <p className="text-gray-300 mb-4">
              Brandon Muro es un entusiasta de la tecnología y el aprendizaje, que ve sus proyectos como una oportunidad para divertirse y seguir creciendo. Ex olímpico y entrenador de olimpiadas de matemáticas, es Founder y Desarrollador de software en VoluntRED (voluntred.com), una plataforma que conecta a voluntarios con ONGs, y en Daskalos (proyectodaskalos.com), una app educativa enfocada en tutorías personalizadas de matemáticas.


              </p>
            
              <p className="text-gray-300 mb-4">
              Actualmente, está trabajando en ChisteIA, un proyecto donde combina su pasión por la inteligencia artificial y el humor para aprender más sobre IA mientras se divierte en el proceso.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer></Footer>

    </>
  )
}