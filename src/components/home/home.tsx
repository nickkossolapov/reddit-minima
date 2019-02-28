import * as React from 'react';
import Search, { SearchProps } from '../search/search';
import './home.css';
import {RedditPost} from "../../reddit/reddit-types";

interface HomeProps extends SearchProps {
  posts: RedditPost[]
}

function Home(props: HomeProps) {
  return (
    <header className='app'>
      <Search
        setSubreddit={props.setSubreddit}
      />
    </header>
  );
}

export default Home;