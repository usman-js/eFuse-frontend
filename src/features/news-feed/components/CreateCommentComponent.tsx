import React, { useState } from "react";
import { icons } from "../../../assets/icons";
import { IFeed } from "../interface/feed.interface";
interface IProps {
  feed: IFeed;
  addCommentHandler: Function;
}

export const CreateCommentComponent: React.FC<IProps> = ({
  feed,
  addCommentHandler,
}) => {
  const [content, setContent] = useState<string>("");
  const createCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentHandler({ feedId: feed._id, content });
    setContent("");
  };
  return (
    <div className="uk-commentimageholder">
      <figure className="uk-userimage">
        <img src={feed.creator.avatar} alt={feed.creator.name} />
      </figure>
      <form onSubmit={(e) => createCommentHandler(e)}>
        <input
          id={`${feed._id}-comment`}
          type="text"
          name="comment"
          className="form-control"
          placeholder="Add a comment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </form>
    </div>
  );
};
