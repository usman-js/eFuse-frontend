import { IComment } from "./comment.interface";
import { IUser } from "./user.interface";

export interface IFeed {
  _id: string;
  content: string;
  creator: IUser;
  likes: string[];
  comments: IComment[];
  createdAt: Date;
}
