import { useMemo } from 'react'
import { createMap } from 'svg-dotted-map'
import { visitedCityMarkers } from '../data/cv'

const width = 720
const height = 280

export default function DottedMap() {
  const { points, addMarkers } = useMemo(
    () =>
      createMap({
        width,
        height,
        mapSamples: 40000,
        region: {
          lat: { min: -9.5, max: -5.1 },
          lng: { min: 104.5, max: 116.5 },
        },
      }),
    [],
  )
  const markers = useMemo(() => addMarkers(visitedCityMarkers), [addMarkers])

  return (
    <svg
      className="dotted-map"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="java-bali-map-title java-bali-map-description"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="java-bali-map-title">Peta Jawa dan Bali</title>
      <desc id="java-bali-map-description">
        Kota yang tercatat: Jakarta, Bandung, dan Tasikmalaya.
      </desc>
      {points.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}-${index}`}
          cx={point.x}
          cy={point.y}
          r={1.1}
          fill="#72DCE7"
          fillOpacity={0.9}
        />
      ))}
      {markers.map((marker) => {
        const radius = marker.size ?? 2.8

        return (
          <g key={marker.name}>
            {marker.pulse !== false && (
              <circle
                cx={marker.x}
                cy={marker.y}
                r={radius}
                fill="none"
                stroke="#FFB800"
                strokeWidth={0.7}
                pointerEvents="none"
              >
                <animate
                  attributeName="r"
                  values={`${radius};${radius * 2.8}`}
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle cx={marker.x} cy={marker.y} r={radius} fill="#FFB800" />
            <circle cx={marker.x} cy={marker.y} r={0.8} fill="#FFFFFF" />
            <text
              x={marker.x + 7}
              y={marker.y - 5}
              fill="#FFFFFF"
              fontSize={10}
              fontWeight={600}
              paintOrder="stroke"
              stroke="#0B0F19"
              strokeLinejoin="round"
              strokeWidth={2.5}
            >
              {marker.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
