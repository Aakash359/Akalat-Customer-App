import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import {DESTROY_SESSION} from '../Types/type';

const appReducer = combineReducers({
  Auth: AuthReducer,
 
});
const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
