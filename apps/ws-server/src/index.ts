import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import WebSocket from 'ws';
import {prismaClient} from "@repo/db/client";
dotenv.config();

const JWT_SECRET = (process.env.JWT_SECRET as string).trim();

const wss = new WebSocketServer({ port: 8080 });

const checkUser = (token: string): string | null => {
  try {
    // Add this near the top of your connection logic
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (typeof decoded == 'string') {
      return null;
    }
    if (!decoded || !decoded.userId) {
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
  if (!url) {
    return;
  }

  const queryParam = new URLSearchParams(url.split('?')[1]);
  const token = queryParam.get('token') || '';

  const userId = checkUser(token);

  if (userId == null) {
    return ws.close(); //agar token verify nahi hota hai to ye return hoga
  }

  //agaer verify ho gaya to users array mei bhej do with no room still subscribed

  users.push({
    rooms: [],
    userId,
    ws
  });

  ws.on('message',async (data) => {
    const parsedData = JSON.parse(data as unknown as string); //{type:joinroom,roomId:1}or{type:leaveroom ...}

    if (parsedData.type == 'join_room') {
      const user = users.find((x) => x.ws == ws); //user ke rooms mei join room wali roomId add kardo
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type == 'leave_room') {
      const user = users.find((x) => x.ws == ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }

    if (parsedData.type == 'chat') {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      //db mei store karna
      const chat = await prismaClient.chat.create({
        data : {
          message,
          userId,
          roomId,
        }
      })


      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          //ws pe string hi bhej sakte hai
          user.ws.send(
            JSON.stringify({
              type: 'chat',
              message: message,
              roomId,
              senderId: userId
            })
          );
        }
      });
    }
  });
});
