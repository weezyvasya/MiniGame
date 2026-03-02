/**
 * Settings store - Graphics and controls
 * Persists to localStorage, applies to renderer and post-processing
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Settings {
  brightness: number
  sharpness: number
  mouseSensitivity: number
  motionBlur: boolean
  vhsEffect: boolean
  soundVolume: number
  setBrightness: (v: number) => void
  setSharpness: (v: number) => void
  setMouseSensitivity: (v: number) => void
  setMotionBlur: (v: boolean) => void
  setVhsEffect: (v: boolean) => void
  setSoundVolume: (v: number) => void
  update: (u: Partial<Pick<Settings, 'brightness' | 'sharpness' | 'mouseSensitivity' | 'motionBlur' | 'vhsEffect' | 'soundVolume'>>) => void
  reset: () => void
}

const defaults = {
  brightness: 1.0,
  sharpness: 1.0,
  mouseSensitivity: 1.0,
  motionBlur: false,
  vhsEffect: false,
  soundVolume: 1.0,
}

export const useSettingsStore = create<Settings>()(
  persist(
    (set) => ({
      ...defaults,
      setBrightness: (v) => set({ brightness: Math.max(0, Math.min(2, v)) }),
      setSharpness: (v) => set({ sharpness: Math.max(0, Math.min(1, v)) }),
      setMouseSensitivity: (v) => set({ mouseSensitivity: Math.max(0.1, Math.min(2, v)) }),
      setMotionBlur: (v) => set({ motionBlur: v }),
      setVhsEffect: (v) => set({ vhsEffect: v }),
      setSoundVolume: (v) => set({ soundVolume: Math.max(0, Math.min(1, v)) }),
      update: (u) => set(u),
      reset: () => set(defaults),
    }),
    { name: 'apartment-settings', partialize: (s) => ({ brightness: s.brightness, sharpness: s.sharpness, mouseSensitivity: s.mouseSensitivity, motionBlur: s.motionBlur, vhsEffect: s.vhsEffect, soundVolume: s.soundVolume }) }
  )
)
