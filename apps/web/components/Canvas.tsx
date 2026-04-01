// Canvas.tsx
'use client';
import { Stage, Layer, Rect, Circle } from 'react-konva';

import { DrawShape } from '../types/canvas';
import { useDraw } from '../hooks/useDraw';
import { useSocket } from '../hooks/useSocket';
import { useEffect } from 'react';

interface CanvasProps {
  initialShapes: DrawShape[];
  roomId: string;
  token: string;
}

export const Canvas = ({ initialShapes, roomId, token }: CanvasProps) => {
  const socket = useSocket(roomId, token);
  const { stageRef, setShapes, shapes, preview, handleMouseDown, handleMouseMove, handleMouseUp } = useDraw(
    initialShapes,
    socket,
    roomId
  );
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const data: { type: string; message: string; roomId: string; senderId: string } = JSON.parse(e.data);

      if (data.type === 'chat') {
        const newShape = JSON.parse(data.message); // Assuming your 'chat' message is a stringified shape
        setShapes((prev) => [...prev, newShape]);
      }
    };
  }, [socket, setShapes]);

  return (
    <Stage
      height={1920}
      width={1080}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ background: '#121212' }}
    >
      <Layer>
        {/* Permanent shapes */}
        {shapes.map((shape, i) => {
          if (shape.shape === 'rect') {
            return <Rect key={i} x={shape.x} y={shape.y} width={shape.width} height={shape.height} stroke='white' />;
          }
          return null;
        })}

        {/* Live preview */}
        {preview && preview.shape === 'rect' && (
          <Rect
            x={preview.x}
            y={preview.y}
            width={preview.width}
            height={preview.height}
            stroke='white'
            dash={[4, 4]}
          />
        )}
      </Layer>
    </Stage>
  );
};
