import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  // onSubmit 이벤트가 발생했을 때 register 함수에 현재 username과 password를 파라미터로 넣어서 액션을 디스패치해줌
  // 그리고 사가에서 API 요청을 처리하고, 이에 대한 결과는 auth/authError를 통해 조회할 수 있다.
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    // 하나라도 비어있다면
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공 / 실패 처리
  // 결과를 얻었을 때, 특정 작업을 하기 위해 useEffect를 사용
  // useEffect에 넣어 준 함수는 auth 값 혹은 authError 값 중에서 무엇이 유효한지에 따라 다른 작업을 한다.
  useEffect(() => {
    if (authError) {
      // 계정명이 이미 존재할 때
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }

    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      //history.push('/'); // 홈 화면으로 이동
      navigate("/");
      try {
        // 회원가입 및 로그인을 하면 사용자 정보를 localStorage에 저장하도록 작업
        // 페이지를 새로고침했을 때도 로그인 상태를 유지하려면, 리액트 앱이 브라우저에서 맨 처음 랜더링될때
        // localStorage에서 값을 불러와 리덕스 스토어 안에 넣도록 구현해 주어야 한다.
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
