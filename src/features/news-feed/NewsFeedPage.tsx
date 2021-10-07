import React from "react";
import { CommentComponent } from "./components/CommentComponent";
import { CreateCommentComponent } from "./components/CreateCommentComponent";
import { CreateFeedComponent } from "./components/CreateFeedComponent";
import { FeedComponent } from "./components/FeedComponent";
import { useFeeds } from "./hooks/useFeeds";
import { IComment } from "./interface/comment.interface";
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
            >
              <CreateCommentComponent
                feed={feed}
                addCommentHandler={addCommentHandler}
              />
              {feed.comments.map((comment: IComment) => (
                <CommentComponent
                  key={comment._id}
                  comment={comment}
                  removeCommentHandler={removeCommentHandler}
                  addCommentLikeHandler={addCommentLikeHandler}
                />
              ))}
            </FeedComponent>
          ))}
        </div>
      </div>
    </main>
  );
};
