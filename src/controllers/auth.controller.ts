import { NODE_ENV } from "@/config/env.config";
import { Login, Logout, Refresh, Signup } from "@/schemas/auth.schema";
import {
  loginService,
  refreshService,
  signupService,
} from "@/services/auth.service";
import { sendRefreshToken } from "@/utils/auth.util";
import { Request, Response } from "express";
import createError from "http-errors";

export const handleSignup = async (
  req: Request<unknown, unknown, Signup["body"], unknown>,
  res: Response
) => {
  const { user, token } = await signupService(req.body);

  sendRefreshToken(res, { userId: user.userId });

  res.status(201).json({ token });
};

export const handleLogin = async (
  req: Request<unknown, unknown, Login["body"], unknown>,
  res: Response
) => {
  const { user, token } = await loginService(req.body);

  sendRefreshToken(res, { userId: user.userId });

  res.json({ token });
};

export const handleRefresh = async (
  req: Request<unknown, unknown, unknown, Refresh["cookies"]>,
  res: Response
) => {
  if (!req.cookies.jwt) {
    throw createError(401, "Unauthorized");
  }

  const { token } = await refreshService(req.cookies.jwt);

  res.json({ token });
};

export const handleLogout = async (
  req: Request<unknown, unknown, unknown, Logout["cookies"]>,
  res: Response
) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};
