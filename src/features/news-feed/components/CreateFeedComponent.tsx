import React, { useState } from "react";
import { user } from "../data/user";
interface IProps {
  createFeedHandler: Function;
}
export const CreateFeedComponent: React.FC<IProps> = ({
  createFeedHandler,
}) => {
  const [content, setContent] = useState<string>("");

  const postFeed = () => {
    createFeedHandler(content);
    setContent("");
  };
  return (
    <div className="uk-createpostarea">
      <div className="uk-themebox">
        <div className="uk-wirtepost">
          <figure className="uk-userimage">
            <img src={user.avatar} alt={user.name} />
          </figure>
          <textarea
            placeholder="What is on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="up-postsbuttonarea">
          <button type="button" className="uk-btnaddimage">
            Photos/Video
          </button>
          <button type="button" className="uk-btnpost" onClick={postFeed}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
