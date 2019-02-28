export interface RedditPostsQuery {
  posts: RedditPost[],
  nextQueryData: QueryData
}

export interface RedditPost {
  title: string,
  over18: boolean,
  permalink: string,
  url: string,
  comments: number,
  selftext: string
}

export interface QueryData {
  subreddit?: string,
  after?: string
}