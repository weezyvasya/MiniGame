/**
 * Living Room - Sofa, CRT TV, stereo, lava lamp
 * 5x4m, shag carpet, wood paneling
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import {
  createFabricMaterial,
  createWoodMaterial,
  createGlassMaterial,
  createMetalMaterial,
} from '@/lib/materials'

export function LivingRoom() {
  const lavaRef = useRef<THREE.Group>(null)
  const eqRef = useRef<THREE.Mesh[]>([])
  const vcrClockRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (lavaRef.current) lavaRef.current.rotation.y = t * 0.1
    if (vcrClockRef.current) {
      vcrClockRef.current.visible = Math.floor(t * 2) % 2 === 0
    }
    eqRef.current.forEach((m, i) => {
      if (m && m.scale) {
        const h = 0.3 + Math.sin(t * 3 + i * 0.5) * 0.2
        m.scale.y = Math.max(0.1, h)
      }
    })
  })

  const sofaMat = createFabricMaterial(0x2d5a4a)
  const woodMat = createWoodMaterial(0x5c4033)
  const glassMat = createGlassMaterial()

  return (
    <group>
      {/* Sofa - bulky, teal velvet */}
      <mesh position={[1, 0.45, 3]} castShadow>
        <boxGeometry args={[2, 0.5, 0.9]} />
        <primitive object={sofaMat.clone()} />
      </mesh>
      <mesh position={[1, 0.25, 3]} castShadow>
        <boxGeometry args={[2.1, 0.4, 0.7]} />
        <primitive object={sofaMat.clone()} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[1, 0.4, 0.45]} position={[1, 0.4, 3]} />

      {/* Coffee table - wood with glass top */}
      <mesh position={[2.5, 0.2, 2.5]} castShadow>
        <boxGeometry args={[1, 0.05, 0.6]} />
        <primitive object={woodMat.clone()} />
      </mesh>
      <mesh position={[2.5, 0.25, 2.5]} castShadow>
        <boxGeometry args={[0.9, 0.02, 0.5]} />
        <primitive object={glassMat.clone()} />
      </mesh>
      <RigidBody type="fixed" colliders="cuboid" args={[0.5, 0.15, 0.3]} position={[2.5, 0.2, 2.5]} />

      {/* CRT TV with wooden cabinet */}
      <group position={[3.5, 0.6, 1]}>
        <mesh castShadow>
          <boxGeometry args={[1, 0.8, 0.5]} />
          <primitive object={woodMat.clone()} />
        </mesh>
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.7, 0.5, 0.05]} />
          <meshBasicMaterial color={0x1a1a1a} />
        </mesh>
        <mesh position={[0, 0, 0.27]}>
          <boxGeometry args={[0.65, 0.45, 0.01]} />
          <meshBasicMaterial color={0x223344} />
        </mesh>
        <RigidBody type="fixed" colliders="cuboid" args={[0.5, 0.4, 0.25]} position={[0, 0, 0]} />
      </group>

      {/* VCR - blinking clock */}
      <group position={[3.5, 0.95, 1.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.1, 0.25]} />
          <meshStandardMaterial color={0x222222} />
        </mesh>
        <mesh ref={vcrClockRef} position={[0, 0, 0.13]}>
          <planeGeometry args={[0.2, 0.05]} />
          <meshBasicMaterial color={0xff0000} />
        </mesh>
      </group>

      {/* Stereo with equalizer bars */}
      <group position={[4, 0.5, 1.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.3, 0.3]} />
          <meshStandardMaterial color={0x1a1a1a} />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            ref={(r) => { if (r) eqRef.current[i] = r }}
            position={[-0.15 + i * 0.04, 0.2, 0.16]}
            scale={[1, 0.5, 1]}
          >
            <boxGeometry args={[0.02, 0.2, 0.01]} />
            <meshBasicMaterial color={0x00ff00} />
          </mesh>
        ))}
        <RigidBody type="fixed" colliders="cuboid" args={[0.25, 0.15, 0.15]} position={[0, 0, 0]} />
      </group>

      {/* Lava lamp */}
      <group ref={lavaRef} position={[0.5, 0.5, 0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.4, 16]} />
          <meshStandardMaterial color={0x1a1a2e} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={0xff6b6b} transparent opacity={0.8} />
        </mesh>
        <RigidBody type="fixed" colliders="cuboid" args={[0.05, 0.05, 0.2]} position={[0, 0.2, 0]} />
      </group>

      {/* Floor lamp - brass */}
      <group position={[4.2, 0.8, 3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.03, 1.2, 8]} />
          <primitive object={createMetalMaterial(0xb8860b).clone()} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <coneGeometry args={[0.25, 0.2, 8]} />
          <meshStandardMaterial color={0xf5f0e0} side={THREE.DoubleSide} />
        </mesh>
        <RigidBody type="fixed" colliders="cuboid" args={[0.05, 0.05, 0.5]} position={[0, 0.5, 0]} />
      </group>

      {/* Posters - Patrick Nagel style */}
      <mesh position={[0.3, 1.8, 0.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.6, 0.8]} />
        <meshStandardMaterial color={0xff69b4} />
      </mesh>
      <mesh position={[4.7, 1.8, 0.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.5, 0.7]} />
        <meshStandardMaterial color={0x1e90ff} />
      </mesh>

      {/* Ficus plant */}
      <group position={[4.5, 0.3, 3.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.3, 8]} />
          <meshStandardMaterial color={0x4a3728} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color={0x228b22} />
        </mesh>
      </group>
    </group>
  )
}
