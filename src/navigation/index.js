import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import InSession from './inSession';
import OutSession from './outSession';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function AppContainer({session}) {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/*{session === null ? <OutSession /> : <InSession />}*/}
        <InSession />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  const {session} = state.stateStore;
  return {session};
};

export default connect(mapStateToProps, {})(AppContainer);
