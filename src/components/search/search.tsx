import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";

export interface SearchProps {
  setSubreddit: (newValue: string) => void
}

interface SearchState {
  value: string
}

class Search extends React.Component<SearchProps, SearchState>{
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      value: ''
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({value: event.target.value})
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.setSubreddit(this.state.value);
    if (document.activeElement){
      (document.activeElement as any).blur();
    }
    this.setState({value: ''});
  };

  render() {
    return (
      <form className='search-form' onSubmit={event => this.handleSubmit(event)}>
        <input
          className='search-input'
          placeholder='Enter a subreddit'
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type='submit'>Search</button>
      </form>
    );
  }
}

export default Search;