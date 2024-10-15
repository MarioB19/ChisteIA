import { motion } from "framer-motion";
import { Brain, Code, Smile } from 'lucide-react';

export default function AboutChisteIA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const teamMembers = [
    { icon: Smile, title: "El Comediante", description: "Nuestro experto en humor, asegurando que cada chiste sea una obra maestra de la comedia." },
    { icon: Code, title: "El Desarrollador", description: "El mago detrás de la cortina, convirtiendo líneas de código en risas." },
    { icon: Brain, title: "El Entusiasta del Humor", description: "Nuestro crítico interno, garantizando que solo los mejores chistes lleguen a ti." }
  ];

  return (
    <motion.section
      className="w-full py-16 bg-gradient-to-b from-black to-blue-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-blue-400"
          variants={itemVariants}
        >
          Sobre ChisteIA
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          variants={itemVariants}
        >
          <p className="text-lg text-gray-300 mb-6">
            ChisteIA nació de la idea de que la risa es la mejor medicina. Utilizamos tecnología de inteligencia artificial de vanguardia para generar y seleccionar los mejores chistes, asegurando que cada visita a nuestra plataforma te deje con una sonrisa.
          </p>
          <p className="text-lg text-gray-300">
            Nuestro equipo está compuesto por un solo comediante, un solo desarrollador y un solo entusiasta del humor, trabajando para hacer del mundo un lugar más divertido, un chiste a la vez.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-blue-800 p-6 rounded-lg text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <member.icon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2 text-white">{member.title}</h3>
              <p className="text-blue-100">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}