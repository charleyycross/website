import React, { useRef, useState } from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  iconSrc: string;
  position: { x: number, y: number };
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: (id: string, position: { x: number, y: number }) => void;
  onPositionChange: (id: string, position: { x: number, y: number }) => void;
  isDragging?: boolean;
  isSelected?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  iconSrc,
  position,
  onClick,
  onDragStart,
  onDragEnd,
  onPositionChange,
  isDragging = false,
  isSelected = false
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [hasMovedBeyondThreshold, setHasMovedBeyondThreshold] = useState(false);
  
  // Threshold in pixels to distinguish between click and drag
  const dragThreshold = 5;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (iconRef.current) {
      // Capture pointer to ensure smooth dragging
      iconRef.current.setPointerCapture(e.pointerId);
      
      // Record starting positions
      setDragStartPos({ x: e.clientX, y: e.clientY });
      setDragStartOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      
      setDragging(true);
      setHasMovedBeyondThreshold(false);
      onDragStart();
      
      // Prevent text selection during drag
      document.body.classList.add('no-select');
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging) {
      // Calculate distance moved from start position
      const distX = Math.abs(e.clientX - dragStartPos.x);
      const distY = Math.abs(e.clientY - dragStartPos.y);
      
      // Check if moved beyond threshold
      if (!hasMovedBeyondThreshold && (distX > dragThreshold || distY > dragThreshold)) {
        setHasMovedBeyondThreshold(true);
      }
      
      // Only update position if beyond threshold
      if (hasMovedBeyondThreshold) {
        const newX = e.clientX - dragStartOffset.x;
        const newY = e.clientY - dragStartOffset.y;
        onPositionChange(id, { x: newX, y: newY });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    // Always release pointer capture and reset dragging state
    if (iconRef.current && e.pointerId) {
      iconRef.current.releasePointerCapture(e.pointerId);
    }
    
    const wasDragging = dragging;
    const didMove = hasMovedBeyondThreshold;
    
    // Reset all drag-related states
    setDragging(false);
    setHasMovedBeyondThreshold(false);
    document.body.classList.remove('no-select');
    
    // Only process click/drag if we were actually dragging
    if (wasDragging) {
      // If moved beyond threshold, finish drag; otherwise treat as click
      if (didMove) {
        onDragEnd(id, position);
      } else {
        onClick();
      }
    }
  };

  return (
    <div
      ref={iconRef}
      className={`desktop-icon ${dragging || isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: dragging ? 'grabbing' : 'pointer'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="icon-container">
        <img
          src={iconSrc}
          alt={label}
          draggable={false}
          className="icon-image"
        />
      </div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;