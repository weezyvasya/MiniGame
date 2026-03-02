/**
 * Applies brightness from settings to renderer
 */

import { useFrame } from '@react-three/fiber'
import { useSettingsStore } from '@/store/settingsStore'

export function ExposureController() {
  const brightness = useSettingsStore((s) => s.brightness)

  useFrame(({ gl }) => {
    gl.toneMappingExposure = brightness
  })

  return null
}
