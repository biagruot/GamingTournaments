import { combineReducers } from 'redux';
import { tournaments } from './tournaments.reducers';

const rootReducer = combineReducers({
  tournaments,
});

export default rootReducer;
