import { useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/toast.helper";
import { uuidGenerator } from "../../../helpers/uuid-generator.helper";
import { user } from "../data/user";
import { IComment } from "../interface/comment.interface";
import { IFeed } from "../interface/feed.interface";

export const useFeeds = () => {
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  const focusOnCommentInputHandler = (inputId: string) => {
    const el = document.getElementById(inputId);
    if (el) el.focus();
  };

  const createFeedHandler = (content: string) => {
    if (content == "")
      Toast.fire({
        title: "Cannot post a feed without content.",
        icon: "warning",
      });
    const feed: IFeed = {
      _id: uuidGenerator("feed"),
      comments: [],
      content: content,
      createdAt: new Date(),
      likes: [],
      creator: user,
    };
    setFeeds((feedsArr) => {
      return [feed, ...feedsArr];
    });
    Toast.fire({ title: "Feed added successfully.", icon: "success" });
  };

  const addFeedLikeHandler = (feedId: string, userId: string) => {
    const feedsArr: IFeed[] = feeds;
    const feedIndex = feedsArr.findIndex((feed) => feed._id === feedId);
    if (feedIndex < 0)
      Toast.fire({ title: "Something went wrong.", icon: "warning" });

    if (feedsArr[feedIndex].likes.some((like) => like === userId)) {
      feedsArr[feedIndex].likes = feedsArr[feedIndex].likes.filter(
        (like) => like !== userId
      );
    } else {
      feeds[feedIndex].likes.push(userId);
    }
    setFeeds([...feedsArr]);
  };

  const addCommentLikeHandler = (
    feedId: string,
    commentId: string,
    userId: string
  ) => {
    const feedsArr: IFeed[] = feeds;
    const feedIndex = feedsArr.findIndex((feed) => feed._id === feedId);
    if (feedIndex < 0)
      Toast.fire({ title: "Something went wrong.", icon: "warning" });
    const commentArr: IComment[] = feedsArr[feedIndex].comments;
    const commentIndex = commentArr.findIndex(
      (comment) => comment._id === commentId
    );
    if (commentArr[commentIndex].likes.some((like) => like === userId)) {
      commentArr[commentIndex].likes = commentArr[commentIndex].likes.filter(
        (like) => like !== userId
      );
    } else {
      commentArr[commentIndex].likes.push(userId);
    }
    feedsArr[feedIndex].comments = commentArr;
    setFeeds([...feedsArr]);
  };

  const addCommentHandler = ({
    feedId,
    content,
  }: {
    feedId: string;
    content: string;
  }) => {
    if (content == "")
      Toast.fire({
        title: "Cannot post a comment without content.",
        icon: "warning",
      });
    const feedsArr: IFeed[] = feeds;
    const feedIndex = feedsArr.findIndex((feed) => feed._id === feedId);
    if (feedIndex < 0)
      return Toast.fire({ title: "Something went wrong.", icon: "warning" });

    const comment: IComment = {
      _id: uuidGenerator("comment"),
      content: content,
      createdAt: new Date(),
      likes: [],
      creator: user,
      feed: feedId,
    };

    feedsArr[feedIndex].comments.push(comment);
    setFeeds([...feedsArr]);
    Toast.fire({ title: "Comment added successfully.", icon: "success" });
  };

  const removeCommentHandler = (feedId: string, commentId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const feedsArr: IFeed[] = feeds;
        const feedIndex = feedsArr.findIndex((feed) => feed._id === feedId);
        if (feedIndex < 0)
          Toast.fire({ title: "Something went wrong.", icon: "warning" });
        const commentArr: IComment[] = feedsArr[feedIndex].comments.filter(
          (comment) => comment._id !== commentId
        );
        feedsArr[feedIndex].comments = commentArr;
        setFeeds([...feedsArr]);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return {
    feeds,
    createFeedHandler,
    focusOnCommentInputHandler,
    addFeedLikeHandler,
    addCommentHandler,
    addCommentLikeHandler,
    removeCommentHandler,
  };
};
