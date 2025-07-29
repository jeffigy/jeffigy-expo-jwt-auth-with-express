import { verifyAccessToken } from "@/utils/jwt.utils";
import { Request, NextFunction, Response } from "express";
import createError from "http-errors";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader?.startsWith("Bearer ")
  ) {
    throw createError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const { userInfo } = verifyAccessToken(token);

  req.userId = userInfo.userId;
  next();
};
