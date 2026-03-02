/**
 * Sky Component
 * Gradient skybox - orange horizon, purple mid, black top
 * Sunset atmosphere with sun disk
 */

import { useMemo } from 'react'
import * as THREE from 'three'

export function Sky() {
  const { scene } = useMemo(() => {
    const scene = new THREE.Scene()

    // Gradient sky via hemisphere light + directional
    const hemiLight = new THREE.HemisphereLight(0xff4500, 0x0a0a0f, 0.5)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xff6ec7, 0.3)
    dirLight.position.set(10, 20, 10)
    scene.add(dirLight)

    // Sun disk - simple quad
    const sunGeom = new THREE.PlaneGeometry(20, 20)
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xff4500,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    })
    const sun = new THREE.Mesh(sunGeom, sunMat)
    sun.position.set(50, 30, -80)
    sun.lookAt(0, 0, 0)
    scene.add(sun)

    return { scene }
  }, [])

  return (
    <group>
      <primitive object={scene} />
    </group>
  )
}
