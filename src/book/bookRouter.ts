import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "path";
import authenticate from "../middleware/authenticate";

const bookRouter = express.Router();

//Multer is used as a middleware
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, //3e7 = 30mb
});

bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  createBook
);

export default bookRouter;
