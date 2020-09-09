import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/navigation';
import {Root} from 'native-base';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

export default App;
