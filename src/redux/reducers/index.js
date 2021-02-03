import {combineReducers} from 'redux';
import userReducer from './UserReducer';
import {DESTROY_SESSION} from '../actions/ActionTypes';

const appReducer = combineReducers({
  user: userReducer,
 
});
const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
