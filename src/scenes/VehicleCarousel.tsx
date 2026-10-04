import { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { vehicleCategories } from '../data/cv'
import VehicleModel from './VehicleModel'
import MagicCard from '../components/MagicCard'

const vehicleModels: Record<string, { src: string; targetLength: number }> = {
  city: { src: '/models/innova-zenix/scene.gltf', targetLength: 3.8 },
  executive: { src: '/models/mercedes-e250/scene.gltf', targetLength: 3.8 },
  heavy: { src: '/models/ecoline-bus/scene.gltf', targetLength: 5.2 },
}

function CarModel({
  type,
  position,
  rotationY,
  color,
  selected,
  onClick,
}: {
  type: string
  position: [number, number, number]
  rotationY: number
  color: string
  selected: boolean
  onClick: () => void
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    if (selected) {
      group.current.position.y = 0.35 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06
      group.current.rotation.y = rotationY + state.clock.elapsedTime * 0.4
    } else {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0.2, 0.08)
    }
  })

  const model = vehicleModels[type]
  const isHeavy = type === 'heavy' || type === 'commercial'
  const bodyW = isHeavy ? 2.4 : 1.7
  const bodyL = isHeavy ? 5.2 : 3.8
  const bodyH = isHeavy ? 1.1 : 0.55

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {model ? (
        <VehicleModel src={model.src} targetLength={model.targetLength} />
      ) : (
        <>
      <mesh castShadow position={[0, bodyH / 2 + 0.15, 0]}>
        <boxGeometry args={[bodyW, bodyH, bodyL]} />
        <meshStandardMaterial
          color={selected ? color : '#1a2030'}
          metalness={0.85}
          roughness={0.25}
          emissive={selected ? color : '#000'}
          emissiveIntensity={selected ? 0.25 : 0}
        />
      </mesh>

      {!isHeavy && (
        <mesh castShadow position={[0, bodyH + 0.35, -0.3]}>
          <boxGeometry args={[bodyW * 0.85, 0.55, bodyL * 0.5]} />
          <meshStandardMaterial color="#0c1018" metalness={0.7} roughness={0.3} />
        </mesh>
      )}
      {isHeavy && (
        <mesh castShadow position={[0, bodyH + 0.6, -bodyL * 0.25]}>
          <boxGeometry args={[bodyW * 0.9, 1.0, bodyL * 0.35]} />
          <meshStandardMaterial color="#0c1018" metalness={0.6} roughness={0.35} />
        </mesh>
      )}

      <mesh position={[0, isHeavy ? bodyH + 0.7 : bodyH + 0.38, isHeavy ? -bodyL * 0.25 : -0.3]}>
        <boxGeometry
          args={[
            isHeavy ? bodyW * 0.85 : bodyW * 0.8,
            isHeavy ? 0.7 : 0.4,
            isHeavy ? bodyL * 0.3 : bodyL * 0.45,
          ]}
        />
        <meshStandardMaterial
          color="#00F0FF"
          transparent
          opacity={0.22}
          emissive="#00F0FF"
          emissiveIntensity={selected ? 0.6 : 0.2}
        />
      </mesh>

      {(isHeavy
        ? [
            [-bodyW * 0.4, 0.28, bodyL * 0.32],
            [bodyW * 0.4, 0.28, bodyL * 0.32],
            [-bodyW * 0.4, 0.28, -bodyL * 0.28],
            [bodyW * 0.4, 0.28, -bodyL * 0.28],
            [-bodyW * 0.4, 0.28, 0],
            [bodyW * 0.4, 0.28, 0],
          ]
        : [
            [-bodyW * 0.42, 0.22, bodyL * 0.32],
            [bodyW * 0.42, 0.22, bodyL * 0.32],
            [-bodyW * 0.42, 0.22, -bodyL * 0.32],
            [bodyW * 0.42, 0.22, -bodyL * 0.32],
          ]
      ).map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[isHeavy ? 0.38 : 0.28, isHeavy ? 0.38 : 0.28, 0.22, 14]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
        </>
      )}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[bodyW + 0.4, bodyL + 0.5]} />
        <meshBasicMaterial
          color={selected ? color : '#00F0FF'}
          transparent
          opacity={selected ? 0.45 : 0.15}
        />
      </mesh>
    </group>
  )
}

function CarouselScene({
  selectedIdx,
  onSelect,
}: {
  selectedIdx: number
  onSelect: (i: number) => void
}) {
  const group = useRef<THREE.Group>(null)
  const radius = 5.5
  const colors = ['#00F0FF', '#FFB800', '#00F0FF', '#FFB800']

  const positions = useMemo(() => {
    return vehicleCategories.map((_, i) => {
      const angle = (i / vehicleCategories.length) * Math.PI * 2 - Math.PI / 2
      return {
        pos: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
        rot: -angle + Math.PI,
      }
    })
  }, [])

  useFrame((_, delta) => {
    if (group.current && selectedIdx < 0) {
      group.current.rotation.y += delta * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 10, 5]} intensity={1.1} castShadow />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#00F0FF" distance={20} />
      <pointLight position={[-4, 2, 4]} intensity={0.6} color="#FFB800" distance={12} />

      <group ref={group}>
        {vehicleCategories.map((cat, i) => (
          <CarModel
            key={cat.id}
            type={cat.id}
            position={positions[i].pos}
            rotationY={positions[i].rot}
            color={colors[i]}
            selected={selectedIdx === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <ringGeometry args={[3.5, 7.5, 64]} />
        <meshStandardMaterial
          color="#0a0e17"
          metalness={0.7}
          roughness={0.35}
          emissive="#001820"
          emissiveIntensity={0.2}
        />
      </mesh>

      <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={16} blur={2.5} far={6} />
      <Environment preset="night" />
      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.3}
        autoRotate={selectedIdx < 0}
        autoRotateSpeed={0.6}
      />
    </>
  )
}

export default function VehicleCarousel3D() {
  const [selected, setSelected] = useState(-1)
  const cat = selected >= 0 ? vehicleCategories[selected] : null

  return (
    <MagicCard className="w-full rounded-3xl p-0">
      <div className="relative w-full h-[380px] md:h-[460px] overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 11], fov: 42 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <CarouselScene selectedIdx={selected} onSelect={setSelected} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0B0F19]/95 to-transparent pointer-events-none">
        {cat ? (
          <div className="pointer-events-auto">
            <p className="text-[#00F0FF] text-xs tracking-widest uppercase mb-1">{cat.name}</p>
            <p className="text-sm text-white/70 mb-2">{cat.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.vehicles.map((v) => (
                <span key={v} className="text-[11px] px-2 py-0.5 rounded-md bg-[#00F0FF]/15 text-[#00F0FF]">
                  {v}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelected(-1)}
              className="mt-3 text-xs text-white/50 hover:text-white transition-colors"
            >
              ← Reset view
            </button>
          </div>
        ) : (
          <p className="text-center text-sm text-white/50">
            Drag untuk putar · Klik mobil untuk detail
          </p>
        )}
      </div>
      </div>
    </MagicCard>
  )
}
