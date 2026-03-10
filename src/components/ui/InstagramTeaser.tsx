import { motion } from "framer-motion"
import { siteContent } from "@/content/siteContent"
import RevealOnScroll from "./RevealOnScroll"

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=85",
    alt: "Kliniken",
  },
  {
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&q=85",
    alt: "Behandling",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=85",
    alt: "Resultat",
  },
  {
    src: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&q=85",
    alt: "Nöjda kunder",
  },
]

const INSTAGRAM_HANDLE = siteContent.instagram?.handle ?? "@kliniken"
const INSTAGRAM_URL = siteContent.instagram?.url ?? "https://www.instagram.com/"

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" />
    </svg>
  )
}

export default function InstagramTeaser() {
  return (
    <section
      className="px-4 py-20 md:px-6 md:py-24"
      style={{ backgroundColor: "var(--cream-dark)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <RevealOnScroll className="mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-sm font-medium uppercase"
              style={{ color: "var(--brand)", letterSpacing: "0.18em" }}
            >
              Instagram
            </p>
            <h2
              className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Följ vår resa
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--brand)" }}
          >
            <span>{INSTAGRAM_HANDLE}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </RevealOnScroll>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {GALLERY.map((img, i) => (
            <RevealOnScroll key={i} delay={i * 0.07}>
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(79,148,144,0.62) 0%, rgba(185,151,85,0.48) 100%)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      <InstagramIcon />
                    </div>
                  </motion.div>
                </div>

                {/* Subtle gold bottom shimmer */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(185,151,85,0.22) 0%, transparent 100%)",
                  }}
                />
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.3} className="mt-8 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all"
            style={{
              border: "1px solid rgba(185,151,85,0.35)",
              color: "var(--brand-dark)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(185,151,85,0.65)"
              e.currentTarget.style.backgroundColor = "rgba(185,151,85,0.06)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(185,151,85,0.35)"
              e.currentTarget.style.backgroundColor = ""
            }}
          >
            <InstagramIcon />
            <span>Följ oss på Instagram</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
