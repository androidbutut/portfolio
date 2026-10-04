import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, Stars } from '@react-three/drei'
import { InfiniteRoad, HeroCar, CyberParticles, CitySilhouette } from './RoadScene'
import CameraController from './CameraController'
import * as THREE from 'three'

interface MainCanvasProps {
  activeWaypoint?: number
}

export default function MainCanvas({ activeWaypoint = 0 }: MainCanvasProps) {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 4.5, 12], fov: 50, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0B0F19', 0)
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight
            position={[8, 12, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
            color="#e8f4ff"
          />
          <pointLight position={[0, 6, 4]} intensity={1.5} color="#00F0FF" distance={30} />
          <pointLight position={[-6, 3, -5]} intensity={0.8} color="#FFB800" distance={20} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.4}
            penumbra={0.6}
            intensity={1.2}
            color="#00F0FF"
            castShadow
          />

          <InfiniteRoad />
          <HeroCar />
          <CyberParticles count={140} />
          <CitySilhouette />

          <Stars radius={80} depth={40} count={1800} factor={3} saturation={0.4} fade speed={0.6} />
          <fog attach="fog" args={['#0B0F19', 25, 90]} />
          <Environment preset="night" />

          <CameraController activeWaypoint={activeWaypoint} />
        </Suspense>
      </Canvas>
    </div>
  )
}
