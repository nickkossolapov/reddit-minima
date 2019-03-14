import * as React from 'react';
import {RedditPost} from "../../reddit/reddit-types";
import Post from "./post";
import ArrowNavigator from "../arrow-navigator/arrow-navigator";

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';

interface PostsProps {
  posts: RedditPost[],
  fetchNextPosts: () => void
}

interface PostsState {
  index: number,
  loading: boolean
}

class PostContainer extends React.Component<PostsProps, PostsState> {
  constructor(props: PostsProps){
    super(props);

    this.state = {
      index: 0,
      loading: false
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  goToNextPost = async () => {
    if (!this.state.loading) {
      if ((this.state.index + 1) > (this.props.posts.length-1)) {
        try {
          this.setState({loading: true});
          await this.props.fetchNextPosts();
        } finally {
          this.setState({loading: false});
        }
      } else {
        this.setState({index: this.state.index + 1})
      }
    }
  };

  goToPreviousPost = () => {
    if (this.state.index > 0 ){
      this.setState({index: this.state.index - 1})
    }
  };


  handleKeyPress = async (event: KeyboardEvent) => {
    switch (event.key) {
      case RIGHT_ARROW:
        await this.goToNextPost();
        break;
      case LEFT_ARROW:
        this.goToPreviousPost();
        break;
    }
  };

  render() {
    return this.state.loading || this.props.posts.length == 0
      ? <div className='loading'>Loading...</div>
      : <>
          <ArrowNavigator direction='left' handleClick={() => this.goToPreviousPost()} />
          <Post {...(this.props.posts[this.state.index])} />
          <ArrowNavigator direction='right' handleClick={() => this.goToNextPost()}/>
        </>;
  }
}

export default PostContainer;