import z from "zod";

const baseAuthPayload = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .trim()
    .min(1, { message: "Email must contain at least 1 character" })
    .email(),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(1, { message: "Password must contain at least 1 character" }),
});

const signupPayload = baseAuthPayload.extend({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(1, { message: "Name must contain at least 1 character" }),
});

const jwtSchema = z.object({
  jwt: z
    .string({
      required_error: "Jwt is required",
      invalid_type_error: "Jwt must be a string",
    })
    .min(1, "JWT cookie is missing or empty"),
});

export const signupSchema = z.object({
  body: signupPayload,
});

export const loginSchema = z.object({
  body: baseAuthPayload,
});

export const logoutSchema = z.object({
  cookies: jwtSchema,
});

export type Signup = z.infer<typeof signupSchema>;
export type Login = z.infer<typeof loginSchema>;
export type Refresh = z.infer<typeof logoutSchema>;
export type Logout = z.infer<typeof logoutSchema>;
