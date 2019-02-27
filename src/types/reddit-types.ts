export interface IRedditPosts {
  posts: IRedditPost[],
  nextQueryData: IQueryData
}

export interface IRedditPost {
  title: string,
  over18: boolean,
  permalink: string,
  url: string,
  comments: number,
  selftext: string
}

export interface IQueryData {
  subreddit?: string,
  after?: string
}