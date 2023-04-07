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
      // 로그인 수행 : 세션 취득, 토큰 재취득
      mutateLogin({identifier: data.email, password: data.password});
    },
    onError: error => {
      console.log('useAuthLoadEffect >>> onError >>> error---------', error);
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        '토큰 검증 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
}
