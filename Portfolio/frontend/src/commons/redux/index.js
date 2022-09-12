import {combineReducers} from 'redux';
import userReducer from './users/reducers';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
