import * as ReactDOM from "react-dom";
import Home from "./home";
import * as React from "react";

import * as postsData from "../../test-data/processed-posts-data.json";

const mockSetSubreddit = jest.fn((newValue: string) => {});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home setSubreddit={mockSetSubreddit} posts={postsData}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});