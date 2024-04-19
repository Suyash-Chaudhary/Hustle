import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api-error";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.code)
      .send({ success: false, message: err.message, errors: err.serialize() })
      .end();
  }

  console.error(err);
  return res
    .status(500)
    .send({ error: true, message: "Internal Server Error" })
    .end();
};
