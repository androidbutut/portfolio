import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

const WAYPOINTS = [
  { pos: [0, 4.5, 12] as [number, number, number], look: [0, 0.5, 0] as [number, number, number] },
  { pos: [2.5, 3.2, 6] as [number, number, number], look: [0, 0.4, -2] },
  { pos: [-2, 3.8, 4] as [number, number, number], look: [0, 0.3, -4] },
  { pos: [1.5, 2.8, 2] as [number, number, number], look: [0, 0.2, -6] },
  { pos: [-1.8, 3.5, 0] as [number, number, number], look: [0, 0.3, -8] },
  { pos: [2, 3.0, -2] as [number, number, number], look: [0, 0.2, -10] },
  { pos: [0.2, 3.7, -4] as [number, number, number], look: [0, 0.8, 2] },
  { pos: [2.2, 3.4, -4.5] as [number, number, number], look: [0, 0.8, 2] },
  { pos: [0, 4.0, 8] as [number, number, number], look: [0, 0.4, -1] },
]

interface CameraControllerProps {
  activeWaypoint: number
}

export default function CameraController({ activeWaypoint }: CameraControllerProps) {
  const { camera } = useThree()
  const targetLook = useRef(new THREE.Vector3(0, 0.5, 0))
  const currentLook = useRef(new THREE.Vector3(0, 0.5, 0))
  const tweening = useRef(false)

  useEffect(() => {
    const wp = WAYPOINTS[Math.min(activeWaypoint, WAYPOINTS.length - 1)]
    tweening.current = true

    gsap.to(camera.position, {
      x: wp.pos[0],
      y: wp.pos[1],
      z: wp.pos[2],
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        tweening.current = false
      },
    })

    gsap.to(targetLook.current, {
      x: wp.look[0],
      y: wp.look[1],
      z: wp.look[2],
      duration: 1.4,
      ease: 'power2.inOut',
    })
  }, [activeWaypoint, camera])

  useFrame(() => {
    currentLook.current.lerp(targetLook.current, 0.06)
    camera.lookAt(currentLook.current)
  })

  return null
}
