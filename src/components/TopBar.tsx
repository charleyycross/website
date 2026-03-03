import { useState, useEffect } from 'react';

interface TopBarProps {
  isSoundEnabled: boolean;
}

const TopBar = ({ isSoundEnabled }: TopBarProps) => {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    // Update time immediately
    updateTime();
    
    // Update time every minute
    const intervalId = setInterval(updateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="top-bar">
      <div className="site-title">Charley Cross</div>
      <div className="status-icons">
        <div className="volume-icon">
          {isSoundEnabled ? '🔊' : '🔇'}
        </div>
        <div className="clock">{time}</div>
      </div>
    </div>
  );
};

export default TopBar;