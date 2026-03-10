import { siteContent } from "@/content/siteContent"

export default function GoogleReviews() {
  if (!siteContent.googleReviews.show) return null

  return (
    <section className="bg-white px-4 py-16 md:px-6">
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest" style={{ color: "var(--brand)" }}>
          Google Reviews
        </p>
        <h2
          className="text-3xl font-semibold text-neutral-950 md:text-4xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Vad Google-recensenter säger
        </h2>
        <p className="mt-4 text-neutral-500 text-sm">
          Google Reviews widget — aktivera i siteContent.googleReviews.show
        </p>
      </div>
    </section>
  )
}
