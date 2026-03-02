# 1980s Apartment Exploration

A detailed, explorable 3D apartment set in 1980s America. Walk through every room, examine objects, and experience authentic 80s interior design. Built with React Three Fiber, Rapier physics, and Electron.

## Features

- **Living Room** - Bulky teal sofa, CRT TV with wooden cabinet, VCR with blinking clock, stereo with animated equalizer, lava lamp, floor lamp, Patrick Nagel posters, ficus plant
- **Kitchen** - Avocado refrigerator, Formica countertops, checkered tile floor, microwave, toaster, blender, fruit bowl, wall phone, July 1984 calendar
- **Bedroom** - Queen bed with floral comforter, nightstand with red LED alarm clock, Rubik's cube, dresser with mirror, vanity, ceiling fan, stuffed animal, closet
- **Bathroom** - Pink/teal fixtures, medicine cabinet, shower curtain, toiletries (Aqua Net style), scale

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - R3F helpers
- **@react-three/rapier** - Physics and collision
- **@react-three/postprocessing** - Bloom, Vignette
- **Zustand** - State management (game + settings with localStorage)
- **Electron** - Desktop wrapper

## Quick Start

### Development (Browser)

```bash
npm install
npm run dev
```

Open http://localhost:5173 and click to lock the mouse.

### Development (Electron)

```bash
npm run electron:dev
```

### Build for Production

```bash
npm run electron:build
```

Outputs a Windows .exe in `out/`.

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
| ESC | Settings menu |

## Settings (ESC)

- **Brightness** (0–2)
- **Sharpness** (0–100%)
- **Mouse Sensitivity** (0.1–2.0)
- **Motion Blur** (toggle)
- **VHS Effect** (toggle)

Settings persist to localStorage.

## Project Structure

```
├── electron/              # Electron main process
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── apartment/   # LivingRoom, Kitchen, Bedroom, Bathroom
│   │   │   ├── Player.tsx
│   │   │   └── Scene.tsx
│   │   └── UI/             # HUD, SettingsMenu
│   ├── lib/materials.ts    # Wood, fabric, plastic, glass, etc.
│   ├── hooks/
│   └── store/              # gameStore, settingsStore
```
