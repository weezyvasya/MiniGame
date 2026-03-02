/**
 * Apartment - Main container
 * Layout: Living (0,0) | Kitchen (5,0)
 *         Bathroom (0,4) | Bedroom (2,4)
 * Units in meters, Y up
 */

import { Physics } from '@react-three/rapier'
import { LivingRoom } from './LivingRoom'
import { Kitchen } from './Kitchen'
import { Bedroom } from './Bedroom'
import { Bathroom } from './Bathroom'
import { ApartmentShell } from './ApartmentShell'
import { ApartmentLighting } from './ApartmentLighting'
import { Player } from '../Player'

export function Apartment() {
  return (
    <Physics gravity={[0, 0, 0]}>
      <ApartmentLighting />
      <ApartmentShell />
      <LivingRoom />
      <Kitchen />
      <Bedroom />
      <Bathroom />
      <Player />
    </Physics>
  )
}
