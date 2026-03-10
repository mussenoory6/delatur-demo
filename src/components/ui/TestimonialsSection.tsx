import { motion } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import RevealOnScroll from "./RevealOnScroll"

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--brand)" }}>
          <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const { testimonials } = siteContent
  const [featured, ...rest] = testimonials.items

  return (
    <section
      id="omdomen"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="section-divider" />

      {/* Decorative blob */}
      <svg
        className="pointer-events-none absolute -left-48 top-1/4 h-[500px] w-[500px] opacity-[0.035]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="var(--brand)"
          d="M44.7,-76.3C56.9,-69.5,65.4,-56.1,71.9,-41.9C78.4,-27.7,82.9,-12.7,81.5,1.8C80.1,16.3,72.8,30.2,63.3,42.2C53.8,54.2,42.1,64.3,28.6,70.8C15.1,77.3,-0.2,80.2,-15.4,77.4C-30.6,74.6,-45.6,66.2,-57.2,54.4C-68.8,42.6,-77,27.4,-79.1,11.3C-81.2,-4.8,-77.2,-21.8,-69.1,-36.3C-61,-50.8,-48.8,-62.8,-35,-70.2C-21.2,-77.6,-5.8,-80.4,9.8,-80.5C25.4,-80.6,32.5,-83.1,44.7,-76.3Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-32 md:px-8 md:py-44">

        {/* Header */}
        <RevealOnScroll>
          <p className="section-label mb-5">
            <span className="inline-block h-px w-6" style={{ backgroundColor: "var(--brand)" }} />
            04 — Omdömen
          </p>
        </RevealOnScroll>

        {/* Featured large quote */}
        <RevealOnScroll delay={0.1} className="mb-14 max-w-3xl">
          <Stars count={featured.rating} />
          <blockquote
            className="mt-5 text-2xl font-medium italic leading-snug text-neutral-800 md:text-3xl lg:text-4xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            "{featured.text}"
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              {featured.name[0]}
            </div>
            <p className="text-sm font-medium text-neutral-700">{featured.name}</p>
          </div>
        </RevealOnScroll>

        {/* Rest of testimonials */}
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((item, i) => (
            <RevealOnScroll key={item.name} delay={(i + 1) * 0.1}>
              <motion.div
                className="testimonial-card rounded-[1.5rem] p-7"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(185,151,85,0.16)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 56px rgba(0,0,0,0.09), 0 4px 16px rgba(185,151,85,0.08)",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Stars count={item.rating} />
                <p className="mt-4 leading-[1.8] text-neutral-600">"{item.text}"</p>
                <div className="mt-5 flex items-center gap-3 border-t pt-5" style={{ borderColor: "var(--gold-border)" }}>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    {item.name[0]}
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Trust badges */}
        <RevealOnScroll delay={0.3} className="mt-14 flex flex-wrap items-center gap-4">
          {/* Google Reviews badge */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=delatur"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-white px-5 py-4 transition hover:shadow-md"
            style={{ border: "1px solid rgba(185,151,85,0.18)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <div>
              <p className="text-[11px] font-medium uppercase text-neutral-400" style={{ letterSpacing: "0.14em" }}>
                Google Reviews
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-3 w-3" viewBox="0 0 24 24" fill="#FBBC05">
                      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-800">5.0</span>
              </div>
            </div>
          </a>

          {/* Bokadirekt badge */}
          <a
            href="https://www.bokadirekt.se"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-white px-5 py-4 transition hover:shadow-md"
            style={{ border: "1px solid rgba(185,151,85,0.18)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: "var(--brand)" }}
            >
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase text-neutral-400" style={{ letterSpacing: "0.14em" }}>
                Bokadirekt
              </p>
              <p className="mt-0.5 text-sm font-semibold text-neutral-800">Verifierad klinik</p>
            </div>
          </a>
        </RevealOnScroll>

      </div>
    </section>
  )
}
