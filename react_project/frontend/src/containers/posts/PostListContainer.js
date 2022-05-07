import React, { useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // 현재 state 값의 특정 값만 조회
  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user
  }));

  // const { posts, error, loading, user } = useSelector(
  //   //({ posts, loading, user }) => {
  //   (p_state) => { //스토어에 담긴 전역 state
  //     const { posts, loading, user } = p_state;

  //     const state = {
  //       posts: posts.posts,
  //       error: posts.error,
  //       loading: loading['posts/LIST_POSTS'],
  //       user: user.user
  //     }

  //     return state;
  //   }
  // );
  useEffect(() => {
    //qs: URL 쿼리 --> 객체로 반환
    //만약 ignoreQueryPrefix : true 처리를 해야 ?표시가 없는 온전한 객체로 받을수 있다.
    //const { tag, username, page } = qs.parse(location.search);
    const { tag, username, page } = qs.parse(location.search, { ignoreQueryPrefix: true });
    dispatch(listPosts({ tag, username, page }));
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
