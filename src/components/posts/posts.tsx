import * as React from 'react';
import {RedditPost} from "../../reddit/reddit-types";
import Post from "./post";

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

interface PostsProps {
  posts: RedditPost[],
  fetchNextPosts: () => void
}

interface PostsState {
  index: number,
  loading: boolean
}

class Posts extends React.Component<PostsProps, PostsState> {
  constructor(props: PostsProps){
    super(props);

    this.state = {
      index: 0,
      loading: false
    }
  }

  goToNextPost = async () => {
    if (!this.state.loading && ((this.state.index + 1) > (this.props.posts.length-1))) {
      try {
        this.setState({
          loading: true
        });
        await this.props.fetchNextPosts();
      } finally {
        this.setState({
          loading: false
        });
      }
    } else {
      this.setState({
        index: this.state.index + 1
      })
    }
  };

  handleKeyPress = async (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.keyCode === RIGHT_ARROW) {
      await this.goToNextPost();
    }
  };

  render() {
    return this.state.loading
      ? <div className='loading'>Loading...</div>
      : <Post {...(this.props.posts[this.state.index])} handleKeyPress={this.handleKeyPress} />
  }
}

export default Posts;