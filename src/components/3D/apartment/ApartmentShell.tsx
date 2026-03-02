/**
 * ApartmentShell - Unified floor plan with walls and doorways
 * Layout: Living (0-5,0-4) | Kitchen (5-8,0-3)
 *         Bathroom (4-6,4-6) | Bedroom (0-4,4-8)
 * Doorways: Living-Kitchen open at x=5, Living-Bedroom at (2,4), Bathroom at (4,5)
 */

import { RigidBody } from '@react-three/rapier'
import { createCarpetMaterial, createWallMaterial, createPanelingMaterial } from '@/lib/materials'

export function ApartmentShell() {
  const wallMat = createWallMaterial(0xf5f0e0)
  const panelMat = createPanelingMaterial()
  const carpetMat = createCarpetMaterial(0xc4a035)

  return (
    <group>
      {/* Main floor - living + bedroom area carpet */}
      <mesh position={[2.5, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <primitive object={carpetMat.clone()} />
      </mesh>
      <mesh position={[2, 0.01, 6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <primitive object={carpetMat.clone()} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[4, 2.5, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={0xe8e4d8} roughness={0.9} />
      </mesh>

      {/* Exterior walls */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.5, 4]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[0, 1.25, 6]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.5, 4]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[4, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 2.5, 0.1]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[4, 1.25, 8]} castShadow receiveShadow>
        <boxGeometry args={[8, 2.5, 0.1]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[8, 1.25, 4]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.5, 8]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Interior walls with doorways */}
      {/* Wall between Living and Kitchen - with opening */}
      <mesh position={[5, 1.25, 1.5]} castShadow>
        <boxGeometry args={[0.1, 2.5, 1.5]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[5, 1.25, 2.75]} castShadow>
        <boxGeometry args={[0.1, 2.5, 1.5]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Wall between Living and Bedroom - with doorway */}
      <mesh position={[1, 1.25, 4]} castShadow>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[3.5, 1.25, 4]} castShadow>
        <boxGeometry args={[1.5, 2.5, 0.1]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Wall between Bathroom and Bedroom */}
      <mesh position={[4, 1.25, 5]} castShadow>
        <boxGeometry args={[0.1, 2.5, 1]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[4, 1.25, 6.5]} castShadow>
        <boxGeometry args={[0.1, 2.5, 1]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Bathroom walls */}
      <mesh position={[5, 1.25, 4]} castShadow>
        <boxGeometry args={[1, 2.5, 0.1]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      <mesh position={[6, 1.25, 5]} castShadow>
        <boxGeometry args={[0.1, 2.5, 2]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Wood paneling on exterior walls */}
      <mesh position={[0.05, 0.6, 2]} castShadow>
        <boxGeometry args={[0.05, 1.2, 3.8]} />
        <primitive object={panelMat.clone()} />
      </mesh>

      {/* Wall colliders - prevent walking through walls */}
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 2]} position={[0, 1.25, 2]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 2]} position={[0, 1.25, 6]} />
      <RigidBody type="fixed" colliders="cuboid" args={[4, 1.5, 0.05]} position={[2, 1.25, 0]} />
      <RigidBody type="fixed" colliders="cuboid" args={[4, 1.5, 0.05]} position={[4, 1.25, 8]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 4]} position={[8, 1.25, 4]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 1.5]} position={[5, 1.25, 1.5]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 1.5]} position={[5, 1.25, 2.75]} />
      <RigidBody type="fixed" colliders="cuboid" args={[1, 1.5, 0.05]} position={[1, 1.25, 4]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.75, 1.5, 0.05]} position={[3.5, 1.25, 4]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 0.5]} position={[4, 1.25, 5]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 0.5]} position={[4, 1.25, 6.5]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.5, 1.5, 0.05]} position={[5, 1.25, 4]} />
      <RigidBody type="fixed" colliders="cuboid" args={[0.05, 1.5, 1]} position={[6, 1.25, 5]} />
      {/* Floor collider - covers full apartment */}
      <RigidBody type="fixed" colliders="cuboid" args={[4, 0.1, 4]} position={[4, -0.1, 4]} />
    </group>
  )
}
