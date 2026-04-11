// src/components/Canvas.tsx
'use client';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import { useEffect, useState } from 'react';
import { DrawShape, Tool } from '../types/canvas';
import { useDraw } from '../hooks/useDraw';
import { useSocket } from '../hooks/useSocket';

interface CanvasProps {
  initialShapes: DrawShape[];
  roomId: string;
}

export const Canvas = ({ initialShapes, roomId }: CanvasProps) => {
  const [token, setToken] = useState<string>('');
  
  // 1. New States for Infinite Canvas & Full Screen
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);

    // Initial resize to fill the screen instantly
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    // Auto-resize when window changes
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socket = useSocket(roomId, token);

  const { 
    stageRef, setShapes, shapes, preview, 
    handleMouseDown, handleMouseMove, handleMouseUp, 
    tool, setTool 
  } = useDraw(initialShapes, socket, roomId);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'chat') {
        const newShape = JSON.parse(data.message);
        setShapes((prev) => [...prev, newShape]);
      }
    };
  }, [socket, setShapes]);

  // 2. The Zoom & Pan Logic
  const handleWheel = (e: any) => {
    e.evt.preventDefault(); // Stop entire page from scrolling
    const stage = stageRef.current;
    if (!stage) return;

    // Zooming (Ctrl + Scroll, or Pinch on Trackpad)
    if (e.evt.ctrlKey || e.evt.metaKey) {
      const scaleBy = 1.1;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      setStageScale(newScale);
      setStagePos({
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      });
    } else {
      // Panning (Normal Scroll/Trackpad drag)
      setStagePos((prev) => ({
        x: prev.x - e.evt.deltaX,
        y: prev.y - e.evt.deltaY,
      }));
    }
  };

  const renderShape = (shape: DrawShape, i: string | number, isPreview = false) => {
    const commonProps = {
      stroke: 'white',
      strokeWidth: 2,
      dash: isPreview ? [5, 5] : undefined,
    };

    if (shape.shape === 'rect') {
      return <Rect key={i} x={shape.x} y={shape.y} width={shape.width} height={shape.height} {...commonProps} />;
    }
    if (shape.shape === 'circle') {
      return <Circle key={i} x={shape.x} y={shape.y} radius={shape.radius} {...commonProps} />;
    }
    if (shape.shape === 'line') {
      return <Line key={i} points={shape.points} tension={0.5} lineCap="round" lineJoin="round" {...commonProps} />;
    }
    return null;
  };

  return (
    <div className="relative w-full h-screen bg-[#121212] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e1e] border border-white/10 p-2 rounded-xl flex gap-2 shadow-xl">
        {(['select', 'pan', 'line', 'rect', 'circle'] as Tool[]).map((t) => (
          <button
            key={t}
            onClick={() => setTool(t)}
            className={`px-4 py-2 rounded-lg font-bold capitalize transition-all ${
              tool === t ? 'bg-[#8B5CF6] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* KONVA STAGE */}
      {/* We wait until windowSize is calculated before rendering to prevent hydration errors */}
      {windowSize.width > 0 && (
        <Stage
          width={windowSize.width}
          height={windowSize.height}
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel} // Attach the zoom/scroll logic
          draggable={tool === 'pan'} // Enable drag ONLY when pan tool is selected
          onDragEnd={(e) => {
            // If they dragged with the pan tool, save the new position!
            if (tool === 'pan') {
              setStagePos({ x: e.target.x(), y: e.target.y() });
            }
          }}
          x={stagePos.x}
          y={stagePos.y}
          scaleX={stageScale}
          scaleY={stageScale}
          className={
            tool === 'pan' ? 'cursor-grab active:cursor-grabbing' : 
            tool === 'select' ? 'cursor-default' : 'cursor-crosshair'
          }
        >
          <Layer>
            {shapes.map((shape, i) => renderShape(shape, i))}
            {preview && renderShape(preview, 'preview', true)}
          </Layer>
        </Stage>
      )}
    </div>
  );
};