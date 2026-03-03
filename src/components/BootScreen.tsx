import { useEffect, useState } from 'react';

const BootScreen = () => {
  const [progress, setProgress] = useState(0);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  
  // Status messages to display
  const messages = [
    "Loading UI engine...",
    "Mounting assets...",
    "Initializing apps...",
    "Starting window manager..."
  ];
  
  // Animate the loading bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // Slower increment for longer animation
      });
    }, 40); // Update every 40ms (total ~4000ms)
    
    return () => clearInterval(interval);
  }, []);
  
  // Add status messages one by one
  useEffect(() => {
    const messageIntervals = messages.map((_, index) => {
      return setTimeout(() => {
        setStatusMessages(prev => [...prev, messages[index]]);
      }, 800 + index * 800); // Start after 800ms, then every 800ms
    });
    
    return () => messageIntervals.forEach(clearTimeout);
  }, []);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blink every 500ms
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Pre-render all message elements for consistent layout
  const renderMessages = () => {
    // Always render all message slots for consistent layout
    const elements = [];
    
    // Add the "Booting system..." header
    elements.push(
      <p key="boot-header" className="boot-message">Booting system...</p>
    );
    
    // Add all status messages (visible or placeholder)
    for (let i = 0; i < messages.length; i++) {
      if (i < statusMessages.length) {
        // This message is visible
        elements.push(
          <p key={i} className="status-message">
            <span className="status-ok">[ OK ]</span>
            <span>{statusMessages[i]}</span>
            {i === statusMessages.length - 1 && showCursor &&
              <span className="blinking-cursor">_</span>}
          </p>
        );
      } else {
        // This is a placeholder for consistent layout
        elements.push(
          <p key={`placeholder-${i}`} className="status-message placeholder">
            <span className="status-ok">[ OK ]</span>
            <span>Placeholder</span>
          </p>
        );
      }
    }
    
    return elements;
  };
  
  return (
    <div className="boot-screen">
      <div className="boot-content">
        <h1 className="boot-title">CharleyOS v1.0</h1>
        <div className="boot-messages">
          {renderMessages()}
        </div>
        
        <div className="loading-bar-container">
          <div
            className="loading-bar-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootScreen;