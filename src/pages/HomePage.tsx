import { useEffect } from "react"
import Navbar from "../components/ui/Navbar"
import HeroSection from "../components/ui/HeroSection"
import AboutSection from "../components/ui/AboutSection"
import StatsSection from "../components/ui/StatsSection"
import ServicesSection from "../components/ui/ServicesSection"
import ResultsSection from "../components/ui/ResultsSection"
import TestimonialsSection from "../components/ui/TestimonialsSection"
import GoogleReviews from "../components/ui/GoogleReviews"
import CtaSection from "../components/ui/CtaSection"
import ContactSection from "../components/ui/ContactSection"
import Footer from "../components/ui/Footer"
import BotanicalBackground from "../components/ui/BotanicalBackground"
import InstagramTeaser from "../components/ui/InstagramTeaser"
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    const elements = document.querySelectorAll("[data-reveal]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function HomePage() {
  useScrollReveal()

  return (
    <div className="relative min-h-screen text-neutral-950" style={{ backgroundColor: "var(--cream)" }}>
      <BotanicalBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <ServicesSection />
          <ResultsSection />
          <TestimonialsSection />
          <GoogleReviews />
          <CtaSection />
          <ContactSection />
        </main>
        <InstagramTeaser />
        <Footer />
      </div>
    </div>
  )
}
