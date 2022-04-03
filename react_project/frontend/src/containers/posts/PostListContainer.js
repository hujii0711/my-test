import React, { useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { posts, error, loading, user } = useSelector(
    //({ posts, loading, user }) => {
    (p_state) => { //스토에 담긴 전역 state
      const { posts, loading, user } = p_state;

      const state = {
        posts: posts.posts,
        error: posts.error,
        loading: loading['posts/LIST_POSTS'],
        user: user.user
      }

      return state;
    }
  );
  useEffect(() => {
    //만약 ignoreQueryPrefix : true 처리를 해야 ?표시가 없는 온전한 객체로 받을수 있다.
    //const { tag, username, page } = qs.parse(location.search);
    const { tag, username, page } = qs.parse(location.search, { ignoreQueryPrefix: true });
    console.log("PostListContainer >>>>> useEffect >>>>>> { tag, username, page } =========", { tag, username, page });
    //payload:
    //  page: undefined
    //  tag: undefined
    //  username: undefined
    //type: "posts/LIST_POSTS"
    dispatch(listPosts({ tag, username, page }));
    
  }, [dispatch, location.search]);

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
