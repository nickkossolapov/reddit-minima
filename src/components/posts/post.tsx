import * as React from 'react';
import {RedditPost} from "../../reddit/reddit-types";

function doesUrlContainImage(url: string) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function Post(props: RedditPost) {
  if (props.over18) {
    return null;
  }

  const {url, title, permalink, comments} = props;
  const urlContainsImage = doesUrlContainImage(url);

  return (
    <li className='post' onKeyPress={(event: React.KeyboardEvent<HTMLLIElement>) => props.handleKeyDown(event.key)}>
      {urlContainsImage ? <a href={url}><img src={url} alt={title}/></a> : null}
      <a href={urlContainsImage? url : permalink}><h2>{title}</h2></a>
      <a href={permalink}>{comments} comments</a>
    </li>
  )
}

export default Post;