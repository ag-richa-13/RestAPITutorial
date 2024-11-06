/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);

  try {
    const files = req.files as { [fileName: string]: Express.Multer.File[] };

    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const uploadResultBook = await cloudinary.uploader.upload(bookFilePath, {
      filename_override: bookFileName,
      folder: "book-files",
      resource_type: "raw",
      format: "pdf",
    });

    console.log("uploadResultBook", uploadResultBook);
    console.log("uploadResult", uploadResult);
    res.json({ message: "Book Uploaded." });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading book."));
  }
};

export { createBook };
