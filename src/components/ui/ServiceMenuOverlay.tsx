import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import { useBooking } from "@/context/BookingContext"

type CategoryId = "botox" | "fillers"

interface ServiceMenuOverlayProps {
  isOpen: boolean
  initialCategory: CategoryId
  onClose: () => void
}

// ── Minimal line-art icons ──────────────────────────────────────────────────

function LipsIcon() {
  return (
    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 5.5 C3.5 2, 7 1, 10 3.5 C13 1, 16.5 2, 19 5.5" />
      <path d="M1 5.5 C3.5 8.5, 6.5 12, 10 10.5 C13.5 12, 16.5 8.5, 19 5.5" />
      <path d="M10 3.5 C9.2 5, 10 6, 10 3.5" />
    </svg>
  )
}

function DropIcon({ size = "md" }: { size?: "md" | "lg" }) {
  const s = size === "lg" ? 16 : 13
  return (
    <svg width={s} height={s * 1.4} viewBox="0 0 13 18" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
      <path d="M6.5 1.5 C6.5 1.5, 12 9, 12 12.5 C12 15.5, 9.5 16.5, 6.5 16.5 C3.5 16.5, 1 15.5, 1 12.5 C1 9, 6.5 1.5, 6.5 1.5Z" />
    </svg>
  )
}

function DropMaxIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
      <path d="M6 2 C6 2, 10.5 8.5, 10.5 11.5 C10.5 14, 8.5 15.5, 6 15.5 C3.5 15.5, 1.5 14, 1.5 11.5 C1.5 8.5, 6 2, 6 2Z" />
      <path d="M15 5 C15 5, 18.5 10, 18.5 12.5 C18.5 14.5, 17 15.5, 15 15.5 C13 15.5, 11.5 14.5, 11.5 12.5 C11.5 10, 15 5, 15 5Z" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M5.5 1 L10 5.5 L5.5 10 L1 5.5 Z" />
    </svg>
  )
}

function LetterIcon({ letter }: { letter: string }) {
  return (
    <span
      className="text-[11px] font-semibold tracking-wide"
      style={{ color: "var(--brand)", fontFamily: "'Geist Variable', system-ui, sans-serif" }}
    >
      {letter}
    </span>
  )
}

function ServiceIconBadge({ icon }: { icon: string }) {
  const inner = (() => {
    if (icon === "lips") return <LipsIcon />
    if (icon === "drop") return <DropIcon />
    if (icon === "dropmax") return <DropMaxIcon />
    if (icon === "diamond") return <DiamondIcon />
    return <LetterIcon letter={icon} />
  })()

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{
        border: "1px solid var(--brand-mid)",
        color: "var(--brand)",
        background: "var(--brand-light)",
      }}
    >
      {inner}
    </div>
  )
}

// ── Stagger variants ────────────────────────────────────────────────────────

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -14, filter: "blur(2px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
}

const packageVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── ServiceRow ─────────────────────────────────────────────────────────────

