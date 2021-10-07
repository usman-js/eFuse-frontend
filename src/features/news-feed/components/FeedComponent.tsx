import moment from "moment";
import React, { useState } from "react";
import { icons } from "../../../assets/icons";
import { focusOnElementHandler } from "../../../helpers/focus.helper";
import { user } from "../data/user";
import { IFeed } from "../interface/feed.interface";
interface IProps {
  feed: IFeed;
  addFeedLikeHandler: Function;
  addCommentHandler: Function;
  addCommentLikeHandler: Function;
  removeCommentHandler: Function;
}

export const FeedComponent: React.FC<IProps> = ({
  feed,
  addFeedLikeHandler,
  children,
}) => {
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);

  const commentSectionHandler = () => {
    setShowCommentSection((section) => !section);
    setTimeout(() => {
      focusOnElementHandler(`${feed._id}-comment`);
    }, 250);
  };
  return (
    <div className="uk-post">
      <div className="uk-themebox">
        <div className="uk-posthead">
          <figure className="uk-userimage">
            <img src={feed.creator.avatar} alt={feed.creator.name} />
          </figure>
          <div className="uk-postnameaddress">
            <button className="uk-dropdownicon" type="button">
              <img src={icons.dots} alt="Dropdown Icon" />
            </button>
            <h3>{feed.creator.name}</h3>
            <address>{feed.creator.address}</address>
            <time dateTime={feed.createdAt.toLocaleString()}>
              {moment(feed.createdAt).fromNow()}
            </time>
          </div>
        </div>
        <div className="uk-postcontent">
          <div className="uk-description">
            <p>{feed.content}</p>
          </div>
          <ul className="uk-postmetadata">
            <li>
              <span>
                {feed.likes.length} {feed.likes.length > 1 ? "Likes" : "Like"}{" "}
              </span>
            </li>
            <li>
              <span>
                {feed.comments.length}{" "}
                {feed.comments.length > 1 ? "Comments" : "Comment"}
              </span>
            </li>
          </ul>
        </div>
        <div className="uk-postcommentsarea">
          <ul className="uk-postmetadata">
            <li>
              <button onClick={() => addFeedLikeHandler(feed._id, user._id)}>
                <img src={icons.like} alt="Like Icon" />
                <span>Likes</span>
              </button>
            </li>
            <li>
              <button onClick={() => commentSectionHandler()}>
                <img src={icons.messenger} alt="Message Icon" />
                <span>Comments</span>
              </button>
            </li>
          </ul>
          {showCommentSection && <>{children}</>}
        </div>
      </div>
    </div>
  );
};
