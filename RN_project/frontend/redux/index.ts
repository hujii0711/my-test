import {combineReducers} from 'redux';
import userReducer from './users/reducers';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

//---------------------------교재 예제----------------------------
// import {combineReducers} from 'redux';
// import auth from './users/reducers';

// const rootReducer = combineReducers({
//   auth,
// });

// // rootReducer 함수의 반환값 타입을 RootState type alias로 지정
// export type RootState = ReturnType<typeof rootReducer>;

// declare module 'react-redux' {
//   interface DefaultRootState extends RootState {}
// }

// export default rootReducer;

//----------------------------git 예제---------------------------

// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import userReducer from './users/reducers';
// const middleware = [...getDefaultMiddleware({ thunk: false })];

// const rootReducer = combineReducers({
//   userReducer,
// });

// const store = configureStore({
//   reducer: {
//     users: userReducer,
//     gif: gifReducer
//   },
//   middleware
// });

// export default rootReducer;
//export type RootState = ReturnType<typeof rootReducer>;

//const aaa : any = useSelector((state: RootState) => ...);
// const user = useSelector((state: RootState) => state.users);
