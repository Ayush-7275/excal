import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = req.headers['authorization'] || '';

    if (!token) {
      return res.status(401).json({
        message: 'No authorization header'
      });
    }
    //hamne userid ko token me banaya tha in signin endpoint
    const decoded = jwt.verify(token, JWT_SECRET) as {userId : string};

    if (decoded) {
      req.userId = decoded.userId;
      console.log(req.userId);
      next();
    }
  } catch (err) {
    return res.status(403).json({
      message: 'Invalid or expired token'
    });
  }
};
