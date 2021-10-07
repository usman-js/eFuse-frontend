import React from "react";
import { icons } from "../../assets/icons";
import { CreateFeedComponent } from "./components/CreateFeedComponent";
import { FeedComponent } from "./components/FeedComponent";
import { user } from "./data/user";
import { useFeeds } from "./hooks/useFeeds";
import { IFeed } from "./interface/feed.interface";

export const NewsFeedPage: React.FC = () => {
  const {
    feeds,
    createFeedHandler,
    addCommentLikeHandler,
    addFeedLikeHandler,
    addCommentHandler,
    removeCommentHandler,
  } = useFeeds();

  return (
    <main id="uk-main" className="uk-main uk-haslayout">
      <div className="uk-postsholder">
        <CreateFeedComponent createFeedHandler={createFeedHandler} />
        <div className="uk-postsarea">
          {feeds.map((feed: IFeed) => (
            <FeedComponent
              key={feed._id}
              feed={feed}
              addFeedLikeHandler={addFeedLikeHandler}
              addCommentLikeHandler={addCommentLikeHandler}
              addCommentHandler={addCommentHandler}
              removeCommentHandler={removeCommentHandler}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