function ServiceRow({
  name,
  description,
  duration,
  price,
  icon,
  categoryId,
}: {
  name: string
  description: string
  duration: string
  price: string
  icon: string
  categoryId: string
}) {
  const [hovered, setHovered] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  const { openBooking } = useBooking()

  return (
    <motion.div
      ref={rowRef}
      variants={rowVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors duration-200"
      style={{
        background: hovered ? "rgba(92,144,144,0.05)" : "transparent",
        cursor: "pointer",
      }}
    >
      {/* Left: icon + name + description */}
      <ServiceIconBadge icon={icon} />

      <div className="min-w-0 flex-1">
        <p
          className="text-base leading-snug text-neutral-900"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {name}
        </p>
        <p className="mt-0.5 text-xs text-neutral-400">{description}</p>
      </div>

      {/* Dotted leader line */}
      <div
        className="hidden flex-1 self-center sm:block"
        style={{
          borderBottom: "1.5px dotted rgba(185,151,85,0.30)",
          minWidth: "32px",
          marginBottom: "2px",
        }}
      />

      {/* Duration pill */}
      <span className="hidden shrink-0 text-xs text-neutral-400 sm:block">{duration}</span>

      {/* Price */}
      <span
        className="shrink-0 text-sm font-semibold text-neutral-800 transition-all duration-200"
        style={{ minWidth: "72px", textAlign: "right" }}
      >
        {price}
      </span>

      {/* Boka button — fades in on hover */}
      <motion.button
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : 6,
          scale: hovered ? 1 : 0.94,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="btn-premium btn-glow btn-glow-teal btn-shimmer shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-white"
        onClick={(e) => { e.stopPropagation(); openBooking(categoryId) }}
        style={{ pointerEvents: hovered ? "auto" : "none" }}
      >
        Boka
      </motion.button>
    </motion.div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function ServiceMenuOverlay({
  isOpen,
  initialCategory,
  onClose,
}: ServiceMenuOverlayProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory)
  const { categories } = siteContent.services
  const { openBooking } = useBooking()

  // Sync initial category when overlay opens
  useEffect(() => {
    if (isOpen) setActiveCategory(initialCategory)
  }, [isOpen, initialCategory])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  const botox = categories.find((c) => c.id === "botox")!
  const fillers = categories.find((c) => c.id === "fillers")!
  const current = activeCategory === "botox" ? botox : fillers

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay-backdrop"
            className="fixed inset-0 z-50"
            style={{ background: "rgba(15, 15, 15, 0.62)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* Panel container */}
          <motion.div
            key="overlay-panel"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl"
              style={{
                maxHeight: "90vh",
                background: "rgba(252, 251, 249, 0.96)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid var(--gold-border)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ─────────────────────────────────────────────── */}
              <div
                className="flex shrink-0 items-start justify-between px-7 pb-5 pt-7"
                style={{ borderBottom: "1px solid var(--gold-border)" }}
              >
                <div>
                  <p
                    className="mb-1 text-xs font-medium uppercase text-neutral-400"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    Delatur — Prismeny
                  </p>
                  <h2
                    className="text-2xl font-semibold text-neutral-950 sm:text-3xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Våra Behandlingar
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-700"
                  aria-label="Stäng"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M1.5 1.5 L13.5 13.5 M13.5 1.5 L1.5 13.5" />
                  </svg>
                </button>
              </div>

              {/* ── Category tabs ───────────────────────────────────────── */}
              <div className="flex shrink-0 gap-2 px-7 pt-5">
                {[botox, fillers].map((cat) => {
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as CategoryId)}
                      className="relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"
                      style={{
                        background: isActive ? "var(--brand)" : "transparent",
                        color: isActive ? "#fff" : "var(--brand-dark)",
                        border: isActive
                          ? "1px solid transparent"
                          : "1px solid var(--brand-mid)",
                      }}
                    >
                      {cat.label}
                      {isActive && (
                        <motion.span
                          layoutId="tab-indicator"
                          className="absolute inset-0 rounded-full"
                          style={{ background: "var(--brand)", zIndex: -1 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* ── Scrollable content ──────────────────────────────────── */}
              <div className="overflow-y-auto overscroll-contain px-7 pb-8 pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Category tagline */}
                    <p className="mb-6 mt-2 max-w-lg text-sm leading-relaxed text-neutral-500">
                      {current.description}
                    </p>

                    {/* ── Botox: Package selector ─────────────────────── */}
                    {activeCategory === "botox" && botox.packages.length > 0 && (
                      <div className="mb-7">
                        <p
                          className="mb-3 text-[11px] font-medium uppercase text-neutral-400"
                          style={{ letterSpacing: "0.16em" }}
                        >
                          Paketpris — välj antal områden
                        </p>
                        <motion.div
                          className="grid grid-cols-3 gap-3"
                          variants={listVariants}
                          initial="hidden"
                          animate="show"
                        >
                          {botox.packages.map((pkg) => (
                            <motion.button
                              key={pkg.label}
                              onClick={() => { onClose(); openBooking("botox") }}
                              variants={packageVariants}
                              whileHover={{ y: -3, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="relative flex flex-col rounded-2xl p-4 text-left transition-all duration-300"
                              style={{
                                background: pkg.highlight
                                  ? "var(--brand)"
                                  : "white",
                                border: pkg.highlight
                                  ? "1px solid transparent"
                                  : "1px solid var(--gold-border)",
                                boxShadow: pkg.highlight
                                  ? "0 8px 28px rgba(92,144,144,0.28)"
                                  : "0 2px 8px rgba(0,0,0,0.04)",
                              }}
                            >
                              {pkg.highlight && (
                                <span
                                  className="mb-2 w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                                  style={{
                                    background: "rgba(255,255,255,0.2)",
                                    color: "rgba(255,255,255,0.9)",
                                    letterSpacing: "0.12em",
                                  }}
                                >
                                  Populärast
                                </span>
                              )}
                              <p
                                className="text-sm font-semibold"
                                style={{
                                  fontFamily: "'Playfair Display', Georgia, serif",
                                  color: pkg.highlight ? "#fff" : "var(--neutral-900)",
                                }}
                              >
                                {pkg.label}
                              </p>
                              <p
                                className="mt-0.5 text-[11px] leading-snug"
                                style={{
                                  color: pkg.highlight
                                    ? "rgba(255,255,255,0.72)"
                                    : "var(--neutral-500)",
                                }}
                              >
                                {pkg.sublabel}
                              </p>
                              <p
                                className="mt-3 text-base font-bold"
                                style={{
                                  color: pkg.highlight ? "#fff" : "var(--brand-dark)",
                                }}
                              >
                                {pkg.price}
                              </p>
                            </motion.button>
                          ))}
                        </motion.div>

                        {/* Divider with label */}
                        <div className="my-6 flex items-center gap-3">
                          <div
                            className="h-px flex-1"
                            style={{ background: "var(--gold-border)" }}
                          />
                          <span
                            className="text-[11px] font-medium uppercase text-neutral-400"
                            style={{ letterSpacing: "0.14em" }}
                          >
                            Eller välj ett specifikt område
                          </span>
                          <div
                            className="h-px flex-1"
                            style={{ background: "var(--gold-border)" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* ── Service rows ────────────────────────────────── */}
                    <motion.div
                      className="flex flex-col"
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {current.services.map((service, i) => {
                        const isLast = i === current.services.length - 1
                        return (
                          <div key={service.name}>
                            <ServiceRow
                              name={service.name}
                              description={service.description}
                              duration={service.duration}
                              price={service.price}
                              icon={service.icon}
                              categoryId={activeCategory}
                            />
                            {!isLast && (
                              <div
                                className="mx-3"
                                style={{
                                  height: "1px",
                                  background: "linear-gradient(90deg, transparent, var(--gold-border) 20%, var(--gold-border) 80%, transparent)",
                                }}
                              />
                            )}
                          </div>
                        )
                      })}
                    </motion.div>

                    {/* Footer note */}
                    <div
                      className="mt-7 flex items-start gap-3 rounded-2xl p-4"
                      style={{
                        background: "var(--brand-light)",
                        border: "1px solid var(--brand-mid)",
                      }}
                    >
                      <div
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] text-white"
                        style={{ background: "var(--brand)" }}
                      >
                        ✓
                      </div>
                      <div>
                        <p className="text-xs font-medium text-neutral-700">
                          Alla behandlingar utförs av Caroline Lundberg, legitimerad sjuksköterska
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          Gratis konsultation ingår. Kontakta oss för personlig rådgivning.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
