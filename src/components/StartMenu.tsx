import { useRef, useEffect } from 'react';
import { useWindowStore } from '../state/windowStore';
import type { WindowType } from '../state/windowStore';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSoundToggle: () => void;
  isSoundEnabled: boolean;
  onReboot: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  type?: WindowType;
  action?: () => void;
  divider?: boolean;
}

const StartMenu = ({ isOpen, onClose, onSoundToggle, isSoundEnabled, onReboot }: StartMenuProps) => {
  const { openWindow } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close menu
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      // If click is outside the menu and not on the start button (which has data-start-button attribute)
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !(event.target as HTMLElement).closest('[data-start-button]')
      ) {
        onClose();
      }
    };
    
    // Handle Escape key to close menu
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    // Add event listeners
    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // Define menu items
  const menuItems: MenuItem[] = [
    // Apps section
    { id: 'cv', label: 'CV', icon: '📄', type: 'cv' },
    { id: 'projects', label: 'Projects', icon: '🚀', type: 'projects' },
    { id: 'about', label: 'About', icon: '👋', type: 'about' },
    { id: 'contact', label: 'Contact', icon: '📧', type: 'contact' },
    { id: 'trash', label: 'Trash', icon: '🗑️', type: 'trash' },
    { id: 'divider-1', divider: true, label: '', icon: '' },
    
    // OS section
    { id: 'about-os', label: 'About CharleyOS', icon: '💻', type: 'system' },
    { id: 'divider-2', divider: true, label: '', icon: '' },
    
    // System section
    { 
      id: 'sound-toggle', 
      label: `Sound: ${isSoundEnabled ? 'On' : 'Off'}`, 
      icon: isSoundEnabled ? '🔊' : '🔇',
      action: onSoundToggle 
    },
    { 
      id: 'reboot', 
      label: 'Reboot System', 
      icon: '🔄',
      action: onReboot 
    },
  ];
  
  // Handle menu item click
  const handleMenuItemClick = (item: MenuItem) => {
    // If item has a custom action, execute it
    if (item.action) {
      item.action();
    } 
    // Otherwise open a window if type is provided
    else if (item.type) {
      openWindow(item.type, item.label);
    }
    
    // Close the menu after any action
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="start-menu" ref={menuRef}>
      {menuItems.map((item) => (
        item.divider ? (
          <div key={item.id} className="start-menu-divider" />
        ) : (
          <button
            key={item.id}
            className="start-menu-item"
            onClick={() => handleMenuItemClick(item)}
          >
            <span className="start-menu-item-icon">{item.icon}</span>
            <span className="start-menu-item-label">{item.label}</span>
          </button>
        )
      ))}
    </div>
  );
};

export default StartMenu;