import React, { useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPostsAction } from '../../modules/posts';
//import { listPostsServer } from '../../lib/api/posts';
//import { useQuery } from 'react-query';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //const result = useQuery('posts', listPostsServer);
  //console.log('result------', result);

  // 현재 state 값의 특정 값만 조회
  // const { posts, error, loading, user } = useSelector(
  //   ({ posts, loading, user }) => ({
  //     posts: posts.posts,
  //     error: posts.error,
  //     loading: loading['posts/LIST_POSTS'],
  //     user: user.user,
  //   }),
  // );
  // store의 state값을 사용자 동작에 따라 수시로 변경되어진 전역 state를 상태 선택 함수를 통해 특정한 state만을 선별하여 가져오는 거 같음
  const { posts, error, loading, user } = useSelector(function (state) {
    //스토어에 담긴 전역 state
    const { posts, loading, user } = state;
    const newState = {
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    };
    return newState;
  });

  useEffect(() => {
    //qs: URL 쿼리 --> 객체로 반환
    //만약 ignoreQueryPrefix : true 처리를 해야 ?표시가 없는 온전한 객체로 받을수 있다.
    //const { tag, username, page } = qs.parse(location.search);
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(
      'PostListContainer >>>>> useEffect >>>>> tag, username, page======',
      tag,
      username,
      page,
    );
    // 디스패치는 액션을 발생 시키는 것이다.
    // dispatch(action)의 형태로 액션 객체를 파라미터로 넣어서 호출한다.
    // 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.
    dispatch(listPostsAction({ tag, username, page }));
    //같은 형태 : dispatch({type: "posts/LIST_POSTS", tag : tag, username : username, page : page});
    //payload:
    //  page: undefined
    //  tag: undefined
    //  username: undefined
    //type: "posts/LIST_POSTS"
  }, [dispatch, location.search]); // 특정 값이 업데이트될 때만 실행하고 싶을 때

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
