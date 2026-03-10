import { useEffect, useRef, useState } from "react"
import { siteContent } from "@/content/siteContent"
import { useBooking } from "@/context/BookingContext"
import RevealOnScroll from "./RevealOnScroll"

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: value }
  return { num: parseFloat(match[1]), suffix: match[2].trim() }
}

function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
  const isDecimal = target % 1 !== 0
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * target)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target])

  if (isDecimal) return <>{current.toFixed(1)}</>
  return <>{Math.floor(current)}</>
}

function StatItem({ stat, delay }: { stat: { value: string; label: string }; delay: number }) {
  const { num, suffix } = parseStatValue(stat.value)
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <RevealOnScroll delay={delay} className="flex flex-col items-center gap-3">
      <div
        ref={ref}
        className="relative flex items-center justify-center w-24 h-24 rounded-full"
        style={{
          border: "0.5px solid rgba(185,151,85,0.62)",
          boxShadow:
            "0 0 0 8px rgba(185,151,85,0.045), inset 0 0 24px rgba(185,151,85,0.035)",
        }}
      >
        {/* Inner decorative ring */}
        <div
          className="absolute inset-2 rounded-full pointer-events-none"
          style={{ border: "0.5px solid rgba(185,151,85,0.2)" }}
        />

        <div
          className="flex items-baseline gap-0.5 relative z-10"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--brand-dark)" }}
        >
          <span className="text-[1.35rem] font-bold tabular-nums leading-none">
            <AnimatedNumber target={num} inView={inView} />
          </span>
          {suffix && (
            <span className="text-sm font-semibold ml-0.5">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 text-center">
        {stat.label}
      </p>
    </RevealOnScroll>
  )
}

export default function StatsSection() {
  const { stats } = siteContent
  const { openBooking } = useBooking()

  return (
    <section
      className="border-y px-4 py-20 md:px-6"
      style={{
        borderColor: "var(--gold-border)",
        backgroundColor: "var(--brand-light)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-4 gap-4 md:gap-8 items-center">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 0.08} />
          ))}

          <RevealOnScroll
            delay={0.28}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => openBooking()}
              className="btn-premium btn-glow btn-glow-cta btn-shimmer rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm"
            >
              Boka din behandling →
            </button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
