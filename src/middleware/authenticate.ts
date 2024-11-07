import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  userID: string;
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(401, "Authorization Token Required"));
  }

  try {
    const parsedToken = token.split(" ")[1];

    const decoded = verify(parsedToken, config.jwtSecret as string);

    console.log("decoded token: ", decoded);

    const _req = req as AuthRequest;
    _req.userID = decoded.sub as string;
    next();
  } catch (error) {
    console.log(error);

    return next(createHttpError(401, "Token Expired."));
  }
};

export default authenticate;
