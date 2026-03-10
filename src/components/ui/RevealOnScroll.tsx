import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type Props = {
  children: React.ReactNode
  delay?: number
  className?: string
  duration?: number
  y?: number
  scale?: boolean
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  duration = 0.95,
  y = 32,
  scale = false,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.96 : 1 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: scale ? 0.96 : 1 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  )
}
