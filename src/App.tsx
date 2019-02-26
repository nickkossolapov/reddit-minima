import * as React from 'react';
import { SortTimes, SortOptions } from 'src/constants/sort';
import App from './components/app';


interface IState {
  subredditName?: string,
  sortTime: SortTimes,
  sortOption?: SortOptions
}


class AppContainer extends React.Component<{}, IState> {
  setSubreddit = (newValue: string): void => this.setState({subredditName: newValue});
  setSortOption = (newValue: SortOptions): void => this.setState({sortOption: newValue});
  setSortTime = (newValue: SortTimes): void => this.setState({sortTime: newValue});

  public render() {
    return (
      <App 
        {...this.state}
        setSubreddit={this.setSubreddit}
        setSortOption={this.setSortOption}
        setSortTime={this.setSortTime}
      />
    );
  }
}

export default AppContainer;
