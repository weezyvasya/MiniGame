/**
 * PalmTree Component
 * Low-poly palm tree with neon green fronds and pink trunk accent
 * Slight wind sway animation
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface PalmTreeProps {
  position: [number, number, number]
}

export function PalmTree({ position }: PalmTreeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  const { trunkGeom, trunkMat, frondGeom, frondMat } = useMemo(() => {
    const trunkGeom = new THREE.CylinderGeometry(0.3, 0.4, 3, 6)
    const trunkMat = new THREE.MeshBasicMaterial({ color: 0xff6ec7 })
    const frondGeom = new THREE.ConeGeometry(1.5, 2, 4)
    const frondMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 })
    return { trunkGeom, trunkMat, frondGeom, frondMat }
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      timeRef.current += delta
      const sway = Math.sin(timeRef.current * 0.5) * 0.02
      groupRef.current.rotation.z = sway
    }
  })

  return (
    <RigidBody type="fixed" position={position} colliders="cuboid" args={[0.5, 2, 0.5]}>
      <group ref={groupRef}>
        <mesh geometry={trunkGeom} material={trunkMat} position={[0, 1.5, 0]} />
        <mesh geometry={frondGeom} material={frondMat} position={[0, 3.5, 0]} rotation={[0, 0, Math.PI / 4]} />
      </group>
    </RigidBody>
  )
}
