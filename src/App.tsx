import * as React from 'react';
import Home from './components/home/home';


interface IState {
  subredditName?: string
}

class AppContainer extends React.Component<{}, IState> {
  setSubreddit = (newValue: string): void => this.setState({subredditName: newValue});

  public render() {
    return (
      <Home
        {...this.state}
        setSubreddit={this.setSubreddit}
      />
    );
  }
}

export default AppContainer;
