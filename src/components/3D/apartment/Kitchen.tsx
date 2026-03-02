/**
 * Kitchen - Avocado appliances, Formica counter, checkered floor
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { createFormicaMaterial, createWoodMaterial } from '@/lib/materials'

export function Kitchen() {
  const toasterRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (toasterRef.current) {
      const t = clock.elapsedTime
      toasterRef.current.position.y = Math.sin(t * 2) > 0.9 ? 0.05 : 0
    }
  })

  const formicaMat = createFormicaMaterial(0xe8dcc8)
  const cabinetMat = createWoodMaterial(0x8b6914)

  return (
    <group>
      {/* Floor - checkered tile */}
      <mesh position={[6.5, 0.01, 1.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      {[...Array(7)].flatMap((_, i) =>
        [...Array(7)].map((_, j) => (
          <mesh
            key={`${i}-${j}`}
            position={[5.2 + i * 0.4, 0.02, 0.2 + j * 0.4]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.38, 0.38]} />
            <meshStandardMaterial color={(i + j) % 2 === 0 ? 0xffffff : 0x1a1a1a} />
          </mesh>
        ))
      )}

      {/* Cabinets - oak veneer */}
      <mesh position={[5.5, 0.9, 0.5]} castShadow>
        <boxGeometry args={[2, 0.8, 0.5]} />
        <primitive object={cabinetMat.clone()} />
      </mesh>
      <mesh position={[6.5, 1.4, 2.5]} castShadow>
        <boxGeometry args={[2, 0.4, 0.5]} />
        <primitive object={cabinetMat.clone()} />
      </mesh>

      {/* Counter - Formica boomerang */}
      <mesh position={[6.5, 1.05, 1.5]} castShadow>
        <boxGeometry args={[2.6, 0.1, 0.6]} />
        <primitive object={formicaMat.clone()} />
      </mesh>

      {/* Refrigerator - avocado green */}
      <mesh position={[7.2, 0.9, 0.3]} castShadow>
        <boxGeometry args={[0.7, 1.2, 0.6]} />
        <meshStandardMaterial color={0x568203} roughness={0.5} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[0.35, 0.6, 0.3]} position={[7.2, 0.9, 0.3]} />

      {/* Microwave */}
      <mesh position={[5.8, 1.25, 2.2]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.35]} />
        <meshStandardMaterial color={0x888888} roughness={0.3} />
      </mesh>
      <mesh position={[5.8, 1.25, 2.4]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshBasicMaterial color={0x111111} />
      </mesh>

      {/* Toaster - pop-up */}
      <group ref={toasterRef} position={[6.2, 1.1, 2.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.15, 0.2]} />
          <meshStandardMaterial color={0xcc0000} />
        </mesh>
      </group>

      {/* Blender with fruit */}
      <mesh position={[6.5, 1.15, 2.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.3, 16]} />
        <meshStandardMaterial color={0x228b22} />
      </mesh>
      <mesh position={[6.5, 1.35, 2.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={0xff0000} />
      </mesh>

      {/* Fruit bowl */}
      <group position={[5.5, 1.08, 1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.12, 0.1, 16]} />
          <meshStandardMaterial color={0x8b4513} />
        </mesh>
        <mesh position={[0.05, 0.08, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={0xffd700} />
        </mesh>
        <mesh position={[-0.05, 0.07, 0.02]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={0xff6347} />
        </mesh>
      </group>

      {/* Wall phone - yellowed plastic */}
      <group position={[7.5, 1.5, 2.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.1, 0.05]} />
          <meshStandardMaterial color={0xe8d49a} />
        </mesh>
      </group>

      {/* Calendar - July 1984 */}
      <mesh position={[7.6, 1.6, 0.5]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
    </group>
  )
}
