import * as jwt from "jsonwebtoken";
import express from "express";
//https://www.youtube.com/watch?v=8Ip0pcwbWYM&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=13
export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token =
      req.headers.authorization !== undefined
        ? req.headers.authorization.split(" ")[1]
        : " ";
    const decoded = jwt.verify(token, "secret");
    next();
  } catch (error) {
    console.log("JWT Error: You must be logged in to complete this action");
    return res.status(401).json({
      message: "You must be logged in to complete this action"
    });
  }
};
