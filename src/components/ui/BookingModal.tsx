import { useState, useEffect, useRef } from "react"
import { useBooking } from "@/context/BookingContext"
import { siteContent } from "@/content/siteContent"

// ── Constants ─────────────────────────────────────────────────────────────────

const SV_DAYS_SHORT = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"]
const SV_DAYS_FULL = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
const SV_MONTHS = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
const SV_MONTHS_LOWER = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
]

// ── Types ─────────────────────────────────────────────────────────────────────

interface SelectedTreatment {
  categoryId: string
  categoryTitle: string
  name: string
  price: string
  duration: string
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function seededRng(seed: number) {
  let s = seed
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b)
    s = s ^ (s >>> 16)
    return (s >>> 0) / 0xffffffff
  }
}

function getUnavailableSlots(date: Date): Set<string> {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  const rng = seededRng(seed)
  return new Set(TIME_SLOTS.filter(() => rng() < 0.3))
}

function getCalendarGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const startPad = (firstDay + 6) % 7
  const totalDays = new Date(year, month + 1, 0).getDate()
  const grid: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

function formatDateSv(d: Date): string {
  return `${SV_DAYS_FULL[d.getDay()]} ${d.getDate()} ${SV_MONTHS_LOWER[d.getMonth()]}`
}

function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
}

// ── Gold Spinner ──────────────────────────────────────────────────────────────

function GoldSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle
          cx="18" cy="18" r="15"
          stroke="var(--gold-border)"
          strokeWidth="1"
        />
        <circle
          cx="18" cy="18" r="15"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray="30 65"
          strokeLinecap="round"
          style={{ animation: "spinGold 0.9s linear infinite", transformOrigin: "center" }}
        />
      </svg>
      <p
        className="text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--gold-dark)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
      >
        Förbereder din session
      </p>
    </div>
  )
}

// ── Floating label input ──────────────────────────────────────────────────────

function FloatingInput({
  id, label, type = "text", value, onChange, textarea = false,
}: {
  id: string; label: string; type?: string
  value: string; onChange: (v: string) => void; textarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  const base =
    "w-full rounded-2xl border bg-neutral-50 px-4 pb-2 pt-6 text-sm text-neutral-900 outline-none transition-all duration-200 resize-none " +
    (focused ? "border-[var(--brand)] bg-white ring-2 ring-[var(--brand)]/10" : "border-neutral-200 hover:border-neutral-300")

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          placeholder=" "
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder=" "
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 font-medium transition-all duration-200"
        style={{
          top: lifted ? "0.45rem" : "1.1rem",
          fontSize: lifted ? "0.625rem" : "0.8125rem",
          letterSpacing: lifted ? "0.06em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? "var(--brand)" : lifted ? "var(--brand-dark)" : "#9ca3af",
        }}
      >
        {label}
      </label>
    </div>
  )
}

