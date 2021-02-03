import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middlewares = [thunk];

if (__DEV__) {
  middlewares.push(logger);
}

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middlewares));
}
