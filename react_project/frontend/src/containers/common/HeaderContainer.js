import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다. 
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  //const { user } = useSelector(({ user }) => {
  //  console.log(user);
  //  return { user: user.user };
  //});
 
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
