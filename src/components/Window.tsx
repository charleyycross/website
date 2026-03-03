import React, { useRef, useEffect, lazy, Suspense } from 'react';
import { useWindowStore, type WindowState } from '../state/windowStore';

interface WindowProps {
  window: WindowState;
}

const Window = ({ window }: WindowProps) => {
  const { closeWindow, focusWindow, moveWindow } = useWindowStore();
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number }>({
    isDragging: false,
    startX: 0,
    startY: 0,
  });
  
  // Handle window focus
  const handleWindowClick = () => {
    focusWindow(window.id);
  };
  
  // Handle window close
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(window.id);
  };
  
  // Handle window minimize
  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    useWindowStore.getState().toggleMinimize(window.id);
  };
  
  // Handle drag start
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    dragRef.current = {
      isDragging: true,
      startX: e.clientX - window.x,
      startY: e.clientY - window.y,
    };
    
    // Focus window when starting to drag
    focusWindow(window.id);
  };
  
  // Set up drag event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current.isDragging) {
        // Calculate new position
        let newX = e.clientX - dragRef.current.startX;
        let newY = e.clientY - dragRef.current.startY;
        
        // Get window dimensions
        const windowWidth = windowRef.current?.offsetWidth || 400;
        const windowHeight = windowRef.current?.offsetHeight || 300;
        
        // Apply bounds checking
        // Left boundary
        if (newX < 0) newX = 0;
        // Right boundary
        if (newX + windowWidth > globalThis.window.innerWidth) {
          newX = globalThis.window.innerWidth - windowWidth;
        }
        // Top boundary
        if (newY < 40) newY = 40; // Keep below top bar
        // Bottom boundary
        if (newY + windowHeight > globalThis.window.innerHeight - 50) {
          newY = globalThis.window.innerHeight - windowHeight - 50; // Keep above taskbar
        }
        
        moveWindow(window.id, newX, newY);
      }
    };
    
    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window.id, moveWindow]);
  
  // Import app components
  const TrashApp = lazy(() => import('../apps/TrashApp'));
  const SystemApp = lazy(() => import('../apps/SystemApp'));
  
  // Render appropriate app content based on window type
  const renderContent = () => {
    switch (window.type) {
      case 'cv':
        return <div>CV Content</div>;
      case 'projects':
        return <div>Projects Content</div>;
      case 'about':
        return <div>About Content</div>;
      case 'contact':
        return <div>Contact Content</div>;
      case 'trash':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <TrashApp />
          </Suspense>
        );
      case 'system':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <SystemApp />
          </Suspense>
        );
      default:
        return <div>Unknown window type</div>;
    }
  };
  
  // Don't render if minimized
  if (window.minimized) {
    return null;
  }
  
  const isActive = window.id === useWindowStore.getState().activeWindowId;
  
  return (
    <div
      ref={windowRef}
      className={`window ${isActive ? 'active' : ''}`}
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        zIndex: window.z,
      }}
      onClick={handleWindowClick}
    >
      <div 
        className="window-title-bar"
        onMouseDown={handleDragStart}
      >
        <div className="window-title">{window.title}</div>
        <div className="window-controls">
          <button className="window-button minimize" onClick={handleMinimizeClick}>
            _
          </button>
          <button className="window-button close" onClick={handleCloseClick}>
            ×
          </button>
        </div>
      </div>
      <div className="window-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Window;