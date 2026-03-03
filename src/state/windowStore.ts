import { create } from 'zustand';

// Define window types
export type WindowType = 'cv' | 'projects' | 'about' | 'contact' | 'trash' | 'system';

// Define window state interface
export interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

// Define window manager state interface
interface WindowManagerState {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZ: number;
  
  // Actions
  openWindow: (windowType: WindowType, title: string) => void;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
}

// Helper function to generate window positions with cascade effect
const getWindowPosition = (windowType: WindowType, windowCount: number) => {
  // Center windows more in the middle of the screen
  const baseX = window.innerWidth / 2 - 200; // Half screen width minus half window width
  const baseY = window.innerHeight / 2 - 150; // Half screen height minus half window height
  const offsetX = 40;
  const offsetY = 40;
  
  return {
    x: baseX + (windowCount % 3) * offsetX,
    y: baseY + (windowCount % 3) * offsetY,
  };
};

// Create the store
export const useWindowStore = create<WindowManagerState>((set) => ({
  windows: [],
  activeWindowId: null,
  nextZ: 1,
  
  openWindow: (windowType: WindowType, title: string) => set((state) => {
    const id = `${windowType}-${Date.now()}`;
    const { x, y } = getWindowPosition(windowType, state.windows.length);
    
    const newWindow: WindowState = {
      id,
      type: windowType,
      title,
      x,
      y,
      z: state.nextZ,
      minimized: false,
    };
    
    return {
      windows: [...state.windows, newWindow],
      activeWindowId: id,
      nextZ: state.nextZ + 1,
    };
  }),
  
  closeWindow: (id: string) => set((state) => {
    const windows = state.windows.filter(window => window.id !== id);
    
    // If the closed window was active, set the highest z-index window as active
    let activeWindowId = state.activeWindowId;
    if (activeWindowId === id) {
      const topWindow = [...windows].sort((a, b) => b.z - a.z)[0];
      activeWindowId = topWindow ? topWindow.id : null;
    }
    
    return {
      windows,
      activeWindowId,
    };
  }),
  
  focusWindow: (id: string) => set((state) => {
    const windowToFocus = state.windows.find(window => window.id === id);
    
    if (!windowToFocus) {
      return state;
    }
    
    // Update z-index for the focused window
    const updatedWindows = state.windows.map(window => {
      if (window.id === id) {
        return { ...window, z: state.nextZ, minimized: false };
      }
      return window;
    });
    
    return {
      windows: updatedWindows,
      activeWindowId: id,
      nextZ: state.nextZ + 1,
    };
  }),
  
  toggleMinimize: (id: string) => set((state) => {
    const targetWindow = state.windows.find(window => window.id === id);
    if (!targetWindow) return state;
    
    const updatedWindows = state.windows.map(window => {
      if (window.id === id) {
        return { ...window, minimized: !window.minimized };
      }
      return window;
    });
    
    // If we're minimizing the active window, set activeWindowId to null
    // If we're restoring a window, make it active
    let activeWindowId = state.activeWindowId;
    
    if (!targetWindow.minimized) {
      // Window is being minimized
      activeWindowId = activeWindowId === id ? null : activeWindowId;
    } else {
      // Window is being restored
      activeWindowId = id;
    }
    
    return {
      windows: updatedWindows,
      activeWindowId,
    };
  }),
  
  moveWindow: (id: string, x: number, y: number) => set((state) => {
    const updatedWindows = state.windows.map(window => {
      if (window.id === id) {
        return { ...window, x, y };
      }
      return window;
    });
    
    return {
      windows: updatedWindows,
    };
  }),
  
  closeAllWindows: () => set(() => {
    return {
      windows: [],
      activeWindowId: null,
      nextZ: 1,
    };
  }),
}));