import {combineReducers} from 'redux';
import userReducer from './users/reducers';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

//const aaa : any = useSelector((state: RootState) => ...);
// const user = useSelector((state: RootState) => state.users);
