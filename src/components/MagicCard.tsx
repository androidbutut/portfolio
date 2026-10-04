import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

interface MagicCardProps {
  children: ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientFrom?: string
  gradientTo?: string
}

export default function MagicCard({
  children,
  className = '',
  gradientSize = 200,
  gradientColor = 'rgba(0, 240, 255, 0.16)',
  gradientFrom = '#00F0FF',
  gradientTo = '#FFB800',
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const borderBackground = useMotionTemplate`
    linear-gradient(rgba(11, 15, 25, 0.72) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      rgba(0, 240, 255, 0.22) 100%
    ) border-box
  `
  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - bounds.left)
    mouseY.set(event.clientY - bounds.top)
  }

  const resetPointer = () => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }

  return (
    <motion.div
      className={`group relative isolate overflow-hidden border border-transparent ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{ background: borderBackground, borderColor: 'transparent' }}
    >
      <div className="pointer-events-none absolute inset-px z-0 rounded-[inherit] bg-[#0B0F19]/65" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  )
}