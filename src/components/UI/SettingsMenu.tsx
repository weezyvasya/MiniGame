/**
 * Settings Menu - ESC key
 * Brightness, Sharpness, Mouse Sensitivity, Motion Blur, VHS Effect
 * Persists to localStorage
 */

import { useSettingsStore } from '@/store/settingsStore'
import { useGameStore } from '@/store/gameStore'
import styles from './SettingsMenu.module.css'

export function SettingsMenu() {
  const {
    brightness,
    sharpness,
    mouseSensitivity,
    motionBlur,
    vhsEffect,
    setBrightness,
    setSharpness,
    setMouseSensitivity,
    setMotionBlur,
    setVhsEffect,
    reset,
  } = useSettingsStore()
  const setPaused = useGameStore((s) => s.setPaused)

  const handleResume = () => {
    setPaused(false)
    document.querySelector('canvas')?.requestPointerLock()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <h1 className={styles.title}>SETTINGS</h1>
        <p className={styles.subtitle}>1980s Apartment</p>

        <div className={styles.section}>
          <label>Brightness</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
          />
          <span>{brightness.toFixed(1)}</span>
        </div>

        <div className={styles.section}>
          <label>Sharpness</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={sharpness}
            onChange={(e) => setSharpness(parseFloat(e.target.value))}
          />
          <span>{(sharpness * 100).toFixed(0)}%</span>
        </div>

        <div className={styles.section}>
          <label>Mouse Sensitivity</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={mouseSensitivity}
            onChange={(e) => setMouseSensitivity(parseFloat(e.target.value))}
          />
          <span>{mouseSensitivity.toFixed(1)}</span>
        </div>

        <div className={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={motionBlur}
              onChange={(e) => setMotionBlur(e.target.checked)}
            />
            Motion Blur
          </label>
        </div>

        <div className={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={vhsEffect}
              onChange={(e) => setVhsEffect(e.target.checked)}
            />
            VHS Effect
          </label>
        </div>

        <div className={styles.buttons}>
          <button onClick={reset} className={styles.secondary}>Reset</button>
          <button onClick={handleResume} className={styles.primary}>Resume (ESC)</button>
        </div>
      </div>
    </div>
  )
}
