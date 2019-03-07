import axios from "axios";
import * as ReactDOM from "react-dom";
import * as React from "react";
import * as enzyme from "enzyme";

import Posts from "./posts";
import * as postsData from "../../test-data/posts-data";
import * as Reddit from '../../reddit/reddit';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockFetchNextPosts = jest.fn(() => {});

it('renders without crashing', async () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const posts = (await Reddit.getPosts()).posts;

  const div = document.createElement('div');
  ReactDOM.render(<Posts posts={posts} fetchNextPosts={mockFetchNextPosts} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('will increase index to go to next post', async () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const posts = (await Reddit.getPosts()).posts;
  const wrapper: any = enzyme.mount(<Posts posts={posts} fetchNextPosts={mockFetchNextPosts} />);

  await wrapper.instance().goToNextPost();

  expect(wrapper.state('index')).toBe(1);
});

it('will load next post when threshold is reached', async() => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const posts = (await Reddit.getPosts()).posts;
  const wrapper: any = enzyme.mount(<Posts posts={posts}  fetchNextPosts={mockFetchNextPosts} />);

  wrapper.setState({index: 9});
  await wrapper.instance().goToNextPost();
  expect(mockFetchNextPosts).toBeCalled();
});

it('will set loading when fetching posts', async() => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const posts = (await Reddit.getPosts()).posts;
  const mockFetchNextPostsAsync = jest.fn(async () => {
    expect(wrapper.state('loading')).toBe(true);
  });
  const wrapper: any = enzyme.mount(<Posts posts={posts}  fetchNextPosts={mockFetchNextPostsAsync} />);

  wrapper.setState({index: 9});
  await wrapper.instance().goToNextPost();
  expect(wrapper.state('loading')).toBe(false);
});

it('will display loading div when loading', async() => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const posts = (await Reddit.getPosts()).posts;
  const wrapper: any = enzyme.mount(<Posts posts={posts}  fetchNextPosts={mockFetchNextPosts} />);

  wrapper.setState({loading: true});
  expect(wrapper.find('.loading')).toHaveLength(1);
});

it('will go to next post when pressing right arrow key', async() => { //TODO: Fix failing test
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const posts = (await Reddit.getPosts()).posts;
  const wrapper: any = enzyme.mount(<Posts posts={posts}  fetchNextPosts={mockFetchNextPosts} />);

  await wrapper.simulate('keypress', {key: RIGHT_ARROW});
  expect(wrapper.state('index')).toBe(1);
});