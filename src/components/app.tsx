import * as React from 'react';
import Search, { SearchProps } from './header/search';
import './app.css';

interface IProps extends SearchProps {
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