/**
 * Player Component
 * Combines keyboard and mouse input for first-person movement
 * Uses Rapier for collision detection
 */

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useGameStore } from '@/store/gameStore'
import { useSettingsStore } from '@/store/settingsStore'

const MOVE_SPEED = 3
const SPRINT_MULTIPLIER = 1.5
const COLLISION_RADIUS = 1

export function Player() {
  const rigidBodyRef = useRef<any>(null)
  const { movement } = useKeyboardControls()
  const { camera } = useThree()
  const isPaused = useGameStore((s) => s.isPaused)

  // Get camera yaw/pitch from mouse - we'll track this in useFrame
  const yawRef = useRef(0)
  const pitchRef = useRef(0)

  // Listen for mouse movement (pointer lock events)
  const mouseSensitivity = useSettingsStore((s) => s.mouseSensitivity)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        const SENSITIVITY = 0.002 * mouseSensitivity
        const PITCH_LIMIT = Math.PI / 2 - 0.1
        yawRef.current -= e.movementX * SENSITIVITY
        pitchRef.current -= e.movementY * SENSITIVITY
        pitchRef.current = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitchRef.current))
      }
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () =>     document.removeEventListener('mousemove', handleMouseMove)
  }, [mouseSensitivity])

  useFrame(() => {
    if (isPaused) return

    const rb = rigidBodyRef.current
    if (!rb) return

    const position = rb.translation()
    const pos = new THREE.Vector3(position.x, position.y, position.z)

    // Apply camera rotation from mouse
    camera.rotation.order = 'YXZ'
    camera.rotation.y = yawRef.current
    camera.rotation.x = pitchRef.current

    // Calculate movement direction based on camera yaw (horizontal only)
    const yaw = yawRef.current
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw)
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw)

    forward.y = 0
    right.y = 0
    forward.normalize()
    right.normalize()

    // Movement input (note: positive z = forward = -1 in screen space for W)
    const moveX = movement.x
    const moveZ = -movement.z // Flip: W gives positive forward

    const speed = MOVE_SPEED * (movement.sprint ? SPRINT_MULTIPLIER : 1)
    const velocity = new THREE.Vector3()
      .addScaledVector(right, moveX * speed)
      .addScaledVector(forward, moveZ * speed)

    // Keep y velocity at 0 (ground plane)
    velocity.y = 0

    // Apply velocity to rigid body
    rb.setLinvel(velocity, true)

    // Update camera position to follow player
    camera.position.copy(pos)
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={[2.5, 0.6, 2]}
      colliders="cuboid"
      args={[COLLISION_RADIUS * 0.5, COLLISION_RADIUS, COLLISION_RADIUS * 0.5]}
      lockRotations
      friction={0.9}
      linearDamping={8}
      gravityScale={0}
    />
  )
}
