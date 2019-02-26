import * as React from 'react';

export interface IProps {
  subredditName?: string,
  setSubreddit: (newValue: string) => void
}

function Search(props: IProps) {
  return (
    <fieldset>
      <input />
      <button>Search</button>
    </fieldset>
  );
}

export default Search;