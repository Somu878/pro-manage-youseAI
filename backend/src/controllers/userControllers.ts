import { Request, Response } from "express";
import prisma from "../prisma/_db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../lib/handleError";
import { RequestWithUser } from "../middlewares/verifyToken";


//signup user
export const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
try {
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign({  id: user.id}, process.env.JWT_SECRET_KEY as string);
  res.status(201).json({
    message: "signup successful",
    token,
  });
  
} catch (error) {
  handleError(error, res);
}
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string);
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    handleError(error, res);
  }
};

//get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: (req as RequestWithUser).user?.id,
      },
    });
    res.status(200).json({
      message: "User profile fetched successfully",
      user:{
        name: user?.name,
        email: user?.email,
        //TODO: add Tasks
      }
    });
  } catch (error) {
    handleError(error, res);
  }
};










export const userController = {
  signupUser,
  loginUser,
  getUserProfile,
};
