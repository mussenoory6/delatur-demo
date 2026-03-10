import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider"
import { siteContent } from "@/content/siteContent"
import { useBooking } from "@/context/BookingContext"
import RevealOnScroll from "./RevealOnScroll"

type ResultItem = (typeof siteContent.results.items)[number]

function SliderHandle() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="pulse-ring-gold" style={{ width: 56, height: 56, margin: "auto", position: "absolute", inset: -4 }} />
      <span className="pulse-ring" style={{ width: 48, height: 48, margin: "auto", position: "absolute", inset: 0 }} />
      <div
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full shadow-xl ring-2 ring-white/70"
        style={{
          background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)",
          boxShadow: "0 4px 20px rgba(79,148,144,0.5), 0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l-3 2 3 2M14 8l3 2-3 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="10" y1="5" x2="10" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function ResultCard({
  item,
  onExpand,
}: {
  item: ResultItem
  onExpand: (item: ResultItem) => void
}) {
  const [position, setPosition] = useState(50)
  const [isHovered, setIsHovered] = useState(false)

  const handlePositionChange = useCallback((pos: number) => {
    setPosition(Math.round(pos))
  }, [])

  return (
    <motion.div
      className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
      whileHover={{ boxShadow: "0 20px 56px rgba(0,0,0,0.12), 0 4px 16px rgba(79,148,144,0.08)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Slider — consistent dimensions, clean containment */}
      <div
        className="relative cursor-pointer overflow-hidden rounded-t-3xl"
        onClick={() => onExpand(item)}
      >
        <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={item.before}
                alt={`Före — ${item.label}`}
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={item.after}
                alt={`Efter — ${item.label}`}
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            }
            handle={<SliderHandle />}
            onPositionChange={handlePositionChange}
            style={{ height: "320px" }}
          />

        {/* Före/Efter labels — fade in on hover for premium feel */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-4 pb-3"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0.85 }}
          transition={{ duration: 0.25 }}
        >
          <span className="rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            Före
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm"
            style={{ backgroundColor: "color-mix(in srgb, var(--brand) 75%, transparent)" }}
          >
            Efter
          </span>
        </motion.div>

        {/* Expand hint */}
        <motion.div
          className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p
            className="font-semibold text-neutral-950"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {item.label}
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">
            Dra reglaget · klicka för helskärm
          </p>
        </div>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white tabular-nums"
          style={{ backgroundColor: "var(--brand)" }}
        >
          {position}%
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({
  item,
  onClose,
}: {
  item: ResultItem
  onClose: () => void
}) {
  const { openBooking } = useBooking()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Large compare slider — clean presentation */}
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={item.before}
                alt={`Före — ${item.label}`}
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={item.after}
                alt={`Efter — ${item.label}`}
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            }
            handle={<SliderHandle />}
            style={{ height: "clamp(380px, 60vh, 620px)" }}
          />

          {/* Labels overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[72px] flex justify-between px-5 pb-3">
            <span className="rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Före
            </span>
            <span
              className="rounded-full px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
              style={{ backgroundColor: "color-mix(in srgb, var(--brand) 70%, transparent)" }}
            >
              Efter
            </span>
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between gap-4 px-6 py-4"
            style={{
              background: "rgba(253,251,248,0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div>
              <p
                className="font-semibold text-neutral-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.label}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">Dra reglaget för att jämföra</p>
            </div>
            <button
              onClick={() => { openBooking(); onClose() }}
              className="btn-premium btn-glow btn-glow-cta btn-shimmer flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            >
              Boka denna behandling →
            </button>
          </div>
        </motion.div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-8 md:top-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default function ResultsSection() {
  const { results } = siteContent
  const [lightboxItem, setLightboxItem] = useState<ResultItem | null>(null)

  return (
    <>
      <section id="resultat" className="relative overflow-hidden bg-white px-4 py-32 md:px-6 md:py-40">
        <div className="absolute inset-x-0 top-0 h-px bg-neutral-950/[0.04]" />

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealOnScroll className="mb-12 max-w-2xl">
            <p
              className="mb-3 text-sm font-medium uppercase"
              style={{ color: "var(--brand)", letterSpacing: "0.18em" }}
            >
              Före & Efter
            </p>
            <h2
              className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {results.title}
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">{results.subtitle}</p>
          </RevealOnScroll>

          {/* Mobile: horizontal scroll carousel — Desktop: 3-col grid */}
          <div
            className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
              -mx-4 px-4
              md:mx-0 md:px-0 md:pb-0
              md:grid md:grid-cols-4 md:overflow-visible md:max-w-none
            "
            style={{ scrollbarWidth: "none" }}
          >
            {results.items.map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className="flex-shrink-0 w-[82vw] snap-start sm:w-[68vw] md:flex-shrink md:w-auto"
              >
                <RevealOnScroll delay={i * 0.1}>
                  <ResultCard item={item} onExpand={setLightboxItem} />
                </RevealOnScroll>
              </div>
            ))}
          </div>

          {/* Mobile scroll hint */}
          <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
            {results.items.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === 0 ? "20px" : "6px",
                  backgroundColor: i === 0 ? "var(--brand)" : "rgba(79,148,144,0.25)",
                }}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <RevealOnScroll delay={0.3}>
            <p className="mt-8 text-center text-xs text-neutral-400">
              * Bilderna ovan är illustrativa. Individuella resultat kan variera.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
