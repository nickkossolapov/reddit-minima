import * as React from 'react';
import { SortOptions } from 'src/constants/sort';

export interface IProps {
  sortOption?: SortOptions,
  setSortOption: (newValue: SortOptions) => void
}
  
function SortOption(props: IProps) {
  return (
    <select></select>
  );
}

export default SortOption;