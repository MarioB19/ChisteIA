import Footer from "@/components/Footer"
import Header from "@/components/Header"
import JokeGenerator from "@/components/JokeGenerator"


export default function ChistePage() {
  return (
   <>
       <div className="min-h-screen bg-gray-900 text-white">
   <Header></Header>

   <JokeGenerator></JokeGenerator>



 

   <Footer></Footer>
   </div>
   </>
  )
}