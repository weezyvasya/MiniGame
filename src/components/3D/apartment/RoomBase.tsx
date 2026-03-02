/**
 * RoomBase - Walls, floor, ceiling with 80s materials
 */

import { RigidBody } from '@react-three/rapier'
import { createCarpetMaterial, createWallMaterial, createPanelingMaterial } from '@/lib/materials'

interface RoomBaseProps {
  x: number
  z: number
  width: number
  depth: number
  height?: number
  floorColor?: number
  wallColor?: number
  hasPaneling?: boolean
  floorType?: 'carpet' | 'tile'
}

export function RoomBase({
  x,
  z,
  width,
  depth,
  height = 2.5,
  floorColor = 0xc4a035,
  wallColor = 0xf5f0e0,
  hasPaneling = true,
  floorType = 'carpet',
}: RoomBaseProps) {
  const cx = x + width / 2
  const cz = z + depth / 2
  const floorMat = floorType === 'carpet' ? createCarpetMaterial(floorColor) : createWallMaterial(floorColor)
  const wallMat = createWallMaterial(wallColor)
  const panelMat = createPanelingMaterial()

  const wallThickness = 0.1

  return (
    <group>
      {/* Floor */}
      <mesh position={[cx, 0.01, cz]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width - wallThickness * 2, depth - wallThickness * 2]} />
        <primitive object={floorMat.clone()} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[cx, height, cz]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width - wallThickness * 2, depth - wallThickness * 2]} />
        <meshStandardMaterial color={0xe8e4d8} roughness={0.9} />
      </mesh>

      {/* Walls - 4 sides with colliders */}
      {/* Back wall (+z) */}
      <mesh position={[cx, height / 2, z]} castShadow receiveShadow>
        <boxGeometry args={[width + wallThickness * 2, height, wallThickness]} />
        <primitive object={wallMat.clone()} />
      </mesh>
      {hasPaneling && (
        <mesh position={[cx, height / 4, z]} castShadow>
          <boxGeometry args={[width - 0.2, height / 2, wallThickness * 0.5]} />
          <primitive object={panelMat.clone()} />
        </mesh>
      )}

      {/* Front wall (-z) */}
      <mesh position={[cx, height / 2, z + depth]} castShadow receiveShadow>
        <boxGeometry args={[width + wallThickness * 2, height, wallThickness]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Left wall (-x) */}
      <mesh position={[x, height / 2, cz]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, height, depth + wallThickness * 2]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Right wall (+x) */}
      <mesh position={[x + width, height / 2, cz]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, height, depth + wallThickness * 2]} />
        <primitive object={wallMat.clone()} />
      </mesh>

      {/* Colliders for walls */}
      <RigidBody type="fixed" colliders="cuboid" args={[width / 2 + 0.1, height / 2, wallThickness / 2]} position={[cx, height / 2, z]} />
      <RigidBody type="fixed" colliders="cuboid" args={[width / 2 + 0.1, height / 2, wallThickness / 2]} position={[cx, height / 2, z + depth]} />
      <RigidBody type="fixed" colliders="cuboid" args={[wallThickness / 2, height / 2, depth / 2 + 0.1]} position={[x, height / 2, cz]} />
      <RigidBody type="fixed" colliders="cuboid" args={[wallThickness / 2, height / 2, depth / 2 + 0.1]} position={[x + width, height / 2, cz]} />
      <RigidBody type="fixed" colliders="cuboid" args={[width / 2, 0.1, depth / 2]} position={[cx, -0.05, cz]} />
    </group>
  )
}
