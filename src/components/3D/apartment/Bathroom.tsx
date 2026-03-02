/**
 * Bathroom - Pink/teal fixtures, medicine cabinet, toiletries
 */

import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { createCeramicMaterial } from '@/lib/materials'

export function Bathroom() {
  const ceramicMat = createCeramicMaterial(0xffe4e1)

  return (
    <group>
      {/* Floor - tile */}
      <mesh position={[5, 0.01, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial color={0xe0e0e0} roughness={0.4} />
      </mesh>

      {/* Toilet - pink */}
      <mesh position={[4.5, 0.25, 5]} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.4, 16]} />
        <primitive object={ceramicMat.clone()} />
      </mesh>
      <mesh position={[4.5, 0.4, 4.8]} castShadow>
        <boxGeometry args={[0.35, 0.15, 0.2]} />
        <primitive object={ceramicMat.clone()} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[0.2, 0.25, 0.2]} position={[4.5, 0.25, 5]} />

      {/* Sink - teal */}
      <mesh position={[5.5, 0.6, 4.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.18, 0.15, 16]} />
        <meshStandardMaterial color={0x40e0d0} roughness={0.3} />
      </mesh>
      <mesh position={[5.5, 0.7, 4.5]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
        <meshStandardMaterial color={0xb8860b} metalness={0.8} />
      </mesh>

      {/* Bathtub */}
      <mesh position={[5.5, 0.25, 5.8]} castShadow>
        <boxGeometry args={[1, 0.4, 0.5]} />
        <primitive object={ceramicMat.clone()} />
      </mesh>

      {/* Medicine cabinet - mirrored */}
      <mesh position={[5.5, 1.4, 4.3]}>
        <boxGeometry args={[0.5, 0.4, 0.05]} />
        <meshStandardMaterial color={0x888888} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Shower curtain */}
      <mesh position={[5.5, 1, 5.9]}>
        <planeGeometry args={[0.9, 1.5]} />
        <meshStandardMaterial color={0xff69b4} side={THREE.DoubleSide} />
      </mesh>

      {/* Toiletries - Aqua Net, etc */}
      <mesh position={[5.2, 0.9, 4.4]} castShadow>
        <cylinderGeometry args={[0.03, 0.035, 0.2, 8]} />
        <meshStandardMaterial color={0x87ceeb} />
      </mesh>
      <mesh position={[5.6, 0.85, 4.4]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.15, 8]} />
        <meshStandardMaterial color={0x8b4513} />
      </mesh>

      {/* Scale */}
      <mesh position={[4.3, 0.15, 4.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.16, 0.03, 16]} />
        <meshStandardMaterial color={0xc0c0c0} metalness={0.5} />
      </mesh>
    </group>
  )
}
