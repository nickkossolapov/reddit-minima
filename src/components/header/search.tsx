import * as React from 'react';

export interface SearchProps {
  subredditName?: string,
  setSubreddit: (newValue: string) => void
}

function Search(props: SearchProps) {
  return (
    <fieldset>
      <input />
      <button>Search</button>
    </fieldset>
  );
}

export default Search;