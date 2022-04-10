import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  //const { postId } = match.params;
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    // 포스트 페이지를 벗어날 때 리덕스 상태의 데이터를 비우는 것
    // 만약 데이터를 비우지 않으면 나중에 사용자가 특정 포스트를 읽은 뒤 목록으로 돌아가서 또다른 포스트를 읽을 때 아주 짧은 시간 동안 이전에
    // 불러왔던 포스트가 나타나는 깜빡임 현상이 발생함
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));

    //history.push('/write');
    navigate("/write");
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      //history.push('/'); // 홈으로 이동
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={user && user.id === post && post.id}
    />
  );
};

export default PostViewerContainer;
