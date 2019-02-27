import axios from 'axios';
import {IQueryData, IRedditPost, IRedditPosts} from "./types/reddit-types";

const BASE_URL = 'https://www.reddit.com/';
const PERMALINK_BASE_URL = 'https://www.reddit.com';
const JSON_PATH = '.json';

function parsePostsData(response: any): IRedditPost[] {
  return Array.from(response.data.children.map((child: any) => {
    const data = child.data;
    return {
      title: data.title,
      over18: data.over_18 === true,
      permalink: PERMALINK_BASE_URL + data.permalink,
      url: data.url,
      comments: parseInt(data.num_comments),
      selftext: data.selftext
    };
  }));
}

function getQueryParameters(queryData: IQueryData): string {
  if (queryData.after != null) {
    return '?after='+queryData.after;
  }
  return '';
}

function buildSubredditUrl(queryData: IQueryData): string {
  const { subreddit } = queryData;
  const queryParameters = getQueryParameters(queryData);
  const subredditPath: string = queryData.subreddit != null ? `r/${subreddit}/` : '';

  return BASE_URL + subredditPath + JSON_PATH + queryParameters;
}

export async function getPosts(queryData: IQueryData): Promise<IRedditPosts> {
  const url = buildSubredditUrl(queryData);
  const response = await axios.get(url);
  const posts = parsePostsData(response);

  return {
    posts,
    nextQueryData: {
      subreddit: queryData.subreddit,
      after: response.data.after
    }
  };
}
