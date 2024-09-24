import { Response } from "express";

export const handleError = (error: any, res: Response) => {
  console.log(error);
  res.status(500).json({
    message: "Internal server error",
  });
};
