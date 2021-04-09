import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import sessionReducer from './authentication/session';
import userReducer from './authentication/user';

const appReducer = combineReducers({
  sessionReducer,
  userReducer,
});

const middleware = [thunkMiddleware.withExtraArgument({ axios })];

export default createStore(appReducer, applyMiddleware(...middleware));
