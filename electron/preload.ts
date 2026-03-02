/**
 * Electron Preload Script
 * Exposes safe APIs to the renderer process via contextBridge
 */

import { contextBridge } from 'electron'

// Expose protected methods to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
})
