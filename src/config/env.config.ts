import "dotenv/config";

export const PORT = process.env.PORT || "3000";
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
export const NODE_ENV = process.env.NODE_ENV || "";
export const CORS_WHITELIST = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(",")
  : [];
