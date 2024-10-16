import express, { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";

const app = express();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to REST API with TS" });
});

// Catch non-existing routes (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Route not found"));
});

// Global Error Handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "An unknown error occurred",
  });
});

export default app;
