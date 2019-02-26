export interface IRedditPosts {
  posts: IRedditPost[],
  before?: string,
  after?: string
}

export interface IRedditPost {
  title: string,
  over18: boolean,
  permalink: string,
  url: string,
  comments: number
}