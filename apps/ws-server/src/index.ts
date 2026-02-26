import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';

dotenv.config();
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParam = new URLSearchParams(url.split('?')[1]);
  const token = queryParam.get('token') || '';
  const decoded = jwt.verify(token, JWT_SECRET);

  //to remove the ts error
  if (typeof decoded == 'string') {
    ws.close();
    return;
  }

  //this to gate the ws server so if they do not have the token then they cannot access ws 
  if (!decoded || !decoded.userId) {
    ws.close();
    return;
  }

  ws.on('message', (data) => {
    ws.send('pong');
  });
});
