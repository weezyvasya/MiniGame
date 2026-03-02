/**
 * useKeyboardControls Hook
 * Tracks W, A, S, D and Shift keys for movement input
 * Returns normalized movement direction and sprint state
 */

import { useState, useEffect, useCallback } from 'react'

export interface KeyboardState {
  /** Forward (W) */
  w: boolean
  /** Backward (S) */
  s: boolean
  /** Left strafe (A) */
  a: boolean
  /** Right strafe (D) */
  d: boolean
  /** Sprint modifier (Shift) */
  shift: boolean
}

export interface MovementInput {
  /** Normalized X axis (-1 to 1, positive = right) */
  x: number
  /** Normalized Z axis (-1 to 1, positive = forward in screen space) */
  z: number
  /** Whether sprint is active */
  sprint: boolean
}

const initialState: KeyboardState = {
  w: false,
  s: false,
  a: false,
  d: false,
  shift: false,
}

export function useKeyboardControls(): { keys: KeyboardState; movement: MovementInput } {
  const [keys, setKeys] = useState<KeyboardState>(initialState)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.code.toLowerCase()
    if (e.repeat) return
    setKeys((prev) => {
      switch (key) {
        case 'keyw':
          return { ...prev, w: true }
        case 'keys':
          return { ...prev, s: true }
        case 'keya':
          return { ...prev, a: true }
        case 'keyd':
          return { ...prev, d: true }
        case 'shiftleft':
        case 'shiftright':
          return { ...prev, shift: true }
        default:
          return prev
      }
    })
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.code.toLowerCase()
    setKeys((prev) => {
      switch (key) {
        case 'keyw':
          return { ...prev, w: false }
        case 'keys':
          return { ...prev, s: false }
        case 'keya':
          return { ...prev, a: false }
        case 'keyd':
          return { ...prev, d: false }
        case 'shiftleft':
        case 'shiftright':
          return { ...prev, shift: false }
        default:
          return prev
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Compute normalized movement vector
  const moveX = (keys.d ? 1 : 0) - (keys.a ? 1 : 0)
  const moveZ = (keys.s ? 1 : 0) - (keys.w ? 1 : 0)
  const length = Math.sqrt(moveX * moveX + moveZ * moveZ)
  const normalizedLength = length > 0 ? 1 : 0

  const movement: MovementInput = {
    x: length > 0 ? (moveX / length) * normalizedLength : 0,
    z: length > 0 ? (moveZ / length) * normalizedLength : 0,
    sprint: keys.shift,
  }

  return { keys, movement }
}
