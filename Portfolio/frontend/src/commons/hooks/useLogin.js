import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {setHeaderToken} from '../../api/client';
import {login} from '../../api/login';
import authStorage from '../storage/authStorage';
import useInform from './useInform';
import {userSelect} from '../redux/users/reducers';

export default function useLogin() {
  const dispatch = useDispatch();
  const inform = useInform();

  const mutation = useMutation(login, {
    onSuccess: data => {
      if (data) {
        dispatch(userSelect(data.sessionUser));
        setHeaderToken(data.token);
        authStorage.set('token', data.token);
      }
    },
    // const response = {
    //   code: statusCode,
    //   message,
    //   stack: err.stack,
    //   returnType: req.headers.returntype as unknown as string,
    // };
    onError: error => {
      console.log('useLogin >>> onError >>> error---------', error);
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}
