import { useState, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VantaBackground from "./components/VantaBackground";

export default function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      const scroll = new LocomotiveScroll();

      return () => {
        scroll.destroy();
      };
    }
  }, [loading]);

  return (
    <div className="text-white font-sans selection:bg-primary selection:text-white">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <VantaBackground />
      
      <Navbar />
      
      <main 
        ref={scrollRef} 
        data-scroll-container 
        className={`relative z-10 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Hero loading={loading} />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
