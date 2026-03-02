/**
 * Scene Component
 * Main 3D composition - physics world, environment, props, effects
 * Composes all 80s world elements with post-processing
 */

import { useRef, useEffect } from 'react'
import { Physics } from '@react-three/rapier'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { Player } from './Player'
import { NeonGridFloor } from './NeonGridFloor'
import { SkyGradient } from './SkyGradient'
import { NeonParticles } from './NeonParticles'
import { Mountains } from './Mountains'
import { GroundCollider } from './GroundCollider'
import { PalmTree, ArcadeCabinet, NeonSign, StreetLamp } from './props'
import { useGameStore } from '@/store/gameStore'

export function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const setPointerLocked = useGameStore((s) => s.setPointerLocked)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvasRef.current = canvas
      canvas.onclick = () => {
        canvas.requestPointerLock()
      }
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      setPointerLocked(document.pointerLockElement !== null)
    }
    document.addEventListener('pointerlockchange', handler)
    return () => document.removeEventListener('pointerlockchange', handler)
  }, [setPointerLocked])

  return (
    <Physics gravity={[0, 0, 0]}>
    <>
      {/* Lighting - 80s neon atmosphere */}
      <ambientLight intensity={0.2} />
      <hemisphereLight
        args={[0xff4500, 0x6a0dad, 0.5]}
        position={[0, 50, 0]}
      />
      <pointLight position={[10, 10, 10]} intensity={1} color={0xff6ec7} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color={0x00ffff} />

      {/* Environment */}
      <SkyGradient />
      <NeonParticles />
      <Mountains />

      {/* Ground - physics collider first */}
      <GroundCollider />
      <NeonGridFloor />

      {/* Props with collision */}
      <PalmTree position={[5, 0, 5]} />
      <PalmTree position={[-8, 0, 3]} />
      <PalmTree position={[10, 0, -5]} />
      <PalmTree position={[-5, 0, -10]} />
      <PalmTree position={[0, 0, 8]} />
      <PalmTree position={[-12, 0, -3]} />
      <PalmTree position={[8, 0, -12]} />

      <ArcadeCabinet position={[3, 0, 0]} />
      <ArcadeCabinet position={[-4, 0, -2]} rotation={0.5} />
      <ArcadeCabinet position={[0, 0, -4]} rotation={1} />

      <NeonSign position={[15, 2, 0]} shape="sun" />
      <NeonSign position={[-15, 2, -10]} shape="grid" />
      <NeonSign position={[0, 2, -15]} shape="palm" />

      <StreetLamp position={[7, 0, 7]} />
      <StreetLamp position={[-7, 0, -7]} />

      {/* Player with camera */}
      <Player />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.001, 0.001)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
    </Physics>
  )
}
