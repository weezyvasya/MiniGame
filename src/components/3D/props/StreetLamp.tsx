/**
 * StreetLamp Component
 * Pink neon tube light
 */

import { useMemo } from 'react'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface StreetLampProps {
  position: [number, number, number]
}

export function StreetLamp({ position }: StreetLampProps) {
  const { poleGeom, poleMat, tubeGeom, tubeMat } = useMemo(() => {
    const poleGeom = new THREE.CylinderGeometry(0.05, 0.05, 2, 8)
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x2a2a3e })
    const tubeGeom = new THREE.CylinderGeometry(0.03, 0.03, 1, 8)
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xff6ec7 })
    return { poleGeom, poleMat, tubeGeom, tubeMat }
  }, [])

  return (
    <RigidBody type="fixed" position={position} colliders="cuboid" args={[0.2, 1.5, 0.2]}>
      <group>
        <mesh geometry={poleGeom} material={poleMat} position={[0, 1, 0]} />
        <mesh geometry={tubeGeom} material={tubeMat} position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </RigidBody>
  )
}
