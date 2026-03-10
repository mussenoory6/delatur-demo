import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { siteContent } from "@/content/siteContent"

// ─── Types ──────────────────────────────────────────────────────────────────

type Role = "aura" | "user"

interface Message {
  id: string
  role: Role
  text: string
}

// ─── Canned responses ────────────────────────────────────────────────────────

function getResponse(text: string): string {
  const { responses, fallback } = siteContent.aura
  const lower = text.toLowerCase()
  if (lower.includes("tid") || lower.includes("boka")) return responses.tider
  if (lower.includes("pris") || lower.includes("kostar") || lower.includes("behandl"))
    return responses.priser
  if (lower.includes("ansikts") || lower.includes("ansiktsbehandling")) return responses.ansikts
  if (lower.includes("lash") || lower.includes("brow") || lower.includes("frans") || lower.includes("bryn"))
    return responses.lashbrow
  if (lower.includes("eftervård") || lower.includes("efter")) return responses.eftervard
  if (lower.includes("kontakt") || lower.includes("telefon") || lower.includes("mejl") || lower.includes("ring"))
    return responses.kontakt
  if (lower.includes("adress") || lower.includes("var") || lower.includes("hitta") || lower.includes("örebro"))
    return responses.adress
  if (lower.includes("öppettider") || lower.includes("öppet") || lower.includes("stängt"))
    return responses.oppettider
  return fallback
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function LivePulse() {
  return (
    <span className="relative flex items-center justify-center w-2.5 h-2.5">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{
          background: "var(--gold)",
          animation: "auraPulseRing 2.2s cubic-bezier(0.16,1,0.3,1) infinite",
        }}
      />
      <span
        className="relative inline-flex rounded-full w-1.5 h-1.5"
        style={{ background: "var(--gold)" }}
      />
    </span>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isAura = msg.role === "aura"
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className={`flex ${isAura ? "justify-start" : "justify-end"} mb-2.5`}
    >
      <div
        className={`
          max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${isAura
            ? "rounded-tl-sm text-neutral-700"
            : "rounded-tr-sm text-white"
          }
        `}
        style={
          isAura
            ? {
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(185,151,85,0.15)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }
            : {
                background:
                  "linear-gradient(135deg, hsl(174,32%,46%) 0%, hsl(174,38%,38%) 100%)",
                boxShadow: "0 2px 12px rgba(79,148,144,0.28)",
              }
        }
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

function QuickReplyButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="btn-shimmer w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(185,151,85,0.22)",
        color: "hsl(174,38%,30%)",
        fontWeight: 450,
        letterSpacing: "0.01em",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.85)"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(185,151,85,0.45)"
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 4px 20px rgba(185,151,85,0.12)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.55)"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(185,151,85,0.22)"
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 1px 8px rgba(0,0,0,0.04)"
      }}
    >
      {label}
    </button>
  )
}

// ─── Main widget ─────────────────────────────────────────────────────────────

export default function AuraChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [quickRepliesUsed, setQuickRepliesUsed] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "intro",
          role: "aura",
          text: siteContent.aura.intro,
        },
      ])
    }
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  function addUserMessage(text: string) {
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setQuickRepliesUsed(true)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "aura",
          text: getResponse(text),
        },
      ])
    }, 1100)
  }

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    setInput("")
    addUserMessage(trimmed)
  }

  const chatContent = (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes auraPulseRing {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(2.2); opacity: 0;    }
          100% { transform: scale(2.2); opacity: 0;    }
        }
      `}</style>

      {/* ── Toggle button ─────────────────────────────────────── */}
      <motion.button
        onClick={() => { setOpen((v) => !v); setShowBadge(false) }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        aria-label={open ? "Stäng Aura" : "Öppna Aura"}
        className="fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full"
        style={{
          background:
            "linear-gradient(145deg, hsl(38,55%,68%) 0%, hsl(38,42%,52%) 100%)",
          boxShadow:
            "0 8px 32px rgba(185,151,85,0.38), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Notification badge — appears after 5 s */}
        <AnimatePresence>
          {showBadge && !open && (
            <motion.span
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, hsl(38,62%,72%) 0%, hsl(38,48%,55%) 100%)",
                boxShadow: "0 0 0 2.5px white, 0 2px 8px rgba(185,151,85,0.55)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="aura-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }}
            className="fixed bottom-24 right-6 z-[90] w-[340px] max-w-[calc(100vw-3rem)] flex flex-col overflow-hidden"
            style={{
              borderRadius: "1.5rem",
              background: "rgba(253,251,248,0.82)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              border: "1px solid rgba(185,151,85,0.28)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.13), 0 8px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 0.5px rgba(185,151,85,0.12)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(185,151,85,0.14)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)",
              }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(38,55%,68%) 0%, hsl(38,42%,52%) 100%)",
                  boxShadow: "0 2px 10px rgba(185,151,85,0.3)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.41 4.89 3.5 6.17V17l2 1 2-1v-1.83C14.59 13.89 16 11.61 16 9c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="text-base tracking-wide"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "hsl(174,38%,24%)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Aura
                  </span>
                  <LivePulse />
                </div>
                <span
                  className="text-[11px] tracking-widest uppercase"
                  style={{ color: "rgba(79,148,144,0.75)", letterSpacing: "0.14em" }}
                >
                  Alltid tillgänglig
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex flex-col flex-1 overflow-y-auto px-4 pt-4 pb-2"
              style={{ maxHeight: "300px", minHeight: "200px" }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Quick replies */}
              {!quickRepliesUsed && messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-2 mt-1 mb-2"
                >
                  {(siteContent.aura.quickReplies ?? [
                    { id: "tider", label: "Se lediga tider" },
                    { id: "priser", label: "Prislista för behandlingar" },
                    { id: "eftervard", label: "Fråga om eftervård" },
                    { id: "kontakt", label: "Kontakta kliniken" },
                  ]).map((qr) => (
                    <QuickReplyButton
                      key={qr.id}
                      label={qr.label}
                      onClick={() => addUserMessage(qr.label)}
                    />
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex justify-start mb-2"
                  >
                    <div
                      className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm"
                      style={{
                        background: "rgba(255,255,255,0.72)",
                        border: "1px solid rgba(185,151,85,0.15)",
                      }}
                    >
                      {[0, 0.18, 0.36].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ background: "hsl(174,30%,56%)" }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            delay,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={endRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3"
              style={{ borderTop: "1px solid rgba(185,151,85,0.12)" }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(185,151,85,0.2)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Skriv till Aura..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                  style={{
                    color: "hsl(174,38%,24%)",
                    fontFamily: "'Geist Variable', system-ui, sans-serif",
                    letterSpacing: "0.01em",
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 480, damping: 24 }}
                  disabled={!input.trim()}
                  aria-label="Skicka"
                  className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 transition-opacity duration-200"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg, hsl(38,55%,68%) 0%, hsl(38,42%,52%) 100%)"
                      : "rgba(185,151,85,0.18)",
                    opacity: input.trim() ? 1 : 0.5,
                  }}
                >
                  <svg
                    width="13" height="13" viewBox="0 0 24 24"
                    fill="none" stroke="white" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </motion.button>
              </div>
              <p
                className="text-center text-[10px] mt-2 tracking-widest uppercase"
                style={{ color: "rgba(185,151,85,0.6)", letterSpacing: "0.16em" }}
              >
                {siteContent.aura.footer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  return typeof document !== "undefined"
    ? createPortal(chatContent, document.body)
    : chatContent
}
