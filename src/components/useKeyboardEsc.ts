/**
 * ESC key handler for pause toggle
 */

import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'

export function useKeyboardEsc() {
  const togglePause = useGameStore((s) => s.togglePause)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        togglePause()
        if (document.pointerLockElement) {
          document.exitPointerLock()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [togglePause])
}
