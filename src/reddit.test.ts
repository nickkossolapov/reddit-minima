import axios from 'axios';
import * as Reddit from './reddit';
import * as postsData from './test-data/posts-data.json';
import * as singlePostData from './test-data/single-post-data.json';
import {IRedditPosts} from "./types/reddit-types";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('should call reddit API with no parameters', () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const queryData = {};

  Reddit.getPosts(queryData);
  expect(mockedAxios.get).toHaveBeenCalledWith('https://www.reddit.com/.json');
});

it('should call reddit API with a subreddit', () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const queryData = {
    subreddit: 'test'
  };

  Reddit.getPosts(queryData);
  expect(mockedAxios.get).toHaveBeenCalledWith('https://www.reddit.com/r/test/.json');
});

it('should get reddit posts', async () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const queryData = {
    subreddit: 'test'
  };

  const data: IRedditPosts = await Reddit.getPosts(queryData);
  expect(data.posts).toBeTruthy();
});

it('should get 10 reddit posts', async () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);

  const queryData = {
    subreddit: 'test'
  };

  const data: IRedditPosts = await Reddit.getPosts(queryData);
  expect(data.posts.length).toEqual(10);
});

it('should get reddit after value', async () => {
  mockedAxios.get.mockReturnValueOnce(postsData as any);
  const queryData = {
    subreddit: 'test'
  };

  const data: IRedditPosts = await Reddit.getPosts(queryData);
  expect(data.nextQueryData.after).toEqual('t3_29xpib');
});

it('should call reddit API with after data', async () => {
  mockedAxios.get.mockReturnValue(postsData as any);
  const queryData = {
    subreddit: 'test'
  };

  const { nextQueryData } = await Reddit.getPosts(queryData);
  Reddit.getPosts(nextQueryData);
  expect(mockedAxios.get).toHaveBeenCalledWith('https://www.reddit.com/r/test/.json?after=t3_29xpib');
});

it('should get correct post data from Reddit API', async () => {
  mockedAxios.get.mockReturnValueOnce(singlePostData as any);
  const queryData = {
    subreddit: 'test'
  };

  const targetPost = {
    title: 'test',
    over18: true,
    permalink: 'https://www.reddit.com/r/test/comments/6lfsbt/test/',
    url: 'https://i.imgur.com/htRlFhx.jpg',
    comments: 268,
    selftext: ''
  };

  const data: IRedditPosts = await Reddit.getPosts(queryData);
  expect(data.posts[0]).toEqual(targetPost);
});
