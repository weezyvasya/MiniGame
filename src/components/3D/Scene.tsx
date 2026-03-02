/**
 * Scene - 1980s Apartment
 * Composes apartment, lighting, post-processing
 */

import { useEffect } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Apartment } from './apartment/Apartment'
import { ExposureController } from './ExposureController'
import { useGameStore } from '@/store/gameStore'
import { useSettingsStore } from '@/store/settingsStore'

export function Scene() {
  const setPointerLocked = useGameStore((s) => s.setPointerLocked)
  const brightness = useSettingsStore((s) => s.brightness)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.onclick = () => canvas.requestPointerLock()
    }
  }, [])

  useEffect(() => {
    const handler = () => setPointerLocked(document.pointerLockElement !== null)
    document.addEventListener('pointerlockchange', handler)
    return () => document.removeEventListener('pointerlockchange', handler)
  }, [setPointerLocked])

  return (
    <>
      <ExposureController />
      <Apartment />
      <EffectComposer>
        <Bloom intensity={0.4 * brightness} luminanceThreshold={0.6} luminanceSmoothing={0.9} />
        <Vignette offset={0.2} darkness={0.4} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  )
}
