import {useMutation} from 'react-query';
import {autoLogin} from '../../api/login';
import useInform from './useInform';
import useLogin from './useLogin';

export default function useAutoLogin() {
  const inform = useInform();
  const {mutate: mutateLogin} = useLogin();

  const mutation = useMutation(autoLogin, {
    onSuccess: data => {
      // 로그인 수행 : 세션 취득, 토큰 재취득
      mutateLogin({identifier: data.email, password: data.password});
    },
    onError: error => {
      console.log('useAutoLogin >>> onError >>> error---------', error);
      inform({
        title: '오류',
        message: '토큰 검증 실패',
      });
    },
  });
  return mutation;
}
