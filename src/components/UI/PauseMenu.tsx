/**
 * PauseMenu Component
 * Shown when ESC is pressed
 * Allows resume and shows controls
 */

import { useGameStore } from '@/store/gameStore'
import styles from './PauseMenu.module.css'

export function PauseMenu() {
  const setPaused = useGameStore((s) => s.setPaused)

  const handleResume = () => {
    setPaused(false)
    const canvas = document.querySelector('canvas')
    if (canvas) canvas.requestPointerLock()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <h1 className={styles.title}>PAUSED</h1>
        <p className={styles.subtitle}>80s Synthwave Exploration</p>
        <button className={styles.button} onClick={handleResume}>
          Resume (ESC)
        </button>
      </div>
    </div>
  )
}
