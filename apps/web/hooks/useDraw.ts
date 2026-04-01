import { useRef, useState } from 'react';
import { DrawShape } from '../types/canvas';
import Konva from 'konva';

export const useDraw = (initialShapes: DrawShape[], socket: WebSocket|null, roomId: string) => {
  const stageRef = useRef<Konva.Stage>(null);

  // useRef for drag state — doesn't need to trigger re-renders
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // useState for things that DO need to trigger re-renders
  const [shapes, setShapes] = useState<DrawShape[]>(initialShapes);
  const [preview, setPreview] = useState<DrawShape | null>(null);

  const handleMouseDown = () => {
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;

    isDrawing.current = true;
    startPos.current = pos;
    setPreview({ shape: 'rect', x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;

    // Calculate rect from start to current pointer
    setPreview({
      //math.min kyuki agar left drag kare to left mei rectangle bane na ki right mei
      shape: 'rect',
      x: Math.min(pos.x, startPos.current.x),
      y: Math.min(pos.y, startPos.current.y),
      width: Math.abs(pos.x - startPos.current.x),
      height: Math.abs(pos.y - startPos.current.y)
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing.current || !preview) return;
    isDrawing.current = false;
    // Only save if it has some size

    if (preview.shape === 'rect' && preview.width > 2 && preview.height > 2) {
      setShapes((prev) => [...prev, preview]);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'chat',
            roomId: roomId,
            message: JSON.stringify(preview) // Stringifying the shape object as your backend expects
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
    // setTool, // Export this so buttons in your UI can change the active tool
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};
