import { visitedCityMarkers } from '../data/cv'

const width = 720
const height = 280
const bounds = {
  minLatitude: -9.5,
  maxLatitude: -5.1,
  minLongitude: 104.5,
  maxLongitude: 116.5,
}

const markers = visitedCityMarkers.map((marker) => ({
  ...marker,
  x: ((marker.lng - bounds.minLongitude) / (bounds.maxLongitude - bounds.minLongitude)) * width,
  y: ((bounds.maxLatitude - marker.lat) / (bounds.maxLatitude - bounds.minLatitude)) * height,
}))

export default function CityMarkers() {
  return (
    <svg
      className="city-markers"
      viewBox="90 38 190 120"
      role="img"
      aria-labelledby="city-markers-title city-markers-description"
    >
      <title id="city-markers-title">Kota yang pernah disinggahi</title>
      <desc id="city-markers-description">Jakarta, Bandung, dan Tasikmalaya.</desc>
      <polyline
        points={markers.map(({ x, y }) => `${x},${y}`).join(' ')}
        fill="none"
        stroke="#00F0FF"
        strokeOpacity={0.5}
        strokeWidth={1.1}
        strokeDasharray="3 3"
      />
      {markers.map((marker) => (
        <g key={marker.name}>
          <circle cx={marker.x} cy={marker.y} r={5} fill="#FFB800" fillOpacity={0.14}>
            <animate
              attributeName="r"
              values="4;9;4"
              dur="2.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              values="0.3;0.02;0.3"
              dur="2.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={marker.x} cy={marker.y} r={2.2} fill="#FFB800" />
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
      ))}
    </svg>
  )
}
