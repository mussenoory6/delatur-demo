import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const trail1Ref  = useRef<HTMLDivElement>(null)
  const trail2Ref  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const t1     = trail1Ref.current
    const t2     = trail2Ref.current
    if (!cursor || !t1 || !t2) return

    // Main cursor
    let mx = -100, my = -100, tx = -100, ty = -100
    // Trail 1 (follows a bit slower)
    let t1x = -100, t1y = -100
    // Trail 2 (slowest / most lagged)
    let t2x = -100, t2y = -100

    let animId: number
    let isOverButton = false

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      cursor.style.opacity = "1"
      t1.style.opacity = "1"
      t2.style.opacity = "1"

      // Track mouse position within .btn-glow buttons for the radial light effect
      const target = e.target as HTMLElement
      const glowBtn = target.closest(".btn-glow") as HTMLElement | null
      if (glowBtn) {
        isOverButton = true
        const rect = glowBtn.getBoundingClientRect()
        const bx = ((e.clientX - rect.left) / rect.width) * 100
        const by = ((e.clientY - rect.top)  / rect.height) * 100
        glowBtn.style.setProperty("--mx", `${bx}%`)
        glowBtn.style.setProperty("--my", `${by}%`)
      } else {
        isOverButton = false
      }
    }

    const onLeave = () => {
      cursor.style.opacity = "0"
      t1.style.opacity = "0"
      t2.style.opacity = "0"
    }

    const animate = () => {
      // Main cursor — snappy
      mx += (tx - mx) * 0.18
      my += (ty - my) * 0.18

      // Trail 1 — medium lag
      t1x += (tx - t1x) * 0.10
      t1y += (ty - t1y) * 0.10

      // Trail 2 — most lagged
      t2x += (tx - t2x) * 0.065
      t2y += (ty - t2y) * 0.065

      cursor.style.left = `${mx}px`
      cursor.style.top  = `${my}px`
      t1.style.left = `${t1x}px`
      t1.style.top  = `${t1y}px`
      t2.style.left = `${t2x}px`
      t2.style.top  = `${t2y}px`

      // Expand cursor ring when hovering interactive elements
      const hovering = document.querySelector(":hover:is(a, button, [role=button], .btn-glow, .service-card)")
      const size = hovering ? "60px" : "40px"
      cursor.style.width  = size
      cursor.style.height = size

      // Pulse the outer trail ring when over a button
      t2.style.transform = isOverButton
        ? "translate(-50%, -50%) scale(1.15)"
        : "translate(-50%, -50%) scale(1)"

      animId = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    animId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* Primary cursor ring */}
      <div
        ref={cursorRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
      />
      {/* Trail 1 — medium sized, soft */}
      <div
        ref={trail1Ref}
        style={{
          position: "fixed",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.45)",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          opacity: 0,
          transition: "opacity 0.4s ease",
          willChange: "left, top",
        }}
      />
      {/* Trail 2 — largest, most transparent, golden tint */}
      <div
        ref={trail2Ref}
        style={{
          position: "fixed",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "1px solid rgba(185, 151, 85, 0.4)",
          pointerEvents: "none",
          zIndex: 99997,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          willChange: "left, top",
        }}
      />
    </>
  )
}
