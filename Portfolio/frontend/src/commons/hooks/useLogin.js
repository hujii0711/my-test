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
  const navigation = useNavigation();
  const inform = useInform();

  const mutation = useMutation(login, {
    onSuccess: data => {
      if (data) {
        //dispatch(userSelect(data.user));
        //setHeaderToken(data.jwt);
        //authStorage.set(data);
        dispatch(userSelect(data.sessionUser));
        setHeaderToken(data.token);
        authStorage.set('token', data);
      }
      navigation.pop();
    },
    onError: error => {
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
