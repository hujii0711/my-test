import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sample from '../components/Sample';
import { getPostAction, getUsersAction } from '../modules/sample';

const SampleContainer = () => {
  // getPost : createAction으로 생성된 액션 생성 함수 ---> dispatch 하여 스토어의 state를 변경할 것
  // getUsers : createAction으로 생성된 액션 생성 함수
  const { post, users, loadingPost, loadingUsers } = useSelector(({ sample, loading }) => ({
      post: sample.post,
      users: sample.users,
      loadingPost: loading['sample/GET_POST'],
      loadingUsers: loading['sample/GET_USERS']
  }));

  const dispatch = useDispatch();
  const getPostDispatch = useCallback(() => dispatch(getPostAction(1)), [dispatch]);
  console.log("SampleContainer[2] >>>>> getPostDispatch");  
  const getUsersDispatch = useCallback(() => dispatch(getUsersAction()), [dispatch]);
  console.log("SampleContainer[2] >>>>> getUsersDispatch!");

  useEffect(() => {
    console.log("SampleContainer[one!] >>>>> useEffect!");
    const fn = async () => {
      try {
        console.log("SampleContainer[one!] >>>>> async!");
        await getPostDispatch(1);
        console.log("SampleContainer[API] >>>>> await getPostDispatch!");
        await getUsersDispatch();
        console.log("SampleContainer[API] >>>>> await getUsersDispatch!");
      } catch (e) {
        console.log(e); // 에러 조회
      }
    };
    fn();
  }, [getPostDispatch, getUsersDispatch]);
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default React.memo(SampleContainer);