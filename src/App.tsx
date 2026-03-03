import { useState, useEffect } from 'react';
import './styles/global.css';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';
import { useWindowStore } from './state/windowStore';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    // Set a timeout to switch from boot screen to desktop
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 4000); // ~4 seconds boot time to accommodate the new messages
    
    // Clean up the timer if component unmounts
    return () => clearTimeout(bootTimer);
  }, []);

  // Function to handle reboot
  const handleReboot = () => {
    // Close the start menu and all windows before rebooting
    const { closeAllWindows } = useWindowStore.getState();
    
    // Reset window state
    closeAllWindows();
    
    // Show boot screen
    setIsBooting(true);
    
    // Set a timeout to switch back to desktop
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 4000);
    
    return () => clearTimeout(bootTimer);
  };

  // Function to toggle sound
  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };

  return (
    <>
      {isBooting ? (
        <BootScreen />
      ) : (
        <Desktop
          isSoundEnabled={isSoundEnabled}
          onSoundToggle={toggleSound}
          onReboot={handleReboot}
        />
      )}
    </>
  );
}

export default App;
