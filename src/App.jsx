import { useState, useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navigation/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import AboutSection from "./components/About/AboutSection";
import SkillsSection from "./components/Skills/SkillsSection";
import ProjectsSection from "./components/Projects/ProjectsSection";
import ContactSection from "./components/Contact/ContactSection";

// Lazy load the star background
const CosmicBackground = lazy(() =>
  import("./components/Background/CosmicBackground")
);

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Loading sequence
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Star Background — fixed behind everything */}
      <Suspense fallback={null}>
        <CosmicBackground />
      </Suspense>

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Loading overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "var(--color-void)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? "none" : "all",
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <div
          className="font-display"
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--color-violet-light)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          NK
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
