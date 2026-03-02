# 80s Synthwave Exploration

A 3D exploration game with full keyboard controls and 80s aesthetic. Built with React Three Fiber, Rapier physics, and Electron.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - R3F helpers
- **@react-three/rapier** - Physics and collision
- **@react-three/postprocessing** - Bloom, Chromatic Aberration, Vignette
- **Zustand** - State management
- **Electron** - Desktop wrapper

## Quick Start

### Development (Browser)

```bash
npm install
npm run dev
```

Open http://localhost:5173 and click to lock the mouse for camera control.

### Development (Electron)

```bash
npm install
npm run electron:dev
```

This builds the Electron main process, starts the Vite dev server, and launches Electron once the server is ready.

### Build for Production

```bash
npm run electron:build
```

Outputs a Windows .exe installer in the `out/` directory.

## Controls

| Key | Action |
|-----|--------|
| W | Move forward |
| S | Move backward |
| A | Strafe left |
| D | Strafe right |
| Shift | Sprint |
| Mouse | Look around |
| Click | Lock pointer |
| ESC | Pause / Menu |

## Project Structure

```
├── electron/           # Electron main process
│   ├── main.ts         # Window config, fullscreen, pointer lock
│   └── preload.ts      # Context bridge APIs
├── src/
│   ├── components/
│   │   ├── 3D/         # Scene, Player, props
│   │   └── UI/         # HUD, PauseMenu
│   ├── hooks/          # useKeyboardControls, useMouseControls
│   └── store/          # Zustand game state
```

## Customization

- **Speed**: Edit `MOVE_SPEED` and `SPRINT_MULTIPLIER` in `src/components/3D/Player.tsx`
- **Sensitivity**: Edit `SENSITIVITY` in the Player's mouse move handler
- **Colors**: 80s palette: #FF6EC7 (pink), #00FFFF (cyan), #6A0DAD (purple), #FF4500 (orange)
