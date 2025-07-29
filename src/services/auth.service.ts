import { UserInsert } from "@/types/user.type";
import {
  createUserService,
  findUserByEmailService,
  findUserbyIdService,
} from "./user.service";
import { compare, hash } from "bcryptjs";
import { generateAccessToken, verifyRefreshToken } from "@/utils/jwt.utils";
import { Login } from "@/schemas/auth.schema";
import createError from "http-errors";

export const signupService = async (payload: UserInsert) => {
  const password = await hash(payload.password, 10);

  const newUser = await createUserService({ ...payload, password });

  const { password: _password, ...registeredUser } = newUser;

  const token = generateAccessToken(registeredUser);

  return { user: registeredUser, token };
};

export const loginService = async (payload: Login["body"]) => {
  const { email, password } = payload;

  const foundUser = await findUserByEmailService(email);

  if (!foundUser || !foundUser.active) {
    throw createError(401, "Incorrect email or password");
  }

  const matchedPwd = await compare(password, foundUser.password);

  if (!matchedPwd) {
    throw createError(401, "Incorrect email or password");
  }

  const { password: _password, ...loggedInUser } = foundUser;

  const token = generateAccessToken(loggedInUser);
  return { user: loggedInUser, token };
};

export const refreshService = async (payload: string) => {
  const { userInfo } = verifyRefreshToken(payload);

  const foundUser = await findUserbyIdService(userInfo.userId);

  if (!foundUser) {
    throw createError(401, "Unauthorized");
  }

  const { password: _password, ...userDetails } = foundUser;

  const token = generateAccessToken(userDetails);

  return { user: foundUser, token };
};
