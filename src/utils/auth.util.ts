import { Response } from "express";
import { generateRefreshToken } from "./jwt.utils";
import { NODE_ENV } from "@/config/env.config";

export const sendRefreshToken = (response: Response, payload: any) => {
  const refreshToken = generateRefreshToken(payload);

  response.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return refreshToken;
};
