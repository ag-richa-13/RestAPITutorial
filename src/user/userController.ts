import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "./userModel";

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
  // Process

  // Response
  res.json({
    message: "User created successfully",
  });
  console.log("User controller loaded");
};

export { registerUser };
