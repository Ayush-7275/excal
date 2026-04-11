// src/hooks/useDraw.ts
import { useRef, useState } from 'react';
import { DrawShape, Tool } from '../types/canvas';
import Konva from 'konva';

export const useDraw = (initialShapes: DrawShape[], socket: WebSocket | null, roomId: string) => {
  const stageRef = useRef<Konva.Stage>(null);

  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const [shapes, setShapes] = useState<DrawShape[]>(initialShapes);
  const [preview, setPreview] = useState<DrawShape | null>(null);
  const [tool, setTool] = useState<Tool>('line');

  // 🚨 THE CRITICAL MATH: Get pointer position relative to zoom/pan
  const getRelativePos = () => {
    const stage = stageRef.current;
    if (!stage) return null;
    const pos = stage.getPointerPosition();
    if (!pos) return null;
    
    // Reverse engineer the zoom and pan to find the true X/Y
    return {
      x: (pos.x - stage.x()) / stage.scaleX(),
      y: (pos.y - stage.y()) / stage.scaleY()
    };
  };

  const handleMouseDown = () => {
    if (tool === 'select' || tool === 'pan') return; // Don't draw in these modes

    const pos = getRelativePos();
    if (!pos) return;

    isDrawing.current = true;
    startPos.current = pos;

    if (tool === 'rect') {
      setPreview({ shape: 'rect', x: pos.x, y: pos.y, width: 0, height: 0 });
    } else if (tool === 'circle') {
      setPreview({ shape: 'circle', x: pos.x, y: pos.y, radius: 0 });
    } else if (tool === 'line') {
      setPreview({ shape: 'line', points: [pos.x, pos.y] });
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing.current || !preview) return;
    const pos = getRelativePos();
    if (!pos) return;

    if (preview.shape === 'rect') {
      setPreview({
        shape: 'rect',
        x: Math.min(pos.x, startPos.current.x),
        y: Math.min(pos.y, startPos.current.y),
        width: Math.abs(pos.x - startPos.current.x),
        height: Math.abs(pos.y - startPos.current.y)
      });
    } else if (preview.shape === 'circle') {
      const dx = pos.x - startPos.current.x;
      const dy = pos.y - startPos.current.y;
      const radius = Math.sqrt(dx * dx + dy * dy);
      setPreview({ shape: 'circle', x: startPos.current.x, y: startPos.current.y, radius });
    } else if (preview.shape === 'line') {
      setPreview({ shape: 'line', points: [...preview.points, pos.x, pos.y] });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing.current || !preview) return;
    isDrawing.current = false;

    let isValidShape = false;
    if (preview.shape === 'rect' && preview.width > 2 && preview.height > 2) isValidShape = true;
    if (preview.shape === 'circle' && preview.radius > 2) isValidShape = true;
    if (preview.shape === 'line' && preview.points.length > 2) isValidShape = true;

    if (isValidShape) {
      setShapes((prev) => [...prev, preview]);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'chat',
            roomId: roomId,
            message: JSON.stringify(preview)
          })
        );
      }
    }

    setPreview(null);
  };

  return {
    stageRef,
    shapes,
    setShapes,
    preview,
    tool,
    setTool,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};