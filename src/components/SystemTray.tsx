import { useState, useEffect } from 'react';

interface SystemTrayProps {
  isSoundEnabled: boolean;
  onSoundToggle: () => void;
}

const SystemTray = ({ isSoundEnabled, onSoundToggle }: SystemTrayProps) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Update the time every minute
  useEffect(() => {
    // Set initial time
    updateTime();
    
    // Set up interval to update time every minute
    const intervalId = setInterval(() => {
      updateTime();
    }, 60000); // 60000ms = 1 minute
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Format the time as HH:MM in 24-hour format
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  };
  
  return (
    <div className="system-tray">
      {/* Volume Icon */}
      <button 
        className="tray-icon volume-icon" 
        onClick={onSoundToggle}
        title={isSoundEnabled ? "Mute" : "Unmute"}
      >
        {isSoundEnabled ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L4 6H1v4h3l4 4V2z" />
            <path d="M10 4c1.5 1 2.5 2.5 2.5 4s-1 3-2.5 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12 2c2.5 2 3.5 4 3.5 6s-1 4-3.5 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L4 6H1v4h3l4 4V2z" />
            <path d="M14 5L9 10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 5L14 10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </button>
      
      {/* WiFi Icon (decorative) */}
      <div className="tray-icon wifi-icon" title="WiFi Connected">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 12a2 2 0 100 4 2 2 0 000-4z" />
          <path d="M3 7c3-3 7-3 10 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M5 9c1-1 5-1 6 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      
      {/* Battery Icon (decorative) */}
      <div className="tray-icon battery-icon" title="Battery: 85%">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="5" width="12" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="1" y="5" width="10" height="6" fill="currentColor" />
          <rect x="13" y="7" width="2" height="2" fill="currentColor" />
        </svg>
      </div>
      
      {/* Clock */}
      <div className="tray-clock" title="Current Time">
        {currentTime}
      </div>
    </div>
  );
};

export default SystemTray;