import axios from 'axios';
import * as Reddit from './reddit';
import * as postData from './test-data/post-data.json';
import {IRedditPosts} from "./types/reddit-types";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('should call reddit API with no parameters', () => {
  mockedAxios.get.mockReturnValueOnce(postData as any);

  Reddit.getPosts();
  expect(mockedAxios.get).toHaveBeenCalledWith('https://www.reddit.com/.json');
});

it('should call reddit API with a subreddit', () => {
  mockedAxios.get.mockReturnValueOnce(postData as any);

  Reddit.getPosts('test');
  expect(mockedAxios.get).toHaveBeenCalledWith('https://www.reddit.com/r/test/.json');
});

it('should get reddit posts', async () => {
  mockedAxios.get.mockReturnValueOnce(postData as any);

  const data: IRedditPosts = await Reddit.getPosts('test');
  expect(data.posts).toBeTruthy();
});

it('should get 10 reddit posts', async () => {
  mockedAxios.get.mockReturnValueOnce(postData as any);

  const data: IRedditPosts = await Reddit.getPosts('test');
  expect(data.posts.length).toBe(10);
});