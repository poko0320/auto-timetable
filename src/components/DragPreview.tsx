import React from 'react';
import { X } from 'lucide-react';

interface DragPreviewProps {
  nodeType: string;
  isDragging: boolean;
  position: { x: number; y: number };
}

export const DragPreview: React.FC<DragPreviewProps> = ({ 
  nodeType, 
  isDragging, 
  position 
}) => {
  if (!isDragging) return null;

  return (
    <div 
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        left: position.x, 
        top: position.y 
      }}
    >
      <div className="bg-white border-2 border-blue-400 rounded-lg shadow-lg p-3 min-w-[120px]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            {nodeType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DragPreview;