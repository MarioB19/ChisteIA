import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full bg-gray-900 border-b border-blue-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-blue-400 text-xl font-bold">
            ChisteIA
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about" className="text-white hover:text-blue-400 transition-colors">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link href="/generate" className="text-white hover:text-blue-400 transition-colors">
                  Generar chistes
                </Link>
              </li>
              <li>
                <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                  Iniciar sesión
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}