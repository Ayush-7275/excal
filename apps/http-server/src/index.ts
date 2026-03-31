import express, { json, Request, Response } from 'express';
import { signupSchema, signinSchema, createRoomSchema } from '@repo/schema/user';
import { prismaClient } from '@repo/db/client';
import { authMiddleware } from './middleware.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const app = express();

app.use(express.json());

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
    const token = jwt.sign(user.id, JWT_SECRET);

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

app.post('/room', authMiddleware,async (req: Request, res: Response) => {
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
      "message" : "Room created",
      "roomid" : room.id
    })

  } catch (e) {
    res.status(400).json({
      "error" : e
    })
  }
});

app.listen(3001);
console.log('http server is running');
