import axios from 'axios';
import {IRedditPost, IRedditPosts} from "./types/reddit-types";

const BASE_URL = 'https://www.reddit.com/';
const JSON_PATH = '.json';

function parsePostsData(response: any): IRedditPosts {
  const posts: IRedditPost[] = Array.from(response.data.children.map((child: any) => {
    const post: IRedditPost = {
      title: child.title,
      over18: child.over_18 === 'true',
      permalink: child.permalink,
      url: child.url,
      comments: parseInt(child.num_comments)
    };

    return post;
  }));

  return {
    posts: posts,
    before: response.data.before,
    after: response.data.after
  };
}

export async function getPosts(subreddit?: string): Promise<IRedditPosts> {
  const subredditPath: string = subreddit !== null ? `r/${subreddit}/` : '';
  const response = await axios.get(BASE_URL + subredditPath + JSON_PATH);
  const data = parsePostsData(response);

  return data;
}