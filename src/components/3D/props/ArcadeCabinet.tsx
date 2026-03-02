/**
 * ArcadeCabinet Component
 * Retro arcade machine with glowing screen
 * Flickering screen animation
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface ArcadeCabinetProps {
  position: [number, number, number]
  rotation?: number
}

export function ArcadeCabinet({ position, rotation = 0 }: ArcadeCabinetProps) {
  const screenRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  const { cabinetGeom, cabinetMat, screenGeom, screenMat } = useMemo(() => {
    const cabinetGeom = new THREE.BoxGeometry(1.2, 1.8, 0.6)
    const cabinetMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e })
    const screenGeom = new THREE.PlaneGeometry(0.8, 1.0)
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
    })
    return { cabinetGeom, cabinetMat, screenGeom, screenMat }
  }, [])

  useFrame((_, delta) => {
    if (screenRef.current) {
      timeRef.current += delta
      const flicker = 0.8 + Math.sin(timeRef.current * 8) * 0.2
      screenMat.opacity = Math.max(0.5, flicker)
    }
  })

  return (
    <RigidBody type="fixed" position={position} colliders="cuboid" args={[0.6, 0.9, 0.3]} rotation={[0, rotation, 0]}>
      <group>
        <mesh geometry={cabinetGeom} material={cabinetMat} position={[0, 0.9, 0]} />
        <mesh
          ref={screenRef}
          geometry={screenGeom}
          material={screenMat}
          position={[0, 0.9, 0.31]}
        />
      </group>
    </RigidBody>
  )
}
