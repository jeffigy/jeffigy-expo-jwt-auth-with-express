import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = error.statusCode ?? 500;
  let message = error.message ?? "Something went wrong";

  if (error.code === "23505") {
    status = 409;
    message = "Duplicate Entry";
  }

  res.status(status).json({ message });
};

export default errorHandler;
