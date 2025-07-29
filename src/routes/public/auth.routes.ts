import {
  handleLogin,
  handleLogout,
  handleRefresh,
  handleSignup,
} from "@/controllers/auth.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { loginSchema, logoutSchema, signupSchema } from "@/schemas/auth.schema";
import { Router } from "express";

const authRoutes = Router();

authRoutes.route("/signup").post(validateSchema(signupSchema), handleSignup);
authRoutes.route("/login").post(validateSchema(loginSchema), handleLogin);
authRoutes.route("/refresh").get(handleRefresh);
authRoutes.route("/logout").post(validateSchema(logoutSchema), handleLogout);

export default authRoutes;
