import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedAccessError } from "../errors/unauthorized-access";

type CurrentUser = { id: string };
type UserPayload = { id: string };

declare global {
  namespace Express {
    export interface Request {
      currentUser?: CurrentUser;
    }
  }
}

export class AuthenticationMiddlewares {
  // Sets the currentUser in the request if a cookie with jwt is found.
  static currentUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.jwt;
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = { id: payload.id };
    } catch (err) {
      console.error(err);
    } finally {
      return next();
    }
  };

  // Throws error if there is no currentUser.
  static requireAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.currentUser) throw new UnauthorizedAccessError();
    next();
  };
}
