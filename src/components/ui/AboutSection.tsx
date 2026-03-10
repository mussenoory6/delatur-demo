import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import RevealOnScroll from "./RevealOnScroll"

const cardVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.06)",
  },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 0 80px rgba(185,151,85,0.22), 0 32px 80px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)",
  },
}

const glowVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
}

export default function AboutSection() {
  const { about, company } = siteContent
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Image drifts slightly slower than the page — boutique parallax feel
  const imageY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"])

  return (
    <section
      ref={sectionRef}
      id="om-oss"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="section-divider" />

      {/* Decorative blob */}
      <svg
        className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] opacity-[0.04]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="var(--brand)"
          d="M55.2,-75.1C70.6,-65.5,81,-48.9,84.9,-31.4C88.8,-13.9,86.2,4.5,80.1,21.6C74,38.7,64.5,54.5,51.2,65.7C37.9,76.9,20.9,83.5,3.3,79.4C-14.3,75.3,-32.5,60.5,-47,46C-61.5,31.5,-72.3,17.3,-75.2,1.3C-78.1,-14.7,-73.1,-32.5,-62.3,-45.9C-51.5,-59.3,-35,-68.3,-18.7,-73.6C-2.4,-78.9,13.7,-80.5,29,-79.4C44.3,-78.3,39.8,-84.7,55.2,-75.1Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

          {/* ── LEFT — Portrait ── */}
          <RevealOnScroll className="relative order-2 md:order-1" scale>

            {/* Soft circle behind portrait */}
            <div
              className="pointer-events-none absolute -left-8 -top-8 h-72 w-72 rounded-full opacity-40"
              style={{ backgroundColor: "var(--brand-light)" }}
            />

            {/* Champagne-gold geometric frame — sits behind the image for editorial depth */}
            <div
              className="pointer-events-none absolute -left-5 -top-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-[2.5rem]"
              style={{
                border: "1px solid rgba(185,151,85,0.22)",
                background:
                  "linear-gradient(135deg, rgba(185,151,85,0.06) 0%, transparent 55%)",
              }}
            />

            {/* Parallax wrapper — image drifts at a different scroll speed than text */}
            <motion.div style={{ y: imageY }} className="relative">

              {/* Hover-animated image card */}
              <motion.div
                className="relative overflow-hidden rounded-[2rem] cursor-default"
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                {/* Signature border — top-left corner */}
                <span
                  className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-10"
                  style={{
                    borderTop: "1.5px solid rgba(185,151,85,0.92)",
                    borderLeft: "1.5px solid rgba(185,151,85,0.92)",
                  }}
                />

                {/* Signature border — bottom-right corner */}
                <span
                  className="pointer-events-none absolute bottom-0 right-0 z-10 h-10 w-10"
                  style={{
                    borderBottom: "1.5px solid rgba(185,151,85,0.92)",
                    borderRight: "1.5px solid rgba(185,151,85,0.92)",
                  }}
                />

                <img
                  src={about.image}
                  alt={`${company.treater} — ${company.treaterTitle}, ${company.name}`}
                  className="aspect-square w-full object-cover"
                  style={{ objectPosition: "center top" }}
                />

                {/* Warm gold glow — fades in on hover via shared variants */}
                <motion.div
                  variants={glowVariants}
                  transition={{ duration: 0.7 }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(185,151,85,0.16) 0%, transparent 55%)",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Floating credential card — gold glassmorphism */}
              <div className="glass-gold absolute -right-4 bottom-8 rounded-2xl p-5 shadow-xl md:-right-8">
                <p
                  className="mb-3 text-[10px] font-medium uppercase"
                  style={{ color: "var(--brand)", letterSpacing: "0.18em" }}
                >
                  Utbildning & certifiering
                </p>
                <div className="flex flex-col gap-2">
                  {about.credentials.map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                        style={{ backgroundColor: "var(--brand)" }}
                      >
                        ✓
                      </span>
                      <span className="text-xs font-medium text-neutral-700">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* ── RIGHT — Text ── */}
          <div className="order-1 md:order-2">
            <RevealOnScroll>
              <p className="section-label mb-6">
                <span className="inline-block h-px w-6" style={{ backgroundColor: "var(--brand)" }} />
                {about.sectionLabel}
              </p>
            </RevealOnScroll>

            {/* Serif headline */}
            <RevealOnScroll delay={0.1}>
              <h2
                className="mb-2 text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {about.headline},{" "}
                <em style={{ color: "var(--brand-dark)", fontStyle: "italic" }}>
                  {about.headlineEm}
                </em>
              </h2>
            </RevealOnScroll>

            {/* Handwritten signature title */}
            <RevealOnScroll delay={0.15}>
              <p
                className="mb-7 text-[1.25rem] leading-snug"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "var(--gold-dark)",
                  letterSpacing: "0.01em",
                }}
              >
                {company.treaterTitle}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mb-4 leading-[1.8] text-neutral-600">{about.bio}</p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p className="leading-[1.8] text-neutral-600">{about.bio2}</p>
            </RevealOnScroll>

            {/* Quote */}
            <RevealOnScroll delay={0.35}>
              <blockquote
                className="mt-6 border-l-2 pl-5 text-base italic leading-relaxed text-neutral-500"
                style={{ borderColor: "var(--gold)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem" }}
              >
                "{about.quote}"
              </blockquote>
            </RevealOnScroll>

            {/* Name / avatar row */}
            <RevealOnScroll delay={0.45}>
              <div
                className="mt-8 flex items-center gap-3 border-t pt-8"
                style={{ borderColor: "var(--gold-border)" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--brand)" }}
                >
                  {(company as { initials?: string }).initials ?? company.treater.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{company.treater}</p>
                  <p
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      color: "var(--gold-dark)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {company.treaterTitle}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}
