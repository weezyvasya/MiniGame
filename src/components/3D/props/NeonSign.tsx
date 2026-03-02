/**
 * NeonSign Component
 * 80s style neon sign with random shapes
 * Pulsing glow animation
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface NeonSignProps {
  position: [number, number, number]
  shape?: 'grid' | 'sun' | 'palm'
}

const SHAPES = {
  grid: () => {
    const points: THREE.Vector3[] = []
    for (let i = -1; i <= 1; i += 0.5) {
      points.push(new THREE.Vector3(i, -1, 0), new THREE.Vector3(i, 1, 0))
      points.push(new THREE.Vector3(-1, i, 0), new THREE.Vector3(1, i, 0))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  },
  sun: () => {
    const shape = new THREE.Shape()
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const x = Math.cos(angle) * 0.8
      const y = Math.sin(angle) * 0.8
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  },
  palm: () => {
    const points = [
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(0, -0.3, 0),
      new THREE.Vector3(0.5, 0, 0),
    ]
    const curve = new THREE.CatmullRomCurve3(points)
    return new THREE.TubeGeometry(curve, 20, 0.05, 8, false)
  },
}

export function NeonSign({ position, shape = 'sun' }: NeonSignProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  const { geom, mat } = useMemo(() => {
    const geom = shape === 'palm' ? SHAPES.palm() : shape === 'grid' ? SHAPES.grid() : SHAPES.sun()
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff6ec7,
      transparent: true,
      opacity: 0.9,
    })
    return { geom, mat }
  }, [shape])

  useFrame((_, delta) => {
    if (meshRef.current) {
      timeRef.current += delta
      mat.opacity = 0.7 + Math.sin(timeRef.current * 2) * 0.3
    }
  })

  return (
    <RigidBody type="fixed" position={position} colliders="cuboid" args={[0.5, 0.5, 0.1]}>
      <mesh ref={meshRef} geometry={geom} material={mat} scale={0.5} position={[0, 0.5, 0]} />
    </RigidBody>
  )
}
