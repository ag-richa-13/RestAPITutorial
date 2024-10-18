import { User } from "../user/userTypes";
export interface Book {
  _id: string;
  title: string;
  author: User;
  genre: string;
  image: string;
  file: string;
  createdAt: Date;
  UpdatedAt: Date;
}
