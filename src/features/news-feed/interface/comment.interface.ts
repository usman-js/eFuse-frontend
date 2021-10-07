import { IUser } from "./user.interface";

export interface IComment {
  _id: string;
  feed: string;
  content: string;
  creator: IUser;
  likes: string[];
  createdAt: Date;
}
