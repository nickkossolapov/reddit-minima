import * as ReactDOM from "react-dom";
import * as React from "react";
import * as enzyme from "enzyme";

import PostContainer from "./post-container";
import * as postsData from "../../test-data/processed-posts-data.json";

const mockFetchNextPosts = jest.fn(() => {});

const LEFT_ARROW = '37';
const RIGHT_ARROW = '39';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('will increase index to go to next post', async () => {
  const wrapper: any = enzyme.mount(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);

  await wrapper.instance().goToNextPost();
  expect(wrapper.state('index')).toBe(1);
});

it('will load next post when threshold is reached', async() => {
  const wrapper: any = enzyme.mount(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);
  wrapper.setState({index: postsData.length-1});

  await wrapper.instance().goToNextPost();
  expect(mockFetchNextPosts).toBeCalled();
});

it('will set loading when fetching posts', async () => {
  const mockFetchNextPostsAsync = jest.fn(async () => {
    expect(wrapper.state('loading')).toBe(true);
  });
  const wrapper: any = enzyme.mount(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPostsAsync} />);
  wrapper.setState({index: postsData.length-1});

  await wrapper.instance().goToNextPost();
  expect(wrapper.state('loading')).toBe(false);
});

it('will display loading div when loading', async () => {
  const wrapper: any = enzyme.mount(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);
  wrapper.setState({loading: true});

  expect(wrapper.find('.loading')).toHaveLength(1);
});


it('will go to next post when right arrow is pressed', () => {
  const eventMap: any = {keydown: ({}) => {}};
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
  });

  const wrapper: any = enzyme.shallow(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);
  eventMap.keydown({ key: RIGHT_ARROW });
  expect(wrapper.state('index')).toBe(1);
});

it('will go to previous post when left arrow is pressed', () => {
  const eventMap = {keydown: ({}) => {}};
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
  });

  const wrapper: any = enzyme.shallow(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);
  wrapper.setState({index: 1});
  eventMap.keydown({ key: LEFT_ARROW });
  expect(wrapper.state('index')).toBe(0);
});

it('will not go to a negative state when pressing left arrow', () => {
  const eventMap: any = {keydown: ({}) => {}};
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
  });

  const wrapper: any = enzyme.shallow(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);
  eventMap.keydown({ key: LEFT_ARROW });
  expect(wrapper.state('index')).toBe(0);
});

it('will fetch next post when div is loading', () => {
  const eventMap = {keydown: ({}) => {}};
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
  });

  const wrapper: any = enzyme.mount(<PostContainer posts={postsData} fetchNextPosts={mockFetchNextPosts} />);
  wrapper.setState({index: postsData.length-1});

  eventMap.keydown({ key: RIGHT_ARROW });
  expect(mockFetchNextPosts).toBeCalled();
});
