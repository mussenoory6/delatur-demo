import { useState } from "react"
import { siteContent } from "@/content/siteContent"
import RevealOnScroll from "./RevealOnScroll"

type FormState = {
  fullName: string
  phone: string
  email: string
  treatment: string
  message: string
}

const emptyForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  treatment: "",
  message: "",
}

export default function ContactSection() {
  const { contact, company } = siteContent
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleReset() {
    setForm(emptyForm)
    setSubmitted(false)
  }

  return (
    <section id="kontakt" className="relative overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>
      <div className="section-divider" />

      {/* Decorative blobs */}
      <svg
        className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] opacity-[0.04]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="var(--brand)"
          d="M39.9,-67C51.3,-60.6,59.6,-49.2,66.4,-36.6C73.2,-24,78.5,-10.2,77.6,3.3C76.7,16.8,69.6,30,60.5,41.3C51.4,52.6,40.3,62,27.3,68.4C14.3,74.8,-0.5,78.2,-14.2,74.5C-27.9,70.8,-40.5,60,-51.2,47.9C-61.9,35.8,-70.7,22.4,-73.2,7.5C-75.7,-7.4,-71.9,-23.8,-63.1,-36.4C-54.3,-49,-40.5,-57.8,-26.9,-63.6C-13.3,-69.4,0.1,-72.2,13.7,-71.7C27.3,-71.2,28.5,-73.4,39.9,-67Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="pointer-events-none absolute -bottom-16 -left-24 h-[360px] w-[360px] opacity-[0.03]"
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
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">

          {/* ── Left — Info ── */}
          <div>
            <RevealOnScroll>
              <p className="section-label mb-5">
                <span className="inline-block h-px w-6" style={{ backgroundColor: "var(--brand)" }} />
                05 — Kontakt
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className="mb-5 text-4xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-5xl"
              >
                {contact.title}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mb-10 max-w-sm leading-[1.8] text-neutral-500">
                {contact.description}
              </p>
            </RevealOnScroll>

            {/* Contact details */}
            <RevealOnScroll delay={0.3}>
              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    label: "Adress",
                    content: (
                      <>
                        <p className="text-sm font-medium text-neutral-800">{company.addressLine2}</p>
                        <p className="text-sm text-neutral-600">{company.address}</p>
                      </>
                    ),
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    label: "Telefon",
                    content: (
                      <a href={company.phoneHref} className="text-sm font-medium text-neutral-800 transition hover:text-[var(--brand)]">
                        {company.phone}
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: "E-post",
                    content: (
                      <a href={`mailto:${company.email}`} className="text-sm font-medium text-neutral-800 transition hover:text-[var(--brand)]">
                        {company.email}
                      </a>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "var(--brand-light)", color: "var(--brand)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        className="mb-0.5 text-[10px] font-medium uppercase text-neutral-400"
                        style={{ letterSpacing: "0.16em" }}
                      >
                        {item.label}
                      </p>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Booking button */}
            <RevealOnScroll delay={0.4} className="mt-10">
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-glow btn-glow-cta btn-shimmer inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-md"
              >
                Boka tid via Bokadirekt →
              </a>
            </RevealOnScroll>
          </div>

          {/* ── Right — Form (glassmorphism) ── */}
          <RevealOnScroll delay={0.2}>
            <div
              className="glass-gold rounded-[2rem] p-8 md:p-10"
            >
              {submitted ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center py-10 text-center">
                  <div
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--brand-light)" }}
                  >
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "var(--brand)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="mb-3 text-2xl font-semibold text-neutral-950"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Tack för ditt meddelande!
                  </h3>
                  <p className="mb-8 max-w-xs leading-[1.8] text-neutral-500">
                    Vi återkommer till dig inom 24 timmar. Vi ser fram emot att höra från dig.
                  </p>
                  <button
                    onClick={handleReset}
                    className="rounded-full border px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                    style={{ borderColor: "var(--brand-mid)" }}
                  >
                    Skicka ett nytt meddelande
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <h3
                    className="mb-6 text-xl font-semibold text-neutral-950"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Skicka ett meddelande
                  </h3>

                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Ditt fullständiga namn"
                      required
                      className="w-full rounded-xl border bg-white/80 px-4 py-4 text-base text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-light)]"
                      style={{ borderColor: "var(--brand-mid)" }}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Telefonnummer"
                        className="w-full rounded-xl border bg-white/80 px-4 py-4 text-base text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-light)]"
                        style={{ borderColor: "var(--brand-mid)" }}
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="E-postadress"
                        required
                        className="w-full rounded-xl border bg-white/80 px-4 py-4 text-base text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-light)]"
                        style={{ borderColor: "var(--brand-mid)" }}
                      />
                    </div>

                    <select
                      name="treatment"
                      value={form.treatment}
                      onChange={handleChange}
                      className="w-full rounded-xl border bg-white/80 px-4 py-4 text-base text-neutral-600 outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-light)]"
                      style={{ borderColor: "var(--brand-mid)" }}
                    >
                      <option value="">Vilken behandling är du intresserad av?</option>
                      <option>Botox</option>
                      <option>Fillers</option>
                      <option>Stylage Hydro</option>
                      <option>Konsultation</option>
                    </select>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Berätta gärna mer om dina önskemål..."
                      rows={4}
                      className="w-full resize-none rounded-xl border bg-white/80 px-4 py-4 text-base text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-light)]"
                      style={{ borderColor: "var(--brand-mid)" }}
                    />

                    <button
                      type="submit"
                      className="btn-premium btn-glow btn-glow-teal btn-shimmer w-full rounded-full py-4 text-base font-semibold text-white shadow-md"
                    >
                      Skicka meddelande
                    </button>
                  </form>

                  <p className="mt-4 text-center text-xs text-neutral-400">
                    Svarar vanligtvis inom 24 timmar · Alltid fri konsultation
                  </p>
                </>
              )}
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  )
}
