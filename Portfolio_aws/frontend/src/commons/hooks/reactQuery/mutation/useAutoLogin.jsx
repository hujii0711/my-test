import {useMutation} from 'react-query';
import {autoLogin} from '../../../../api/login';
import useInform from '../../useInform';
import useLogin from './useLogin';

const useAutoLogin = () => {
  const inform = useInform();
  const {mutate: mutateLogin} = useLogin();

  return useMutation(autoLogin, {
    onSuccess: data => {
      // 로그인 수행 : 세션 취득, 토큰 재취득
      // jwt.verify decode 데이터
      // {
      //   status: "S",
      //   message: "토큰이 정상입니다.",
      //   id: decoded.id,
      //   email: decoded.email,
      //   password: decoded.id,
      // }
      mutateLogin({email: data.email, password: data.password});
    },
    onError: error => {
      console.log('useAutoLogin >>> onError >>> error---------', error);
      inform({
        title: '오류',
        message: '토큰 검증 실패',
      });
    },
  });
};

export default useAutoLogin;
