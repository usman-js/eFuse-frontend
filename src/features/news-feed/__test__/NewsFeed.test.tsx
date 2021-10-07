import React from "react";
import { render, screen,fireEvent } from "@testing-library/react";
import { NewsFeedPage } from "../NewsFeedPage";

test("test complete feed feature", () => {
   
    
    render(<NewsFeedPage  />);
    const postBtn = screen.getByText(/Post/i)
    const input = screen.getByPlaceholderText('What is on your mind?')
    
    expect(postBtn).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'new Feed' } });
    
    expect(input).toHaveValue('new Feed');

    fireEvent.click(postBtn);
    fireEvent.change(input, { target: { value: '' } });
    
    const feed = screen.getByText('new Feed');

    expect(feed).toBeInTheDocument();

    const feedLikeBtn = screen.getByTestId('feedLike');
    const feedCommentBtn = screen.getByTestId('feedComment');

    expect(feedLikeBtn).toBeInTheDocument()
    expect(feedCommentBtn).toBeInTheDocument()

    fireEvent.click(feedLikeBtn);

    const likeCount = screen.getByText(/1 Like/i)

    expect(likeCount).toBeInTheDocument()
});
