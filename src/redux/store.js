import {applyMiddleware, createStore, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';

export default createStore(
  combineReducers({
    stateStore: Reducers,
  }),
  {},
  applyMiddleware(ReduxThunk),
);
