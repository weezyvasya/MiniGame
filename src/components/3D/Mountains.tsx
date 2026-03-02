/**
 * Mountains Component
 * Low-poly distant mountains or city silhouette
 * Creates depth and 80s backdrop
 */

import { useMemo } from 'react'
import * as THREE from 'three'

export function Mountains() {
  const { geom, mat } = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-60, 0)
    shape.lineTo(-50, 15)
    shape.lineTo(-30, 8)
    shape.lineTo(-10, 20)
    shape.lineTo(20, 5)
    shape.lineTo(50, 18)
    shape.lineTo(70, 0)
    shape.lineTo(-60, 0)

    const extrudeSettings = { depth: 2, bevelEnabled: false }
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geom.rotateX(-Math.PI / 2)
    geom.translate(-5, 0, -45)

    const mat = new THREE.MeshBasicMaterial({
      color: 0x1a0a2e,
      transparent: true,
      opacity: 0.8,
    })

    return { geom, mat }
  }, [])

  return <mesh geometry={geom} material={mat} /> 
}
