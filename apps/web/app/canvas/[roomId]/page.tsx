import { HTTP_BACKEND } from '../../../config';
import { DrawShape } from '../../../types/canvas';
import { Canvas } from '../../../components/Canvas';
// Fetching logic lives outside the client component now

const getExistingShapes = async (roomId: number): Promise<DrawShape[]> => {
  try {
    const res = await fetch(`${HTTP_BACKEND}/chats/${roomId}`);

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data.messages.map((x: { message: string }) => JSON.parse(x.message));

  } catch (error) {
    console.error('Failed to fetch shapes', error);
    return []; // Return empty array on failure so the canvas still loads
  }
};

// This can be async because it is a Server Component!
export default async function CanvasPage({
  params
}: {
  params: {
    roomId: number;
  };
}) {
  const roomId = (await params).roomId; 
  const initialShapes = await getExistingShapes(roomId);

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Pass the fetched data down as props */}
      <Canvas initialShapes={initialShapes} roomId='' token=''/>//NEED FIX
    </main>
  );
}
