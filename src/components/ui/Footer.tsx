import { siteContent } from "@/content/siteContent"

export default function Footer() {
  const { company } = siteContent

  return (
    <footer style={{ backgroundColor: "var(--cream-dark)", borderTop: "1px solid var(--brand-mid)" }}>
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <img
              src={company.logoUrl}
              alt={company.name}
              className="h-8 w-auto object-contain opacity-80"
            />
            <p className="max-w-[240px] text-xs leading-relaxed text-neutral-500">
              Estetiska injektionsbehandlingar i Örebro av {company.treater}, {company.treaterTitle.toLowerCase()}.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 text-sm text-neutral-500 md:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-500">
              <a href="#om-oss" className="transition hover:text-neutral-800">Om oss</a>
              <a href="#tjanster" className="transition hover:text-neutral-800">Behandlingar</a>
              <a href="#omdomen" className="transition hover:text-neutral-800">Omdömen</a>
              <a href="#kontakt" className="transition hover:text-neutral-800">Kontakt</a>
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition"
                style={{ color: "var(--brand)" }}
              >
                Boka tid →
              </a>
            </div>
            <p className="text-xs text-neutral-400">
              {company.addressLine2} · {company.address}
            </p>
            <p className="text-xs text-neutral-400">
              <a href={company.phoneHref} className="hover:text-neutral-600 transition">{company.phone}</a>
              {" · "}
              <a href={`mailto:${company.email}`} className="hover:text-neutral-600 transition">{company.email}</a>
            </p>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-1 pt-8 text-xs text-neutral-400 md:flex-row md:justify-between"
          style={{ borderTop: "1px solid var(--sand)" }}
        >
          <p>© {new Date().getFullYear()} {company.name}. Alla rättigheter förbehållna.</p>
          <p>Estetiska injektionsbehandlingar · Örebro</p>
        </div>
      </div>
    </footer>
  )
}
