import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

// Dynamically load below-the-fold components to reduce First Load JS footprint
const About = dynamic(() => import('@/components/sections/About'), { ssr: true });
const Education = dynamic(() => import('@/components/sections/Education'), { ssr: true });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: true });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false }); // Requires client-side setup for GSAP
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: true });
const Achievements = dynamic(() => import('@/components/sections/Achievements'), { ssr: true });
const Certifications = dynamic(() => import('@/components/sections/Certifications'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export default function Home() {
  return (
    <main className="w-full relative z-10">
      <Navbar />
      
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Achievements />
      <Contact />

      <Footer />
    </main>
  );
}
