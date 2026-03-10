import { useState } from "react"
import { motion } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import RevealOnScroll from "./RevealOnScroll"
import ServiceMenuOverlay from "./ServiceMenuOverlay"

type CategoryId = string

// ── Card accent SVGs ────────────────────────────────────────────────────────

function AccentA() {
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.22">
      <path d="M10 16 Q40 10, 70 16" />
      <path d="M14 24 Q40 18, 66 24" />
      <path d="M20 32 Q40 26, 60 32" />
    </svg>
  )
}

function AccentB() {
  return (
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.22">
      <path d="M4 22 C10 12, 22 8, 36 16 C50 8, 62 12, 68 22" />
      <path d="M4 22 C10 34, 22 44, 36 40 C50 44, 62 34, 68 22" />
      <path d="M36 16 C34 20, 35 23, 36 16" />
    </svg>
  )
}

// ── Launcher card ───────────────────────────────────────────────────────────

function CategoryCard({
  category,
  index,
  onOpen,
}: {
  category: typeof siteContent.services.categories[number]
  index: number
  onOpen: (id: CategoryId) => void
}) {
  const useAltGradient = index % 2 === 1
  const [hovered, setHovered] = useState(false)
  const fromPrice = "fromPrice" in category ? (category as { fromPrice?: string }).fromPrice : undefined

  return (
    <RevealOnScroll delay={index * 0.12}>
      <motion.div
        className="service-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl"
        style={{ border: "1px solid rgba(185,151,85,0.14)" }}
        animate={{ backgroundColor: hovered ? "#fdf8f2" : "#ffffff" }}
        whileHover={{
          y: -10,
          boxShadow:
            "0 28px 72px rgba(0,0,0,0.10), 0 8px 24px rgba(92,144,144,0.10)",
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onOpen(category.id)}
      >
        {/* Decorative top band */}
        <div
          className="relative h-36 w-full overflow-hidden"
          style={{
            background: useAltGradient
              ? "linear-gradient(135deg, hsl(38,30%,96%) 0%, hsl(174,22%,92%) 100%)"
              : "linear-gradient(135deg, hsl(174,22%,96%) 0%, hsl(174,28%,90%) 100%)",
          }}
        >
          {/* Accent SVG */}
          <div
            className="absolute bottom-4 right-6 transition-transform duration-700 group-hover:scale-110 group-hover:translate-y-[-4px]"
            style={{ color: "var(--brand)" }}
          >
            {useAltGradient ? <AccentB /> : <AccentA />}
          </div>

          {/* Category label pill */}
          <div className="absolute left-6 top-5">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase"
              style={{
                background: "var(--brand)",
                color: "#fff",
                letterSpacing: "0.14em",
              }}
            >
              {category.tagline}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col p-7">
          {/* Title */}
          <h3
            className="text-3xl font-semibold text-neutral-950"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {category.label}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {category.description}
          </p>

          {/* Highlights */}
          <ul className="mt-5 flex flex-col gap-2">
            {category.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Service count preview */}
          <div
            className="mt-5 flex flex-wrap gap-2"
          >
            {category.services.slice(0, 4).map((s) => (
              <span
                key={s.name}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: "var(--brand-light)",
                  color: "var(--brand-dark)",
                }}
              >
                {s.name}
              </span>
            ))}
            {category.services.length > 4 && (
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: "var(--brand-light)",
                  color: "var(--brand-dark)",
                }}
              >
                +{category.services.length - 4} till
              </span>
            )}
          </div>

          {/* CTA */}
          <div
            className="mt-6 flex items-center justify-between border-t pt-6"
            style={{ borderColor: "var(--gold-border)" }}
          >
            <span
              className="text-base font-medium text-neutral-600"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.02em" }}
            >
              {fromPrice ?? "Se priser"}
            </span>
            <motion.button
              className="btn-premium btn-glow btn-glow-teal btn-shimmer flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              whileHover={{ gap: "10px" }}
            >
              Utforska priser
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  )
}

// ── Main section ────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const { services } = siteContent
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [overlayCategory, setOverlayCategory] = useState<CategoryId>(services.categories[0]?.id ?? "")

  const openMenu = (id: CategoryId) => {
    setOverlayCategory(id)
    setOverlayOpen(true)
  }

  return (
    <>
      <section
        id="tjanster"
        className="relative overflow-hidden bg-white px-4 py-32 md:px-6 md:py-40"
      >
        {/* Thin top border */}
        <div className="absolute inset-x-0 top-0 h-px bg-neutral-950/[0.04]" />

        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <RevealOnScroll className="mb-14 max-w-2xl">
            <p
              className="mb-3 text-sm font-medium uppercase"
              style={{ color: "var(--brand)", letterSpacing: "0.18em" }}
            >
              02 — Behandlingar
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
              {services.title}
            </h2>
            <p className="mt-4 text-neutral-600">{services.subtitle}</p>
          </RevealOnScroll>

          {/* Category launcher cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {services.categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} onOpen={openMenu} />
            ))}
          </div>

          {/* Bottom note */}
          <RevealOnScroll delay={0.25}>
            <p className="mt-10 text-center text-sm text-neutral-400">
              Klicka på en behandlingskategori för att se fullständig prislista och boka direkt.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Interactive Service Menu Overlay */}
      <ServiceMenuOverlay
        isOpen={overlayOpen}
        initialCategory={overlayCategory}
        onClose={() => setOverlayOpen(false)}
      />
    </>
  )
}
