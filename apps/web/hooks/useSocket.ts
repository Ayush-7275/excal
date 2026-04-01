import { useEffect, useState } from 'react';
import { WS_SERVER } from '../config';

export const useSocket = (roomId: string, token: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return console.log('no token');
    const ws = new WebSocket(`${WS_SERVER}?token=${token}`);

    ws.onopen = () => {
      console.log('COnnected to ws server');
      setSocket(ws);

      ws.send(
        JSON.stringify({
          type: 'join_room',
          roomId
        })
      );
    };
    ws.onclose = () => {
      console.log('Discconected from ws server');
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [token, roomId]);

  return socket;
};
