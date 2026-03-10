import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import { useBooking } from "@/context/BookingContext"

/** Use supported easing string for production build compatibility */
const EASE = "easeOut" as const
const HERO_VIDEO = "/3181733-uhd_3840_2160_25fps.mp4"

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  show:   { opacity: 1, scale: 1, transition: { duration: 1.0, ease: EASE } },
}

export default function HeroSection() {
  const { hero, company } = siteContent
  const { openBooking } = useBooking()
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Parallax: video container drifts gently on scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: "#faf9f7" }}>

      {/* ── Bokeh / light-leak orbs ────────────────────── */}
      {[
        { w: 320, h: 320, left: "8%",  top: "10%",  xKf: [0,18,-12,22,0], yKf: [0,-24,14,-18,0], dur: 20, del: 0,   color: "rgba(185,151,85,0.13)" },
        { w: 260, h: 260, left: "72%", top: "55%",  xKf: [0,-16,20,-8,0],  yKf: [0,20,-16,12,0],  dur: 24, del: 3,   color: "rgba(79,148,144,0.10)" },
        { w: 200, h: 200, left: "40%", top: "70%",  xKf: [0,12,-18,8,0],   yKf: [0,-14,22,-10,0], dur: 18, del: 1.5, color: "rgba(185,151,85,0.08)" },
        { w: 180, h: 180, left: "85%", top: "5%",   xKf: [0,-20,10,-14,0], yKf: [0,16,-8,20,0],   dur: 22, del: 5,   color: "rgba(79,148,144,0.07)" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
            filter: "blur(32px)",
            zIndex: 1,
          }}
          animate={{ x: orb.xKf, y: orb.yKf }}
          transition={{ duration: orb.dur, delay: orb.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Decorative blob — top-left ─────────────────── */}
      <svg
        className="pointer-events-none absolute -left-32 -top-32 h-[560px] w-[560px] opacity-[0.04]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="var(--brand)"
          d="M47.5,-65.7C60.4,-57.2,69.7,-43.1,74.4,-27.8C79.1,-12.5,79.2,4,73.7,17.8C68.2,31.6,57.2,42.8,44.4,52.3C31.6,61.8,17,69.6,1.2,68.2C-14.6,66.8,-31.5,56.2,-44.9,44C-58.3,31.8,-68.2,18,-71.2,2.3C-74.2,-13.4,-70.3,-30.9,-60.5,-44.2C-50.7,-57.5,-35,-66.5,-19.1,-72.3C-3.2,-78.1,14,-85.6,28.6,-81.5C43.2,-77.4,34.6,-74.2,47.5,-65.7Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* ── Decorative blob — bottom-right ────────────── */}
      <svg
        className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] opacity-[0.035]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="var(--brand)"
          d="M39.9,-67C51.3,-60.6,59.6,-49.2,66.4,-36.6C73.2,-24,78.5,-10.2,77.6,3.3C76.7,16.8,69.6,30,60.5,41.3C51.4,52.6,40.3,62,27.3,68.4C14.3,74.8,-0.5,78.2,-14.2,74.5C-27.9,70.8,-40.5,60,-51.2,47.9C-61.9,35.8,-70.7,22.4,-73.2,7.5C-75.7,-7.4,-71.9,-23.8,-63.1,-36.4C-54.3,-49,-40.5,-57.8,-26.9,-63.6C-13.3,-69.4,0.1,-72.2,13.7,-71.7C27.3,-71.2,28.5,-73.4,39.9,-67Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* ── Gradient overlay for text readability (left side) ──────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(90deg, #faf9f7 0%, #faf9f7 38%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-6 md:py-40">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* ── LEFT — Text content (stagger) ─────────── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show">

            <motion.div variants={fadeUp}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: "var(--brand)",
                  color: "var(--brand)",
                  letterSpacing: "0.12em",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--brand)" }}
                />
                {hero.badge}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-6 text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-neutral-950 md:text-[3.5rem]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", whiteSpace: "pre-line" }}
            >
              {hero.headline}
            </motion.h1>

            <motion.p variants={fadeUp} className="mb-8 max-w-md text-lg leading-relaxed text-neutral-600">
              {hero.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => openBooking()}
                className="btn-premium btn-glow btn-glow-cta btn-shimmer inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-md"
              >
                {hero.cta.primary}
              </button>
              <a
                href={hero.cta.secondaryUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-neutral-700 transition-all active:scale-[0.98]"
                style={{
                  border: "1px solid rgba(185,151,85,0.3)",
                  transition: "border-color 0.4s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(185,151,85,0.65)"
                  e.currentTarget.style.color = "#1a1a1a"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(185,151,85,0.3)"
                  e.currentTarget.style.color = ""
                }}
              >
                {hero.cta.secondary} →
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-sm text-neutral-500">
              ✦ &nbsp;{company.addressLine2 ? `${company.addressLine2}, ` : ""}{company.address}
            </motion.p>
          </motion.div>

          {/* ── RIGHT — Cinematic video container (inset, glassmorphism) ── */}
          <motion.div
            className="relative"
            variants={fadeIn}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="relative overflow-hidden rounded-[40px] shadow-2xl"
              style={{
                y: videoY,
                border: "1px solid rgba(185,151,85,0.35)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Video container — aspect ratio preserved, object-cover */}
              <div className="relative aspect-[4/3] min-h-[320px] w-full md:aspect-[16/10] md:min-h-[420px]">
                {/* Poster fallback for low bandwidth / mobile */}
                <img
                  src={hero.heroImage}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    videoReady ? "opacity-0" : "opacity-100"
                  }`}
                  loading="eager"
                />

                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: videoReady ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={hero.heroImage}
                    onCanPlay={() => setVideoReady(true)}
                    onLoadedData={() => setVideoReady(true)}
                    className="h-full w-full object-cover"
                  >
                    <source src={HERO_VIDEO} type="video/mp4" />
                  </video>
                </motion.div>

                {/* Warm-cream overlay for readability */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(250,249,247,0.55) 0%, rgba(250,249,247,0.12) 40%, transparent 70%)",
                  }}
                />
              </div>

              {/* Floating info card — glassmorphism */}
              <div className="glass-gold absolute bottom-5 left-5 right-5 rounded-2xl p-4">
                <p
                  className="mb-2 text-xs font-medium uppercase"
                  style={{ color: "var(--brand)", letterSpacing: "0.16em" }}
                >
                  {hero.heroCard.label}
                </p>
                <div className="flex flex-col gap-2">
                  {hero.heroCard.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <span className="text-xs" style={{ color: "var(--brand)" }}>{item.icon}</span>
                      <div>
                        <span className="text-sm font-medium text-neutral-900">{item.label}</span>
                        <span className="ml-1.5 text-xs text-neutral-500">— {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
