/**
 * NeonParticles Component
 * Floating neon particles with upward drift
 * Creates atmospheric 80s dust effect
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 500
const COLORS = [0xff6ec7, 0x00ffff, 0xff4500, 0x6a0dad]

export function NeonParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array | null>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = Math.random() * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100

      const color = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = 0.01 + Math.random() * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }

    positionsRef.current = positions
    velocitiesRef.current = velocities

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geom
  }, [])

  useFrame((_, delta) => {
    if (pointsRef.current?.geometry && positionsRef.current && velocitiesRef.current) {
      const pos = positionsRef.current
      const vel = velocitiesRef.current
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += vel[i * 3] * delta * 60
        pos[i * 3 + 1] += vel[i * 3 + 1] * delta * 60
        pos[i * 3 + 2] += vel[i * 3 + 2] * delta * 60

        if (pos[i * 3 + 1] > 30) pos[i * 3 + 1] = 0
        if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 30
      }
      ;(pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.3} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}
