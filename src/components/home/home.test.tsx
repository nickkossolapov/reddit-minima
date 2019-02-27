import * as ReactDOM from "react-dom";
import Home from "./home";
import * as React from "react";

const mockSetSubreddit = jest.fn((newValue: string) => {});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home setSubreddit={mockSetSubreddit} />, div);
  ReactDOM.unmountComponentAtNode(div);
});