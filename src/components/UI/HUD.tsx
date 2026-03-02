/**
 * HUD Component
 * Simple overlay with controls reminder
 * Visible when game is active (not paused)
 */

import styles from './HUD.module.css'

export function HUD() {
  return (
    <div className={styles.hud}>
      <div className={styles.controls}>
        <span>WASD</span>
        <span>Move</span>
      </div>
      <div className={styles.controls}>
        <span>Mouse</span>
        <span>Look</span>
      </div>
      <div className={styles.controls}>
        <span>Shift</span>
        <span>Sprint</span>
      </div>
      <div className={styles.controls}>
        <span>ESC</span>
        <span>Menu</span>
      </div>
    </div>
  )
}
