import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroSection from '@/components/AboutPage/HeroSection'
import MissionVisionSection from '@/components/AboutPage/MissionVissionSection'
import ValuesSection from '@/components/AboutPage/ValuesSection'
import FounderSection from '@/components/AboutPage/FounderSection'

export default function AboutPage() {
  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-gray-900 text-white">
      
      <HeroSection></HeroSection>
      <MissionVisionSection></MissionVisionSection>
      <ValuesSection></ValuesSection>
      <FounderSection></FounderSection>

   
    </div>

    <Footer></Footer>

    </>
  )
}