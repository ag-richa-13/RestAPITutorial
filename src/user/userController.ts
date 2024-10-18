/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
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

  // Process

  // Response
  res.json({
    message: "User created successfully",
  });
  console.log("User controller loaded");
};

export { registerUser };
