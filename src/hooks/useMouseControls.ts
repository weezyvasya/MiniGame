/**
 * useMouseControls Hook
 * Tracks mouse movement for camera rotation (yaw/pitch)
 * Manages pointer lock API for FPS-style camera control
 */

import { useState, useEffect, useCallback, useRef } from 'react'

const SENSITIVITY = 0.002
const PITCH_LIMIT = Math.PI / 2 - 0.1 // ~80 degrees to prevent flip

interface MouseStateInternal {
  yaw: number
  pitch: number
  isLocked: boolean
}

export interface MouseState extends MouseStateInternal {
  requestLock: () => void
}

export function useMouseControls(
  enabled: boolean,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
): MouseState {
  const [state, setState] = useState<MouseStateInternal>({
    yaw: 0,
    pitch: 0,
    isLocked: false,
  })

  const yawRef = useRef(0)
  const pitchRef = useRef(0)

  const handlePointerLockChange = useCallback(() => {
    const isLocked = document.pointerLockElement === canvasRef.current
    setState((prev: MouseStateInternal) => ({ ...prev, isLocked }))
    document.body.classList.toggle('pointer-locked', isLocked)
  }, [canvasRef])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return
      if (document.pointerLockElement !== canvasRef.current) return

      const deltaX = e.movementX
      const deltaY = e.movementY

      yawRef.current -= deltaX * SENSITIVITY
      pitchRef.current -= deltaY * SENSITIVITY
      pitchRef.current = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitchRef.current))

      setState({
        yaw: yawRef.current,
        pitch: pitchRef.current,
        isLocked: true,
      })
    },
    [enabled, canvasRef]
  )

  const requestLock = useCallback(() => {
    if (canvasRef.current && enabled) {
      canvasRef.current.requestPointerLock()
    }
  }, [canvasRef, enabled])

  useEffect(() => {
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handlePointerLockChange, handleMouseMove])

  return { ...state, requestLock }
}
