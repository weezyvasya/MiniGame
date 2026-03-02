/**
 * Procedural materials for 80s apartment
 * Wood, fabric, plastic, metal, glass with proper PBR properties
 */

import * as THREE from 'three'

/** Wood grain - oak, walnut tones with subtle gloss */
export function createWoodMaterial(color = 0x8b6914, gloss = 0.3): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7 - gloss,
    metalness: 0.05,
    envMapIntensity: 0.3,
  })
}

/** Velvet/textured fabric for sofa, upholstery */
export function createFabricMaterial(color = 0x2d5a4a): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.95,
    metalness: 0,
  })
}

/** Plastic - glossy with slight reflection */
export function createPlasticMaterial(color = 0x888888): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.4,
    metalness: 0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
  })
}

/** Metal - brass, chrome */
export function createMetalMaterial(color = 0xb8860b, roughness = 0.3): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.9,
  })
}

/** Glass - transparent with refraction */
export function createGlassMaterial(color = 0xffffff, opacity = 0.15): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    transparent: true,
    opacity,
    roughness: 0.05,
    metalness: 0,
    transmission: 0.95,
    thickness: 0.1,
    clearcoat: 0.5,
  })
}

/** Carpet - shag, fuzzy appearance */
export function createCarpetMaterial(color = 0xc4a035): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 1,
    metalness: 0,
  })
}

/** Formica countertop */
export function createFormicaMaterial(color = 0xe8e0c0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.6,
    metalness: 0,
  })
}

/** Ceramic - sink, toilet */
export function createCeramicMaterial(color = 0xffe4e1): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.2,
    metalness: 0,
  })
}

/** Wall - wallpaper, paint */
export function createWallMaterial(color = 0xf5f0e0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0,
  })
}

/** Wood paneling - darker wood for lower wall */
export function createPanelingMaterial(): THREE.MeshStandardMaterial {
  return createWoodMaterial(0x4a3728, 0.1)
}
