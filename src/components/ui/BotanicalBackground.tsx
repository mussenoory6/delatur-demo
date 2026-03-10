import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const STROKE = "hsl(38, 38%, 32%)"
const SW = "0.9"

// Fern frond — main stem + alternating leaflets
function FernFrond({ x, y, scale = 1, rotate = 0, delay = 0 }: {
  x: number; y: number; scale?: number; rotate?: number; delay?: number
}) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${scale}) rotate(${rotate})`}
      className="botanical-element"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Main curved stem */}
      <path
        d="M 0,0 C -10,55 -22,108 -30,162 C -38,218 -42,270 -44,310"
        stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round"
      />
      {/* Left leaflets */}
      <path d="M -15,60 C -40,50 -60,47 -72,50" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -20,95 C -46,84 -68,82 -80,85" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -25,130 C -52,119 -74,117 -86,121" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -30,165 C -55,155 -76,153 -87,157" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -34,200 C -57,191 -76,189 -85,193" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -38,235 C -59,227 -76,226 -84,229" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      {/* Right leaflets */}
      <path d="M -15,60 C 8,49 26,45 36,48" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -20,95 C 5,83 22,79 31,82" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -25,130 C -2,119 14,115 23,118" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -30,165 C -8,154 8,150 16,153" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -34,200 C -14,191 1,187 8,190" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      {/* Small top leaflets */}
      <path d="M -8,30 C -24,22 -36,20 -43,22" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
      <path d="M -8,30 C 4,20 14,18 19,20" stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" />
    </g>
  )
}

// Minimalist botanical flower — 5 oval petals
function BotanicalFlower({ x, y, r = 38, scale = 1, delay = 0 }: {
  x: number; y: number; r?: number; scale?: number; delay?: number
}) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    const cx = Math.cos(angle) * (r * 0.58)
    const cy = Math.sin(angle) * (r * 0.58)
    const rot = i * 72
    return { cx, cy, rot }
  })

  return (
    <g
      transform={`translate(${x},${y}) scale(${scale})`}
      className="botanical-element"
      style={{ animationDelay: `${delay}s` }}
    >
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.cx} cy={p.cy}
          rx={r * 0.32} ry={r * 0.55}
          transform={`rotate(${p.rot}, ${p.cx}, ${p.cy})`}
          stroke={STROKE} strokeWidth={SW} fill="none"
        />
      ))}
      {/* Center circle */}
      <circle cx={0} cy={0} r={r * 0.18} stroke={STROKE} strokeWidth={SW} fill="none" />
    </g>
  )
}

// Elegant leaf pair
function LeafPair({ x, y, w = 44, h = 80, scale = 1, rotate = 0, delay = 0 }: {
  x: number; y: number; w?: number; h?: number; scale?: number; rotate?: number; delay?: number
}) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${scale}) rotate(${rotate})`}
      className="botanical-element"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Primary leaf */}
      <path
        d={`M 0,0 Q ${w},${-h * 0.25} ${w * 0.5},${-h} Q ${-w * 0.2},${-h * 0.25} 0,0`}
        stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Leaf midrib */}
      <path
        d={`M 0,0 Q ${w * 0.3},${-h * 0.45} ${w * 0.5},${-h}`}
        stroke={STROKE} strokeWidth="0.5" fill="none" strokeLinecap="round"
      />
      {/* Secondary leaf offset */}
      <path
        d={`M 14,8 Q ${w + 14},${-h * 0.22} ${w * 0.5 + 16},${-h * 0.9} Q ${-w * 0.2 + 14},${-h * 0.22} 14,8`}
        stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
  )
}

