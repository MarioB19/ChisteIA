import { motion } from "framer-motion";
import { Laugh, ListTree, Sparkles, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const features = [
    {
      icon: Laugh,
      title: "20 Chistes Diarios",
      description: "Al iniciar sesión, obtendrás acceso a 20 chistes frescos y divertidos cada día. ¡Nunca te quedarás sin material para hacer reír!",
      available: true
    },
    {
      icon: ListTree,
      title: "Chistes por Categorías",
      description: "Actualmente, generamos chistes basados en diversas categorías para asegurar una amplia variedad de contenido humorístico.",
      available: true
    },
    {
      icon: Sparkles,
      title: "IA Avanzada",
      description: "En el futuro, nuestro algoritmo de IA seleccionará chistes adaptados a tu sentido del humor personal.",
      available: false
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Pronto podrás compartir y valorar chistes con una comunidad de amantes del humor.",
      available: false
    }
  ];

  return (
    <motion.section
      className="w-full py-16 bg-gradient-to-b from-blue-900 to-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center text-white"
          variants={itemVariants}
        >
          ¿Por qué elegir ChisteIA?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-lg border-2 ${
                feature.available 
                  ? "bg-blue-800 border-blue-400" 
                  : "bg-gray-800 border-gray-600"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon className={`w-16 h-16 mb-6 ${feature.available ? "text-blue-400" : "text-gray-400"}`} />
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {feature.title}
                {!feature.available && <span className="text-sm font-normal ml-2">(Próximamente)</span>}
              </h3>
              <p className={`${feature.available ? "text-blue-100" : "text-gray-300"} mb-6`}>
                {feature.description}
              </p>
              <Badge 
                variant={feature.available ? "secondary" : "outline"} 
                className={`text-sm py-1 px-3 ${feature.available ? "bg-blue-500 text-white" : "text-gray-400"}`}
              >
                {feature.available ? "Disponible ahora" : "Próximamente"}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}