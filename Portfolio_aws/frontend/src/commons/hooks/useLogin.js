import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {putHeaderToken} from '../../api/client';
import {login, updateSessionExpires} from '../../api/login';
import authStorage from '../storage/authStorage';
import useInform from './useInform';
import {userSelect, userDelete} from '../redux/users/reducers';

export default function useLogin() {
  const dispatch = useDispatch();
  const inform = useInform();
  const navigation = useNavigation();

  const loginCallback = (sessionUser, token) => {
    dispatch(userSelect(sessionUser));
    putHeaderToken(token);
    authStorage.set('token', token);
  };

  const mutation = useMutation(login, {
    onSuccess: data => {
      if (data) {
        console.log('login >>> onSuccess >>>> data---------', data);
        const sessionUser = data.sessionUser;
        const l_token = data.token;
        const l_sessionUser = {...sessionUser, token: l_token};
        loginCallback(l_sessionUser, l_token);

        navigation.navigate('MainTab');
        // session 테이블 동시성 문제로 req.login 이후
        // session.expires 항목 update가 되지 않아
        // login 콜백 이후 다시 router 태움
        mutateUpdateSessionExpires();
      }
    },
    onError: error => {
      console.log('useLogin >>> onError >>> error---------', error);
      dispatch(userDelete());
      inform({
        title: '오류',
        message: '로그인 실패',
      });
    },
  });

  const {mutate: mutateUpdateSessionExpires} = useMutation(
    updateSessionExpires,
    {
      onSuccess: data => {
        console.log(
          'updateSessionExpires >>> onSuccess >>> data---------',
          data,
        );
      },
      onError: error => {
        console.log('useLogin >>> onError >>> error---------', error);
        inform({
          title: '오류',
          message: '로그인 실패',
        });
      },
    },
  );
  return mutation;
}
