/**
 * SkyGradient Component
 * Full sky gradient - orange to purple to black
 * Creates 80s sunset atmosphere
 */

import { useMemo } from 'react'
import * as THREE from 'three'

export function SkyGradient() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x000000) },
        bottomColor: { value: new THREE.Color(0xff4500) },
        midColor: { value: new THREE.Color(0x6a0dad) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 midColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, 100.0, 0.0)).y;
          vec3 color = mix(bottomColor, midColor, smoothstep(0.0, 0.5, h));
          color = mix(color, topColor, smoothstep(0.5, 1.0, h));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    })
  }, [])

  const geometry = useMemo(() => new THREE.SphereGeometry(500, 32, 32), [])

  return <mesh geometry={geometry} material={material} /> 
}
