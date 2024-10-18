import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  console.log("Request body: ", req.body);
  // Validation
  if (!name || !email || !password) {
    const errors = createHttpError(400, "All fields are required");
    return next(errors);
  }
  // Database Call
  //Error Handling
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const errors = createHttpError(400, "User already exists");
      return next(errors);
    }
  } catch (err) {
    console.error(err); // Log the error
    return next(createHttpError(500, "Error while getting user."));
  }
  /// Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  // store data
  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while creating user."));
  }
  // Token generation -> JWT (JSON Web Token)
  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    // Response
    res.status(201).json({
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while generating token."));
  }
  console.log("User Created.");
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  console.log("Request body: ", req.body);
  // Validation
  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }
  // Set Error Handling
  // Check user exist or not in database.
  const user = await userModel.findOne({ email });
  try {
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while getting user."));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  try {
    if (!isMatch) {
      return next(createHttpError(400, "Username or password incorrect."));
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while comparing password."));
  }
  //Set Error Handling
  // Token generation -> JWT (JSON Web Token)
  try {
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    // Response
    res.status(201).json({
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while generating token."));
  }

  console.log("User Logged In.");
};

export { createUser, loginUser };

/* Await is used for asyncronous operations */
/* 
  By default Jwt use HS256 algorithm  by "sign" function, we can use any other algorithm 
  like "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"
   */
