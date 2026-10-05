import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import VehicleModel from './VehicleModel'

/** Infinite moving cyberpunk highway */
export function InfiniteRoad() {
  const roadRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.InstancedMesh>(null)
  const count = 40

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((_, delta) => {
    if (!roadRef.current) return
    roadRef.current.position.z += delta * 18
    if (roadRef.current.position.z > 20) {
      roadRef.current.position.z = 0
    }

    if (linesRef.current) {
      for (let i = 0; i < count; i++) {
        const z = ((i * 12 + performance.now() * 0.018) % (count * 12)) - count * 6
        dummy.position.set(0, 0.02, z)
        dummy.updateMatrix()
        linesRef.current.setMatrixAt(i, dummy.matrix)
      }
      linesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={roadRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 400]} />
        <meshStandardMaterial
          color="#0a0e17"
          metalness={0.6}
          roughness={0.4}
          emissive="#001a22"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7.2, 0.01, 0]}>
        <planeGeometry args={[0.35, 400]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.2, 0.01, 0]}>
        <planeGeometry args={[0.35, 400]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      <instancedMesh ref={linesRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.18, 0.04, 4]} />
        <meshStandardMaterial
          color="#FFB800"
          emissive="#FFB800"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  )
}

/** Vehicle model used in the hero scene */
export function HeroCar({ position = [0, 0.4, 2] as [number, number, number] }) {
  const carRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!carRef.current) return
    carRef.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04
    carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
  })

  return (
    <group ref={carRef} position={position}>
      <VehicleModel src="/models/vellfire/scene.gltf" targetLength={4.2} />
    </group>
  )
}

/** Floating particles / cyber dust */
export function CyberParticles({ count = 120 }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = Math.random() * 12 + 0.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.02
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      let z = pos.getZ(i)
      z += delta * 6
      if (z > 40) z = -40
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00F0FF"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Neon city skyline silhouette in distance */
export function CitySilhouette() {
  const buildings = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      x: (i - 14) * 3.2 + (Math.random() - 0.5),
      h: 2 + Math.random() * 8,
      w: 1.2 + Math.random() * 1.5,
      z: -55 - Math.random() * 15,
    }))
  }, [])

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, 1.5]} />
          <meshStandardMaterial
            color="#05080f"
            emissive={i % 3 === 0 ? '#00F0FF' : i % 5 === 0 ? '#FFB800' : '#001820'}
            emissiveIntensity={0.15 + Math.random() * 0.25}
          />
        </mesh>
      ))}
    </group>
  )
}
