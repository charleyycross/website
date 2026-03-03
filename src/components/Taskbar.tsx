import { useState } from 'react';
import { useWindowStore } from '../state/windowStore';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';

interface TaskbarProps {
  isSoundEnabled: boolean;
  onSoundToggle: () => void;
  onReboot: () => void;
}

const Taskbar = ({ isSoundEnabled, onSoundToggle, onReboot }: TaskbarProps) => {
  const { windows, focusWindow, toggleMinimize } = useWindowStore();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  const handleTaskbarButtonClick = (id: string) => {
    const window = windows.find(w => w.id === id);
    if (window) {
      if (window.minimized) {
        toggleMinimize(id);
      } else {
        focusWindow(id);
      }
    }
  };
  
  const toggleStartMenu = () => {
    setIsStartMenuOpen(prev => !prev);
  };
  
  const closeStartMenu = () => {
    setIsStartMenuOpen(false);
  };
  
  return (
    <div className="taskbar">
      {/* Left zone: Start button */}
      <div className="taskbar-left">
        <button
          className={`start-button ${isStartMenuOpen ? 'active' : ''}`}
          onClick={toggleStartMenu}
          data-start-button="true"
        >
          Start
        </button>
      </div>
      
      {/* Middle zone: Task buttons with overflow handling */}
      <div className="taskbar-middle">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-button ${window.id === useWindowStore.getState().activeWindowId ? 'active' : ''}`}
            onClick={() => handleTaskbarButtonClick(window.id)}
            title={window.title}
          >
            {window.title}
          </button>
        ))}
      </div>
      
      {/* Right zone: System tray */}
      <div className="taskbar-right">
        <SystemTray
          isSoundEnabled={isSoundEnabled}
          onSoundToggle={onSoundToggle}
        />
      </div>
      
      {isStartMenuOpen && (
        <StartMenu
          isOpen={isStartMenuOpen}
          onClose={closeStartMenu}
          isSoundEnabled={isSoundEnabled}
          onSoundToggle={onSoundToggle}
          onReboot={onReboot}
        />
      )}
    </div>
  );
};

export default Taskbar;