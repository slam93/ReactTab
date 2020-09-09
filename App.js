import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/navigation';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
