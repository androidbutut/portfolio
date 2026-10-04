import { useEffect, useState } from 'react'

const cellSize = 44

export default function InteractiveGridPattern() {
  const [viewport, setViewport] = useState({ width: 1440, height: 900 })
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    const updateHoveredCell = (event: PointerEvent) => {
      const columns = Math.ceil(window.innerWidth / cellSize)
      const rows = Math.ceil(window.innerHeight / cellSize)
      const svgWidth = columns * cellSize
      const svgHeight = rows * cellSize
      const column = Math.min(columns - 1, Math.floor((event.clientX / window.innerWidth) * svgWidth / cellSize))
      const row = Math.min(rows - 1, Math.floor((event.clientY / window.innerHeight) * svgHeight / cellSize))
      const nextCell = row * columns + column

      setHoveredCell((currentCell) => currentCell === nextCell ? currentCell : nextCell)
    }

    const clearHoveredCell = (event: PointerEvent) => {
      if (!event.relatedTarget) setHoveredCell(null)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('pointermove', updateHoveredCell, { passive: true })
    window.addEventListener('pointerout', clearHoveredCell)
    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('pointermove', updateHoveredCell)
      window.removeEventListener('pointerout', clearHoveredCell)
    }
  }, [])

  const columns = Math.ceil(viewport.width / cellSize)
  const rows = Math.ceil(viewport.height / cellSize)
  const width = columns * cellSize
  const height = rows * cellSize

  return (
    <svg
      className="interactive-grid-pattern"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns
        const row = Math.floor(index / columns)
        const distance =
          hoveredCell === null
            ? Number.POSITIVE_INFINITY
            : Math.max(Math.abs(column - (hoveredCell % columns)), Math.abs(row - Math.floor(hoveredCell / columns)))
        const fill = distance === 0
          ? 'rgba(0, 240, 255, 0.2)'
          : distance === 1
            ? 'rgba(0, 240, 255, 0.065)'
            : 'transparent'

        return (
          <rect
            key={index}
            x={column * cellSize}
            y={row * cellSize}
            width={cellSize}
            height={cellSize}
            fill={fill}
            stroke="rgba(114, 220, 231, 0.13)"
            strokeWidth={0.7}
            style={{ transition: 'fill 450ms ease-out' }}
          />
        )
      })}
    </svg>
  )
}
