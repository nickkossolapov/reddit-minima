import axios from 'axios';
import * as enzyme from "enzyme";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import * as postsData from './test-data/posts-data.json';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls reddit API on mount to fetch posts default posts', () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);

  enzyme.shallow(<App/>);

  expect(mockedAxios.get).toHaveBeenCalledWith('https://www.reddit.com/.json');
});

it('calls reddit API for new URL when setting subreddit', () => {
  mockedAxios.get.mockReturnValue(postsData as any);

  const wrapper: any = enzyme.mount(<App/>);
  wrapper.instance().setSubreddit('test');

  expect(mockedAxios.get).toHaveBeenLastCalledWith('https://www.reddit.com/r/test/.json');
});

it('resets posts when setting subreddit', async () => {
  mockedAxios.get.mockReturnValue(postsData as any);

  const wrapper: any = enzyme.mount(<App/>);
  await wrapper.instance().setSubreddit('test');

  expect(wrapper.state('posts').length).toBe(10);
});

it('calls reddit API to get more posts', async () => {
  mockedAxios.get.mockReturnValue(postsData as any);

  const wrapper: any = enzyme.mount(<App/>);
  await wrapper.instance().fetchNextPosts();

  expect(wrapper.state('posts').length).toBe(20);
});