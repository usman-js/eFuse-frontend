import moment from "moment";
import React from "react";
import { icons } from "../../../assets/icons";
import { user } from "../data/user";
import { IComment } from "../interface/comment.interface";
interface IProps {
  comment: IComment;
  addCommentLikeHandler: Function;
  removeCommentHandler: Function;
}
export const CommentComponent: React.FC<IProps> = ({
  comment,
  addCommentLikeHandler,
  removeCommentHandler,
}) => {
  return (
    <div className="uk-commentreplyarea">
      <figure className="uk-userimage">
        <img src={comment.creator.avatar} alt={comment.creator.name} />
      </figure>
      <div className="uk-replycontent">
        <time dateTime={comment.createdAt.toLocaleString()}>
          {moment(comment.createdAt).fromNow()}
        </time>
        <h4>
          {comment.creator.name} <span>{comment.creator.occupation}</span>
        </h4>
        <p>{comment.content}</p>
        <ul className="uk-postmetadatalike">
          <li>
            <button>
              <span>
                {comment.likes.length}{" "}
                {comment.likes.length > 1 ? "Likes" : "Like"}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                addCommentLikeHandler(comment.feed, comment._id, user._id)
              }
            >
              <img src={icons.like} alt="Like Icon" />
              <span>Like</span>
            </button>
          </li>
         
          <li>
            <button
              onClick={() => removeCommentHandler(comment.feed, comment._id)}
            >
              <img src={icons.delete} alt="Delete Icon" />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
