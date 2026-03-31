import {z} from "zod";

export const signupSchema = z.object({
  username : z.string().max(18).min(3),
  password : z.string().max(30).min(3),
  email : z.string().max(30)
});

export const signinSchema = z.object({
  email : z.string().max(30),
  password : z.string(), 
});

export const createRoomSchema = z.object({
  name : z.string().max(20).min(1)
})