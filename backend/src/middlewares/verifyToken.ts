import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleError } from "../lib/handleError";
import  prisma  from "../prisma/_db";
import { User } from "@prisma/client";

//@desc Verify token middleware to verify user
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  };
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    //find user
    const user = await prisma.user.findUnique({
      where: {
        //jwt payload is of type CustomJwtPayload
        id: (decoded as CustomJwtPayload).id
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized acess , invalid token",
      });
    }
//req is of type Request but we are extending it to RequestWithUser
    (req as RequestWithUser).user = user;
    next();
  } catch (error) {
    handleError(error, res);
  }
};



interface CustomJwtPayload extends JwtPayload {
    id: string;
  }


export interface RequestWithUser extends Request {
    user?: User
  }