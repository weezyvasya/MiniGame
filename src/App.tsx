/**
 * Main App component
 * Composes the 3D scene with Canvas
 */

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Scene } from '@/components/3D/Scene'
import { HUD } from '@/components/UI/HUD'
import { PauseMenu } from '@/components/UI/PauseMenu'
import { useGameStore } from '@/store/gameStore'
import { useKeyboardEsc } from '@/components/useKeyboardEsc'

function LoadingFallback() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#FF6EC7',
      fontSize: '24px',
    }}>
      Loading 80s World...
    </div>
  )
}

function App() {
  const isPaused = useGameStore((s) => s.isPaused)
  useKeyboardEsc()

  return (
    <>
      <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{ fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Suspense fallback={<LoadingFallback />}>
        {!isPaused && <HUD />}
        {isPaused && <PauseMenu />}
      </Suspense>
    </>
  )
}

export default App
