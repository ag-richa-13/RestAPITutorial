import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  console.log("Request body: ", req.body);
  // Validation
  if (!name || !email || !password) {
    const errors = createHttpError(400, "All fields are required");
    return next(errors);
  }
  // Database Call
  const user = await userModel.findOne({ email });
  if (user) {
    const errors = createHttpError(400, "User already exists");
    return next(errors);
  }
  /* Await is used for asyncronous operations */
  /// Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // store data
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // Token generation -> JWT (JSON Web Token)
  /* 
  By default Jwt use HS256 algorithm  by "sign" function, we can use any other algorithm 
  like "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"
   */
  const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
  // Response
  res.json({
    accessToken: token,
  });
  console.log("User controller loaded");
};

export { registerUser };
