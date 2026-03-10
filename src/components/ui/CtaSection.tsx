import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import { useBooking } from "@/context/BookingContext"
import RevealOnScroll from "./RevealOnScroll"

export default function CtaSection() {
  const { cta } = siteContent
  const { openBooking } = useBooking()

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={sectionRef} className="px-4 py-28 md:px-6 md:py-36">
      <RevealOnScroll scale>
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-16 text-center md:px-16"
          style={{ backgroundColor: "var(--brand)" }}
        >
          {/* Parallax background image */}
          {cta.backgroundImage && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url(${cta.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  y: bgY,
                  scale: 1.15,
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[var(--brand)]/70" />
            </>
          )}

          {/* Subtle blob decoration */}
          <svg
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-[0.06]"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              fill="white"
              d="M47.5,-65.7C60.4,-57.2,69.7,-43.1,74.4,-27.8C79.1,-12.5,79.2,4,73.7,17.8C68.2,31.6,57.2,42.8,44.4,52.3C31.6,61.8,17,69.6,1.2,68.2C-14.6,66.8,-31.5,56.2,-44.9,44C-58.3,31.8,-68.2,18,-71.2,2.3C-74.2,-13.4,-70.3,-30.9,-60.5,-44.2C-50.7,-57.5,-35,-66.5,-19.1,-72.3C-3.2,-78.1,14,-85.6,28.6,-81.5C43.2,-77.4,34.6,-74.2,47.5,-65.7Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative z-10">
            <h2
              className="text-3xl font-semibold text-white md:text-4xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              {cta.description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => openBooking()}
                className="btn-premium btn-glow btn-shimmer rounded-full bg-white px-7 py-3.5 text-sm font-semibold active:scale-[0.98]"
                style={{ color: "var(--brand-dark)" }}
              >
                {cta.buttonText}
              </button>
              <a
                href={cta.secondaryUrl}
                className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-white/80 hover:bg-white/10 active:scale-[0.98]"
              >
                {cta.secondaryText}
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
