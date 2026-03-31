'use client';
import Konva from 'konva';
import { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

interface DrawnRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Canvas() {
  const stageRef = useRef<Konva.Stage>(null);

  // useRef for drag state — doesn't need to trigger re-renders
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // useState for things that DO need to trigger re-renders
  const [rects, setRects] = useState<DrawnRect[]>([]);
  const [preview, setPreview] = useState<DrawnRect | null>(null);

  const handleMouseDown = () => {
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;

    isDrawing.current = true;
    startPos.current = pos;
    setPreview({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;

    // Calculate rect from start to current pointer
    setPreview({
      //math.min kyuki agar left drag kare to left mei rectangle bane na ki right mei
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
    if (preview.width > 2 && preview.height > 2) {
      setRects((prev) => [...prev, preview]);
    }

    setPreview(null);
  };

  return (
    <Stage
      height={1000}
      width={1000}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ background: '#121212' }}
    >
      <Layer>
        {/* Permanent rects */}
        {rects.map((rect, i) => (
          <Rect key={i} x={rect.x} y={rect.y} width={rect.width} height={rect.height} stroke='white'/>
        ))}

        {/* Live preview while dragging */}
        {preview && (
          <Rect
            x={preview.x}
            y={preview.y}
            width={preview.width}
            height={preview.height}
            stroke='white'
            dash={[4, 4]} // dashed border to show it's a preview
          />
        )}
      </Layer>
    </Stage>
  );
}
