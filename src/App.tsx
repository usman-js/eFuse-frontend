import React from "react";
import "./App.css";
import "sweetalert2/src/sweetalert2.scss";

import { NewsFeedPage } from "./features/news-feed/NewsFeedPage";

export const App: React.FC = () => {
  return <NewsFeedPage />;
};
