import * as React from "react";
import * as enzyme from "enzyme";
import Post from "./post";

it('renders with correct props', () => {
  const mockPost = {
    title: 'test',
    over18: false,
    permalink: 'https://www.reddit.com/r/test',
    url: 'https://imgur.com/test',
    comments: 256,
    selftext: '',

  };
  const wrapper = enzyme.mount(<Post {...mockPost}/>);

  expect(wrapper.props()).toEqual(mockPost);
});

it('does not render an over 18 post', () => {
  const mockPost = {
    title: 'test',
    over18: true,
    permalink: 'https://www.reddit.com/r/test',
    url: 'https://imgur.com/test',
    comments: 256,
    selftext: ''
  };
  const wrapper = enzyme.mount(<Post {...mockPost}/>);

  expect(wrapper.find('li')).toHaveLength(0);
});

it('renders image', () => {
  const mockPost = {
    title: 'test',
    over18: false,
    permalink: 'https://www.reddit.com/r/test',
    url: 'https://imgur.com/test.jpg',
    comments: 256,
    selftext: ''
  };
  const wrapper = enzyme.mount(<Post {...mockPost}/>);

  expect(wrapper.find('img')).toHaveLength(1);
});

it('does not render image if not given a valid URL', () => {
  const mockPost = {
    title: 'test',
    over18: false,
    permalink: 'https://www.reddit.com/r/test',
    url: 'https://imgur.com/test.mp4',
    comments: 256,
    selftext: ''
  };
  const wrapper = enzyme.mount(<Post {...mockPost}/>);

  expect(wrapper.find('img')).toHaveLength(0);
});