// ── Step indicator — ultra minimalist ─────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  const steps = ["Behandling", "Datum", "Tid", "Uppgifter"]
  return (
    <div className="flex items-start justify-center">
      {steps.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2 min-w-[52px]">
              {/* Node */}
              <div
                style={{
                  width: active ? 9 : 6,
                  height: active ? 9 : 6,
                  borderRadius: "50%",
                  backgroundColor: active ? "var(--gold)" : done ? "var(--brand)" : "#d1d5db",
                  boxShadow: active
                    ? "0 0 0 4px rgba(185,151,85,0.12), 0 0 14px rgba(185,151,85,0.35)"
                    : "none",
                  transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
                  flexShrink: 0,
                }}
              />
              {/* Label */}
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: active ? "var(--gold-dark)" : done ? "var(--brand)" : "#b0b7c0",
                  fontWeight: active ? 600 : 400,
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 28,
                  height: 1,
                  marginBottom: 18,
                  backgroundColor: done ? "var(--brand)" : "#e5e7eb",
                  transition: "background-color 0.5s",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Left summary panel ────────────────────────────────────────────────────────

function SummaryPanel({
  selectedTreatment, date, time,
}: {
  selectedTreatment: SelectedTreatment | null
  date: Date | null
  time: string | null
}) {
  const { company } = siteContent

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl p-6" style={{ backgroundColor: "var(--brand-light)" }}>
      {/* Logo + Clinic */}
      <div>
        <img src={company.logoUrl} alt={company.name} className="mb-4 h-8 w-auto object-contain" />
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--brand)" }}>
          Bokning
        </p>
        <h3
          className="mt-1 text-xl font-semibold leading-snug text-neutral-900"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {company.treater}
        </h3>
        <p className="mt-0.5 text-xs text-neutral-500">{company.treaterTitle}</p>

        <div className="my-5 border-t border-neutral-200" />

        {/* Summary rows */}
        <div className="space-y-4">
          {/* Treatment row — two-level: category + specific */}
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">💉</span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">Behandling</p>
              {selectedTreatment ? (
                <div style={{ animation: "fadeUp 0.3s ease both" }}>
                  <p
                    className="mt-0.5 text-[11px] font-medium uppercase tracking-wider"
                    style={{ color: "var(--brand)" }}
                  >
                    {selectedTreatment.categoryTitle}
                  </p>
                  <p
                    className="mt-0.5 text-sm font-semibold leading-snug"
                    style={{ color: "#1a2e2e", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {selectedTreatment.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--brand-dark)" }}>{selectedTreatment.price}</p>
                </div>
              ) : (
                <p className="mt-0.5 text-sm italic text-neutral-400">Ej valt</p>
              )}
            </div>
          </div>

          <div className="border-t border-neutral-200" />

          <SummaryRow
            icon="📅"
            label="Datum"
            value={date ? formatDateSv(date) : null}
          />
          <div className="border-t border-neutral-200" />
          <SummaryRow
            icon="🕐"
            label="Tid"
            value={time ?? null}
          />
        </div>
      </div>

      {/* Clinic contact */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white/60 p-4 text-xs text-neutral-600 space-y-1">
        <p className="font-medium text-neutral-800">{company.addressLine2}</p>
        <p>{company.address}</p>
        <a href={company.phoneHref} className="block transition hover:text-neutral-900">{company.phone}</a>
        <a href={`mailto:${company.email}`} className="block transition hover:text-neutral-900">{company.email}</a>
      </div>
    </div>
  )
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string | null }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-base mt-0.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">{label}</p>
        {value ? (
          <p
            className="mt-0.5 text-sm font-medium"
            style={{ color: "#1a2e2e", animation: "fadeUp 0.3s ease both" }}
          >
            {value}
          </p>
        ) : (
          <p className="mt-0.5 text-sm italic text-neutral-400">Ej valt</p>
        )}
      </div>
    </div>
  )
}

// ── Step 1: Treatment — categories + slide-in sub-menu ────────────────────────

function Step1Treatment({
  selectedTreatment,
  onSelect,
  initialCategoryId,
}: {
  selectedTreatment: SelectedTreatment | null
  onSelect: (t: SelectedTreatment) => void
  initialCategoryId: string | null
}) {
  const categories = siteContent.booking.categories
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategoryId ?? selectedTreatment?.categoryId ?? null
  )
  const [subDir, setSubDir] = useState<"in" | "out">("in")
  const [subKey, setSubKey] = useState(0)

  function openCategory(id: string) {
    setSubDir("in")
    setSubKey(k => k + 1)
    setActiveCategory(id)
  }

  function goBack() {
    setSubDir("out")
    setSubKey(k => k + 1)
    setActiveCategory(null)
  }

  const activeCat = categories.find(c => c.id === activeCategory)

  return (
    <div>
      <h2
        className="mb-1 text-2xl font-semibold text-neutral-950"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Välj behandling
      </h2>
      <p className="mb-6 text-sm text-neutral-500">
        {activeCategory ? "Välj den specifika behandlingen du önskar." : "Välj en behandlingskategori för att se alla alternativ."}
      </p>

      {/* Categories */}
      {!activeCategory && (
        <div
          key="categories"
          style={{ animation: subDir === "out" ? "slideFromLeft 0.38s cubic-bezier(0.23,1,0.32,1) both" : "fadeIn 0.3s ease both" }}
          className="grid gap-3"
        >
          {categories.map((cat, i) => {
            const isChosen = selectedTreatment?.categoryId === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => openCategory(cat.id)}
                className="group w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderColor: isChosen ? "var(--gold)" : "#e5e7eb",
                  backgroundColor: isChosen ? "rgba(185,151,85,0.04)" : "white",
                  boxShadow: isChosen ? "inset 0 0 28px rgba(185,151,85,0.06)" : "none",
                  animation: `staggerIn 0.35s ${i * 80}ms both`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3
                        className="text-xl font-semibold text-neutral-950"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {cat.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{cat.subtitle}</p>
                      <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--brand)" }}
                    >
                      {cat.fromPrice}
                    </span>
                    <div
                      className="flex items-center gap-1 text-[11px] tracking-wide uppercase transition-all duration-300 group-hover:gap-2"
                      style={{ color: isChosen ? "var(--gold-dark)" : "var(--brand)" }}
                    >
                      {isChosen ? (
                        <>
                          <span className="text-[10px]">✦</span>
                          <span>Vald</span>
                        </>
                      ) : (
                        <>
                          <span>Se alternativ</span>
                          <span>›</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {isChosen && selectedTreatment && (
                  <div
                    className="mt-3 pt-3 border-t"
                    style={{ borderColor: "rgba(185,151,85,0.2)" }}
                  >
                    <p className="text-xs" style={{ color: "var(--gold-dark)" }}>
                      Vald behandling: <span className="font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{selectedTreatment.name}</span>
                    </p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Sub-menu */}
      {activeCategory && activeCat && (
        <div
          key={`sub-${subKey}`}
          style={{
            animation: subDir === "in"
              ? "slideFromRight 0.38s cubic-bezier(0.23,1,0.32,1) both"
              : "slideFromLeft 0.38s cubic-bezier(0.23,1,0.32,1) both",
          }}
        >
          {/* Back button */}
          <button
            onClick={goBack}
            className="mb-5 flex items-center gap-2 transition-all duration-200 hover:gap-3 group"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              style={{ color: "var(--brand)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span
              className="text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "var(--brand)" }}
            >
              Tillbaka till kategorier
            </span>
          </button>

          {/* Category header */}
          <div className="mb-4 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeCat.icon}</span>
              <div>
                <h3
                  className="text-xl font-semibold text-neutral-950"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {activeCat.title}
                </h3>
                <p className="text-xs text-neutral-500">{activeCat.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Treatment list */}
          <div className="space-y-2.5">
            {activeCat.treatments.map((t, i) => {
              const isSelected =
                selectedTreatment?.categoryId === activeCategory &&
                selectedTreatment?.name === t.name

              return (
                <button
                  key={t.name}
                  onClick={() =>
                    onSelect({
                      categoryId: activeCat.id,
                      categoryTitle: activeCat.title,
                      name: t.name,
                      price: t.price,
                      duration: t.duration,
                    })
                  }
                  className="group w-full rounded-xl p-4 text-left transition-all duration-300 hover:-translate-y-px"
                  style={{
                    border: isSelected ? "1px solid var(--gold)" : "1px solid #e5e7eb",
                    backgroundColor: isSelected ? "rgba(185,151,85,0.04)" : "white",
                    boxShadow: isSelected
                      ? "inset 0 0 24px rgba(185,151,85,0.08), 0 2px 12px rgba(185,151,85,0.08)"
                      : "none",
                    animation: `staggerIn 0.3s ${i * 55}ms both`,
                    transition: "border-color 0.25s, box-shadow 0.25s, transform 0.2s, background-color 0.25s",
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,151,85,0.5)"
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = "rgba(185,151,85,0.02)"
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = "white"
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span style={{ color: "var(--gold)", fontSize: 10 }}>✦</span>
                        )}
                        <h4
                          className="text-base font-semibold text-neutral-900 leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {t.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{t.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-base font-semibold"
                        style={{
                          color: isSelected ? "var(--gold-dark)" : "var(--brand-dark)",
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {t.price}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">⏱ {t.duration}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Step 2: Date (Calendar) ───────────────────────────────────────────────────

function Step2Date({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [viewMonth, setViewMonth] = useState(() => {
    const m = new Date(); m.setDate(1); m.setHours(0, 0, 0, 0); return m
  })
  const [calKey, setCalKey] = useState(0)

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const grid = getCalendarGrid(year, month)

  function prevMonth() {
    const m = new Date(viewMonth); m.setMonth(m.getMonth() - 1)
    setViewMonth(m); setCalKey(k => k + 1)
  }
  function nextMonth() {
    const m = new Date(viewMonth); m.setMonth(m.getMonth() + 1)
    setViewMonth(m); setCalKey(k => k + 1)
  }

  return (
    <div>
      <h2
        className="mb-1 text-2xl font-semibold text-neutral-950"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Välj datum
      </h2>
      <p className="mb-6 text-sm text-neutral-500">Tillgängliga dagar är markerade. Helger är stängda.</p>

      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          ‹
        </button>
        <h3 className="text-base font-semibold text-neutral-800">
          {SV_MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {SV_DAYS_SHORT.map(d => (
          <div key={d} className="py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-400">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div key={calKey} className="grid grid-cols-7 gap-0.5">
        {grid.map((day, idx) => {
          if (day === null) return <div key={`pad-${idx}`} />

          const thisDate = new Date(year, month, day)
          const dayOfWeek = thisDate.getDay()
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
          const isPast = thisDate < today
          const disabled = isWeekend || isPast
          const isToday = isSameDay(thisDate, today)
          const isSelected = selected ? isSameDay(thisDate, selected) : false

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(new Date(year, month, day))}
              className="flex aspect-square items-center justify-center rounded-full text-sm font-medium transition-all duration-200"
              style={{
                animation: `calFadeIn 0.3s ${(idx % 7) * 30 + Math.floor(idx / 7) * 20}ms both`,
                backgroundColor: isSelected ? "var(--brand)" : "transparent",
                color: disabled ? "#d1d5db" : isSelected ? "white" : isToday ? "var(--brand)" : "inherit",
                cursor: disabled ? "not-allowed" : "pointer",
                border: isToday && !isSelected ? "2px solid var(--brand)" : "2px solid transparent",
                opacity: disabled ? 0.4 : 1,
              }}
              onMouseEnter={e => { if (!disabled && !isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-light)" }}
              onMouseLeave={e => { if (!disabled && !isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent" }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 3: Time ──────────────────────────────────────────────────────────────

function Step3Time({
  date, selectedTreatment, selected, onSelect,
}: {
  date: Date | null
  selectedTreatment: SelectedTreatment | null
  selected: string | null
  onSelect: (t: string) => void
}) {
  const unavailable = date ? getUnavailableSlots(date) : new Set<string>()

  return (
    <div>
      <h2
        className="mb-1 text-2xl font-semibold text-neutral-950"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Välj tid
      </h2>
      {date && selectedTreatment && (
        <p className="mb-5 text-sm font-medium" style={{ color: "var(--brand)" }}>
          {formatDateSv(date).charAt(0).toUpperCase() + formatDateSv(date).slice(1)}
          {" · "}{selectedTreatment.name}{" · "}{selectedTreatment.duration}
        </p>
      )}
      {!date && <p className="mb-5 text-sm text-neutral-500">Välj en dag för att se tillgängliga tider.</p>}

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
        {TIME_SLOTS.map((slot, i) => {
          const booked = unavailable.has(slot)
          const isSelected = selected === slot
          return (
            <button
              key={slot}
              disabled={booked}
              onClick={() => !booked && onSelect(slot)}
              className="rounded-xl border px-2 py-2.5 text-sm font-medium transition-all duration-200"
              style={{
                animation: `calFadeIn 0.25s ${i * 20}ms both`,
                borderColor: isSelected ? "var(--brand)" : booked ? "#e5e7eb" : "#d1d5db",
                backgroundColor: isSelected ? "var(--brand)" : "white",
                color: isSelected ? "white" : booked ? "#9ca3af" : "inherit",
                cursor: booked ? "not-allowed" : "pointer",
                textDecoration: booked ? "line-through" : "none",
                opacity: booked ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!booked && !isSelected) { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-light)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)" } }}
              onMouseLeave={e => { if (!booked && !isSelected) { (e.currentTarget as HTMLElement).style.backgroundColor = "white"; (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db" } }}
            >
              {slot}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        <span className="mr-1">●</span>Grå tider är redan bokade
      </p>
    </div>
  )
}

// ── Step 4: Details form ──────────────────────────────────────────────────────

function Step4Details({
  form, setForm, selectedTreatment, date, time,
}: {
  form: FormData
  setForm: (f: FormData) => void
  selectedTreatment: SelectedTreatment | null
  date: Date | null
  time: string | null
}) {
  const up = (k: keyof FormData) => (v: string | boolean) => setForm({ ...form, [k]: v })

  return (
    <div>
      <h2
        className="mb-1 text-2xl font-semibold text-neutral-950"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Dina uppgifter
      </h2>
      <p className="mb-5 text-sm text-neutral-500">Fyll i dina kontaktuppgifter så bekräftar vi din bokning.</p>

      {selectedTreatment && date && time && (
        <div
          className="mb-5 rounded-2xl border p-4 text-sm"
          style={{ borderColor: "var(--brand)", backgroundColor: "var(--brand-light)" }}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-medium" style={{ color: "var(--brand-dark)" }}>
            <span>✦ {selectedTreatment.name}</span>
            <span>✦ {formatDateSv(date).charAt(0).toUpperCase() + formatDateSv(date).slice(1)}</span>
            <span>✦ kl. {time}</span>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        <FloatingInput id="name" label="Namn" value={form.name} onChange={up("name") as (v: string) => void} />
        <FloatingInput id="email" label="E-postadress" type="email" value={form.email} onChange={up("email") as (v: string) => void} />
        <FloatingInput id="phone" label="Telefon" type="tel" value={form.phone} onChange={up("phone") as (v: string) => void} />
        <FloatingInput id="message" label="Meddelande (valfritt)" value={form.message} onChange={up("message") as (v: string) => void} textarea />
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3">
        <div className="relative mt-0.5 shrink-0">
          <input
            type="checkbox"
            className="sr-only"
            checked={form.consent}
            onChange={e => up("consent")(e.target.checked)}
          />
          <div
            className="flex h-5 w-5 items-center justify-center rounded border-2 transition-all"
            style={{
              borderColor: form.consent ? "var(--brand)" : "#d1d5db",
              backgroundColor: form.consent ? "var(--brand)" : "white",
            }}
          >
            {form.consent && (
              <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-neutral-600">
          Jag godkänner att {siteContent.company.name} kontaktar mig angående min bokning
        </span>
      </label>
    </div>
  )
}

// ── Step 5: Confirmation ──────────────────────────────────────────────────────

function Step5Confirmation({
  selectedTreatment, date, time, form,
}: {
  selectedTreatment: SelectedTreatment | null
  date: Date | null
  time: string | null
  form: FormData
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">
        <svg width="80" height="80" viewBox="0 0 52 52">
          <circle
            cx="26" cy="26" r="24"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2"
            style={{
              strokeDasharray: "151",
              strokeDashoffset: "151",
              animation: "checkCircle 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.1s forwards",
            }}
          />
          <path
            fill="none"
            stroke="var(--brand)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.5 27l8 8 15-15"
            style={{
              strokeDasharray: "30",
              strokeDashoffset: "30",
              animation: "checkMark 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.7s forwards",
            }}
          />
        </svg>
      </div>

      <h2
        className="text-3xl font-semibold italic text-neutral-950"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        Bokning mottagen!
      </h2>
      <p className="mt-2 text-sm text-neutral-500">
        Tack {form.name ? form.name.split(" ")[0] : ""}! Vi återkommer med bekräftelse på {form.email || "din e-post"}.
      </p>

      {selectedTreatment && date && time && (
        <div
          className="mt-6 w-full rounded-2xl border p-5 text-left"
          style={{ borderColor: "var(--brand)", backgroundColor: "var(--brand-light)" }}
        >
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-600">Behandling</span>
              <span className="font-semibold" style={{ color: "var(--brand-dark)" }}>{selectedTreatment.name}</span>
            </div>
            <div className="border-t border-neutral-200" />
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-600">Datum</span>
              <span className="font-semibold" style={{ color: "var(--brand-dark)" }}>
                {formatDateSv(date).charAt(0).toUpperCase() + formatDateSv(date).slice(1)}
              </span>
            </div>
            <div className="border-t border-neutral-200" />
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-600">Tid</span>
              <span className="font-semibold" style={{ color: "var(--brand-dark)" }}>kl. {time}</span>
            </div>
            <div className="border-t border-neutral-200" />
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-600">Plats</span>
              <span className="font-semibold text-neutral-800">{siteContent.company.addressLine2 || siteContent.company.address}</span>
            </div>
          </div>
        </div>
      )}

      <p className="mt-6 text-[10px] uppercase tracking-widest text-neutral-400">
        ⚠ Detta är en demo — ingen riktig bokning skickas
      </p>
    </div>
  )
}

// ── Main Modal ────────────────────────────────────────────────────────────────

export default function BookingModal() {
  const { isOpen, initialCategoryId, closeBooking } = useBooking()

  const [step, setStep] = useState(1)
  const [slideDir, setSlideDir] = useState<"forward" | "back">("forward")
  const [contentKey, setContentKey] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState<SelectedTreatment | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", message: "", consent: false })
  const [shimmerBtn, setShimmerBtn] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setDate(null)
      setTime(null)
      setForm({ name: "", email: "", phone: "", message: "", consent: false })
      setSelectedTreatment(null)
      setContentKey(k => k + 1)
      setIsLoading(false)
    }
  }, [isOpen, initialCategoryId])

  // Shimmer on treatment selection
  useEffect(() => {
    if (selectedTreatment) {
      setShimmerBtn(true)
      const t = setTimeout(() => setShimmerBtn(false), 900)
      return () => clearTimeout(t)
    }
  }, [selectedTreatment])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeBooking() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [closeBooking])

  function navigate(dir: "forward" | "back") {
    if (dir === "forward") {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setSlideDir("forward")
        setContentKey(k => k + 1)
        setStep(s => s + 1)
      }, 480)
    } else {
      setSlideDir("back")
      setContentKey(k => k + 1)
      setStep(s => s - 1)
    }
  }

  function canAdvance(): boolean {
    if (step === 1) return selectedTreatment !== null
    if (step === 2) return date !== null
    if (step === 3) return time !== null
    if (step === 4) return form.name.trim() !== "" && form.email.trim() !== "" && form.consent
    return false
  }

  if (!isOpen) return null

  const animStyle: React.CSSProperties = {
    animation: `${slideDir === "forward" ? "slideFromRight" : "slideFromLeft"} 0.35s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
  }

  return (
    <>
      <style>{`
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes calFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes checkCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes checkMark {
          to { stroke-dashoffset: 0; }
        }
        @keyframes staggerIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinGold {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes btnAppear {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .btn-shimmer {
          background: linear-gradient(
            90deg,
            var(--brand) 0%,
            var(--brand) 35%,
            hsl(174, 40%, 62%) 50%,
            var(--brand) 65%,
            var(--brand) 100%
          );
          background-size: 200% auto;
          animation: shimmer 0.85s linear;
        }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          animation: "overlayIn 0.3s ease forwards",
        }}
        onClick={e => { if (e.target === overlayRef.current) closeBooking() }}
      >
        {/* Modal window */}
        <div
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          style={{
            maxHeight: "90vh",
            animation: "modalIn 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards",
          }}
        >
          {/* Close button */}
          <button
            onClick={closeBooking}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition hover:bg-neutral-50 hover:text-neutral-800"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex h-full" style={{ maxHeight: "90vh" }}>
            {/* Left summary panel */}
            {step < 5 && (
              <div className="hidden w-[38%] shrink-0 overflow-y-auto md:block" style={{ backgroundColor: "var(--brand-light)" }}>
                <div className="p-6">
                  <SummaryPanel selectedTreatment={selectedTreatment} date={date} time={time} />
                </div>
              </div>
            )}

            {/* Right content panel */}
            <div className={`flex flex-1 flex-col overflow-y-auto ${step === 5 ? "w-full" : ""}`}>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                {/* Step indicator */}
                {step < 5 && (
                  <div className="mb-8">
                    <StepIndicator current={step} />
                  </div>
                )}

                {/* Content area — spinner or step content */}
                <div className="flex-1">
                  {isLoading ? (
                    <GoldSpinner />
                  ) : (
                    <div key={contentKey} style={animStyle}>
                      {step === 1 && (
                        <Step1Treatment
                          selectedTreatment={selectedTreatment}
                          onSelect={t => setSelectedTreatment(t)}
                          initialCategoryId={initialCategoryId}
                        />
                      )}
                      {step === 2 && (
                        <Step2Date selected={date} onSelect={d => setDate(d)} />
                      )}
                      {step === 3 && (
                        <Step3Time
                          date={date}
                          selectedTreatment={selectedTreatment}
                          selected={time}
                          onSelect={t => setTime(t)}
                        />
                      )}
                      {step === 4 && (
                        <Step4Details
                          form={form}
                          setForm={setForm}
                          selectedTreatment={selectedTreatment}
                          date={date}
                          time={time}
                        />
                      )}
                      {step === 5 && (
                        <Step5Confirmation
                          selectedTreatment={selectedTreatment}
                          date={date}
                          time={time}
                          form={form}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Navigation footer */}
                {!isLoading && (
                  <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
                    {step > 1 && step < 5 ? (
                      <button
                        onClick={() => navigate("back")}
                        className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-800"
                      >
                        ← Tillbaka
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 && (
                      <button
                        onClick={() => navigate("forward")}
                        disabled={!canAdvance()}
                        className={[
                          "rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40",
                          shimmerBtn && step === 1 && canAdvance() ? "btn-shimmer" : "",
                        ].join(" ")}
                        style={{
                          backgroundColor: shimmerBtn && step === 1 && canAdvance() ? undefined : "var(--brand)",
                          animation: canAdvance() && step === 1 && selectedTreatment ? "btnAppear 0.4s cubic-bezier(0.23,1,0.32,1) both" : "none",
                        }}
                      >
                        Fortsätt →
                      </button>
                    )}

                    {step === 4 && (
                      <button
                        onClick={() => navigate("forward")}
                        disabled={!canAdvance()}
                        className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                        style={{ backgroundColor: "var(--brand)" }}
                      >
                        Bekräfta bokning ✓
                      </button>
                    )}

                    {step === 5 && (
                      <button
                        onClick={closeBooking}
                        className="mx-auto rounded-full border border-neutral-200 px-6 py-2.5 text-sm font-medium text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-800"
                      >
                        Stäng
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
