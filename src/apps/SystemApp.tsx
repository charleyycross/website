import React from 'react';

const SystemApp = () => {
  return (
    <div className="system-app">
      <div className="about-os">
        <h2>About CharleyOS</h2>
        <div className="os-logo">💻</div>
        <div className="os-info">
          <p><strong>CharleyOS</strong></p>
          <p>Version 1.0</p>
          <p>© 2026 Charley Cross</p>
          <p>A pixel-perfect retro operating system experience</p>
        </div>
        <div className="system-specs">
          <h3>System Information</h3>
          <ul>
            <li>CPU: React Processor</li>
            <li>Memory: Unlimited</li>
            <li>Storage: Web Browser Cache</li>
            <li>Display: Pixel Perfect</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemApp;