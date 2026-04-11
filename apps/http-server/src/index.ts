import express, { json, Request, Response } from 'express';
import { signupSchema, signinSchema, createRoomSchema } from '@repo/schema/user';
import { prismaClient } from '@repo/db/client';
import { authMiddleware } from './middleware.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid Input',
      errors: result.error.issues
    });
  }
  try {
    const { username, password, email } = result.data;

    //hashing the password
    const hashedPasswd = await argon2.hash(password);
    console.log(hashedPasswd);

    const user = await prismaClient.user.create({
      data: {
        name: username,
        password: hashedPasswd,
        email: email
      }
    });

    res.status(200).json({
      message: 'signup successfull',
      userId: user.id
    });
  } catch (err) {
    res.status(403).json({
      message: 'some error happened while uploading to db',
      error: err
    });
  }
});

app.post('/signin', async (req: Request, res: Response) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid Input'
    });
  }

  const { password, email } = result.data;

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    //email doesnt exist
    if (!user) {
      return res.status(403).json({ message: 'Incorrect email or password' });
    }

    const isPaswdValid = await argon2.verify(user.password, password);
    //passwd is incorrect
    if (!isPaswdValid) {
      return res.status(403).json({ message: 'Incorrect Passwd' });
    }
    //Token generation
    console.log('EXPRESS SECRET:', process.env.JWT_SECRET, '| LENGTH:', process.env.JWT_SECRET?.length);
    const token = jwt.sign(
      {
        userId: user.id
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: 'Sigin Successfull',
      token: token
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
});

app.post('/room', authMiddleware, async (req: Request, res: Response) => {
  const result = createRoomSchema.safeParse(req.body);
  const userId = req.userId as string;

  if (!result.success) {
    return res.status(403).json({
      message: 'Invalid Input'
    });
  }

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: result.data?.name,
        adminId: userId
      }
    });

    res.status(200).json({
      message: 'Room created',
      roomid: room.id
    });
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
});

app.get('/rooms', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId as string;
  try {
    const rooms = await prismaClient.room.findMany({
      where: { adminId: userId },
      orderBy: { id: 'desc' } // Shows newest rooms first
    });
    res.status(200).json({ rooms });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

app.delete('/room/:roomId', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId as string;
  const roomId = Number(req.params.roomId);

  if (isNaN(roomId)) {
    return res.status(400).json({ message: "Invalid Room ID" });
  }

  try {
    // 1. Verify the user actually owns this room
    const room = await prismaClient.room.findFirst({
      where: { id: roomId, adminId: userId }
    });

    if (!room) {
      return res.status(403).json({ message: "Not authorized to delete this room" });
    }

    // 🚨 THE FIX: Delete all chats inside the room first!
    await prismaClient.chat.deleteMany({
      where: { roomId: roomId }
    });

    // 2. Now it is safe to delete the empty room
    await prismaClient.room.delete({
      where: { id: roomId }
    });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (e) {
    console.error("Delete room error:", e); // This will log the exact reason if it fails again
    res.status(500).json({ message: "Failed to delete room" });
  }
});

app.get('/chats/:roomId', async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId
    },
    orderBy: {
      id: 'desc'
    },
    take: 50
  });

  res.status(200).json({
    messages
  });
});

app.get('/chats/:slug', async (req: Request, res: Response) => {
  const slug = req.params.slug;
  if (typeof slug != 'string') {
    return res.json({
      message: 'param is not string'
    });
  }
  const room = await prismaClient.room.findFirst({
    where: {
      slug
    }
  });

  res.status(200).json({
    room
  });
});

app.listen(3001);
console.log('http server is running');
