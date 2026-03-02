/**
 * NeonGridFloor Component
 * Procedural neon grid with alternating pink/cyan lines
 * Creates a wet asphalt look with glow
 */

import { useMemo } from 'react'
import * as THREE from 'three'

const SIZE = 100
const CELL_SIZE = 2

const PINK = new THREE.Color(0xff6ec7)
const CYAN = new THREE.Color(0x00ffff)

export function NeonGridFloor() {
  const { planeGeom, lineGeom, lineMaterial } = useMemo(() => {
    const planeGeom = new THREE.PlaneGeometry(SIZE, SIZE)
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x050510,
      side: THREE.DoubleSide,
    })

    const linePoints: THREE.Vector3[] = []
    const colors: number[] = []

    for (let i = -SIZE / 2; i <= SIZE / 2; i += CELL_SIZE) {
      const color = Math.floor((i + SIZE / 2) / CELL_SIZE) % 2 === 0 ? PINK : CYAN
      linePoints.push(new THREE.Vector3(i, 0, -SIZE / 2))
      linePoints.push(new THREE.Vector3(i, 0, SIZE / 2))
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
    }
    for (let i = -SIZE / 2; i <= SIZE / 2; i += CELL_SIZE) {
      const color = Math.floor((i + SIZE / 2) / CELL_SIZE) % 2 === 0 ? CYAN : PINK
      linePoints.push(new THREE.Vector3(-SIZE / 2, 0, i))
      linePoints.push(new THREE.Vector3(SIZE / 2, 0, i))
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
    }

    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints)
    lineGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    return { planeGeom, planeMaterial, lineGeom, lineMaterial }
  }, [])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <mesh geometry={planeGeom} material={new THREE.MeshBasicMaterial({ color: 0x030308, side: THREE.DoubleSide })} />
      <lineSegments geometry={lineGeom} material={lineMaterial} />
    </group>
  )
}
