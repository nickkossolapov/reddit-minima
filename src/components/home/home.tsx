import * as React from 'react';
import Search, { SearchProps } from '../header/search/search';
import './home.css';

interface IProps extends SearchProps {
}

function Home(props: IProps) {
  return (
    <header className='app'>
      <Search
        setSubreddit={props.setSubreddit}
      />
    </header>
  );
}

export default Home;