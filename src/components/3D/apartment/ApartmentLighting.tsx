/**
 * Warm incandescent lighting - 2700K
 * Realistic shadows, TV glow
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WARM_WHITE = 0xffeedd

export function ApartmentLighting() {
  const livingLightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (livingLightRef.current) {
      const t = clock.elapsedTime
      livingLightRef.current.intensity = 0.8 + Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} color={WARM_WHITE} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={0.5}
        color={WARM_WHITE}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight ref={livingLightRef} position={[2.5, 2.2, 2]} intensity={0.8} color={WARM_WHITE} distance={6} decay={2} />
      <pointLight position={[6.5, 2, 1.5]} intensity={0.5} color={WARM_WHITE} distance={4} decay={2} />
      <pointLight position={[3, 2, 5.5]} intensity={0.4} color={WARM_WHITE} distance={4} decay={2} />
      <pointLight position={[1, 2, 6.5]} intensity={0.3} color={WARM_WHITE} distance={3} decay={2} />
    </>
  )
}
