import * as React from 'react';
import Home from './components/home/home';
import {QueryData, RedditPost} from "./reddit/reddit-types";
import * as Reddit from "./reddit/reddit";

interface IState {
  subredditName?: string,
  posts: RedditPost[],
  nextQueryData?: QueryData
}

class AppContainer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      posts: [],
    };
  };

  async componentDidMount() {
    let postsQuery = await Reddit.getPosts();
    this.setState({
      posts: this.state.posts.concat(postsQuery.posts),
      nextQueryData: postsQuery.nextQueryData
    });
  };

  setSubreddit = async (newValue: string) => {
    const newPostsQuery = await Reddit.getPostsForSubreddit(newValue);
    this.setState({
      subredditName: newValue,
      posts: newPostsQuery.posts,
      nextQueryData: newPostsQuery.nextQueryData
    });
  };

  fetchNextPosts = async () => {
    const newPostsQuery = await Reddit.getPosts(this.state.nextQueryData);
    this.setState({
      posts: this.state.posts.concat(newPostsQuery.posts),
      nextQueryData: newPostsQuery.nextQueryData
    });
  };

  public render() {
    return (
      <Home
        posts={this.state.posts}
        setSubreddit={this.setSubreddit}
      />
    );
  };
}

export default AppContainer;
