/**
 * Global game state using Zustand
 * Manages pause state, pointer lock, and game settings
 */

import { create } from 'zustand'

interface GameState {
  isPaused: boolean
  isPointerLocked: boolean
  setPaused: (paused: boolean) => void
  setPointerLocked: (locked: boolean) => void
  togglePause: () => void
}

export const useGameStore = create<GameState>((set) => ({
  isPaused: false,
  isPointerLocked: false,
  setPaused: (paused) => set({ isPaused: paused }),
  setPointerLocked: (locked) => set({ isPointerLocked: locked }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
}))
