import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] =
  createRequestActionTypes('posts/LIST_POSTS');

//같은 형태 : dispatch({type: "posts/LIST_POSTS", tag : tag, username : username, page : page});
//PostListContainer.js에서 call : dispatch(listPostsAction({ tag, username, page }));
export const listPostsAction = createAction(
  LIST_POSTS, //posts/LIST_POSTS
  ({ tag, username, page }) => {
    return { tag, username, page };
  },
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPostsServer);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

// 객체 기존 key 이름 대신 다른 key 이름으로 사용하기
// var obj = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };
// var { a1 : awesome_name, a2 : dumb , ...rest } = obj;
// console.log(awesome_name); // 10
// console.log(dumb); // 20
// console.log({...rest}); // {a3: 30, a4: 40}
// const aaa = {
//   posts: null,
//   error: null,
//   lastPage: null,
// };
// const bbb = {
//   ...aaa,
//   posts : 1,
//   lastPage: 2
// };
// console.log(bbb); //{posts: 1, lastPage: 2, error: null}

const posts = handleActions(
  {
    //createRequestSaga에서 // dispatch({ type : 'LIST_POSTS_SUCCESS', payload : response.data, meta : response })
    [LIST_POSTS_SUCCESS]: (state, action) => { 
      const payload = action.payload;
      const response = action.meta;
      console.log("handleActions >>>>> payload===", payload);
      console.log("handleActions >>>>> response===", response);
      return {
        ...state,
        posts : payload,
        lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
      };
    },
    [LIST_POSTS_FAILURE]: (state, action) => {
      const error = action.error;
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default posts;
