/**
 * Hallway - Connects rooms
 */

import { RigidBody } from '@react-three/rapier'
import { createCarpetMaterial } from '@/lib/materials'

export function Hallway() {
  const carpetMat = createCarpetMaterial(0x8b7355)

  return (
    <group position={[0, 0, 0]}>
      {/* Floor - narrow strip between bathroom and bedroom */}
      <mesh position={[1, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2, 1]} />
        <primitive object={carpetMat.clone()} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[1, 0.5, 0.5]} position={[1, -0.25, 4]} />
    </group>
  )
}