// Trailing vine with small buds
function TrailingVine({ x, y, scale = 1, delay = 0 }: {
  x: number; y: number; scale?: number; delay?: number
}) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${scale})`}
      className="botanical-element"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Main vine */}
      <path
        d="M 0,0 C 40,30 -20,80 20,120 C 60,160 -10,210 30,250 C 70,290 0,340 40,380"
        stroke={STROKE} strokeWidth={SW} fill="none" strokeLinecap="round"
      />
      {/* Small leaves along vine */}
      <path d="M 20,60 C 36,48 44,42 42,56 C 40,70 28,68 20,60" stroke={STROKE} strokeWidth="0.7" fill="none" />
      <path d="M 8,60 C -8,48 -16,42 -14,56 C -12,70 0,68 8,60" stroke={STROKE} strokeWidth="0.7" fill="none" />
      <path d="M 32,170 C 48,158 56,152 54,166 C 52,180 40,178 32,170" stroke={STROKE} strokeWidth="0.7" fill="none" />
      <path d="M 18,170 C 2,158 -6,152 -4,166 C -2,180 10,178 18,170" stroke={STROKE} strokeWidth="0.7" fill="none" />
      <path d="M 42,280 C 58,268 66,262 64,276 C 62,290 50,288 42,280" stroke={STROKE} strokeWidth="0.7" fill="none" />
      {/* Small buds */}
      <circle cx="20" cy="60" r="3.5" stroke={STROKE} strokeWidth="0.7" fill="none" />
      <circle cx="32" cy="170" r="3.5" stroke={STROKE} strokeWidth="0.7" fill="none" />
      <circle cx="42" cy="280" r="3" stroke={STROKE} strokeWidth="0.7" fill="none" />
    </g>
  )
}

export default function BotanicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -70])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -90])
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.6, 0.4])
  const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.7])

  return (
    <div ref={containerRef} className="botanical-layer" aria-hidden="true">
      <svg
        width="100%" height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.05 }}
      >
        {/* ── Top-right fern — primary feature ── */}
        <motion.g style={{ y: y1, opacity: opacity1 }}>
          <FernFrond x={1300} y={-20} scale={1.2} rotate={20} delay={0} />
        </motion.g>

        {/* ── Bottom-left large fern ── */}
        <motion.g style={{ y: y3 }}>
          <FernFrond x={80} y={560} scale={1.3} rotate={-15} delay={3} />
        </motion.g>

        {/* ── Center-right flower ── */}
        <motion.g style={{ y: y2, opacity: opacity2 }}>
          <BotanicalFlower x={1190} y={500} r={52} delay={1.5} />
        </motion.g>

        {/* ── Small flower top-left ── */}
        <motion.g style={{ y: y1 }}>
          <BotanicalFlower x={140} y={180} r={36} scale={0.85} delay={4} />
        </motion.g>

        {/* ── Top-center leaf pair ── */}
        <motion.g style={{ y: y2 }}>
          <LeafPair x={680} y={90} w={52} h={96} rotate={12} delay={2} />
          <LeafPair x={740} y={130} w={40} h={76} rotate={-8} delay={2.4} />
        </motion.g>

        {/* ── Right-side trailing vine ── */}
        <motion.g style={{ y: y4 }}>
          <TrailingVine x={1380} y={100} scale={1.1} delay={1} />
        </motion.g>

        {/* ── Left-side trailing vine ── */}
        <motion.g style={{ y: y3 }}>
          <TrailingVine x={25} y={300} scale={0.9} delay={5} />
        </motion.g>

        {/* ── Center-bottom leaf cluster ── */}
        <motion.g style={{ y: y4, opacity: opacity2 }}>
          <LeafPair x={700} y={780} w={60} h={110} rotate={0} delay={3.5} />
          <LeafPair x={760} y={820} w={44} h={82} rotate={25} delay={4} />
          <LeafPair x={640} y={800} w={38} h={72} rotate={-20} delay={4.5} />
        </motion.g>

        {/* ── Additional small fern top-left ── */}
        <motion.g style={{ y: y1 }}>
          <FernFrond x={200} y={-40} scale={0.7} rotate={-8} delay={6} />
        </motion.g>

        {/* ── Scattered leaf pairs mid-section ── */}
        <motion.g style={{ y: y2 }}>
          <LeafPair x={1050} y={220} w={36} h={66} rotate={35} delay={2.8} />
          <LeafPair x={1100} y={270} w={28} h={52} rotate={-15} delay={3.2} />
        </motion.g>

        <motion.g style={{ y: y3 }}>
          <BotanicalFlower x={380} y={700} r={40} scale={0.75} delay={5.5} />
        </motion.g>
      </svg>
    </div>
  )
}
