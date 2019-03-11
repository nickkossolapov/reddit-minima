import * as React from 'react';
import Search, { SearchProps } from '../search/search';
import './home.css';
import {RedditPost} from "../../reddit/reddit-types";
import PostContainer from "../posts/post-container";

interface HomeProps extends SearchProps {
  posts: RedditPost[],
  fetchNextPosts: () => void
}

function Home(props: HomeProps) {
  return (
    <header className='app'>
      <Search
        setSubreddit={props.setSubreddit}
      />
      <PostContainer posts={props.posts} fetchNextPosts={props.fetchNextPosts}/>
    </header>
  );
}

export default Home;