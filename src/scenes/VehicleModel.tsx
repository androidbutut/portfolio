import { useMemo } from 'react'
import { Clone, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface VehicleModelProps {
  src: string
  targetLength: number
}

export default function VehicleModel({ src, targetLength }: VehicleModelProps) {
  const { scene } = useGLTF(src)
  const bounds = useMemo(() => new THREE.Box3().setFromObject(scene), [scene])
  const { position, scale } = useMemo(() => {
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())
    const scale = targetLength / Math.max(size.x, size.z)

    return {
      position: [
        -center.x * scale,
        -bounds.min.y * scale,
        -center.z * scale,
      ] as [number, number, number],
      scale,
    }
  }, [bounds, targetLength])

  return (
    <group position={position} scale={scale}>
      <Clone object={scene} castShadow receiveShadow />
    </group>
  )
}
