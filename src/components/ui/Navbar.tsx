import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import { useBooking } from "@/context/BookingContext"

export default function Navbar() {
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-50 transition-all duration-700"
      style={{
        backgroundColor: scrolled ? "rgba(247,245,241,0.90)" : "rgba(247,245,241,0.60)",
        backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "blur(12px) saturate(150%)",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "blur(12px) saturate(150%)",
        borderBottom: scrolled
          ? "1px solid rgba(185,151,85,0.18)"
          : "1px solid rgba(185,151,85,0.07)",
        boxShadow: scrolled
          ? "0 1px 32px rgba(0,0,0,0.05), inset 0 -0.5px 0 rgba(185,151,85,0.12)"
          : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <img
            src={siteContent.company.logoUrl}
            alt={siteContent.company.name}
            className="h-14 w-auto object-contain"
          />
        </a>

        <nav className="hidden gap-7 text-sm text-neutral-600 md:flex">
          {[
            { label: "Behandlingar", href: "#tjanster" },
            { label: "Omdömen",      href: "#omdomen" },
            { label: "Kontakt",      href: "#kontakt" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link transition hover:text-neutral-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => openBooking()}
          className="btn-premium btn-glow btn-glow-teal btn-shimmer rounded-full px-5 py-2.5 text-sm font-medium text-white"
        >
          Boka tid
        </button>
      </div>
    </motion.header>
  )
}
