'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WelcomeSection from "@/components/IndexPage/WelcomeSection";
import { useRouter } from "next/navigation";


import WhyChooseUs from "@/components/IndexPage/WhyChooseUs";
import AboutChisteIA from "@/components/IndexPage/AboutChisteIA";

import ContactSection from "@/components/IndexPage/ContactSection";


export default function Home() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-col items-center justify-center">
        
        <WelcomeSection></WelcomeSection>
        <WhyChooseUs></WhyChooseUs>

        <AboutChisteIA></AboutChisteIA>

        <ContactSection></ContactSection>


        
      </main>

      <Footer />
    </div>
  );
}