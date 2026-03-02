/**
 * GroundCollider Component
 * Invisible ground plane for Rapier physics
 * Prevents player from falling through
 */

import { RigidBody } from '@react-three/rapier'

export function GroundCollider() {
  return (
    <RigidBody type="fixed" colliders="cuboid" args={[100, 0.5, 100]} position={[0, -0.5, 0]} />
  )
}
