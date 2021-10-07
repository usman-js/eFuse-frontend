import React from "react";
import { render, screen,fireEvent } from "@testing-library/react";
import { CreateFeedComponent } from "../components/CreateFeedComponent";

test("test create feed component", () => {
    const feeds: string[] = [];
    const createFeed = (content: string) => feeds.push(content);
    
    render(<CreateFeedComponent createFeedHandler={createFeed} />);
    const postBtn = screen.getByText(/Post/i)
    const input = screen.getByPlaceholderText('What is on your mind?')
    
    expect(postBtn).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'new Feed' } });
    
    expect(input).toHaveValue('new Feed');

    fireEvent.click(postBtn);

    expect(feeds.length).toBeGreaterThan(0);
    
    expect(feeds[0]).toEqual('new Feed');
});
