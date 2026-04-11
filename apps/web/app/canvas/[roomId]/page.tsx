// src/app/canvas/[roomId]/page.tsx
import { HTTP_BACKEND } from '../../../config';
import { DrawShape } from '../../../types/canvas';
import { Canvas } from '../../../components/Canvas';

const getExistingShapes = async (roomId: string): Promise<DrawShape[]> => {
  try {
    const res = await fetch(`${HTTP_BACKEND}/chats/${roomId}`);

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data.messages.map((x: { message: string }) => JSON.parse(x.message));
  } catch (error) {
    console.error('Failed to fetch shapes', error);
    return []; 
  }
};

// 1. Type params as a Promise containing a string
export default async function CanvasPage({
  params
}: {
  params: Promise<{ roomId: string }>; 
}) {
  // 2. Await the params properly
  const resolvedParams = await params;
  const roomId = resolvedParams.roomId; 
  
  const initialShapes = await getExistingShapes(roomId);

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3. Pass the dynamic roomId, and REMOVE the token prop */}
      <Canvas initialShapes={initialShapes} roomId={roomId} />
    </main>
  );
}