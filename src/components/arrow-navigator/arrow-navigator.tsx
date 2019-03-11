import * as React from 'react';

interface ArrowNavigatorProps {
  handleClick: () => void,
  direction: string
}

function ArrowNavigator(props: ArrowNavigatorProps) {
  return <button onClick={props.handleClick} className={`arrow ${props.direction}`}>{props.direction}</button>
}

export default ArrowNavigator;