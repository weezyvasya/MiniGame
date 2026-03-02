/**
 * Bedroom - Queen bed, vanity, dresser, alarm clock
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { createFabricMaterial, createWoodMaterial } from '@/lib/materials'

export function Bedroom() {
  const fanRef = useRef<THREE.Group>(null)
  const clockRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (fanRef.current) fanRef.current.rotation.y = t * 2
    if (clockRef.current) {
      clockRef.current.visible = Math.floor(t * 2) % 2 === 0
    }
  })

  const fabricMat = createFabricMaterial(0xdda0dd)
  const woodMat = createWoodMaterial(0x5c4033)

  return (
    <group>
      {/* Floor - carpet */}
      <mesh position={[2, 0.01, 6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.8, 3.8]} />
        <meshStandardMaterial color={0x8b7355} roughness={0.95} />
      </mesh>

      {/* Bed - queen with floral comforter */}
      <mesh position={[2, 0.3, 6]} castShadow>
        <boxGeometry args={[1.6, 0.2, 2]} />
        <meshStandardMaterial color={0x4a3728} />
      </mesh>
      <mesh position={[2, 0.5, 6]} castShadow>
        <boxGeometry args={[1.5, 0.15, 1.9]} />
        <primitive object={fabricMat.clone()} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[0.8, 0.4, 1]} position={[2, 0.4, 6]} />

      {/* Nightstand with alarm clock */}
      <mesh position={[0.8, 0.35, 6]} castShadow>
        <boxGeometry args={[0.4, 0.35, 0.35]} />
        <primitive object={woodMat.clone()} />
      </mesh>
      <group position={[0.8, 0.55, 6]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial color={0x1a1a1a} />
        </mesh>
        <mesh ref={clockRef} position={[0, 0, 0.045]}>
          <planeGeometry args={[0.1, 0.04]} />
          <meshBasicMaterial color={0xff0000} />
        </mesh>
      </group>

      {/* Rubik's cube on nightstand */}
      <mesh position={[0.8, 0.5, 5.8]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color={0xff0000} />
      </mesh>

      {/* Dresser with mirror */}
      <mesh position={[3.2, 0.6, 7]} castShadow>
        <boxGeometry args={[1, 0.8, 0.5]} />
        <primitive object={woodMat.clone()} />
      </mesh>
      <mesh position={[3.2, 1.2, 7.26]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color={0xcccccc} metalness={0.8} roughness={0.1} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[0.5, 0.4, 0.25]} position={[3.2, 0.6, 7]} />

      {/* Vanity with stool */}
      <mesh position={[1, 0.5, 7.5]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.4]} />
        <primitive object={woodMat.clone()} />
      </mesh>
      <mesh position={[1, 0.25, 7.7]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color={0x4a3728} />
      </mesh>

      {/* Ceiling fan */}
      <group ref={fanRef} position={[2, 2.4, 6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
          <meshStandardMaterial color={0x888888} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.5, 0, Math.sin((i / 3) * Math.PI * 2) * 0.5]} castShadow>
            <boxGeometry args={[0.8, 0.03, 0.15]} />
            <meshStandardMaterial color={0x888888} />
          </mesh>
        ))}
      </group>

      {/* Stuffed animal on bed */}
      <mesh position={[1.5, 0.6, 5.5]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={0xffb6c1} />
      </mesh>

      {/* Closet - partially open */}
      <mesh position={[0.5, 0.75, 7.8]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color={0x4a3728} />
      </mesh>
    </group>
  )
}
