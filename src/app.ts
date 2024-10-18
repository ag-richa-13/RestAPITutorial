/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";

import globalErrorHandler from "./middleware/GlobalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Welcome to REST API with TS" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
// Global Error Handler
app.use(globalErrorHandler);

export default app;
