import { combineReducers } from 'redux';
import modifier from './modifier';

// Combine all the Reducers

const rootReducer = combineReducers({
  modifier,
});

export default rootReducer;
