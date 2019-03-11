import * as ReactDOM from "react-dom";
import * as React from "react";
import * as enzyme from "enzyme";

import ArrowNavigator from "./arrow-navigator";

const mockHandleClick = jest.fn(() => {});

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<ArrowNavigator direction='left' handleClick={mockHandleClick} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls handle click on click', () => {
  const wrapper: any = enzyme.mount(<ArrowNavigator direction='left' handleClick={mockHandleClick} />);

  wrapper.find('button').simulate('click');
  expect(mockHandleClick).toBeCalled();
});