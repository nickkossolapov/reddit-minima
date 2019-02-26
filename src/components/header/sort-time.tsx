import * as React from 'react';
import { SortTimes } from 'src/constants/sort';

export interface IProps {
  sortTime: SortTimes,
  setSortTime: (newValue: SortTimes) => void
}
  
function SortTime(props: IProps) {
  return (
    <select></select>
  );
}

export default SortTime;