import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';

const SampleContainer = ({post, users, loadingPost, loadingUsers, getPost, getUsers}) => {
  // getPost : createAction으로 생성된 액션 생성 함수 ---> dispatch 하여 스토어의 state를 변경할 것
  // getUsers : createAction으로 생성된 액션 생성 함수
  // 클래스 형태 컴포넌트였더라면, componentDidMount

  useEffect(() => {
    // useEffect 에 파라미터로 넣는 함수는 async 로 할 수 없기 때문에
    // 그 내부에서 async 함수를 선언하고 호출해줍니다.
    const fn = async () => {
      try {
        await getPost(1);
        console.log("dispatch>>> getPost=====");
        await getUsers();
        console.log("dispatch>>> getUsers=====");
      } catch (e) {
        console.log(e); // 에러 조회
      }
    };
    fn();
  }, [getPost, getUsers]);
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  function({sample, loading}){
    //-console.log("sample=====", sample);
    //-console.log("loading=====", loading);
    return {
      post: sample.post,
      users: sample.users,
      loadingPost: loading['sample/GET_POST'],
      loadingUsers: loading['sample/GET_USERS']
    }
  },
  {
    getPost,
    getUsers
  }
  // dispatch => ({
  //   getPost : () => dispatch(getPost()),
  //   getUsers : () => dispatch(getUsers()),
  // })
)(SampleContainer);
