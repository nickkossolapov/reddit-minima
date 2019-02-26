import * as React from 'react';
import { IProps as SortOptionProps } from './header/sort-option';
import { IProps as SortTimeProps } from './header/sort-time';
import Search, { IProps as SearchProps } from './header/search';
import './app.css';

interface IProps extends SortOptionProps, SortTimeProps, SearchProps {
}

function App(props: IProps) {
  return (
    <header className='app'>
      <Search 
        subredditName={props.subredditName}
        setSubreddit={props.setSubreddit}
      />
    </header>
  );
}

export default App;