/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";

import globalErrorHandler from "./middleware/GlobalErrorHandler";

const app = express();

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const error = createHttpError(400, "Something Went Wrong.");
  throw error;

  res.json({ message: "Welcome to REST API with TS" });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
