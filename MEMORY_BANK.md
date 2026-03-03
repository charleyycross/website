# Memory Bank

## 2026-03-03
### Prompt Summary
- Phase 2 – Draggable desktop icons
- Implemented click-and-drag functionality for desktop icons

### Milestones Completed
- Added per-icon position state
- Pointer-based drag with threshold
- Clamped positions to desktop bounds

### Architecture Notes
- Icon positions live in Desktop component state
- Click vs drag distinguished using a threshold (5px)
- Pointer events with capture for smooth dragging

### Next Suggested Slice
- localStorage persistence for icon positions
- Icon selection rectangle (purely visual)
- Double-click to open

## 2026-03-03
### Prompt Summary
- Reboot resets window state
- Added functionality to close all windows when rebooting

### Milestones Completed
- Added closeAllWindows action to window manager
- Reboot now clears windows + returns to boot screen
- Fixed potential race condition between window state and boot screen

### Architecture Notes
- Reset logic lives in windowStore.ts as closeAllWindows()
- Reboot call sequence: closeAllWindows -> setIsBooting(true) -> timer -> setIsBooting(false)
- Window state is completely reset (windows array emptied, activeWindowId null, nextZ reset to 1)

### Next Suggested Slice
- Show Desktop (minimize all windows)
- Start menu polish (keyboard navigation)
- Taskbar active/minimized styling polish

## 2026-03-03
### Prompt Summary
- Phase 2 – System Tray + Clock
- Added system tray with clock and icons to the bottom-right taskbar

### Milestones Completed
- SystemTray component added
- Clock added + interval update
- Volume icon wired to sound state
- Decorative WiFi + Battery icons
- Taskbar overflow behavior (clipped, no scrolling)

### Architecture Notes
- Clock interval lives in SystemTray component with proper cleanup on unmount
- Volume toggle connects to global sound state via props from App.tsx
- Overflow clipping implemented via CSS flexbox:
  - Left zone (Start): flex: 0 0 auto
  - Middle zone (Tasks): flex: 1 1 auto; overflow: hidden
  - Right zone (SystemTray): flex: 0 0 auto

### Next Suggested Slice
- Task button active/minimized styling polish
- Show Desktop button (minimize all windows)
- Trash can desktop icon polish
- Top bar system icon refinement

## 2026-03-03
### Prompt Summary
- Phase 2 – Start Menu
- Added classic pixel Windows 95 style Start Menu in the bottom-left taskbar

### Milestones Completed
- Start button + menu popup
- App launch from menu
- Click-outside + Esc close
- Sound toggle state
- Reboot System hook
- Added About CharleyOS app + Trash app
- Added Trash icon on desktop

### Architecture Notes
- Start menu state lives in Taskbar component
- isSoundEnabled state lives in App.tsx and is passed down as props
- Reboot is triggered by setting isBooting to true in App.tsx
- Click-outside handled with document pointerdown listener and ref
- Escape key close handled with keydown listener

### Next Suggested Slice
- Top bar wifi/battery/volume icons
- Taskbar active window styling + scroll if many windows
- Add more desktop customization options
- Boot screen polish (scanlines/frame if desired)

## 2026-03-03
### Prompt Summary
- Phase 2 – Boot Screen implementation
- Added retro OS boot animation before desktop loads

### Milestones Completed
- Boot screen component created
- Timed transition to desktop
- Loading bar animation
- Sequential status messages with blinking cursor
- Pixel-styled UI consistent with OS theme

### Current Architecture/State Notes
- Boot state lives in App.tsx
- No persistence yet (always shows boot on refresh)
- Components: BootScreen, Desktop, TopBar, Taskbar, DesktopIcon, Window
- App windows: CV, Projects, About, Contact
- Pink color scheme with pixel styling
- Google Fonts: Pixelify Sans and Press Start 2P

### Next Suggested Slice
- Start menu implementation
- Top bar system icons
- Trash can desktop app
- Window minimize/maximize animations
- Boot sound effects

## 2026-03-02
### Prompt Summary
- Initial setup of retro pixel-desktop personal website
- Vite + React + TypeScript with minimal CSS
- Fake desktop UI with windows, icons, taskbar

### Milestones Completed
- Initialized Vite + React + TypeScript project
- Set up project structure with components and apps
- Created window manager state using Zustand store
- Implemented draggable windows with bounds checking
- Added desktop icons, top bar, and taskbar
- Created basic app components (CV, Projects, About, Contact)

### Current Architecture/State Notes
- Single-page application with fake desktop UI
- Window manager state using Zustand store
- Components: Desktop, TopBar, Taskbar, DesktopIcon, Window
- App windows: CV, Projects, About, Contact
- Pink color scheme with pixel styling
- Google Fonts: Pixelify Sans and Press Start 2P

### Next Suggested Slice
- Add boot splash animation
- Implement right-click context menu
- Add sound effects for window interactions
- Add window resize functionality
- Implement window minimize/maximize animations