import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/config/env.config";
import { DecodedToken } from "@/types/auth.type";
import createError from "http-errors";
import { sign, verify } from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  return sign({ userInfo: payload }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: any) => {
  return sign({ userInfo: payload }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = (payload: string) => {
  try {
    const decoded = verify(payload, REFRESH_TOKEN_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    throw createError(401, "Unauthorized");
  }
};

export const verifyAccessToken = (payload: string) => {
  try {
    const decoded = verify(payload, ACCESS_TOKEN_SECRET) as DecodedToken;

    return decoded;
  } catch (error) {
    throw createError(403, "Forbidden");
  }
};
