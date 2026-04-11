import dotenv from 'dotenv';
dotenv.config();
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import WebSocket from 'ws';
import { prismaClient } from "@repo/db/client";

const JWT_SECRET = (process.env.JWT_SECRET as string).trim();

const wss = new WebSocketServer({ port: 8080 });

const checkUser = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (typeof decoded == 'string' || !decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e) {
    console.error('JWT Verification Error:', e);
    return null;
  }
};

type usersType = {
  userId: string;
  rooms: string[];
  ws: WebSocket;
};

const users: usersType[] = [];

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParam = new URLSearchParams(url.split('?')[1]);
  const token = queryParam.get('token') || '';

  const userId = checkUser(token);

  if (userId == null) {
    return ws.close(); 
  }

  users.push({
    rooms: [],
    userId,
    ws
  });

  ws.on('message', async (data) => {
    // Safer way to parse incoming buffer data
    const parsedData = JSON.parse(data.toString()); 

    if (parsedData.type == 'join_room') {
      const user = users.find((x) => x.ws == ws);
      // Force it to be a string so .includes() works perfectly later
      user?.rooms.push(parsedData.roomId.toString()); 
    }

    if (parsedData.type == 'leave_room') {
      const user = users.find((x) => x.ws == ws);
      if (!user) return;
      // Fixed Typo: changed parsedData.room to parsedData.roomId
      user.rooms = user.rooms.filter((x) => x !== parsedData.roomId.toString()); 
    }

    if (parsedData.type == 'chat') {
      const message = parsedData.message;
      // Convert to a string for checking the array
      const stringRoomId = parsedData.roomId.toString(); 

      // 1. BROADCAST FIRST! (Makes the drawing feel instant/real-time)
      users.forEach((user) => {
        if (user.rooms.includes(stringRoomId)) {
          user.ws.send(
            JSON.stringify({
              type: 'chat',
              message: message,
              roomId: stringRoomId,
              senderId: userId
            })
          );
        }
      });

      // 2. SAVE TO DB SECOND! 
      // We don't 'await' it here so it doesn't block the real-time loop above
      try {
        const numericRoomId = Number(parsedData.roomId); // Convert to Number for Prisma!
        
        if (!isNaN(numericRoomId)) {
          prismaClient.chat.create({
            data: {
              message,
              userId,
              roomId: numericRoomId, // Safe number for Prisma
            }
          }).catch(err => console.error("Prisma background save error:", err));
        }
      } catch (err) {
        console.error("Failed to save to db:", err);
      }
    }
  });

  ws.on('close', () => {
    const index = users.findIndex(user => user.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});