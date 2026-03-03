import { useState, useEffect, useRef } from 'react';
import { useWindowStore, type WindowType } from '../state/windowStore';
import TopBar from './TopBar';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';

interface DesktopIconData {
  id: string;
  type: WindowType;
  label: string;
  icon: string;
  position: { x: number, y: number };
}

interface DesktopProps {
  isSoundEnabled: boolean;
  onSoundToggle: () => void;
  onReboot: () => void;
}


const Desktop = ({ isSoundEnabled, onSoundToggle, onReboot }: DesktopProps) => {
  const { windows, openWindow } = useWindowStore();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [desktopBounds, setDesktopBounds] = useState({ width: 0, height: 0 });
  // Track which icon is being dragged (for visual styling)
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  
  // Initialize icons with default positions
  const [icons, setIcons] = useState<DesktopIconData[]>(() => {
    // Default positions - we'll arrange them in a grid initially
    const defaultPositions = [
      { x: 20, y: 20 },  // CV
      { x: 20, y: 150 }, // Projects
      { x: 20, y: 280 }, // About
      { x: 20, y: 410 }, // Contact
      { x: 20, y: 540 }, // Trash (will be repositioned)
    ];
    
    return [
      { id: 'cv', type: 'cv', label: 'CV', icon: '📄', position: defaultPositions[0] },
      { id: 'projects', type: 'projects', label: 'Projects', icon: '🚀', position: defaultPositions[1] },
      { id: 'about', type: 'about', label: 'About', icon: '👋', position: defaultPositions[2] },
      { id: 'contact', type: 'contact', label: 'Contact', icon: '📧', position: defaultPositions[3] },
      { id: 'trash', type: 'trash', label: 'Trash', icon: '🗑️', position: defaultPositions[4] },
    ];
  });
  
  // Calculate desktop bounds on mount and window resize
  useEffect(() => {
    const updateBounds = () => {
      if (desktopRef.current) {
        // Get desktop dimensions, accounting for taskbar and topbar
        const rect = desktopRef.current.getBoundingClientRect();
        setDesktopBounds({
          width: rect.width,
          height: rect.height - 50, // Subtract taskbar height
        });
        
        // Reposition trash icon to bottom right if we have bounds
        setIcons(prevIcons => {
          const updatedIcons = [...prevIcons];
          const trashIndex = updatedIcons.findIndex(icon => icon.id === 'trash');
          
          if (trashIndex !== -1 && rect.width > 0) {
            // Position trash icon in bottom right, but ensure it's fully visible
            // Move it higher up and more to the left to avoid any clipping
            updatedIcons[trashIndex] = {
              ...updatedIcons[trashIndex],
              position: {
                x: Math.max(0, rect.width - 150), // More to the left
                y: Math.max(0, rect.height - 220) // Higher up to avoid taskbar
              }
            };
          }
          
          return updatedIcons;
        });
      }
    };
    
    // Initial calculation
    updateBounds();
    
    // Update on window resize
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);
  
  const handleIconClick = (type: WindowType, label: string) => {
    openWindow(type, label);
  };
  
  const handleDragStart = (id: string) => {
    setActiveDragId(id);
  };
  
  const handlePositionChange = (id: string, newPosition: { x: number, y: number }) => {
    // Apply bounds clamping
    const clampedPosition = clampPositionToBounds(id, newPosition);
    
    setIcons(prevIcons =>
      prevIcons.map(icon =>
        icon.id === id ? { ...icon, position: clampedPosition } : icon
      )
    );
  };
  
  const handleDragEnd = (id: string, position: { x: number, y: number }) => {
    setActiveDragId(null);
    
    // Final position with bounds clamping only (no grid snapping)
    const finalPosition = clampPositionToBounds(id, position);
    
    setIcons(prevIcons =>
      prevIcons.map(icon =>
        icon.id === id ? { ...icon, position: finalPosition } : icon
      )
    );
  };
  
  // Helper function to clamp position within desktop bounds
  const clampPositionToBounds = (id: string, position: { x: number, y: number }) => {
    const icon = icons.find(i => i.id === id);
    if (!icon) return position;
    
    // Icon dimensions (approximate based on CSS)
    const iconWidth = 100;
    const iconHeight = 110;
    
    return {
      x: Math.max(0, Math.min(position.x, desktopBounds.width - iconWidth)),
      y: Math.max(0, Math.min(position.y, desktopBounds.height - iconHeight))
    };
  };
  
  return (
    <div className="desktop" ref={desktopRef}>
      <TopBar isSoundEnabled={isSoundEnabled} />
      
      <div className="desktop-icons-container">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            position={icon.position}
            onClick={() => handleIconClick(icon.type, icon.label)}
            onDragStart={() => handleDragStart(icon.id)}
            onDragEnd={handleDragEnd}
            onPositionChange={handlePositionChange}
            // Pass whether this icon is currently being dragged
            isDragging={activeDragId === icon.id}
          />
        ))}
      </div>
      
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
        />
      ))}
      
      <Taskbar
        isSoundEnabled={isSoundEnabled}
        onSoundToggle={onSoundToggle}
        onReboot={onReboot}
      />
    </div>
  );
};

export default Desktop;