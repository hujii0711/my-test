import {useEffect} from 'react';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userDelete} from '../redux/users/reducers';
import {autoLogin} from '../../api/login';
import {useMutation} from 'react-query';
import useInform from './useInform';
import useLogin from './useLogin';

export default function useAuthLoadEffect() {
  const dispatch = useDispatch();
  const inform = useInform();
  const {mutate: mutateLogin} = useLogin();

  // useEffect(() => {
  //   (async () => {
  //     const auth = await authStorage.get();
  //     if (!auth) {
  //       return;
  //     }
  //     // 리덕스 변경
  //     dispatch(userSelect(auth.user));
  //     // AsyncStotage 토큰 변경
  //     setHeaderRemoveToken(auth.jwt);
  //   })();
  // }, [dispatch]);

  useEffect(() => {
    (async () => {
      const autoLogin = await authStorage.get('autoLogin');
      const token = await authStorage.get('token');

      if (!autoLogin) {
        return;
      }
      // 자동 로그인 체크한 경우
      if (autoLogin === 'Y' && token) {
        mutateAutoLogin(token);
        //자동 로그인 언체크한 경우
      } else if (autoLogin === 'N') {
        dispatch(userDelete());
        setHeaderRemoveToken();
        authStorage.clear('token');
      }
    })();
  }, []);

  // 토큰 검증
  const {mutate: mutateAutoLogin} = useMutation(autoLogin, {
    onSuccess: data => {
      // {
      //   status: 'S',
      //   message: '토큰이 정상입니다.',
      //   user_id: decoded.userId,
      //   email: decoded.email,
      //   password: 'freepass',
      //   token,
      // };

      // 로그인 수행 : 세션 취득, 토큰 재취득
      mutateLogin({identifier: data.email, password: data.password});
    },
    onError: error => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        '토큰 검증 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });

  // 로그인 수행
  // const {mutate: mutateLogin} = useMutation(login, {
  //   onSuccess: data => {
  //     // {
  //     //   sessionUser: user, //세션에 있는 정보
  //     //   token, //취득한
  //     // };
  //     if (data) {
  //       dispatch(userSelect(data.sessionUser));
  //       setHeaderToken(data.token);
  //       authStorage2.set('token', data);
  //     }
  //     navigation.pop();
  //   },
  //   onError: error => {
  //     const message =
  //       error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
  //     inform({
  //       title: '오류',
  //       message,
  //     });
  //   },
  // });
}
